"use client";

import Link from 'next/link';
import Image from 'next/image';
import { useAuthStore } from '@/store/useAuthStore';
import { Button } from '@/components/UI/Button';
import {
  Star, MessageSquare, CheckSquare, Wand2,
  ArrowRight, Building2, User, Users,
  CheckCircle2, Home, FileText, BarChart2, Shield, Settings, MoreVertical, Share, Filter,
  Play, Zap, Lock, ShieldCheck, Globe, Cpu, Fingerprint,
  ArrowUpRight, Sparkles, TrendingUp, Quote, ChevronDown,
  Briefcase, FileSignature, FileKey, FileBadge,
  Calculator, Lightbulb, PenTool, Handshake, EyeOff, GitPullRequest, Receipt, PackageCheck
} from 'lucide-react';
import { PricingSection } from '@/components/Marketing/PricingSection';

export default function LandingPage() {
  const { isLoggedIn, logout, user } = useAuthStore();

  return (
    <div className="flex flex-col min-h-screen font-sans bg-[#0A0A0A]">
      {/* Floating Glass Header */}
      <header className="fixed top-6 left-0 right-0 z-50 flex justify-center px-4 animate-fade-in">
        <div className="w-full max-w-5xl bg-[#111111]/80 backdrop-blur-2xl border border-white/10 rounded-2xl md:rounded-[2rem] px-4 md:px-6 py-3 md:py-4 flex items-center justify-between shadow-[0_0_40px_rgba(0,0,0,0.5)]">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 md:w-10 md:h-10 bg-gradient-to-br from-orange-400 to-orange-600 rounded-lg md:rounded-xl flex items-center justify-center font-black text-[#0A0A0A] text-lg md:text-xl shadow-inner shadow-white/20">S</div>
            <span className="text-lg md:text-xl font-black tracking-tight text-white italic hidden sm:block">ScopeFlo<span className="text-orange-500">.</span></span>
          </div>
          <nav className="hidden md:flex items-center gap-8 bg-[#0A0A0A]/50 px-8 py-3 rounded-full border border-white/5 shadow-inner">
            <a href="#templates" className="text-sm font-bold text-white/60 hover:text-white hover:scale-105 transition-all">Templates</a>
            <a href="#features" className="text-sm font-bold text-white/60 hover:text-white hover:scale-105 transition-all">Features</a>
            <a href="#pricing" className="text-sm font-bold text-white/60 hover:text-white hover:scale-105 transition-all">Pricing</a>
          </nav>
          <div className="flex items-center gap-4 md:gap-6">
            {isLoggedIn ? (
              <>
                <span className="text-sm font-semibold text-white/60 hidden sm:inline">
                  Hai, {user?.name}
                </span>
                <Link href="/dashboard" className="text-sm font-bold text-white/80 hover:text-white transition-colors">
                  Dashboard
                </Link>
                <button 
                  onClick={logout}
                  className="text-sm font-bold text-red-400 hover:text-red-300 transition-colors cursor-pointer"
                >
                  Log out
                </button>
              </>
            ) : (
              <>
                <Link href="/login" className="text-sm font-bold text-white/80 hover:text-white transition-colors hidden sm:block">
                  Log in
                </Link>
                <Link href="/register">
                  <Button className="bg-white text-[#0A0A0A] hover:bg-orange-100 font-black rounded-lg md:rounded-xl px-5 md:px-7 h-10 md:h-12 shadow-[0_0_20px_rgba(255,255,255,0.1)] hover:shadow-[0_0_30px_rgba(255,255,255,0.3)] transition-all">
                    Get Started
                  </Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </header>

      {/* 1. Creative Hero Section */}
      <section className="relative min-h-screen flex items-center pt-32 pb-32 overflow-hidden bg-[#0A0A0A]">
        {/* Background Layer */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/hero-abstract.png"
            alt="Abstract Background"
            fill
            className="object-cover opacity-20 blur-[4px] mix-blend-overlay"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#0A0A0A]/80 to-[#0A0A0A]"></div>
        </div>

        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <div className="flex flex-col items-center text-center max-w-5xl mx-auto">
            {/* Trust Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-xl mb-8 animate-fade-in">
              <div className="flex -space-x-1">
                {[1, 2, 3, 4, 5].map((i) => (
                  <Star key={i} className="w-4 h-4 fill-orange-400 text-orange-400" />
                ))}
              </div>
              <span className="text-sm font-medium text-white/80">
                <span className="text-white font-bold">4.9/5</span> from 2,000+ top-tier agencies
              </span>
            </div>

            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tight text-white mb-8 leading-[1.05]">
              Contracts that <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-amber-400 to-yellow-400 animate-gradient-x">
                Seal the Deal.
              </span>
            </h1>

            <p className="text-xl md:text-2xl text-orange-50/60 mb-12 max-w-3xl leading-relaxed">
              ScopeFlo isn't just a document generator. It's a high-performance workflow designed to turn complex SOWs into approved projects, 10x faster.
            </p>

            <div className="flex flex-col sm:flex-row items-center gap-6 mb-20">
              <Link href="/generator">
                <Button className="h-16 px-10 text-xl font-bold bg-white text-[#0A0A0A] hover:bg-orange-50 transition-all hover:scale-105 rounded-2xl shadow-[0_0_50px_rgba(255,165,0,0.15)] flex items-center gap-2">
                  Build Your First SOW <ArrowRight className="w-6 h-6" />
                </Button>
              </Link>
              <button className="flex items-center gap-3 text-white font-bold hover:text-orange-300 transition-colors group px-6 py-3 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm">
                Watch the Flow
                <div className="w-10 h-10 rounded-full bg-orange-500/20 border border-orange-500/30 flex items-center justify-center group-hover:bg-orange-500/40 transition-colors">
                  <Play className="w-4 h-4 fill-white ml-0.5" />
                </div>
              </button>
            </div>

            {/* Micro Stats Ticker */}
            <div className="flex flex-wrap justify-center items-center gap-x-12 gap-y-6 text-white/40 font-bold tracking-widest uppercase text-[10px] md:text-xs">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-orange-400" /> AES-256 Encrypted
              </div>
              <div className="flex items-center gap-2">
                <Globe className="w-4 h-4 text-amber-400" /> Global Standards
              </div>
              <div className="flex items-center gap-2">
                <Cpu className="w-4 h-4 text-yellow-400" /> Automated Validation
              </div>
            </div>
          </div>
        </div>

        {/* Floating Background Elements */}
        <div className="absolute top-1/4 -left-24 w-96 h-96 bg-orange-600/20 rounded-full blur-[120px] pointer-events-none"></div>
        <div className="absolute bottom-1/4 -right-24 w-96 h-96 bg-amber-600/20 rounded-full blur-[120px] pointer-events-none"></div>
      </section>

      {/* 2. Product Showcase - The Canvas */}
      <section id="templates" className="bg-[#0A0A0A] pb-32 overflow-hidden">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="relative group mx-auto max-w-6xl animate-fade-in" style={{ animationDelay: '200ms' }}>
            {/* Glow behind the dashboard */}
            <div className="absolute inset-0 bg-gradient-to-r from-orange-500/20 via-amber-500/20 to-yellow-500/20 blur-[120px] rounded-full group-hover:scale-110 transition-transform duration-1000"></div>

            <div className="relative z-10 p-2 sm:p-4 rounded-[3rem] bg-white/5 border border-white/10 backdrop-blur-3xl shadow-[0_0_100px_rgba(249,115,22,0.15)]">
              {/* Fake Window Controls */}
              <div className="flex items-center gap-2 px-8 py-5 border-b border-white/5">
                <div className="w-3 h-3 rounded-full bg-[#FF5F57]"></div>
                <div className="w-3 h-3 rounded-full bg-[#FEBC2E]"></div>
                <div className="w-3 h-3 rounded-full bg-[#28C840]"></div>
                <div className="ml-6 px-4 py-1.5 rounded-lg bg-white/5 border border-white/5 text-[10px] text-white/30 font-black uppercase tracking-[0.2em] flex items-center gap-2">
                  <Lock className="w-3 h-3" /> scopeflo.app/workspace/v/sow-2024
                </div>
              </div>

              {/* Main Dashboard Window */}
              <div className="rounded-b-[2.5rem] overflow-hidden flex text-left h-[750px] w-full flex-row">
                {/* Left Sidebar (Dark) */}
                <div className="w-20 bg-[#0A0A0A] flex flex-col items-center py-8 flex-shrink-0 border-r border-white/5">
                  <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center font-black text-[#0A0A0A] text-2xl mb-12 shadow-lg">S</div>
                  <Home className="w-6 h-6 text-white/20 hover:text-white cursor-pointer mb-10 transition-colors" />
                  <FileText className="w-6 h-6 text-white mb-10" />
                  <MessageSquare className="w-6 h-6 text-white/20 hover:text-white cursor-pointer mb-10 transition-colors" />
                  <CheckSquare className="w-6 h-6 text-white/20 hover:text-white cursor-pointer mb-10 transition-colors" />
                  <BarChart2 className="w-6 h-6 text-white/20 hover:text-white cursor-pointer mb-auto transition-colors" />
                  <Settings className="w-6 h-6 text-white/20 hover:text-white cursor-pointer transition-colors" />
                </div>

                {/* Main Content Area */}
                <div className="flex-1 flex flex-col min-w-0 bg-[#111111] relative z-10">
                  {/* Top Bar */}
                  <div className="h-24 border-b border-white/5 flex items-center justify-between px-10 flex-shrink-0 bg-[#0A0A0A]">
                    <div className="flex items-center gap-6">
                      <span className="font-black text-white text-2xl tracking-tight">Create Document</span>
                      <span className="bg-orange-500/10 text-orange-500 text-[10px] font-black px-4 py-1.5 rounded-full uppercase tracking-widest border border-orange-500/20">Template Library</span>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="px-4 py-2 rounded-lg bg-[#111111] border border-white/5 text-white/40 text-xs font-bold flex items-center gap-2">
                        <Filter className="w-3 h-3" /> Filter
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-1 overflow-y-auto bg-[#0A0A0A] p-8 md:p-12 relative z-10 custom-scrollbar">
                    <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                      {/* Quotation */}
                      <Link href="/generator?type=quotation" className="bg-[#111111] border border-white/5 rounded-3xl p-6 hover:border-blue-500/40 hover:-translate-y-1 transition-all group flex items-start gap-5 shadow-lg shadow-black/50">
                        <div className="w-12 h-12 bg-blue-500/10 border border-blue-500/20 rounded-xl flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                          <Calculator className="w-5 h-5 text-blue-400" />
                        </div>
                        <div>
                          <h4 className="text-lg font-bold text-white mb-1 group-hover:text-blue-400 transition-colors">Quotation</h4>
                          <p className="text-white/40 text-sm leading-relaxed">Itemized pricing & cost estimation for clients.</p>
                        </div>
                      </Link>

                      {/* Proposal */}
                      <Link href="/generator?type=proposal" className="bg-[#111111] border border-white/5 rounded-3xl p-6 hover:border-blue-400/40 hover:-translate-y-1 transition-all group flex items-start gap-5 shadow-lg shadow-black/50">
                        <div className="w-12 h-12 bg-blue-400/10 border border-blue-400/20 rounded-xl flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                          <Lightbulb className="w-5 h-5 text-blue-400" />
                        </div>
                        <div>
                          <h4 className="text-lg font-bold text-white mb-1 group-hover:text-blue-400 transition-colors">Proposal</h4>
                          <p className="text-white/40 text-sm leading-relaxed">Solutions, portfolio, and project approach.</p>
                        </div>
                      </Link>

                      {/* Statement of Work */}
                      <Link href="/generator?type=sow" className="bg-[#111111] border border-white/5 rounded-3xl p-6 hover:border-purple-400/40 hover:-translate-y-1 transition-all group flex items-start gap-5 shadow-lg shadow-black/50">
                        <div className="w-12 h-12 bg-purple-500/10 border border-purple-500/20 rounded-xl flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                          <FileText className="w-5 h-5 text-purple-400" />
                        </div>
                        <div>
                          <h4 className="text-lg font-bold text-white mb-1 group-hover:text-purple-400 transition-colors">Statement of Work</h4>
                          <p className="text-white/40 text-sm leading-relaxed">Scope, deliverables & timeline.</p>
                        </div>
                      </Link>

                      {/* Contract Agreement */}
                      <Link href="/generator?type=contract" className="bg-[#111111] border border-white/5 rounded-3xl p-6 hover:border-purple-400/40 hover:-translate-y-1 transition-all group flex items-start gap-5 shadow-lg shadow-black/50">
                        <div className="w-12 h-12 bg-purple-400/10 border border-purple-400/20 rounded-xl flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                          <FileSignature className="w-5 h-5 text-purple-400" />
                        </div>
                        <div>
                          <h4 className="text-lg font-bold text-white mb-1 group-hover:text-purple-400 transition-colors">Contract Agreement</h4>
                          <p className="text-white/40 text-sm leading-relaxed">Legal terms, payment & conditions.</p>
                        </div>
                      </Link>

                      {/* Service Level Agreement */}
                      <Link href="/generator?type=sla" className="bg-[#111111] border border-white/5 rounded-3xl p-6 hover:border-indigo-400/40 hover:-translate-y-1 transition-all group flex items-start gap-5 shadow-lg shadow-black/50">
                        <div className="w-12 h-12 bg-indigo-400/10 border border-indigo-400/20 rounded-xl flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                          <ShieldCheck className="w-5 h-5 text-indigo-400" />
                        </div>
                        <div>
                          <h4 className="text-lg font-bold text-white mb-1 group-hover:text-indigo-400 transition-colors">Service Level Agreement</h4>
                          <p className="text-white/40 text-sm leading-relaxed">Uptime guarantees & support terms.</p>
                        </div>
                      </Link>

                      {/* Master Service Agreement */}
                      <Link href="/generator?type=msa" className="bg-[#111111] border border-white/5 rounded-3xl p-6 hover:border-fuchsia-400/40 hover:-translate-y-1 transition-all group flex items-start gap-5 shadow-lg shadow-black/50">
                        <div className="w-12 h-12 bg-fuchsia-400/10 border border-fuchsia-400/20 rounded-xl flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                          <Handshake className="w-5 h-5 text-fuchsia-400" />
                        </div>
                        <div>
                          <h4 className="text-lg font-bold text-white mb-1 group-hover:text-fuchsia-400 transition-colors">Master Service Agreement</h4>
                          <p className="text-white/40 text-sm leading-relaxed">Umbrella terms for all future SOWs.</p>
                        </div>
                      </Link>

                      {/* Non-Disclosure Agreement */}
                      <Link href="/generator?type=nda" className="bg-[#111111] border border-white/5 rounded-3xl p-6 hover:border-violet-400/40 hover:-translate-y-1 transition-all group flex items-start gap-5 shadow-lg shadow-black/50 xl:col-span-2">
                        <div className="w-12 h-12 bg-violet-400/10 border border-violet-400/20 rounded-xl flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                          <EyeOff className="w-5 h-5 text-violet-400" />
                        </div>
                        <div>
                          <h4 className="text-lg font-bold text-white mb-1 group-hover:text-violet-400 transition-colors">Non-Disclosure Agreement</h4>
                          <p className="text-white/40 text-sm leading-relaxed">Confidentiality & information protection.</p>
                        </div>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>



      {/* 3. The Bento Experience (Features & Trust) */}
      <section id="features" className="py-32 bg-[#0A0A0A] relative overflow-hidden">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-3xl mb-20">
            <h2 className="text-sm font-bold text-orange-500 tracking-[0.2em] uppercase mb-4 flex items-center gap-2">
              <Sparkles className="w-4 h-4" /> Engineered for Professionalism
            </h2>
            <h3 className="text-4xl md:text-6xl font-black text-white tracking-tight leading-tight">
              A high-end workflow for <br />
              <span className="text-white/40">high-stakes contracts.</span>
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 auto-rows-[280px]">
            {/* Main Feature: Smart Gen */}
            <div className="md:col-span-8 md:row-span-2 relative group overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-orange-500/20 to-amber-500/10 border border-white/10 p-10 flex flex-col justify-between hover:border-orange-500/40 transition-all hover:-translate-y-1">
              <div className="absolute top-0 right-0 p-8 opacity-20 group-hover:opacity-40 transition-opacity">
                <Wand2 className="w-32 h-32 text-orange-400" />
              </div>
              <div className="relative z-10">
                <div className="w-14 h-14 bg-orange-500 rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-orange-500/20">
                  <Wand2 className="w-7 h-7 text-white" />
                </div>
                <h4 className="text-3xl font-bold text-white mb-4">Smart Generation</h4>
                <p className="text-xl text-white/50 max-w-md leading-relaxed">
                  Input basic project parameters and watch ScopeFlo craft a legally sound, professionally formatted SOW in seconds.
                </p>
              </div>
              <div className="flex gap-4">
                <span className="px-4 py-2 rounded-full bg-white/5 border border-white/10 text-xs font-bold text-orange-300">10x Faster</span>
                <span className="px-4 py-2 rounded-full bg-white/5 border border-white/10 text-xs font-bold text-amber-300">AI-Optimized</span>
              </div>
            </div>

            {/* Feature: Security */}
            <div className="md:col-span-4 md:row-span-2 relative group overflow-hidden rounded-[2.5rem] bg-[#111111] border border-white/10 p-10 flex flex-col justify-between hover:border-green-500/40 transition-all hover:-translate-y-1">
              <div className="relative z-10">
                <div className="w-14 h-14 bg-green-500/20 border border-green-500/30 rounded-2xl flex items-center justify-center mb-6">
                  <ShieldCheck className="w-7 h-7 text-green-500" />
                </div>
                <h4 className="text-2xl font-bold text-white mb-4">The Vault</h4>
                <p className="text-lg text-white/40 leading-relaxed">
                  Bank-grade AES-256 encryption. Your contracts are encrypted at rest and in transit.
                </p>
              </div>
              <div className="pt-8 border-t border-white/5 mt-auto">
                <div className="flex items-center gap-3 text-white font-bold text-sm">
                  <Fingerprint className="w-5 h-5 text-green-500" /> Biometric Ready
                </div>
              </div>
            </div>

            {/* Feature: Collaboration */}
            <div className="md:col-span-4 md:row-span-2 relative group overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-yellow-500/10 to-transparent border border-white/10 p-10 flex flex-col hover:border-yellow-500/40 transition-all hover:-translate-y-1">
              <div className="w-14 h-14 bg-yellow-500/20 border border-yellow-500/30 rounded-2xl flex items-center justify-center mb-6">
                <MessageSquare className="w-7 h-7 text-yellow-500" />
              </div>
              <h4 className="text-2xl font-bold text-white mb-4">Contextual Chat</h4>
              <p className="text-lg text-white/40 leading-relaxed mb-6">
                Discuss every clause directly on the document. No more hunting through Slack for project decisions.
              </p>
              <div className="mt-auto space-y-3">
                <div className="h-2 bg-white/5 rounded-full w-full"></div>
                <div className="h-2 bg-white/10 rounded-full w-4/5"></div>
                <div className="h-2 bg-white/5 rounded-full w-3/4"></div>
              </div>
            </div>

            {/* Feature: Audit Trail */}
            <div className="md:col-span-8 md:row-span-1 relative group overflow-hidden rounded-[2.5rem] bg-[#111111] border border-white/10 p-10 flex items-center justify-between hover:border-orange-400/40 transition-all hover:-translate-y-1">
              <div className="flex-1">
                <h4 className="text-2xl font-bold text-white mb-2">Immutable Audit Trail</h4>
                <p className="text-lg text-white/40 max-w-md">Every change, comment, and approval is recorded permanently. Never lose track of scope changes again.</p>
              </div>
              <div className="hidden lg:flex gap-2">
                {[1, 2, 3, 4].map(i => (
                  <div key={i} className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white/20 font-black">
                    {i}
                  </div>
                ))}
              </div>
            </div>

            {/* Feature: Speed */}
            <div className="md:col-span-4 md:row-span-1 relative group overflow-hidden rounded-[2.5rem] bg-orange-600 border border-orange-400 p-8 flex items-center gap-6 hover:scale-[1.05] transition-all cursor-pointer">
              <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center shrink-0">
                <Zap className="w-8 h-8 text-orange-600 fill-current" />
              </div>
              <div>
                <h4 className="text-xl font-black text-white uppercase tracking-wider">Start Now</h4>
                <p className="text-orange-100/60 font-bold text-sm leading-tight">Zero configuration. <br />Professional results.</p>
              </div>
              <ArrowUpRight className="w-8 h-8 text-white absolute top-6 right-6 opacity-40 group-hover:opacity-100 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all" />
            </div>

            {/* Feature: Global Scale */}
            <div className="md:col-span-4 md:row-span-1 relative group overflow-hidden rounded-[2.5rem] bg-white/5 border border-white/10 p-8 flex flex-col justify-center text-center hover:-translate-y-1 transition-transform">
              <h4 className="text-4xl font-black text-white mb-1">5,000+</h4>
              <p className="text-xs font-bold text-white/40 uppercase tracking-[0.3em]">Docs Generated</p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. "The Vault" - Detailed Security Section */}
      <section className="py-32 bg-[#0A0A0A] relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-6xl h-full bg-orange-600/10 blur-[150px] pointer-events-none rounded-full"></div>
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center gap-20">
            <div className="w-full lg:w-1/2 relative">
              <div className="relative z-10 rounded-[3rem] overflow-hidden border border-white/10 shadow-[0_0_100px_rgba(249,115,22,0.1)]">
                <Image
                  src="/images/security-vault.png"
                  alt="Digital Security Vault"
                  width={800}
                  height={800}
                  className="w-full h-auto transform hover:scale-110 transition-transform duration-[2s]"
                />
              </div>
              <div className="absolute -top-10 -left-10 w-32 h-32 bg-orange-500 rounded-full blur-[80px] opacity-40"></div>
              <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-yellow-500 rounded-full blur-[80px] opacity-40"></div>
            </div>

            <div className="w-full lg:w-1/2">
              <h2 className="text-sm font-bold text-green-500 tracking-[0.2em] uppercase mb-4">Enterprise-Grade Trust</h2>
              <h3 className="text-4xl md:text-5xl font-black text-white mb-8 tracking-tight">Your data is protected by the <br /><span className="text-white/40">highest digital standards.</span></h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <div className="w-10 h-10 bg-white/5 border border-white/10 rounded-xl flex items-center justify-center text-white">
                    <Lock className="w-5 h-5" />
                  </div>
                  <h4 className="text-xl font-bold text-white">AES-256 Encryption</h4>
                  <p className="text-white/40 leading-relaxed">Documents are encrypted with bank-level protocols, ensuring only you and your clients can access them.</p>
                </div>
                <div className="space-y-4">
                  <div className="w-10 h-10 bg-white/5 border border-white/10 rounded-xl flex items-center justify-center text-white">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <h4 className="text-xl font-bold text-white">GDPR Compliant</h4>
                  <p className="text-white/40 leading-relaxed">We respect and protect your data privacy, strictly adhering to global compliance standards.</p>
                </div>
                <div className="space-y-4">
                  <div className="w-10 h-10 bg-white/5 border border-white/10 rounded-xl flex items-center justify-center text-white">
                    <Cpu className="w-5 h-5" />
                  </div>
                  <h4 className="text-xl font-bold text-white">Verified Signatures</h4>
                  <p className="text-white/40 leading-relaxed">Digital signatures are timestamped and verified with a unique digital fingerprint.</p>
                </div>
                <div className="space-y-4">
                  <div className="w-10 h-10 bg-white/5 border border-white/10 rounded-xl flex items-center justify-center text-white">
                    <Globe className="w-5 h-5" />
                  </div>
                  <h4 className="text-xl font-bold text-white">Global Infrastructure</h4>
                  <p className="text-white/40 leading-relaxed">Redundant servers across the globe ensure 99.9% uptime and lightning-fast performance.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Wall of Love - Creative Social Proof */}
      <section className="py-32 bg-[#0A0A0A] relative overflow-hidden">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-24">
            <h2 className="text-sm font-bold text-amber-400 tracking-[0.2em] uppercase mb-4">The Inner Circle</h2>
            <h3 className="text-4xl md:text-6xl font-black text-white tracking-tight leading-tight">
              Built for teams who <br />
              <span className="text-white/40">demand excellence.</span>
            </h3>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Testimonial 1 */}
            <div className="md:col-span-2 bg-white/5 border border-white/10 p-12 rounded-[3rem] backdrop-blur-xl relative group hover:border-amber-500/30 transition-all">
              <Quote className="absolute top-10 right-10 w-20 h-20 text-white/5 group-hover:text-orange-500/10 transition-colors" />
              <div className="flex text-amber-400 mb-8 gap-1">
                {[1, 2, 3, 4, 5].map(i => <Star key={i} className="w-5 h-5 fill-current" />)}
              </div>
              <p className="text-2xl md:text-3xl font-medium text-white leading-relaxed mb-12">
                "ScopeFlo has fundamentally changed our agency's workflow. We've cut document generation time by 90% and client approvals have never been faster."
              </p>
              <div className="flex items-center gap-6">
                <div className="w-16 h-16 bg-gradient-to-tr from-orange-500 to-amber-500 rounded-2xl flex items-center justify-center text-white font-black text-2xl">
                  SJ
                </div>
                <div>
                  <h4 className="text-xl font-bold text-white">Sarah Jenkins</h4>
                  <p className="text-orange-300/60 font-medium tracking-wide uppercase text-xs mt-1">Founder, CreateDigital</p>
                </div>
              </div>
            </div>

            {/* Testimonial 2 */}
            <div className="bg-gradient-to-b from-[#1F110A] to-[#0A0A0A] border border-white/10 p-10 rounded-[3rem] flex flex-col justify-between hover:border-amber-500/30 transition-all">
              <p className="text-lg text-white/70 leading-relaxed italic">
                "Finally, a tool that understands the nuance of SOWs. The audit trail is a lifesaver for scope-creep management."
              </p>
              <div className="mt-12 flex items-center gap-4 pt-8 border-t border-white/5">
                <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center text-white font-bold">
                  MP
                </div>
                <div>
                  <h4 className="text-white font-bold text-sm">Mark Peterson</h4>
                  <p className="text-white/30 text-[10px] font-bold uppercase tracking-widest">Independent Consultant</p>
                </div>
              </div>
            </div>

            {/* Testimonial 3 */}
            <div className="bg-white/5 border border-white/10 p-10 rounded-[3rem] flex flex-col justify-between hover:border-amber-500/30 transition-all">
              <p className="text-lg text-white/70 leading-relaxed italic">
                "The legally binding signatures and AES-256 encryption give our enterprise clients the peace of mind they need."
              </p>
              <div className="mt-12 flex items-center gap-4 pt-8 border-t border-white/5">
                <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center text-white font-bold">
                  RL
                </div>
                <div>
                  <h4 className="text-white font-bold text-sm">Rebecca Low</h4>
                  <p className="text-white/30 text-[10px] font-bold uppercase tracking-widest">Legal Counsel, TechFlow</p>
                </div>
              </div>
            </div>

            {/* Testimonial 4 */}
            <div className="md:col-span-2 bg-[#111111] border border-white/10 p-10 rounded-[3rem] relative overflow-hidden flex items-center justify-between group hover:border-amber-500/30 transition-all">
              <div className="absolute inset-0 bg-gradient-to-r from-orange-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <div className="relative z-10 flex-1">
                <h4 className="text-3xl font-bold text-white mb-4">Join 2,000+ Teams</h4>
                <p className="text-white/40 max-w-md">From solo freelancers to global agencies, ScopeFlo is the standard for professional contracts.</p>
              </div>
              <div className="relative z-10 hidden sm:flex -space-x-4">
                {[1, 2, 3, 4, 5].map(i => (
                  <img key={i} src={`https://i.pravatar.cc/100?img=${i + 10}`} alt="Team Member" className="w-14 h-14 rounded-full border-4 border-[#111111] object-cover" />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Simple, Premium Pricing */}
      <PricingSection />

      {/* 7. FAQ Section - Premium Dark */}
      <section className="py-32 bg-[#0A0A0A] relative border-t border-white/5">
        <div className="container mx-auto px-4 lg:px-8 max-w-4xl">
          <div className="text-center mb-24">
            <h2 className="text-sm font-bold text-amber-400 tracking-[0.2em] uppercase mb-4 text-center">Inquiry</h2>
            <h3 className="text-4xl md:text-5xl font-black text-white tracking-tight text-center">Frequently asked <br /><span className="text-white/40">questions.</span></h3>
          </div>

          <div className="space-y-4">
            {[
              {
                q: "Is ScopeFlo free to use?",
                a: "Yes, we offer a robust Essential Plan that includes 3 document generations per month and full discussion features to help you get started."
              },
              {
                q: "Do I need real-time chat?",
                a: "No. ScopeFlo uses contextual, asynchronous discussion threads. This is far superior for tracking project decisions than scattered real-time chat messages."
              },
              {
                q: "Can clients review documents easily?",
                a: "Absolutely. Simply share a secure, encrypted link. Your clients can review, comment, and approve directly on the document without needing an account."
              },
              {
                q: "What about data security?",
                a: "We use bank-grade AES-256 encryption for all data at rest and in transit. Your intellectual property is protected by the highest digital standards."
              }
            ].map((item, i) => (
              <div key={i} className="group bg-white/5 border border-white/10 rounded-3xl p-8 hover:bg-white/10 transition-all cursor-pointer">
                <div className="flex items-center justify-between gap-6">
                  <h4 className="text-xl font-bold text-white">{item.q}</h4>
                  <ChevronDown className="w-6 h-6 text-white/20 group-hover:text-white transition-colors" />
                </div>
                <div className="mt-6 text-white/40 leading-relaxed font-medium">
                  {item.a}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. Final CTA Section - Creative & High Impact */}
      <section className="py-40 bg-[#0A0A0A] relative overflow-hidden border-t border-white/5">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-5xl h-full bg-orange-600/20 blur-[180px] pointer-events-none rounded-full"></div>
        <div className="absolute -bottom-24 left-0 right-0 h-48 bg-gradient-to-t from-orange-500/20 to-transparent"></div>

        <div className="container mx-auto px-4 lg:px-8 text-center relative z-10 max-w-4xl">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-400 text-xs font-bold uppercase tracking-widest mb-10">
            Ready to elevate?
          </div>
          <h2 className="text-6xl md:text-8xl font-black text-white mb-12 tracking-tighter leading-none">
            Stop Drafting. <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-amber-400 to-yellow-400">Start Closing.</span>
          </h2>
          <p className="text-2xl text-orange-50/60 mb-16 leading-relaxed font-medium">
            Join the elite agencies using ScopeFlo to automate their contract workflow.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-8">
            <Link href="/generator">
              <Button className="h-18 px-12 text-2xl font-black bg-white text-[#0A0A0A] hover:bg-orange-50 rounded-2xl shadow-[0_0_60px_rgba(255,255,255,0.2)] transition-all hover:scale-105 flex items-center gap-3">
                Get Started Free <ArrowRight className="w-7 h-7" />
              </Button>
            </Link>
            <div className="flex items-center gap-4 text-white/40 font-bold uppercase text-xs tracking-widest">
              <div className="flex -space-x-2">
                {[1, 2, 3].map(i => <img key={i} src={`https://i.pravatar.cc/100?img=${i + 20}`} className="w-8 h-8 rounded-full border-2 border-[#0A0A0A]" alt="Avatar" />)}
              </div>
              Trusted by 2,000+ teams
            </div>
          </div>
        </div>
      </section>

      {/* 9. Premium Footer */}
      <footer className="bg-[#0A0A0A] border-t border-white/5 pt-32 pb-16">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-16 mb-24">
            <div className="md:col-span-5">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center font-black text-[#0A0A0A] text-2xl">S</div>
                <span className="text-3xl font-black tracking-tight text-white italic">ScopeFlo<span className="text-orange-500">.</span></span>
              </div>
              <p className="text-white/40 text-xl leading-relaxed mb-10 max-w-sm font-medium">
                The professional standard for Statements of Work. Built for those who value clarity and speed.
              </p>
              <div className="flex gap-6">
                {["Twitter", "LinkedIn", "GitHub"].map((social) => (
                  <a key={social} href="#" className="text-white/20 hover:text-white transition-colors font-bold text-sm uppercase tracking-widest">
                    {social}
                  </a>
                ))}
              </div>
            </div>

            <div className="md:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-12">
              <div>
                <h4 className="text-white font-black uppercase text-xs tracking-[0.2em] mb-8">Platform</h4>
                <ul className="space-y-5">
                  {["Features", "Integrations", "Pricing", "Security"].map((item) => (
                    <li key={item}><a href="#" className="text-white/40 hover:text-white transition-colors font-bold text-sm">{item}</a></li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="text-white font-black uppercase text-xs tracking-[0.2em] mb-8">Resources</h4>
                <ul className="space-y-5">
                  {["Documentation", "Templates", "API Reference", "Guides"].map((item) => (
                    <li key={item}><a href="#" className="text-white/40 hover:text-white transition-colors font-bold text-sm">{item}</a></li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="text-white font-black uppercase text-xs tracking-[0.2em] mb-8">Company</h4>
                <ul className="space-y-5">
                  {["About", "Customers", "Careers", "Legal"].map((item) => (
                    <li key={item}><a href="#" className="text-white/40 hover:text-white transition-colors font-bold text-sm">{item}</a></li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          <div className="pt-12 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-6">
            <p className="text-white/20 font-bold text-xs uppercase tracking-widest">
              © {new Date().getFullYear()} ScopeFlo Inc. Crafted for Excellence.
            </p>
            <div className="flex gap-10">
              {["Terms", "Privacy", "Security"].map((item) => (
                <a key={item} href="#" className="text-white/20 hover:text-white transition-colors font-bold text-xs uppercase tracking-widest">{item}</a>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
