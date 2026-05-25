'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { LayoutDashboard, FileText, Activity, Settings, LogOut, ChevronDown, User } from 'lucide-react';
import { NewDocumentModal } from '@/components/Dashboard/NewDocumentModal';
import { useAuthStore } from '@/store/useAuthStore';
import { AuthGuard } from '@/components/UI/AuthGuard';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
  
  const { user, logout } = useAuthStore();

  const navLinks = [
    { name: 'Overview', href: '/dashboard', icon: LayoutDashboard },
    { name: 'Documents', href: '/dashboard/documents', icon: FileText },
    { name: 'Activity Log', href: '/dashboard/activity', icon: Activity },
    { name: 'Settings', href: '/dashboard/settings', icon: Settings },
  ];

  const handleLogout = () => {
    logout();
    router.push('/');
  };

  const userInitials = user?.name
    ? user.name
        .split(' ')
        .map((n) => n[0])
        .join('')
        .toUpperCase()
        .substring(0, 2)
    : 'U';

  return (
    <AuthGuard>
      <div className="flex h-screen bg-gray-50/50">
        {/* Sidebar */}
        <aside className="w-64 bg-white border-r border-gray-200 flex flex-col">
          <div className="h-16 flex items-center px-6 border-b border-gray-100">
            <Link href="/" className="flex items-center gap-2">
              <div className="h-8 w-8 bg-black rounded-lg flex items-center justify-center text-white font-bold">
                S
              </div>
              <span className="font-bold text-xl tracking-tight text-gray-900">ScopeFlow</span>
            </Link>
          </div>

          <nav className="flex-1 py-6 px-4 space-y-2">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              const Icon = link.icon;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-lg font-medium transition-colors ${
                    isActive 
                      ? 'bg-[#5a32fa]/10 text-[#5a32fa]' 
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  }`}
                >
                  <Icon className={`w-5 h-5 ${isActive ? 'text-[#5a32fa]' : 'text-gray-400'}`} />
                  {link.name}
                </Link>
              );
            })}
          </nav>

          <div className="p-4 border-t border-gray-100">
            <button 
              onClick={handleLogout} 
              className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-gray-600 hover:bg-red-50 hover:text-red-600 font-medium transition-colors text-left cursor-pointer"
            >
              <LogOut className="w-5 h-5" />
              Log out
            </button>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 overflow-auto flex flex-col">
          <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-8 sticky top-0 z-10 shrink-0">
            <h1 className="text-xl font-semibold text-gray-900">Dashboard</h1>
            <div className="flex items-center gap-4">
              <button 
                onClick={() => setIsModalOpen(true)}
                className="bg-[#5a32fa] hover:bg-[#4b27d4] text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors cursor-pointer"
              >
                + New Document
              </button>
              
              {/* Profile Dropdown */}
              <div className="relative">
                <button 
                  onClick={() => setIsUserDropdownOpen(!isUserDropdownOpen)}
                  className="flex items-center gap-2 hover:bg-gray-50 p-1.5 rounded-lg transition-colors cursor-pointer"
                >
                  <div className="w-8 h-8 rounded-full bg-[#5a32fa]/10 border border-[#5a32fa]/20 flex items-center justify-center text-xs font-bold text-[#5a32fa]">
                    {userInitials}
                  </div>
                  <ChevronDown className="w-4 h-4 text-gray-500" />
                </button>

                {isUserDropdownOpen && (
                  <>
                    <div className="fixed inset-0 z-10" onClick={() => setIsUserDropdownOpen(false)} />
                    <div className="absolute right-0 mt-2 w-56 bg-white border border-gray-100 shadow-[0_10px_40px_rgba(0,0,0,0.1)] rounded-xl py-2 z-20 transform origin-top-right">
                      <div className="px-4 py-2 border-b border-gray-100">
                        <p className="text-sm font-bold text-gray-900 truncate">{user?.name}</p>
                        <p className="text-xs text-gray-500 truncate mt-0.5">{user?.email}</p>
                      </div>
                      <Link 
                        href="/dashboard/settings" 
                        onClick={() => setIsUserDropdownOpen(false)}
                        className="flex items-center gap-2 px-4 py-2 text-sm text-gray-600 hover:bg-gray-50 transition-colors"
                      >
                        <User className="w-4 h-4 text-gray-400" />
                        Profil Saya
                      </Link>
                      <button 
                        onClick={() => {
                          setIsUserDropdownOpen(false);
                          handleLogout();
                        }}
                        className="w-full flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors text-left cursor-pointer"
                      >
                        <LogOut className="w-4 h-4 text-red-400" />
                        Keluar
                      </button>
                    </div>
                  </>
                )}
              </div>
            </div>
          </header>
          <div className="p-8 flex-1">
            {children}
          </div>
        </main>

        <NewDocumentModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      </div>
    </AuthGuard>
  );
}
