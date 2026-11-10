import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, Sparkles, Menu, X, Calendar } from 'lucide-react';
import { audioEngine } from '../utils/audio';

interface NavbarProps {
  onResetScratch: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onResetScratch }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMuted, setIsMuted] = useState(audioEngine.getMuted());
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleSound = () => {
    const muted = audioEngine.toggleMute();
    setIsMuted(muted);
  };

  const navLinks = [
    { name: 'The Couple', href: '#couple' },
    { name: 'Countdown', href: '#countdown' },
    { name: 'Story', href: '#story' },
    { name: 'Gallery', href: '#gallery' },
    { name: 'Film', href: '#film' },
    { name: 'Schedule', href: '#schedule' },
    { name: 'Venue', href: '#venue' },
    { name: 'RSVP', href: '#rsvp' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
        isScrolled
          ? 'bg-emerald-950/90 backdrop-blur-md py-3 border-b border-gold-metallic/20 shadow-xl'
          : 'bg-gradient-to-b from-emerald-950/80 via-emerald-950/40 to-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Monogram Brand */}
        <a href="#hero" className="flex items-center gap-2.5 group">
          <div className="w-9 h-9 rounded-full border border-gold-metallic/40 flex items-center justify-center bg-gold-metallic/10 group-hover:border-gold-metallic transition-all shadow-[0_0_12px_rgba(212,175,55,0.2)]">
            <span className="font-display text-gold-light text-sm font-semibold tracking-widest">J✦A</span>
          </div>
          <div className="flex flex-col">
            <span className="font-serif text-lg tracking-[0.2em] text-gold-light group-hover:text-gold-shimmer transition-colors">
              A U R A
            </span>
            <span className="text-[9px] font-sans tracking-[0.25em] text-gold-metallic/70 uppercase">
              Justin &amp; Ashley
            </span>
          </div>
        </a>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-7">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-xs uppercase font-sans tracking-[0.2em] text-ivory-300 hover:text-gold-shimmer transition-colors relative group py-1"
            >
              {link.name}
              <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-gold-metallic transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
        </nav>

        {/* Action Controls */}
        <div className="flex items-center gap-3">
          {/* Audio toggle button */}
          <button
            onClick={toggleSound}
            type="button"
            aria-label={isMuted ? "Unmute music" : "Mute music"}
            className="p-2 rounded-full border border-gold-metallic/30 bg-emerald-900/60 text-gold-light hover:border-gold-metallic hover:bg-gold-metallic/15 transition-all text-xs"
            title={isMuted ? "Audio Muted" : "Audio Active"}
          >
            {isMuted ? <VolumeX className="w-4 h-4 text-rose-300" /> : <Volume2 className="w-4 h-4 text-gold-metallic" />}
          </button>

          {/* Re-scratch Experience Button */}
          <button
            onClick={onResetScratch}
            type="button"
            className="hidden sm:inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-gold-metallic/40 bg-gold-metallic/10 hover:bg-gold-metallic/25 text-gold-light text-[11px] font-sans tracking-widest uppercase transition-all shadow-md active:scale-95"
            title="Replay the scratch card experience"
          >
            <Sparkles className="w-3.5 h-3.5 text-gold-metallic" />
            <span>Re-Scratch</span>
          </button>

          {/* RSVP Button */}
          <a
            href="#rsvp"
            className="hidden md:inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-gold-warm via-gold-metallic to-gold-shimmer text-emerald-950 font-sans font-semibold text-xs tracking-wider uppercase transition-all hover:shadow-[0_0_20px_rgba(212,175,55,0.4)] active:scale-95"
          >
            <Calendar className="w-3.5 h-3.5 text-emerald-950" />
            <span>RSVP</span>
          </a>

          {/* Mobile menu hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            type="button"
            className="lg:hidden p-2 rounded-md text-gold-light border border-gold-metallic/30"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-emerald-950/95 backdrop-blur-xl border-b border-gold-metallic/20 px-6 py-5 space-y-4">
          <div className="flex flex-col space-y-3">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-sm uppercase font-sans tracking-[0.2em] text-ivory-200 hover:text-gold-shimmer py-1.5 border-b border-white/5"
              >
                {link.name}
              </a>
            ))}
          </div>
          <div className="pt-2 flex flex-col gap-2.5">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onResetScratch();
              }}
              type="button"
              className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg border border-gold-metallic/40 text-gold-light text-xs font-sans tracking-widest uppercase bg-gold-metallic/10"
            >
              <Sparkles className="w-3.5 h-3.5 text-gold-metallic" />
              <span>Re-Scratch Card</span>
            </button>
            <a
              href="#rsvp"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-gradient-to-r from-gold-metallic to-gold-shimmer text-emerald-950 text-xs font-sans font-semibold tracking-widest uppercase shadow-md"
            >
              <span>Confirm Attendance (RSVP)</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
