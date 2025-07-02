'use client';
import React, { useState, useRef, useEffect } from 'react';
import './style.scss';
import { CircleUserRound } from 'lucide-react';

export default function UserDropdown() {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = () => setOpen((prev) => !prev);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="user-dropdown" ref={dropdownRef}>
      <button className="icon-button" onClick={toggleDropdown}>
        <CircleUserRound size={24} color="#FFF" />
      </button>
      {open && (
        <div className="dropdown-menu">
          <div className="arrow" />
          <ul>
            <li>Entrar</li>
            <li>Minha Conta</li>
            <li>Endereços</li>
            <li>Minha Netshoes</li>
          </ul>
        </div>
      )}
    </div>
  );
}
