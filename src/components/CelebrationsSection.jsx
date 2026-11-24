import React, { useState } from 'react';
import { CELEBRATIONS_DATA } from '../data/weddingData';
import { SmoothReveal, SectionHeading } from './SharedUI';

function CelebrationArchFrame({ src, alt, variant }) {
  const [imgError, setImgError] = useState(false);

  return (
    <div className="relative w-full aspect-[4/4.5] rounded-sm p-[5px] bg-gradient-to-b from-[#C7A15A]/75 via-[#6E5329]/65 to-[#3A2814]/80 shadow-[0_12px_28px_rgba(0,0,0,0.6)]">
      <div className="relative w-full h-full border border-[#F2D99B]/55 overflow-hidden bg-[#1D080E]">
        {!imgError ? (
          <img
            src={src}
            alt={alt}
            onError={() => setImgError(true)}
            className="w-full h-full object-cover object-center block"
          />
        ) : (
          <div className="w-full h-full relative bg-gradient-to-b from-[#2B1519] via-[#1C0B10] to-[#120609] flex items-end justify-center p-2">
            <div className="w-full h-[90%] rounded-t-[72px] border border-[#E6C673]/60 bg-gradient-to-b from-[#3E2422] via-[#261216] to-[#16080C] relative overflow-hidden flex flex-col items-center justify-end pb-3">
              <div className="absolute top-6 w-16 h-16 rounded-full bg-[#E6C673]/15 blur-md" />
              <div className="w-[82%] h-[78%] rounded-t-[60px] border border-[#E6C673]/30 flex flex-col items-center justify-end pb-2">
                {variant === 'mehendi' && (
                  <div className="w-12 h-3 rounded-full bg-[#4E7A56] border border-[#E6C673]/50 shadow" />
                )}
                {(variant === 'grooms-haldi' ||
                  variant === 'totto-ceremony' ||
                  variant === 'brides-haldi' ||
                  variant === 'sangeet') && (
                  <div className="flex items-end gap-1.5">
                    <span className="w-3 h-3 rounded-full bg-[#D9B35C]/70 border border-[#FFF1BD]/60" />
                    <span className="w-3.5 h-3.5 rounded-full bg-[#FFF1BD]/80" />
                  </div>
                )}
                {variant === 'wedding' && (
                  <div className="w-14 h-9 border-t-2 border-x border-[#E6C673]/70 rounded-t-md flex items-end justify-around px-1 pb-1">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#C84B52]" />
                    <span className="w-2.5 h-2.5 rounded-full bg-[#C84B52]" />
                  </div>
                )}
              </div>
              <span className="mt-1.5 text-[10px] text-[#E6D2D6]/75 px-2 text-center break-all">
                Missing: public{src}
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default function CelebrationsSection({ onOpenCalendar }) {
  return (
    <div className="w-full px-5 sm:px-6">
      <div className="w-full max-w-md mx-auto mt-20">
        <SectionHeading>{CELEBRATIONS_DATA.heading}</SectionHeading>

        <div className="relative mt-10">
          <div
            aria-hidden="true"
            className="absolute left-1/2 top-4 bottom-8 w-[1px] -translate-x-1/2 bg-gradient-to-b from-[#E6C673]/75 via-[#E6C673]/55 to-[#E6C673]/25"
          />

          <div className="space-y-12">
            {CELEBRATIONS_DATA.events.map((ev, idx) => {
              const isLeftArch = ev.archSide === 'left';
              const textBlock = (
                <div className={isLeftArch ? 'text-left pl-2 sm:pl-3' : 'text-right pr-2 sm:pr-3'}>
                  <p className="text-[10px] sm:text-[11px] uppercase tracking-[0.22em] text-[#E6D2D6]/90 mb-1">
                    {ev.dateTop}
                  </p>
                  <p className="font-script gold-shine-text text-3xl sm:text-4xl leading-none mb-1.5">
                    {ev.time}
                  </p>
                  <h3 className="font-editorial font-semibold text-xl sm:text-2xl text-[#F8EFEA] leading-tight">
                    {ev.title}
                  </h3>
                  <p className="font-editorial text-base sm:text-lg text-[#F4E3C2]/90 mt-0.5 leading-snug">
                    {ev.hindiTitle}
                  </p>
                  <p className="font-editorial italic text-sm sm:text-base text-[#E6D2D6]/85 mt-1.5 leading-snug">
                    {ev.venue}
                  </p>
                  <button
                    onClick={() =>
                      onOpenCalendar({
                        title: ev.calendarTitle,
                        start: ev.start,
                        end: ev.end,
                        location: ev.venue,
                        details: `${ev.title} (${ev.hindiTitle}) — ${ev.venue}`,
                      })
                    }
                    className="mt-2.5 inline-block font-editorial italic text-base sm:text-lg gold-shine-text underline decoration-[#E6C673]/60 underline-offset-4 hover:opacity-90 transition cursor-pointer"
                  >
                    Add to calendar
                  </button>
                </div>
              );

              return (
                <SmoothReveal
                  key={ev.id}
                  delay={idx * 100}
                  className="relative grid grid-cols-[1fr_24px_1fr] items-center gap-2 sm:gap-3"
                >
                  {isLeftArch ? (
                    <div className="pr-1">
                      <CelebrationArchFrame src={ev.image} alt={ev.title} variant={ev.id} />
                    </div>
                  ) : (
                    textBlock
                  )}

                  <div className="relative z-10 flex items-center justify-center">
                    <span
                      aria-hidden="true"
                      className="w-2.5 h-2.5 rotate-45 border border-[#E6C673] bg-[#1E080F] shadow-[0_0_8px_rgba(230,198,115,0.35)]"
                    />
                  </div>

                  {isLeftArch ? (
                    textBlock
                  ) : (
                    <div className="pl-1">
                      <CelebrationArchFrame src={ev.image} alt={ev.title} variant={ev.id} />
                    </div>
                  )}
                </SmoothReveal>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}