'use client';

import { useProducts } from '@/context/products-context';
import { Product } from '@/types/products';
import { ItemCard } from '../item-card/item-card';
import './style.scss';
import { usePathname } from 'next/navigation';

export function ItemsContent() {
  const { products } = useProducts();
  const { wishProducts } = useProducts();
  const pathname = usePathname();
  const pathParts = pathname.split('/').filter(Boolean);
  const listProducts = pathParts.includes('wishlist') ? wishProducts : products;

  return (
    <div className="items-content">
      {listProducts.map((product: Product) => (
        <ItemCard product={product} key={product.code} />
      ))}
    </div>
  );
}
