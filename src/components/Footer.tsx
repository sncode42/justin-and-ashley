import React from 'react';
import { Heart, ArrowUp, ShieldAlert } from 'lucide-react';
import { weddingConfig } from '../config/weddingConfig';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="pt-16 pb-12 px-4 relative overflow-hidden bg-emerald-950 border-t border-gold-metallic/20 text-center">
      <div className="max-w-4xl mx-auto flex flex-col items-center">
        {/* Monogram */}
        <div className="w-12 h-12 rounded-full border border-gold-metallic/40 flex items-center justify-center bg-gold-metallic/10 mb-4 shadow-[0_0_15px_rgba(212,175,55,0.15)]">
          <span className="font-display text-gold-light text-base tracking-widest">J✦A</span>
        </div>

        <h3 className="font-serif text-2xl sm:text-3xl tracking-[0.2em] text-gold-light uppercase mb-2">
          JUSTIN &amp; ASHLEY
        </h3>
        <p className="font-serif italic text-gold-shimmer/80 text-sm mb-6">
          “A Beautiful Beginning • February 14, 2027”
        </p>

        {/* Fictional Fan-made Clear Disclaimer Card */}
        <div className="max-w-xl p-5 rounded-2xl bg-emerald-900/40 border border-gold-metallic/20 text-xs font-sans text-ivory-300/80 leading-relaxed space-y-2 mb-8">
          <div className="flex items-center justify-center gap-2 text-gold-metallic font-semibold tracking-wider uppercase text-[10px]">
            <ShieldAlert className="w-4 h-4 text-gold-metallic" />
            <span>{weddingConfig.disclaimer.badgeText}</span>
          </div>
          <p>{weddingConfig.disclaimer.subText}</p>
          <p className="text-[10px] text-ivory-400/60">{weddingConfig.disclaimer.attribution}</p>
        </div>

        {/* Back to top button */}
        <button
          onClick={scrollToTop}
          type="button"
          className="flex items-center gap-2 px-5 py-2 rounded-full border border-gold-metallic/30 text-gold-light hover:border-gold-metallic hover:bg-gold-metallic/10 transition-all text-xs font-sans tracking-widest uppercase mb-8"
        >
          <span>Back to Top</span>
          <ArrowUp className="w-3.5 h-3.5" />
        </button>

        <div className="pt-6 border-t border-white/5 w-full flex flex-col sm:flex-row items-center justify-between text-[11px] font-sans text-ivory-400/60 gap-3">
          <span>&copy; 2027 AURA Wedding Experience • All Rights Reserved.</span>
          <span className="flex items-center gap-1">
            Handcrafted with <Heart className="w-3 h-3 fill-gold-metallic text-gold-metallic mx-0.5" /> for cinema lovers
          </span>
        </div>
      </div>
    </footer>
  );
};
