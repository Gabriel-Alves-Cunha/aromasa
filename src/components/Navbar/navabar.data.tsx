import { AiFillDelete, AiOutlineEdit } from "react-icons/ai";
import { IoAddSharp } from "react-icons/io5";

export type NavbarOptions = {
	label: "Adicionar um produto" | "Deletar um produto" | "Alterar um produto";
	Icon: JSX.Element;
};

const navbarOptions: NavbarOptions[] = [
	{
		label: "Adicionar um produto",
		Icon: <IoAddSharp style={{ marginRight: 9 }} />,
	},
	{
		label: "Deletar um produto",
		Icon: <AiFillDelete style={{ marginRight: 9 }} />,
	},
	{
		label: "Alterar um produto",
		Icon: <AiOutlineEdit style={{ marginRight: 9 }} />,
	},
];

export default navbarOptions;
