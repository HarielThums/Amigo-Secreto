const express = require('express')
const port = process.env.PORT || 3000
const app = express()
require('dotenv').config()

//config
    //bodyParser
    app.use(express.json())
    app.use(express.urlencoded({ extended: true }))
    //routes
    app.use(require('./app/controllers/productController'))
    

app.listen(port, () => console.log('Server on'))