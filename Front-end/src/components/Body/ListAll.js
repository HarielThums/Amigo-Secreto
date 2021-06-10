import React, { useState, useEffect } from "react";
import { BodyContainer } from "./Body.style";
import api from "../../service/api";

const ListAll = () => {
	const [participantes, setParticipantes] = useState({});
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState("");

	useEffect(() => {
		const sorteioID = localStorage.getItem("ID");

		api.get(`/${sorteioID}`)
			.then((resp) => {
				setParticipantes(resp.data);
				setIsLoading(false);
			})
			.catch((error) => {
				setError(error.message);
				setIsLoading(false);
			});
	}, []); // o [] é usado para evitar que retorne antes de finalizar a requisição

	if (isLoading) return <BodyContainer>Buscando participantes</BodyContainer>;

	if (error) return <BodyContainer>{error}</BodyContainer>;

	if (participantes.pessoas.length === 0)
		return <BodyContainer>Adicione a primeira pessoa a este amigo secreto</BodyContainer>;

	return (
		<BodyContainer>
			<div>
				<p>Pessoas já adicionadas:</p>
				<ul>
					{participantes.pessoas.map((pessoa) => (
						<li>{pessoa.nome}</li>
					))}
				</ul>
			</div>
		</BodyContainer>
	);
};

export default ListAll;
