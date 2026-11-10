import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Maximize2, X, ChevronLeft, ChevronRight, Camera } from 'lucide-react';
import { weddingConfig, GalleryPhoto } from '../config/weddingConfig';

export const EditorialGallery: React.FC = () => {
  const [selectedPhoto, setSelectedPhoto] = useState<GalleryPhoto | null>(null);
  const [selectedIndex, setSelectedIndex] = useState<number>(0);

  const photos = weddingConfig.gallery;

  const openLightbox = (photo: GalleryPhoto, index: number) => {
    setSelectedPhoto(photo);
    setSelectedIndex(index);
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = useCallback(() => {
    setSelectedPhoto(null);
    document.body.style.overflow = 'auto';
  }, []);

  const nextPhoto = useCallback(() => {
    setSelectedIndex((prev) => {
      const next = (prev + 1) % photos.length;
      setSelectedPhoto(photos[next]);
      return next;
    });
  }, [photos]);

  const prevPhoto = useCallback(() => {
    setSelectedIndex((prev) => {
      const next = (prev - 1 + photos.length) % photos.length;
      setSelectedPhoto(photos[next]);
      return next;
    });
  }, [photos]);

  // Keyboard navigation for Lightbox
  useEffect(() => {
    if (!selectedPhoto) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowRight') nextPhoto();
      if (e.key === 'ArrowLeft') prevPhoto();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedPhoto, closeLightbox, nextPhoto, prevPhoto]);

  return (
    <section id="gallery" className="py-24 px-4 relative overflow-hidden bg-gradient-to-b from-emerald-950 via-[#051812] to-emerald-950">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-gold-metallic/30 bg-gold-metallic/5 text-[10px] font-sans tracking-[0.3em] uppercase text-gold-shimmer mb-3">
            <Camera className="w-3 h-3 text-gold-metallic" />
            <span>Editorial Romance</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-5xl font-normal text-ivory-100 tracking-wide">
            Moments In Time
          </h2>
          <p className="font-serif italic text-gold-shimmer/80 text-lg mt-2">
            Captured unscripted, remembered for an eternity.
          </p>
        </div>

        {/* Asymmetric Editorial Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-stretch">
          {/* Photo 0: Traditional Full Heritage (Span 7 cols) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            onClick={() => openLightbox(photos[0], 0)}
            className="md:col-span-7 relative group cursor-pointer overflow-hidden rounded-3xl border border-gold-metallic/30 bg-emerald-900/40 shadow-xl min-h-[460px] flex flex-col justify-end p-6 sm:p-8"
          >
            <img
              src={photos[0].src}
              alt={photos[0].title}
              className="absolute inset-0 w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-emerald-950 via-emerald-950/40 to-transparent opacity-85 group-hover:opacity-75 transition-opacity" />

            <div className="relative z-10">
              <span className="text-[10px] font-sans uppercase tracking-[0.3em] text-gold-metallic font-semibold">
                {photos[0].tag}
              </span>
              <h3 className="font-serif text-3xl sm:text-4xl text-ivory-100 mt-1 mb-2">
                {photos[0].title}
              </h3>
              <p className="font-sans text-xs sm:text-sm text-ivory-300/90 max-w-lg leading-relaxed">
                {photos[0].caption}
              </p>
            </div>

            <div className="absolute top-5 right-5 w-9 h-9 rounded-full bg-emerald-950/80 border border-gold-metallic/40 flex items-center justify-center text-gold-shimmer opacity-0 group-hover:opacity-100 transition-opacity">
              <Maximize2 className="w-4 h-4" />
            </div>
          </motion.div>

          {/* Photo 1: Candid Window Laughter (Span 5 cols) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            onClick={() => openLightbox(photos[1], 1)}
            className="md:col-span-5 relative group cursor-pointer overflow-hidden rounded-3xl border border-gold-metallic/30 bg-emerald-900/40 shadow-xl min-h-[460px] flex flex-col justify-end p-6 sm:p-8"
          >
            <img
              src={photos[1].src}
              alt={photos[1].title}
              className="absolute inset-0 w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-emerald-950 via-emerald-950/40 to-transparent opacity-85 group-hover:opacity-75 transition-opacity" />

            <div className="relative z-10">
              <span className="text-[10px] font-sans uppercase tracking-[0.3em] text-gold-metallic font-semibold">
                {photos[1].tag}
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl text-ivory-100 mt-1 mb-2">
                {photos[1].title}
              </h3>
              <p className="font-sans text-xs text-ivory-300/90 leading-relaxed">
                {photos[1].caption}
              </p>
            </div>

            <div className="absolute top-5 right-5 w-9 h-9 rounded-full bg-emerald-950/80 border border-gold-metallic/40 flex items-center justify-center text-gold-shimmer opacity-0 group-hover:opacity-100 transition-opacity">
              <Maximize2 className="w-4 h-4" />
            </div>
          </motion.div>

          {/* Photo 2: Outdoor Landscape (Span 12 cols wide editorial) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            onClick={() => openLightbox(photos[2], 2)}
            className="md:col-span-12 relative group cursor-pointer overflow-hidden rounded-3xl border border-gold-metallic/30 bg-emerald-900/40 shadow-xl min-h-[420px] sm:min-h-[480px] flex flex-col justify-end p-6 sm:p-10"
          >
            <img
              src={photos[2].src}
              alt={photos[2].title}
              className="absolute inset-0 w-full h-full object-cover object-[center_35%] transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-emerald-950 via-emerald-950/35 to-transparent opacity-90 group-hover:opacity-75 transition-opacity" />

            <div className="relative z-10 max-w-2xl">
              <span className="text-[10px] font-sans uppercase tracking-[0.3em] text-gold-metallic font-semibold">
                {photos[2].tag}
              </span>
              <h3 className="font-serif text-3xl sm:text-5xl text-ivory-100 mt-1 mb-3">
                {photos[2].title}
              </h3>
              <p className="font-sans text-xs sm:text-sm text-ivory-300 leading-relaxed">
                {photos[2].caption}
              </p>
            </div>

            <div className="absolute top-5 right-5 w-9 h-9 rounded-full bg-emerald-950/80 border border-gold-metallic/40 flex items-center justify-center text-gold-shimmer opacity-0 group-hover:opacity-100 transition-opacity">
              <Maximize2 className="w-4 h-4" />
            </div>
          </motion.div>

          {/* Photo 3: Groom Solo (Span 6 cols) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            onClick={() => openLightbox(photos[3], 3)}
            className="md:col-span-6 relative group cursor-pointer overflow-hidden rounded-3xl border border-gold-metallic/30 bg-emerald-900/40 shadow-xl min-h-[380px] flex flex-col justify-end p-6 sm:p-8"
          >
            <img
              src={photos[3].src}
              alt={photos[3].title}
              className="absolute inset-0 w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-emerald-950 via-emerald-950/40 to-transparent opacity-85 group-hover:opacity-75 transition-opacity" />

            <div className="relative z-10">
              <span className="text-[10px] font-sans uppercase tracking-[0.3em] text-gold-metallic font-semibold">
                {photos[3].tag}
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl text-ivory-100 mt-1 mb-1">
                {photos[3].title}
              </h3>
              <p className="font-sans text-xs text-ivory-300/90 leading-relaxed">
                {photos[3].caption}
              </p>
            </div>

            <div className="absolute top-5 right-5 w-9 h-9 rounded-full bg-emerald-950/80 border border-gold-metallic/40 flex items-center justify-center text-gold-shimmer opacity-0 group-hover:opacity-100 transition-opacity">
              <Maximize2 className="w-4 h-4" />
            </div>
          </motion.div>

          {/* Photo 4: Bride Solo (Span 6 cols) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            onClick={() => openLightbox(photos[4], 4)}
            className="md:col-span-6 relative group cursor-pointer overflow-hidden rounded-3xl border border-gold-metallic/30 bg-emerald-900/40 shadow-xl min-h-[380px] flex flex-col justify-end p-6 sm:p-8"
          >
            <img
              src={photos[4].src}
              alt={photos[4].title}
              className="absolute inset-0 w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-emerald-950 via-emerald-950/40 to-transparent opacity-85 group-hover:opacity-75 transition-opacity" />

            <div className="relative z-10">
              <span className="text-[10px] font-sans uppercase tracking-[0.3em] text-gold-metallic font-semibold">
                {photos[4].tag}
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl text-ivory-100 mt-1 mb-1">
                {photos[4].title}
              </h3>
              <p className="font-sans text-xs text-ivory-300/90 leading-relaxed">
                {photos[4].caption}
              </p>
            </div>

            <div className="absolute top-5 right-5 w-9 h-9 rounded-full bg-emerald-950/80 border border-gold-metallic/40 flex items-center justify-center text-gold-shimmer opacity-0 group-hover:opacity-100 transition-opacity">
              <Maximize2 className="w-4 h-4" />
            </div>
          </motion.div>
        </div>
      </div>

      {/* Expandable Photo Viewer (Lightbox Modal) */}
      <AnimatePresence>
        {selectedPhoto && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            role="dialog"
            aria-modal="true"
            aria-label={selectedPhoto.title}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-xl p-4 sm:p-8"
          >
            {/* Close Button */}
            <button
              onClick={closeLightbox}
              type="button"
              className="absolute top-6 right-6 z-50 p-3 rounded-full bg-emerald-950/80 border border-gold-metallic/40 text-gold-light hover:bg-gold-metallic hover:text-emerald-950 transition-all"
              aria-label="Close photo viewer"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Previous Button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                prevPhoto();
              }}
              type="button"
              className="absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 z-50 p-3 rounded-full bg-emerald-950/80 border border-gold-metallic/40 text-gold-light hover:bg-gold-metallic hover:text-emerald-950 transition-all"
              aria-label="Previous photograph"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            {/* Next Button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                nextPhoto();
              }}
              type="button"
              className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 z-50 p-3 rounded-full bg-emerald-950/80 border border-gold-metallic/40 text-gold-light hover:bg-gold-metallic hover:text-emerald-950 transition-all"
              aria-label="Next photograph"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            {/* Expanded Content */}
            <motion.div
              key={selectedPhoto.id}
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.92, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="relative max-w-4xl max-h-[85vh] w-full flex flex-col items-center"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative rounded-2xl overflow-hidden border border-gold-metallic/40 shadow-2xl max-h-[70vh]">
                <img
                  src={selectedPhoto.src}
                  alt={selectedPhoto.title}
                  className="w-full h-full object-contain max-h-[70vh]"
                />
              </div>

              {/* Caption Card */}
              <div className="mt-5 text-center max-w-xl">
                <span className="text-[10px] font-sans tracking-[0.3em] uppercase text-gold-metallic">
                  {selectedPhoto.tag} • {selectedIndex + 1} of {photos.length}
                </span>
                <h4 className="font-serif text-2xl text-ivory-100 mt-1 mb-2">
                  {selectedPhoto.title}
                </h4>
                <p className="font-sans text-xs sm:text-sm text-ivory-300 leading-relaxed">
                  {selectedPhoto.caption}
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
