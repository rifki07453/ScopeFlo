import Link from 'next/link';
import { Container } from '@/components/Layout/Container';
import { Button } from '@/components/UI/Button';
import { FileText, Zap, ShieldCheck } from 'lucide-react';

export default function LandingPage() {
  return (
    <Container className="py-24 flex flex-col items-center text-center">
      <div className="inline-flex items-center rounded-full border border-gray-200 bg-white px-3 py-1 text-sm font-medium text-gray-800 shadow-sm mb-8 animate-fade-in">
        <span className="flex h-2 w-2 rounded-full bg-black mr-2"></span>
        ScopeFlo 1.0 is live
      </div>
      
      <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-gray-900 mb-6 max-w-4xl leading-tight">
        Generate Professional
        <span className="block text-transparent bg-clip-text bg-gradient-to-r from-gray-900 to-gray-500">
          Statement of Work Documents
        </span>
      </h1>
      
      <p className="text-xl text-gray-600 mb-10 max-w-2xl leading-relaxed">
        Stop writing SOWs from scratch. Input your project details and instantly generate a beautifully formatted, client-ready document.
      </p>
      
      <Link href="/generator">
        <Button className="h-14 px-8 text-lg shadow-lg hover:shadow-xl transition-all hover:-translate-y-1 rounded-full">
          Start Generating Now
        </Button>
      </Link>
      
      {/* Features Section */}
      <div className="grid md:grid-cols-3 gap-8 mt-32 text-left w-full">
        <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm transition-transform hover:-translate-y-1">
          <div className="h-14 w-14 bg-gray-50 rounded-2xl flex items-center justify-center mb-6 border border-gray-100">
            <Zap className="h-7 w-7 text-black" />
          </div>
          <h3 className="text-xl font-bold mb-3">Lightning Fast</h3>
          <p className="text-gray-600 leading-relaxed">Generate a comprehensive SOW in seconds just by filling out a simple, structured form.</p>
        </div>
        
        <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm transition-transform hover:-translate-y-1">
          <div className="h-14 w-14 bg-gray-50 rounded-2xl flex items-center justify-center mb-6 border border-gray-100">
            <FileText className="h-7 w-7 text-black" />
          </div>
          <h3 className="text-xl font-bold mb-3">Professional Format</h3>
          <p className="text-gray-600 leading-relaxed">Our templates are designed to look clean, modern, and legally structured out of the box.</p>
        </div>
        
        <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm transition-transform hover:-translate-y-1">
          <div className="h-14 w-14 bg-gray-50 rounded-2xl flex items-center justify-center mb-6 border border-gray-100">
            <ShieldCheck className="h-7 w-7 text-black" />
          </div>
          <h3 className="text-xl font-bold mb-3">Ready to Export</h3>
          <p className="text-gray-600 leading-relaxed">Download your documents instantly as reliable PDF files for immediate client sign-off.</p>
        </div>
      </div>
    </Container>
  );
}
