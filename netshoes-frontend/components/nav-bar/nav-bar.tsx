'use client';
import { Heart, CircleUserRound } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import './style.scss';

export default function NavBar() {
  return (
    <nav className="nav-container">
      <Image src="/logo.svg" alt="Netshoes Logo" className="nav-logo" width={160} height={25} />
      <div className="nav-end-container">
        <Link href="/wishlist" className="nav-end-container-whishlist">
          <Heart size={24} color="#FFF" />
          Wishlist
        </Link>
        <CircleUserRound size={24} color="#FFF" />
      </div>
    </nav>
  );
}
