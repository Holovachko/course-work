import item from "../models/item";

const puppeteer = require("puppeteer");
const cheerio = require("cheerio");
const PAGE_NUM = 25;
const rubpageArr = [
  {
    rubURL:
      "https://www.olx.ua/d/uk/elektronika/kompyutery-i-komplektuyuschie/",
    rubCategory: "kompyutery-i-komplektuyuschie",
  },
  {
    rubURL:
      "https://www.olx.ua/uk/elektronika/kompyutery-i-komplektuyuschie/nastolnye-kompyutery/",
    rubCategory: "nastolnye-kompyutery",
  },
  {
    rubURL:
      "https://www.olx.ua/uk/elektronika/kompyutery-i-komplektuyuschie/servery/",
    rubCategory: "servery",
  },
  {
    rubURL:
      "https://www.olx.ua/uk/elektronika/kompyutery-i-komplektuyuschie/komplektuyuschie-i-aksesuary/",
    rubCategory: "komplektuyuschie-i-aksesuary",
  },
  {
    rubURL:
      "https://www.olx.ua/uk/elektronika/kompyutery-i-komplektuyuschie/periferiynye-ustroystva/",
    rubCategory: "periferiynye-ustroystva",
  },
  {
    rubURL:
      "https://www.olx.ua/uk/elektronika/kompyutery-i-komplektuyuschie/monitory/",
    rubCategory: "monitory",
  },
  {
    rubURL:
      "https://www.olx.ua/uk/elektronika/kompyutery-i-komplektuyuschie/vneshnie-nakopiteli/",
    rubCategory: "vneshnie-nakopiteli",
  },
  {
    rubURL:
      "https://www.olx.ua/uk/elektronika/kompyutery-i-komplektuyuschie/rashodnye-materialy/",
    rubCategory: "rashodnye-materialy",
  },
  {
    rubURL:
      "https://www.olx.ua/uk/elektronika/kompyutery-i-komplektuyuschie/drugoe/",
    rubCategory: "drugoe",
  },
];

async function olxScrapper2() {
  try {
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();
    await page.setDefaultNavigationTimeout(0);
    for (let rubPage = 0; rubPage <= 8; rubPage++) {
      for (let iter = 1; iter <= PAGE_NUM; iter++) {
        await page.goto(`${rubpageArr[rubPage].rubURL}?page=${iter}`, {
          waitUntil: "load",
        });
        await page.waitForSelector(".css-14fnihb");
        let offersTable = await page.evaluate(() => {
          const pgTag = document.getElementsByClassName("css-14fnihb");
          return pgTag[0].innerHTML;
        });
        let $ = cheerio.load(offersTable);
        $(".css-1bbgabe").each(async (i, header) => {
          let h = `https://www.olx.ua${$(header).attr("href")}`;
          if (
            !!(await item.findOne({
              itemURL: h,
            }))
          ) {
            await item.findOneAndUpdate(
              { itemURL: h },
              { itemURL: h, itemCategory: rubpageArr[rubPage].rubCategory }
            );
            console.log("перезаписав");
          } else {
            let newItem = new item({
              itemURL: h,
              itemCategory: rubpageArr[rubPage].rubCategory,
            });
            await newItem.save();
            console.log("сохранив");
          }
        });
      }
    }
  } catch (e) {
    console.log(e);
  }
}

export default olxScrapper2;
