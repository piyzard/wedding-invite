import React from 'react';

export default function OpeningLampOverlay({
  scriptText = "You're invited",
  subtitleText = 'TO A WEDDING IN UDAIPUR',
  promptText = 'Tap to light the lamp',
  onLightLamp,
}) {
  return (
    <div
      onClick={onLightLamp}
      role={onLightLamp ? 'button' : undefined}
      tabIndex={onLightLamp ? 0 : undefined}
      onKeyDown={
        onLightLamp
          ? (e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                onLightLamp();
              }
            }
          : undefined
      }
      className="pointer-events-auto absolute inset-0 z-10 flex flex-col items-center justify-between px-6 pt-12 pb-10 text-center select-none cursor-pointer"
    >
      {/* Top overlay text */}
      <div className="w-full max-w-md mx-auto">
        <p className="font-script gold-shine-text text-4xl sm:text-5xl leading-tight">
          {scriptText}
        </p>
        <p className="mt-1.5 text-[10px] sm:text-xs uppercase tracking-[0.28em] text-[#F8EFEA]/90 drop-shadow-[0_2px_8px_rgba(0,0,0,0.85)]">
          {subtitleText}
        </p>
      </div>

      {/* Bottom wobbly prompt */}
      <div className="mb-2">
        <span className="animate-lamp-wobble site-small-text font-editorial italic text-[#F8EFEA]/95 tracking-wide drop-shadow-[0_2px_10px_rgba(0,0,0,0.9)]">
          {promptText}
        </span>
      </div>
    </div>
  );
}