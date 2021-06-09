import React, { Component } from "react";
import { BodyContainer } from "./Body.style";
import api from "../../service/api";

export default class Raffle extends Component {
	state = { error: "", sucess: "" };

	handleSubmit = async (e) => {
		e.preventDefault();

		const sorteioID = localStorage.getItem("ID");
		console.log(sorteioID);
		try {
			await api.get(`/sorteio/${sorteioID}`)
			this.setState({ sucess: "Sorteio realizado, favor checar seu email" });
		} catch (error) {
			this.setState({ error: "Ocorreu um erro ao sortear" });
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
								<p>
									Ao sortear será enviado um email para cada um dos participantes
									com o nome sorteado!
								</p>
								<button type="submit"> Sortear </button>
							</label>
						</div>
					</form>
				</BodyContainer>
			</div>
		);
	}
}
