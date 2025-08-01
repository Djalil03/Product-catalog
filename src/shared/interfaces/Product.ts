export interface IProduct {
  id: number;
  name: string;
  title: string;
  price: number;
  category: string;
  brand: string;
  rating: number;
  reviews: number;
  image: string;
  images: string[],
  description: string;
  features: string[];
  inStock: boolean;
  discount: number;
  stock: number;
  quantity: number;
}