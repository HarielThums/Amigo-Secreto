const express = require("express");
const port = process.env.PORT || 3003;
const app = express();
const cors = require('cors')
require("dotenv").config();

//config
    //cors
    app.use(cors())
    //bodyParser
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    //routes
    app.use(require("./app/controllers/productController"));

app.listen(port, () => console.log("Server on"));
