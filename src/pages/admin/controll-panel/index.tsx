import { useState } from "react";

import { getFooterlessLayout } from "../../../components/Layout";
import { DeleteAProduct } from "../../../modules/DeleteAProduct";
import { AlterAProduct } from "../../../modules/AlterAProduct";
import { NavbarOptions } from "../../../components/Navbar/navabar.data";
import { AddAProduct } from "../../../modules/AddAProduct";
import { Navbar } from "../../../components";

import { Container } from "./styles";

function ControllPanel() {
	const [activePage, setActivePage] = useState<NavbarOptions["label"]>(
		"Adicionar um produto"
	);
	console.log(activePage);

	return (
		<Container>
			<Navbar activePage={activePage} setActivePage={setActivePage} />

			{(() => {
				if (activePage === "Adicionar um produto") {
					return <AddAProduct />;
				} else if (activePage === "Alterar um produto")
					return <AlterAProduct />;
				else if (activePage === "Deletar um produto") return <DeleteAProduct />;
			})()}
		</Container>
	);
}

ControllPanel.getLayout = getFooterlessLayout;

export default ControllPanel;
