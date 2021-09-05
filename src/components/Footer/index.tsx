import { BsChevronRight } from "react-icons/bs";
import Image from "next/image";
import Link from "next/link";

import Sublogo from "/static/sublogo_preto.png";

import { envVariables } from "storage/env";

import {
	LogoContainer,
	Container,
	Contact,
	Options,
	Social,
	Option,
} from "./styles";

export function Footer() {
	return (
		<Container>
			<LogoContainer>
				<Image src={Sublogo} alt="Logo da Aromasa Decor." />
			</LogoContainer>

			<Social>
				<h2>Redes sociais</h2>

				<div className="border-bottom-size" />

				<Options>
					{socialNetworkOptions.map((item, index) => (
						<Option key={index}>
							<a href={item.link}>
								<div className={"name"}>
									<BsChevronRight size={15} style={{ marginRight: 10 }} />
									{item.title}
								</div>
							</a>
						</Option>
					))}
				</Options>
			</Social>

			<Contact>
				<h2>Informações</h2>

				<div className="border-bottom-size" />

				<Options>
					{informationOptions.map((item, index) => (
						<Option key={item.link + index}>
							<Link href={item.link}>
								<a>
									<div>
										<BsChevronRight size={15} style={{ marginRight: 10 }} />
										{item.title}
									</div>
								</a>
							</Link>
						</Option>
					))}
				</Options>
			</Contact>
		</Container>
	);
}

const socialNetworkOptions = [
	{
		title: "INSTAGRAM",
		link: "https://www.instagram.com/aromasadecor/",
	},
	{
		title: "PINTEREST",
		link: "https://br.pinterest.com/aromasadecor/_created/",
	},
	// {
	// 	title: "FACEBOOK",
	// 	link: "",
	// },
	{
		title: "WhatsApp",
		link: "/",
	},
];

const informationOptions = [
	{
		title: "Pagamentos",
		link: "/",
	},
	{
		title: "Fale conosco",
		link: `mailto:${envVariables.contactEmail}`,
	},
	{
		title: "Entregas e devoluções",
		link: "/",
	},
	{
		title: "Política de privacidade e termos de uso",
		link: "/privacy-policy",
	},
];
