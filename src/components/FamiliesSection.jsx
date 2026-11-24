import React from 'react';
import { SmoothReveal, SectionHeading } from './SharedUI';

export const FAMILIES_DETAILS = {
  heading: 'Our families',
  groups: [
    {
      label: 'WITH THE BLESSINGS OF',
      lines: [
        'Late Smt. Kamla Devi & Shri Ram Prasad Sharma',
        'Smt. Shanti & Shri Om Prakash Mehra',
      ],
      italic: false,
    },
    {
      label: 'EAGER TO SEE YOU',
      lines: [
        'The Sharma family, Indore',
        'The Mehra family, Lucknow',
      ],
      italic: false,
    },
    {
      label: 'WAITING TO WELCOME YOU',
      lines: ['Rahul, Neha, Karan and Pooja'],
      italic: false,
    },
    {
      label: "DON'T YOU DARE MISS IT",
      lines: ['Aarav and Myra say: you must come to the wedding!'],
      italic: true,
    },
  ],
};

export default function FamiliesSection() {
  return null;

  /*
  return (
    <div className="w-full max-w-sm mx-auto pt-8 pb-24 px-5 sm:px-6">
      <SectionHeading>{FAMILIES_DETAILS.heading}</SectionHeading>

      <div className="mt-7 space-y-9">
        {FAMILIES_DETAILS.groups.map((group, idx) => (
          <SmoothReveal key={group.label} delay={120 + idx * 80}>
            <p className="text-[10px] sm:text-[11px] uppercase tracking-[0.26em] text-[#E6D2D6]/85 mb-2.5">
              {group.label}
            </p>

            <div className="space-y-1.5">
              {group.lines.map((line) => (
                <p
                  key={line}
                  className={`font-editorial text-lg sm:text-xl text-[#F8EFEA] leading-relaxed ${
                    group.italic ? 'italic' : ''
                  }`}
                >
                  {line}
                </p>
              ))}
            </div>
          </SmoothReveal>
        ))}
      </div>
    </div>
  );
  */
}