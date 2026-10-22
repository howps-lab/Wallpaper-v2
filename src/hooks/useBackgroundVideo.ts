import { useState, useRef, useEffect, useCallback } from 'react';
import { WallpaperTheme } from '../types/theme';

interface UseBackgroundVideoProps {
  currentTheme: WallpaperTheme;
}

export function useBackgroundVideo({ currentTheme }: UseBackgroundVideoProps) {
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [isMuted, setIsMuted] = useState<boolean>(true);
  const [hasError, setHasError] = useState<boolean>(false);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  // We maintain dual video buffer state: primarySlot 'A' or 'B'
  const [activeSlot, setActiveSlot] = useState<'A' | 'B'>('A');
  const [slotASrc, setSlotASrc] = useState<string>(currentTheme.videoSrc);
  const [slotBSrc, setSlotBSrc] = useState<string>('');

  const videoARef = useRef<HTMLVideoElement | null>(null);
  const videoBRef = useRef<HTMLVideoElement | null>(null);

  // Handle theme transitions with dual buffer
  useEffect(() => {
    const nextSrc = currentTheme.videoSrc;
    if (activeSlot === 'A') {
      if (slotASrc === nextSrc) return;
      // Load next into B, then switch
      setSlotBSrc(nextSrc);
      const bEl = videoBRef.current;
      if (bEl) {
        bEl.load();
        const onCanPlay = () => {
          bEl.play().catch(() => {});
          setActiveSlot('B');
          bEl.removeEventListener('canplay', onCanPlay);
        };
        bEl.addEventListener('canplay', onCanPlay, { once: true });
      } else {
        setActiveSlot('B');
      }
    } else {
      if (slotBSrc === nextSrc) return;
      // Load next into A, then switch
      setSlotASrc(nextSrc);
      const aEl = videoARef.current;
      if (aEl) {
        aEl.load();
        const onCanPlay = () => {
          aEl.play().catch(() => {});
          setActiveSlot('A');
          aEl.removeEventListener('canplay', onCanPlay);
        };
        aEl.addEventListener('canplay', onCanPlay, { once: true });
      } else {
        setActiveSlot('A');
      }
    }
  }, [currentTheme.videoSrc, activeSlot, slotASrc, slotBSrc]);

  // Handle play/pause
  const togglePlay = useCallback(() => {
    const currentVideo = activeSlot === 'A' ? videoARef.current : videoBRef.current;
    if (!currentVideo) return;

    if (currentVideo.paused) {
      currentVideo.play().then(() => {
        setIsPlaying(true);
      }).catch((err) => {
        console.warn('Playback toggle failed:', err);
      });
    } else {
      currentVideo.pause();
      setIsPlaying(false);
    }
  }, [activeSlot]);

  // Handle mute
  const toggleMute = useCallback(() => {
    setIsMuted((prev) => {
      const next = !prev;
      if (videoARef.current) videoARef.current.muted = next;
      if (videoBRef.current) videoBRef.current.muted = next;
      return next;
    });
  }, []);

  // Handle visibility change (pause in background tab to save CPU/battery)
  useEffect(() => {
    const handleVisibility = () => {
      const currentVideo = activeSlot === 'A' ? videoARef.current : videoBRef.current;
      if (!currentVideo) return;
      if (document.hidden) {
        if (!currentVideo.paused) {
          currentVideo.pause();
        }
      } else {
        if (isPlaying) {
          currentVideo.play().catch(() => {});
        }
      }
    };

    document.addEventListener('visibilitychange', handleVisibility);
    return () => {
      document.removeEventListener('visibilitychange', handleVisibility);
    };
  }, [activeSlot, isPlaying]);

  return {
    isPlaying,
    isMuted,
    hasError,
    setHasError,
    isLoaded,
    setIsLoaded,
    activeSlot,
    slotASrc,
    slotBSrc,
    videoARef,
    videoBRef,
    togglePlay,
    toggleMute,
  };
}
