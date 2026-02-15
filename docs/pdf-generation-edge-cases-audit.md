# PDF generation – edge cases audit

Audit of the refactored PDF pipeline (`lib/pdf/generatePdf.ts`, `lib/pdf/generateActaHtml.ts`) and related call sites.

---

## 1. Header image missing

**Where:** `getActaHeaderImgTag()` in `generatePdf.ts`  
**Behavior:** `fs.readFile(headerPath)` throws if `public/acta-header.png` is missing (e.g. ENOENT).  
**Impact:** Uncaught error; API returns 500 with a generic message; log shows `ENOENT` or "no such file".

**Recommendation:** Catch the error and throw a clear message, e.g. "Acta header image not found (public/acta-header.png). Ensure the file exists in the project." **Applied** in code.

**Other:** On Vercel, `process.cwd()` is the build output; `public/` is usually copied. If the image is not committed or is in `.gitignore`, the first PDF request will fail.

---

## 2. Malformed or non-array list fields

**Where:** `generateActaHtml.ts` – `orden_dia`, `asistentes`, `acuerdos`, `fondos`.  
**Behavior:** Data is cast and defaulted with `?? []`. If the API sends e.g. `orden_dia: "string"` or `asistentes: null`, the cast does not change runtime type; later `.map()` is called and can throw (e.g. "orden_dia.map is not a function").

**Impact:** 500 when generating PDF from malformed JSON (e.g. manual API call or bug in frontend).

**Recommendation:** Normalize to arrays: use `Array.isArray(x) ? x : []` (or a small helper) for each list. **Applied** in code.

---

## 3. Invalid or missing date

**Where:** `formatDate(isoDate, lang)` in `generateActaHtml.ts`.  
**Behavior:** For invalid strings (e.g. `"2024-13-99"`, `"not-a-date"`), `new Date(...)` becomes Invalid Date; `d.getDate()`, `d.getMonth()`, `d.getFullYear()` are NaN; `months[d.getMonth()]` is `undefined`. Result can be "NaN de undefined de NaN".

**Impact:** Garbled date in the PDF; no crash.

**Recommendation:** After creating `d`, if `Number.isNaN(d.getTime())` return `""` or the original `isoDate` so the PDF still shows something safe. **Applied** in code (return empty string for invalid dates).

---

## 4. `htmlToPdf()` used with HTML that has no placeholder

**Where:** `htmlToPdf(html)` in `generatePdf.ts`.  
**Behavior:** `html.replace(ACTA_HEADER_PLACEHOLDER, headerImgTag)` does nothing if the HTML does not contain `{{ACTA_HEADER_IMG}}`. The PDF is still generated; if the HTML was from a different template, it may show the literal "{{ACTA_HEADER_IMG}}" or no header.

**Impact:** Only affects callers that pass custom HTML not produced by `generateActaHtml`. Current code only calls `htmlToPdf` with output from `generateActaHtml`, which always includes the placeholder.

**Recommendation:** Document that `htmlToPdf` expects HTML containing `ACTA_HEADER_PLACEHOLDER`. Optional: in development, warn if the placeholder was not found (e.g. check `htmlWithHeader === html`). No code change required for current usage.

---

## 5. Input shape: neither Acta nor PdfActaFormat

**Where:** `generateActaPdf(data)` and `isActaShape(data)`.  
**Behavior:** If `data` is not Acta-shaped, it is treated as PdfActaFormat and passed to `generateActaHtml({ ...mapped })`. Missing or wrong keys (e.g. no `comunidad`, or `comunidad` a string) are handled by the template: nested access uses `?? {}` / `?? []`, and `safeStr()` returns `"-"` for null/undefined.

**Impact:** PDF still generates; fields show "-" or empty sections. No throw.

**Recommendation:** Acceptable for resilience. Optionally validate `data` (e.g. with a light schema) before calling `generateActaHtml` and throw a clear error for invalid payloads; not required for current API usage if validation is done at route level.

---

## 6. Language / `idioma` not "ca" or "es"

**Where:** `generateActaHtml` – `idioma = (data.idioma === "ca" ? "ca" : "es")`.  
**Behavior:** Any other value (e.g. `"en"`, `null`, missing) falls back to `"es"`.

**Impact:** Correct; no crash; Spanish used as default.

---

## 7. Very long content or very large HTML

**Where:** Entire pipeline: large acta → large HTML → large string with embedded base64 → Puppeteer.  
**Behavior:** No explicit limits. Very long text can produce a huge HTML string; base64 header increases size further. `setContent()` and `page.pdf()` have no custom timeouts; Puppeteer default timeouts apply.

**Impact:** Possible high memory use or timeout (e.g. on serverless) for extremely long actas.

**Recommendation:** Monitor in production. If needed, add timeouts to `setContent`/`page.pdf()` or chunking; consider streaming or background jobs for very large documents.

---

## 8. Re-export and backward compatibility

**Where:** `lib/acta/generateLegalActaPdf.ts` re-exports `generateActaPdf as generateLegalActaPdf`.  
**Behavior:** Same function signature and behavior. Any code that still imports `generateLegalActaPdf` from `@/lib/acta/generateLegalActaPdf` continues to work.

**Impact:** No edge case; compatibility preserved.

---

## 9. Concurrency and browser lifecycle

**Where:** `htmlToPdf()` launches a new browser per call and closes it in `finally`.  
**Behavior:** Each request gets its own browser instance. Under high concurrency, many Chromium processes can run (local or Vercel); possible memory or cold-start limits.

**Impact:** Known tradeoff; no change in this refactor. Any future pooling would be in `lib/puppeteer` or the caller.

---

## 10. Character encoding and XSS

**Where:** User-controlled content is interpolated in the HTML.  
**Behavior:** All interpolated text goes through `escapeHtml()` or `safeStr()` (then escapeHtml). No raw user input in attributes; no `innerHTML`-style injection from the template.

**Impact:** XSS risk from the template is low. Keep using escape for any new user-derived strings.

---

## Summary of code changes applied

- **Header missing:** Clear error in `getActaHeaderImgTag()` when the file cannot be read.
- **Non-array lists:** In `generateActaHtml`, ensure `orden_dia`, `asistentes`, `acuerdos`, `fondos` are normalized with `Array.isArray(x) ? x : []`.
- **Invalid date:** In `formatDate`, return `""` when `Number.isNaN(d.getTime())`.

All other cases are documented; no further code changes were required for current usage.
