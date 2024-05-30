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

export interface wishList
{
  id:string;
}
export interface Products {
  id: string;
  productname: string;
  price: number;
  image: string;
}

export interface CancelledOrder {
  cancellation_date: string;
  cancellation_reason: string;
  expected_delivery: string;
  id: string;
  payment_method: string;
  price: number;
  product_id: string;
  unit: number;
  user_id: string;
  product?: Product;
}
