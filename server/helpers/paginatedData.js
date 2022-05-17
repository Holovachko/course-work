async function paginatedData(req, res, next, model) {
        const page = parseInt(req.query.page) || 1 
        const limit = parseInt(req.query.limit) || 10
        const startIndex = (page - 1) * limit
        const endIndex = page * limit
        const subCateg = req.query.subCategory
        const search = req.query.search
        const results = {}
        let attrs = ''
        let arr = []

        if (startIndex > 0) {
            results.previous = {
                page: page - 1,
                limit: limit
            };
        }
        if (endIndex < await model.countDocuments({itemCategory:req.query.category}).exec()) {
            results.next = {
                page: page + 1,
                limit: limit
            }
        }
        try {
            if(!!req.query.category){
                results.totalPage = Math.ceil(await model.countDocuments({itemCategory:req.query.category}).exec()/limit)
                results.result = await model.find({itemCategory:req.query.category}).limit(limit).skip(startIndex).exec()
                arr = await model.find({itemCategory:req.query.category})
                let sum = 0
                for(let i = 0;i<arr.length;i++){
                    attrs = arr[i].itemPrice.split(' ')
                    console.log(attrs)
                    if(attrs.join("") == "Обмін" || attrs.join("") == "Безкоштовно" || attrs.join("") ==''){
                        continue
                    }
                    if(attrs.includes('$')){
                        sum += parseInt(attrs.join("")) * 29
                    }
                    console.log(attrs.join(""))
                    sum += parseInt(attrs.join(""))
                }
                results.avarageSum = Math.round(sum/arr.length)
                if(subCateg){
                   arr = await model.find({itemCategory:req.query.category})
                   arr = arr.filter((item) => item.itemSubCategory.toLowerCase().includes(subCateg.toLowerCase()))
                   results.result = arr.slice(startIndex,endIndex)
                   results.totalPage = Math.ceil(arr.length / limit)
                }
            }
            else{
                results.totalPage = Math.ceil(await model.countDocuments().exec()/limit)
                results.result = await model.find().limit(limit).skip(startIndex).exec()
                 arr = await model.find().exec()
                let sum = 0
                for(let i = 0;i<arr.length;i++){
                    attrs = arr[i].itemPrice.split(' ')
                    console.log(attrs)
                    if(attrs.join("") == "Обмін" || attrs.join("") == "Безкоштовно" || attrs.join("") ==''){
                        continue
                    }
                    if(attrs.includes('$')){
                        sum += parseInt(attrs.join("")) * 29
                    }
                    console.log(attrs.join(""))
                    sum += parseInt(attrs.join(""))
                }
                results.avarageSum = Math.round(sum/arr.length)
                if(subCateg){
                     arr = await model.find()
                     arr = arr.filter((item) => item.itemSubCategory.toLowerCase().includes(subCateg.toLowerCase()))
                    results.result = arr.slice(startIndex,endIndex)
                    results.totalPage = Math.ceil(arr.length / limit)
                }
            }
            if(!!search){
                arr = await model.find().exec()
                arr = arr.filter((item) => item.itemName.toLowerCase().includes(search.toLowerCase()))
                results.result = arr.slice(startIndex,endIndex)
                results.totalPage = Math.ceil(arr.length / limit)
                let sum = 0
                for(let i = 0;i<arr.length;i++){
                    attrs = arr[i].itemPrice.split(' ')
                    console.log(attrs)
                    if(attrs.join("") == "Обмін" || attrs.join("") == "Безкоштовно"){
                        continue
                    }
                    if(attrs.includes('$')){
                        sum += parseInt(attrs.join("")) * 29
                    }
                    console.log(attrs.join(""))
                    sum += parseInt(attrs.join(""))
                }
                results.avarageSum = Math.round(sum/arr.length)
                if(subCateg){
                    arr = arr.filter((item) => item.itemSubCategory.toLowerCase().includes(subCateg.toLowerCase()))
                    results.result = arr.slice(startIndex,endIndex) 
                    results.totalPage = Math.ceil(arr.length / limit)
                }
            }

            res.paginatedResult = results
            next()
        }
        catch (e) {
            res.status(500).json({ message: e.message })
        }
}

export default paginatedData