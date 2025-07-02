'use client';
import { Heart } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import './style.scss';
import UserDropdown from '../dropdown-menu/dropdownmenu';

export default function NavBar() {
  return (
    <nav className="nav-container">
      <Link href="/" className="nav-logo-container">
        <Image src="/logo.svg" alt="Netshoes Logo" className="nav-logo" width={160} height={25} />
      </Link>
      <div className="nav-end-container">
        <Link href="/wishlist" className="nav-end-container-whishlist">
          <Heart size={24} color="#FFF" />
          Wishlist
        </Link>
        <UserDropdown />
      </div>
    </nav>
  );
}
