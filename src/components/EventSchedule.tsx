import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, Church, UtensilsCrossed, Sparkles, GlassWater, Clock, MapPin, Shirt } from 'lucide-react';
import { weddingConfig, EventItem } from '../config/weddingConfig';

const iconMap: Record<string, React.ReactNode> = {
  Church: <Church className="w-5 h-5 text-gold-metallic" />,
  UtensilsCrossed: <UtensilsCrossed className="w-5 h-5 text-gold-metallic" />,
  Sparkles: <Sparkles className="w-5 h-5 text-gold-metallic" />,
  GlassWater: <GlassWater className="w-5 h-5 text-gold-metallic" />,
};

export const EventSchedule: React.FC = () => {
  return (
    <section id="schedule" className="py-24 px-4 relative overflow-hidden bg-gradient-to-b from-emerald-950 via-[#071f17] to-emerald-950">
      <div className="max-w-5xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-gold-metallic/30 bg-gold-metallic/5 text-[10px] font-sans tracking-[0.3em] uppercase text-gold-shimmer mb-3">
            <Calendar className="w-3.5 h-3.5 text-gold-metallic" />
            <span>Celebration Itinerary</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-5xl font-normal text-ivory-100 tracking-wide">
            The Wedding Day Schedule
          </h2>
          <p className="font-serif italic text-gold-shimmer/80 text-lg mt-2">
            Sunday, February 14, 2027 • An all-day feast of joy and blessings.
          </p>
        </div>

        {/* Timeline List */}
        <div className="relative border-l border-gold-metallic/30 ml-4 sm:ml-8 md:ml-32 pl-6 sm:pl-10 space-y-12">
          {weddingConfig.schedule.map((item: EventItem, index: number) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              className="relative group"
            >
              {/* Bullet Node */}
              <div className="absolute -left-[35px] sm:-left-[51px] top-1.5 w-7 h-7 sm:w-9 sm:h-9 rounded-full bg-emerald-950 border border-gold-metallic flex items-center justify-center shadow-[0_0_15px_rgba(212,175,55,0.3)] group-hover:bg-gold-metallic group-hover:text-emerald-950 transition-all">
                {iconMap[item.iconName] || <Sparkles className="w-4 h-4 text-gold-metallic" />}
              </div>

              {/* Card Container */}
              <div className="rounded-2xl p-6 sm:p-7 bg-gradient-to-br from-emerald-900/50 via-emerald-950/80 to-emerald-950 border border-gold-metallic/25 shadow-xl group-hover:border-gold-metallic/50 transition-all">
                {/* Time & Badges */}
                <div className="flex flex-wrap items-center justify-between gap-3 mb-2">
                  <span className="font-serif text-2xl text-gold-light tracking-wide flex items-center gap-2">
                    <Clock className="w-4 h-4 text-gold-metallic/80" />
                    <span>{item.time}</span>
                  </span>
                  <span className="text-[10px] font-sans tracking-[0.25em] uppercase px-3 py-1 rounded-full bg-emerald-900/80 border border-gold-metallic/20 text-gold-shimmer">
                    {item.subtitle}
                  </span>
                </div>

                <h3 className="font-serif text-2xl sm:text-3xl text-ivory-100 mt-1 mb-2">
                  {item.title}
                </h3>
                <p className="font-sans text-xs sm:text-sm text-ivory-300/85 leading-relaxed mb-4">
                  {item.description}
                </p>

                {/* Meta details: location & attire */}
                <div className="pt-4 border-t border-white/5 flex flex-wrap items-center gap-6 text-xs text-ivory-400 font-sans">
                  <div className="flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-gold-metallic" />
                    <span className="text-gold-light/90">{item.location}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Shirt className="w-3.5 h-3.5 text-gold-metallic" />
                    <span>Attire: <strong className="text-ivory-200 font-normal">{item.attire}</strong></span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
