import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Navigation, Compass, ExternalLink, Church, Palmtree, ShieldAlert } from 'lucide-react';
import { weddingConfig } from '../config/weddingConfig';

export const VenueSection: React.FC = () => {
  return (
    <section id="venue" className="py-24 px-4 relative overflow-hidden bg-gradient-to-b from-emerald-950 via-[#051711] to-emerald-950">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-gold-metallic/30 bg-gold-metallic/5 text-[10px] font-sans tracking-[0.3em] uppercase text-gold-shimmer mb-3">
            <MapPin className="w-3.5 h-3.5 text-gold-metallic" />
            <span>Sacred Spaces &amp; Banquets</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-5xl font-normal text-ivory-100 tracking-wide">
            Venues &amp; Directions
          </h2>
          <p className="font-serif italic text-gold-shimmer/80 text-lg mt-2">
            Nestled amid the tranquil church spires and emerald backwaters of Kerala.
          </p>
        </div>

        {/* Two Venue Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {/* Church Venue */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="rounded-3xl p-7 sm:p-8 bg-gradient-to-b from-emerald-900/40 to-emerald-950/80 border border-gold-metallic/30 shadow-xl flex flex-col justify-between"
          >
            <div>
              <div className="w-12 h-12 rounded-2xl bg-gold-metallic/10 border border-gold-metallic/30 flex items-center justify-center mb-5 text-gold-shimmer">
                <Church className="w-6 h-6" />
              </div>
              <span className="text-[10px] font-sans tracking-[0.3em] uppercase text-gold-metallic font-semibold">
                Solemn Ceremony Venue
              </span>
              <h3 className="font-serif text-3xl text-ivory-100 mt-1 mb-2">
                {weddingConfig.venue.church.name}
              </h3>
              <p className="font-sans text-xs sm:text-sm text-ivory-300/85 leading-relaxed mb-4">
                {weddingConfig.venue.church.address}, {weddingConfig.venue.church.city}, {weddingConfig.venue.church.state}
              </p>
              <div className="text-xs font-mono text-gold-shimmer/80 mb-6 flex items-center gap-2">
                <Compass className="w-3.5 h-3.5 text-gold-metallic" />
                <span>GPS: {weddingConfig.venue.church.coordinates}</span>
              </div>
            </div>

            <a
              href={weddingConfig.venue.church.directionsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full bg-emerald-900/60 border border-gold-metallic/40 text-gold-light hover:bg-gold-metallic hover:text-emerald-950 transition-all text-xs font-sans tracking-widest uppercase"
            >
              <Navigation className="w-3.5 h-3.5" />
              <span>Get Cathedral Directions</span>
              <ExternalLink className="w-3 h-3 ml-1 opacity-70" />
            </a>
          </motion.div>

          {/* Reception Venue */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="rounded-3xl p-7 sm:p-8 bg-gradient-to-b from-emerald-900/40 to-emerald-950/80 border border-gold-metallic/30 shadow-xl flex flex-col justify-between"
          >
            <div>
              <div className="w-12 h-12 rounded-2xl bg-gold-metallic/10 border border-gold-metallic/30 flex items-center justify-center mb-5 text-gold-shimmer">
                <Palmtree className="w-6 h-6" />
              </div>
              <span className="text-[10px] font-sans tracking-[0.3em] uppercase text-gold-metallic font-semibold">
                Feast &amp; Grand Gala Venue
              </span>
              <h3 className="font-serif text-3xl text-ivory-100 mt-1 mb-2">
                {weddingConfig.venue.reception.name}
              </h3>
              <p className="font-sans text-xs sm:text-sm text-ivory-300/85 leading-relaxed mb-4">
                {weddingConfig.venue.reception.address}, {weddingConfig.venue.reception.city}, {weddingConfig.venue.reception.state}
              </p>
              <div className="text-xs font-mono text-gold-shimmer/80 mb-6 flex items-center gap-2">
                <Compass className="w-3.5 h-3.5 text-gold-metallic" />
                <span>GPS: {weddingConfig.venue.reception.coordinates}</span>
              </div>
            </div>

            <a
              href={weddingConfig.venue.reception.directionsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full bg-emerald-900/60 border border-gold-metallic/40 text-gold-light hover:bg-gold-metallic hover:text-emerald-950 transition-all text-xs font-sans tracking-widest uppercase"
            >
              <Navigation className="w-3.5 h-3.5" />
              <span>Get Reception Directions</span>
              <ExternalLink className="w-3 h-3 ml-1 opacity-70" />
            </a>
          </motion.div>
        </div>

        {/* Stylized Dark Emerald Interactive Location Card */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="rounded-3xl p-6 sm:p-10 bg-gradient-to-br from-[#07241b] via-[#051711] to-emerald-950 border border-gold-metallic/25 shadow-2xl relative overflow-hidden"
        >
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="max-w-xl">
              <span className="text-[10px] font-sans tracking-[0.3em] uppercase text-gold-shimmer font-semibold">
                Travel &amp; Accommodation Advisory
              </span>
              <h4 className="font-serif text-2xl sm:text-3xl text-ivory-100 mt-1 mb-2">
                Arriving in God’s Own Country
              </h4>
              <p className="font-sans text-xs sm:text-sm text-ivory-300/80 leading-relaxed">
                Nearest Airport: Cochin International Airport (COK), approximately 75 minutes scenic drive. 
                Complimentary luxury houseboats and private shuttles will be staged for all guests arriving at Kumarakom docks.
              </p>
            </div>

            <div className="flex flex-col items-center sm:items-end text-center sm:text-right shrink-0">
              <span className="text-xs font-sans tracking-widest uppercase text-gold-metallic font-semibold">
                Concierge Desk
              </span>
              <span className="font-serif text-lg text-ivory-100">concierge@aura-wedding.demo</span>
              <span className="text-[10px] font-sans text-ivory-400 mt-1">Available 24/7 for guest hospitality</span>
            </div>
          </div>

          {/* Fictional demo note */}
          <div className="mt-8 pt-4 border-t border-white/5 flex items-center gap-2 text-[10px] text-ivory-400/70 font-sans tracking-wider uppercase">
            <ShieldAlert className="w-3.5 h-3.5 text-gold-metallic/50" />
            <span>Fictional Demonstration Venue Information • Prepared for artistic showcase</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
