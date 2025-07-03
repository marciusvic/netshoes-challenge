import { render, screen } from '@testing-library/react';
import { ItemsContent } from './items-content';
import { Product } from '@/types/products';
import * as nextNavigation from 'next/navigation';

const mockProducts: Product[] = [
  {
    code: '123',
    image: '/product-image-1.jpg',
    details: {
      name: 'Tênis de Corrida 1',
      description: 'Tênis de Corrida 1',
    },
    rating: 4,
    priceInCents: '10000',
    salePriceInCents: '8000',
    name: 'Tênis de Corrida 1',
    available: true,
    visible: true,
    stockAvailable: true,
  },
  {
    code: '456',
    image: '/product-image-2.jpg',
    details: {
      name: 'Tênis de Corrida 2',
      description: 'Tênis de Corrida 2',
    },
    rating: 5,
    priceInCents: '12000',
    salePriceInCents: '10000',
    name: 'Tênis de Corrida 2',
    available: true,
    visible: true,
    stockAvailable: true,
  },
];

jest.mock('@/context/products-context', () => ({
  useProducts: () => ({
    products: mockProducts,
    wishProducts: [mockProducts[1]],
    verifyWishlist: jest.fn(() => false),
    editWishList: jest.fn(),
  }),
}));

jest.mock('next/navigation', () => ({
  usePathname: jest.fn(() => '/wishlist'),
}));

describe('ItemsContent Component', () => {
  it('renders the wishlist products when on the wishlist page', () => {
    render(<ItemsContent />);
    const productCards = screen.getAllByRole('img');
    expect(productCards).toHaveLength(1);
    expect(screen.getByAltText('Tênis de Corrida 2')).toBeInTheDocument();
  });

  it('renders all products when not on the wishlist page', () => {
    (nextNavigation.usePathname as jest.Mock).mockReturnValue('/home');
    render(<ItemsContent />);
    const productCards = screen.getAllByRole('img');
    expect(productCards).toHaveLength(2);
    expect(screen.getByAltText('Tênis de Corrida 1')).toBeInTheDocument();
    expect(screen.getByAltText('Tênis de Corrida 2')).toBeInTheDocument();
  });
});
