import serverRouter from './serverRouter'

const express = require('express')
const mongoose = require('mongoose')
const PORT = process.env.PORT || 5000
const cors = require('cors')
const app = express()

app.use(cors())
app.use(express.json())
app.use('/electronic', serverRouter)

const start = async () =>{
  try{
    await mongoose.connect(`mongodb+srv://Vasya:Kscw2fsBHnTDcd9Y@cluster0.wysui.mongodb.net/Cluster0?retryWrites=true&w=majority`)
    app.listen(PORT, () => {console.log('SERVER IS WORKING')})
  }
  catch(e){
    console.log(e)
  }
}

start()