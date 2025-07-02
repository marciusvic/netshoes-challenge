'use client';

import { useProducts } from '@/context/products-context';
import { Product } from '@/types/products';
import { ItemCard } from '../item-card/item-card';
import './style.scss';

export function ItemsContent() {
  const { products } = useProducts();

  return (
    <div className="items-content">
      {products.map((product: Product) => (
        <ItemCard product={product} key={product.code} />
      ))}
    </div>
  );
}
