const express = require('express')
const Sorteio = require('../models/sorteio')
const mailer = require('../../modules/mailer')
const router = express.Router()

router.get('/', async (req, res) => {
    return res.send({ 
        desafio: 'Amigo Secreto', 
        tec: 'Nodejs, MongoDB, Reactjs || Vuejs' 
    })
})

//find one
router.get('/:id', async (req, res) => {
    try {

        const sorteio = await Sorteio.findById( req.params.id )

        return res.status(200).send({ sorteio })
    } catch (error) {
        return res.status(400).send({ error: 'Internal error' })
    }
})

//create
router.post('/', async (req, res) => {
    try {
        const { amigoSecreto, pessoas } = req.body 
        
        const sorteio = await Sorteio.create({ amigoSecreto, pessoas })
        
        await sorteio.save()
        
        return res.status(200).send({ success: 'Amigo Secreto criado', id: sorteio._id })
    } catch (error) {
        return res.status(400).send({ error: 'Internal error'})
    }
})

//update / append new user
router.put('/:id', async (req, res) => {
    try {
        const { nome, email } = req.body
        
        const sorteio = await Sorteio.findById( req.params.id )


        for(let k = 0; k < sorteio.pessoas.length; k++){
            if (sorteio.pessoas[k].email === email)
                return res.status(400).send({ error: 'Este participante já foi adicionado' })
        }

        await sorteio.updateOne({ '$push': { pessoas: { nome, email } } })

        await sorteio.save()

        return res.status(200).send({ success: 'Participante adicionado' })
    } catch (error) {
        return res.status(400).send({ error: 'Internal error'})
    }
})

// sorteio / disparo de emails
router.get('/sorteio/:id', async (req, res) => {
    try {
        const sorteio = await Sorteio.findById( req.params.id )

        let pessoaSorteio = []
        await sorteio.pessoas.forEach((pessoa) => {
            pessoaSorteio.push(pessoa.email)
        })

        await pessoaSorteio.sort(() => 0.5 - Math.random()) 

        for (let k = 0; k < pessoaSorteio.length; k++){
            let sorteado = pessoaSorteio[k+1]
            if (k == (pessoaSorteio.length - 1))
                sorteado = pessoaSorteio[0]

            for(let i = 0; i < sorteio.pessoas.length; i++){
                if (await sorteio.pessoas[i].email === sorteado)
                    sorteado = sorteio.pessoas[i].nome
            }

            const message = {
                to: pessoaSorteio[k],
                from: 'teste@contato.com',
                subject: 'Seu amigo secreto',
                template: 'random',
                context: { sorteado }
            }
            
            // Estou com problema para enviar + de 5 emails....
            // await mailer.sendMail(message, (error, info) => {
            //     if (error){
            //         console.log(error)
            //     } else {
            //         console.log(info.response)
            //     }
            // })
        }

        return res.status(200)
    } catch (error) {
        console.log(error)
        return res.status(400).send({ error: 'Internal error'})
    }
})

module.exports = router