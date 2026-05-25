'use client';

import React, { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useAuthStore } from '@/store/useAuthStore';
import { Loader2 } from 'lucide-react';

export function AuthGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const { isLoggedIn } = useAuthStore();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (isMounted && !isLoggedIn) {
      router.push(`/login?callbackUrl=${encodeURIComponent(pathname)}`);
    }
  }, [isMounted, isLoggedIn, pathname, router]);

  if (!isMounted || !isLoggedIn) {
    return (
      <div className="flex h-screen w-screen items-center justify-center bg-gray-50">
        <div className="flex flex-col items-center gap-4 text-center">
          <div className="relative flex items-center justify-center">
            <Loader2 className="h-12 w-12 animate-spin text-[#5a32fa]" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-gray-900">Verifying session...</h3>
            <p className="text-sm text-gray-500">Please wait while we secure your workspace.</p>
          </div>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
