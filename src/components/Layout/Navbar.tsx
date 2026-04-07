import React from 'react';
import Link from 'next/link';

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-200 bg-white/80 backdrop-blur-md">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 transition-transform hover:scale-105 active:scale-95">
          <div className="h-8 w-8 bg-black rounded-lg flex items-center justify-center text-white font-bold">
            S
          </div>
          <span className="font-bold text-xl tracking-tight text-gray-900">ScopeFlo</span>
        </Link>
        <nav className="flex items-center gap-4">
          <Link href="/generator" className="text-sm font-medium text-gray-600 hover:text-black transition-colors">
            New SOW
          </Link>
        </nav>
      </div>
    </header>
  );
}
