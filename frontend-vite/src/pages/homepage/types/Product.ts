export interface Product {
	id: string;
	name: string;
	price: number;
	discountPrice?: number;
	imageUrl: string;
	rating: number;
	category: string;
	description?: string;
	stock?: number;
	features?: string[];
	images?: string[];
	isNew?: boolean;
}