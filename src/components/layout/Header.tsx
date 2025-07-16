"use client";

import Link from "next/link";
import { SITE_CONFIG, COLORS, ANIMATION } from "@/config/constants";

export function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-300">
      <div className="container mx-auto px-6 py-3">
        {/* ガラスのような背景を持つナビゲーションバー */}
        <nav className="flex justify-between items-center">
          <a href="#" className="bg-white rounded-full px-6 py-2 shadow-lg hover:shadow-xl transition-all duration-300">
            <span className="font-display font-bold text-gray-800 text-lg">DaraHP</span>
          </a>
          <button className="w-12 h-12 bg-gray-700 rounded-full flex items-center justify-center shadow-lg hover:bg-gray-800 transition-colors duration-300">
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </nav>
      </div>
    </header>
  );
}