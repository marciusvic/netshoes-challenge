import { createContext, useContext, useState } from 'react';
import { useProductsService } from '@/services/products';
import { ProductsData, Product } from '@/types/products';
import { ChildrenProps } from '@/types/types';

interface ProductsContextType {
  products: Product[];
  loading: boolean;
  getAllProducts: () => Promise<Product[]>;
  getWishlist: () => Promise<Product[]>;
  editWishList: (productCode: string) => Promise<void>;
}

export const ProductsContext = createContext<ProductsContextType>({
  products: [],
  loading: false,
  getAllProducts: async () => [],
  getWishlist: async () => [],
  editWishList: async () => {},
});

export default function ProductsProvider({ children }: ChildrenProps) {
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);

  const { getProducts } = useProductsService();

  const wishListKey = 'wishlist_codes';

  function getWishlistCodes(): string[] {
    if (typeof window === 'undefined') return [];
    const stored = localStorage.getItem(wishListKey);
    return stored ? JSON.parse(stored) : [];
  }

  function setWishlistCodes(codes: string[]) {
    if (typeof window === 'undefined') return;
    localStorage.setItem(wishListKey, JSON.stringify(codes));
  }

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
    const codes = getWishlistCodes();
    const allProducts = products.length ? products : await getAllProducts();
    return allProducts.filter((p) => codes.includes(p.code));
  }

  async function editWishList(productCode: string): Promise<void> {
    const codes = getWishlistCodes();
    const index = codes.indexOf(productCode);
    if (index > -1) {
      codes.splice(index, 1);
    } else {
      codes.push(productCode);
    }
    setWishlistCodes(codes);
  }

  return (
    <ProductsContext.Provider
      value={{
        products,
        loading,
        getAllProducts,
        getWishlist,
        editWishList,
      }}
    >
      {children}
    </ProductsContext.Provider>
  );
}

export function useProductsContext() {
  const context = useContext(ProductsContext);
  if (!context) {
    throw new Error('useProductsContext must be used within a ProductsProvider');
  }
}
