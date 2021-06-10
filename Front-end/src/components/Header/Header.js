import React, { Component } from "react";
import { Container } from "./Header.style";
import { DiGithubBadge } from "react-icons/di";
import { AiFillLinkedin } from "react-icons/ai";

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
						<a className="midias" target="blank" href="https://github.com/HarielThums">
							<DiGithubBadge size="40px" />
						</a>
						<a
							className="midias"
							target="blank"
							href="https://www.linkedin.com/in/hariel-thums/"
						>
							<AiFillLinkedin size="38px" />
						</a>
					</div>
				</Container>
			</header>
		);
	}
}
