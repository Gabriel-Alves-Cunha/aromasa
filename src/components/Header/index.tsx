import headerData, { HeaderData } from "./header.data";
import { BsFillPersonFill } from "react-icons/bs";
import { makeStyles } from "@material-ui/core";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import cx from "classnames";

import AromasaLogo from "../../assets/logos/AromasaLogo.webp";

import { Cart } from "../Cart";

import {
	CartContainer,
	LogoContainer,
	StyledButton,
	Container,
	Options,
	Option,
} from "./styles";
import theme from "../../styles/theme";

type Props = {
	currentPage?: HeaderData["label"];
};

export default function Header({ currentPage }: Props) {
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const classes = useStyles();
	// console.log(`currentPage = ${currentPage}`);

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
				<StyledButton classes={{ root: classes.button }}>
					<BsFillPersonFill size={18} />
				</StyledButton>

				<Cart />
			</CartContainer>
		</Container>
	);
}

const useStyles = makeStyles(_muiTheme => ({
	button: {
		color: theme.colors.light.primary,
	},
}));
