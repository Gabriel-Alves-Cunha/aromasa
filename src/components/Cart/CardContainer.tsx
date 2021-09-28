import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import { IconButton } from "@mui/material";
import { FiTrash2 } from "react-icons/fi";
import { Image } from "cloudinary-react";

import { ClientChosenProduct } from "models/Product";

import { ImgContainer, Title, Content, Amount } from "./styles";

type Props = {
	handleAddOneMoreToCart(product: ClientChosenProduct): void;
	handleSubtractAmount(product: ClientChosenProduct): void;
	handleRemoveFromCart(product: ClientChosenProduct): void;
	product: ClientChosenProduct;
};

export function CardContainer({
	handleAddOneMoreToCart,
	handleSubtractAmount,
	handleRemoveFromCart,
	product,
}: Props) {
	return (
		<Content>
			<ImgContainer>
				<Image
					alt="Imagem ilustrativa do produto."
					src={product.imagePath}
					fetch-format="auto"
					className="img"
					quality="auto"
				/>
			</ImgContainer>

			<div style={{ width: "100%" }}>
				<Title>{product.title}</Title>

				<div className="info">
					<IconButton
						onClick={() => handleSubtractAmount(product)}
						title="Subtrair um"
					>
						<AiOutlineMinus />
					</IconButton>

					<Amount>
						R$ {product.price.replace(".", ",")}{" "}
						<span>× {product.bottle.amountThatWillBeBought || "1"}</span>
					</Amount>

					<IconButton
						onClick={() => handleAddOneMoreToCart(product)}
						title="Adicionar um"
					>
						<AiOutlinePlus />
					</IconButton>
				</div>

				<div className="total">
					<h3>Total: R$ {getPriceWithAmount(product)}</h3>

					<IconButton
						onClick={() => handleRemoveFromCart(product)}
						title="Remover"
					>
						<FiTrash2 size={19} />
					</IconButton>
				</div>
			</div>
		</Content>
	);
}

export function getPriceWithAmount(product: ClientChosenProduct) {
	const amount = parseFloat(product.bottle.amountThatWillBeBought || "1");
	const price = parseFloat(product.price);

	if (amount > 0 && price > 0)
		return (amount * price).toFixed(2).replace(".", ",");
	else
		throw new Error(
			`Houve um erro ao calcular o preço do produto ${product.title}`
		);
}
