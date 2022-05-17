import olxScrapper2 from './helpers/olxScrapper2'
import item from './models/item'
import paginatedData from './helpers/paginatedData'
import olxSetNewTags from './helpers/olxSetNewTags'
class serverController {
    async saveToDBItems(req, res) {
        await olxScrapper2()
        return res.json('Інформація сохранилася успішно')
    }
    async getPaginatedItems(req, res, next) {
        await paginatedData(req, res, next, item)
        return res.json(res.paginatedResult)
    }

    async setNewTags(req,res){
        await olxSetNewTags()
        return res.json("Всі теги встановлено")
    }

}


export default new serverController()