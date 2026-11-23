import React from 'react';
import { SmoothReveal, OrnamentDivider } from './SharedUI';

export const CLOSING_DETAILS = {
  signOff: 'With love, the Sharma\nand Mehra families',
  monogramTop: 'TANYA & VIKRAM',
  monogramCenter: 'TV',
  monogramBottom: 'तान्वी • विक्रम',
  coupleSignature: 'Tanya & Vikram',
};

export default function ClosingSection() {
  return (
    <div className="w-full max-w-sm mx-auto pt-4 pb-24 px-5 sm:px-6 text-center">
      <SmoothReveal delay={60}>
        <OrnamentDivider className="w-56 sm:w-64" />
      </SmoothReveal>

      <SmoothReveal delay={130}>
        <p className="font-editorial italic text-xl sm:text-2xl text-[#F8EFEA] leading-relaxed whitespace-pre-line mt-6">
          {CLOSING_DETAILS.signOff}
        </p>
      </SmoothReveal>

      <SmoothReveal delay={200}>
        <div className="relative w-28 h-28 mx-auto my-10 flex items-center justify-center select-none">
          <svg viewBox="0 0 120 120" className="w-full h-full overflow-visible">
            <defs>
              <path id="closingTopArc" d="M 18,60 A 42,42 0 1,1 102,60" fill="none" />
              <linearGradient id="closingSealGold" x1="0" y1="0" x2="120" y2="120">
                <stop offset="0%" stopColor="#E6C673" />
                <stop offset="50%" stopColor="#FFF1BD" />
                <stop offset="100%" stopColor="#B88E3B" />
              </linearGradient>
            </defs>

            <circle
              cx="60"
              cy="60"
              r="52"
              fill="#1E080F"
              fillOpacity="0.92"
              stroke="url(#closingSealGold)"
              strokeWidth="1.2"
            />
            <circle
              cx="60"
              cy="60"
              r="34"
              fill="none"
              stroke="url(#closingSealGold)"
              strokeWidth="0.9"
              strokeOpacity="0.65"
            />

            <text fill="#E6C673" fontSize="8.2" letterSpacing="2.2" fontWeight="500">
              <textPath href="#closingTopArc" startOffset="50%" textAnchor="middle">
                {CLOSING_DETAILS.monogramTop}
              </textPath>
            </text>

            <text
              x="60"
              y="67"
              textAnchor="middle"
              className="font-editorial"
              fill="#FFF3C4"
              fontSize="26"
              letterSpacing="1"
            >
              {CLOSING_DETAILS.monogramCenter}
            </text>

            <text
              x="60"
              y="102"
              textAnchor="middle"
              fill="#E8D2C5"
              fontSize="7.2"
              letterSpacing="1.2"
            >
              {CLOSING_DETAILS.monogramBottom}
            </text>
          </svg>
        </div>
      </SmoothReveal>

      <SmoothReveal delay={260}>
        <p className="font-script gold-shine-text text-5xl sm:text-6xl leading-tight">
          {CLOSING_DETAILS.coupleSignature}
        </p>
      </SmoothReveal>
    </div>
  );
}
