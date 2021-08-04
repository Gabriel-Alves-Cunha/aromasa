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
import axios from "axios";

import { ProductToAdd } from ".";
import { Button } from "./styles";
import { myFormId } from ".";

import { Container } from "./modalStyles";
import { Bottle } from "./styles";

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
	reset: UseFormReset<ProductToAdd>;
	product: ProductToAdd;
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

	async function addAProduct(productInfo: ProductToAdd) {
		setSaving(true);

		try {
			const formData = new FormData();
			files.forEach((file, index) =>
				formData.append(`image.${index}`, file, file.name)
			);

			buildFormData(formData, productInfo, "");
			console.group("Form data = ", ...formData);

			const newProductResponse = await axios.post("/api/products", formData);

			console.log("newProduct =", newProductResponse.data);

			if (newProductResponse.status === 201) {
				setToast({ success: true, error: "", resolved: true });

				//@ts-ignore
				document.getElementById(myFormId)?.reset();
				reset();
			}
		} catch (error) {
			console.debug("\nError in addAProduct() =", error);

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
								defaultValue={product.category}
								variant="outlined"
								label="Categoria"
								disabled
							/>
							<TextField
								label="Preço"
								variant="outlined"
								disabled
								defaultValue={product.price}
								InputProps={{
									startAdornment: (
										<InputAdornment position="start">R$</InputAdornment>
									),
								}}
							/>
							<div
								style={{ width: "100%", textAlign: "center", color: "gray" }}
							>
								<input
									type="checkbox"
									style={{ margin: "0.4rem" }}
									checked={product.isAvailable}
									disabled
								/>
								<label>Este produto está disponível para venda?</label>
							</div>
							<TextField
								label="Dicas de uso"
								variant="outlined"
								disabled
								multiline
								defaultValue={product.usage_tips}
							/>
							<TextField
								label="Descrição"
								variant="outlined"
								multiline
								disabled
								defaultValue={product.description}
							/>
							{product.available_bottles.map((item, index) => (
								<Bottle key={index} style={{ margin: "2.5rem 0" }}>
									<TextField
										variant="outlined"
										defaultValue={item.bottle_format}
										label="Formato da garrafa"
										disabled
									/>
									<TextField
										variant="outlined"
										label="Quantidade disponível"
										disabled
										defaultValue={item.available_quantity}
									/>
									<TextField
										label="Volume"
										variant="outlined"
										disabled
										InputProps={{
											endAdornment: (
												<InputAdornment position="start">mL</InputAdornment>
											),
										}}
										defaultValue={item.volume}
									/>
									<TextField
										label="Peso"
										variant="outlined"
										InputProps={{
											endAdornment: (
												<InputAdornment position="start">Kg</InputAdornment>
											),
										}}
										disabled
										defaultValue={item.weight}
									/>
								</Bottle>
							))}
						</Container>
					</Fade>
				</DialogContentText>
			</DialogContent>

			<DialogActions>
				<Button onClick={handleClose} color="primary">
					Cancel
				</Button>
				<Button
					onClick={() => {
						setOpen(false);
						addAProduct(product);
					}}
				>
					Confirmar
				</Button>
			</DialogActions>
		</Dialog>
	);
}

function buildFormData(formData: FormData, data: any, parentKey: string) {
	if (
		data &&
		typeof data === "object" &&
		!(data instanceof Date) &&
		!(data instanceof File) &&
		!(data instanceof Blob)
	) {
		Object.keys(data).forEach(key => {
			buildFormData(
				formData,
				data[key],
				parentKey ? `${parentKey}.${key}` : key
			);
		});
	} else {
		const value = data === null ? "" : data;

		formData.append(parentKey, value);
	}
}
