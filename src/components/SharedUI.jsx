import React, { useRef, useState, useEffect } from 'react';
import { EVENT_DETAILS } from '../data/weddingData';

export function SmoothReveal({ children, delay = 0, className = '' }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.12, rootMargin: '0px 0px -20px 0px' }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delay}ms`, willChange: 'transform, opacity' }}
      className={`transition-[opacity,transform] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${
        visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
      } ${className}`}
    >
      {children}
    </div>
  );
}

export function OrnamentDivider({ className = 'w-56 sm:w-64' }) {
  const [imgMissing, setImgMissing] = useState(false);

  if (imgMissing) {
    return (
      <div className="my-4 flex items-center justify-center gap-3 text-[#E6C673]/80 select-none">
        <span className="h-[1px] w-14 bg-gradient-to-r from-transparent to-[#E6C673]/70" />
        <span className="text-xs">✦</span>
        <span className="h-[1px] w-14 bg-gradient-to-l from-transparent to-[#E6C673]/70" />
      </div>
    );
  }

  return (
    <div className="my-4 flex items-center justify-center select-none">
      <img
        src={EVENT_DETAILS.dividerImage}
        alt=""
        onError={() => setImgMissing(true)}
        className={`${className} h-auto object-contain mx-auto drop-shadow-[0_2px_10px_rgba(0,0,0,0.45)]`}
      />
    </div>
  );
}