import { BsChevronRight } from "react-icons/bs";
import Image from "next/image";
import Link from "next/link";

import Sublogo from "../../assets/logos/Sublogo preto.png";

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
				<Image src={Sublogo} />
			</LogoContainer>

			<Social>
				<h1>Redes sociais</h1>

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
				<h1>Informações</h1>

				<div className="border-bottom-size" />

				<Options>
					{informationOptions.map((item, index) => (
						<Option key={index}>
							<Link href={item.link}>
								<a>
									<div className={"name"}>
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
		link: "/",
	},
	{
		title: "PINTEREST",
		link: "/",
	},
	{
		title: "FACEBOOK",
		link: "",
	},
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
		link: "",
	},
	{
		title: "Entregas e devoluções",
		link: "",
	},
	{
		title: "Política de privacidade",
		link: "/privacy-policy"
	}
];
