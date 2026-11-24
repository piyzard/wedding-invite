import React, { useRef, useState, useEffect } from 'react';
import { EVENT_DETAILS } from '../data/weddingData';

export function SmoothReveal({
  children,
  delay = 0,
  direction = 'left',
  className = '',
}) {
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
      { threshold: 0.14, rootMargin: '0px 0px -24px 0px' }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const hiddenState =
    direction === 'left'
      ? 'opacity-0 -translate-x-5 blur-[8px]'
      : 'opacity-0 translate-y-4 blur-[6px]';

  return (
    <div
      ref={ref}
      style={{
        transitionDelay: `${delay}ms`,
        willChange: 'transform, opacity, filter',
      }}
      className={`transition-[opacity,transform,filter] duration-[1200ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${
        visible ? 'opacity-100 translate-x-0 translate-y-0 blur-0' : hiddenState
      } ${className}`}
    >
      {children}
    </div>
  );
}

export function OrnamentDivider({ className = 'w-40 sm:w-48' }) {
  const [imgMissing, setImgMissing] = useState(false);

  if (imgMissing) {
    return (
      <div className="my-3 flex items-center justify-center gap-3 text-[#E6C673]/80 select-none">
        <span className="h-[1px] w-12 bg-gradient-to-r from-transparent to-[#E6C673]/75" />
        <span className="text-xs">✦</span>
        <span className="h-[1px] w-12 bg-gradient-to-l from-transparent to-[#E6C673]/75" />
      </div>
    );
  }

  return (
    <div className="my-3 flex items-center justify-center select-none">
      <img
        src={EVENT_DETAILS.dividerImage}
        alt=""
        onError={() => setImgMissing(true)}
        style={{
          filter:
            'sepia(0.9) saturate(1.25) hue-rotate(-4deg) brightness(0.82) contrast(1.06) drop-shadow(0 2px 6px rgba(0, 0, 0, 0.45))',
        }}
        className={`${className} h-auto object-contain mx-auto opacity-90`}
      />
    </div>
  );
}

export function SectionHeading({
  children,
  delay = 80,
  dividerClass = 'w-40 sm:w-48',
  className = '',
}) {
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
      { threshold: 0.14, rootMargin: '0px 0px -24px 0px' }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} style={{ transitionDelay: `${delay}ms` }}>
      <h2
        style={{
          animationDelay: `${delay}ms`,
          willChange: 'transform, opacity, filter, clip-path',
        }}
        className={`font-script gold-shine-text text-5xl sm:text-6xl leading-tight opacity-0 ${
          visible ? 'animate-focus-sweep' : ''
        } ${className}`}
      >
        {children}
      </h2>
      <OrnamentDivider className={dividerClass} />
    </div>
  );
}