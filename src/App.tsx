import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ScratchExperience } from './components/ScratchExperience';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { CountdownTimer } from './components/CountdownTimer';
import { CoupleStory } from './components/CoupleStory';
import { EditorialGallery } from './components/EditorialGallery';
import { WeddingFilm } from './components/WeddingFilm';
import { EventSchedule } from './components/EventSchedule';
import { VenueSection } from './components/VenueSection';
import { RsvpSection } from './components/RsvpSection';
import { Footer } from './components/Footer';

export const App: React.FC = () => {
  const [viewState, setViewState] = useState<'scratch' | 'invitation'>('scratch');

  const handleScratchComplete = () => {
    setViewState('invitation');
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  const handleResetScratch = () => {
    setViewState('scratch');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-emerald-950 text-ivory-100 font-sans selection:bg-gold-metallic selection:text-emerald-950 overflow-x-hidden">
      <AnimatePresence mode="wait">
        {viewState === 'scratch' ? (
          <motion.div
            key="scratch-stage"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, filter: 'blur(10px)' }}
            transition={{ duration: 0.8 }}
            className="w-full min-h-screen"
          >
            <ScratchExperience onComplete={handleScratchComplete} />
          </motion.div>
        ) : (
          <motion.div
            key="invitation-stage"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: 'easeOut' }}
            className="w-full relative"
          >
            <Navbar onResetScratch={handleResetScratch} />
            <main>
              <HeroSection />
              <CountdownTimer />
              <CoupleStory />
              <EditorialGallery />
              <WeddingFilm />
              <EventSchedule />
              <VenueSection />
              <RsvpSection />
            </main>
            <Footer />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default App;
