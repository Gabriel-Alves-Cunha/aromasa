import { signIn, useSession } from "next-auth/client";
import { BsFillPersonFill } from "react-icons/bs";
import { IconButton } from "@mui/material";
import { useRouter } from "next/router";
import { memo } from "react";
import Image from "next/image";
import Link from "next/link";

import AromasaLogo from "public/images/AromasaLogo.webp";

import headerData, { HeaderData } from "./header.data";
import { Cart, AccountButton } from "components";
import { json2str } from "utils/json2str";

import {
	CartContainer,
	LogoContainer,
	Container,
	useStyles,
	Options,
} from "./styles";
import "react-toastify/dist/ReactToastify.css";

type Props = {
	currentPage?: HeaderData["label"];
};

function Header_({ currentPage }: Props) {
	const [session] = useSession();
	const classes = useStyles();
	const router = useRouter();

	const handleLogin = async (e: React.MouseEvent<HTMLButtonElement>) => {
		e.preventDefault();

		try {
			await signIn("google");
		} catch (error) {
			console.error(json2str(error));
		}
	};

	const go2HomePage = async () => await router.push("/");

	return (
		<Container>
			<LogoContainer onClick={go2HomePage}>
				<Image
					alt="Logo da Aromasa"
					src={AromasaLogo}
					objectFit="cover"
					priority
				/>
			</LogoContainer>

			<Options>
				{headerData.map(menuItem => (
					<Link href={menuItem.link} prefetch={false} key={menuItem.label}>
						<a className="option">
							<div
								className={`background ${
									currentPage === menuItem.label && "active"
								}`}
							>
								{menuItem.label}
							</div>
						</a>
					</Link>
				))}
			</Options>

			<CartContainer>
				{session ? (
					<AccountButton session={session} />
				) : (
					<IconButton
						classes={{ root: classes.button }}
						onClick={handleLogin}
						aria-label="Logar"
						size="large"
					>
						<BsFillPersonFill size={18} />
					</IconButton>
				)}

				<Cart />
			</CartContainer>
		</Container>
	);
}

export const Header = memo(Header_, (prevProps, nextProps) =>
	prevProps.currentPage === nextProps.currentPage ? true : false
);
