import React, { Component } from "react";
import { BodyContainer } from "./Body.style";
import api from "../../service/api";

export default class Append extends Component {
	state = { nome: "", email: "", error: "", success: "" };

	handleSubmit = async (e) => {
		e.preventDefault();

		const { nome, email } = this.state;
		this.setState({ error: "", success: "" });
		const sorteioID = localStorage.getItem("ID");

		if (!nome || !email)
			return this.setState({ error: "Por favor, preencha os campos nome e email " });

		if (!sorteioID)
			return this.setState({ error: "Por favor, crie um amigo secreto primeiro " });

		try {
			const res = await api.put(`/${sorteioID}`, { nome, email });
			this.setState({ success: res.data.success, error: res.data.error });
		} catch (error) {
			this.setState({ error: "Houve um erro interno" });
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
								{this.state.success && <p id="success">{this.state.success}</p>}
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
