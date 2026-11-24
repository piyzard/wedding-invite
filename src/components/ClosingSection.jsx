import React, { useState } from 'react';
import { SmoothReveal, OrnamentDivider } from './SharedUI';

export const CLOSING_DETAILS = {
  signOff: 'With love, the Bhattacharya\nand Palit families',
  logoSrc: '/logo.png',
  logoAlt: 'Wedding Crest Logo',
  coupleSignature: 'Piyali & Satya',
  creditText: 'Made with ♥ by The Portrait Gallery',
};

export default function ClosingSection() {
  const [logoError, setLogoError] = useState(false);

  return (
    <div className="w-full max-w-sm mx-auto pt-4 pb-16 px-5 sm:px-6 text-center">
      <SmoothReveal delay={60}>
        <OrnamentDivider />
      </SmoothReveal>

      <SmoothReveal delay={130}>
        <p className="font-editorial italic text-xl sm:text-2xl text-[#F8EFEA] leading-relaxed whitespace-pre-line mt-6">
          {CLOSING_DETAILS.signOff}
        </p>
      </SmoothReveal>

      <SmoothReveal delay={200}>
        <div className="w-28 h-28 mx-auto my-8 flex items-center justify-center select-none">
          {!logoError ? (
            <img
              src={CLOSING_DETAILS.logoSrc}
              alt={CLOSING_DETAILS.logoAlt}
              onError={() => setLogoError(true)}
              className="w-full h-full object-contain block drop-shadow-[0_6px_18px_rgba(0,0,0,0.45)]"
            />
          ) : (
            <span className="font-script gold-shine-text text-3xl">✦</span>
          )}
        </div>
      </SmoothReveal>

      <SmoothReveal delay={260}>
        <p className="font-script gold-shine-text text-5xl sm:text-6xl leading-tight">
          {CLOSING_DETAILS.coupleSignature}
        </p>
      </SmoothReveal>

      <SmoothReveal delay={320}>
        <p className="site-small-text font-editorial italic mt-10 tracking-wide text-[#E6D2D6]/75">
          {CLOSING_DETAILS.creditText}
        </p>
      </SmoothReveal>
    </div>
  );
}