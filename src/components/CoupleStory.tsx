import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Quote } from 'lucide-react';
import { weddingConfig } from '../config/weddingConfig';

export const CoupleStory: React.FC = () => {
  return (
    <section id="story" className="py-24 px-4 relative overflow-hidden bg-gradient-to-b from-emerald-950 via-[#071d16] to-emerald-950">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-[11px] font-sans tracking-[0.35em] uppercase text-gold-metallic/90">
            A Journey of Love &amp; Serendipity
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl font-normal text-ivory-100 tracking-wide mt-2">
            The Bride &amp; The Groom
          </h2>
          <div className="w-16 h-[1px] bg-gold-metallic/50 mx-auto mt-4" />
        </div>

        {/* Side-by-Side Editorial Profiles */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-16 items-center">
          {/* Groom Card */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="flex flex-col sm:flex-row items-center gap-6 p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-emerald-900/40 via-emerald-950/70 to-emerald-950 border border-gold-metallic/25 shadow-xl"
          >
            <div className="relative w-44 sm:w-48 aspect-[3/4] rounded-2xl overflow-hidden shrink-0 border border-gold-metallic/40 shadow-lg">
              <img
                src={weddingConfig.couple.groom.image}
                alt={weddingConfig.couple.groom.fullName}
                className="w-full h-full object-cover object-top hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-emerald-950/70 via-transparent to-transparent" />
            </div>
            <div className="flex-1 text-center sm:text-left">
              <span className="text-[10px] font-sans uppercase tracking-[0.3em] text-gold-metallic/90">
                {weddingConfig.couple.groom.title}
              </span>
              <h3 className="font-serif text-3xl text-gold-light mt-1 mb-3">
                {weddingConfig.couple.groom.fullName}
              </h3>
              <p className="font-sans text-xs sm:text-sm text-ivory-300/85 leading-relaxed">
                {weddingConfig.couple.groom.bio}
              </p>
              <div className="mt-4 pt-4 border-t border-white/5 flex items-center justify-center sm:justify-start gap-2 text-xs font-serif italic text-gold-shimmer/80">
                <Quote className="w-3.5 h-3.5 text-gold-metallic/50" />
                <span>“She taught me that happiness lives in simple days.”</span>
              </div>
            </div>
          </motion.div>

          {/* Bride Card */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="flex flex-col sm:flex-row items-center gap-6 p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-emerald-900/40 via-emerald-950/70 to-emerald-950 border border-gold-metallic/25 shadow-xl"
          >
            <div className="relative w-44 sm:w-48 aspect-[3/4] rounded-2xl overflow-hidden shrink-0 border border-gold-metallic/40 shadow-lg">
              <img
                src={weddingConfig.couple.bride.image}
                alt={weddingConfig.couple.bride.fullName}
                className="w-full h-full object-cover object-top hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-emerald-950/70 via-transparent to-transparent" />
            </div>
            <div className="flex-1 text-center sm:text-left">
              <span className="text-[10px] font-sans uppercase tracking-[0.3em] text-gold-metallic/90">
                {weddingConfig.couple.bride.title}
              </span>
              <h3 className="font-serif text-3xl text-gold-light mt-1 mb-3">
                {weddingConfig.couple.bride.fullName}
              </h3>
              <p className="font-sans text-xs sm:text-sm text-ivory-300/85 leading-relaxed">
                {weddingConfig.couple.bride.bio}
              </p>
              <div className="mt-4 pt-4 border-t border-white/5 flex items-center justify-center sm:justify-start gap-2 text-xs font-serif italic text-gold-shimmer/80">
                <Quote className="w-3.5 h-3.5 text-gold-metallic/50" />
                <span>“In his calm silence, my wildest dreams found a home.”</span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Romantic Narrative Centerpiece */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mt-16 max-w-3xl mx-auto p-8 rounded-3xl bg-gradient-to-b from-[#09251c] to-emerald-950/90 border border-gold-metallic/20 text-center relative shadow-2xl"
        >
          <span className="font-script text-4xl text-gold-shimmer block mb-2">Our Story</span>
          <p className="font-serif text-lg sm:text-xl text-ivory-200 leading-relaxed italic">
            “From quiet stolen looks across classroom corridors and rain-drenched bus stops in Kerala, 
            to years of patient dreaming and mutual steadfast devotion—ours was never a hurried love. 
            It was the tender kind that grew deep into the soil like an old mahogany tree, waiting for its season to bloom.”
          </p>
          <div className="mt-6 flex items-center justify-center gap-2 text-gold-metallic text-xs font-sans tracking-[0.25em] uppercase">
            <Heart className="w-3.5 h-3.5 fill-gold-metallic" />
            <span>Kottayam to Kumarakom • Forever Bound</span>
            <Heart className="w-3.5 h-3.5 fill-gold-metallic" />
          </div>
        </motion.div>
      </div>
    </section>
  );
};
