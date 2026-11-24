import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, SkipBack, SkipForward, Heart } from 'lucide-react';
import { SmoothReveal, SectionHeading } from './SharedUI';

export const SONG_DETAILS = {
  heading: 'Our song',
  title: 'Kasoor',
  artist: 'Prateek Kuhad',
  coverImage: '/song-cover.jpg',
  audioSrc: '/kasoor.mp3',
  spotifyUrl: 'https://open.spotify.com/search/Kasoor%20Prateek%20Kuhad',
  footerText: 'Plays on Spotify',
};

export default function SongSection() {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [liked, setLiked] = useState(true);
  const [progress, setProgress] = useState(34);
  const [imgError, setImgError] = useState(false);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const onTimeUpdate = () => {
      if (audio.duration) {
        setProgress((audio.currentTime / audio.duration) * 100);
      }
    };
    const onEnded = () => setIsPlaying(false);

    audio.addEventListener('timeupdate', onTimeUpdate);
    audio.addEventListener('ended', onEnded);
    return () => {
      audio.removeEventListener('timeupdate', onTimeUpdate);
      audio.removeEventListener('ended', onEnded);
    };
  }, []);

  const togglePlay = async () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      try {
        await audio.play();
        setIsPlaying(true);
      } catch {
        window.open(SONG_DETAILS.spotifyUrl, '_blank', 'noopener,noreferrer');
      }
    }
  };

  const handleSeek = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const ratio = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
    setProgress(ratio * 100);

    const audio = audioRef.current;
    if (audio && audio.duration) {
      audio.currentTime = ratio * audio.duration;
    }
  };

  const handleRestart = () => {
    setProgress(0);
    if (audioRef.current) audioRef.current.currentTime = 0;
  };

  return (
    <div className="w-full max-w-sm mx-auto pt-4 pb-24 px-5 sm:px-6">
      <audio ref={audioRef} src={SONG_DETAILS.audioSrc} preload="metadata" />

      <SectionHeading>{SONG_DETAILS.heading}</SectionHeading>

      <SmoothReveal delay={140}>
        <div
          style={{
            background:
              'linear-gradient(180deg, #6E5835 0%, #574529 52%, #44351F 100%)',
          }}
          className="mt-7 w-full max-w-[305px] mx-auto rounded-2xl p-4 border border-[#E6C673]/25 shadow-[0_18px_40px_rgba(0,0,0,0.65)] text-left"
        >
          <div className="w-full aspect-square rounded-xl overflow-hidden bg-[#2E2212] shadow-inner">
            {!imgError ? (
              <img
                src={SONG_DETAILS.coverImage}
                alt={`${SONG_DETAILS.title} — ${SONG_DETAILS.artist}`}
                loading="lazy"
                onError={() => setImgError(true)}
                className="w-full h-full object-cover object-center"
              />
            ) : (
              <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-b from-[#45341E] to-[#271C0F] text-center p-4">
                <span className="font-script gold-shine-text text-4xl">♫</span>
                <span className="font-editorial italic text-xs text-[#F4E3C2]/80 mt-1">
                  Add {SONG_DETAILS.coverImage}
                </span>
              </div>
            )}
          </div>

          <div className="mt-4 flex items-center justify-between gap-3">
            <div className="min-w-0">
              <h3 className="text-base sm:text-lg font-semibold text-white tracking-tight truncate">
                {SONG_DETAILS.title}
              </h3>
              <p className="text-xs sm:text-sm text-white/75 truncate">
                {SONG_DETAILS.artist}
              </p>
            </div>

            <button
              onClick={() => setLiked((prev) => !prev)}
              aria-label="Favorite song"
              className="shrink-0 p-1 transition active:scale-90 cursor-pointer"
            >
              <Heart
                className={`w-5 h-5 transition ${
                  liked
                    ? 'fill-[#F3D78C] text-[#F3D78C]'
                    : 'text-[#F3D78C]/70 hover:text-[#F3D78C]'
                }`}
              />
            </button>
          </div>

          <div
            onClick={handleSeek}
            role="slider"
            aria-label="Song progress"
            aria-valuenow={Math.round(progress)}
            tabIndex={0}
            className="mt-4 py-2 cursor-pointer group"
          >
            <div className="relative w-full h-1 rounded-full bg-white/25">
              <div
                style={{ width: `${progress}%` }}
                className="h-full rounded-full bg-white"
              />
              <span
                style={{ left: `${progress}%` }}
                className="absolute top-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-white shadow"
              />
            </div>
          </div>

          <div className="mt-2 mb-1 flex items-center justify-center gap-7">
            <button
              onClick={handleRestart}
              aria-label="Previous"
              className="text-white/90 hover:text-white transition active:scale-90 cursor-pointer"
            >
              <SkipBack className="w-5 h-5 fill-current" />
            </button>

            <button
              onClick={togglePlay}
              aria-label={isPlaying ? 'Pause' : 'Play'}
              className="w-13 h-13 rounded-full bg-white text-[#4A3A21] flex items-center justify-center shadow-[0_6px_18px_rgba(0,0,0,0.35)] hover:scale-105 active:scale-95 transition cursor-pointer"
            >
              {isPlaying ? (
                <Pause className="w-5 h-5 fill-current" />
              ) : (
                <Play className="w-5 h-5 fill-current ml-0.5" />
              )}
            </button>

            <button
              onClick={() =>
                window.open(SONG_DETAILS.spotifyUrl, '_blank', 'noopener,noreferrer')
              }
              aria-label="Next"
              className="text-white/90 hover:text-white transition active:scale-90 cursor-pointer"
            >
              <SkipForward className="w-5 h-5 fill-current" />
            </button>
          </div>
        </div>

        <a
          href={SONG_DETAILS.spotifyUrl}
          target="_blank"
          rel="noreferrer"
          className="mt-5 inline-block font-editorial text-sm sm:text-base text-[#E6D2D6]/85 hover:text-[#F8EFEA] transition"
        >
          {SONG_DETAILS.footerText}
        </a>
      </SmoothReveal>
    </div>
  );
}