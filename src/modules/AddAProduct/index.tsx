import { InputAdornment, TextField, CircularProgress } from "@material-ui/core";
import { useFieldArray, Controller, useForm } from "react-hook-form";
import { toast as doToast, ToastContainer } from "react-toastify";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import { useState, Fragment } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect } from "react";
import { green } from "@material-ui/core/colors";
import * as yup from "yup";

import { Product as NotToUseProductModel } from "../../models/Product";
import { ConfirmationModal } from "./modal";
import { MyDropzone } from "../../components";

import { Container, Bottle, Button, BorderBottom } from "./styles";
import "react-toastify/dist/ReactToastify.css";

export type ProductToAdd = Omit<NotToUseProductModel, "_id">;

const schema = yup.object().shape({
	title: yup
		.string()
		.trim()
		.required("Um título para o produto é necessário!")
		.max(200, "O título não pode ter mais de 200 caracteres!"),
	price: yup
		.number()
		.positive("O preço deve um número positivo!")
		.required("Um preço para o produto é necessário!"),
	category: yup
		.array()
		.of(yup.string().trim())
		.min(1)
		.required("Uma categoria do produto é necessária!"),
	description: yup
		.string()
		.trim()
		.max(2000, "A descrição não pode ter mais de 2.000 caracteres!")
		.required("Uma descrição do produto é necessária!"),
	available_bottles: yup.array(
		yup.object().shape({
			available_quantity: yup
				.number()
				.integer()
				.positive("A quantidade disponível deve um número positivo!")
				.min(0)
				.required("A quantidade disponível deste produto é necessária!"),
			bottle_format: yup
				.string()
				.trim()
				.max(50, "O volume não pode ter mais 50 caracteres!"),
			volume: yup
				.number()
				.positive("O volume deve um número positivo!")
				.min(0.0),
			weight: yup.number().positive("O peso deve um número positivo!").min(0.0),
		})
	),
});
export const myFormId = "add-product-form";

