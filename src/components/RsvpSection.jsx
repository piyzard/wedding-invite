import React, { useState } from 'react';
import { Minus, Plus } from 'lucide-react';
import { SmoothReveal, SectionHeading } from './SharedUI';

export const RSVP_DETAILS = {
  heading: 'Will you join us?',
  subtitle: 'Please let us know how many of you are coming to each function, by 20 January.',
  nameLabel: 'YOUR NAME',
  namePlaceholder: 'e.g. Shreya Sharma',
  whatsappNumber: '918910322203',
  buttonText: 'SEND ON WHATSAPP',
  disclaimer: 'This opens WhatsApp with your reply written out. Nothing is sent until you press send.',
  functions: [
    { id: 'mehendi', title: 'Mehendi', date: 'Fri, 12 Feb', defaultCount: 1 },
    { id: 'sangeet', title: 'Sangeet', date: 'Sat, 13 Feb', defaultCount: 1 },
    { id: 'wedding', title: 'Wedding', date: 'Sun, 14 Feb', defaultCount: 1 },
  ],
};

export default function RsvpSection() {
  const [guestName, setGuestName] = useState('');
  const [counts, setCounts] = useState(() =>
    RSVP_DETAILS.functions.reduce((acc, fn) => ({ ...acc, [fn.id]: fn.defaultCount }), {})
  );

  const updateCount = (id, delta) => {
    setCounts((prev) => ({
      ...prev,
      [id]: Math.max(0, Math.min(20, (prev[id] ?? 0) + delta)),
    }));
  };

  const handleSendWhatsApp = () => {
    const name = guestName.trim() || 'A guest';
    const breakdown = RSVP_DETAILS.functions
      .map((fn) => `• ${fn.title} (${fn.date}): ${counts[fn.id]}`)
      .join('\n');

    const message = `Hi! RSVP from *${name}*:\n\n${breakdown}`;
    const url = `https://wa.me/${RSVP_DETAILS.whatsappNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="w-full max-w-sm mx-auto pt-4 pb-24 px-5 sm:px-6">
      <SectionHeading>{RSVP_DETAILS.heading}</SectionHeading>

      <SmoothReveal delay={130}>
        <p className="font-editorial text-lg sm:text-xl text-[#F8EFEA] leading-relaxed mt-5">
          {RSVP_DETAILS.subtitle}
        </p>
      </SmoothReveal>

      <SmoothReveal delay={180} className="mt-8 text-left">
        <label
          htmlFor="rsvp-guest-name"
          className="block text-[10px] sm:text-[11px] uppercase tracking-[0.26em] text-[#E6D2D6]/85 mb-2.5"
        >
          {RSVP_DETAILS.nameLabel}
        </label>
        <input
          id="rsvp-guest-name"
          type="text"
          value={guestName}
          onChange={(e) => setGuestName(e.target.value)}
          placeholder={RSVP_DETAILS.namePlaceholder}
          className="w-full h-12 px-4 rounded-xl bg-[#47454D]/90 border border-white/15 text-[#F8EFEA] placeholder:text-[#A4A1AA] font-editorial italic text-lg focus:outline-none focus:border-[#E6C673]/70 transition"
        />
      </SmoothReveal>

      <div className="mt-4 text-left">
        {RSVP_DETAILS.functions.map((fn, idx) => {
          const isLast = idx === RSVP_DETAILS.functions.length - 1;
          const count = counts[fn.id] ?? 0;

          return (
            <SmoothReveal
              key={fn.id}
              delay={220 + idx * 70}
              className={`py-4 flex items-center justify-between gap-4 ${
                !isLast ? 'border-b border-[#E6C673]/20' : ''
              }`}
            >
              <div>
                <h3 className="font-editorial font-semibold text-xl text-[#F8EFEA] leading-tight">
                  {fn.title}
                </h3>
                <p className="font-editorial text-sm sm:text-base text-[#E6D2D6]/85 mt-0.5">
                  {fn.date}
                </p>
              </div>

              <div className="flex items-center gap-3.5 shrink-0">
                <button
                  type="button"
                  onClick={() => updateCount(fn.id, -1)}
                  aria-label={`Decrease ${fn.title} guests`}
                  className="w-8 h-8 rounded-full bg-[#47454D]/90 border border-white/15 text-[#F8EFEA] flex items-center justify-center hover:border-[#E6C673]/60 active:scale-95 transition cursor-pointer"
                >
                  <Minus className="w-3.5 h-3.5" />
                </button>

                <span className="font-editorial text-xl text-[#F8EFEA] w-5 text-center tabular-nums">
                  {count}
                </span>

                <button
                  type="button"
                  onClick={() => updateCount(fn.id, 1)}
                  aria-label={`Increase ${fn.title} guests`}
                  className="w-8 h-8 rounded-full bg-[#47454D]/90 border border-white/15 text-[#F8EFEA] flex items-center justify-center hover:border-[#E6C673]/60 active:scale-95 transition cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>
            </SmoothReveal>
          );
        })}
      </div>

      <SmoothReveal delay={400} className="mt-7">
        <button
          type="button"
          onClick={handleSendWhatsApp}
          style={{
            background: 'linear-gradient(180deg, #9F814A 0%, #6D562E 52%, #4B3A1E 100%)',
          }}
          className="w-full max-w-[270px] mx-auto h-12 rounded-full border border-[#D4B46A]/45 shadow-[0_10px_24px_rgba(0,0,0,0.55)] flex items-center justify-center gap-2.5 text-[11px] sm:text-xs font-medium uppercase tracking-[0.22em] text-[#F8EFEA] hover:brightness-110 active:scale-[0.99] transition cursor-pointer"
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.9"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-4 h-4 shrink-0"
            aria-hidden="true"
          >
            <path d="M3 21l1.65-3.8a9 9 0 1 1 3.4 2.9L3 21" />
            <path d="M9 10a.5.5 0 0 0 1 0V9a.5.5 0 0 0-1 0v1a5 5 0 0 0 5 5h1a.5.5 0 0 0 0-1h-1a.5.5 0 0 0 0 1" />
          </svg>
          <span>{RSVP_DETAILS.buttonText}</span>
        </button>

        <p className="font-editorial italic text-sm sm:text-base text-[#E6D2D6]/85 leading-relaxed mt-4 px-2">
          {RSVP_DETAILS.disclaimer}
        </p>
      </SmoothReveal>
    </div>
  );
}