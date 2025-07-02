'use client';
import { Product } from '@/types/products';
import Image from 'next/image';
import { Heart, Star, X } from 'lucide-react';
import './style.scss';
import { useProducts } from '@/context/products-context';
import { usePathname } from 'next/navigation';

export function ItemCard({ product }: { product: Product }) {
  const { verifyWishlist, editWishList } = useProducts();
  const isInWishlist = verifyWishlist(product.code);
  const pathname = usePathname();
  const pathParts = pathname.split('/').filter(Boolean);
  const isWishlistPage = pathParts.includes('wishlist');
  return (
    <div className="item-card">
      <div className="image-container">
        <Image src={product.image} alt={product.details.description} width={200} height={200} />
        {isWishlistPage ? (
          <button type="button" className="x-icon" onClick={() => editWishList(product.code)}>
            <X size={20} color="#000" />
          </button>
        ) : (
          <button
            type="button"
            className={`heart-icon ${isInWishlist ? 'active' : ''}`}
            onClick={() => editWishList(product.code)}
          >
            <Heart size={18} color={isInWishlist ? 'white' : '#888'} />
          </button>
        )}
      </div>
      <h2>{product.details.description}</h2>

      <div className="stars">
        {Array.from({ length: 5 }).map((_, index) => (
          <Star
            key={index}
            size={14}
            color={index < product.rating ? '#f5a623' : '#ddd'}
            fill={index < product.rating ? '#f5a623' : 'none'}
          />
        ))}
        <span>{product.rating}</span>
      </div>

      <div className="prices">
        <span className="old-price">R$ {(parseInt(product.priceInCents) / 100).toFixed(2)}</span>
        <span className="current-price">
          R$ {(parseInt(product.salePriceInCents) / 100).toFixed(2)}
        </span>
      </div>
    </div>
  );
}
