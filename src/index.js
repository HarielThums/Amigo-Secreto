import express from ('express')
const port = process.env.PORT
const app = express()

//config
    //bodyParser
    app.use(express.json())
    app.use(express.urlencoded({ extended: true }))

app.listen(port, () => console.log('Server ok'))