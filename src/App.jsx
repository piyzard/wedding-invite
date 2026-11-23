import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Volume2, VolumeX, ChevronDown, CalendarPlus, Check } from 'lucide-react';

// --- Edit Date & Calendar Event Details Here ---
const EVENT_DETAILS = {
  day: '14',
  month: 'February',
  year: '2027',
  subline1: 'Sunday, at 7:00 pm',
  subline2: 'By the lake, with dinner after the pheras',
  calendarTitle: 'Wedding Celebration',
  calendarLocation: 'By the lake',
  calendarDescription: 'By the lake, with dinner after the pheras',
  startDateTime: '20270214T190000',
  endDateTime: '20270214T233000',
};

/**
 * Reusable Blur-to-Normal wrapper triggered when scrolled into view
 */
function BlurReveal({ children, delay = 0, className = '' }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.18 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      style={{
        transitionDelay: `${delay}ms`,
      }}
      className={`transition-all duration-1000 ease-[cubic-bezier(0.22,1,0.36,1)] ${
        visible
          ? 'opacity-100 blur-0 translate-y-0 scale-100'
          : 'opacity-0 blur-md translate-y-5 scale-[0.97]'
      } ${className}`}
    >
      {children}
    </div>
  );
}

/**
 * Ornamental Gold & Pearl Floral Medallion Divider Below "The Date"
 */
function DateOrnamentDivider() {
  return (
    <div className="my-4 flex items-center justify-center select-none" aria-hidden="true">
      <svg
        viewBox="0 0 320 44"
        className="w-64 sm:w-72 h-auto overflow-visible drop-shadow-[0_2px_8px_rgba(212,175,55,0.22)]"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="ornamentGold" x1="20" y1="22" x2="300" y2="22" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#B88E3B" stopOpacity="0.35" />
            <stop offset="25%" stopColor="#E6C673" />
            <stop offset="50%" stopColor="#FFF1BD" />
            <stop offset="75%" stopColor="#E6C673" />
            <stop offset="100%" stopColor="#B88E3B" stopOpacity="0.35" />
          </linearGradient>
        </defs>

        {/* Left Vine & Leaves */}
        <path
          d="M138 22C112 22 92 11 66 13C46 14.5 32 21 16 22"
          stroke="url(#ornamentGold)"
          strokeWidth="1.4"
          strokeLinecap="round"
        />
        <path
          d="M128 22C112 31 94 34 74 30"
          stroke="url(#ornamentGold)"
          strokeWidth="1.2"
          strokeLinecap="round"
        />
        <ellipse cx="104" cy="13" rx="8" ry="3.5" transform="rotate(-18 104 13)" fill="url(#ornamentGold)" />
        <ellipse cx="78" cy="14" rx="7" ry="3" transform="rotate(-12 78 14)" fill="url(#ornamentGold)" />
        <ellipse cx="96" cy="30" rx="7.5" ry="3.2" transform="rotate(16 96 30)" fill="url(#ornamentGold)" />
        <circle cx="56" cy="16" r="2.6" fill="#FFF3C4" />
        <circle cx="40" cy="21" r="2" fill="#E6C673" />

        {/* Right Vine & Leaves (Mirrored) */}
        <path
          d="M182 22C208 22 228 11 254 13C274 14.5 288 21 304 22"
          stroke="url(#ornamentGold)"
          strokeWidth="1.4"
          strokeLinecap="round"
        />
        <path
          d="M192 22C208 31 226 34 246 30"
          stroke="url(#ornamentGold)"
          strokeWidth="1.2"
          strokeLinecap="round"
        />
        <ellipse cx="216" cy="13" rx="8" ry="3.5" transform="rotate(18 216 13)" fill="url(#ornamentGold)" />
        <ellipse cx="242" cy="14" rx="7" ry="3" transform="rotate(12 242 14)" fill="url(#ornamentGold)" />
        <ellipse cx="224" cy="30" rx="7.5" ry="3.2" transform="rotate(-16 224 30)" fill="url(#ornamentGold)" />
        <circle cx="264" cy="16" r="2.6" fill="#FFF3C4" />
        <circle cx="280" cy="21" r="2" fill="#E6C673" />

        {/* Side blossoms */}
        <circle cx="136" cy="22" r="5" stroke="url(#ornamentGold)" strokeWidth="1.2" fill="#181512" />
        <circle cx="136" cy="22" r="2" fill="#FFF3C4" />
        <circle cx="184" cy="22" r="5" stroke="url(#ornamentGold)" strokeWidth="1.2" fill="#181512" />
        <circle cx="184" cy="22" r="2" fill="#FFF3C4" />

        {/* Center Medallion */}
        <circle cx="160" cy="22" r="11" stroke="url(#ornamentGold)" strokeWidth="1.4" fill="#1A1612" />
        <circle cx="160" cy="22" r="7.5" stroke="url(#ornamentGold)" strokeWidth="1" strokeDasharray="2 2" />
        <circle cx="160" cy="22" r="3.2" fill="#FFF3C4" />
        <circle cx="160" cy="8.5" r="1.8" fill="#E6C673" />
        <circle cx="160" cy="35.5" r="1.8" fill="#E6C673" />
        <circle cx="146.5" cy="22" r="1.8" fill="#E6C673" />
        <circle cx="173.5" cy="22" r="1.8" fill="#E6C673" />
      </svg>
    </div>
  );
}

