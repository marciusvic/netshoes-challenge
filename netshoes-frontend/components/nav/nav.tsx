import { Heart, CircleUserRound } from 'lucide-react';

import Image from 'next/image';
import './style.scss';

export default function Nav() {
  return (
    <nav className="nav-container">
      <Image src="/logo.svg" alt="Netshoes Logo" className="nav-logo" width={160} height={25} />
      <div className="nav-end-container">
        <div className="nav-end-container-whishlist">
          <Heart size={24} />
          Wishlist
        </div>
        <CircleUserRound size={24} />
      </div>
    </nav>
  );
}
