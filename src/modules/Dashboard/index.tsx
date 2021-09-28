import { Box, Typography } from "@mui/material";

// import { ChangeNewProducts } from "modules/ChangeNewProducts";

export function Dashboard() {
	return (
		<div style={{ margin: "2em" }}>
			{/* <Box sx={{ pb: 5 }}> */}
			<Typography
				style={{
					fontFamily: "Poppins",
				}}
				variant="h6"
			>
				Olá, bem-vindo(a) de volta!
			</Typography>
			{/* </Box> */}

			{/* <ChangeNewProducts></ChangeNewProducts> */}
		</div>
	);
}
