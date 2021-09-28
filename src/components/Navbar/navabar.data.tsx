import { AiFillDelete, AiOutlineEdit } from "react-icons/ai";
import { MdAdd } from "react-icons/md";
import { BsGraphUp } from "react-icons/bs";

export type NavbarOptions = {
	Icon: JSX.Element;
	label:
		| "Dashboard"
		| "Adicionar um produto"
		| "Deletar um produto"
		| "Alterar um produto";
};

const navbarOptions: NavbarOptions[] = [
	{
		label: "Dashboard",
		Icon: <BsGraphUp style={{ marginRight: 9 }} size={16} />,
	},
	{
		label: "Adicionar um produto",
		Icon: <MdAdd style={{ marginRight: 9 }} size={16} />,
	},
	{
		label: "Deletar um produto",
		Icon: <AiFillDelete style={{ marginRight: 9 }} size={16} />,
	},
	{
		label: "Alterar um produto",
		Icon: <AiOutlineEdit style={{ marginRight: 9 }} size={16} />,
	},
];

export default navbarOptions;
