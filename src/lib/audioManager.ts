export class AudioManager {
  private audioContext: AudioContext | null = null;
  private masterVolume: number = 0.3;
  private isEnabled: boolean = false;

  constructor() {
    this.initAudioContext();
  }

  private initAudioContext() {
    try {
      this.audioContext = new (window.AudioContext ||
        (window as any).webkitAudioContext)();
    } catch (error) {
      console.warn("Web Audio API not supported", error);
    }
  }

  private async resumeAudioContext() {
    if (this.audioContext && this.audioContext.state === "suspended") {
      await this.audioContext.resume();
    }
  }

  async enable() {
    if (!this.audioContext) {
      this.initAudioContext();
    }
    await this.resumeAudioContext();
    this.isEnabled = true;
  }

  disable() {
    this.isEnabled = false;
  }

  setVolume(volume: number) {
    this.masterVolume = Math.max(0, Math.min(1, volume));
  }

  getVolume(): number {
    return this.masterVolume;
  }

  isAudioEnabled(): boolean {
    return this.isEnabled && this.audioContext !== null;
  }

  // Play tone based on array value
  playComparisonSound(value1: number, value2: number, maxValue: number) {
    if (!this.isAudioEnabled()) return;

    const avgValue = (value1 + value2) / 2;
    const frequency = this.mapValueToFrequency(avgValue, maxValue);
    this.playTone(frequency, 0.1, "triangle");
  }

  // Play sound for swapping elements
  playSwapSound(value1: number, value2: number, maxValue: number) {
    if (!this.isAudioEnabled()) return;

    const frequency1 = this.mapValueToFrequency(value1, maxValue);
    const frequency2 = this.mapValueToFrequency(value2, maxValue);

    // Play both frequencies for a chord effect
    this.playTone(frequency1, 0.08, "sawtooth");
    setTimeout(() => {
      this.playTone(frequency2, 0.08, "sawtooth");
    }, 20);
  }

  // Play sound when element is placed in sorted position
  playSortedSound(value: number, maxValue: number) {
    if (!this.isAudioEnabled()) return;

    const frequency = this.mapValueToFrequency(value, maxValue);
    this.playTone(frequency, 0.15, "sine", true); // Longer, smoother tone
  }

  // Play completion sound
  playCompletionSound() {
    if (!this.isAudioEnabled()) return;

    // Play ascending major chord
    const frequencies = [523.25, 659.25, 783.99, 1046.5]; // C5, E5, G5, C6
    frequencies.forEach((freq, index) => {
      setTimeout(() => {
        this.playTone(freq, 0.3, "sine");
      }, index * 100);
    });
  }

  // Play pivot selection sound
  playPivotSound(value: number, maxValue: number) {
    if (!this.isAudioEnabled()) return;

    const frequency = this.mapValueToFrequency(value, maxValue);
    // Distinctive sound for pivot - rapid oscillation
    this.playOscillatingTone(frequency, 0.2, "square");
  }

  private mapValueToFrequency(value: number, maxValue: number): number {
    // Map values to a pleasant frequency range (200Hz to 800Hz)
    const minFreq = 200;
    const maxFreq = 800;
    return minFreq + (value / maxValue) * (maxFreq - minFreq);
  }

  private playTone(
    frequency: number,
    duration: number,
    waveform: OscillatorType = "sine",
    fadeOut: boolean = false,
  ) {
    if (!this.audioContext) return;

    const oscillator = this.audioContext.createOscillator();
    const gainNode = this.audioContext.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(this.audioContext.destination);

    oscillator.frequency.value = frequency;
    oscillator.type = waveform;

    // Set volume
    gainNode.gain.value = this.masterVolume * 0.1; // Keep it subtle

    if (fadeOut) {
      // Fade out effect
      gainNode.gain.setValueAtTime(
        this.masterVolume * 0.1,
        this.audioContext.currentTime,
      );
      gainNode.gain.exponentialRampToValueAtTime(
        0.001,
        this.audioContext.currentTime + duration,
      );
    }

    const now = this.audioContext.currentTime;
    oscillator.start(now);
    oscillator.stop(now + duration);
  }

  private playOscillatingTone(
    frequency: number,
    duration: number,
    waveform: OscillatorType = "square",
  ) {
    if (!this.audioContext) return;

    const oscillator = this.audioContext.createOscillator();
    const gainNode = this.audioContext.createGain();
    const lfo = this.audioContext.createOscillator(); // Low Frequency Oscillator for tremolo

    oscillator.connect(gainNode);
    lfo.connect(gainNode.gain);
    gainNode.connect(this.audioContext.destination);

    oscillator.frequency.value = frequency;
    oscillator.type = waveform;

    lfo.frequency.value = 10; // 10Hz tremolo
    lfo.type = "sine";

    gainNode.gain.value = this.masterVolume * 0.05;

    const now = this.audioContext.currentTime;
    oscillator.start(now);
    lfo.start(now);
    oscillator.stop(now + duration);
    lfo.stop(now + duration);
  }

  // Create a sound scheme for different algorithms
  getAlgorithmSoundScheme(algorithmName: string) {
    const schemes = {
      bubble: { waveform: "sine" as OscillatorType, baseVolume: 0.8 },
      selection: { waveform: "triangle" as OscillatorType, baseVolume: 0.9 },
      insertion: { waveform: "sawtooth" as OscillatorType, baseVolume: 0.7 },
      quick: { waveform: "square" as OscillatorType, baseVolume: 0.6 },
      merge: { waveform: "sine" as OscillatorType, baseVolume: 0.8 },
      heap: { waveform: "triangle" as OscillatorType, baseVolume: 0.7 },
      shell: { waveform: "sawtooth" as OscillatorType, baseVolume: 0.8 },
      counting: { waveform: "square" as OscillatorType, baseVolume: 0.9 },
      radix: { waveform: "sine" as OscillatorType, baseVolume: 0.7 },
      bucket: { waveform: "triangle" as OscillatorType, baseVolume: 0.8 },
      tim: { waveform: "sawtooth" as OscillatorType, baseVolume: 0.6 },
    };

    return schemes[algorithmName as keyof typeof schemes] || schemes.bubble;
  }
}

// Global audio manager instance
export const audioManager = new AudioManager();
