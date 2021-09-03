import { GetServerSideProps } from "next";
import { useSession } from "next-auth/client";
import { useState } from "react";
import jwt from "next-auth/jwt";

import { getLayout, Header, Navbar } from "components";
import { DeleteAProduct } from "modules/DeleteAProduct";
import { AlterAProduct } from "modules/AlterAProduct";
import { NavbarOptions } from "components/Navbar/navabar.data";
import { envVariables } from "storage/env";
import { AddAProduct } from "modules/AddAProduct";
import connectToDatabase from "utils/connectToMongoDB";

import { Container } from "./styles";

function ControllPanel() {
	const [activePage, setActivePage] = useState<NavbarOptions["label"]>(
		"Adicionar um produto"
	);
	console.log(activePage);

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

ControllPanel.getLayout = getLayout;

export default ControllPanel;

export const getServerSideProps: GetServerSideProps = async ctx => {
	try {
		await connectToDatabase();

		const token = await jwt.getToken({
			req: ctx.req,
			secret: envVariables.jwtSecret,
		});
		const auth = ctx.req.headers;
		console.log("Headers =", auth);
		console.log("token =", token);

		// TODO: see if user is alowed using the DB.
		// const userIsAllowed = await getUserWithToken(token);

		if (token /* && userIsAllowed*/) return { props: {} };
		else return { notFound: true };
	} catch (error) {
		console.log(`❗ File: index.tsx\nLine:58\n${typeof error}: 'error'`, error);

		return { notFound: true };
	}
};
