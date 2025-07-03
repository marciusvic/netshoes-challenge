import { render, screen, fireEvent } from '@testing-library/react';
import UserDropdown from './dropdown-menu';

describe('UserDropdown Component', () => {
  it('renders the dropdown button', () => {
    render(<UserDropdown />);
    const button = screen.getByRole('button');
    expect(button).toBeInTheDocument();
  });

  it('toggles the dropdown menu when the button is clicked', () => {
    render(<UserDropdown />);
    const button = screen.getByRole('button');

    expect(screen.queryByRole('list')).not.toBeInTheDocument();

    fireEvent.click(button);

    expect(screen.getByRole('list')).toBeInTheDocument();

    fireEvent.click(button);

    expect(screen.queryByRole('list')).not.toBeInTheDocument();
  });

  it('closes the dropdown menu when clicking outside', () => {
    render(<UserDropdown />);
    const button = screen.getByRole('button');

    fireEvent.click(button);
    expect(screen.getByRole('list')).toBeInTheDocument();

    fireEvent.mouseDown(document.body);

    expect(screen.queryByRole('list')).not.toBeInTheDocument();
  });

  it('renders the dropdown menu items', () => {
    render(<UserDropdown />);
    const button = screen.getByRole('button');

    fireEvent.click(button);

    expect(screen.getByText('Entrar')).toBeInTheDocument();
    expect(screen.getByText('Minha Conta')).toBeInTheDocument();
    expect(screen.getByText('Endereços')).toBeInTheDocument();
    expect(screen.getByText('Minha Netshoes')).toBeInTheDocument();
  });
});
