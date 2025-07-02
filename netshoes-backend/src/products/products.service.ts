import { Injectable } from '@nestjs/common';
import * as data from '../../mock-products.json';

export interface ProductDetails {
  name: string;
  description: string;
}

export interface Product {
  code: string;
  name: string;
  available: boolean;
  visible: boolean;
  details: ProductDetails;
  priceInCents: string;
  salePriceInCents: string;
  rating: number;
  image: string;
  stockAvailable: boolean;
}

export interface ProductsData {
  total: number;
  pageSize: number;
  totalPages: number;
  products: Product[];
}

@Injectable()
export class ProductsService {
  findAll() {
    return data as ProductsData;
  }
}
