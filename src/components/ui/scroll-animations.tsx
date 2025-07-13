"use client";

import { useEffect } from 'react';

export function ScrollAnimations() {
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    });

    const elements = document.querySelectorAll('.animate-on-scroll');
    elements.forEach(el => observer.observe(el));

    return () => elements.forEach(el => observer.unobserve(el));
  }, []);

  return (
    <style jsx global>{`
      .animate-on-scroll {
        opacity: 0;
        transform: translateY(30px);
        transition: opacity 0.8s cubic-bezier(0.4, 0, 0.2, 1), 
                    transform 0.8s cubic-bezier(0.4, 0, 0.2, 1);
      }
      
      .animate-on-scroll.is-visible {
        opacity: 1;
        transform: translateY(0);
      }

      .animate-on-scroll-scale {
        opacity: 0;
        transform: translateY(20px) scale(0.95);
        transition: opacity 0.6s ease-out, 
                    transform 0.6s ease-out;
      }
      
      .animate-on-scroll-scale.is-visible {
        opacity: 1;
        transform: translateY(0) scale(1);
      }

      /* ガラスモルフィズム効果 */
      .glass-nav {
        background: rgba(255, 255, 255, 0.85);
        backdrop-filter: blur(20px);
        -webkit-backdrop-filter: blur(20px);
        border: 1px solid rgba(255, 255, 255, 0.2);
        box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
      }

      /* カードホバーエフェクト強化 */
      .enhanced-card {
        transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        border: 1px solid rgba(226, 232, 240, 0.5);
        background: rgba(255, 255, 255, 0.9);
        backdrop-filter: blur(10px);
      }
      
      .enhanced-card:hover {
        transform: translateY(-8px) scale(1.02);
        box-shadow: 0 25px 50px rgba(0, 0, 0, 0.15), 
                    0 0 0 1px rgba(59, 130, 246, 0.1);
        background: rgba(255, 255, 255, 0.95);
      }

      /* セクション間の流れるような分割線 */
      .flowing-divider {
        height: 1px;
        background: linear-gradient(90deg, 
          transparent 0%, 
          rgb(59, 130, 246) 20%, 
          rgb(147, 51, 234) 50%, 
          rgb(59, 130, 246) 80%, 
          transparent 100%);
        animation: flow 3s ease-in-out infinite;
      }

      @keyframes flow {
        0%, 100% { opacity: 0.3; }
        50% { opacity: 0.8; }
      }
    `}</style>
  );
}