import { signIn, signOut, useSession } from "next-auth/client";

import { Container, Loading } from "../../styles/pages/admin/dashboard";

export default function Dashboard() {
	const [session, loading] = useSession();

	if (session) {
		console.log(`\n[LOG] session.user = ${session.user}`);
		console.log(session);
	}

	return (
		<Container>
			{loading && <Loading>Loading...</Loading>}
			{!session && (
				<>
					Not signed in <br />
					<button
						onClick={() =>
							signIn("google", { callbackUrl: "http://localhost:3000/" })
						}
					>
						Sign in
					</button>
				</>
			)}
			{session && (
				<>
					Signed in as {session.user?.name} <br />
					<button onClick={() => signOut()}>Sign out</button>
				</>
			)}
		</Container>
	);
}
