import { useRef, useState, useCallback, useEffect } from 'react';

/**
 * Procedural atmospheric drone synthesizer using Web Audio API
 * Generates an ethereal, filtered cinematic pad sound tuned to each theme's key.
 */
export function useAmbientAudio() {
  const [isAudioEnabled, setIsAudioEnabled] = useState(false);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const osc1Ref = useRef<OscillatorNode | null>(null);
  const osc2Ref = useRef<OscillatorNode | null>(null);
  const filterRef = useRef<BiquadFilterNode | null>(null);
  const gainRef = useRef<GainNode | null>(null);

  const initAudio = useCallback(() => {
    if (audioCtxRef.current) return;
    try {
      const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      const ctx = new AudioContextClass();
      audioCtxRef.current = ctx;

      const masterGain = ctx.createGain();
      masterGain.gain.setValueAtTime(0, ctx.currentTime);
      masterGain.connect(ctx.destination);
      gainRef.current = masterGain;

      const filter = ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(450, ctx.currentTime);
      filter.Q.setValueAtTime(3.5, ctx.currentTime);
      filter.connect(masterGain);
      filterRef.current = filter;

      const osc1 = ctx.createOscillator();
      osc1.type = 'sine';
      osc1.frequency.setValueAtTime(261.63, ctx.currentTime);
      osc1.connect(filter);
      osc1.start();
      osc1Ref.current = osc1;

      const osc2 = ctx.createOscillator();
      osc2.type = 'triangle';
      osc2.frequency.setValueAtTime(261.63 * 1.5, ctx.currentTime); // Perfect fifth harmonic
      osc2.connect(filter);
      osc2.start();
      osc2Ref.current = osc2;
    } catch (e) {
      console.warn('Web Audio API not supported or blocked:', e);
    }
  }, []);

  const toggleAudio = useCallback(() => {
    if (!audioCtxRef.current) {
      initAudio();
    }
    const ctx = audioCtxRef.current;
    if (!ctx) return;

    if (ctx.state === 'suspended') {
      ctx.resume();
    }

    if (isAudioEnabled) {
      // Fade out smoothly
      if (gainRef.current) {
        gainRef.current.gain.cancelScheduledValues(ctx.currentTime);
        gainRef.current.gain.setValueAtTime(gainRef.current.gain.value, ctx.currentTime);
        gainRef.current.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.6);
      }
      setIsAudioEnabled(false);
    } else {
      // Fade in gently
      if (gainRef.current) {
        gainRef.current.gain.cancelScheduledValues(ctx.currentTime);
        gainRef.current.gain.setValueAtTime(0.0001, ctx.currentTime);
        gainRef.current.gain.exponentialRampToValueAtTime(0.065, ctx.currentTime + 1.2);
      }
      setIsAudioEnabled(true);
    }
  }, [initAudio, isAudioEnabled]);

  const updateFrequency = useCallback((freq: number) => {
    const ctx = audioCtxRef.current;
    if (!ctx) return;
    const now = ctx.currentTime;
    if (osc1Ref.current) {
      osc1Ref.current.frequency.cancelScheduledValues(now);
      osc1Ref.current.frequency.exponentialRampToValueAtTime(freq, now + 1.5);
    }
    if (osc2Ref.current) {
      osc2Ref.current.frequency.cancelScheduledValues(now);
      osc2Ref.current.frequency.exponentialRampToValueAtTime(freq * 1.5, now + 1.5);
    }
  }, []);

  useEffect(() => {
    return () => {
      if (audioCtxRef.current && audioCtxRef.current.state !== 'closed') {
        audioCtxRef.current.close().catch(() => {});
      }
    };
  }, []);

  return {
    isAudioEnabled,
    toggleAudio,
    updateFrequency,
  };
}
