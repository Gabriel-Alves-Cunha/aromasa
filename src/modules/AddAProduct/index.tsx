import { InputAdornment, TextField, CircularProgress } from "@material-ui/core";
import { toast as doToast, ToastContainer } from "react-toastify";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import { Controller, useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { green } from "@material-ui/core/colors";

import { defaultProduct, myFormId, yupSchema } from "./helper";
import { Product as NotToUseProductModel } from "../../models/Product";
import { ConfirmationModal } from "./modal";
import { MyDropzone } from "../../components";

import { Container } from "./styles";
import "react-toastify/dist/ReactToastify.css";

export type ProductToAddToTheServer = Omit<NotToUseProductModel, "_id">;

export function AddAProduct() {
	const classes = useStyles();

	const [product, setProduct] = useState(defaultProduct);
	const [openModal, setOpenModal] = useState(false);
	const [files, setFiles] = useState<File[]>([]);
	const [saving, setSaving] = useState(false);
	const [toast, setToast] = useState({
		resolved: false,
		success: false,
		error: "",
	});

	useEffect(() => {
		if (toast.resolved && toast.success)
			doToast.success("🦄 Produto adicionado com sucesso!", {
				hideProgressBar: false,
				position: "top-right",
				progress: undefined,
				closeOnClick: true,
				pauseOnHover: true,
				autoClose: 5000,
				draggable: true,
			});
		else if (toast.resolved && !toast.success)
			doToast.error(
				`🦄 Houve um erro ao adicionar o produto!\n${toast.error}`,
				{
					hideProgressBar: false,
					position: "top-right",
					progress: undefined,
					closeOnClick: true,
					pauseOnHover: true,
					autoClose: 5000,
					draggable: true,
				}
			);
	}, [toast]);

	const {
		formState: { errors },
		handleSubmit,
		register,
		control,
		reset,
	} = useForm<ProductToAddToTheServer>({
		resolver: yupResolver(yupSchema),
		defaultValues: defaultProduct,
	});

	const onSubmit = (data: ProductToAddToTheServer) => {
		setOpenModal(true);
		setProduct(data);
	};

	console.log("errors =", errors);
	console.log("files =", files);

	return (
		<Container>
			<ToastContainer />

			<h3>Adicionar um produto</h3>

			<form
				onSubmit={handleSubmit(onSubmit)}
				encType="multipart/form-data"
				className={classes.root}
				id={myFormId}
				method="post"
			>
				<fieldset disabled={saving}>
					<Controller
						control={control}
						name="title"
						key="title"
						render={({ field }) => (
							<TextField
								helperText={errors.title?.message}
								error={!!errors.title}
								inputRef={field.ref}
								variant="outlined"
								label="Título"
								{...field}
								required
							/>
						)}
					/>
					<Controller
						control={control}
						name="categories"
						key="categories"
						render={({ field }) => (
							<TextField
								{...field}
								onChange={e => field.onChange(e.target.value.split(/,| +/))}
								helperText={errors.categories?.[0]?.message}
								placeholder="Ex.: 'Aromatizador,Difusor'"
								error={!!errors.categories}
								variant="outlined"
								label="Categoria"
								inputRef={field.ref}
								required
							/>
						)}
					/>
					<Controller
						control={control}
						name="price"
						key="price"
						render={({ field }) => (
							<TextField
								InputProps={{
									startAdornment: (
										<InputAdornment position="start">R$</InputAdornment>
									),
								}}
								placeholder="Número (ex.: 100.00)"
								helperText={errors.price?.message}
								error={!!errors.price}
								inputRef={field.ref}
								variant="outlined"
								label="Preço"
								type="number"
								{...field}
								required
							/>
						)}
					/>
					<Controller
						key={"bottle.bottle_format"}
						name="bottle.bottle_format"
						control={control}
						render={({ field }) => (
							<TextField
								helperText={errors.bottle?.bottle_format?.message}
								error={!!errors.bottle?.bottle_format}
								label="Formato da garrafa"
								inputRef={field.ref}
								variant="outlined"
								{...field}
							/>
						)}
					/>
					<Controller
						name={`bottle.available_quantity`}
						key={`bottle.available_quantity`}
						control={control}
						render={({ field }) => (
							<TextField
								helperText={errors.bottle?.available_quantity?.message}
								error={!!errors.bottle?.available_quantity}
								label="Quantidade disponível"
								placeholder="Número inteiro"
								inputRef={field.ref}
								variant="outlined"
								type="number"
								{...field}
								required
							/>
						)}
					/>
					<Controller
						name={`bottle.volume`}
						key={`bottle.volume`}
						control={control}
						render={({ field }) => (
							<TextField
								InputProps={{
									endAdornment: (
										<InputAdornment position="start">mL</InputAdornment>
									),
								}}
								helperText={errors.bottle?.volume?.message}
								error={!!errors.bottle?.volume}
								inputRef={field.ref}
								variant="outlined"
								label="Volume"
								type="number"
								{...field}
							/>
						)}
					/>
					<Controller
						name={`bottle.weight`}
						key={`bottle.weight`}
						control={control}
						render={({ field }) => (
							<TextField
								InputProps={{
									endAdornment: (
										<InputAdornment position="start">Kg</InputAdornment>
									),
								}}
								helperText={errors.bottle?.weight?.message}
								error={!!errors.bottle?.weight}
								inputRef={field.ref}
								variant="outlined"
								type="number"
								label="Peso"
								{...field}
							/>
						)}
					/>
					<div style={{ width: "100%" }}>
						<input
							{...register("isAvailableToSell", { required: true })}
							style={{ margin: "0.4rem" }}
							type="checkbox"
						/>
						<label>Este produto está disponível para venda?</label>
					</div>
					<Controller
						control={control}
						name="usage_tips"
						key="usage_tips"
						render={({ field }) => (
							<TextField
								helperText={errors.usage_tips?.message}
								className={classes.multiline}
								error={!!errors.usage_tips}
								label="Dicas de uso"
								inputRef={field.ref}
								variant="outlined"
								{...field}
								multiline
							/>
						)}
					/>
					<Controller
						name="description"
						control={control}
						key="description"
						render={({ field }) => (
							<TextField
								helperText={errors.description?.message}
								className={classes.multiline}
								error={!!errors.description}
								inputRef={field.ref}
								variant="outlined"
								label="Descrição"
								{...field}
								multiline
								required
							/>
						)}
					/>
				</fieldset>

				<MyDropzone files={files} setFiles={setFiles} />

				<div className={classes.submit}>
					<input type="submit" value="Confirmar" disabled={saving} />
					{saving && (
						<CircularProgress size={24} className={classes.buttonProgress} />
					)}
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
		submit: {
			display: "flex",
			width: "30em",
			margin: "1em",
			marginBottom: "3em",
			justifyContent: "center",
			alignItems: "center",
		},
		buttonProgress: {
			color: green[500],
		},
	})
);
