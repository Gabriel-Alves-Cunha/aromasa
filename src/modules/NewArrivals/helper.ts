import img01 from "/static/img01.jpg";
import img02 from "/static/img02.jpg";
import img03 from "/static/img03.jpg";

export type Slide = {
	img: StaticImageData;
	name: string;
	info: string;
};

export const slides: Slide[] = [
	{
		img: img01,
		name: "Flower",
		info: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Mollitia, saepe",
	},
	{
		img: img02,
		name: "Perfume A",
		info: "Consectetur at ex id harum corporis, nostrum excepturi dolores animi?",
	},
	{
		img: img03,
		name: "Sabonete",
		info: "Consequatur numquam temporibus esse quod labore aliquam repudiandae veniam ducimus.",
	},
];
