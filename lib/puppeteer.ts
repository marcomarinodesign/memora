import type { Browser } from "puppeteer-core";

export async function launchBrowser(): Promise<Browser> {
  const isVercel = !!process.env.VERCEL;

  if (isVercel) {
    const chromium = await import("@sparticuz/chromium-min");
    const puppeteer = await import("puppeteer-core");
    const chrom = chromium.default;
    return puppeteer.default.launch({
      args: chrom.args,
      defaultViewport: null,
      executablePath: await chrom.executablePath(
        "https://github.com/Sparticuz/chromium/releases/download/v143.0.4/chromium-v143.0.4-pack.x64.tar"
      ),
      headless: true,
    });
  }

  const puppeteer = await import("puppeteer");
  return puppeteer.default.launch({ headless: true });
}
