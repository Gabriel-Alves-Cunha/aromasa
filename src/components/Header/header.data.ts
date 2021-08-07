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
		link: "/products",
		label: "Produtos",
	},
];

export default headerData;
