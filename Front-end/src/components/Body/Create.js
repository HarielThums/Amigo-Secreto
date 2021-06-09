import React, { Component } from "react";
import api from "../../service/api";
import { BodyContainer } from "./Body.style";
import setID from "../../service/setID";

export default class Create extends Component {
	state = { amigoSecreto: "", error: "", sucess: "" };

	handleSubmit = async (e) => {
		e.preventDefault();

		const { amigoSecreto } = this.state;

		if (!amigoSecreto)
			return this.setState({
				error: "Por favor, preencha o campo para criar um amigo secreto",
			});

		try {
			const res = await api.post("/", { amigoSecreto });
			this.setState({ sucess: "Amigo secreto criado" });
			const id = res.data.id;
			setID(id);
			console.log(id);
		} catch (error) {
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
								<p>Qual será o nome do seu Amigo Secreto? </p>
								<input
									type="text"
									name="amigoSecreto"
									placeholder="Digite aqui"
									onChange={(e) =>
										this.setState({
											amigoSecreto: e.target.value,
										})
									}
								/>
							</label>
							<button type="submit">Criar</button>
						</div>
					</form>
				</BodyContainer>
			</div>
		);
	}
}
