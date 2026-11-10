import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Play, Pause, Volume2, VolumeX, Maximize, Film } from 'lucide-react';
import { weddingConfig } from '../config/weddingConfig';

export const WeddingFilm: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [showControls, setShowControls] = useState(true);

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play();
      setIsPlaying(true);
    }
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  const handleTimeUpdate = () => {
    if (!videoRef.current) return;
    setCurrentTime(videoRef.current.currentTime);
  };

  const handleLoadedMetadata = () => {
    if (!videoRef.current) return;
    setDuration(videoRef.current.duration);
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const time = parseFloat(e.target.value);
    if (!videoRef.current) return;
    videoRef.current.currentTime = time;
    setCurrentTime(time);
  };

  const toggleFullscreen = () => {
    if (!videoRef.current) return;
    if (document.fullscreenElement) {
      document.exitFullscreen();
    } else {
      videoRef.current.parentElement?.requestFullscreen();
    }
  };

  const formatTime = (timeInSeconds: number) => {
    if (isNaN(timeInSeconds)) return '0:00';
    const mins = Math.floor(timeInSeconds / 60);
    const secs = Math.floor(timeInSeconds % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  return (
    <section id="film" className="py-24 px-4 relative overflow-hidden bg-gradient-to-b from-emerald-950 via-[#061c15] to-emerald-950">
      <div className="max-w-5xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-gold-metallic/30 bg-gold-metallic/5 text-[10px] font-sans tracking-[0.3em] uppercase text-gold-shimmer mb-3">
            <Film className="w-3.5 h-3.5 text-gold-metallic" />
            <span>Cinematic Film</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-5xl font-normal text-ivory-100 tracking-wide">
            Love In Motion
          </h2>
          <p className="font-serif italic text-gold-shimmer/80 text-lg mt-2">
            A glimpse into the laughter and gentle warmth of Justin &amp; Ashley.
          </p>
        </div>

        {/* Video Player Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative rounded-3xl p-3 sm:p-5 bg-gradient-to-b from-emerald-900/60 via-emerald-950 to-emerald-950 border border-gold-metallic/30 shadow-[0_20px_60px_rgba(0,0,0,0.8)] group"
          onMouseEnter={() => setShowControls(true)}
          onMouseLeave={() => isPlaying && setShowControls(false)}
        >
          {/* Inner Inset Border */}
          <div className="absolute inset-2 sm:inset-3 rounded-2xl border border-gold-metallic/20 pointer-events-none" />

          {/* Video Container */}
          <div className="relative rounded-xl overflow-hidden aspect-video bg-black/80 flex items-center justify-center">
            <video
              ref={videoRef}
              src={weddingConfig.videoAsset.src}
              poster={weddingConfig.videoAsset.poster}
              onTimeUpdate={handleTimeUpdate}
              onLoadedMetadata={handleLoadedMetadata}
              onEnded={() => setIsPlaying(false)}
              className="w-full h-full object-cover"
              playsInline
              preload="metadata"
            />

            {/* Play Button Overlay (when paused) */}
            {!isPlaying && (
              <div
                onClick={togglePlay}
                className="absolute inset-0 bg-black/40 backdrop-blur-[2px] flex flex-col items-center justify-center cursor-pointer group-hover:bg-black/30 transition-all z-20"
              >
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-20 h-20 rounded-full bg-gradient-to-tr from-gold-warm via-gold-metallic to-gold-shimmer flex items-center justify-center text-emerald-950 shadow-[0_0_35px_rgba(212,175,55,0.5)] pl-1"
                >
                  <Play className="w-8 h-8 fill-emerald-950" />
                </motion.div>
                <span className="font-serif text-ivory-100 text-xl tracking-wider mt-4 drop-shadow">
                  {weddingConfig.videoAsset.title}
                </span>
                <span className="text-[11px] font-sans tracking-[0.25em] uppercase text-gold-shimmer/90 mt-1">
                  Click to play with sound
                </span>
              </div>
            )}

            {/* Custom Control Bar */}
            <div
              className={`absolute bottom-0 inset-x-0 p-4 sm:p-6 bg-gradient-to-t from-black/90 via-black/50 to-transparent flex flex-col gap-2 transition-opacity duration-300 z-30 ${
                showControls || !isPlaying ? 'opacity-100' : 'opacity-0 pointer-events-none'
              }`}
            >
              {/* Progress Scrubber */}
              <input
                type="range"
                min="0"
                max={duration || 100}
                value={currentTime}
                onChange={handleSeek}
                className="w-full h-1 bg-white/20 rounded-lg appearance-none cursor-pointer accent-gold-metallic"
                aria-label="Video scrubber timeline"
              />

              <div className="flex items-center justify-between text-xs text-ivory-200 font-sans pt-1">
                <div className="flex items-center gap-3">
                  <button
                    onClick={togglePlay}
                    type="button"
                    className="p-1.5 rounded-full hover:text-gold-shimmer transition-colors"
                    aria-label={isPlaying ? "Pause video" : "Play video"}
                  >
                    {isPlaying ? <Pause className="w-5 h-5 fill-current" /> : <Play className="w-5 h-5 fill-current" />}
                  </button>

                  <button
                    onClick={toggleMute}
                    type="button"
                    className="p-1.5 rounded-full hover:text-gold-shimmer transition-colors"
                    aria-label={isMuted ? "Unmute video" : "Mute video"}
                  >
                    {isMuted ? <VolumeX className="w-5 h-5 text-rose-300" /> : <Volume2 className="w-5 h-5" />}
                  </button>

                  <span className="text-[11px] text-ivory-300 font-mono tracking-wider">
                    {formatTime(currentTime)} / {formatTime(duration)}
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <span className="text-[10px] uppercase font-sans tracking-[0.2em] text-gold-metallic/80 hidden sm:inline">
                    {weddingConfig.videoAsset.duration}
                  </span>
                  <button
                    onClick={toggleFullscreen}
                    type="button"
                    className="p-1.5 rounded-full hover:text-gold-shimmer transition-colors"
                    aria-label="Toggle Fullscreen"
                  >
                    <Maximize className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
