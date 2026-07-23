import { chromium } from "playwright";

const browser = await chromium.launch();
const page = await browser.newPage();

page.on("console", (msg) => {
  if (msg.type() === "error") {
    console.log("CONSOLE:", msg.text().slice(0, 200));
  }
});

await page.goto(
  `https://arslanahmed777.github.io/react-tree-checkbox/?v=${Date.now()}`,
  { waitUntil: "networkidle", timeout: 60000 }
);

const scriptSrc = await page.locator('script[type="module"]').first().getAttribute("src");
console.log("SCRIPT", scriptSrc);

const text = await page.locator("body").innerText();
console.log("HAS_FAILED", text.includes("Example failed"));
console.log("HAS_BASIC", text.includes("Basic Example"));
console.log("HAS_MAMMALS", text.includes("Mammals") || text.includes("mammals"));
console.log("BODY_SNIP", text.slice(0, 600).replace(/\n/g, " | "));

await browser.close();
