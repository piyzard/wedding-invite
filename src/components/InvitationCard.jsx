import React, { useState } from 'react';
import { INVITATION_DETAILS } from '../data/weddingData';
import { SmoothReveal, OrnamentDivider } from './SharedUI';

function LogoCrest() {
  const [logoMissing, setLogoMissing] = useState(false);

  if (logoMissing) return null;

  return (
    <div className="relative w-24 h-24 sm:w-28 sm:h-28 mx-auto mb-4 flex items-center justify-center select-none">
      <img
        src="/logo.png"
        alt="Wedding Logo"
        onError={() => setLogoMissing(true)}
        className="w-full h-full object-contain drop-shadow-[0_4px_12px_rgba(0,0,0,0.45)]"
      />
    </div>
  );
}

export default function InvitationCard() {
  return (
    <SmoothReveal delay={100} className="w-full max-w-md mx-auto px-5 sm:px-6">
      <div className="relative w-full max-w-md mx-auto pt-4">
        <div
          style={{ borderTopLeftRadius: '170px', borderTopRightRadius: '170px' }}
          className="relative bg-[#290B14]/75 border border-[#B87A88]/45 p-2 shadow-[0_14px_40px_rgba(0,0,0,0.65)]"
        >
          <div
            style={{ borderTopLeftRadius: '162px', borderTopRightRadius: '162px' }}
            className="border border-[#E6C673]/40 px-6 sm:px-9 pt-6 pb-12 text-center"
          >
            <LogoCrest />

            <p className="font-editorial text-base sm:text-lg tracking-wider text-[#F4E3C2] mb-1">
              {INVITATION_DETAILS.invocation}
            </p>
            <OrnamentDivider className="w-48 sm:w-56" />

            <p className="font-editorial italic text-lg sm:text-xl text-[#F6ECE4] leading-snug mt-3">
              {INVITATION_DETAILS.introLine1}
            </p>
            <p className="font-editorial italic text-lg sm:text-xl text-[#F6ECEA] leading-snug mb-6">
              {INVITATION_DETAILS.introLine2}
            </p>

            <h3 className="font-script gold-shine-text text-5xl sm:text-6xl leading-tight">
              {INVITATION_DETAILS.brideName}
            </h3>
            <p className="text-[9px] sm:text-[10px] uppercase tracking-[0.26em] text-[#DFC4C9] mt-2">
              {INVITATION_DETAILS.brideParentsLabel}
            </p>
            <p className="font-editorial text-xs sm:text-sm uppercase tracking-[0.16em] text-[#F8EFEA] mt-1 leading-relaxed">
              {INVITATION_DETAILS.brideParents}
            </p>

            <p className="font-editorial italic text-lg text-[#E6C673] my-4">
              {INVITATION_DETAILS.connector}
            </p>

            <h3 className="font-script gold-shine-text text-5xl sm:text-6xl leading-tight">
              {INVITATION_DETAILS.groomName}
            </h3>
            <p className="text-[9px] sm:text-[10px] uppercase tracking-[0.26em] text-[#DFC4C9] mt-2">
              {INVITATION_DETAILS.groomParentsLabel}
            </p>
            <p className="font-editorial text-xs sm:text-sm uppercase tracking-[0.16em] text-[#F8EFEA] mt-1 leading-relaxed">
              {INVITATION_DETAILS.groomParents}
            </p>

            <div className="mt-8 pt-3">
              <p className="font-editorial text-lg sm:text-xl text-[#F8EFEA] tracking-wide">
                {INVITATION_DETAILS.fullDate}
              </p>
              <p className="font-editorial italic text-base sm:text-lg text-[#E6D2D6] mt-1">
                {INVITATION_DETAILS.venue}
              </p>
            </div>
          </div>
        </div>
      </div>
    </SmoothReveal>
  );
}