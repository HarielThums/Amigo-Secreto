const mongoose = require("../../database");

const SorteioSchema = new mongoose.Schema({
	amigoSecreto: {
		type: String,
		require: true,
	},
	pessoas: [
		{
			nome: {
				type: String,
			},
			email: {
				type: String,
			},
		},
	],
	status: {
		type: Boolean,
		default: true
	}
});

const Sorteio = mongoose.model("Sorteio", SorteioSchema);

module.exports = Sorteio;
