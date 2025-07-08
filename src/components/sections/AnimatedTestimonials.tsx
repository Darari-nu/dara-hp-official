"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Quote } from "lucide-react";

interface Author {
  quote: string;
  name: string;
  designation: string;
  src: string;
}

// Sample data based on CLAUDE.md specifications
const darineAuthors: Author[] = [
  {
    quote: "AI規制の複雑さを、現場で使える形に変換します。法務と技術の橋渡し役として、皆さんの「困った」を解決したい。",
    name: "だらリーヌ",
    designation: "AI規制コンサルタント・元プロダクトリーダー",
    src: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=500&h=500&fit=crop"
  },
  {
    quote: "最新の技術動向とガイドライン改訂を分析し、企業が迷わない実装ステップを提案します。",
    name: "AIアシスタント",
    designation: "技術解説・ガイドライン分析担当",
    src: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=500&h=500&fit=crop"
  },
  {
    quote: "難しいAI話も、わかりやすく楽しく！トレンドと実用性を両立した情報をお届けします♪",
    name: "AIギャル",
    designation: "ユーザーフレンドリー解説・トレンド紹介担当",
    src: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=500&h=500&fit=crop"
  }
];

export function AnimatedTestimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => 
        prevIndex === darineAuthors.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-20 bg-gray-50">
      <div className="container">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold font-display mb-4">
            <span className="google-gradient">専門チーム</span>による
            <br />
            包括的なサポート
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            それぞれの専門性を活かして、多角的な視点からAI導入をサポートします
          </p>
        </div>

        <div className="relative max-w-4xl mx-auto">
          {/* Main Testimonial */}
          <div className="bg-white rounded-3xl p-8 lg:p-12 shadow-xl border border-gray-100">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              {/* Quote Section */}
              <div className="space-y-6">
                <Quote className="w-12 h-12 text-blue-500 opacity-20" />
                <blockquote className="text-xl lg:text-2xl font-medium text-gray-900 leading-relaxed">
                  &ldquo;{darineAuthors[currentIndex].quote}&rdquo;
                </blockquote>
                <div className="space-y-2">
                  <div className="text-xl font-bold font-display text-gray-900">
                    {darineAuthors[currentIndex].name}
                  </div>
                  <div className="text-gray-600">
                    {darineAuthors[currentIndex].designation}
                  </div>
                </div>
              </div>

              {/* Avatar Section */}
              <div className="flex justify-center">
                <div className="relative">
                  <div className="w-48 h-48 lg:w-56 lg:h-56 rounded-full overflow-hidden shadow-2xl ring-4 ring-blue-100">
                    <Image
                      src={darineAuthors[currentIndex].src}
                      alt={darineAuthors[currentIndex].name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="absolute -bottom-4 -right-4 w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center shadow-lg">
                    <span className="text-white font-bold text-lg">
                      {currentIndex + 1}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation Dots */}
          <div className="flex justify-center space-x-3 mt-8">
            {darineAuthors.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentIndex
                    ? "bg-blue-500 scale-125"
                    : "bg-gray-300 hover:bg-gray-400"
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>

          {/* Author Preview Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-12">
            {darineAuthors.map((author, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`text-left p-4 rounded-2xl border-2 transition-all duration-300 ${
                  index === currentIndex
                    ? "border-blue-500 bg-blue-50 shadow-lg"
                    : "border-gray-200 bg-white hover:border-gray-300 hover:shadow-md"
                }`}
              >
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 rounded-full overflow-hidden flex-shrink-0">
                    <Image
                      src={author.src}
                      alt={author.name}
                      width={48}
                      height={48}
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <div className="font-bold text-sm text-gray-900">
                      {author.name}
                    </div>
                    <div className="text-xs text-gray-600">
                      {author.designation.split("・")[0]}
                    </div>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}