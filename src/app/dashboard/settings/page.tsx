'use client';

import React from 'react';
import { useAuthStore } from '@/store/useAuthStore';
import { User, Mail, Calendar, Shield, KeyRound, CheckCircle2 } from 'lucide-react';

export default function SettingsPage() {
  const { user } = useAuthStore();

  const formattedDate = user?.createdAt
    ? new Date(user.createdAt).toLocaleDateString('id-ID', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    : 'Tidak diketahui';

  const userInitials = user?.name
    ? user.name
        .split(' ')
        .map((n) => n[0])
        .join('')
        .toUpperCase()
        .substring(0, 2)
    : 'U';

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div>
        <h2 className="text-3xl font-black text-gray-900 tracking-tight">Pengaturan Akun</h2>
        <p className="text-gray-500 mt-1">Kelola detail profil, preferensi, dan keamanan akun Anda.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Profile Card */}
        <div className="md:col-span-1 bg-white rounded-2xl border border-gray-150 p-6 shadow-sm flex flex-col items-center text-center">
          <div className="w-20 h-20 rounded-full bg-[#5a32fa]/10 border-2 border-[#5a32fa]/20 flex items-center justify-center text-2xl font-black text-[#5a32fa] mb-4">
            {userInitials}
          </div>
          <h3 className="text-lg font-bold text-gray-900">{user?.name}</h3>
          <p className="text-sm text-gray-500 mt-0.5">{user?.email}</p>
          <div className="inline-flex items-center gap-1.5 bg-green-50 border border-green-200 text-green-700 text-xs font-bold px-3 py-1 rounded-full mt-4 uppercase">
            <CheckCircle2 className="w-3.5 h-3.5" />
            {user?.role?.replace('_', ' ')}
          </div>
        </div>

        {/* Profile & Security Details */}
        <div className="md:col-span-2 space-y-6">
          {/* Profile Form (Read-only) */}
          <div className="bg-white rounded-2xl border border-gray-150 p-6 sm:p-8 shadow-sm space-y-6">
            <h4 className="font-bold text-gray-900 flex items-center gap-2 pb-3 border-b border-gray-100">
              <User className="w-5 h-5 text-[#5a32fa]" />
              Detail Profil
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="space-y-1.5">
                <span className="text-xs font-bold uppercase tracking-wider text-gray-400">Nama Lengkap</span>
                <div className="flex items-center gap-3 bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-700">
                  <User className="w-4 h-4 text-gray-400" />
                  <span>{user?.name}</span>
                </div>
              </div>

              <div className="space-y-1.5">
                <span className="text-xs font-bold uppercase tracking-wider text-gray-400">Alamat Email</span>
                <div className="flex items-center gap-3 bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-700">
                  <Mail className="w-4 h-4 text-gray-400" />
                  <span>{user?.email}</span>
                </div>
              </div>

              <div className="space-y-1.5">
                <span className="text-xs font-bold uppercase tracking-wider text-gray-400">Tanggal Terdaftar</span>
                <div className="flex items-center gap-3 bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-700">
                  <Calendar className="w-4 h-4 text-gray-400" />
                  <span>{formattedDate}</span>
                </div>
              </div>

              <div className="space-y-1.5">
                <span className="text-xs font-bold uppercase tracking-wider text-gray-400">User ID</span>
                <div className="flex items-center gap-3 bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-505 font-mono">
                  <span>{user?.id}</span>
                </div>
              </div>

              <div className="space-y-1.5 sm:col-span-2">
                <span className="text-xs font-bold uppercase tracking-wider text-gray-400">User Role / Subscription Plan</span>
                <div className="flex items-center gap-3 bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-700 font-bold uppercase tracking-wider">
                  <Shield className="w-4 h-4 text-[#5a32fa]" />
                  <span>{user?.role?.replace('_', ' ')}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Security & System Card */}
          <div className="bg-white rounded-2xl border border-gray-150 p-6 sm:p-8 shadow-sm space-y-6">
            <h4 className="font-bold text-gray-900 flex items-center gap-2 pb-3 border-b border-gray-100">
              <Shield className="w-5 h-5 text-green-600" />
              Sistem Keamanan Akun
            </h4>

            <div className="space-y-4 text-sm text-gray-600 leading-relaxed">
              <div className="flex items-start gap-3">
                <KeyRound className="w-5 h-5 text-gray-400 shrink-0 mt-0.5" />
                <div>
                  <h5 className="font-bold text-gray-800">Hashing SHA-256 Terenkripsi</h5>
                  <p className="text-gray-500 text-xs mt-0.5">
                    Password Anda diubah menjadi bentuk hash 256-bit acak menggunakan salt sebelum disimpan di browser lokal (localStorage). Password asli tidak akan pernah dapat diakses atau dibaca dalam bentuk teks murni.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <Shield className="w-5 h-5 text-gray-400 shrink-0 mt-0.5" />
                <div>
                  <h5 className="font-bold text-gray-800">Proteksi Rute / Auth Guard</h5>
                  <p className="text-gray-500 text-xs mt-0.5">
                    Semua sub-rute dashboard (Overview, Dokumen, Log Aktivitas, Pengaturan) sepenuhnya diproteksi oleh guard navigasi. Sesi yang tidak valid akan secara otomatis diarahkan ke halaman login.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
