import { Toolbar } from "@mui/material";

import { NavbarOptions } from "components/Navbar/navabar.data";
import { Navbar } from "components";

type Props = {
	setActivePage: React.Dispatch<React.SetStateAction<NavbarOptions["label"]>>;
	toggleNavBarOpen: React.DispatchWithoutAction;
	activePage: NavbarOptions["label"];
	navBarOpen: boolean;
};

export function AdminHeader({
	toggleNavBarOpen,
	setActivePage,
	activePage,
	navBarOpen,
}: Props) {
	return (
		<Toolbar variant="dense">
			<Navbar
				toggleNavBarOpen={toggleNavBarOpen}
				setActivePage={setActivePage}
				activePage={activePage}
				navBarOpen={navBarOpen}
			/>
		</Toolbar>
	);
}

export const TOOLBAR_HEIGHT = 48 as const;
