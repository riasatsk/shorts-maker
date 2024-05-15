import { launch } from "puppeteer";
import * as cheerio from "cheerio";
import { downloadImage } from "./util/download.js";

export async function downloadFromYandex(input) {
  const browser = await launch();
  const context = await browser.createBrowserContext();

  const page = await context.newPage();
  // Navigate to Brave search page
  await page.goto(
    `https://yandex.com/images/search?text=${encodeURIComponent(
      input
    )}&isize=large&iorient=vertical`,
    { timeout: 0 } // Set timeout to 0 to disable it or specify a higher value in milliseconds
  );
  await page.setViewport({ width: 1366, height: 768 });

  // Wait for the images to load
  await page.waitForSelector("a.Link.ContentImage-Cover");

  const atags = await page.$$("a.Link.ContentImage-Cover");

  let counter = 0;
  for (const aTag of atags) {
    if (counter >= 5) {
      await browser.close();
      return;
    }
    counter++;
    const hrefHandle = await aTag.getProperty("href");
    const href = await hrefHandle.jsonValue();
    console.log(href);

    let page1 = await context.newPage();
    await page1.setViewport({ width: 1366, height: 768 });

    // Set a longer navigation timeout for this page

    await page1.goto(href, { timeout: 0 });
    await page1.waitForSelector("div.OpenImageButton");
    const htmlContent = await page1.content();
    const $ = cheerio.load(htmlContent);
    const divActions = $("div.OpenImageButton");

    const secondHref = divActions.find("a").eq(0).attr("href");

    console.log("Second href:", secondHref);
    await downloadImage(secondHref, `./image/yandex-image${counter}.jpg`);
    await page1.close();
  }
  await browser.close();
}