/**
 * Bright Gold Metallic Foil Scratch Card (Crisp text underneath)
 */
function ScratchCard({ value, label, isRevealed, onReveal }) {
  const canvasRef = useRef(null);
  const isDrawingRef = useRef(false);
  const strokeCountRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const width = 220;
    const height = 270;
    canvas.width = width;
    canvas.height = height;

    const grad = ctx.createLinearGradient(0, 0, width, height);
    grad.addColorStop(0, '#C8A45D');
    grad.addColorStop(0.28, '#EBD28E');
    grad.addColorStop(0.52, '#FFF1BD');
    grad.addColorStop(0.78, '#D7B46A');
    grad.addColorStop(1, '#B89248');

    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, width, height);

    ctx.strokeStyle = 'rgba(255, 250, 232, 0.24)';
    ctx.lineWidth = 1;
    for (let i = -height; i < width + height; i += 7) {
      ctx.beginPath();
      ctx.moveTo(i, 0);
      ctx.lineTo(i + height * 0.5, height);
      ctx.stroke();
    }

    ctx.strokeStyle = 'rgba(130, 96, 36, 0.35)';
    ctx.lineWidth = 2;
    ctx.strokeRect(7, 7, width - 14, height - 14);

    ctx.fillStyle = 'rgba(255, 252, 240, 0.88)';
    ctx.font = '20px Georgia, serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('✦', width / 2, height / 2);
  }, []);

  const checkScratchProgress = useCallback(() => {
    if (isRevealed) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height).data;
    let transparentPixels = 0;
    const totalSampled = imageData.length / 16;

    for (let i = 3; i < imageData.length; i += 16) {
      if (imageData[i] < 128) transparentPixels++;
    }

    if (transparentPixels / totalSampled > 0.38) {
      onReveal();
    }
  }, [isRevealed, onReveal]);

  const scratchAt = (clientX, clientY) => {
    const canvas = canvasRef.current;
    if (!canvas || isRevealed) return;
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;

    const x = (clientX - rect.left) * scaleX;
    const y = (clientY - rect.top) * scaleY;

    const ctx = canvas.getContext('2d');
    ctx.globalCompositeOperation = 'destination-out';
    ctx.beginPath();
    ctx.arc(x, y, 26, 0, Math.PI * 2);
    ctx.fill();

    strokeCountRef.current += 1;
    if (strokeCountRef.current % 6 === 0) {
      checkScratchProgress();
    }
  };

  return (
    <div className="flex flex-col items-center">
      <div className="relative w-full aspect-[4/4.8] rounded-xl bg-[#1E1C21] border border-[#E5C675]/65 shadow-[0_10px_28px_rgba(0,0,0,0.65)] overflow-hidden select-none">
        {/* Underlying Date Text — Always crisp (never blurred) */}
        <div className="absolute inset-0 flex items-center justify-center px-2">
          <span
            className={`font-editorial text-[#F6EFE6] tracking-wide ${
              value.length > 4 ? 'text-xl sm:text-2xl' : 'text-3xl sm:text-4xl'
            }`}
          >
            {value}
          </span>
        </div>

        {/* Scratchable Gold Foil Canvas */}
        <canvas
          ref={canvasRef}
          onPointerDown={(e) => {
            isDrawingRef.current = true;
            e.currentTarget.setPointerCapture(e.pointerId);
            scratchAt(e.clientX, e.clientY);
          }}
          onPointerMove={(e) => {
            if (!isDrawingRef.current) return;
            scratchAt(e.clientX, e.clientY);
          }}
          onPointerUp={() => {
            isDrawingRef.current = false;
            checkScratchProgress();
          }}
          onPointerCancel={() => {
            isDrawingRef.current = false;
          }}
          style={{ touchAction: 'none' }}
          className={`absolute inset-0 w-full h-full cursor-grab active:cursor-grabbing transition-opacity duration-500 ease-out ${
            isRevealed ? 'opacity-0 pointer-events-none' : 'opacity-100'
          }`}
        />
      </div>

      {/* Label Under Card */}
      <span className="mt-3 text-[10px] sm:text-xs uppercase tracking-[0.28em] text-[#C8BEB0]/85">
        {label}
      </span>
    </div>
  );
}

