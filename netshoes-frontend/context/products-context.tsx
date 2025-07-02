'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { useProductsService } from '@/services/products';
import { ProductsData, Product } from '@/types/products';
import { ChildrenProps } from '@/types/types';

interface ProductsContextType {
  products: Product[];
  wishProducts: Product[];
  loading: boolean;
  wishlist: string[];
  getAllProducts: () => Promise<Product[]>;
  getWishlist: () => Promise<Product[]>;
  editWishList: (productCode: string) => void;
  verifyWishlist: (productCode: string) => boolean;
}

export const ProductsContext = createContext<ProductsContextType>({
  products: [],
  wishProducts: [],
  loading: false,
  wishlist: [],
  getAllProducts: async () => [],
  getWishlist: async () => [],
  editWishList: () => {},
  verifyWishlist: () => false,
});

export default function ProductsProvider({ children }: ChildrenProps) {
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [wishProducts, setWishProducts] = useState<Product[]>([]);
  const [wishlist, setWishlist] = useState<string[]>([]);
  const wishListKey = 'wishlist_codes';

  const { getProducts } = useProductsService();

  async function getAllProducts(): Promise<Product[]> {
    setLoading(true);
    try {
      const response = await getProducts();
      const data = response.data as ProductsData;
      setProducts(data.products);
      return data.products;
    } catch (error) {
      console.error('Error fetching products:', error);
      return [];
    } finally {
      setLoading(false);
    }
  }

  async function getWishlist(): Promise<Product[]> {
    const allProducts = products.length ? products : await getAllProducts();
    return allProducts.filter((p) => wishlist.includes(p.code));
  }

  function editWishList(code: string): void {
    setWishlist((prev) => (prev.includes(code) ? prev.filter((c) => c !== code) : [...prev, code]));
  }

  function verifyWishlist(code: string): boolean {
    return wishlist.includes(code);
  }

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem(wishListKey);
      if (stored) {
        setWishlist(JSON.parse(stored));
      }
    }
  }, []);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(wishListKey, JSON.stringify(wishlist));
    }
  }, [wishlist]);

  useEffect(() => {
    const updatedWishProducts = products.filter((product) => wishlist.includes(product.code));
    setWishProducts(updatedWishProducts);
  }, [wishlist, products]);

  useEffect(() => {
    getAllProducts();
  }, []);

  return (
    <ProductsContext.Provider
      value={{
        products,
        wishProducts,
        loading,
        wishlist,
        getAllProducts,
        getWishlist,
        editWishList,
        verifyWishlist,
      }}
    >
      {children}
    </ProductsContext.Provider>
  );
}

export function useProducts() {
  const context = useContext(ProductsContext);
  if (!context) {
    throw new Error('useProductsContext must be used within a ProductsProvider');
  }
  return context;
}
