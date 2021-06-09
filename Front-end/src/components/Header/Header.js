import React, { Component } from "react";
import { Container } from "./Header.style";

export default class Header extends Component {
	render() {
		return (
			<header>
				<Container>
					<div>
						<h1>Desafio Amigo Secreto.</h1>
					</div>
					<div>
						<p>Organize seu divertido amigo secreto aqui!</p>
					</div>
					<div className="vitrine"></div>
				</Container>
			</header>
		);
	}
}
