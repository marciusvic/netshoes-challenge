import { render, screen } from '@testing-library/react';
import { ItemCard } from './item-card';
import { Product } from '@/types/products';

const mockProduct: Product = {
  code: '123',
  image: '/product-image.jpg',
  details: {
    name: 'Tênis de Corrida',
    description: 'Tênis de Corrida',
  },
  rating: 4,
  priceInCents: '10000',
  salePriceInCents: '8000',
  name: 'Tênis de Corrida',
  available: true,
  visible: true,
  stockAvailable: true,
};

jest.mock('@/context/products-context', () => ({
  useProducts: () => ({
    verifyWishlist: jest.fn(() => false),
    editWishList: jest.fn(),
  }),
}));

jest.mock('next/navigation', () => ({
  usePathname: jest.fn(() => '/wishlist'),
}));

describe('ItemCard Component', () => {
  it('renders the product image', () => {
    render(<ItemCard product={mockProduct} />);
    const productImage = screen.getByAltText('Tênis de Corrida');
    expect(productImage).toBeInTheDocument();
  });

  it('renders the product description', () => {
    render(<ItemCard product={mockProduct} />);
    const description = screen.getByText('Tênis de Corrida');
    expect(description).toBeInTheDocument();
  });

  it('renders the product rating', () => {
    render(<ItemCard product={mockProduct} />);
    const rating = screen.getByText('4');
    expect(rating).toBeInTheDocument();
  });

  it('renders the product prices', () => {
    render(<ItemCard product={mockProduct} />);
    const oldPrice = screen.getByText('R$ 100.00');
    const currentPrice = screen.getByText('R$ 80.00');
    expect(oldPrice).toBeInTheDocument();
    expect(currentPrice).toBeInTheDocument();
  });
});
