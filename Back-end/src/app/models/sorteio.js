const mongoose = require('../../database')

const SorteioSchema = new mongoose.Schema({
    amigoSecreto: {
        type: String,
        require: true,
    },
    pessoas: [{
        nome: {
            type: String,
        },
        email: {
            type: String,
        }
    }]
})

const Sorteio = mongoose.model('Sorteio', SorteioSchema)

module.exports = Sorteio