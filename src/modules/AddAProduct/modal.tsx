import { UseFormReset } from "react-hook-form";
import {
	DialogContentText,
	InputAdornment,
	DialogContent,
	DialogActions,
	DialogTitle,
	TextField,
	Dialog,
	Fade,
} from "@material-ui/core";

import { buildFormData, myFormId } from "./helper";
import { ProductToAddToTheServer } from ".";
import { axiosInstance } from "hooks/useAxios";

import { Container } from "./modalStyles";
import { Button } from "./styles";

type Props = {
	setToast: React.Dispatch<
		React.SetStateAction<{
			resolved: boolean;
			success: boolean;
			error: string;
		}>
	>;
	setSaving: React.Dispatch<React.SetStateAction<boolean>>;
	setOpen: React.Dispatch<React.SetStateAction<boolean>>;
	reset(): void;
	product: ProductToAddToTheServer;
	files: File[];
	open: boolean;
};

export function ConfirmationModal({
	setSaving,
	setToast,
	product,
	setOpen,
	files,
	reset,
	open,
}: Props) {
	const handleClose = () => setOpen(false);

	async function addAProduct(productInfo: ProductToAddToTheServer) {
		setSaving(true);

		const formData = new FormData();
		files.forEach((file, index) =>
			formData.append(`image.${index}`, file, file.name)
		);

		buildFormData(formData, productInfo, "");
		console.group("Form data = ", ...formData);

		try {
			const newProductResponse = await axiosInstance.post(
				"/api/products",
				formData
			);

			console.log("newProduct =", newProductResponse);

			if (newProductResponse.status === 201) {
				setToast({ success: true, error: "", resolved: true });

				reset();
			} else
				setToast({
					error: "Something happened! inspect the element on console.",
					resolved: true,
					success: false,
				});
		} catch (error: any) {
			console.error("\nError in addAProduct() =", error);

			setToast({ success: false, error, resolved: true });
		}

		setSaving(false);
	}

	return (
		<Dialog onClose={handleClose} open={open} scroll="paper" fullScreen>
			<DialogTitle>Confirme os dados</DialogTitle>
			<DialogContent dividers={true}>
				<DialogContentText tabIndex={-1}>
					<Fade in={open}>
						<Container>
							<TextField
								defaultValue={product.title}
								variant="outlined"
								label="Título"
								disabled
							/>
							<TextField
								defaultValue={product.categories}
								variant="outlined"
								label="Categoria"
								disabled
							/>
							<TextField
								InputProps={{
									startAdornment: (
										<InputAdornment position="start">R$</InputAdornment>
									),
								}}
								defaultValue={product.price}
								variant="outlined"
								label="Preço"
								disabled
							/>
							<div
								style={{ width: "100%", textAlign: "center", color: "gray" }}
							>
								<input
									checked={product.isAvailableToSell}
									style={{ margin: "0.4rem" }}
									type="checkbox"
									disabled
								/>
								<label>Este produto está disponível para venda?</label>
							</div>
							<TextField
								defaultValue={product.usage_tips}
								label="Dicas de uso"
								variant="outlined"
								multiline
								disabled
							/>
							<TextField
								defaultValue={product.description}
								variant="outlined"
								label="Descrição"
								multiline
								disabled
							/>
							<TextField
								defaultValue={product.bottle.bottle_format}
								label="Formato da garrafa"
								variant="outlined"
								disabled
							/>
							<TextField
								defaultValue={product.bottle.available_quantity}
								label="Quantidade disponível"
								variant="outlined"
								disabled
							/>
							<TextField
								InputProps={{
									endAdornment: (
										<InputAdornment position="start">mL</InputAdornment>
									),
								}}
								defaultValue={product.bottle.volume}
								variant="outlined"
								label="Volume"
								disabled
							/>
							<TextField
								InputProps={{
									endAdornment: (
										<InputAdornment position="start">Kg</InputAdornment>
									),
								}}
								defaultValue={product.bottle.weight}
								variant="outlined"
								label="Peso"
								disabled
							/>
						</Container>
					</Fade>
				</DialogContentText>
			</DialogContent>

			<DialogActions>
				<Button onClick={handleClose} color="primary">
					Voltar
				</Button>

				<Button
					onClick={() => {
						console.log("Product =", product);
						addAProduct(product);
						setOpen(false);
					}}
				>
					Confirmar
				</Button>
			</DialogActions>
		</Dialog>
	);
}
