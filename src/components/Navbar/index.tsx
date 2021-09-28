import { Drawer, IconButton } from "@mui/material";
import { IoMenuOutline } from "react-icons/io5";
import { useRouter } from "next/router";
import Image from "next/image";
import cx from "classnames";

import navbarOptions, { NavbarOptions } from "./navabar.data";

import AromasaLogo from "public/images/AromasaLogo.webp";

import { Container, Option, LogoContainer } from "./styles";

type Props = {
	setActivePage: React.Dispatch<React.SetStateAction<NavbarOptions["label"]>>;
	setNavBarOpen: React.Dispatch<React.SetStateAction<boolean>>;
	activePage: NavbarOptions["label"];
	navBarOpen: boolean;
};

export function Navbar({
	setNavBarOpen,
	setActivePage,
	activePage,
	navBarOpen,
}: Props) {
	const router = useRouter();

	const handleToggle = () => setNavBarOpen(oldValue => !oldValue);
	const go2HomePage = async () => await router.push("/");

	return (
		<>
			<IconButton onClick={handleToggle}>
				<IoMenuOutline size={20} />
			</IconButton>

			<Drawer anchor="left" open={navBarOpen} onClose={handleToggle}>
				<Container>
					<LogoContainer onClick={go2HomePage}>
						<Image
							alt="Logo da Aromasa"
							src={AromasaLogo}
							objectFit="cover"
							className="img"
						/>
					</LogoContainer>

					{navbarOptions.map(option => (
						<Option
							onClick={() => {
								setActivePage(option.label);
								handleToggle();
							}}
							className={cx("background", {
								active: activePage === option.label,
							})}
							key={option.label}
						>
							{option.Icon}
							{option.label}
						</Option>
					))}
				</Container>
			</Drawer>
		</>
	);
}