export default function App() {
  const firstVideoRef = useRef(null);
  const secondVideoRef = useRef(null);
  const dateSectionRef = useRef(null);

  const [started, setStarted] = useState(false);
  const [playSecondVideo, setPlaySecondVideo] = useState(false);
  const [isMuted, setIsMuted] = useState(false);

  const [revealedCards, setRevealedCards] = useState({
    day: false,
    month: false,
    year: false,
  });
  const [calendarAdded, setCalendarAdded] = useState(false);

  const allRevealed = revealedCards.day && revealedCards.month && revealedCards.year;

  // Lock page scrolling until "Scroll down" appears on the second video
  useEffect(() => {
    if (!playSecondVideo) {
      window.scrollTo(0, 0);
      document.documentElement.style.overflow = 'hidden';
      document.body.style.overflow = 'hidden';
    } else {
      document.documentElement.style.overflow = '';
      document.body.style.overflow = '';
    }

    return () => {
      document.documentElement.style.overflow = '';
      document.body.style.overflow = '';
    };
  }, [playSecondVideo]);

  const handleStart = async () => {
    setStarted(true);
    const v1 = firstVideoRef.current;
    if (!v1) return;

    try {
      v1.currentTime = 0;
      v1.muted = false;
      setIsMuted(false);
      await v1.play();
    } catch {
      v1.muted = true;
      setIsMuted(true);
      v1.play().catch(() => {});
    }
  };

  const handleFirstVideoEnded = () => {
    setPlaySecondVideo(true);
    const v2 = secondVideoRef.current;
    if (!v2) return;

    v2.currentTime = 0;
    v2.muted = isMuted;
    v2.play().catch(() => {});
  };

  const toggleMute = () => {
    const nextMuted = !isMuted;
    setIsMuted(nextMuted);

    if (firstVideoRef.current) firstVideoRef.current.muted = nextMuted;
    if (secondVideoRef.current) secondVideoRef.current.muted = nextMuted;
  };

  const scrollToDate = () => {
    if (!playSecondVideo) return;
    dateSectionRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleAddToCalendar = () => {
    setCalendarAdded(true);
    const { calendarTitle, calendarLocation, calendarDescription, startDateTime, endDateTime } =
      EVENT_DETAILS;

    const googleCalUrl = new URL('https://calendar.google.com/calendar/render');
    googleCalUrl.searchParams.set('action', 'TEMPLATE');
    googleCalUrl.searchParams.set('text', calendarTitle);
    googleCalUrl.searchParams.set('dates', `${startDateTime}/${endDateTime}`);
    googleCalUrl.searchParams.set('details', calendarDescription);
    googleCalUrl.searchParams.set('location', calendarLocation);

    window.open(googleCalUrl.toString(), '_blank', 'noopener,noreferrer');
  };

  return (
    <div
      className={`min-h-screen bg-[#0B0A0C] text-[#F5EFE6] ${
        !playSecondVideo ? 'h-screen-mobile overflow-hidden' : ''
      }`}
    >
      {/* =========================================================
          1. FULL-SCREEN MOBILE VIDEO SECTION
      ========================================================= */}
      <section className="relative w-full h-screen-mobile overflow-hidden bg-black">
        {/* 1st Video: Plays Once */}
        <video
          ref={firstVideoRef}
          src="/video.mp4"
          muted={isMuted}
          playsInline
          preload="auto"
          onEnded={handleFirstVideoEnded}
          className={`absolute inset-0 w-full h-full object-cover object-center transition-opacity duration-700 ${
            playSecondVideo ? 'opacity-0 pointer-events-none' : 'opacity-100'
          }`}
        />

        {/* 2nd Video: Plays on Loop After 1st Finishes */}
        <video
          ref={secondVideoRef}
          src="/video2.mp4"
          loop
          muted={isMuted}
          playsInline
          preload="auto"
          className={`absolute inset-0 w-full h-full object-cover object-center transition-opacity duration-700 ${
            playSecondVideo ? 'opacity-100' : 'opacity-0 pointer-events-none'
          }`}
        />

        {/* Full-Screen Cover Image Before Tap */}
        {!started && (
          <div
            role="button"
            tabIndex={0}
            onClick={handleStart}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                handleStart();
              }
            }}
            className="absolute inset-0 z-30 cursor-pointer select-none bg-black"
          >
            <img
              src="/diya.png"
              alt=""
              className="w-full h-full object-cover object-center"
            />
          </div>
        )}

        {/* Minimal Mute / Unmute Button */}
        {started && (
          <button
            onClick={toggleMute}
            aria-label={isMuted ? 'Unmute' : 'Mute'}
            className="fixed top-5 right-5 z-40 flex items-center justify-center w-10 h-10 rounded-full bg-black/45 backdrop-blur-md border border-white/20 text-white transition active:scale-95 cursor-pointer"
          >
            {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
          </button>
        )}

        {/* Lower "Scroll down" Prompt (Appears once 2nd video begins) */}
        {playSecondVideo && (
          <div className="absolute inset-x-0 bottom-0 z-20 pt-10 pb-3 sm:pb-4 bg-gradient-to-t from-[#0D0C0F] via-[#0D0C0F]/65 to-transparent flex flex-col items-center animate-blur-reveal">
            <button
              onClick={scrollToDate}
              className="flex flex-col items-center gap-0.5 hover:opacity-90 transition cursor-pointer"
            >
              <span className="font-script gold-shine-text text-3xl sm:text-4xl tracking-wide leading-none">
                Scroll down
              </span>
              <ChevronDown className="w-4 h-4 text-[#E6C673] animate-bounce mt-0.5" />
            </button>
          </div>
        )}
      </section>

      {/* =========================================================
          2. SCRATCH TO REVEAL THE DATE SECTION
      ========================================================= */}
      {playSecondVideo && (
        <section
          ref={dateSectionRef}
          className="textured-night-bg relative px-6 pt-14 pb-24 flex flex-col items-center text-center overflow-hidden animate-blur-reveal"
        >
          <div className="w-full max-w-sm mx-auto">
            {/* Heading: "The Date" + Ornamental Divider */}
            <BlurReveal delay={50}>
              <h2 className="font-script gold-shine-text text-6xl sm:text-7xl leading-tight">
                The Date
              </h2>
              <DateOrnamentDivider />
            </BlurReveal>

            {/* Subtitle Prompt */}
            <BlurReveal delay={180}>
              <p className="font-editorial italic text-lg sm:text-xl text-[#F0DFB3] mb-8 flex items-center justify-center gap-2">
                <span className="gold-shine-text not-italic text-xs">✦</span>
                <span>Scratch to reveal the date</span>
                <span className="gold-shine-text not-italic text-xs">✦</span>
              </p>
            </BlurReveal>

            {/* 3 Scratch Cards Grid (Day / Month / Year) */}
            <BlurReveal delay={300}>
              <div className="grid grid-cols-3 gap-3 sm:gap-4 mb-10">
                <ScratchCard
                  value={EVENT_DETAILS.day}
                  label="DAY"
                  isRevealed={revealedCards.day}
                  onReveal={() => setRevealedCards((prev) => ({ ...prev, day: true }))}
                />
                <ScratchCard
                  value={EVENT_DETAILS.month}
                  label="MONTH"
                  isRevealed={revealedCards.month}
                  onReveal={() => setRevealedCards((prev) => ({ ...prev, month: true }))}
                />
                <ScratchCard
                  value={EVENT_DETAILS.year}
                  label="YEAR"
                  isRevealed={revealedCards.year}
                  onReveal={() => setRevealedCards((prev) => ({ ...prev, year: true }))}
                />
              </div>
            </BlurReveal>

            {/* Revealed Details + "Add to calendar" Prompt */}
            <div
              className={`transition-all duration-1000 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                allRevealed
                  ? 'opacity-100 blur-0 translate-y-0 scale-100 pointer-events-auto'
                  : 'opacity-0 blur-lg translate-y-4 scale-95 pointer-events-none'
              }`}
            >
              <p className="font-editorial text-xl sm:text-2xl text-[#F5EFE6] leading-snug">
                {EVENT_DETAILS.subline1}
              </p>
              <p className="font-editorial text-lg sm:text-xl text-[#D8CFC2] mt-1 mb-7">
                {EVENT_DETAILS.subline2}
              </p>

              <button
                onClick={handleAddToCalendar}
                className="group inline-flex items-center gap-2 font-editorial italic text-xl gold-shine-text hover:opacity-90 transition cursor-pointer"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-[#E6C673]/80" />
                <span className="underline decoration-[#E6C673]/60 underline-offset-8 group-hover:decoration-[#FFF1BD] transition">
                  {calendarAdded ? 'Added to calendar' : 'Add to calendar'}
                </span>
                {calendarAdded ? (
                  <Check className="w-4 h-4 text-[#E6C673]" />
                ) : (
                  <CalendarPlus className="w-4 h-4 text-[#E6C673] opacity-90 group-hover:opacity-100 transition" />
                )}
              </button>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}