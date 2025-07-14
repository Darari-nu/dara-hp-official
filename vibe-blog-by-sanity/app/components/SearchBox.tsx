'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function SearchBox() {
  const [query, setQuery] = useState('')
  const router = useRouter()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (query.trim()) {
      router.push(`/search?q=${encodeURIComponent(query.trim())}`)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="search-form">
      <div className="search-input-wrapper">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="記事を検索..."
          className="search-input"
        />
        <button type="submit" className="search-button">
          🔍
        </button>
      </div>
      <style jsx>{`
        .search-form {
          margin-bottom: 1rem;
        }
        
        .search-input-wrapper {
          position: relative;
          display: flex;
          align-items: center;
        }
        
        .search-input {
          width: 100%;
          padding: 8px 40px 8px 12px;
          border: 1px solid var(--border-light);
          border-radius: 8px;
          font-size: 0.875rem;
          background: var(--background-color);
          color: var(--text-color);
          transition: border-color 0.2s ease;
        }
        
        .search-input:focus {
          outline: none;
          border-color: var(--primary-color);
        }
        
        .search-button {
          position: absolute;
          right: 8px;
          background: none;
          border: none;
          cursor: pointer;
          font-size: 1rem;
          padding: 4px;
          color: var(--text-secondary);
          transition: color 0.2s ease;
        }
        
        .search-button:hover {
          color: var(--primary-color);
        }
      `}</style>
    </form>
  )
}