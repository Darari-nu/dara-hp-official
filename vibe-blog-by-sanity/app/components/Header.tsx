'use client'

import Link from 'next/link'
import { useState } from 'react'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  return (
    <header className="header">
      <div className="container">
        <div className="nav-wrapper">
          {/* Mobile Menu Button */}
          <button 
            className={`nav-toggle ${isMenuOpen ? 'active' : ''}`}
            onClick={toggleMenu}
            aria-label="メニューを開く"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>

          <Link href="/" className="logo">
            Vibe Blog
          </Link>
          
          <nav className={`nav ${isMenuOpen ? 'active' : ''}`}>
            <ul>
              <li className="nav-title">Menu</li>
              <li>
                <Link href="/" onClick={() => setIsMenuOpen(false)}>ホーム</Link>
              </li>
              <li>
                <Link href="/posts" onClick={() => setIsMenuOpen(false)}>記事一覧</Link>
              </li>
              <li>
                <Link href="/categories" onClick={() => setIsMenuOpen(false)}>カテゴリー</Link>
              </li>
              <li>
                <Link href="/search" onClick={() => setIsMenuOpen(false)}>検索</Link>
              </li>
              <li>
                <Link href="/about" onClick={() => setIsMenuOpen(false)}>About</Link>
              </li>
            </ul>
          </nav>

          {/* Desktop用のスペーサー */}
          <div className="nav-spacer"></div>

          {/* Mobile Overlay */}
          <div 
            className={`nav-overlay ${isMenuOpen ? 'active' : ''}`}
            onClick={() => setIsMenuOpen(false)}
          />
        </div>
      </div>

    </header>
  )
}