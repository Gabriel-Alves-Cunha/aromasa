import { signIn, useSession } from "next-auth/client";
import { BsFillPersonFill } from "react-icons/bs";
import { memo, ReactNode } from "react";
import { IconButton } from "@mui/material";
import { useRouter } from "next/router";
import Image from "next/image";
import Link from "next/link";

import AromasaLogo from "public/images/AromasaLogo.webp";

import headerData, { HeaderData } from "./header.data";
import { AccountButton } from "components";
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
	children?: ReactNode;
};

function Header_({ children, currentPage }: Props) {
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
			<LogoContainer>
				<Image
					onClick={go2HomePage}
					alt="Logo da Aromasa"
					src={AromasaLogo}
					objectFit="cover"
					className="logo"
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

				{children}
			</CartContainer>
		</Container>
	);
}

export const Header = memo(Header_, (prevProps, nextProps) =>
	prevProps.currentPage === nextProps.currentPage ? true : false
);
