const puppeteer = require("puppeteer");
async function gg() {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  await page.setViewport({
    width: 1920,
    height: 1080,
  });
  await page.goto(
    "https://www.olx.ua/d/uk/obyavlenie/ibm-system-x3650-m5-2-x-xeon-12-core-e5-2690-v3-ram-128gb-ddr4-IDLOtwB.html"
  );
}

gg();
