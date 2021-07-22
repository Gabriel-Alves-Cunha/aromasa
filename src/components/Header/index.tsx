import headerData, { HeaderData } from "./header.data";
import { BsFillPersonFill } from "react-icons/bs";
import Image from "next/image";
import Link from "next/link";
import cx from "classnames";

import AromasaLogo from "../../assets/logos/AromasaLogo.webp";

import { Cart } from "../Cart";

import {
	CartContainer,
	LogoContainer,
	Container,
	Options,
	Option,
	StyledButton,
} from "./styles";
import { useState } from "react";
import theme from "../../styles/theme";
import { makeStyles } from "@material-ui/core";

type Props = {
	currentPage?: HeaderData["label"];
};

export function Header({ currentPage }: Props) {
	const classes = useStyles();
	const [isLoggedIn, setIsLoggedIn] = useState(false);

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
