'use client'
import React, { useState } from 'react';
import Link from 'next/link';
import { useCart } from '../../hooks/useCart';

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { cart } = useCart();
  const cartCount = cart.items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center text-2xl font-bold text-green-600">
            <Link href="/">
              COTTAGE
            </Link>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex space-x-8 items-center">
            <Link href="/" className="text-gray-700 hover:text-green-600 font-medium">Home</Link>
            <Link href="/cart" className="text-gray-700 hover:text-green-600 font-medium flex items-center gap-2">
              <span className="inline-flex items-center justify-center w-6 h-6 bg-[#B8E986] bg-opacity-80 text-gray-800 rounded-md text-xs font-bold">
                {cartCount}
              </span>
              Cart
            </Link>
          </div>

          {/* Hamburger for mobile */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-green-600 focus:outline-none"
              aria-label="Toggle menu"
            >
              {/* Hamburger or Cross Icon */}
              {menuOpen ? (
                // Cross Icon
                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                // Hamburger Icon
                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav as dropdown panel */}
      <div
        className={`md:hidden absolute left-0 right-0 top-16 mx-auto w-full max-w-7xl transition-all duration-300 ${menuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'} bg-white shadow-lg rounded-b-lg`}
        style={{ minWidth: 180 }}
      >
        <div className="px-4 pt-2 pb-3 space-y-1 flex flex-col">
          <Link href="/" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-green-600" onClick={() => setMenuOpen(false)}>Home</Link>
          <Link href="/cart" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-green-600 flex items-center gap-2" onClick={() => setMenuOpen(false)}>
            <span className="inline-flex items-center justify-center w-6 h-6 bg-[#B8E986] bg-opacity-80 text-gray-800 rounded-md text-xs font-bold">
              {cartCount}
            </span>
            Cart
          </Link>
        </div>
      </div>
    </nav>
  );
}
