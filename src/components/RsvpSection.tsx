import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Send, CheckCircle2, Heart, X, User, Mail, Users, Utensils, MessageSquare } from 'lucide-react';
import { audioEngine } from '../utils/audio';

export const RsvpSection: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    attendance: 'accept', // 'accept' | 'decline'
    guests: '2',
    dietary: 'traditional-sadya',
    blessing: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedData, setSubmittedData] = useState<typeof formData | null>(null);

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!formData.name.trim()) {
      errs.name = 'Please provide your full guest name.';
    }
    if (!formData.email.trim() || !/\S+@\S+\.\S+/.test(formData.email)) {
      errs.email = 'Please provide a valid email address.';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setSubmittedData({ ...formData });

      // Celebration effects
      audioEngine.playRevealChime();
      try {
        confetti({
          particleCount: 60,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#f8e7b9', '#d4af37', '#ffffff', '#caa03d'],
          disableForReducedMotion: true,
        });
      } catch {
        // Ignored
      }
    }, 600);
  };

  return (
    <section id="rsvp" className="py-24 px-4 relative overflow-hidden bg-gradient-to-b from-emerald-950 via-[#061812] to-emerald-950">
      <div className="max-w-3xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-gold-metallic/30 bg-gold-metallic/5 text-[10px] font-sans tracking-[0.3em] uppercase text-gold-shimmer mb-3">
            <Send className="w-3.5 h-3.5 text-gold-metallic" />
            <span>Celebrate With Us</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-5xl font-normal text-ivory-100 tracking-wide">
            Kindly Respond
          </h2>
          <p className="font-serif italic text-gold-shimmer/80 text-lg mt-2">
            Please reply by January 15, 2027 so we may reserve your seat at the royal banquet.
          </p>
        </div>

        {/* RSVP Card Form */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="relative rounded-3xl p-6 sm:p-10 bg-gradient-to-b from-emerald-900/60 via-emerald-950/90 to-emerald-950 border border-gold-metallic/35 shadow-[0_25px_60px_rgba(0,0,0,0.8)]"
        >
          {/* Inner filigree inset */}
          <div className="absolute inset-2 sm:inset-3 rounded-2xl border border-gold-metallic/20 pointer-events-none" />

          <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
            {/* Attendance Choice Buttons */}
            <div>
              <label className="block text-xs uppercase font-sans tracking-[0.25em] text-gold-light mb-3 text-center sm:text-left">
                Will you be attending our celebration?
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, attendance: 'accept' })}
                  className={`flex items-center justify-center gap-2 py-3 px-4 rounded-xl border text-xs font-sans tracking-widest uppercase transition-all ${
                    formData.attendance === 'accept'
                      ? 'bg-gradient-to-r from-gold-warm via-gold-metallic to-gold-shimmer text-emerald-950 font-bold border-gold-shimmer shadow-lg'
                      : 'bg-emerald-950/60 border-gold-metallic/30 text-ivory-300 hover:border-gold-metallic'
                  }`}
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Joyfully Accepts</span>
                </button>

                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, attendance: 'decline' })}
                  className={`flex items-center justify-center gap-2 py-3 px-4 rounded-xl border text-xs font-sans tracking-widest uppercase transition-all ${
                    formData.attendance === 'decline'
                      ? 'bg-burgundy-900/80 border-rose-400 text-rose-200 font-bold shadow-lg'
                      : 'bg-emerald-950/60 border-gold-metallic/30 text-ivory-300 hover:border-gold-metallic'
                  }`}
                >
                  <Heart className="w-4 h-4" />
                  <span>Regretfully Declines</span>
                </button>
              </div>
            </div>

            {/* Guest Name & Email */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label htmlFor="rsvp-name" className="block text-xs uppercase font-sans tracking-[0.2em] text-ivory-300 mb-2">
                  Full Guest Name *
                </label>
                <div className="relative">
                  <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gold-metallic/70" />
                  <input
                    id="rsvp-name"
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Dr. Matthew &amp; Family"
                    className="w-full pl-10 pr-4 py-3 rounded-xl bg-emerald-950/80 border border-gold-metallic/30 text-ivory-100 placeholder:text-ivory-400/40 text-sm focus:outline-none focus:border-gold-metallic transition-colors"
                  />
                </div>
                {errors.name && <p className="text-xs text-rose-400 mt-1">{errors.name}</p>}
              </div>

              <div>
                <label htmlFor="rsvp-email" className="block text-xs uppercase font-sans tracking-[0.2em] text-ivory-300 mb-2">
                  Email Address *
                </label>
                <div className="relative">
                  <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gold-metallic/70" />
                  <input
                    id="rsvp-email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="matthew@example.com"
                    className="w-full pl-10 pr-4 py-3 rounded-xl bg-emerald-950/80 border border-gold-metallic/30 text-ivory-100 placeholder:text-ivory-400/40 text-sm focus:outline-none focus:border-gold-metallic transition-colors"
                  />
                </div>
                {errors.email && <p className="text-xs text-rose-400 mt-1">{errors.email}</p>}
              </div>
            </div>

            {/* Guest Count & Dietary Preference */}
            {formData.attendance === 'accept' && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label htmlFor="rsvp-guests" className="block text-xs uppercase font-sans tracking-[0.2em] text-ivory-300 mb-2">
                    Party Size (Attending)
                  </label>
                  <div className="relative">
                    <Users className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gold-metallic/70" />
                    <select
                      id="rsvp-guests"
                      value={formData.guests}
                      onChange={(e) => setFormData({ ...formData, guests: e.target.value })}
                      className="w-full pl-10 pr-4 py-3 rounded-xl bg-emerald-950/80 border border-gold-metallic/30 text-ivory-100 text-sm focus:outline-none focus:border-gold-metallic transition-colors"
                    >
                      <option value="1">1 Guest</option>
                      <option value="2">2 Guests (Couple)</option>
                      <option value="3">3 Guests (Family)</option>
                      <option value="4">4 Guests (Family)</option>
                      <option value="5">5+ Guests</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label htmlFor="rsvp-dietary" className="block text-xs uppercase font-sans tracking-[0.2em] text-ivory-300 mb-2">
                    Banquet Preference
                  </label>
                  <div className="relative">
                    <Utensils className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gold-metallic/70" />
                    <select
                      id="rsvp-dietary"
                      value={formData.dietary}
                      onChange={(e) => setFormData({ ...formData, dietary: e.target.value })}
                      className="w-full pl-10 pr-4 py-3 rounded-xl bg-emerald-950/80 border border-gold-metallic/30 text-ivory-100 text-sm focus:outline-none focus:border-gold-metallic transition-colors"
                    >
                      <option value="traditional-sadya">Authentic Kerala Sadya (Pure Vegetarian)</option>
                      <option value="coastal-feast">Royal Kerala Coastal Feast (Seafood &amp; Poultry)</option>
                      <option value="continental">Continental &amp; Vegan Special</option>
                      <option value="jain-gluten-free">Jain &amp; Gluten-Free Delicate</option>
                    </select>
                  </div>
                </div>
              </div>
            )}

            {/* Blessing Note */}
            <div>
              <label htmlFor="rsvp-blessing" className="block text-xs uppercase font-sans tracking-[0.2em] text-ivory-300 mb-2">
                Warm Blessings &amp; Words for Justin &amp; Ashley
              </label>
              <div className="relative">
                <MessageSquare className="absolute left-3.5 top-3.5 w-4 h-4 text-gold-metallic/70" />
                <textarea
                  id="rsvp-blessing"
                  rows={3}
                  value={formData.blessing}
                  onChange={(e) => setFormData({ ...formData, blessing: e.target.value })}
                  placeholder="Share your prayers, memories, or song requests for the evening gala..."
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-emerald-950/80 border border-gold-metallic/30 text-ivory-100 placeholder:text-ivory-400/40 text-sm focus:outline-none focus:border-gold-metallic transition-colors resize-none"
                />
              </div>
            </div>

            {/* Submit Action Button */}
            <div className="pt-2 text-center">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full sm:w-auto min-w-[240px] px-8 py-3.5 rounded-full bg-gradient-to-r from-gold-warm via-gold-metallic to-gold-shimmer text-emerald-950 font-sans font-bold text-xs uppercase tracking-[0.25em] shadow-[0_0_25px_rgba(212,175,55,0.4)] hover:shadow-[0_0_40px_rgba(212,175,55,0.6)] transition-all active:scale-95 disabled:opacity-50"
              >
                {isSubmitting ? 'Transmitting Response...' : 'Send RSVP Confirmation'}
              </button>
            </div>
          </form>
        </motion.div>
      </div>

      {/* Confirmation Modal Receipt */}
      <AnimatePresence>
        {submittedData && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-4"
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="relative max-w-md w-full rounded-3xl p-8 bg-gradient-to-b from-[#0e3126] to-[#04120e] border border-gold-metallic/40 shadow-2xl text-center"
            >
              <button
                onClick={() => setSubmittedData(null)}
                className="absolute top-4 right-4 p-2 text-gold-light hover:text-gold-shimmer"
                aria-label="Close dialog"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="w-14 h-14 rounded-full bg-gold-metallic/15 border border-gold-metallic/50 flex items-center justify-center mx-auto mb-4 text-gold-shimmer">
                <CheckCircle2 className="w-7 h-7 text-gold-metallic" />
              </div>

              <span className="text-[10px] font-sans tracking-[0.3em] uppercase text-gold-metallic">
                RSVP Reception Confirmed
              </span>
              <h3 className="font-serif text-3xl text-ivory-100 mt-1 mb-2">
                Thank You, {submittedData.name}!
              </h3>
              <p className="font-sans text-xs text-ivory-300 leading-relaxed mb-6">
                {submittedData.attendance === 'accept'
                  ? `Your presence for ${submittedData.guests} guest(s) has been joyfully reserved for February 14, 2027. We cannot wait to celebrate with you!`
                  : `Your warm blessings have been conveyed to Justin & Ashley. You will be fondly missed!`}
              </p>

              <div className="p-4 rounded-xl bg-emerald-950/90 border border-gold-metallic/20 text-left text-xs space-y-1 mb-6 font-mono text-gold-shimmer/90">
                <p>Status: <span className="text-ivory-100 font-sans">{submittedData.attendance === 'accept' ? 'Confirmed Attending' : 'Respectfully Declined'}</span></p>
                <p>Pass Code: <span className="text-ivory-100 font-sans">JA-2027-FEAST</span></p>
                <p>Notification: <span className="text-ivory-100 font-sans">{submittedData.email}</span></p>
              </div>

              <button
                onClick={() => setSubmittedData(null)}
                className="w-full py-3 rounded-full bg-gradient-to-r from-gold-metallic to-gold-shimmer text-emerald-950 font-sans font-semibold text-xs uppercase tracking-widest"
              >
                Return to Invitation
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
