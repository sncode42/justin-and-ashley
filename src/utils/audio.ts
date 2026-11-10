class AudioEngine {
  private ctx: AudioContext | null = null;
  private isMuted: boolean = false;
  private lastScratchTime: number = 0;

  private initCtx() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  public toggleMute(): boolean {
    this.isMuted = !this.isMuted;
    return this.isMuted;
  }

  public getMuted(): boolean {
    return this.isMuted;
  }

  /**
   * Realistic metallic foil friction sound:
   * Uses white noise filtered through an active high-frequency bandpass
   * with velocity modulation to feel like real metallic leaf peeling.
   */
  public playScratchSound(intensity: number = 0.5) {
    if (this.isMuted) return;
    const now = performance.now();
    if (now - this.lastScratchTime < 35) return; // throttle audio rate
    this.lastScratchTime = now;

    try {
      this.initCtx();
      if (!this.ctx) return;

      const bufferSize = this.ctx.sampleRate * 0.05; // 50ms pulse
      const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const data = buffer.getChannelData(0);

      // Metallic gritty noise
      for (let i = 0; i < bufferSize; i++) {
        // High density granular noise
        data[i] = (Math.random() * 2 - 1) * Math.sin(i / 1.8);
      }

      const noise = this.ctx.createBufferSource();
      noise.buffer = buffer;

      // Bandpass filter centered around 3200Hz (metallic shimmer & foil tear)
      const filter = this.ctx.createBiquadFilter();
      filter.type = 'bandpass';
      filter.frequency.setValueAtTime(2800 + Math.random() * 1200, this.ctx.currentTime);
      filter.Q.setValueAtTime(3.5, this.ctx.currentTime);

      const gain = this.ctx.createGain();
      const currentGain = Math.min(0.2, 0.05 + intensity * 0.12);
      gain.gain.setValueAtTime(currentGain, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.05);

      noise.connect(filter);
      filter.connect(gain);
      gain.connect(this.ctx.destination);

      noise.start();
    } catch {
      // Audio autoplay policy fallback
    }
  }

  /**
   * Lush orchestral chime chord for couple name reveal:
   * Harmonics of rich gold chimes, harp and celestial warmth.
   */
  public playRevealChime() {
    if (this.isMuted) return;
    try {
      this.initCtx();
      if (!this.ctx) return;

      const chord = [261.63, 392.00, 523.25, 659.25, 783.99, 987.77, 1046.50]; // Cmaj9 lush voicing
      const now = this.ctx.currentTime;

      chord.forEach((freq, idx) => {
        if (!this.ctx) return;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        // Sine with subtle triangle overtone for gold bell bell-like warmth
        osc.type = idx % 2 === 0 ? 'sine' : 'triangle';
        osc.frequency.setValueAtTime(freq, now + idx * 0.06);

        // Soft envelope: gentle bloom, long shimmering decay
        const noteStart = now + idx * 0.06;
        const noteDuration = 2.4 - idx * 0.15;

        gain.gain.setValueAtTime(0.0001, noteStart);
        gain.gain.exponentialRampToValueAtTime(0.08 / (idx * 0.35 + 1), noteStart + 0.12);
        gain.gain.exponentialRampToValueAtTime(0.0001, noteStart + noteDuration);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(noteStart);
        osc.stop(noteStart + noteDuration);
      });
    } catch {
      // Fallback
    }
  }

  /**
   * Delicate transition swoosh
   */
  public playTransitionGlow() {
    if (this.isMuted) return;
    try {
      this.initCtx();
      if (!this.ctx) return;

      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(220, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(880, this.ctx.currentTime + 1.2);

      gain.gain.setValueAtTime(0.001, this.ctx.currentTime);
      gain.gain.linearRampToValueAtTime(0.05, this.ctx.currentTime + 0.5);
      gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 1.5);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc.stop(this.ctx.currentTime + 1.5);
    } catch {
      // Fallback
    }
  }
}

export const audioEngine = new AudioEngine();
