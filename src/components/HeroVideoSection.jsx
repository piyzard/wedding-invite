import React, { useRef, useState, useEffect } from 'react';
import { Volume2, VolumeX, ChevronDown } from 'lucide-react';

export default function HeroVideoSection({ playSecondVideo, setPlaySecondVideo, onScrollDown }) {
  const firstVideoRef = useRef(null);
  const secondVideoRef = useRef(null);

  const [heroHeight, setHeroHeight] = useState(() =>
    typeof window !== 'undefined' ? window.innerHeight : 800
  );
  const [started, setStarted] = useState(false);
  const [secondVideoReady, setSecondVideoReady] = useState(false);
  const [isMuted, setIsMuted] = useState(false);

  useEffect(() => {
    let lastWidth = window.innerWidth;
    const handleResize = () => {
      if (Math.abs(window.innerWidth - lastWidth) > 40) {
        lastWidth = window.innerWidth;
        setHeroHeight(window.innerHeight);
      }
    };
    window.addEventListener('resize', handleResize, { passive: true });
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    secondVideoRef.current?.load();
  }, []);

  useEffect(() => {
    if (playSecondVideo) return;
    const preventScroll = (e) => e.preventDefault();
    window.scrollTo(0, 0);
    window.addEventListener('wheel', preventScroll, { passive: false });
    window.addEventListener('touchmove', preventScroll, { passive: false });
    return () => {
      window.removeEventListener('wheel', preventScroll);
      window.removeEventListener('touchmove', preventScroll);
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

  const handleFirstVideoEnded = async () => {
    const v2 = secondVideoRef.current;
    if (!v2) return setPlaySecondVideo(true);
    v2.currentTime = 0;
    v2.muted = isMuted;
    try {
      await v2.play();
      setSecondVideoReady(true);
      setPlaySecondVideo(true);
    } catch {
      setPlaySecondVideo(true);
    }
  };

  const toggleMute = () => {
    const nextMuted = !isMuted;
    setIsMuted(nextMuted);
    if (firstVideoRef.current) firstVideoRef.current.muted = nextMuted;
    if (secondVideoRef.current) secondVideoRef.current.muted = nextMuted;
  };

  return (
    <section
      style={{ height: `${heroHeight}px` }}
      className="relative w-full overflow-hidden bg-[#0A0507] shrink-0"
    >
      <video
        ref={firstVideoRef}
        src="/video.mp4"
        muted={isMuted}
        playsInline
        preload="auto"
        onEnded={handleFirstVideoEnded}
        className="hero-video-layer z-10 absolute inset-0 w-full h-full object-cover object-center"
      />

      <video
        ref={secondVideoRef}
        src="/video2.mp4"
        loop
        muted={isMuted}
        playsInline
        preload="auto"
        onPlaying={() => {
          setSecondVideoReady(true);
          setPlaySecondVideo(true);
        }}
        className={`hero-video-layer z-20 absolute inset-0 w-full h-full object-cover object-center ${
          playSecondVideo && secondVideoReady ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
      />

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
          className="absolute inset-0 z-30 cursor-pointer select-none bg-[#0A0507]"
        >
          <img src="/diya.png" alt="" className="w-full h-full object-cover object-center" />
        </div>
      )}

      {started && (
        <button
          onClick={toggleMute}
          aria-label={isMuted ? 'Unmute' : 'Mute'}
          className="fixed top-5 right-5 z-40 flex items-center justify-center w-10 h-10 rounded-full bg-black/45 backdrop-blur-md border border-white/20 text-white transition active:scale-95 cursor-pointer"
        >
          {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
        </button>
      )}

      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-20 h-28 bg-gradient-to-t from-[#0A0507] via-[#0A0507]/70 to-transparent" />

      {playSecondVideo && (
        <div className="absolute inset-x-0 bottom-0 z-30 pt-10 pb-3 sm:pb-4 flex flex-col items-center animate-smooth-entrance">
          <button
            onClick={onScrollDown}
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
  );
}