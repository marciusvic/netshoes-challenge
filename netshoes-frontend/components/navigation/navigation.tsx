'use client';
import { usePathname } from 'next/navigation';
import './style.scss';

export default function Navigation() {
  const pathname = usePathname();
  const pathParts = pathname.split('/').filter(Boolean);
  const formattedPath = pathParts
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(' / ');
  return (
    <div className="navigation">
      <h1>Home{formattedPath ? ' / ' + formattedPath : ''}</h1>
      <hr />
    </div>
  );
}
