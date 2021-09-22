import { GetServerSideProps } from "node_modules/next";
import { getSession } from "next-auth/client";
import { useState } from "react";

// TODO: lazy
import { DeleteAProduct } from "modules/DeleteAProduct";
import { Header, Navbar } from "components";
import { AlterAProduct } from "modules/AlterAProduct";
import { NavbarOptions } from "components/Navbar/navabar.data";
import { AddAProduct } from "modules/AddAProduct";
import { UserModel } from "models/User";
import { assert } from "utils/assert";
import connectToMongoDB from "utils/connectToMongoDB";

import { Container } from "styles/pages/admin";

export default function ControllPanel() {
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

export const getServerSideProps: GetServerSideProps = async ctx => {
	try {
		const session = await getSession(ctx);
		assert(session, "There is no session!");
		const email = session.user?.email;
		assert(email, "There is no email in session!");

		const userIsAllowed = await checkIfUserIsAllowedToUseDatabase(email);

		if (userIsAllowed) return { props: {} };
		else return { notFound: true };
	} catch (error) {
		console.error(
			`❗ File: index.tsx\nLine:53\n${typeof error}: 'error' =`,
			error
		);

		return { notFound: true };
	}
};

async function checkIfUserIsAllowedToUseDatabase(email: string) {
	try {
		await connectToMongoDB();

		const user = await UserModel.find({ email });
		console.log("user =", user);

		if (user[0] && user[0].admin) return true;
		else return false;
	} catch (error) {
		console.error(error);
		return false;
	}
}
