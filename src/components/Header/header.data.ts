export type HeaderData = {
	label: "Home" | "Produtos";
	link: string;
};

const headerData: HeaderData[] = [
	{
		link: "/",
		label: "Home",
	},
	{
		link: "#",
		label: "Produtos",
	},
];

export default headerData;
