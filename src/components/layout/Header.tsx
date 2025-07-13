"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 100);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
      scrolled ? 'py-2' : 'py-4'
    }`}>
      <div className="container mx-auto px-6">
        <nav className={`glass-nav rounded-full px-6 py-3 flex justify-between items-center transition-all duration-300 ${
          scrolled ? 'shadow-xl' : 'shadow-lg'
        }`}>
          <Link href="/" className="flex items-center space-x-3 group">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full flex items-center justify-center hover:scale-110 transition-transform duration-300">
              <span className="text-white text-sm font-bold">だ</span>
            </div>
            <span className="hidden sm:block font-bold text-xl text-slate-800 group-hover:text-blue-600 transition-colors">
              だらリーヌ
            </span>
          </Link>
          
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/" className="relative font-medium text-slate-700 hover:text-blue-600 transition-colors group">
              ホーム
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-600 to-purple-600 transition-all group-hover:w-full"></span>
            </Link>
            <Link href="/blog" className="relative font-medium text-slate-700 hover:text-blue-600 transition-colors group">
              ブログ
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-600 to-purple-600 transition-all group-hover:w-full"></span>
            </Link>
            <a href="#editorial" className="relative font-medium text-slate-700 hover:text-blue-600 transition-colors group">
              編集局
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-600 to-purple-600 transition-all group-hover:w-full"></span>
            </a>
            <a href="#works" className="relative font-medium text-slate-700 hover:text-blue-600 transition-colors group">
              作例
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-600 to-purple-600 transition-all group-hover:w-full"></span>
            </a>
          </div>

          <Link href="/blog" className="bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold py-2 px-6 rounded-full hover:shadow-lg hover:scale-105 transition-all duration-300">
            記事を読む
          </Link>
        </nav>
      </div>
    </header>
  );
}