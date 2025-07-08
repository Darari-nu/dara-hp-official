"use client";

import Link from "next/link";

export function Header() {
  return (
    <header className="w-full bg-white py-4 px-6 flex justify-between items-center border-b">
      <div className="flex items-center gap-10">
        <Link href="/" className="w-10 h-10 bg-gray-900 rounded-full flex items-center justify-center hover:opacity-80 transition-opacity">
          <span className="text-white text-sm font-bold">D</span>
        </Link>
        
        <nav className="hidden md:flex gap-8">
          <Link href="/" className="font-medium relative group">
            <span className="relative">ホーム
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gray-900 transition-all group-hover:w-full"></span>
            </span>
          </Link>
          <Link href="/blog" className="font-medium relative group">
            <span className="relative">ブログ
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gray-900 transition-all group-hover:w-full"></span>
            </span>
          </Link>
          <a href="#editorial" className="font-medium relative group">
            <span className="relative">編集局
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gray-900 transition-all group-hover:w-full"></span>
            </span>
          </a>
          <a href="#works" className="font-medium relative group">
            <span className="relative">作例
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gray-900 transition-all group-hover:w-full"></span>
            </span>
          </a>
          <a href="#contact" className="font-medium relative group">
            <span className="relative">お問い合わせ
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gray-900 transition-all group-hover:w-full"></span>
            </span>
          </a>
        </nav>
      </div>
      
      <div className="w-10 h-10"> {/* Balance the layout */}
      </div>
    </header>
  );
}