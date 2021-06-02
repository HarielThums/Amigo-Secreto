const mongoose = require('../../database')

const SorteioSchema = new mongoose.Schema({
    amigoSecreto: {
        type: String,
        require: true,
        unique: true
    },
    pessoas: [{
        nome: {
            type: String,
            require: true
        },
        email: {
            type: String,
            require: true,
            unique: true
        }
    }]
})

const Sorteio = mongoose.model('Sorteio', SorteioSchema)

module.exports = Sorteio