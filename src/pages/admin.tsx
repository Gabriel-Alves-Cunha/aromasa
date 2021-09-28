import { useState, useReducer } from "react";
import { GetServerSideProps } from "node_modules/next";
import { getSession } from "next-auth/client";

import { DeleteAProduct } from "modules/DeleteAProduct";
import { AlterAProduct } from "modules/AlterAProduct";
import { NavbarOptions } from "components/Navbar/navabar.data";
import { NAVBAR_WIDTH } from "components/Navbar/styles";
import { AddAProduct } from "modules/AddAProduct";
import { AdminHeader } from "modules/AdminHeader";
import { Dashboard } from "modules/Dashboard";
import { UserModel } from "models/User";
import { assert } from "utils/assert";
import connectToMongoDB from "utils/connectToMongoDB";

export default function ControllPanel() {
	const [activePage, setActivePage] =
		useState<NavbarOptions["label"]>("Dashboard");
	const [navBarOpen, toggleNavBarOpen] = useReducer(
		previousValue => !previousValue,
		false
	);

	return (
		<div
			style={{
				padding: `90 0 0 ${navBarOpen ? NAVBAR_WIDTH : 0}`,
			}}
		>
			<AdminHeader
				toggleNavBarOpen={toggleNavBarOpen}
				setActivePage={setActivePage}
				activePage={activePage}
				navBarOpen={navBarOpen}
			/>

			{(() => {
				switch (activePage) {
					case "Dashboard":
						return <Dashboard />;
					case "Adicionar um produto":
						return <AddAProduct />;
					case "Alterar um produto":
						return <AlterAProduct />;
					case "Deletar um produto":
						return <DeleteAProduct />;
				}
			})()}
		</div>
	);
}

export const getServerSideProps: GetServerSideProps = async ctx => {
	try {
		const session = await getSession(ctx);
		assert(session, "There is no session!");
		const email = session.user?.email;
		assert(email, "There is no email in session!");

		// I know it is faaaar from beign safe...
		const userIsAllowed = await checkIfUserIsAllowedToMessWithTheDatabase(
			email
		);

		if (userIsAllowed) return { props: {} };
		else return { notFound: true };
	} catch (error) {
		console.error(
			`❗ File: index.tsx\nLine:57\n${typeof error}: 'error' =`,
			error
		);

		return { notFound: true };
	}
};

async function checkIfUserIsAllowedToMessWithTheDatabase(email: string) {
	try {
		await connectToMongoDB();

		const user = await UserModel.find({ email });
		console.log("user =", user);

		if (user[0] && user[0].admin) return true;
		else return false;
	} catch (error) {
		if (process.env.NODE_ENV === "development") console.error(error);
		return false;
	}
}
