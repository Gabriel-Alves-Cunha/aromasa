import Img01 from "public/images/Img01.jpg";
import Img02 from "public/images/Img02.jpg";
import Img03 from "public/images/Img03.jpg";

export type Slide = {
	img: StaticImageData;
	name: string;
	info: string;
};

export const slides: Slide[] = [
	{
		img: Img01,
		name: "Flower",
		info: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Mollitia, saepe",
	},
	{
		img: Img02,
		name: "Perfume A",
		info: "Consectetur at ex id harum corporis, nostrum excepturi dolores animi?",
	},
	{
		img: Img03,
		name: "Sabonete",
		info: "Consequatur numquam temporibus esse quod labore aliquam repudiandae veniam ducimus.",
	},
];
