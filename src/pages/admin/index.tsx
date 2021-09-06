import { GetServerSideProps } from "node_modules/next";
import { getSession } from "next-auth/client";
import { useState } from "react";

import { Header, Navbar } from "components";
import { DeleteAProduct } from "modules/DeleteAProduct";
import { AlterAProduct } from "modules/AlterAProduct";
import { NavbarOptions } from "components/Navbar/navabar.data";
import { AddAProduct } from "modules/AddAProduct";
import { UserModel } from "models/User";
import connectToDatabase from "utils/connectToMongoDB";

import { Container } from "./styles";

function ControllPanel() {
	const [activePage, setActivePage] = useState<NavbarOptions["label"]>(
		"Adicionar um produto"
	);

	return (
		<>
			<Header />

			<Container>
				<Navbar activePage={activePage} setActivePage={setActivePage} />

				{(() => {
					if (activePage === "Adicionar um produto") return <AddAProduct />;
					else if (activePage === "Alterar um produto")
						return <AlterAProduct />;
					else if (activePage === "Deletar um produto")
						return <DeleteAProduct />;
				})()}
			</Container>
		</>
	);
}

export default ControllPanel;

export const getServerSideProps: GetServerSideProps = async ctx => {
	try {
		const session = await getSession(ctx);
		console.log("session =", session);

		// See if user is alowed using the DB.
		const userIsAllowed = await checkIfUserIsAllowed(
			session?.user?.email ?? ""
		);

		if (session && userIsAllowed) return { props: {} };
		else return { notFound: true };
	} catch (error) {
		console.log(`❗ File: index.tsx\nLine:58\n${typeof error}: 'error'`, error);

		return { notFound: true };
	}
};

async function checkIfUserIsAllowed(email: string) {
	try {
		await connectToDatabase();

		const user = await UserModel.find({ email });
		console.log("user =", user);

		if (user[0] && user[0].admin) return true;
		else return false;
	} catch (error) {
		console.error(error);
		return false;
	}
}
