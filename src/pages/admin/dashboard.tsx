import { signIn, signOut, useSession } from "next-auth/client";

/* const [session, loading] = useSession();
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
			)} */
