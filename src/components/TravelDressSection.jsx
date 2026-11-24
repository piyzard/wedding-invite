import React from 'react';
import { TRAVEL_AND_DRESS_DETAILS } from '../data/weddingData';
import { SmoothReveal, SectionHeading } from './SharedUI';

export default function TravelDressSection() {
  return (
    <div className="w-full pt-8 pb-24">
      <div className="w-full max-w-sm mx-auto px-5 sm:px-6">
        <SectionHeading>{TRAVEL_AND_DRESS_DETAILS.gettingThereHeading}</SectionHeading>

        <SmoothReveal delay={140}>
          <p className="font-editorial text-lg sm:text-xl text-[#F8EFEA] leading-relaxed mt-5">
            {TRAVEL_AND_DRESS_DETAILS.airportText}
          </p>
          <p className="font-editorial text-lg sm:text-xl text-[#F8EFEA] leading-relaxed mt-5">
            {TRAVEL_AND_DRESS_DETAILS.stationText}
          </p>

          <p className="text-[10px] sm:text-xs uppercase tracking-[0.26em] text-[#E6D2D6]/85 mt-9 mb-2">
            {TRAVEL_AND_DRESS_DETAILS.stayLabel}
          </p>
          <p className="font-editorial font-semibold text-lg sm:text-xl text-[#F8EFEA] leading-snug">
            {TRAVEL_AND_DRESS_DETAILS.stayVenue}
          </p>
          <p className="font-editorial text-lg sm:text-xl text-[#E6D2D6]/90 mt-1 leading-relaxed">
            {TRAVEL_AND_DRESS_DETAILS.stayDates}
          </p>
        </SmoothReveal>
      </div>

      <div className="w-full max-w-sm mx-auto mt-16 px-5 sm:px-6">
        <SectionHeading delay={80}>{TRAVEL_AND_DRESS_DETAILS.dressCodeHeading}</SectionHeading>

        <SmoothReveal delay={160}>
          <p className="font-editorial text-xl sm:text-2xl text-[#F8EFEA] leading-snug mt-5">
            {TRAVEL_AND_DRESS_DETAILS.dressCodeHint}
          </p>
        </SmoothReveal>
      </div>

      <SmoothReveal delay={200} className="w-full max-w-md mx-auto mt-10 px-3">
        <img
          src={TRAVEL_AND_DRESS_DETAILS.dressCodeImage}
          alt="Wedding function dress code"
          loading="lazy"
          className="w-full h-auto object-contain mx-auto block"
        />
      </SmoothReveal>

      <div className="w-full max-w-sm mx-auto mt-10 px-5 sm:px-6 text-left">
        {TRAVEL_AND_DRESS_DETAILS.dressCodePalettes.map((item, idx) => {
          const isLast = idx === TRAVEL_AND_DRESS_DETAILS.dressCodePalettes.length - 1;

          return (
            <SmoothReveal
              key={item.title}
              delay={idx * 90}
              className={`py-5 flex items-center justify-between gap-4 ${
                !isLast ? 'border-b border-[#E6C673]/25' : ''
              }`}
            >
              <div>
                <h3 className="font-editorial text-xl sm:text-2xl text-[#F8EFEA] leading-snug">
                  <span className="font-semibold">{item.title}</span>{' '}
                  <span className="text-base sm:text-lg text-[#F4E3C2]/90 font-normal">
                    {item.hindiTitle}
                  </span>
                </h3>
                <p className="font-editorial text-base sm:text-lg text-[#E6D2D6]/90 mt-1 leading-snug">
                  {item.description}
                </p>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                {item.colors.map((hex) => (
                  <span
                    key={hex}
                    style={{ backgroundColor: hex }}
                    aria-label={hex}
                    className="w-6 h-6 sm:w-7 sm:h-7 rounded-full border-2 border-[#F8EFEA] shadow-[0_3px_10px_rgba(0,0,0,0.5)]"
                  />
                ))}
              </div>
            </SmoothReveal>
          );
        })}
      </div>
    </div>
  );
}