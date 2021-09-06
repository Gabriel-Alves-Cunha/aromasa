import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import { FiTrash2 } from "react-icons/fi";
import Image from "next/image";

import { ClientChosenProduct } from "models/Product";

import { ImgContainer, StyledButton, Title, Content, Amount } from "./styles";

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
					src={"/" + product.imagePath}
					objectFit="cover"
					className="img"
					height={200}
					width={200}
				/>
			</ImgContainer>

			<div style={{ width: "100%" }}>
				<Title>{product.title}</Title>

				<div className="info">
					<StyledButton
						onClick={() => handleSubtractAmount(product)}
						title="Subtrair um"
					>
						<AiOutlineMinus />
					</StyledButton>

					<Amount>
						R$ {product.price.replace(".", ",")}{" "}
						<span>× {product.bottle.amountThatWillBeBought || "1"}</span>
					</Amount>

					<StyledButton
						onClick={() => handleAddOneMoreToCart(product)}
						title="Adicionar um"
					>
						<AiOutlinePlus />
					</StyledButton>
				</div>

				<div className="total">
					<h3>Total: R$ {getPriceWithAmount(product)}</h3>

					<StyledButton
						onClick={() => handleRemoveFromCart(product)}
						title="Remover"
					>
						<FiTrash2 size={19} />
					</StyledButton>
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
