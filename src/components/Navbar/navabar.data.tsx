import { AiFillDelete, AiOutlineEdit } from "react-icons/ai";
import { IoAddSharp } from "react-icons/io5";

export type NavbarOptions = {
	label: "Adicionar um produto" | "Deletar um produto" | "Alterar um produto";
	link: string;
	Icon: JSX.Element;
};

const navbarOptions: NavbarOptions[] = [
	{
		link: "/",
		label: "Adicionar um produto",
		Icon: <IoAddSharp style={{ marginRight: 9 }} />,
	},
	{
		link: "/",
		label: "Deletar um produto",
		Icon: <AiFillDelete style={{ marginRight: 9 }} />,
	},
	{
		link: "/",
		label: "Alterar um produto",
		Icon: <AiOutlineEdit style={{ marginRight: 9 }} />,
	},
];

export default navbarOptions;
