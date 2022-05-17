import item from "../models/item";

const puppeteer = require("puppeteer");
const cheerio = require("cheerio");
const PAGE_NUM = 25;
const rubpageArr = [
  {
    rubURL: "https://www.olx.ua/uk/elektronika/kompyutery-i-komplektuyuschie/",
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
async function olxScrapper() {
  try {
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();
    const arrOfOffers = [];
    await page.setViewport({
      width: 1920,
      height: 1080,
    });
    for (let rubPage = 0; rubPage <= 8; rubPage++) {
      for (let iter = 1; iter <= PAGE_NUM; iter++) {
        await page.goto(`${rubpageArr[rubPage].rubURL}?page=${iter}`);
        await page.waitForTimeout(1000);
        await page.waitForSelector("#offers_table") 
        let offersTable = await page.evaluate(() => {
          const pgTag = document.getElementById("offers_table");
          return pgTag.innerHTML;
        });
        let $ = cheerio.load(offersTable);
        let iterForItemsPrice = arrOfOffers.length;
        $(".price").each((i, header) => {
          arrOfOffers.push({
            price: $(header).text().replace(/\n+/g, "").trim(),
          });
        });
        $(".marginright5.link.linkWithHash.detailsLink").each(
          async (i, header) => {
            arrOfOffers[iterForItemsPrice + i].itemURL = $(header).attr("href");
            arrOfOffers[iterForItemsPrice + i].itemName = $(header)
              .text()
              .replace(/\n+/g, "")
              .trim();
            if (
              !!(await item.findOne({
                itemURL: arrOfOffers[iterForItemsPrice + i].itemURL,
              }))
            ) {
              await item.findOneAndUpdate(
                { itemURL: arrOfOffers[iterForItemsPrice + i].itemURL },
                arrOfOffers[iterForItemsPrice + i]
              );
              console.log("перезаписав");
            } else {
              let newItem = new item({
                itemName: arrOfOffers[iterForItemsPrice + i].itemName,
                itemURL: arrOfOffers[iterForItemsPrice + i].itemURL,
                itemPrice: arrOfOffers[iterForItemsPrice + i].price,
                itemCategory: rubpageArr[rubPage].rubCategory,
              });
              await newItem.save();
              console.log("сохранив");
            }
          }
        );
        console.log(arrOfOffers.length);
      }
      if (rubPage === 8) break;
    }
  } catch (e) {
    throw e;
  }
}

export default olxScrapper;
