import { Toolbar } from "@mui/material";

import { NavbarOptions } from "components/Navbar/navabar.data";
import { Navbar } from "components/Navbar";

type Props = {
	setActivePage: React.Dispatch<React.SetStateAction<NavbarOptions["label"]>>;
	setNavBarOpen: React.Dispatch<React.SetStateAction<boolean>>;
	activePage: NavbarOptions["label"];
	navBarOpen: boolean;
};

export function AdminHeader({
	setActivePage,
	setNavBarOpen,
	activePage,
	navBarOpen,
}: Props) {
	return (
		<Toolbar variant="dense">
			<Navbar
				setActivePage={setActivePage}
				setNavBarOpen={setNavBarOpen}
				activePage={activePage}
				navBarOpen={navBarOpen}
			/>
		</Toolbar>
	);
}

export const TOOLBAR_HEIGHT = 48 as const;
