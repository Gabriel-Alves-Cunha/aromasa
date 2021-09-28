import { Box, Typography } from "@mui/material";

export function Dashboard() {
	return (
		<div style={{ margin: "2em" }}>
			<Box sx={{ pb: 5 }}>
				<Typography
					style={{
						fontFamily: "Poppins",
					}}
					variant="h6"
				>
					Olá, bem-vindo(a) de volta!
				</Typography>
			</Box>
		</div>
	);
}
