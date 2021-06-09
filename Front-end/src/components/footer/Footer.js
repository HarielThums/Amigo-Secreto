import React, { Component } from "react";
import { Container } from "./Footer.style";
import { DiGithubBadge } from 'react-icons/di'
import { AiFillLinkedin } from "react-icons/ai";


export default class Footer extends Component {
	render() {
		return (
			<footer>
				<Container>
					<div>
						<a target="blank" href="https://github.com/HarielThums"><DiGithubBadge size="40px"/></a>
						<a target="blank" href="https://www.linkedin.com/in/hariel-thums/"><AiFillLinkedin size="38px"/></a>
					</div>
				</Container>
			</footer>
		);
	}
}
