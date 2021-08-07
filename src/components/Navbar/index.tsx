import cx from "classnames";

import navbarOptions, { NavbarOptions } from "./navabar.data";

import { Container, Option } from "./styles";

type Props = {
	setActivePage: React.Dispatch<React.SetStateAction<NavbarOptions["label"]>>;
	activePage: NavbarOptions["label"];
};

export default function Navbar({ activePage, setActivePage }: Props) {
	return (
		<Container>
			{navbarOptions.map((option, index) => (
				<Option
					onClick={() => setActivePage(option.label)}
					className={cx("background", {
						active: activePage === option.label,
					})}
					key={option.label + index}
				>
					{option.Icon}
					{option.label}
				</Option>
			))}
		</Container>
	);
}
