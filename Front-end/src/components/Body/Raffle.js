import React, { Component } from "react";
import { BodyContainer } from "./Body.style";
import api from "../../service/api";

export default class Raffle extends Component {
	state = { error: "", success: "" };

	handleSubmit = async (e) => {
		e.preventDefault();

		const sorteioID = localStorage.getItem("ID");
		this.setState({ error: "", success: "" });

		try {
			const res = await api.get(`/sorteio/${sorteioID}`);
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
							<p>
								Ao sortear será enviado um email para cada um dos participantes com
								o nome sorteado!
							</p>
							<label>
								<button type="submit"> Sortear </button>
							</label>
						</div>
					</form>
				</BodyContainer>
			</div>
		);
	}
}
