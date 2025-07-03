import { render } from '@testing-library/react';
import NavBar from '@/components/nav-bar/nav-bar';

describe('NavBar Component', () => {
  it('renders the logo', () => {
    const { getByAltText } = render(<NavBar />);
    const logo = getByAltText('Netshoes Logo');
    expect(logo).toBeInTheDocument();
  });

  it('renders the wishlist link', () => {
    const { getByText } = render(<NavBar />);
    const wishlistLink = getByText('Wishlist');
    expect(wishlistLink).toBeInTheDocument();
  });
});
