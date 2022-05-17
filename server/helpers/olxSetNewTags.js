import item from "../models/item";

const puppeteer = require("puppeteer");
const cheerio = require("cheerio");

async function olxSetNewTags() {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  for (let i = 0; i < (await item.countDocuments().exec()); i++) {
    let ware = await item.find().skip(i).limit(1);
    console.log(ware);
    await page.goto(await ware[0].itemURL);
    try {
      await page.waitForSelector(".css-dwud4b");
    } catch (e) {
      await item.deleteOne({ _id: ware[0]._id });
      console.log("deleted item")
      continue;
    }
    let itemPage = await page.evaluate(() => {
      const pgTag = document.getElementsByClassName("css-dwud4b");
      return pgTag[0].innerHTML;
    });

    let $ = cheerio.load(itemPage);

    await item.findOneAndUpdate(
      {
        _id: ware[0]._id,
      },
      {
        itemURL: ware[0].itemURL,
        itemName: $(".css-r9zjja-Text.eu5v0x0").text(),
        itemPrice: $(".css-okktvh-Text.eu5v0x0").text(),
        itemSubCategory: $(".css-xl6fe0-Text.eu5v0x0").text(),
        itemImg: $(".swiper-zoom-container").find("img").attr("src"),
      }
    );
    console.log(i);
  }
}

export default olxSetNewTags;


