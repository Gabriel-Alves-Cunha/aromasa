import { signIn, signOut, useSession } from "next-auth/client";
import { memo, useEffect, useState } from "react";
import { makeStyles, Modal } from "@material-ui/core";
import { BsFillPersonFill } from "react-icons/bs";
import { Avatar } from "@material-ui/core";
import Image from "next/image";
import Link from "next/link";
import cx from "classnames";

import AromasaLogo from "/logos/AromasaLogo.webp";

import headerData, { HeaderData } from "./header.data";
import { Cart } from "components";

import {
	ModalContainer,
	SignOutButton,
	CartContainer,
	LogoContainer,
	SignInButton,
	StyledButton,
	Container,
	Options,
	Option,
} from "./styles";
import theme from "styles/theme";
import "react-toastify/dist/ReactToastify.css";

type Props = {
	currentPage?: HeaderData["label"];
};

function Header_({ currentPage }: Props) {
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [session] = useSession();
	const classes = useStyles();

	function handleProfileClick(e: React.MouseEvent<HTMLButtonElement>) {
		e.preventDefault();

		if (!session) handleLogin();
		else setIsModalOpen(oldValue => !oldValue);
	}

	useEffect(() => {
		handleOpenOrCloseModal();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [isModalOpen]);

	async function handleLogin() {
		await signIn("google");
	}

	async function handleLogout() {
		await signOut();
	}

	function handleOpenOrCloseModal() {
		return (
			session && (
				<Modal className={classes.modal} disableEnforceFocus open={isModalOpen}>
					<ModalContainer>
						<Avatar alt={session.user?.name ?? "?"} />

						<SignOutButton onClick={handleLogout}>Deslogar</SignOutButton>
					</ModalContainer>
				</Modal>
			)
		);
	}

	return (
		<Container>
			<LogoContainer>
				<Image
					alt="Logo da Aromasa"
					objectFit="cover"
					src={AromasaLogo}
					priority
				/>
			</LogoContainer>

			<Options>
				{headerData.map((menuItem, index) => (
					<Option key={index}>
						<Link href={menuItem.link}>
							<a>
								<div
									className={cx("background", {
										active: currentPage === menuItem.label,
									})}
								>
									{menuItem.label}
								</div>
							</a>
						</Link>
					</Option>
				))}
			</Options>

			<CartContainer>
				<StyledButton
					classes={{ root: classes.button }}
					onClick={handleProfileClick}
				>
					<BsFillPersonFill size={18} />
				</StyledButton>

				<Cart />
			</CartContainer>
		</Container>
	);
}

export const Header = memo(Header_);

const useStyles = makeStyles(_muiTheme => ({
	button: {
		color: theme.colors.light.primary,
	},
	modal: {},
}));
