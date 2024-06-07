import { PRODUCT_TYPE } from "../enums/enums";

export namespace Product {
  export interface product {
    id: number;
    title: string;
    description: string;
    img: string;
    type: keyof typeof PRODUCT_TYPE;
  }

  export interface ProductCollection {
    product: product[];
  }
}
