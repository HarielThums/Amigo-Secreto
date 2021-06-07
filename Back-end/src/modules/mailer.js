const { host, port, user, pass } = require('../config/mail.json')
const hbs = require('nodemailer-express-handlebars')
const nodemailer = require('nodemailer')
const path = require('path')

const transport = nodemailer.createTransport({
    host,
    port,
    auth: { user, pass },
    pool: true, // pra evitar ficar abrindo uma nova connection pra cada email
    maxConnections: 5,
    maxMessages: 10,
    rateLimit: 5
})

transport.use('compile', hbs({
    viewEngine: {
        defaultLayout: undefined,
        partialsDir: path.resolve('./src/resources/mail')
      },
    viewPath: path.resolve('./src/resources/mail'), // resolve parte sempre da raiz absoluta do projeto.
    extName: '.html'
}))

module.exports = transport