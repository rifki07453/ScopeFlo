import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'ScopeFlo - Professional SOW Generator',
  description: 'Generate structured and professional Statement of Work (SOW) documents instantly.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.className} suppressHydrationWarning>
      <body className="min-h-screen bg-gray-50 flex flex-col text-gray-900">
        <main className="flex-1">
          {children}
        </main>
      </body>
    </html>
  );
}
