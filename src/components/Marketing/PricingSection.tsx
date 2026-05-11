"use client";

import React, { useState } from 'react';
import { CheckCircle2, Sparkles, TrendingUp, Settings, ShieldCheck } from 'lucide-react';
import { Button } from '@/components/UI/Button';

export function PricingSection() {
  const [isAgency, setIsAgency] = useState(false);

  return (
    <section id="pricing" className="py-32 bg-[#0A0A0A] relative border-t border-white/5">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-sm font-bold text-orange-500 tracking-[0.2em] uppercase mb-4">Transparent Pricing</h2>
          <h3 className="text-4xl md:text-5xl font-black text-white tracking-tight leading-tight mb-8">
            Scale with <span className="text-white/40">confidence.</span>
          </h3>
          
          {/* Individual vs Agency Toggle */}
          <div className="inline-flex items-center p-1 bg-white/5 border border-white/10 rounded-full">
            <button
              onClick={() => setIsAgency(false)}
              className={`px-6 py-2.5 rounded-full text-sm font-bold transition-all ${
                !isAgency 
                  ? 'bg-orange-500 text-white shadow-lg' 
                  : 'text-white/40 hover:text-white'
              }`}
            >
              For Individuals
            </button>
            <button
              onClick={() => setIsAgency(true)}
              className={`px-6 py-2.5 rounded-full text-sm font-bold transition-all ${
                isAgency 
                  ? 'bg-orange-500 text-white shadow-lg' 
                  : 'text-white/40 hover:text-white'
              }`}
            >
              For Agencies
            </button>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {/* Tier 1: Free */}
          <div className="bg-white/5 border border-white/10 rounded-[3rem] p-12 flex flex-col hover:bg-white/10 transition-all group">
            <h3 className="text-2xl font-bold text-white mb-2">Free</h3>
            <p className="text-white/40 mb-10 text-sm">
              {isAgency ? "Test the waters with your team." : "Perfect for solo professionals starting out."}
            </p>
            <div className="mb-12">
              <span className="text-6xl font-black text-white">$0</span>
              <span className="text-white/20 font-bold ml-2">/forever</span>
            </div>
            <ul className="space-y-6 flex-1 mb-12">
              <li className="flex items-center gap-4 text-white/70 text-sm">
                <div className="w-5 h-5 bg-white/10 rounded-full flex items-center justify-center"><CheckCircle2 className="w-3 h-3 text-white" /></div> 
                {isAgency ? "1 Team Member" : "1 User"}
              </li>
              <li className="flex items-center gap-4 text-white/70 text-sm">
                <div className="w-5 h-5 bg-white/10 rounded-full flex items-center justify-center"><CheckCircle2 className="w-3 h-3 text-white" /></div> 
                3 Documents / Month
              </li>
              <li className="flex items-center gap-4 text-white/70 text-sm">
                <div className="w-5 h-5 bg-white/10 rounded-full flex items-center justify-center"><CheckCircle2 className="w-3 h-3 text-white" /></div> Standard Templates
              </li>
            </ul>
            <Button className="w-full bg-white text-[#0A0A0A] hover:bg-orange-50 py-7 text-lg font-bold rounded-2xl transition-all">
              Get Started
            </Button>
          </div>

          {/* Tier 2: Pro */}
          <div className="bg-[#1F110A] border-2 border-orange-500/50 rounded-[3rem] p-12 flex flex-col relative shadow-[0_0_100px_rgba(249,115,22,0.15)] transform lg:-translate-y-4">
            <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-orange-500 text-white px-6 py-1.5 rounded-full text-xs font-black uppercase tracking-widest">
              Most Popular
            </div>
            <h3 className="text-2xl font-bold text-white mb-2">Pro</h3>
            <p className="text-white/40 mb-10 text-sm">
              {isAgency ? "For growing teams that need collaboration." : "Unlock full power for your freelance business."}
            </p>
            <div className="mb-12">
              <span className="text-5xl font-black text-white">{isAgency ? "$49" : "$19"}</span>
              <span className="text-white/20 font-bold ml-2">/month</span>
            </div>
            <ul className="space-y-6 flex-1 mb-12">
              <li className="flex items-center gap-4 text-white/70 text-sm">
                <div className="w-5 h-5 bg-orange-500/20 rounded-full flex items-center justify-center"><Sparkles className="w-3 h-3 text-orange-400" /></div> 
                {isAgency ? "Up to 5 Team Members" : "Unlimited Documents"}
              </li>
              <li className="flex items-center gap-4 text-white/70 text-sm">
                <div className="w-5 h-5 bg-orange-500/20 rounded-full flex items-center justify-center"><Sparkles className="w-3 h-3 text-orange-400" /></div> 
                {isAgency ? "Team Collaboration Hub" : "AI Document Importer"}
              </li>
              <li className="flex items-center gap-4 text-white/70 text-sm">
                <div className="w-5 h-5 bg-orange-500/20 rounded-full flex items-center justify-center"><Sparkles className="w-3 h-3 text-orange-400" /></div> 
                {isAgency ? "Shared Immutable Audit Logs" : "Custom Branding"}
              </li>
            </ul>
            <Button className="w-full bg-orange-600 text-white hover:bg-orange-500 py-7 text-lg font-bold rounded-2xl transition-all shadow-[0_0_30px_rgba(249,115,22,0.3)] hover:scale-105">
              Start Free Trial
            </Button>
          </div>

          {/* Tier 3: Business */}
          <div className="bg-[#111111] border border-white/10 rounded-[3rem] p-12 flex flex-col hover:bg-white/5 transition-colors">
            <h3 className="text-2xl font-bold text-white mb-2">Business</h3>
            <p className="text-white/40 mb-10 text-sm">100% flexible. You decide the features.</p>
            <div className="mb-12">
              <span className="text-6xl font-black text-white">Custom</span>
            </div>
            <ul className="space-y-6 flex-1 mb-12">
              <li className="flex items-center gap-4 text-white/70 text-sm">
                <div className="w-5 h-5 bg-green-500/20 rounded-full flex items-center justify-center"><Settings className="w-3 h-3 text-green-500" /></div> 
                {isAgency ? "Unlimited Team Members" : "Superadmin Feature Toggles"}
              </li>
              <li className="flex items-center gap-4 text-white/70 text-sm">
                <div className="w-5 h-5 bg-green-500/20 rounded-full flex items-center justify-center"><TrendingUp className="w-3 h-3 text-green-500" /></div> Modular Add-ons
              </li>
              <li className="flex items-center gap-4 text-white/70 text-sm">
                <div className="w-5 h-5 bg-green-500/20 rounded-full flex items-center justify-center"><ShieldCheck className="w-3 h-3 text-green-500" /></div> Dedicated Architecture
              </li>
            </ul>
            <Button className="w-full bg-white/5 text-white border border-white/10 hover:bg-white/10 py-7 text-lg font-bold rounded-2xl transition-all">
              Contact Sales
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
