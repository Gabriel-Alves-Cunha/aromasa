import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

import { Container } from "./styles";

export type Props = {
	direction: "right" | "left";
	handleClick(): void;
	enabled: boolean;
};

export function Arrow({ direction, handleClick, enabled }: Props) {
	return (
		<Container direction={direction} onClick={handleClick} enabled={enabled}>
			{direction === "right" ? <IoIosArrowForward /> : <IoIosArrowBack />}
		</Container>
	);
}
