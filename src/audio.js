/**
 * Sistema de Sonido Realista para Paso de Páginas (Web Audio API)
 * No requiere archivos externos, funciona 100% offline y sin errores CORS.
 */

class SoundEffects {
  constructor() {
    this.ctx = null;
    this.muted = false;
    this.initialized = false;
  }

  init() {
    if (this.initialized) return;
    try {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (AudioContext) {
        this.ctx = new AudioContext();
        this.initialized = true;
      }
    } catch (e) {
      console.warn('AudioContext no disponible:', e);
    }
  }

  ensureContext() {
    if (!this.initialized) {
      this.init();
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  toggleMute() {
    this.muted = !this.muted;
    return this.muted;
  }

  isMuted() {
    return this.muted;
  }

  /**
   * Simula el crujido y fricción suave de papel pergamino pasando.
   */
  playPageFlip() {
    if (this.muted) return;
    this.ensureContext();
    if (!this.ctx) return;

    try {
      const ctx = this.ctx;
      const duration = 0.22;
      const sampleRate = ctx.sampleRate;
      const bufferSize = Math.floor(sampleRate * duration);
      const buffer = ctx.createBuffer(1, bufferSize, sampleRate);
      const data = buffer.getChannelData(0);

      // Ruido rosa con filtro envolvente dinámico (fricción de hojas)
      let b0 = 0, b1 = 0, b2 = 0;
      for (let i = 0; i < bufferSize; i++) {
        const white = Math.random() * 2 - 1;
        b0 = 0.99765 * b0 + white * 0.0990460;
        b1 = 0.96300 * b1 + white * 0.2965164;
        b2 = 0.57000 * b2 + white * 1.0526913;
        const pink = (b0 + b1 + b2 + white * 0.5362) * 0.08;

        const t = i / bufferSize;
        // Envolvente de volumen: subida rápida, aleteo sutil y desvanecimiento
        const envelope = Math.sin(t * Math.PI) * Math.pow(1 - t, 0.7);
        data[i] = pink * envelope;
      }

      const noiseSource = ctx.createBufferSource();
      noiseSource.buffer = buffer;

      // Filtro de banda para simular resonancia acústica del papel
      const filter = ctx.createBiquadFilter();
      filter.type = 'bandpass';
      filter.frequency.setValueAtTime(1400, ctx.currentTime);
      filter.frequency.exponentialRampToValueAtTime(750, ctx.currentTime + duration);
      filter.Q.value = 1.2;

      // Ganancia principal
      const gain = ctx.createGain();
      gain.gain.setValueAtTime(0.65, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + duration);

      noiseSource.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);

      noiseSource.start();
    } catch (e) {
      // Ignorar restricciones de reproducción automática hasta interacción del usuario
    }
  }

  /**
   * Campanitas doradas mágicas para el momento del clímax
   */
  playChime() {
    if (this.muted) return;
    this.ensureContext();
    if (!this.ctx) return;

    try {
      const ctx = this.ctx;
      const notes = [523.25, 659.25, 783.99, 1046.50, 1318.51]; // C5, E5, G5, C6, E6
      
      notes.forEach((freq, idx) => {
        const startTime = ctx.currentTime + (idx * 0.08);
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, startTime);

        gain.gain.setValueAtTime(0, startTime);
        gain.gain.linearRampToValueAtTime(0.18, startTime + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.001, startTime + 1.2);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(startTime);
        osc.stop(startTime + 1.25);
      });
    } catch (e) {
      // noop
    }
  }
}

export const sound = new SoundEffects();

