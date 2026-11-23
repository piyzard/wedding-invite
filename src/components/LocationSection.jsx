import React, { useState, useEffect } from 'react';
import { COUNTDOWN_DETAILS, LOCATION_DETAILS } from '../data/weddingData';
import { SmoothReveal, OrnamentDivider } from './SharedUI';

export default function LocationSection() {
  const [venueImgError, setVenueImgError] = useState(false);
  const [mapExpanded, setMapExpanded] = useState(false);
  const [timeLeft, setTimeLeft] = useState({
    days: '00',
    hours: '00',
    minutes: '00',
    seconds: '00',
  });

  useEffect(() => {
    const updateCountdown = () => {
      const diff = new Date(COUNTDOWN_DETAILS.targetDate).getTime() - Date.now();
      if (diff <= 0) {
        return setTimeLeft({ days: '00', hours: '00', minutes: '00', seconds: '00' });
      }
      setTimeLeft({
        days: String(Math.floor(diff / (1000 * 60 * 60 * 24))).padStart(2, '0'),
        hours: String(Math.floor((diff / (1000 * 60 * 60)) % 24)).padStart(2, '0'),
        minutes: String(Math.floor((diff / 1000 / 60) % 60)).padStart(2, '0'),
        seconds: String(Math.floor((diff / 1000) % 60)).padStart(2, '0'),
      });
    };

    updateCountdown();
    const timer = setInterval(updateCountdown, 1000);
    return () => clearInterval(timer);
  }, []);

  const units = [
    { value: timeLeft.days, label: 'Days' },
    { value: timeLeft.hours, label: 'Hours' },
    { value: timeLeft.minutes, label: 'Minutes' },
    { value: timeLeft.seconds, label: 'Seconds' },
  ];

  return (
    <div className="w-full mt-20 pb-12">
      <div className="w-full max-w-sm mx-auto px-5 sm:px-6">
        <SmoothReveal delay={60}>
          <h2 className="font-script gold-shine-text text-5xl sm:text-6xl leading-tight">
            {COUNTDOWN_DETAILS.heading}
          </h2>
          <OrnamentDivider className="w-56 sm:w-64" />
        </SmoothReveal>

        <SmoothReveal delay={140}>
          <div className="mt-7 mb-6 flex items-start justify-center gap-2 sm:gap-3">
            {units.map((unit, idx) => (
              <React.Fragment key={unit.label}>
                <div className="flex flex-col items-center min-w-[54px] sm:min-w-[64px]">
                  <span className="font-editorial gold-shine-text text-4xl sm:text-5xl leading-none tracking-wide tabular-nums">
                    {unit.value}
                  </span>
                  <span className="font-editorial text-xs sm:text-sm text-[#E6D2D6]/90 mt-2.5 tracking-wide">
                    {unit.label}
                  </span>
                </div>
                {idx < units.length - 1 && (
                  <span className="font-editorial gold-shine-text text-3xl sm:text-4xl leading-none pt-0.5 select-none">
                    :
                  </span>
                )}
              </React.Fragment>
            ))}
          </div>

          <p className="font-editorial italic text-lg sm:text-xl text-[#F4E3C2]/95">
            {COUNTDOWN_DETAILS.subtitle}
          </p>
        </SmoothReveal>
      </div>

      <div className="w-full max-w-sm mx-auto mt-16 px-5 sm:px-6">
        <SmoothReveal delay={80}>
          <h2 className="font-script gold-shine-text text-6xl sm:text-7xl leading-tight">
            {LOCATION_DETAILS.heading}
          </h2>
          <OrnamentDivider className="w-56 sm:w-64" />
        </SmoothReveal>

        <SmoothReveal delay={160}>
          <div className="mt-6">
            <p className="font-editorial text-sm sm:text-base uppercase tracking-[0.34em] text-[#F8EFEA] mb-2">
              {LOCATION_DETAILS.city}
            </p>
            <p className="font-editorial italic text-xl sm:text-2xl text-[#F8EFEA] leading-snug">
              {LOCATION_DETAILS.venueName}
            </p>
            <p className="font-editorial text-lg sm:text-xl text-[#E6D2D6]/90 mt-1.5 leading-snug">
              {LOCATION_DETAILS.addressLine1}
            </p>
            <p className="font-editorial text-lg sm:text-xl text-[#E6D2D6]/90 leading-snug">
              {LOCATION_DETAILS.addressLine2}
            </p>
          </div>
        </SmoothReveal>
      </div>

      {!venueImgError && (
        <SmoothReveal delay={180} className="w-full max-w-md mx-auto mt-10">
          <div className="relative w-full overflow-hidden">
            <div className="pointer-events-none absolute inset-x-0 top-0 h-14 bg-gradient-to-b from-[#1E080F] to-transparent z-10" />
            <img
              src={LOCATION_DETAILS.venueImage}
              alt={LOCATION_DETAILS.venueName}
              loading="lazy"
              onError={() => setVenueImgError(true)}
              className="w-full h-auto object-cover object-center block"
            />
          </div>
        </SmoothReveal>
      )}

      <SmoothReveal delay={200} className="w-full max-w-[330px] mx-auto mt-8 px-2">
        <div className="relative w-full aspect-square rounded-2xl bg-[#47454D] border border-white/10 shadow-[0_14px_34px_rgba(0,0,0,0.65)] overflow-hidden">
          {!mapExpanded ? (
            <>
              <svg viewBox="0 0 320 320" className="w-full h-full object-cover select-none" aria-hidden="true">
                <rect width="320" height="320" fill="#47454D" />
                <path d="M -10 55 Q 75 45 125 115 T 230 220 T 335 255" fill="none" stroke="#5B575E" strokeWidth="3.5" />
                <path d="M 40 -10 Q 95 95 65 185 T 145 335" fill="none" stroke="#555159" strokeWidth="2.5" />
                <path d="M 165 -10 Q 150 85 215 145 T 275 335" fill="none" stroke="#5B575E" strokeWidth="3" />
                <path d="M -10 215 Q 115 190 195 245 T 335 170" fill="none" stroke="#534F57" strokeWidth="2.2" />
              </svg>

              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <div className="w-9 h-9 rounded-full rounded-bl-none -rotate-45 bg-gradient-to-br from-[#F3D78C] to-[#C8A14E] shadow-[0_6px_16px_rgba(0,0,0,0.5)] flex items-center justify-center mb-3">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#47454D] rotate-45" />
                </div>

                <button
                  onClick={() => setMapExpanded(true)}
                  className="px-6 py-2.5 rounded-full bg-[#19171B] text-[#F8EFEA] font-editorial italic text-lg tracking-wide shadow-[0_8px_22px_rgba(0,0,0,0.55)] border border-white/10 hover:bg-[#232026] transition cursor-pointer"
                >
                  Show the map
                </button>
              </div>
            </>
          ) : (
            <div className="relative w-full h-full">
              <iframe
                title="Venue Map"
                src={LOCATION_DETAILS.mapEmbedUrl}
                className="w-full h-full border-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
              <button
                onClick={() => setMapExpanded(false)}
                className="absolute top-2.5 right-2.5 px-3 py-1 rounded-full bg-[#19171B]/90 text-[#F8EFEA] text-xs tracking-wide border border-white/15 shadow cursor-pointer"
              >
                Hide
              </button>
            </div>
          )}
        </div>

        <a
          href={LOCATION_DETAILS.mapUrl}
          target="_blank"
          rel="noreferrer"
          style={{
            background: 'linear-gradient(180deg, #9F814A 0%, #6D562E 52%, #4B3A1E 100%)',
          }}
          className="mt-5 w-full h-12 rounded-full border border-[#D4B46A]/45 shadow-[0_10px_24px_rgba(0,0,0,0.55)] flex items-center justify-center text-[11px] sm:text-xs font-medium uppercase tracking-[0.22em] text-[#F8EFEA] hover:brightness-110 transition"
        >
          OPEN IN GOOGLE MAPS
        </a>
      </SmoothReveal>
    </div>
  );
}