import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import { InputAdornment, TextField } from "@material-ui/core";
import { useForm, Controller } from "react-hook-form";
import { useState, Fragment } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-toastify";
import * as yup from "yup";
import axios from "axios";

import { MyDropzone } from "../../components/Drop";
import { Product } from "../../models/Product";
import connectToDatabase from "../../utils/connectToMongoDB";

import { Container, Bottle, Button, BorderBottom } from "./styles";

type ProductToAdd = Exclude<Product, "_id" | "isAvailable">;

export type FileToSend = {
	arrayBufferToSend: ArrayBuffer;
	name: string;
};

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
		.max(200, "A descrição não pode ter mais de 2.000 caracteres!")
		.required("Uma descrição do produto é necessária!"),
	available_bottles: yup.object().shape({
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
		volume: yup.number().positive("O volume deve um número positivo!").min(0.0),
		weight: yup.number().positive("O peso deve um número positivo!").min(0.0),
	}),
});

export function AddAProduct() {
	const classes = useStyles();

	const [numberOfBottlesInput, setNumberOfBottlesInput] = useState([1]);
	const [wasProductAdded, setWasProductAdded] = useState(false);
	const [addAProductError, setAddAProductError] = useState("");
	const [files, setFiles] = useState([] as FileToSend[]);

	const {
		formState: { errors },
		handleSubmit,
		register,
		control,
		reset,
	} = useForm<ProductToAdd>({
		resolver: yupResolver(schema),
	});

	const onSubmit = async (data: ProductToAdd) => {
		const product = { ...data, images: files };
		console.log("data onSubmit =", product);
		// await addAProduct(product);
	};

	console.log("errors =", errors);
	console.log("addAProductError =", addAProductError);
	console.log("files =", files);

	async function addAProduct(productInfo: ProductToAdd) {
		await connectToDatabase();

		const res = await axios.post("/api/products", productInfo);

		console.log("res =", res);
		if (res.status !== 201) {
			setAddAProductError(res.data);
			setWasProductAdded(false);

			toast.error(`🦄 Houve um erro ao adicionar o produto!\n${res.data}`, {
				position: "top-right",
				autoClose: 5000,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
				progress: undefined,
			});
		} else {
			setWasProductAdded(true);
			setAddAProductError("");

			toast.success("🦄 Produto adicionado com sucesso!", {
				position: "top-right",
				autoClose: 5000,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
				progress: undefined,
			});

			// @ts-ignore
			document.getElementById("my-form")?.reset();
			reset();
			setNumberOfBottlesInput([1]);
		}
	}

	function bottleInput() {
		return (
			<Fragment key={Math.random()}>
				<Controller
					control={control}
					name="available_bottles.bottle_format"
					render={({ field }) => (
						<TextField
							error={!!errors.available_bottles?.bottle_format}
							helperText={errors.available_bottles?.bottle_format?.message}
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
					name="available_bottles.available_quantity"
					render={({ field }) => (
						<TextField
							error={!!errors.available_bottles?.available_quantity}
							helperText={errors.available_bottles?.available_quantity?.message}
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
					name="available_bottles.volume"
					render={({ field }) => (
						<TextField
							error={!!errors.available_bottles?.volume}
							helperText={errors.available_bottles?.volume?.message}
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
					name="available_bottles.weight"
					render={({ field }) => (
						<TextField
							error={!!errors.available_bottles?.weight}
							helperText={errors.available_bottles?.weight?.message}
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

	function addBottleInput(e: React.MouseEvent<HTMLElement>) {
		e.preventDefault();

		setNumberOfBottlesInput(oldValue => [...oldValue, 1]);
	}

	function handleSubBottleInput(e: React.MouseEvent<HTMLElement>) {
		e.preventDefault();

		setNumberOfBottlesInput(oldValue => {
			if (oldValue.length <= 1) return [1];
			const newValue = [...oldValue];
			newValue.pop();
			return newValue;
		});
	}

	return (
		<Container>
			<h3>Adicionar um produto</h3>

			<form
				onSubmit={handleSubmit(onSubmit)}
				className={classes.root}
				id="my-form"
			>
				<>
					<Controller
						control={control}
						name="title"
						render={({ field }) => (
							<TextField
								error={!!errors.title}
								required
								helperText={errors.title?.message}
								defaultValue=""
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
						render={({ field }) => (
							<TextField
								error={!!errors.category}
								helperText={errors.category?.message}
								required
								label="Categoria"
								defaultValue=""
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
						render={({ field }) => (
							<TextField
								error={!!errors.usage_tips}
								className={classes.multiline}
								helperText={errors.usage_tips?.message}
								defaultValue=""
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
						render={({ field }) => (
							<TextField
								error={!!errors.description}
								className={classes.multiline}
								helperText={errors.description?.message}
								label="Descrição"
								defaultValue=""
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
					{numberOfBottlesInput.map(_ => bottleInput())}

					<div style={{ flexDirection: "row" }}>
						<Button onClick={addBottleInput}>Adicionar grupo</Button>
						<Button onClick={handleSubBottleInput}>Remover grupo</Button>
					</div>
				</Bottle>

				<div className={classes.submit}>
					<input type="submit" value="Adicionar" />
				</div>
			</form>
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
	})
);
