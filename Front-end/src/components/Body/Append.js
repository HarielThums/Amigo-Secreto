import React, { Component } from "react";
import { BodyContainer } from "./Body.style";
import api from "../../service/api";

export default class Append extends Component {
	state = { nome: "", email: "", error: "", sucess: "" };

	handleSubmit = async (e) => {
		e.preventDefault();

		const { nome, email } = this.state;

		if (!nome || !email)
			return this.setState({ error: "Por favor, preencha os campos nome e email " });

		const sorteioID = localStorage.getItem("ID");
		console.log(sorteioID);

		try {
			await api.put(`/${sorteioID}`, { nome, email });
			this.setState({ sucess: "Pessoa adicionada" });
		} catch (error) {
			console.log(error);
			this.setState({ error: "Ocorreu um erro ao criar" });
		}
	};

	render() {
		return (
			<div>
				<BodyContainer>
					<form onSubmit={this.handleSubmit}>
						<div>
							<div>
								{this.state.error && <p id="error">{this.state.error}</p>}
								{this.state.sucess && <p id="success">{this.state.sucess}</p>}
							</div>
							<label>
								<p>Adicione um novo participante ao seu Amigo secreto.</p>
								<input
									type="text"
									name="nome"
									placeholder="Nome"
									onChange={(e) =>
										this.setState({
											nome: e.target.value,
										})
									}
								/>
								<input
									type="text"
									name="email"
									placeholder="Email"
									onChange={(e) =>
										this.setState({
											email: e.target.value,
										})
									}
								/>
							</label>
							<button type="submit"> Adicionar </button>
						</div>
					</form>
				</BodyContainer>
			</div>
		);
	}
}
