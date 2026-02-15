# PDF view model & template – edge cases audit

Audit of the structured view-model refactor: `actaPdfViewModel.ts`, `generateActaHtml.ts`, and the pipeline in `generatePdf.ts`.

---

## 1. **Null / undefined input to transformer**

**Where:** `toPdfActaViewModel(data)` in `actaPdfViewModel.ts`; `generateActaPdf(data)` in `generatePdf.ts`.  
**Behavior:** TypeScript types `data` as `PdfActaFormat`, but the API passes `body as Acta | PdfActaFormat` with no validation. If a direct caller passes `null` or `undefined`, then `mapped` is null and `data.comunidad` throws (cannot read property of null).  
**Impact:** Runtime TypeError when `generateActaPdf(null)` is called.  
**Recommendation:** Guard at the start of `toPdfActaViewModel`: if `data == null`, throw a clear error (e.g. "PdfActaFormat is required") or treat as empty. **Applied:** throw a clear error.

---

## 2. **Loose / malformed payload from API**

**Where:** `/api/generate-acta` passes `body` to `generateActaPdf` without schema validation.  
**Behavior:** `toPdfActaViewModel` uses `data.comunidad ?? {}`, `Array.isArray(data.orden_dia) ? data.orden_dia : []`, and `safeStr()` for every field. So missing keys, wrong types (e.g. `comunidad` a string), or non-array lists produce a valid view model with "-" and empty arrays.  
**Impact:** PDF always generates; content may be mostly placeholders. No crash.  
**Recommendation:** Acceptable. Optional: validate body with a light schema before calling `generateActaPdf` and return 422 with a clear message for invalid shape.

---

## 3. **Nested objects not plain objects**

**Where:** `comunidad`, `cabecera`, `cierre`, `cargos` in `toPdfActaViewModel`.  
**Behavior:** We use `data.comunidad ?? {}`. If `comunidad` is a string or array, then `comunidad.ciudad` is undefined (no .ciudad on string/array). `safeStr(undefined)` returns "-".  
**Impact:** Safe; no throw.

---

## 4. **orden_dia / asistentes / acuerdos items malformed**

**Where:** `orden_dia.map((p) => safeStr(p?.titulo ?? null))`, and similar for asistentes/acuerdos.  
**Behavior:** If an item is `null`, a number, or a string, `p?.titulo` is undefined; `safeStr(null)` = "-".  
**Impact:** Safe; no throw.

---

## 5. **acuerdos[].decisiones not an array**

**Where:** `Array.isArray(a?.decisiones) ? a.decisiones : []`.  
**Behavior:** If `decisiones` is a string or object, we use `[]`. No `.map` on non-array.  
**Impact:** Safe.

---

## 6. **resultadoToNarrative with "-" (from safeStr of null)**

**Where:** `resultadoRaw = safeStr(a?.resultado ?? null)` then `resultadoToNarrative(resultadoRaw, idioma)`.  
**Behavior:** When there is no resultado, resultadoRaw is "-". The function returns `se acuerda (${resultado})` when `r` is truthy, so we get "se acuerda (-)."  
**Impact:** Correct; no crash.

---

## 7. **Closing paragraph contains user-controlled horaFin**

**Where:** `closing = t.closing(horaFin)`; in the template we output `e(vm.closing)`.  
**Behavior:** `horaFin` is `safeStr(cierre.hora_fin)`. If it contained `<script>`, it would be in the string; the template then escapes the entire `vm.closing` with `escapeHtml`.  
**Impact:** Safe; no raw HTML.

---

## 8. **escapeHtml does not escape single quotes**

**Where:** `escapeHtml()` in `generateActaHtml.ts`.  
**Behavior:** We escape `& < > "`. User content is only placed in text nodes and in the opening paragraph (which is built from escaped vars). We do not put user content in HTML attributes.  
**Impact:** Safe for current usage.

---

## 9. **Acuerdo block when resumen is "-" and resultado is "se acuerda."**

**Where:** Template builds `resumenPart`, `decisionesPart`, `resultadoPart`.  
**Behavior:** We always have at least "PRIMERO.- -  se acuerda." (resumen "-", then space, then resultado). Slightly redundant but valid.  
**Impact:** Layout-safe; no empty or broken block.

---

## 10. **Empty acuerdos / asistentes / ordenDia**

**Where:** Template uses `vm.acuerdos.length > 0` etc. to decide whether to render sections.  
**Behavior:** Empty arrays produce empty section HTML (no `<section>` for that part).  
**Impact:** Correct; no empty tables or lists.

---

## 11. **ordinal(n) for n ≤ 0 or very large n**

**Where:** `ordinal(puntoId, idioma)`; `puntoId` from `a.punto_id` or `i + 1`.  
**Behavior:** For n ≤ 0, `list[n - 1]` is undefined; we return `NÚMERO ${n}`. For n > 20 we do the same.  
**Impact:** Correct; no crash.

---

## 12. **fondos items that are not objects**

**Where:** `fondos.map((f) => (f && typeof f === "object" ? { ... } : { nombre: "-", ... }))`.  
**Behavior:** Non-object (or null) yields a row of "-".  
**Impact:** Safe.

---

## 13. **Very long strings (DoS-style payloads)**

**Where:** No truncation in `safeStr()` or in the template.  
**Behavior:** A 10 MB string in one field becomes 10 MB in the view model and in the HTML, then in the PDF.  
**Impact:** Possible high memory or slow Puppeteer; no explicit limit.  
**Recommendation:** Document; add optional max length in transformer or at API layer if needed.

---

## 14. **Labels and fixed copy (XSS)**

**Where:** `labelOrdenDia`, `labelAsistentes`, etc. come from `TEXTS` (fixed), not from API.  
**Behavior:** They are constant; we still run them through `e()` in the template.  
**Impact:** Safe.

---

## 15. **Double space before resultado in acuerdos**

**Where:** `resultadoPart = \` <span class="acuerdo-resultado"> ${e(a.resultado)}</span>\``; we then do `${resumenPart}${decisionesPart}${resultadoPart}`.  
**Behavior:** When resumen is non-empty we get "resumen  se acuerda." (two spaces) because resultadoPart has a leading space.  
**Impact:** Cosmetic only; no security or layout break.

---

## Summary of code change applied

- **Null/undefined in transformer:** At the start of `toPdfActaViewModel(data)`, if `data == null` or `data === undefined`, throw an error with a clear message so direct callers and future code paths fail fast instead of throwing a generic TypeError.

All other cases are either already safe or documented as acceptable/cosmetic.
