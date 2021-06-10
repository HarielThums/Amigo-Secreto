const express = require("express");
const Sorteio = require("../models/sorteio");
const mailer = require("../../modules/mailer");
const router = express.Router();

router.get("/", async (req, res) => {
	return res.send({
		desafio: "Amigo Secreto",
		tec: "Nodejs, MongoDB, Reactjs",
	});
});

//find one
router.get("/:id", async (req, res) => {
	try {
		const sorteio = await Sorteio.findById(req.params.id);

		const pessoas = sorteio.pessoas;

		return res.status(200).send({ pessoas });
	} catch (error) {
		return res.status(400).send({ error: "Internal error" });
	}
});

//create
router.post("/", async (req, res) => {
	try {
		const { amigoSecreto, pessoas } = req.body;

		const sorteio = await Sorteio.create({ amigoSecreto, pessoas });

		await sorteio.save();

		return res.status(200).send({ success: "Amigo Secreto criado", id: sorteio._id });
	} catch (error) {
		return res.status(400).send({ error: "Internal error" });
	}
});

//update
router.put("/:id", async (req, res) => {
	try {
		const { nome, email } = req.body;

		const sorteio = await Sorteio.findById(req.params.id);

		for (let k = 0; k < sorteio.pessoas.length; k++) {
			if (sorteio.pessoas[k].email === email)
				return res.status(200).send({ error: "Este participante já foi adicionado" });
		}

		await sorteio.updateOne({ $push: { pessoas: { nome, email } } }); //adiciona novo participante

		await sorteio.save();

		return res.status(200).send({ success: "Participante adicionado" });
	} catch (error) {
		return res.status(400).send({ error: "Internal error" });
	}
});

//delete participante
router.delete("/:sorteioId/:userId", async (req, res) => {
	try {
		const sorteio = await Sorteio.findById(req.params.sorteioId);
		const user = req.params.userId;

		await sorteio.updateOne({ $pull: { pessoas: { _id: user } } }); // remove participante

		return res.status(200).send({ success: "Participante removido" });
	} catch (error) {
		return res.status(400).send({ error: "Internal error" });
	}
});

// sorteio / disparo de emails
router.get("/sorteio/:id", async (req, res) => {
	try {
		const sorteio = await Sorteio.findById(req.params.id);

		let pessoaSorteio = [];
		await sorteio.pessoas.forEach((pessoa) => {
			pessoaSorteio.push(pessoa.email);
		});

		if (pessoaSorteio.length < 3)
			return res.status(200).send({ error: "Adicione mais pessoas primeiro" });

		await pessoaSorteio.sort(() => 0.5 - Math.random());

		for (let k = 0; k < pessoaSorteio.length; k++) {
			let sorteado = pessoaSorteio[k + 1];
			if (k == pessoaSorteio.length - 1) sorteado = pessoaSorteio[0];

			sorteio.pessoas.map((pessoa) => {
				if (pessoa.email === sorteado) sorteado = pessoa.nome;
			});

			const message = {
				to: pessoaSorteio[k],
				from: "teste@contato.com",
				subject: `Amigo secreto: ${sorteio.amigoSecreto}`,
				template: "random",
				context: { sorteado },
			};

			await mailer.sendMail(message, (error, info) => {
				if (error) {
					console.log(error);
				} else {
					console.log(info.response);
				}
			});
		}

		//armazenando status de 'já sorteado'
		await sorteio.updateOne({ $set: { status: false } });

		return res.status(200).send({ success: "Emails enviados" });
	} catch (error) {
		return res.status(400).send({ error: "Internal error" });
	}
});

module.exports = router;
