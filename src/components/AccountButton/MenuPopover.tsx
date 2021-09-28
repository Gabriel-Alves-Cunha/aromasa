import { alpha, Theme } from "@mui/material/styles";
import { ReactNode } from "react";
import { Popover } from "@mui/material";
import { SxProps } from "@mui/system";

type MenuPopoverProps = {
	anchorEl: React.RefObject<HTMLButtonElement>["current"];
	children: ReactNode;
	sx: SxProps<Theme>;
	onClose(): void;
	open: boolean;
};

const transparent = alpha("#919EAB", 0.24);

export default function MenuPopover({
	anchorEl,
	children,
	onClose,
	open,
	sx,
}: MenuPopoverProps) {
	return (
		<Popover
			open={open}
			onClose={onClose}
			anchorOrigin={{
				vertical: "bottom",
				horizontal: "left",
			}}
			transformOrigin={{
				vertical: "top",
				horizontal: "right",
			}}
			PaperProps={{
				sx: {
					boxShadow: `0 0 2px 0 ${transparent}, 0 20px 40px -4px ${transparent}`,
					overflow: "inherit",
					width: 200,
					mt: 1.5,
					ml: 0.5,
					...sx,
				},
			}}
			anchorEl={anchorEl}
		>
			{children}
		</Popover>
	);
}
