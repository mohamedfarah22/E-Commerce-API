const express = require('express')
const app = express()
const bodyParse = require('body-parser')
const port = 3000

//require products router

const productsRouter = require('./Routers/productRouter/productsRouter')

//Mount the router at products path

app.use('/products', productsRouter)

app.listen(port, () => {
  console.log(`E-commerce app listening on ${port}`)
})