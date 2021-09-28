import { Button, Divider, Typography, Avatar, Box } from "@mui/material";
import { useRef, useReducer } from "react";
import { signOut } from "next-auth/client";
import { Session } from "next-auth";

import MenuPopover from "./MenuPopover";

type Props = {
	session: Session;
};

export function AccountButton({ session }: Props) {
	const anchorEl = useRef<HTMLButtonElement>(null);
	const [open, toggleOpen] = useReducer(previousValue => !previousValue, false);

	const handleLogout = async () => await signOut();

	return (
		<>
			<Button
				style={{
					justifyContent: "center",
					alignItems: "center",
					borderRadius: "50%",
					minWidth: 42,
					height: 42,
					padding: 0,
					width: 42,
				}}
				onClick={toggleOpen}
				ref={anchorEl}
			>
				<Avatar
					src={session.user?.image ?? ""}
					alt={session.user?.name ?? "?"}
					sx={{ width: 35, height: 35 }}
				/>
			</Button>

			<MenuPopover
				anchorEl={anchorEl!.current}
				onClose={toggleOpen}
				sx={{ width: 220 }}
				open={open}
			>
				<Box sx={{ my: 1.5, px: 2.5 }}>
					<Typography variant="subtitle1" noWrap>
						{session.user?.name}
					</Typography>
					<Typography variant="body2" sx={{ color: "text.secondary" }} noWrap>
						{session.user?.email}
					</Typography>
				</Box>

				<Divider sx={{ my: 1 }} />

				<Box sx={{ p: 2, pt: 1.5 }}>
					<Button
						onClick={handleLogout}
						variant="outlined"
						color="inherit"
						fullWidth
					>
						Logout
					</Button>
				</Box>
			</MenuPopover>
		</>
	);
}
