import React, { useState, useEffect } from 'react';
import { COUNTDOWN_DETAILS, LOCATION_DETAILS } from '../data/weddingData';
import { SmoothReveal, SectionHeading } from './SharedUI';

export default function LocationSection() {
  const [venueImgError, setVenueImgError] = useState(false);
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
        <SectionHeading className="text-4xl sm:text-5xl">
          {COUNTDOWN_DETAILS.heading}
        </SectionHeading>

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
        <SectionHeading delay={80}>{LOCATION_DETAILS.heading}</SectionHeading>

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
          <iframe
            title="Venue Map"
            src={LOCATION_DETAILS.mapEmbedUrl}
            className="w-full h-full border-0"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
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