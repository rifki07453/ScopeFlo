'use client';
import React from 'react';
import Link from 'next/link';
import { useAuthStore } from '@/store/useAuthStore';

export function Navbar() {
  const { isLoggedIn, logout, user } = useAuthStore();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-200 bg-white/80 backdrop-blur-md">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between max-w-7xl">
        <Link href="/" className="flex items-center gap-2 transition-transform hover:scale-105 active:scale-95">
          <div className="h-8 w-8 bg-purple-600 rounded-lg flex items-center justify-center text-white font-bold text-xl">
            S
          </div>
          <span className="font-bold text-xl tracking-tight text-gray-900">ScopeFlo</span>
        </Link>
        
        <nav className="hidden md:flex items-center gap-8">
          <Link href="#workflow" className="text-sm font-bold text-gray-600 hover:text-purple-600 transition-colors">Workflow</Link>
          <Link href="#features" className="text-sm font-bold text-gray-600 hover:text-purple-600 transition-colors">Features</Link>
          <Link href="#use-cases" className="text-sm font-bold text-gray-600 hover:text-purple-600 transition-colors">Use Cases</Link>
          <Link href="#pricing" className="text-sm font-bold text-gray-600 hover:text-purple-600 transition-colors">Pricing</Link>
          <div className="relative group">
            <div className="flex items-center gap-1 cursor-pointer text-sm font-bold text-gray-600 hover:text-purple-600 transition-colors py-2">
              Resources
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg" className="group-hover:rotate-180 transition-transform duration-200">
                <path d="M3 4.5L6 7.5L9 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            {/* Dropdown Menu */}
            <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-48 bg-white border border-gray-100 shadow-[0_10px_40px_rgba(0,0,0,0.1)] rounded-xl py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform origin-top translate-y-2 group-hover:translate-y-0">
              <Link href="/generator" className="block px-4 py-2 text-sm text-gray-600 hover:bg-purple-50 hover:text-purple-600 font-medium">SOW Templates</Link>
              <a href="#" className="block px-4 py-2 text-sm text-gray-600 hover:bg-purple-50 hover:text-purple-600 font-medium">Documentation</a>
              <a href="#" className="block px-4 py-2 text-sm text-gray-600 hover:bg-purple-50 hover:text-purple-600 font-medium">Blog</a>
              <a href="#" className="block px-4 py-2 text-sm text-gray-600 hover:bg-purple-50 hover:text-purple-600 font-medium">Community</a>
            </div>
          </div>
        </nav>

        <div className="flex items-center gap-6">
          {isLoggedIn ? (
            <>
              <span className="text-sm font-semibold text-gray-600 hidden sm:inline">
                Hai, {user?.name}
              </span>
              <Link href="/dashboard" className="text-sm font-bold text-gray-600 hover:text-purple-600 transition-colors">
                Dashboard
              </Link>
              <button 
                onClick={logout}
                className="text-sm font-bold text-red-600 hover:text-red-700 transition-colors cursor-pointer"
              >
                Log out
              </button>
            </>
          ) : (
            <>
              <Link href="/login" className="hidden md:block text-sm font-bold text-gray-600 hover:text-purple-600 transition-colors">
                Log in
              </Link>
              <Link href="/register" className="bg-purple-600 hover:bg-purple-700 text-white text-sm font-bold px-5 py-2.5 rounded-lg shadow-md shadow-purple-500/20 transition-all hover:-translate-y-0.5">
                Start Free
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
