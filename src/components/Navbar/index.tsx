import { Drawer, IconButton } from "@mui/material";
import { IoMenuOutline } from "react-icons/io5";
import { useRouter } from "next/router";
import Image from "next/image";

import navbarOptions, { NavbarOptions } from "./navabar.data";

import AromasaLogo from "public/images/AromasaLogo.webp";

import { Container, Option, LogoContainer } from "./styles";

type Props = {
	setActivePage: React.Dispatch<React.SetStateAction<NavbarOptions["label"]>>;
	toggleNavBarOpen: React.DispatchWithoutAction;
	activePage: NavbarOptions["label"];
	navBarOpen: boolean;
};

export function Navbar({
	toggleNavBarOpen,
	setActivePage,
	activePage,
	navBarOpen,
}: Props) {
	const router = useRouter();

	const go2HomePage = async () => await router.push("/");

	return (
		<>
			<IconButton onClick={toggleNavBarOpen} aria-label="Abrir/Fechar menu">
				<IoMenuOutline size={20} />
			</IconButton>

			<Drawer anchor="left" open={navBarOpen} onClose={toggleNavBarOpen}>
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
								toggleNavBarOpen();
							}}
							className={`background ${
								activePage === option.label && "active"
							}`}
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
