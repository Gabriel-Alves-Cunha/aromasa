import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import { FiTrash2 } from "react-icons/fi";
import Image from "next/image";

import { ClientChosenProduct } from "../../models/Product";

import { ImgContainer, StyledButton, Title, Content, Amount } from "./styles";

type Props = {
	handleSubtractAmount(product: ClientChosenProduct): void;
	handleRemoveFromCart(product: ClientChosenProduct): void;
	handleAddToCart(product: ClientChosenProduct): void;
	product: ClientChosenProduct;
};

export function CardContainer({
	handleSubtractAmount,
	handleRemoveFromCart,
	handleAddToCart,
	product,
}: Props) {
	return (
		<Content>
			<ImgContainer>
				<Image
					src={product.images[0] as string}
					height={200}
					width={200}
					objectFit="contain"
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
						R$ {product.price} <span>× {product.amountThatWillBeBought ?? 1}</span>
					</Amount>

					<StyledButton
						onClick={() => handleAddToCart(product)}
						title="Adicionar um"
					>
						<AiOutlinePlus />
					</StyledButton>
				</div>

				<div className="total">
					<h3>Total: R$ {getPrice(product)}</h3>

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

function getPrice(product: ClientChosenProduct) {
	if (product.amountThatWillBeBought === undefined || product.amountThatWillBeBought < 1) product.amountThatWillBeBought = 1;

	return ((product.amountThatWillBeBought) * Number(product.price))
		.toFixed(2)
		.replace(".", ",");
}
