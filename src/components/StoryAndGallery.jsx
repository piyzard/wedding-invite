import React, { useRef, useState } from 'react';
import { STORY_DETAILS, GALLERY_PHOTOS } from '../data/weddingData';
import { SmoothReveal, SectionHeading } from './SharedUI';

function SlidableArchGallery({ photos }) {
  const trackRef = useRef(null);
  const [imgErrors, setImgErrors] = useState({});
  const [activeIndex, setActiveIndex] = useState(0);

  const handleScroll = () => {
    const el = trackRef.current;
    if (!el) return;
    const cardWidth = el.firstElementChild?.getBoundingClientRect().width || 240;
    const idx = Math.round(el.scrollLeft / (cardWidth + 16));
    setActiveIndex(Math.max(0, Math.min(photos.length - 1, idx)));
  };

  return (
    <div className="w-full mt-7 select-none">
      <div
        ref={trackRef}
        onScroll={handleScroll}
        className="flex gap-4 overflow-x-auto snap-x snap-mandatory scroll-smooth pb-3 pl-7 pr-6 scroll-pl-7 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {photos.map((item, index) => {
          const clipId = `arch-photo-clip-${index}`;
          const hasError = Boolean(imgErrors[index]);

          return (
            <div
              key={`${item.caption || item.src}-${index}`}
              className="snap-start shrink-0 w-[68vw] max-w-[265px] flex flex-col items-center"
            >
              <div className="relative w-full aspect-[4/5] p-[5px] bg-[#2D0E17]/90 border border-[#C79A6B]/55 shadow-[0_8px_20px_rgba(0,0,0,0.32)]">
                <div className="relative w-full h-full border border-[#E6C673]/55 overflow-hidden bg-[#1D080E]">
                  <svg className="w-0 h-0 absolute" aria-hidden="true">
                    <defs>
                      <clipPath id={clipId} clipPathUnits="objectBoundingBox">
                        <path d="M 0,1 L 0,0.34 Q 0,0.20 0.16,0.15 Q 0.28,0.11 0.35,0.06 Q 0.42,0.01 0.5,0.01 Q 0.58,0.01 0.65,0.06 Q 0.72,0.11 0.84,0.15 Q 1,0.20 1,0.34 L 1,1 Z" />
                      </clipPath>
                    </defs>
                  </svg>

                  <div
                    style={{ clipPath: `url(#${clipId})` }}
                    className="w-full h-full aspect-[4/5] bg-[#36111C] overflow-hidden"
                  >
                    {!hasError ? (
                      <img
                        src={item.src}
                        alt={item.caption || `Memory ${index + 1}`}
                        onError={() => setImgErrors((p) => ({ ...p, [index]: true }))}
                        className="w-full h-full aspect-[4/5] object-cover object-center block"
                      />
                    ) : (
                      <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-b from-[#451523] to-[#230911] px-4 text-center">
                        <span className="font-script gold-shine-text text-3xl">✦</span>
                        <span className="font-editorial italic text-xs text-[#E8D2C5]/80 mt-1">
                          Add {item.src}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-5 flex flex-col items-center gap-2.5">
        <p className="site-small-text font-editorial italic text-[#E6D2D6]/90 tracking-wide">
          Swipe to see more
        </p>

        <div className="flex items-center gap-1.5">
          {photos.map((_, idx) => (
            <span
              key={idx}
              className={`h-1 rounded-full transition-all duration-300 ${
                idx === activeIndex ? 'w-4 bg-[#E6C673]' : 'w-1.5 bg-[#E6C673]/30'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default function StoryAndGallery() {
  return (
    <>
      <div className="w-full max-w-sm mx-auto mt-20 px-5 sm:px-6">
        <SectionHeading>{STORY_DETAILS.heading}</SectionHeading>

        <SmoothReveal delay={140}>
          <p className="font-editorial text-base sm:text-lg text-[#F8EFEA] leading-relaxed text-justify [text-align-last:center] whitespace-pre-line mt-5 mb-14 px-1">
            {STORY_DETAILS.paragraph}
          </p>
        </SmoothReveal>

        <SectionHeading delay={100}>{STORY_DETAILS.nextHeading}</SectionHeading>
      </div>

      <SmoothReveal delay={160} className="w-full max-w-md mx-auto">
        <SlidableArchGallery photos={GALLERY_PHOTOS} />
      </SmoothReveal>
    </>
  );
}