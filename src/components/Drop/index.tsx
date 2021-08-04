import { FileError, useDropzone } from "react-dropzone";
import React, { useState } from "react";
import { IoIosClose } from "react-icons/io";
import prettyBytes from "pretty-bytes";

import { Container, Rejectd, TrashTheImg } from "./styles";

type Props = {
	setFiles: React.Dispatch<React.SetStateAction<File[]>>;
	files: File[];
};

type Preview = {
	preview: string;
	name: string;
};

export default function MyDropzone({ files, setFiles }: Props) {
	const [previews, setPreviews] = useState([] as Preview[]);

	const { getRootProps, getInputProps, fileRejections } = useDropzone({
		onDrop: (acceptedFiles: File[]) => {
			acceptedFiles.forEach(file => {
				const reader = new FileReader();
				reader.readAsArrayBuffer(file);

				reader.onabort = () => console.log("file reading was aborted");
				reader.onerror = () => console.log("file reading has failed");
				reader.onload = () => {
					setFiles(oldFiles => [...oldFiles, file]);
					setPreviews(oldValues => [
						...oldValues,
						{ name: file.name, preview: URL.createObjectURL(file) },
					]);
				};
			});
		},
		accept: "image/*",
		maxFiles: 15,
		maxSize: 5 * 1_000_000, // 5 MB
		validator: newFile => {
			let ret: FileError[] = [];
			for (const file of files) {
				if (file.name === newFile.name)
					ret.push({
						code: "same-name",
						message: `O nome deste arquivo é o mesmo de outro. Verifique se não duplicados.`,
					});
				else continue;
			}
			return ret.length > 0 ? ret : null;
		},
	});

	const fileRejectionJSXs = fileRejections.map(({ file, errors }) => (
		<li key={file.name}>
			"{file.name}"<br />
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

	const thumbs = previews.map(file => (
		<div
			style={{
				display: "inline-flex",
				borderRadius: 2,
				border: "1px solid #eaeaea",
				marginBottom: 8,
				marginRight: 8,
				width: 100,
				height: 100,
				padding: 2,
				boxSizing: "border-box",
			}}
			key={file.name}
		>
			<div
				style={{
					display: "flex",
					minWidth: 0,
					overflow: "hidden",
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
				<img
					src={file.preview}
					style={{
						display: "block",
						objectFit: "cover",
						width: "100%",
						height: "auto",
					}}
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
					display: "flex",
					flexDirection: "row",
					width: "40em",
					flexWrap: "wrap",
					marginTop: 16,
				}}
			>
				{thumbs.map(e => e)}
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
