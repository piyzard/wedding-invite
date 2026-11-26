import React, { useRef, useState, useEffect } from 'react';
import { Volume2, VolumeX, ChevronDown } from 'lucide-react';

const VIDEO_PLAYBACK_RATE = 0.85;

export default function HeroVideoSection({ playSecondVideo, setPlaySecondVideo, onScrollDown }) {
  const firstVideoRef = useRef(null);
  const secondVideoRef = useRef(null);
  const musicAudioRef = useRef(null);

  const [heroHeight, setHeroHeight] = useState(() =>
    typeof window !== 'undefined' ? window.innerHeight : 800
  );
  const [started, setStarted] = useState(false);
  const [firstVideoPlaying, setFirstVideoPlaying] = useState(false);
  const [showTitleBlock, setShowTitleBlock] = useState(false);
  const [secondVideoReady, setSecondVideoReady] = useState(false);
  const [isMuted, setIsMuted] = useState(false);

  const applyPlaybackRate = (videoEl) => {
    if (videoEl) {
      videoEl.playbackRate = VIDEO_PLAYBACK_RATE;
    }
  };

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
    applyPlaybackRate(firstVideoRef.current);
    applyPlaybackRate(secondVideoRef.current);
    firstVideoRef.current?.load();
    secondVideoRef.current?.load();
    musicAudioRef.current?.load();
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

  useEffect(() => {
    if (!firstVideoPlaying || showTitleBlock) return;

    const timer = setTimeout(() => {
      setShowTitleBlock(true);
    }, 4000);

    return () => clearTimeout(timer);
  }, [firstVideoPlaying, showTitleBlock]);

  useEffect(() => {
    const audioEl = musicAudioRef.current;
    if (!audioEl || !firstVideoPlaying) return;

    audioEl.loop = true;
    audioEl.muted = isMuted;
    if (audioEl.paused) {
      audioEl.currentTime = 0;
      audioEl.play().catch(() => {});
    }
  }, [firstVideoPlaying]);

  const handleMusicEnded = () => {
    const audioEl = musicAudioRef.current;
    if (!audioEl) return;
    audioEl.currentTime = 0;
    audioEl.play().catch(() => {});
  };

  const handleStart = async () => {
    setStarted(true);
    setFirstVideoPlaying(false);
    const v1 = firstVideoRef.current;
    if (!v1) return;
    try {
      v1.currentTime = 0;
      v1.muted = true;
      v1.playbackRate = VIDEO_PLAYBACK_RATE;
      await v1.play();
    } catch {
      v1.muted = true;
      v1.playbackRate = VIDEO_PLAYBACK_RATE;
      v1.play().catch(() => {});
    }
  };

  const handleFirstVideoEnded = async () => {
    const v2 = secondVideoRef.current;
    if (!v2) return setPlaySecondVideo(true);
    v2.currentTime = 0;
    v2.muted = true;
    v2.playbackRate = VIDEO_PLAYBACK_RATE;
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
    if (musicAudioRef.current) {
      musicAudioRef.current.muted = nextMuted;
      if (!nextMuted && firstVideoPlaying && musicAudioRef.current.paused) {
        musicAudioRef.current.play().catch(() => {});
      }
    }
  };

  const getLineStyle = (delayMs) => ({
    opacity: showTitleBlock ? 1 : 0,
    filter: showTitleBlock ? 'blur(0px)' : 'blur(10px)',
    transform: showTitleBlock ? 'translateY(0px)' : 'translateY(8px)',
    transition: `opacity 900ms ease-out ${delayMs}ms, filter 900ms ease-out ${delayMs}ms, transform 900ms ease-out ${delayMs}ms`,
    willChange: 'opacity, filter, transform',
  });

  return (
    <section
      style={{ height: `${heroHeight}px` }}
      className="relative w-full overflow-hidden bg-[#0A0507] shrink-0"
    >
      <audio
        ref={musicAudioRef}
        src="/music.mp3"
        loop
        preload="auto"
        onEnded={handleMusicEnded}
      />

      <video
        ref={firstVideoRef}
        src="/newvideo.mp4"
        muted
        playsInline
        preload="auto"
        onLoadedMetadata={() => applyPlaybackRate(firstVideoRef.current)}
        onCanPlay={() => applyPlaybackRate(firstVideoRef.current)}
        onPlaying={() => {
          applyPlaybackRate(firstVideoRef.current);
          setFirstVideoPlaying(true);
        }}
        onEnded={handleFirstVideoEnded}
        className="hero-video-layer z-10 absolute inset-0 w-full h-full object-cover object-center"
      />

      {/* Line-by-line blur-in couple title starting 4s after first video plays, staying indefinitely */}
      <div className="pointer-events-none absolute inset-0 z-20 flex flex-col items-center justify-center px-6 translate-y-1 text-center">
        <p
          style={getLineStyle(0)}
          className="font-editorial text-sm sm:text-base text-[#F8EFEA]/90 tracking-wide drop-shadow-[0_3px_12px_rgba(0,0,0,0.95)]"
        >
          Welcome to the wedding of
        </p>

        <div className="mt-5 mb-2 flex flex-col items-center leading-[1.05]">
          <span
            style={getLineStyle(450)}
            className="font-script gold-shine-text text-5xl sm:text-6xl drop-shadow-[0_4px_16px_rgba(0,0,0,0.95)]"
          >
            Piyali
          </span>
          <span
            style={getLineStyle(900)}
            className="font-script gold-shine-text text-2xl sm:text-3xl my-0.5 drop-shadow-[0_3px_12px_rgba(0,0,0,0.95)]"
          >
            &amp;
          </span>
          <span
            style={getLineStyle(1350)}
            className="font-script gold-shine-text text-5xl sm:text-6xl drop-shadow-[0_4px_16px_rgba(0,0,0,0.95)]"
          >
            Satyabrata
          </span>
        </div>

        <div
          style={getLineStyle(1800)}
          className="my-2 flex items-center justify-center gap-2 text-[#E6C673]/85 text-xs select-none"
        >
          <span className="h-[1px] w-8 bg-gradient-to-r from-transparent to-[#E6C673]/70" />
          <span>✦</span>
          <span className="h-[1px] w-8 bg-gradient-to-l from-transparent to-[#E6C673]/70" />
        </div>
      </div>

      <video
        ref={secondVideoRef}
        src="/newvideo2.mp4"
        loop
        muted
        playsInline
        preload="auto"
        onLoadedMetadata={() => applyPlaybackRate(secondVideoRef.current)}
        onPlaying={() => {
          applyPlaybackRate(secondVideoRef.current);
          setSecondVideoReady(true);
          setPlaySecondVideo(true);
        }}
        className={`hero-video-layer z-[15] absolute inset-0 w-full h-full object-cover object-center ${
          playSecondVideo && secondVideoReady ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
      />

      <div
        role={!started ? 'button' : undefined}
        tabIndex={!started ? 0 : undefined}
        onClick={!started ? handleStart : undefined}
        onKeyDown={
          !started
            ? (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  handleStart();
                }
              }
            : undefined
        }
        className={`absolute inset-0 z-30 select-none bg-[#0A0507] transition-opacity duration-500 ease-out ${
          !started || !firstVideoPlaying
            ? 'opacity-100 cursor-pointer'
            : 'opacity-0 pointer-events-none'
        }`}
      >
        <img
          src="/newdiya.png"
          alt=""
          className="absolute inset-0 w-full h-full object-cover object-center"
        />

        <div
          style={{ transition: 'opacity 2500ms ease-in-out' }}
          className={`pointer-events-none absolute inset-0 z-10 flex flex-col items-center justify-between px-6 pt-16 pb-10 text-center ${
            !started ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <div className="w-full max-w-md mx-auto">
            <p className="font-script gold-shine-text text-4xl sm:text-5xl leading-tight drop-shadow-[0_4px_14px_rgba(0,0,0,0.95)]">
              You&apos;re invited
            </p>
            <p className="mt-1.5 text-[10px] sm:text-xs uppercase tracking-[0.28em] text-[#F8EFEA]/95 drop-shadow-[0_3px_12px_rgba(0,0,0,0.95)]">
              TO CELEBRATE A BEAUTIFUL BEGINNING
            </p>
          </div>

          <div className="mb-2">
            <span className="animate-lamp-wobble site-small-text font-editorial italic text-[#F8EFEA] tracking-wide drop-shadow-[0_4px_14px_rgba(0,0,0,0.95)]">
              Tap to light the lamp
            </span>
          </div>
        </div>
      </div>


      {/* Bottom-right circular white logo with shadow under the logo and above the white background */}
{/*
      <div className="pointer-events-none absolute bottom-15 right-4 z-30 w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-white flex items-center justify-center p-1.5 shadow-[0_4px_14px_rgba(0,0,0,0.85),inset_0_2px_6px_rgba(0,0,0,0.25)] overflow-hidden">
        <img
          src="/logo.png"
          alt=""
          className="w-full h-full object-contain rounded-full drop-shadow-[0_2px_4px_rgba(0,0,0,0.35)]"
        />
      </div>
*/}

      {started && (
        <button
          onClick={toggleMute}
          aria-label={isMuted ? 'Unmute' : 'Mute'}
          className="fixed top-5 right-5 z-40 flex items-center justify-center w-10 h-10 rounded-full bg-black/45 backdrop-blur-md border border-white/20 text-white transition active:scale-95 cursor-pointer"
        >
          {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
        </button>
      )}

      <div
        className={`pointer-events-none absolute inset-x-0 bottom-0 z-20 h-28 bg-gradient-to-t from-[#0A0507] via-[#0A0507]/70 to-transparent transition-opacity duration-[1500ms] ease-out ${
          playSecondVideo ? 'opacity-100' : 'opacity-0'
        }`}
      />

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