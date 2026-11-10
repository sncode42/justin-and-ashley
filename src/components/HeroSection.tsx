import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Calendar, ChevronDown, MapPin } from 'lucide-react';
import { weddingConfig } from '../config/weddingConfig';

export const HeroSection: React.FC = () => {
  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center pt-24 pb-16 px-4 overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[750px] h-[750px] bg-emerald-600/10 rounded-full blur-[170px]" />
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-gold-metallic/10 rounded-full blur-[150px]" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto w-full flex flex-col items-center text-center">
        {/* Monogram Crest */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full border border-gold-metallic/30 bg-emerald-900/60 backdrop-blur-md mb-6 shadow-[0_0_20px_rgba(212,175,55,0.15)]"
        >
          <Sparkles className="w-3.5 h-3.5 text-gold-metallic" />
          <span className="font-sans text-[11px] uppercase tracking-[0.3em] text-gold-shimmer">
            {weddingConfig.couple.tagline}
          </span>
          <Sparkles className="w-3.5 h-3.5 text-gold-metallic" />
        </motion.div>

        {/* Main Headline: JUSTIN & ASHLEY */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.2 }}
          className="space-y-2 mb-6"
        >
          <h1 className="font-serif text-5xl sm:text-7xl md:text-8xl font-normal tracking-[0.14em] text-transparent bg-clip-text bg-gradient-to-r from-gold-light via-gold-shimmer to-gold-warm uppercase drop-shadow-sm">
            {weddingConfig.couple.groom.firstName}
          </h1>
          <div className="flex items-center justify-center gap-4 my-1">
            <span className="h-[1px] w-12 sm:w-20 bg-gradient-to-r from-transparent to-gold-metallic/50" />
            <span className="font-script text-3xl sm:text-4xl text-gold-shimmer italic px-2">&amp;</span>
            <span className="h-[1px] w-12 sm:w-20 bg-gradient-to-l from-transparent to-gold-metallic/50" />
          </div>
          <h1 className="font-serif text-5xl sm:text-7xl md:text-8xl font-normal tracking-[0.14em] text-transparent bg-clip-text bg-gradient-to-r from-gold-light via-gold-shimmer to-gold-warm uppercase drop-shadow-sm">
            {weddingConfig.couple.bride.firstName}
          </h1>
        </motion.div>

        {/* Date and Location Badge */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="flex flex-wrap items-center justify-center gap-4 sm:gap-8 text-ivory-200 text-xs sm:text-sm font-sans tracking-[0.2em] uppercase mb-10"
        >
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-gold-metallic" />
            <span>{weddingConfig.weddingDate.displayDate}</span>
          </div>
          <span className="hidden sm:inline text-gold-metallic/40">•</span>
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-gold-metallic" />
            <span>{weddingConfig.venue.church.city}, {weddingConfig.venue.church.state}</span>
          </div>
        </motion.div>

        {/* Couple Hero Photograph Framed in Luxury Border */}
        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="relative w-full max-w-md sm:max-w-lg aspect-[4/5] rounded-3xl p-3 sm:p-4 bg-gradient-to-b from-[#113a2d] via-emerald-950 to-[#071913] shadow-[0_20px_50px_rgba(0,0,0,0.8),0_0_50px_rgba(212,175,55,0.18)]"
        >
          {/* Ornate Gold Filigree Inner Inset */}
          <div className="absolute inset-2 sm:inset-3 rounded-2xl border border-gold-metallic/30 pointer-events-none" />
          <div className="absolute inset-3 sm:inset-4 rounded-xl border border-gold-metallic/15 pointer-events-none" />

          {/* Corner Rosettes */}
          <span className="absolute top-4 left-4 text-gold-metallic text-xs pointer-events-none">✦</span>
          <span className="absolute top-4 right-4 text-gold-metallic text-xs pointer-events-none">✦</span>
          <span className="absolute bottom-4 left-4 text-gold-metallic text-xs pointer-events-none">✦</span>
          <span className="absolute bottom-4 right-4 text-gold-metallic text-xs pointer-events-none">✦</span>

          {/* Image Container with subtle pan effect */}
          <div className="relative w-full h-full rounded-xl overflow-hidden group">
            <img
              src="/assets/couple-traditional.jpg"
              alt="Justin and Ashley in traditional Kerala wedding attire"
              className="w-full h-full object-cover object-top transition-transform duration-1000 group-hover:scale-105"
            />
            {/* Subtle lighting vignette */}
            <div className="absolute inset-0 bg-gradient-to-t from-emerald-950/80 via-transparent to-black/20 pointer-events-none" />

            {/* Bottom Inscription */}
            <div className="absolute bottom-5 inset-x-5 text-center">
              <span className="font-serif italic text-gold-light text-lg sm:text-xl drop-shadow-md">
                “Two souls, one sacred vow.”
              </span>
              <p className="text-[10px] font-sans tracking-[0.3em] uppercase text-gold-shimmer/80 mt-1">
                Kottayam • Kerala
              </p>
            </div>
          </div>
        </motion.div>

        {/* Fictional Concept Disclaimer Pill */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-8 text-[11px] font-sans tracking-widest text-ivory-400/80 uppercase bg-emerald-900/50 px-4 py-1.5 rounded-full border border-gold-metallic/20"
        >
          {weddingConfig.disclaimer.badgeText} • CREATED FOR SCREEN DISPLAY
        </motion.div>

        {/* Scroll down indicator */}
        <motion.a
          href="#countdown"
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2.2, ease: 'easeInOut' }}
          className="mt-12 text-gold-metallic/60 hover:text-gold-shimmer transition-colors p-2 flex flex-col items-center gap-1 cursor-pointer"
          aria-label="Scroll to Countdown"
        >
          <span className="text-[10px] font-sans tracking-[0.25em] uppercase">Scroll</span>
          <ChevronDown className="w-4 h-4" />
        </motion.a>
      </div>
    </section>
  );
};
