import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock } from 'lucide-react';
import { weddingConfig } from '../config/weddingConfig';

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export const CountdownTimer: React.FC = () => {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    const targetDate = new Date(weddingConfig.weddingDate.targetIso).getTime();

    const updateCountdown = () => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);

      setTimeLeft({ days, hours, minutes, seconds });
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, []);

  const timeUnits = [
    { label: 'Days', value: timeLeft.days },
    { label: 'Hours', value: timeLeft.hours },
    { label: 'Minutes', value: timeLeft.minutes },
    { label: 'Seconds', value: timeLeft.seconds },
  ];

  const handleAddToCalendar = () => {
    const title = encodeURIComponent("Justin & Ashley's Wedding Celebration");
    const details = encodeURIComponent("The Holy Matrimony & Royal Reception of Justin & Ashley at St. Jude's Royal Cathedral, Kottayam.");
    const location = encodeURIComponent("St. Jude's Royal Cathedral, Kottayam, Kerala");
    const dates = "20270214T043000Z/20270214T163000Z";
    const googleCalendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${dates}&details=${details}&location=${location}`;
    window.open(googleCalendarUrl, '_blank');
  };

  return (
    <section id="countdown" className="py-20 px-4 relative overflow-hidden bg-gradient-to-b from-emerald-950 via-[#061a14] to-emerald-950">
      {/* Subtle Divider Line */}
      <div className="max-w-xs mx-auto mb-16 flex items-center justify-center gap-4">
        <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent to-gold-metallic/40" />
        <span className="font-display text-gold-metallic/70 text-sm">✦ ✤ ✦</span>
        <div className="h-[1px] flex-1 bg-gradient-to-l from-transparent to-gold-metallic/40" />
      </div>

      <div className="max-w-4xl mx-auto text-center">
        <span className="text-[11px] font-sans tracking-[0.35em] uppercase text-gold-metallic/90">
          Counting Down To Forever
        </span>
        <h2 className="font-serif text-3xl sm:text-5xl font-normal text-ivory-100 tracking-wide mt-2 mb-3">
          Until We Say “I Do”
        </h2>
        <p className="font-serif italic text-gold-shimmer/80 text-lg max-w-lg mx-auto mb-12">
          {weddingConfig.weddingDate.dayOfWeek} • {weddingConfig.weddingDate.displayDate} • {weddingConfig.weddingDate.timeString}
        </p>

        {/* Live Dynamic Countdown Dial Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 max-w-3xl mx-auto mb-12">
          {timeUnits.map((unit, index) => (
            <motion.div
              key={unit.label}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="relative rounded-2xl p-5 sm:p-6 bg-gradient-to-b from-emerald-900/60 to-emerald-950/80 border border-gold-metallic/30 backdrop-blur-sm shadow-[0_10px_30px_rgba(0,0,0,0.5)] group hover:border-gold-metallic/60 transition-all"
            >
              {/* Corner accents */}
              <span className="absolute top-2 left-2 text-[8px] text-gold-metallic/40">✦</span>
              <span className="absolute top-2 right-2 text-[8px] text-gold-metallic/40">✦</span>

              <div className="flex flex-col items-center">
                <span className="font-serif text-4xl sm:text-6xl font-light tracking-tight text-transparent bg-clip-text bg-gradient-to-b from-gold-light via-gold-shimmer to-gold-warm">
                  {isClient ? String(unit.value).padStart(2, '0') : '--'}
                </span>
                <span className="text-[10px] sm:text-xs font-sans tracking-[0.25em] uppercase text-ivory-300/80 mt-2">
                  {unit.label}
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Add to Calendar Action */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="inline-flex flex-col sm:flex-row items-center gap-4"
        >
          <button
            onClick={handleAddToCalendar}
            type="button"
            className="flex items-center gap-2.5 px-6 py-3 rounded-full bg-emerald-900/80 border border-gold-metallic/50 text-gold-light hover:bg-gold-metallic hover:text-emerald-950 transition-all font-sans text-xs tracking-widest uppercase shadow-lg active:scale-95 group"
          >
            <Calendar className="w-4 h-4 text-gold-metallic group-hover:text-emerald-950 transition-colors" />
            <span>Add Event to Google Calendar</span>
          </button>

          <span className="text-xs font-sans text-ivory-400 flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5 text-gold-metallic/70" />
            <span>Ceremony commences 10:00 AM IST</span>
          </span>
        </motion.div>
      </div>
    </section>
  );
};
