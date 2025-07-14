"use client";

import Link from "next/link";

export function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-300">
      <div className="container mx-auto px-6 py-4">
        {/* ガラスのような背景を持つナビゲーションバー */}
        <nav className="glass-nav rounded-full shadow-lg p-2 flex justify-between items-center">
          <a href="#" className="font-bold text-xl text-slate-800 pl-4">DaraHP</a>
          <a href="#articles" className="bg-teal-500 text-white font-semibold py-2 px-6 rounded-full hover:bg-teal-600 transition-colors duration-300">
            記事を読む
          </a>
        </nav>
      </div>
    </header>
  );
}