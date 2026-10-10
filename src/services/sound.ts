/**
 * Pure Web Audio API sound synthesizer
 * 100% client-side, zero external audio files, completely reliable and offline-friendly.
 * Respects user autoplay restrictions: only starts on explicit user actions.
 */

class SoundService {
  private ctx: AudioContext | null = null;
  private isMuted: boolean = false;
  private masterGain: GainNode | null = null;
  
  // Ambient noise generators
  private rainSource: AudioBufferSourceNode | null = null;
  private rainGain: GainNode | null = null;
  private oceanSource: AudioBufferSourceNode | null = null;
  private oceanGain: GainNode | null = null;
  private isRainPlaying: boolean = false;
  private isOceanPlaying: boolean = false;

  private initContext() {
    if (!this.ctx) {
      const AudioCtxClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtxClass();
      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.value = this.isMuted ? 0 : 0.6;
      this.masterGain.connect(this.ctx.destination);
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  public setMuted(muted: boolean) {
    this.isMuted = muted;
    if (this.masterGain) {
      this.masterGain.gain.setValueAtTime(muted ? 0 : 0.6, this.ctx?.currentTime || 0);
    }
    if (muted) {
      this.stopAllAmbience();
    }
  }

  public getMuted(): boolean {
    return this.isMuted;
  }

  // Play a satisfying bubble pop sound
  public playPop() {
    if (this.isMuted) return;
    try {
      this.initContext();
      if (!this.ctx || !this.masterGain) return;

      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      const now = this.ctx.currentTime;
      // High frequency dropping quickly creates a bubbly pop
      osc.type = 'sine';
      osc.frequency.setValueAtTime(450 + Math.random() * 200, now);
      osc.frequency.exponentialRampToValueAtTime(120, now + 0.08);

      gain.gain.setValueAtTime(0.3, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);

      osc.connect(gain);
      gain.connect(this.masterGain);

      osc.start(now);
      osc.stop(now + 0.09);
    } catch {
      // Audio context might be restricted
    }
  }

  // Play a click blip
  public playBlip(freq = 440) {
    if (this.isMuted) return;
    try {
      this.initContext();
      if (!this.ctx || !this.masterGain) return;

      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const now = this.ctx.currentTime;

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, now);

      gain.gain.setValueAtTime(0.15, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.06);

      osc.connect(gain);
      gain.connect(this.masterGain);

      osc.start(now);
      osc.stop(now + 0.07);
    } catch {
      // ignore
    }
  }

  // Play success harmonic chime
  public playSuccess() {
    if (this.isMuted) return;
    try {
      this.initContext();
      if (!this.ctx || !this.masterGain) return;

      const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
      notes.forEach((freq, idx) => {
        const osc = this.ctx!.createOscillator();
        const gain = this.ctx!.createGain();
        const startTime = this.ctx!.currentTime + idx * 0.08;

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, startTime);

        gain.gain.setValueAtTime(0.2, startTime);
        gain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.4);

        osc.connect(gain);
        gain.connect(this.masterGain!);

        osc.start(startTime);
        osc.stop(startTime + 0.45);
      });
    } catch {
      // ignore
    }
  }

  // Play reaction buzz
  public playBuzz() {
    if (this.isMuted) return;
    try {
      this.initContext();
      if (!this.ctx || !this.masterGain) return;

      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const now = this.ctx.currentTime;

      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(150, now);

      gain.gain.setValueAtTime(0.2, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.2);

      osc.connect(gain);
      gain.connect(this.masterGain);

      osc.start(now);
      osc.stop(now + 0.22);
    } catch {
      // ignore
    }
  }

  // Synthesize rain noise
  public toggleRain(enable?: boolean): boolean {
    this.initContext();
    if (!this.ctx || !this.masterGain) return false;

    const targetState = enable !== undefined ? enable : !this.isRainPlaying;

    if (!targetState) {
      if (this.rainSource) {
        try {
          this.rainSource.stop();
          this.rainSource.disconnect();
        } catch {
          // ignore
        }
        this.rainSource = null;
      }
      this.isRainPlaying = false;
      return false;
    }

    if (this.isMuted) return false;

    // Generate 5 seconds loop of pinkish filtered noise for rain
    const bufferSize = this.ctx.sampleRate * 5;
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const data = buffer.getChannelData(0);
    let b0 = 0, b1 = 0, b2 = 0;
    for (let i = 0; i < bufferSize; i++) {
      const white = Math.random() * 2 - 1;
      b0 = 0.99886 * b0 + white * 0.0555179;
      b1 = 0.99332 * b1 + white * 0.0750759;
      b2 = 0.96900 * b2 + white * 0.1538520;
      data[i] = (b0 + b1 + b2 + white * 0.5362) * 0.11;
    }

    const source = this.ctx.createBufferSource();
    source.buffer = buffer;
    source.loop = true;

    // Filter to simulate soft raindrops hitting surfaces
    const filter = this.ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.value = 1200;

    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(0.4, this.ctx.currentTime);

    source.connect(filter);
    filter.connect(gain);
    gain.connect(this.masterGain);

    source.start();
    this.rainSource = source;
    this.rainGain = gain;
    this.isRainPlaying = true;
    return true;
  }

  // Synthesize ocean surf noise
  public toggleOcean(enable?: boolean): boolean {
    this.initContext();
    if (!this.ctx || !this.masterGain) return false;

    const targetState = enable !== undefined ? enable : !this.isOceanPlaying;

    if (!targetState) {
      if (this.oceanSource) {
        try {
          this.oceanSource.stop();
          this.oceanSource.disconnect();
        } catch {
          // ignore
        }
        this.oceanSource = null;
      }
      this.isOceanPlaying = false;
      return false;
    }

    if (this.isMuted) return false;

    const bufferSize = this.ctx.sampleRate * 6;
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = (Math.random() * 2 - 1) * 0.2;
    }

    const source = this.ctx.createBufferSource();
    source.buffer = buffer;
    source.loop = true;

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.value = 500;

    // Modulate gain using an LFO oscillator for swell/waves
    const waveLfo = this.ctx.createOscillator();
    waveLfo.frequency.value = 0.12; // slow wave cycle (~8 sec)
    const lfoGain = this.ctx.createGain();
    lfoGain.gain.value = 0.25;

    const gain = this.ctx.createGain();
    gain.gain.value = 0.3;

    waveLfo.connect(lfoGain);
    lfoGain.connect(gain.gain);
    waveLfo.start();

    source.connect(filter);
    filter.connect(gain);
    gain.connect(this.masterGain);

    source.start();
    this.oceanSource = source;
    this.oceanGain = gain;
    this.isOceanPlaying = true;
    return true;
  }

  public stopAllAmbience() {
    if (this.rainSource) {
      try { this.rainSource.stop(); this.rainSource.disconnect(); } catch {}
      this.rainSource = null;
      this.isRainPlaying = false;
    }
    if (this.oceanSource) {
      try { this.oceanSource.stop(); this.oceanSource.disconnect(); } catch {}
      this.oceanSource = null;
      this.isOceanPlaying = false;
    }
  }

  public isRainActive(): boolean {
    return this.isRainPlaying;
  }

  public isOceanActive(): boolean {
    return this.isOceanPlaying;
  }
}

export const sound = new SoundService();
