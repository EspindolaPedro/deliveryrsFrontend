export interface Product {
    id: number;
    name: string;
    description: string;
    is_listed: number;
    image_url: string;
    price: string;
    price_from: string;
  }
  
  export interface Category {
    id: number;
    nome: string;
    is_listed: number;
    position: number;
    products: Product[];
  }