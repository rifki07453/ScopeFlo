'use client';

import React, { useState, useEffect, Suspense } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAuthStore } from '@/store/useAuthStore';
import { Button } from '@/components/UI/Button';
import { Eye, EyeOff, Lock, Mail, ArrowLeft, ShieldCheck, Sparkles, AlertCircle } from 'lucide-react';

function LoginContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { login, isLoggedIn } = useAuthStore();
  
  const callbackUrl = searchParams.get('callbackUrl') || '/dashboard';

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  // Redirect if already logged in
  useEffect(() => {
    if (isLoggedIn) {
      router.push(callbackUrl);
    }
  }, [isLoggedIn, callbackUrl, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!email || !password) {
      setError('Harap isi semua kolom');
      return;
    }

    setIsLoading(true);

    try {
      const res = await login(email, password);
      if (res.success) {
        router.push(callbackUrl);
      } else {
        setError(res.error || 'Terjadi kesalahan saat masuk');
      }
    } catch (err) {
      setError('Terjadi kesalahan koneksi sistem keamanan');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-[#0A0A0A] text-white">
      {/* Left Panel: Hero and Info (Hidden on mobile) */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-[#120B02] via-[#0A0A0A] to-[#12051E] relative items-center justify-center p-12 overflow-hidden border-r border-white/5">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-orange-600/10 blur-[120px] pointer-events-none rounded-full"></div>
        <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-orange-500/5 to-transparent"></div>
        
        <div className="relative z-10 max-w-lg space-y-8">
          <Link href="/" className="inline-flex items-center gap-2 text-white/60 hover:text-white transition-colors group">
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Kembali ke Landing Page
          </Link>
          
          <div className="space-y-4">
            <div className="w-12 h-12 bg-gradient-to-br from-orange-400 to-orange-600 rounded-xl flex items-center justify-center font-black text-[#0A0A0A] text-2xl shadow-lg">
              S
            </div>
            <h1 className="text-4xl font-black tracking-tight leading-tight">
              Akses Workspace <br />
              Dokumen Profesional Anda
            </h1>
            <p className="text-lg text-white/50 leading-relaxed">
              Masuk untuk membuat, mengedit, dan mengamankan kontrak, penawaran, dan Statement of Work (SOW) Anda secara instan.
            </p>
          </div>

          <div className="space-y-4 pt-6 border-t border-white/10">
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 bg-orange-500/10 rounded-lg flex items-center justify-center text-orange-400 shrink-0">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <div>
                <h4 className="font-bold text-sm text-white">Keamanan Standar Industri</h4>
                <p className="text-xs text-white/40 mt-0.5">Kredensial disimpan dengan metode salted SHA-256 hash di sisi klien Anda secara privat.</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 bg-purple-500/10 rounded-lg flex items-center justify-center text-purple-400 shrink-0">
                <Sparkles className="w-4 h-4" />
              </div>
              <div>
                <h4 className="font-bold text-sm text-white">Template Instan Premium</h4>
                <p className="text-xs text-white/40 mt-0.5">Akses ke perpustakaan klausul hukum dan integrasi tanda tangan elektronik.</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white/5 border border-white/10 rounded-2xl p-5 text-xs text-white/70 space-y-2.5">
            <div className="flex items-center gap-2">
              <span className="bg-orange-500/20 text-orange-400 px-2 py-0.5 rounded font-bold uppercase tracking-wider">Akun Demo</span>
              <span className="text-white/40">Silakan gunakan akun pengujian berikut:</span>
            </div>
            <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-white/60 font-sans pt-1 border-t border-white/5">
              <div>
                <span className="text-white/80 font-bold block">1. Super Admin</span>
                <span>superadmin@scopeflo.com</span>
                <span className="block text-[10px] text-white/40">Pass: SuperAdmin123!</span>
              </div>
              <div>
                <span className="text-white/80 font-bold block">2. Admin</span>
                <span>admin@scopeflo.com</span>
                <span className="block text-[10px] text-white/40">Pass: AdminPassword123!</span>
              </div>
              <div>
                <span className="text-white/80 font-bold block">3. Agency User</span>
                <span>agency@scopeflo.com</span>
                <span className="block text-[10px] text-white/40">Pass: AgencyPassword123!</span>
              </div>
              <div>
                <span className="text-white/80 font-bold block">4. Personal User</span>
                <span>personal@scopeflo.com</span>
                <span className="block text-[10px] text-white/40">Pass: PersonalPassword123!</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Panel: Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-12 relative">
        <div className="absolute top-10 right-10 lg:hidden">
          <Link href="/" className="flex items-center gap-2 text-white/60 hover:text-white transition-colors">
            <ArrowLeft className="w-4 h-4" /> Kembali
          </Link>
        </div>

        <div className="w-full max-w-md space-y-8 bg-white/5 border border-white/10 backdrop-blur-2xl rounded-3xl p-8 sm:p-10 shadow-[0_0_50px_rgba(0,0,0,0.3)]">
          <div className="space-y-2 text-center lg:text-left">
            <h2 className="text-3xl font-black tracking-tight">Selamat Datang</h2>
            <p className="text-sm text-white/50">Silakan masukkan akun Anda untuk melanjutkan</p>
          </div>

          {error && (
            <div className="flex items-center gap-3 bg-red-500/10 border border-red-500/20 text-red-400 rounded-2xl p-4 text-sm animate-shake">
              <AlertCircle className="w-5 h-5 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email Field */}
            <div className="space-y-2">
              <label htmlFor="email" className="text-xs font-bold uppercase tracking-wider text-white/60">
                Email Address
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-white/40 pointer-events-none">
                  <Mail className="w-4 h-4" />
                </span>
                <input
                  id="email"
                  type="email"
                  placeholder="name@company.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-[#111111] border border-white/10 rounded-xl pl-10 pr-4 py-3 text-sm text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                  required
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <label htmlFor="password" className="text-xs font-bold uppercase tracking-wider text-white/60">
                  Password
                </label>
                <a href="#" className="text-xs text-orange-400 hover:text-orange-300 font-semibold transition-colors">
                  Lupa Password?
                </a>
              </div>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-white/40 pointer-events-none">
                  <Lock className="w-4 h-4" />
                </span>
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-[#111111] border border-white/10 rounded-xl pl-10 pr-10 py-3 text-sm text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-white/40 hover:text-white transition-colors"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Remember Me Checkbox */}
            <div className="flex items-center gap-2">
              <input
                id="remember"
                type="checkbox"
                className="w-4 h-4 text-orange-500 bg-[#111111] border-white/10 rounded focus:ring-orange-500 focus:ring-offset-0 focus:outline-none"
              />
              <label htmlFor="remember" className="text-xs text-white/60 cursor-pointer select-none">
                Ingat perangkat ini
              </label>
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              isLoading={isLoading}
              className="w-full bg-white hover:bg-orange-50 text-[#0A0A0A] font-black py-3 rounded-xl shadow-lg transition-all"
            >
              Masuk
            </Button>
          </form>

          {/* Registration Link */}
          <div className="text-center text-sm text-white/40 mt-6">
            Belum punya akun?{' '}
            <Link href="/register" className="text-orange-400 hover:text-orange-300 font-bold transition-colors">
              Daftar Sekarang
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={
      <div className="flex h-screen items-center justify-center bg-[#0A0A0A] text-white">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500"></div>
      </div>
    }>
      <LoginContent />
    </Suspense>
  );
}
