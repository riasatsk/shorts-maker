import { launch } from "puppeteer";
import * as cheerio from "cheerio";
import downloadImage from "./util/download.js";

/**
 * Download Image From Brave.
 * @param {string} input - Search Tag
 */

export default async function downloadImageFromBrave(input) {
  let counter = 0;

  for (const i of input) {
    const browser = await launch();
    const page = await browser.newPage();

    // Navigate to Brave search page
    await page.goto(
      `https://search.brave.com/images?q=${encodeURIComponent(i)}`,
      { timeout: 0 }
    );
    await page.setViewport({ width: 1366, height: 768 });

    // Wait for the images to load
    await page.waitForSelector("div.image-wrapper");

    const buttons = await page.$$("div.image-wrapper button");
    let counter2 = 0;
    // Iterate over each button and click it
    for (const button of buttons) {
      if (counter2 >= 5) {
        await browser.close();
        break;
      }
      counter++;
      counter2++;
      await button.click();
      await page.waitForSelector("div.actions.desktop-small-regular"); // Wait for actions to load
      const htmlContent = await page.content();

      const $ = cheerio.load(htmlContent);

      // Select the div with class 'actions.desktop-small-regular'
      const divActions = $("div.actions.desktop-small-regular");
      // Select the second 'a' tag within the selected div and get its 'href' attribute
      const secondHref = divActions.find("a").eq(1).attr("href");
      console.log("Second href:", secondHref);
      await downloadImage(secondHref, `./image/image-${counter}.jpg`);
    }

    await browser.close();
  }
}
