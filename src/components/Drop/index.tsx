import { FileError, FileRejection, useDropzone } from "react-dropzone";
import React, { useEffect, useState } from "react";
import { IoIosClose } from "react-icons/io";
import prettyBytes from "pretty-bytes";
import Image from "next/image";

import { json2str } from "utils/json2str";

import useStyles, { Container, Rejectd, TrashTheImg } from "./styles";

type Props = {
	setFiles: React.Dispatch<React.SetStateAction<File[]>>;
	files: File[];
};

type Preview = {
	preview: string;
	name: string;
};

export function MyDropzone({ files, setFiles }: Props) {
	const [previews, setPreviews] = useState([] as Preview[]);
	const classes = useStyles();

	const { getRootProps, getInputProps, fileRejections, acceptedFiles } =
		useDropzone({
			maxSize: 10 * 1_000_000, // 10 MB
			accept: "image/*",
			onDropAccepted,
			onDropRejected,
			multiple: true,
			maxFiles: 15,
			validator: (newFile: File) => {
				let ret: FileError | null = null;
				files.forEach(file => {
					if (file.name === newFile.name)
						ret = { code: "duplicated-file", message: "Duplicated file" };
				});
				return ret;
			},
		});

	useEffect(
		() => handleAcceptedFiles(),
		// eslint-disable-next-line react-hooks/exhaustive-deps
		[acceptedFiles]
	);

	useEffect(() => {
		if (files.length === 0) {
			previews.forEach(({ name, preview }) => URL.revokeObjectURL(preview));

			setPreviews([]);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [files]);

	function handleAcceptedFiles() {
		setFiles(oldFiles => [...oldFiles, ...acceptedFiles]);

		setPreviews(oldPreviews => [
			...oldPreviews,
			...acceptedFiles.map(file => ({
				name: file.name,
				preview: URL.createObjectURL(file),
			})),
		]);
	}

	const fileRejectionJSXs = fileRejections.map(({ file, errors }) => (
		<li key={file.name}>
			&#34;{file.name}&#34;
			<br />
			Tamanho: {prettyBytes(file.size)}
			<ul>
				{errors.map(e => (
					<li key={e.code}>
						{e.message}
						<br />O arquivo não foi adicionado.
					</li>
				))}
			</ul>
		</li>
	));

	const thumbsJSXs = previews.map(file => (
		<div
			style={{
				border: "1px solid #eaeaea",
				boxSizing: "border-box",
				display: "inline-flex",
				borderRadius: 2,
				marginBottom: 8,
				marginRight: 8,
				height: 100,
				width: 100,
				padding: 2,
			}}
			key={file.name}
		>
			<div
				style={{
					overflow: "hidden",
					display: "flex",
					minWidth: 0,
				}}
			>
				<TrashTheImg
					onClick={() => {
						setFiles(oldFiles =>
							oldFiles.filter(oldFile => oldFile.name !== file.name)
						);
						setPreviews(oldPreviews =>
							oldPreviews.filter(oldPreview => oldPreview.name !== file.name)
						);
					}}
				>
					<IoIosClose size={20} />
				</TrashTheImg>
				<Image
					className={classes.img}
					unoptimized={true}
					src={file.preview}
					height={100}
					width={100}
					alt=""
				/>
			</div>
		</div>
	));

	return (
		<section className="container">
			<Container {...getRootProps({ className: "dropzone" })}>
				<input {...getInputProps()} />
				<p>Arraste e solte imagens aqui, ou clique para selecionar arquivos.</p>
			</Container>
			<div
				style={{
					flexDirection: "row",
					flexWrap: "wrap",
					display: "flex",
					width: "40em",
					marginTop: 16,
				}}
			>
				{thumbsJSXs.map(e => e)}
			</div>

			<aside>
				{fileRejectionJSXs.length > 0 && (
					<Rejectd>
						<h4>Arquivos rejeitados</h4>
						<ul>{fileRejectionJSXs.map(e => e)}</ul>
					</Rejectd>
				)}
			</aside>
		</section>
	);
}

const onabort = () => console.error("File reading was aborted");
const onerror = () => console.error("File reading has failed");
const onDropRejected = (fileRejections: FileRejection[]) =>
	console.error(`Files rejected on drop: ${json2str(fileRejections)}`);
const onDropAccepted = (files: File[]) =>
	files.forEach(fileBlob => {
		const reader = new FileReader();
		reader.onabort = onabort;
		reader.onerror = onerror;
		reader.onload = () => reader.readAsArrayBuffer(fileBlob);
	});
