export const runtime = "nodejs";

import { NextResponse } from "next/server";
import { generateActaHtml } from "@/lib/generateActaHtml";

export async function POST(req: Request) {
  try {
    const data = await req.json();

    const html = generateActaHtml(data);

    const isVercel = !!process.env.VERCEL;

    let browser;
    if (isVercel) {
      const puppeteer = await import("puppeteer-core");
      const chromium = await import("@sparticuz/chromium");
      const chrom = chromium.default;
      browser = await puppeteer.default.launch({
        args: chrom.args,
        defaultViewport: null,
        executablePath: await chrom.executablePath(),
        headless: true,
      });
    } else {
      const puppeteer = await import("puppeteer");
      browser = await puppeteer.default.launch({
        headless: true,
      });
    }

    const page = await browser.newPage();
    await page.setContent(html, { waitUntil: "networkidle0" });

    const pdf = await page.pdf({
      format: "A4",
      printBackground: true,
    });

    await browser.close();

    return new NextResponse(Buffer.from(pdf), {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": "attachment; filename=acta.pdf",
      },
    });
  } catch (error) {
    console.error(error);
    return new NextResponse("PDF generation failed", { status: 500 });
  }
}
