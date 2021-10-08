import type { GetServerSideProps } from "node_modules/next";

import { useState, useReducer } from "react";
import { getSession } from "next-auth/client";

import { NavbarOptions } from "components/Navbar/navabar.data";
import { UserModel } from "models/User";
import { assert } from "utils/assert";
import {
	DeleteAProduct,
	AlterAProduct,
	AddAProduct,
	AdminHeader,
	Dashboard,
} from "modules/index";
import connectToMongoDB from "utils/connectToMongoDB";

export default function ControllPanel() {
	const [activePage, setActivePage] =
		useState<NavbarOptions["label"]>("Dashboard");
	const [navBarOpen, toggleNavBarOpen] = useReducer(
		previousValue => !previousValue,
		false
	);

	return (
		<>
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
		</>
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
		return { notFound: true };
	} catch (error) {
		console.error(
			`❗ File: index.tsx\nLine:66\n${typeof error}: 'error' =`,
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
		return false;
	} catch (error) {
		console.error(error);
		return false;
	}
}
