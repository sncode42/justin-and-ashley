import React, { useRef, useEffect, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Sparkles, Eye, Volume2, VolumeX, ShieldAlert } from 'lucide-react';
import { audioEngine } from '../utils/audio';
import { weddingConfig } from '../config/weddingConfig';

interface ScratchExperienceProps {
  onComplete: () => void;
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  alpha: number;
  rotation: number;
  rotSpeed: number;
  color: string;
}

export const ScratchExperience: React.FC<ScratchExperienceProps> = ({ onComplete }) => {
  const cardContainerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesCanvasRef = useRef<HTMLCanvasElement>(null);

  const [isScratching, setIsScratching] = useState(false);
  const [scratchPercent, setScratchPercent] = useState(0);
  const [isRevealed, setIsRevealed] = useState(false);
  const [stage, setStage] = useState<'scratch' | 'name-reveal' | 'transforming' | 'finished'>('scratch');
  const [isMuted, setIsMuted] = useState(audioEngine.getMuted());
  const [showHelperPrompt, setShowHelperPrompt] = useState(true);

  const lastPointRef = useRef<{ x: number; y: number } | null>(null);
  const hasTriggeredCompleteRef = useRef(false);
  const hasInitializedCanvasRef = useRef(false);
  const particlesRef = useRef<Particle[]>([]);
  const animationFrameRef = useRef<number | null>(null);
  const lastCheckTimeRef = useRef<number>(0);

  const toggleSound = () => {
    const muted = audioEngine.toggleMute();
    setIsMuted(muted);
  };

  /**
   * Draw the luxury metallic champagne gold foil texture
   */
  const drawFoil = useCallback((canvas: HTMLCanvasElement, width: number, height: number) => {
    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    if (!ctx) return;

    const w = width;
    const h = height;
    if (w <= 0 || h <= 0) return;

    ctx.save();
    ctx.globalCompositeOperation = 'source-over';

    // 1. Base Rich Champagne Gold Metallic Gradient
    const goldGrad = ctx.createLinearGradient(0, 0, w, h);
    goldGrad.addColorStop(0.0, '#c79c38');
    goldGrad.addColorStop(0.18, '#fae9bf');
    goldGrad.addColorStop(0.35, '#d4af37');
    goldGrad.addColorStop(0.52, '#fdf4dc');
    goldGrad.addColorStop(0.70, '#caa03d');
    goldGrad.addColorStop(0.85, '#eed082');
    goldGrad.addColorStop(1.0, '#b88926');

    ctx.fillStyle = goldGrad;
    ctx.fillRect(0, 0, w, h);

    // 2. Micro-grain metallic texture
    const grainCount = Math.floor((w * h) / 32);
    ctx.fillStyle = 'rgba(255, 255, 255, 0.18)';
    for (let i = 0; i < grainCount; i++) {
      const gx = Math.random() * w;
      const gy = Math.random() * h;
      ctx.fillRect(gx, gy, 1.2, 1.2);
    }
    ctx.fillStyle = 'rgba(60, 40, 10, 0.1)';
    for (let i = 0; i < grainCount / 2; i++) {
      const gx = Math.random() * w;
      const gy = Math.random() * h;
      ctx.fillRect(gx, gy, 1.5, 1.5);
    }

    // 3. Diagonal brushed metallic foil stripes
    ctx.strokeStyle = 'rgba(255, 250, 230, 0.14)';
    ctx.lineWidth = 1;
    for (let i = -w; i < w + h; i += 20) {
      ctx.beginPath();
      ctx.moveTo(i, 0);
      ctx.lineTo(i + h * 0.75, h);
      ctx.stroke();
    }

    // 4. Embossed Filigree Border & Frame
    const inset = Math.max(12, Math.min(w, h) * 0.05);
    ctx.strokeStyle = '#fcf2d3';
    ctx.lineWidth = 2.5;
    ctx.strokeRect(inset, inset, w - inset * 2, h - inset * 2);

    ctx.strokeStyle = '#855d14';
    ctx.lineWidth = 1;
    ctx.strokeRect(inset + 4, inset + 4, w - (inset + 4) * 2, h - (inset + 4) * 2);

    // Corner decorative rosettes
    const corners = [
      [inset, inset],
      [w - inset, inset],
      [inset, h - inset],
      [w - inset, h - inset],
    ];
    corners.forEach(([cx, cy]) => {
      ctx.save();
      ctx.translate(cx, cy);
      ctx.fillStyle = '#f8e8ba';
      ctx.beginPath();
      ctx.arc(0, 0, 7, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = '#7c550e';
      ctx.lineWidth = 1.5;
      ctx.stroke();
      ctx.restore();
    });

    // 5. Central Foil Typography & Crest
    const centerY = h * 0.45;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    // Top Emblem
    ctx.font = 'bold 22px "Cinzel", Georgia, serif';
    ctx.fillStyle = '#61440a';
    ctx.fillText('✦   A U R A   ✦', w / 2, centerY - 65);

    // Mystery Screen Announcement (Stage 1)
    ctx.font = '600 12px "Montserrat", sans-serif';
    ctx.fillStyle = '#6a4b0c';
    ctx.fillText('SOMETHING BEAUTIFUL IS WAITING FOR YOU', w / 2, centerY - 15);

    // Embossed Callout: SCRATCH TO DISCOVER
    ctx.font = '700 24px "Cinzel", Georgia, serif';
    ctx.fillStyle = '#412b05';
    ctx.shadowColor = 'rgba(255, 255, 255, 0.75)';
    ctx.shadowOffsetX = 1;
    ctx.shadowOffsetY = 1;
    ctx.shadowBlur = 0;
    ctx.fillText('SCRATCH TO DISCOVER', w / 2, centerY + 28);

    // Touch hint instruction
    ctx.shadowColor = 'transparent';
    ctx.font = '500 11px "Montserrat", sans-serif';
    ctx.fillStyle = '#7a5511';
    ctx.fillText('Swipe or drag gently to unveil the sacred secret', w / 2, centerY + 68);

    ctx.restore();
  }, []);

  /**
   * Initialize canvas with proper DPI and responsive sizing
   */
  const initFoilCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const w = rect.width;
    const h = rect.height;

    // Guard against 0 dimensions before CSS layout completes
    if (w < 20 || h < 20) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = Math.floor(w * dpr);
    canvas.height = Math.floor(h * dpr);

    drawFoil(canvas, canvas.width, canvas.height);
    hasInitializedCanvasRef.current = true;
  }, [drawFoil]);

  /**
   * ResizeObserver to guarantee canvas is drawn as soon as layout measures
   */
  useEffect(() => {
    const container = cardContainerRef.current;
    if (!container) return;

    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        if (entry.contentRect.width > 20 && entry.contentRect.height > 20) {
          if (!hasTriggeredCompleteRef.current) {
            initFoilCanvas();
          }
        }
      }
    });

    observer.observe(container);

    // Also trigger on requestAnimationFrame for instant initial paint
    requestAnimationFrame(() => {
      initFoilCanvas();
    });

    return () => observer.disconnect();
  }, [initFoilCanvas]);

  /**
   * Spawn glittering gold flakes at scratch location
   */
  const spawnFoilParticles = (x: number, y: number, count: number = 3) => {
    const colors = ['#ffe89c', '#d4af37', '#ffffff', '#e5c158', '#b8860b'];
    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = 1.5 + Math.random() * 3.5;
      particlesRef.current.push({
        x,
        y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed - 1.2,
        size: 2 + Math.random() * 3.5,
        alpha: 1,
        rotation: Math.random() * Math.PI * 2,
        rotSpeed: (Math.random() - 0.5) * 0.25,
        color: colors[Math.floor(Math.random() * colors.length)],
      });
    }
  };

  /**
   * Particle render loop
   */
  useEffect(() => {
    const pCanvas = particlesCanvasRef.current;
    if (!pCanvas) return;
    const ctx = pCanvas.getContext('2d');
    if (!ctx) return;

    let active = true;

    const renderParticles = () => {
      if (!active) return;
      const rect = pCanvas.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;

      if (rect.width > 0 && rect.height > 0) {
        const targetW = Math.floor(rect.width * dpr);
        const targetH = Math.floor(rect.height * dpr);
        if (pCanvas.width !== targetW || pCanvas.height !== targetH) {
          pCanvas.width = targetW;
          pCanvas.height = targetH;
        }

        ctx.clearRect(0, 0, pCanvas.width, pCanvas.height);
        const scale = pCanvas.width / (rect.width || 1);

        for (let i = particlesRef.current.length - 1; i >= 0; i--) {
          const p = particlesRef.current[i];
          p.x += p.vx;
          p.y += p.vy;
          p.vy += 0.08;
          p.vx *= 0.96;
          p.rotation += p.rotSpeed;
          p.alpha -= 0.024;

          if (p.alpha <= 0) {
            particlesRef.current.splice(i, 1);
            continue;
          }

          ctx.save();
          ctx.translate(p.x * scale, p.y * scale);
          ctx.rotate(p.rotation);
          ctx.globalAlpha = p.alpha;
          ctx.fillStyle = p.color;

          ctx.beginPath();
          ctx.moveTo(0, -p.size * scale);
          ctx.lineTo(p.size * 0.8 * scale, 0);
          ctx.lineTo(0, p.size * scale);
          ctx.lineTo(-p.size * 0.8 * scale, 0);
          ctx.closePath();
          ctx.fill();
          ctx.restore();
        }
      }

      animationFrameRef.current = requestAnimationFrame(renderParticles);
    };

    renderParticles();

    return () => {
      active = false;
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  /**
   * Check revealed percentage via low-overhead probe grid
   */
  const checkScratchPercentage = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas || hasTriggeredCompleteRef.current) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const w = canvas.width;
    const h = canvas.height;
    if (w <= 10 || h <= 10) return;

    const cols = 24;
    const rows = 24;
    const totalPoints = cols * rows;
    let transparentCount = 0;

    try {
      const imgData = ctx.getImageData(0, 0, w, h);
      const data = imgData.data;

      for (let r = 0; r < rows; r++) {
        const y = Math.floor((r + 0.5) * (h / rows));
        for (let c = 0; c < cols; c++) {
          const x = Math.floor((c + 0.5) * (w / cols));
          const alphaIndex = (y * w + x) * 4 + 3;
          if (data[alphaIndex] < 128) {
            transparentCount++;
          }
        }
      }

      const percent = Math.round((transparentCount / totalPoints) * 100);
      setScratchPercent(percent);

      // Trigger automatic smooth reveal at 55% scratched
      if (percent >= 55 && !hasTriggeredCompleteRef.current) {
        triggerCompleteReveal();
      }
    } catch {
      // Ignored
    }
  }, []);

  /**
   * Scratch action logic
   */
  const handleScratch = (clientX: number, clientY: number, isStarting: boolean) => {
    if (hasTriggeredCompleteRef.current) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    if (rect.width <= 0 || rect.height <= 0) return;

    // Convert client coordinates to canvas internal bitmap space
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;

    const currentX = (clientX - rect.left) * scaleX;
    const currentY = (clientY - rect.top) * scaleY;

    if (showHelperPrompt) {
      setShowHelperPrompt(false);
    }

    const brushRadius = Math.max(28 * scaleX, Math.min(canvas.width, canvas.height) * 0.08);

    ctx.save();
    ctx.globalCompositeOperation = 'destination-out';
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';

    if (isStarting || !lastPointRef.current) {
      ctx.beginPath();
      ctx.arc(currentX, currentY, brushRadius, 0, Math.PI * 2);
      ctx.fill();
      lastPointRef.current = { x: currentX, y: currentY };
    } else {
      const prevX = lastPointRef.current.x;
      const prevY = lastPointRef.current.y;
      const dist = Math.hypot(currentX - prevX, currentY - prevY);

      ctx.lineWidth = brushRadius * 2;
      ctx.beginPath();
      ctx.moveTo(prevX, prevY);
      ctx.lineTo(currentX, currentY);
      ctx.stroke();

      audioEngine.playScratchSound(Math.min(1, dist / (20 * scaleX)));
      spawnFoilParticles(clientX - rect.left, clientY - rect.top, Math.min(5, Math.max(2, Math.floor(dist / 15))));

      lastPointRef.current = { x: currentX, y: currentY };
    }

    ctx.restore();

    const now = performance.now();
    if (now - lastCheckTimeRef.current > 80) {
      lastCheckTimeRef.current = now;
      checkScratchPercentage();
    }
  };

  /**
   * Full reveal transition
   */
  const triggerCompleteReveal = useCallback(() => {
    if (hasTriggeredCompleteRef.current) return;
    hasTriggeredCompleteRef.current = true;
    setIsRevealed(true);
    setScratchPercent(100);

    audioEngine.playRevealChime();

    try {
      confetti({
        particleCount: 50,
        spread: 75,
        origin: { y: 0.6 },
        colors: ['#fae9bf', '#d4af37', '#ffffff', '#caa03d'],
        disableForReducedMotion: true,
      });
    } catch {
      // Ignored
    }

    // Stage 3: Couple Name Reveal
    setStage('name-reveal');

    // Keep visible for ~2.2s, then Stage 4 Cinematic Transformation
    setTimeout(() => {
      setStage('transforming');
      audioEngine.playTransitionGlow();

      setTimeout(() => {
        setStage('finished');
        onComplete();
      }, 1500);
    }, 2300);
  }, [onComplete]);

  return (
    <div className="relative w-full min-h-screen flex items-center justify-center bg-gradient-to-br from-emerald-950 via-[#071a14] to-emerald-950 overflow-hidden select-none px-4 py-8">
      {/* Ambient backgrounds */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-emerald-600/10 rounded-full blur-[140px]" />
        <div className="absolute -bottom-32 left-1/2 -translate-x-1/2 w-[700px] h-[500px] bg-gold-metallic/10 rounded-full blur-[160px]" />
      </div>

      {/* Floating particles during Name Reveal */}
      {stage === 'name-reveal' && (
        <div className="absolute inset-0 pointer-events-none overflow-hidden z-20">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full bg-gold-shimmer shadow-[0_0_8px_#f4de9b]"
              style={{
                width: `${Math.random() * 4 + 2}px`,
                height: `${Math.random() * 4 + 2}px`,
                left: `${Math.random() * 100}%`,
                bottom: '-20px',
              }}
              animate={{
                y: [0, -window.innerHeight - 50],
                opacity: [0, 0.9, 0],
                x: [0, (Math.random() - 0.5) * 80],
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 1.5,
                ease: 'easeOut',
              }}
            />
          ))}
        </div>
      )}

      {/* Sound toggle & Skip Reveal button */}
      <div className="fixed top-5 right-5 z-50 flex items-center gap-3">
        <button
          onClick={toggleSound}
          type="button"
          aria-label={isMuted ? "Unmute audio" : "Mute audio"}
          className="flex items-center gap-2 px-3.5 py-2 rounded-full bg-emerald-900/80 backdrop-blur-md border border-gold-metallic/30 text-gold-shimmer hover:border-gold-metallic transition-all text-xs font-sans tracking-wider shadow-lg active:scale-95"
        >
          {isMuted ? <VolumeX className="w-4 h-4 text-rose-300" /> : <Volume2 className="w-4 h-4 text-gold-metallic" />}
          <span className="hidden sm:inline">{isMuted ? "Muted" : "Sound On"}</span>
        </button>

        {stage === 'scratch' && !isRevealed && (
          <button
            onClick={triggerCompleteReveal}
            type="button"
            className="flex items-center gap-2 px-4 py-2 rounded-full bg-gold-metallic/20 hover:bg-gold-metallic/30 border border-gold-metallic/50 text-gold-light transition-all text-xs font-sans tracking-widest uppercase backdrop-blur-md shadow-lg active:scale-95 focus:outline-none focus:ring-2 focus:ring-gold-metallic"
          >
            <Eye className="w-3.5 h-3.5 text-gold-shimmer" />
            <span>Instant Reveal</span>
          </button>
        )}
      </div>

      {/* Main Luxury Frame Card */}
      <div
        ref={cardContainerRef}
        className={`relative w-full max-w-[460px] h-[580px] sm:h-[620px] rounded-3xl p-3 shadow-2xl transition-all duration-700 ${
          stage === 'transforming' ? 'scale-105 opacity-0 filter blur-md' : 'opacity-100 scale-100'
        }`}
        style={{
          background: 'linear-gradient(145deg, #0e2f24, #061a14 70%, #04100c)',
          boxShadow: '0 25px 60px -15px rgba(0, 0, 0, 0.8), 0 0 40px rgba(212, 175, 55, 0.15)',
        }}
      >
        {/* Frame borders */}
        <div className="absolute inset-2.5 rounded-2xl border border-gold-metallic/30 pointer-events-none" />
        <div className="absolute inset-4 rounded-xl border border-gold-metallic/15 pointer-events-none" />

        {/* Corner Accents */}
        <div className="absolute top-5 left-5 text-gold-metallic/50 pointer-events-none text-xs">✤</div>
        <div className="absolute top-5 right-5 text-gold-metallic/50 pointer-events-none text-xs">✤</div>
        <div className="absolute bottom-5 left-5 text-gold-metallic/50 pointer-events-none text-xs">✤</div>
        <div className="absolute bottom-5 right-5 text-gold-metallic/50 pointer-events-none text-xs">✤</div>

        {/* STAGE 3: THE REVEALED CONTENT (Real HTML Behind the Scratch Canvas) */}
        <div className="relative w-full h-full rounded-2xl overflow-hidden flex flex-col items-center justify-center p-6 bg-gradient-to-b from-[#092219] via-[#051711] to-[#04100c] text-center">
          <div
            className="absolute inset-0 bg-cover bg-center opacity-25 mix-blend-luminosity filter contrast-125 pointer-events-none"
            style={{ backgroundImage: `url('/assets/couple-traditional.jpg')` }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-emerald-950 via-emerald-950/80 to-emerald-950/60 pointer-events-none" />

          <div className="relative z-10 w-full flex flex-col items-center justify-center">
            {/* Monogram */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6 }}
              className="w-16 h-16 rounded-full border border-gold-metallic/40 flex items-center justify-center mb-6 bg-gold-metallic/10 shadow-[0_0_25px_rgba(212,175,55,0.2)]"
            >
              <span className="font-display text-gold-light text-2xl tracking-widest">J✦A</span>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="font-sans text-[11px] uppercase tracking-[0.35em] text-gold-metallic/90 mb-3"
            >
              Together with their families
            </motion.p>

            {/* STAGE 3: JUSTIN & ASHLEY */}
            <div className="my-2 space-y-1">
              <motion.h1
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.7 }}
                className="font-serif text-5xl sm:text-6xl font-normal tracking-[0.18em] text-transparent bg-clip-text bg-gradient-to-r from-gold-light via-gold-shimmer to-gold-warm relative"
              >
                JUSTIN
                <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent bg-[length:200%_100%] animate-shimmer pointer-events-none bg-clip-text" />
              </motion.h1>

              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.7, duration: 0.4 }}
                className="flex items-center justify-center gap-3 my-1"
              >
                <div className="w-10 h-[1px] bg-gradient-to-r from-transparent to-gold-metallic/60" />
                <span className="font-script text-3xl text-gold-shimmer italic">&amp;</span>
                <div className="w-10 h-[1px] bg-gradient-to-l from-transparent to-gold-metallic/60" />
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9, duration: 0.7 }}
                className="font-serif text-5xl sm:text-6xl font-normal tracking-[0.18em] text-transparent bg-clip-text bg-gradient-to-r from-gold-light via-gold-shimmer to-gold-warm relative"
              >
                ASHLEY
                <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent bg-[length:200%_100%] animate-shimmer pointer-events-none bg-clip-text" />
              </motion.h1>
            </div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2, duration: 0.6 }}
              className="font-serif italic text-ivory-200 text-lg sm:text-xl tracking-wider mt-4"
            >
              “Two souls, one timeless journey.”
            </motion.p>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.4, duration: 0.6 }}
              className="mt-6 inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-gold-metallic/25 bg-gold-metallic/5 text-[10px] uppercase font-sans tracking-[0.25em] text-gold-shimmer"
            >
              <Sparkles className="w-3 h-3 text-gold-metallic" />
              <span>Sunday, February 14, 2027</span>
            </motion.div>

            {/* Fictional Concept Disclaimer */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.6, duration: 0.5 }}
              className="mt-5 flex items-center gap-1.5 text-[9px] text-ivory-400/80 font-sans tracking-widest uppercase bg-emerald-950/60 px-3 py-1 rounded-md border border-white/5"
            >
              <ShieldAlert className="w-3 h-3 text-gold-metallic/70" />
              <span>{weddingConfig.disclaimer.badgeText} • HOMAGE TO GIRI &amp; POOJA</span>
            </motion.div>
          </div>
        </div>

        {/* STAGE 1 & 2: THE SCRATCH CANVAS FOIL OVERLAY */}
        <canvas
          ref={canvasRef}
          onPointerDown={(e) => {
            e.currentTarget.setPointerCapture(e.pointerId);
            setIsScratching(true);
            handleScratch(e.clientX, e.clientY, true);
          }}
          onPointerMove={(e) => {
            if (!isScratching) return;
            handleScratch(e.clientX, e.clientY, false);
          }}
          onPointerUp={() => {
            setIsScratching(false);
            lastPointRef.current = null;
            checkScratchPercentage();
          }}
          onPointerCancel={() => {
            setIsScratching(false);
            lastPointRef.current = null;
          }}
          className={`absolute inset-3 w-[calc(100%-1.5rem)] h-[calc(100%-1.5rem)] rounded-2xl touch-none cursor-pointer z-30 transition-all duration-700 ${
            isRevealed ? 'opacity-0 pointer-events-none scale-105 filter blur-sm' : 'opacity-100 scale-100'
          }`}
          style={{
            boxShadow: 'inset 0 0 20px rgba(0,0,0,0.3)',
          }}
        />

        {/* Particle Canvas */}
        <canvas
          ref={particlesCanvasRef}
          className="absolute inset-3 w-[calc(100%-1.5rem)] h-[calc(100%-1.5rem)] rounded-2xl pointer-events-none z-40"
        />

        {/* Scratch Helper Cue */}
        <AnimatePresence>
          {showHelperPrompt && !isRevealed && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.4 }}
              className="absolute bottom-10 left-1/2 -translate-x-1/2 z-40 pointer-events-none flex flex-col items-center gap-1.5"
            >
              <div className="w-11 h-11 rounded-full bg-emerald-900/90 border border-gold-metallic/80 text-gold-light flex items-center justify-center shadow-[0_0_20px_rgba(212,175,55,0.4)] animate-bounce">
                <Sparkles className="w-5 h-5 text-gold-shimmer" />
              </div>
              <span className="text-[10px] uppercase font-sans tracking-[0.25em] text-emerald-950 bg-gold-shimmer/90 font-semibold px-3 py-0.5 rounded-full shadow-md">
                Scratch Here
              </span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Scratch Percentage Indicator */}
        {!isRevealed && scratchPercent > 0 && (
          <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 z-30 flex items-center gap-2 text-xs font-sans text-gold-shimmer/90 whitespace-nowrap">
            <div className="w-24 h-1.5 bg-emerald-900/80 rounded-full overflow-hidden border border-gold-metallic/30">
              <div
                className="h-full bg-gradient-to-r from-gold-metallic to-gold-shimmer transition-all duration-150"
                style={{ width: `${Math.min(100, (scratchPercent / 55) * 100)}%` }}
              />
            </div>
            <span className="text-[11px] font-medium tracking-wider">{scratchPercent}% Revealed</span>
          </div>
        )}
      </div>

      {/* STAGE 4: CINEMATIC TRANSFORMATION OVERLAY */}
      <AnimatePresence>
        {stage === 'transforming' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.4, ease: 'easeInOut' }}
            className="fixed inset-0 z-50 pointer-events-none flex items-center justify-center bg-radial from-gold-shimmer/25 via-emerald-900/90 to-emerald-950"
          >
            <motion.div
              initial={{ scale: 0.2, opacity: 0 }}
              animate={{ scale: [0.2, 1.4, 2.5], opacity: [0, 1, 0] }}
              transition={{ duration: 1.5, ease: 'easeOut' }}
              className="w-96 h-96 rounded-full bg-gradient-to-r from-gold-light via-gold-shimmer to-emerald-400 blur-[80px]"
            />

            <motion.div
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 1.2, ease: 'easeOut' }}
              className="absolute flex flex-col items-center text-center p-8 text-gold-light"
            >
              <svg className="w-24 h-24 text-gold-metallic animate-pulse" viewBox="0 0 100 100" fill="none">
                <path
                  d="M50 10 C30 30, 20 60, 50 90 C80 60, 70 30, 50 10 Z"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeDasharray="2 2"
                />
                <circle cx="50" cy="50" r="14" stroke="currentColor" strokeWidth="1" />
                <path d="M35 50 L65 50 M50 35 L50 65" stroke="currentColor" strokeWidth="1" />
              </svg>
              <h2 className="font-serif text-3xl sm:text-4xl tracking-[0.25em] text-gold-shimmer mt-4">
                ENTERING THE CELEBRATION
              </h2>
              <p className="font-sans text-xs tracking-[0.3em] uppercase text-ivory-300 mt-2">
                Justin &amp; Ashley • February 14, 2027
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
