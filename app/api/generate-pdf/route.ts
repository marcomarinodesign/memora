export const runtime = "nodejs";

import { NextResponse } from "next/server";
import { generateActaHtml } from "@/lib/generateActaHtml";
import { launchBrowser } from "@/lib/puppeteer";

export async function POST(req: Request) {
  try {
    const data = await req.json();

    const html = generateActaHtml(data);

    const browser = await launchBrowser();

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
