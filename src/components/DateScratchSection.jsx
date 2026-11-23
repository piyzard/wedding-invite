import React, { useRef, useState, useEffect, useCallback } from 'react';
import { CalendarPlus, Check } from 'lucide-react';
import { EVENT_DETAILS } from '../data/weddingData';
import { SmoothReveal, OrnamentDivider } from './SharedUI';

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

    if (transparentPixels / totalSampled > 0.38) onReveal();
  }, [isRevealed, onReveal]);

  const scratchAt = (clientX, clientY) => {
    const canvas = canvasRef.current;
    if (!canvas || isRevealed) return;
    const rect = canvas.getBoundingClientRect();
    const x = ((clientX - rect.left) * canvas.width) / rect.width;
    const y = ((clientY - rect.top) * canvas.height) / rect.height;

    const ctx = canvas.getContext('2d');
    ctx.globalCompositeOperation = 'destination-out';
    ctx.beginPath();
    ctx.arc(x, y, 26, 0, Math.PI * 2);
    ctx.fill();

    strokeCountRef.current += 1;
    if (strokeCountRef.current % 6 === 0) checkScratchProgress();
  };

  return (
    <div className="flex flex-col items-center">
      <div className="relative w-full aspect-[4/4.8] rounded-xl bg-[#270C14] border border-[#E5C675]/65 shadow-[0_12px_30px_rgba(0,0,0,0.65)] overflow-hidden select-none">
        <div className="absolute inset-0 flex items-center justify-center px-2">
          <span
            className={`font-editorial text-[#F8EFEA] tracking-wide ${
              value.length > 4 ? 'text-xl sm:text-2xl' : 'text-3xl sm:text-4xl'
            }`}
          >
            {value}
          </span>
        </div>

        <canvas
          ref={canvasRef}
          onPointerDown={(e) => {
            isDrawingRef.current = true;
            e.currentTarget.setPointerCapture(e.pointerId);
            scratchAt(e.clientX, e.clientY);
          }}
          onPointerMove={(e) => {
            if (isDrawingRef.current) scratchAt(e.clientX, e.clientY);
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

      <span className="mt-3 text-[10px] sm:text-xs uppercase tracking-[0.28em] text-[#E3C9CE]/85">
        {label}
      </span>
    </div>
  );
}

export default function DateScratchSection({ onOpenCalendar }) {
  const [revealed, setRevealed] = useState({ day: false, month: false, year: false });
  const [calendarAdded, setCalendarAdded] = useState(false);
  const allRevealed = revealed.day && revealed.month && revealed.year;

  const handleCalendarClick = () => {
    setCalendarAdded(true);
    onOpenCalendar({
      title: EVENT_DETAILS.calendarTitle,
      start: EVENT_DETAILS.startDateTime,
      end: EVENT_DETAILS.endDateTime,
      location: EVENT_DETAILS.calendarLocation,
      details: EVENT_DETAILS.calendarDescription,
    });
  };

  return (
    <div className="w-full max-w-sm mx-auto px-5 sm:px-6">
      <SmoothReveal delay={40}>
        <h2 className="font-script gold-shine-text text-6xl sm:text-7xl leading-tight">
          The Date
        </h2>
        <OrnamentDivider className="w-56 sm:w-64" />
      </SmoothReveal>

      <SmoothReveal delay={120}>
        <p className="font-editorial italic text-lg sm:text-xl text-[#F4E3C2] mb-8 flex items-center justify-center gap-2">
          <span className="gold-shine-text not-italic text-xs">✦</span>
          <span>Scratch to reveal the date</span>
          <span className="gold-shine-text not-italic text-xs">✦</span>
        </p>
      </SmoothReveal>

      <SmoothReveal delay={200}>
        <div className="grid grid-cols-3 gap-3 sm:gap-4 mb-6">
          <ScratchCard
            value={EVENT_DETAILS.day}
            label="DAY"
            isRevealed={revealed.day}
            onReveal={() => setRevealed((p) => ({ ...p, day: true }))}
          />
          <ScratchCard
            value={EVENT_DETAILS.month}
            label="MONTH"
            isRevealed={revealed.month}
            onReveal={() => setRevealed((p) => ({ ...p, month: true }))}
          />
          <ScratchCard
            value={EVENT_DETAILS.year}
            label="YEAR"
            isRevealed={revealed.year}
            onReveal={() => setRevealed((p) => ({ ...p, year: true }))}
          />
        </div>
      </SmoothReveal>

      <div
        className={`grid transition-[grid-template-rows,opacity,margin] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${
          allRevealed
            ? 'grid-rows-[1fr] opacity-100 mt-4 mb-12 pointer-events-auto'
            : 'grid-rows-[0fr] opacity-0 mt-0 mb-2 pointer-events-none'
        }`}
      >
        <div className="overflow-hidden">
          <p className="font-editorial text-xl sm:text-2xl text-[#F8EFEA] leading-snug">
            {EVENT_DETAILS.subline1}
          </p>
          <p className="font-editorial text-lg sm:text-xl text-[#E6D2D6] mt-1 mb-6">
            {EVENT_DETAILS.subline2}
          </p>

          <button
            onClick={handleCalendarClick}
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
    </div>
  );
}