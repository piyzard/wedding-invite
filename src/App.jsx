import React, { useState, useRef } from 'react';
import HeroVideoSection from './components/HeroVideoSection';
import DateScratchSection from './components/DateScratchSection';
import InvitationCard from './components/InvitationCard';
import StoryAndGallery from './components/StoryAndGallery';
import CelebrationsSection from './components/CelebrationsSection';
import LocationSection from './components/LocationSection';
import TravelDressSection from './components/TravelDressSection';
import FamiliesSection from './components/FamiliesSection';
import SongSection from './components/SongSection';
import RsvpSection from './components/RsvpSection';
import ClosingSection from './components/ClosingSection';

export default function App() {
  const [playSecondVideo, setPlaySecondVideo] = useState(false);
  const dateSectionRef = useRef(null);

  const scrollToDate = () => {
    if (!playSecondVideo) return;
    dateSectionRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const openGoogleCalendarEvent = ({ title, start, end, location, details }) => {
    const url = new URL('https://calendar.google.com/calendar/render');
    url.searchParams.set('action', 'TEMPLATE');
    url.searchParams.set('text', title);
    url.searchParams.set('dates', `${start}/${end}`);
    url.searchParams.set('details', details);
    url.searchParams.set('location', location);
    window.open(url.toString(), '_blank', 'noopener,noreferrer');
  };

  return (
    <div
      className={`text-[#F8EFEA] ${
        playSecondVideo
          ? 'min-h-dvh bg-[#1A070C]'
          : 'h-dvh overflow-hidden bg-black'
      }`}
    >
      <HeroVideoSection
        playSecondVideo={playSecondVideo}
        setPlaySecondVideo={setPlaySecondVideo}
        onScrollDown={scrollToDate}
      />

      {playSecondVideo && (
        <section
          ref={dateSectionRef}
          className="wine-textured-bg relative pt-14 pb-0 flex flex-col items-center text-center overflow-hidden animate-smooth-entrance"
        >
          <DateScratchSection onOpenCalendar={openGoogleCalendarEvent} />
          <InvitationCard />
          <StoryAndGallery />
          <CelebrationsSection onOpenCalendar={openGoogleCalendarEvent} />
          <LocationSection />
          <TravelDressSection />
          <FamiliesSection />
          <SongSection />
          <RsvpSection />
          <ClosingSection />
        </section>
      )}
    </div>
  );
}