'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/useAuthStore';
import { Button } from '@/components/UI/Button';
import { Eye, EyeOff, Lock, Mail, User, ArrowLeft, ShieldCheck, Sparkles, AlertCircle, Check, X } from 'lucide-react';

export default function RegisterPage() {
  const router = useRouter();
  const { register, login, isLoggedIn } = useAuthStore();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  // Password requirements
  const hasMinLength = password.length >= 8;
  const hasUppercase = /[A-Z]/.test(password);
  const hasNumber = /[0-9]/.test(password);
  const hasSpecial = /[^A-Za-z0-9]/.test(password);
  const isPasswordValid = hasMinLength && hasUppercase && hasNumber && hasSpecial;
  const isMatching = password && password === confirmPassword;

  // Redirect if already logged in
  useEffect(() => {
    if (isLoggedIn) {
      router.push('/dashboard');
    }
  }, [isLoggedIn, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!name || !email || !password || !confirmPassword) {
      setError('Harap isi semua kolom');
      return;
    }

    if (!isPasswordValid) {
      setError('Password belum memenuhi semua kriteria keamanan');
      return;
    }

    if (!isMatching) {
      setError('Konfirmasi password tidak cocok');
      return;
    }

    setIsLoading(true);

    try {
      const regRes = await register(name, email, password);
      if (regRes.success) {
        // Automatically login the user after successful registration
        const logRes = await login(email, password);
        if (logRes.success) {
          router.push('/dashboard');
        } else {
          router.push('/login?registered=true');
        }
      } else {
        setError(regRes.error || 'Terjadi kesalahan saat mendaftar');
      }
    } catch (err) {
      setError('Terjadi kesalahan koneksi sistem keamanan');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-[#0A0A0A] text-white">
      {/* Left Panel: Hero and Info */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-[#0F051C] via-[#0A0A0A] to-[#120B02] relative items-center justify-center p-12 overflow-hidden border-r border-white/5">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-purple-600/10 blur-[120px] pointer-events-none rounded-full"></div>
        <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-purple-500/5 to-transparent"></div>
        
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
              Mulai Membuat Dokumen <br />
              Profesional Hari Ini
            </h1>
            <p className="text-lg text-white/50 leading-relaxed">
              Buat akun gratis untuk menyimpan draft SOW, mengekspor dokumen ke format DOCX, dan mengaktifkan kolaborasi dengan klien Anda.
            </p>
          </div>

          <div className="space-y-4 pt-6 border-t border-white/10">
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 bg-orange-500/10 rounded-lg flex items-center justify-center text-orange-400 shrink-0">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <div>
                <h4 className="font-bold text-sm text-white">Salting & Hashing Aman</h4>
                <p className="text-xs text-white/40 mt-0.5">Kami tidak pernah menyimpan password asli Anda. Hanya representasi hash satu arah yang aman.</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 bg-purple-500/10 rounded-lg flex items-center justify-center text-purple-400 shrink-0">
                <Sparkles className="w-4 h-4" />
              </div>
              <div>
                <h4 className="font-bold text-sm text-white font-bold">Kustomisasi Premium</h4>
                <p className="text-xs text-white/40 mt-0.5">Buka kebebasan untuk mengatur warna tema dokumen, mengunggah logo penyedia, dan menghapus tanda air.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Panel: Register Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-12 relative overflow-y-auto">
        <div className="absolute top-10 right-10 lg:hidden">
          <Link href="/" className="flex items-center gap-2 text-white/60 hover:text-white transition-colors">
            <ArrowLeft className="w-4 h-4" /> Kembali
          </Link>
        </div>

        <div className="w-full max-w-md space-y-8 bg-white/5 border border-white/10 backdrop-blur-2xl rounded-3xl p-8 sm:p-10 shadow-[0_0_50px_rgba(0,0,0,0.3)] my-8">
          <div className="space-y-2 text-center lg:text-left">
            <h2 className="text-3xl font-black tracking-tight">Daftar Akun</h2>
            <p className="text-sm text-white/50">Lengkapi formulir di bawah untuk memulai</p>
          </div>

          {error && (
            <div className="flex items-center gap-3 bg-red-500/10 border border-red-500/20 text-red-400 rounded-2xl p-4 text-sm">
              <AlertCircle className="w-5 h-5 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Name Field */}
            <div className="space-y-1.5">
              <label htmlFor="name" className="text-xs font-bold uppercase tracking-wider text-white/60">
                Full Name
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-white/40 pointer-events-none">
                  <User className="w-4 h-4" />
                </span>
                <input
                  id="name"
                  type="text"
                  placeholder="John Doe"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-[#111111] border border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-sm text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                  required
                />
              </div>
            </div>

            {/* Email Field */}
            <div className="space-y-1.5">
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
                  className="w-full bg-[#111111] border border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-sm text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                  required
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="space-y-1.5">
              <label htmlFor="password" className="text-xs font-bold uppercase tracking-wider text-white/60">
                Password
              </label>
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
                  className="w-full bg-[#111111] border border-white/10 rounded-xl pl-10 pr-10 py-2.5 text-sm text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
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
              
              {/* Password Strength Checklist */}
              {password && (
                <div className="p-3 bg-[#111111] border border-white/5 rounded-xl space-y-1.5 text-xs text-white/50">
                  <p className="font-bold text-white/70">Kekuatan Password:</p>
                  <div className="grid grid-cols-2 gap-x-4 gap-y-1">
                    <div className="flex items-center gap-1.5">
                      {hasMinLength ? <Check className="w-3.5 h-3.5 text-green-500" /> : <X className="w-3.5 h-3.5 text-white/20" />}
                      <span className={hasMinLength ? 'text-green-500/80 font-medium' : ''}>Min 8 karakter</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      {hasUppercase ? <Check className="w-3.5 h-3.5 text-green-500" /> : <X className="w-3.5 h-3.5 text-white/20" />}
                      <span className={hasUppercase ? 'text-green-500/80 font-medium' : ''}>Huruf besar (A-Z)</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      {hasNumber ? <Check className="w-3.5 h-3.5 text-green-500" /> : <X className="w-3.5 h-3.5 text-white/20" />}
                      <span className={hasNumber ? 'text-green-500/80 font-medium' : ''}>Angka (0-9)</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      {hasSpecial ? <Check className="w-3.5 h-3.5 text-green-500" /> : <X className="w-3.5 h-3.5 text-white/20" />}
                      <span className={hasSpecial ? 'text-green-500/80 font-medium' : ''}>Simbol (!@#$...)</span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Confirm Password Field */}
            <div className="space-y-1.5">
              <label htmlFor="confirmPassword" className="text-xs font-bold uppercase tracking-wider text-white/60">
                Confirm Password
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-white/40 pointer-events-none">
                  <Lock className="w-4 h-4" />
                </span>
                <input
                  id="confirmPassword"
                  type="password"
                  placeholder="••••••••"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full bg-[#111111] border border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-sm text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                  required
                />
              </div>
              {confirmPassword && (
                <div className="text-xs">
                  {isMatching ? (
                    <span className="text-green-500 flex items-center gap-1"><Check className="w-3.5 h-3.5" /> Password cocok</span>
                  ) : (
                    <span className="text-red-400 flex items-center gap-1"><X className="w-3.5 h-3.5" /> Password belum cocok</span>
                  )}
                </div>
              )}
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              isLoading={isLoading}
              className="w-full bg-white hover:bg-orange-50 text-[#0A0A0A] font-black py-3 rounded-xl shadow-lg transition-all"
            >
              Mulai Akun Gratis
            </Button>
          </form>

          {/* Login Link */}
          <div className="text-center text-sm text-white/40 mt-6">
            Sudah memiliki akun?{' '}
            <Link href="/login" className="text-orange-400 hover:text-orange-300 font-bold transition-colors">
              Masuk di sini
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
