import React, { useRef, useState } from 'react';
import { STORY_DETAILS, GALLERY_PHOTOS } from '../data/weddingData';
import { SmoothReveal, OrnamentDivider } from './SharedUI';

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
    <div className="w-full mt-4 select-none">
      <div
        ref={trackRef}
        onScroll={handleScroll}
        className="flex gap-4 overflow-x-auto snap-x snap-mandatory scroll-smooth pb-3 px-4 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {photos.map((item, index) => {
          const clipId = `arch-photo-clip-${index}`;
          const hasError = Boolean(imgErrors[index]);

          return (
            <div
              key={`${item.caption}-${index}`}
              className="snap-start shrink-0 w-[68vw] max-w-[265px] flex flex-col items-center"
            >
              <div className="relative w-full aspect-[4/4.65] p-[5px] bg-[#2D0E17]/90 border border-[#C79A6B]/55 shadow-[0_14px_34px_rgba(0,0,0,0.65)]">
                <div className="relative w-full h-full border border-[#E6C673]/55 overflow-hidden bg-[#1D080E]">
                  <svg className="w-0 h-0 absolute" aria-hidden="true">
                    <defs>
                      <clipPath id={clipId} clipPathUnits="objectBoundingBox">
                        <path d="M 0,1 L 0,0.34 Q 0,0.20 0.16,0.15 Q 0.28,0.11 0.35,0.06 Q 0.42,0.01 0.5,0.01 Q 0.58,0.01 0.65,0.06 Q 0.72,0.11 0.84,0.15 Q 1,0.20 1,0.34 L 1,1 Z" />
                      </clipPath>
                    </defs>
                  </svg>

                  <div style={{ clipPath: `url(#${clipId})` }} className="w-full h-full bg-[#36111C]">
                    {!hasError ? (
                      <img
                        src={item.src}
                        alt={item.caption}
                        loading="lazy"
                        onError={() => setImgErrors((p) => ({ ...p, [index]: true }))}
                        className="w-full h-full object-cover object-center"
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

              <p className="font-editorial text-lg sm:text-[19px] text-[#F8EFEA] mt-3.5 text-center leading-snug line-clamp-1">
                {item.caption}
              </p>
            </div>
          );
        })}
      </div>

      <div className="mt-5 flex flex-col items-center gap-2.5">
        <p className="font-editorial italic text-base sm:text-lg text-[#E6D2D6]/90 tracking-wide">
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
        <SmoothReveal delay={60}>
          <h2 className="font-script gold-shine-text text-6xl sm:text-7xl leading-tight">
            {STORY_DETAILS.heading}
          </h2>
          <OrnamentDivider className="w-56 sm:w-64" />
        </SmoothReveal>

        <SmoothReveal delay={140}>
          <p className="font-editorial text-xl sm:text-[22px] text-[#F8EFEA] leading-relaxed mt-5 mb-12 px-2">
            {STORY_DETAILS.paragraph}
          </p>
        </SmoothReveal>

        <div className="relative text-left pl-3 sm:pl-4 mb-20">
          {STORY_DETAILS.milestones.map((item, idx) => (
            <SmoothReveal
              key={item.date}
              delay={idx * 100}
              className={`relative pl-8 ${
                idx === STORY_DETAILS.milestones.length - 1 ? 'pb-2' : 'pb-9'
              }`}
            >
              <span
                aria-hidden="true"
                className="absolute left-[7px] top-[18px] bottom-0 w-[1px] bg-gradient-to-b from-[#E6C673]/75 to-[#E6C673]/25"
              />
              <span
                aria-hidden="true"
                className="absolute left-[1px] top-[6px] w-[13px] h-[13px] rotate-45 border border-[#E6C673] bg-[#1E080F] shadow-[0_0_8px_rgba(230,198,115,0.3)]"
              />
              <h3 className="font-script gold-shine-text text-3xl sm:text-4xl leading-none mb-1.5">
                {item.date}
              </h3>
              <p className="font-editorial text-lg sm:text-xl text-[#F8EFEA]/95 leading-snug">
                {item.description}
              </p>
            </SmoothReveal>
          ))}
        </div>

        <SmoothReveal delay={100}>
          <h2 className="font-script gold-shine-text text-6xl sm:text-7xl leading-tight">
            {STORY_DETAILS.nextHeading}
          </h2>
          <OrnamentDivider className="w-56 sm:w-64" />
        </SmoothReveal>
      </div>

      <SmoothReveal delay={160} className="w-full max-w-md mx-auto">
        <SlidableArchGallery photos={GALLERY_PHOTOS} />
      </SmoothReveal>
    </>
  );
}