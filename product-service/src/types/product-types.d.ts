export interface Product {
  id: string;
  count: number;
  description: string;
  title: string;
  price: number;
}

export type Products = Array<Product>;

export interface ErrorResponse {
  message: string;
}
