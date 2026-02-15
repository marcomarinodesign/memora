import type { Browser } from "puppeteer-core";

export async function launchBrowser(): Promise<Browser> {
  const isVercel = !!process.env.VERCEL;

  if (isVercel) {
    const chromium = await import("@sparticuz/chromium");
    const puppeteer = await import("puppeteer-core");
    return puppeteer.default.launch({
      args: chromium.default.args,
      defaultViewport: null,
      executablePath: await chromium.default.executablePath(),
      headless: true,
    });
  }

  const puppeteer = await import("puppeteer");
  return puppeteer.default.launch({ headless: true });
}