export function AddAProduct() {
	const classes = useStyles();

	const [product, setProduct] = useState(defaultProduct);
	const [openModal, setOpenModal] = useState(false);
	const [files, setFiles] = useState([] as File[]);
	const [saving, setSaving] = useState(false);
	const [toast, setToast] = useState({
		resolved: false,
		success: false,
		error: "",
	});

	useEffect(() => {
		if (toast.resolved && toast.success)
			doToast.success("🦄 Produto adicionado com sucesso!", {
				position: "top-right",
				autoClose: 5000,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
				progress: undefined,
			});
		else if (toast.resolved && !toast.success)
			doToast.error(
				`🦄 Houve um erro ao adicionar o produto!\n${toast.error}`,
				{
					position: "top-right",
					autoClose: 5000,
					hideProgressBar: false,
					closeOnClick: true,
					pauseOnHover: true,
					draggable: true,
					progress: undefined,
				}
			);
	}, [toast]);

	const {
		formState: { errors },
		handleSubmit,
		register,
		control,
		reset,
	} = useForm<ProductToAdd>({
		resolver: yupResolver(schema),
		defaultValues: {
			available_bottles: [
				{
					available_quantity: undefined,
					bottle_format: undefined,
					volume: undefined,
					weight: undefined,
				},
			],
			images: [],
			isAvailable: false,
			price: undefined,
			description: "",
			usage_tips: "",
			category: [""],
			title: "",
		},
	});
	const { fields, append, remove } = useFieldArray({
		control, // control props comes from useForm (optional: if you are using FormContext)
		name: "available_bottles", // unique name for your Field Array
	});

	const onSubmit = async (data: ProductToAdd) => {
		setOpenModal(true);
		setProduct(data);
	};

	console.log("errors =", errors);
	console.log("files =", files);

	function bottleInput(field: typeof fields[0], index: number) {
		return (
			<Fragment key={field.id}>
				<Controller
					control={control}
					name={`available_bottles.${index}.bottle_format`}
					key={`available_bottles.${index}.bottle_format`}
					render={({ field }) => (
						<TextField
							error={!!errors.available_bottles?.[index]?.bottle_format}
							helperText={
								errors.available_bottles?.[index]?.bottle_format?.message
							}
							variant="outlined"
							defaultValue=""
							label="Formato da garrafa"
							{...field}
							inputRef={field.ref}
						/>
					)}
				/>

				<Controller
					control={control}
					name={`available_bottles.${index}.available_quantity`}
					key={`available_bottles.${index}.available_quantity`}
					render={({ field }) => (
						<TextField
							error={!!errors.available_bottles?.[index]?.available_quantity}
							helperText={
								errors.available_bottles?.[index]?.available_quantity?.message
							}
							required
							type="number"
							variant="outlined"
							placeholder="Número inteiro"
							label="Quantidade disponível"
							{...field}
							inputRef={field.ref}
						/>
					)}
				/>

				<Controller
					control={control}
					name={`available_bottles.${index}.volume`}
					key={`available_bottles.${index}.volume`}
					render={({ field }) => (
						<TextField
							error={!!errors.available_bottles?.[index]?.volume}
							helperText={errors.available_bottles?.[index]?.volume?.message}
							type="number"
							label="Volume"
							variant="outlined"
							{...field}
							InputProps={{
								endAdornment: (
									<InputAdornment position="start">mL</InputAdornment>
								),
							}}
							inputRef={field.ref}
						/>
					)}
				/>

				<Controller
					control={control}
					name={`available_bottles.${index}.weight`}
					key={`available_bottles.${index}.weight`}
					render={({ field }) => (
						<TextField
							error={!!errors.available_bottles?.[index]?.weight}
							helperText={errors.available_bottles?.[index]?.weight?.message}
							label="Peso"
							type="number"
							variant="outlined"
							{...field}
							InputProps={{
								endAdornment: (
									<InputAdornment position="start">Kg</InputAdornment>
								),
							}}
							inputRef={field.ref}
						/>
					)}
				/>

				<BorderBottom />
			</Fragment>
		);
	}

	return (
		<Container>
			<ToastContainer />

			<h3>Adicionar um produto</h3>

			<form
				onSubmit={handleSubmit(onSubmit)}
				className={classes.root}
				id={myFormId}
				method="post"
				encType="multipart/form-data"
			>
				<>
					<Controller
						control={control}
						name="title"
						key="title"
						render={({ field }) => (
							<TextField
								error={!!errors.title}
								required
								helperText={errors.title?.message}
								label="Título"
								variant="outlined"
								{...field}
								inputRef={field.ref}
							/>
						)}
					/>
					<Controller
						control={control}
						name="category"
						key="category"
						render={({ field }) => (
							<TextField
								error={!!errors.category}
								helperText={errors.category?.[0]?.message}
								required
								label="Categoria"
								variant="outlined"
								placeholder="Ex.: 'Aromatizador,Difusor'"
								{...field}
								inputRef={field.ref}
								onChange={e => field.onChange(e.target.value.split(/,| +/))}
							/>
						)}
					/>
					<Controller
						control={control}
						name="price"
						key="price"
						render={({ field }) => (
							<TextField
								error={!!errors.price}
								helperText={errors.price?.message}
								required
								type="number"
								label="Preço"
								variant="outlined"
								placeholder="Número (ex.: 100.00)"
								inputRef={field.ref}
								{...field}
								InputProps={{
									startAdornment: (
										<InputAdornment position="start">R$</InputAdornment>
									),
								}}
							/>
						)}
					/>
					<div style={{ width: "100%" }}>
						<input
							type="checkbox"
							style={{ margin: "0.4rem" }}
							{...register("isAvailable", { required: true })}
						/>
						<label>Este produto está disponível para venda?</label>
					</div>
					<Controller
						control={control}
						name="usage_tips"
						key="usage_tips"
						render={({ field }) => (
							<TextField
								error={!!errors.usage_tips}
								className={classes.multiline}
								helperText={errors.usage_tips?.message}
								label="Dicas de uso"
								variant="outlined"
								multiline
								{...field}
								inputRef={field.ref}
							/>
						)}
					/>
					<Controller
						control={control}
						name="description"
						key="description"
						render={({ field }) => (
							<TextField
								error={!!errors.description}
								className={classes.multiline}
								helperText={errors.description?.message}
								label="Descrição"
								variant="outlined"
								multiline
								required
								{...field}
								inputRef={field.ref}
							/>
						)}
					/>
				</>

				<MyDropzone files={files} setFiles={setFiles} />

				<Bottle className={classes.bottle}>
					{fields.map((field, index) => bottleInput(field, index))}

					<div style={{ flexDirection: "row" }}>
						<Button
							type="button"
							onClick={() =>
								append({
									available_quantity: undefined,
									bottle_format: undefined,
									volume: undefined,
									weight: undefined,
								})
							}
						>
							Mais
						</Button>
						<Button type="button" onClick={() => remove(fields.length - 1)}>
							Deletar
						</Button>
					</div>
				</Bottle>

				<div className={classes.submit}>
					<input type="submit" value="Confirmar" disabled={saving} />
					{saving && (
						<CircularProgress size={24} className={classes.buttonProgress} />
					)}
					{/* <CircularProgress size={24} className={classes.buttonProgress} /> */}
				</div>
			</form>

			<ConfirmationModal
				setOpen={setOpenModal}
				setSaving={setSaving}
				setToast={setToast}
				product={product}
				open={openModal}
				files={files}
				reset={reset}
			/>
		</Container>
	);
}

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		root: {
			"& > *": {
				margin: theme.spacing(2),
				width: "25ch",
			},
		},
		multiline: {
			width: "40em",
		},
		bottle: {
			"&": {
				margin: theme.spacing(1),
				marginLeft: "1em",
				width: "30em",
			},
		},
		submit: {
			display: "flex",
			width: "30em",
			margin: "1em",
			marginBottom: "3em",
			justifyContent: "center",
			alignItems: "center",
		},
		buttonSuccess: {
			backgroundColor: green[500],
			"&:hover": {
				backgroundColor: green[700],
			},
		},
		buttonProgress: {
			color: green[500],
		},
	})
);

const defaultProduct: ProductToAdd = {
	available_bottles: [
		{
			available_quantity: "",
			bottle_format: "",
			volume: undefined,
			weight: undefined,
		},
	],
	category: [""],
	description: "",
	images: [],
	isAvailable: false,
	price: "",
	title: "",
	usage_tips: "",
};
