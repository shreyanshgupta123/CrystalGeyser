export interface Review {
  id: string;
  product_id: string;
  customer: string;
  rating: number;
  comment: string;
}

export interface Product {
  id: string;
  productname: string;
  price: string;
  size: string;
  rating: string;
  bottles: number;
  image: string;
  description: string;
  category_id: string | null;
  reviews: Review[];
}

export interface Category {
  id: string;
  category_name: string;

}
