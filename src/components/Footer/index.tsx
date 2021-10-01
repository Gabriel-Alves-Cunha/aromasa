import { RiInstagramFill } from "react-icons/ri";
import { BsChevronRight } from "react-icons/bs";
import { FaPinterest } from "react-icons/fa";
import Image from "next/image";
import Link from "next/link";

import Logo from "public/images/AromasaLogo.webp";

import { envVariables } from "utils/env";

import {
	FootersFooter,
	LogoContainer,
	Container,
	Contact,
	Options,
	Wrapper,
	Social,
	Option,
} from "./styles";

export function Footer() {
	return (
		<Wrapper>
			<Container>
				<LogoContainer>
					<Image src={Logo} alt="Logo da Aromasa Decor." />
				</LogoContainer>

				<Social>
					<h2>Redes sociais</h2>

					<div className="border-bottom-size" />

					<Options>
						{socialNetworkOptions.map(item => (
							<Option key={item.link}>
								<a
									rel="noopener noreferrer"
									className="name"
									href={item.link}
									target="_blank"
								>
									{item.icon}
									{item.title}
								</a>
							</Option>
						))}
					</Options>
				</Social>

				<Contact>
					<h2>Informações</h2>

					<div className="border-bottom-size" />

					<Options>
						{informationOptions.map(item => (
							<Option key={item.link}>
								<Link href={item.link}>
									<a target="_blank" rel="noopener noreferrer">
										<BsChevronRight size={10} style={{ marginRight: 10 }} />
										{item.title}
									</a>
								</Link>
							</Option>
						))}
					</Options>
				</Contact>
			</Container>

			<FootersFooter>
				<span>&copy; 2021 - Aromasa Decor</span>
			</FootersFooter>
		</Wrapper>
	);
}

const socialNetworkOptions = [
	{
		title: "INSTAGRAM",
		link: "https://www.instagram.com/aromasadecor/",
		icon: <RiInstagramFill size={17} style={{ marginRight: 10 }} />,
	},
	{
		title: "PINTEREST",
		link: "https://br.pinterest.com/aromasadecor/_created/",
		icon: <FaPinterest size={17} style={{ marginRight: 10 }} />,
	},
	// {
	// 	title: "FACEBOOK",
	// 	link: "",
	// },
	// {
	// 	title: "WhatsApp",
	// 	link: "/",
	// },
];

const informationOptions = [
	// {
	// 	title: "Pagamentos",
	// 	link: "/",
	// },
	{
		title: "Fale conosco",
		link: `mailto:${envVariables.contactEmail}`,
	},
	// {
	// 	title: "Entregas e devoluções",
	// 	link: "/",
	// },
	{
		title: "Política de privacidade e termos de uso",
		link: "/privacy-policy",
	},
];
