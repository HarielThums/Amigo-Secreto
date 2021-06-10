import React from "react";
import { BodyContainer } from "./Body.style";
import api, { useFetch } from "../../service/api";
import { AiFillDelete } from "react-icons/ai";

const ListAll = () => {
	const sorteioID = localStorage.getItem("ID");

	const { data, error } = useFetch(`/${sorteioID}`);

	const handleDelete = (_id) => {
		api.delete(`/${sorteioID}/${_id}`);
	};

	if (!data) return <BodyContainer>Buscando participantes</BodyContainer>;

	if (error) return <BodyContainer>{error}</BodyContainer>;

	if (data.pessoas.length === 0)
		return <BodyContainer>Adicione a primeira pessoa a este amigo secreto</BodyContainer>;

	return (
		<BodyContainer>
			<div>
				<p>Pessoas já adicionadas:</p>
				<ul>
					{data.pessoas.map((pessoa) => (
						<li>
							{pessoa.nome}
							<button className="remover" onClick={() => handleDelete(pessoa._id)}>
								<AiFillDelete size="20" />
							</button>
						</li>
					))}
				</ul>
			</div>
		</BodyContainer>
	);
};

export default ListAll;
