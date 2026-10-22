import React from 'react';
import { WallpaperTheme } from '../types/theme';
import { Play } from 'lucide-react';

interface BackgroundVideoProps {
  currentTheme: WallpaperTheme;
  isPlaying: boolean;
  isMuted: boolean;
  hasError: boolean;
  setHasError: (err: boolean) => void;
  isLoaded: boolean;
  setIsLoaded: (loaded: boolean) => void;
  activeSlot: 'A' | 'B';
  slotASrc: string;
  slotBSrc: string;
  videoARef: React.RefObject<HTMLVideoElement | null>;
  videoBRef: React.RefObject<HTMLVideoElement | null>;
  togglePlay: () => void;
}

export const BackgroundVideo: React.FC<BackgroundVideoProps> = ({
  currentTheme,
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
}) => {
  return (
    <div className="fixed inset-0 w-full h-[100dvh] -z-10 overflow-hidden select-none bg-[#05070c]">
      {/* 1. Underlying Poster Image Fallback Layer (Opacity increased by 60% from 30% to 90%) */}
      <img
        src={currentTheme.posterSrc}
        alt={currentTheme.name}
        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ease-out ${
          isLoaded && !hasError ? 'opacity-90' : 'opacity-100'
        }`}
        referrerPolicy="no-referrer"
      />

      {/* 2. Video Layer A (Primary/Secondary Slot) */}
      <video
        ref={videoARef}
        src={slotASrc}
        poster={currentTheme.posterSrc}
        autoPlay
        muted={isMuted}
        loop
        playsInline
        preload="auto"
        onLoadedData={() => {
          setIsLoaded(true);
          setHasError(false);
        }}
        onError={() => {
          console.warn('Video slot A error, falling back to poster');
          setHasError(true);
        }}
        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ease-in-out ${
          activeSlot === 'A' && !hasError ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
      />

      {/* 3. Video Layer B (Crossfade Slot) */}
      {slotBSrc && (
        <video
          ref={videoBRef}
          src={slotBSrc}
          poster={currentTheme.posterSrc}
          autoPlay
          muted={isMuted}
          loop
          playsInline
          preload="auto"
          onLoadedData={() => {
            setIsLoaded(true);
            setHasError(false);
          }}
          onError={() => {
            console.warn('Video slot B error, falling back to poster');
            setHasError(true);
          }}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ease-in-out ${
            activeSlot === 'B' && !hasError ? 'opacity-100' : 'opacity-0 pointer-events-none'
          }`}
        />
      )}

      {/* 4. Atmospheric Color Grading Scrim - lightened by 60% for vivid video clarity */}
      <div
        className="absolute inset-0 transition-all duration-1000 pointer-events-none opacity-40"
        style={{
          background: currentTheme.colors.overlayGradient,
        }}
      />

      {/* 5. Contrast Enhancer Scrim - reduced darkness by 60% so video shows with high opacity */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/35 via-black/10 to-black/25 pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/15 pointer-events-none" />

      {/* 6. Subtle Film Grain Texture */}
      <div className="absolute inset-0 film-grain pointer-events-none opacity-25 mix-blend-overlay" />

      {/* 7. Subtle Vignette Border */}
      <div className="absolute inset-0 pointer-events-none shadow-[inset_0_0_80px_rgba(0,0,0,0.4)]" />

      {/* 8. Autoplay Recovery Prompt if Paused upon entry */}
      {!isPlaying && (
        <div className="absolute bottom-24 left-8 z-30 hidden sm:flex items-center gap-3 px-4 py-2 rounded-lg bg-black/70 backdrop-blur-md border border-white/10 text-white/90 text-xs">
          <span>Background video paused</span>
          <button
            onClick={togglePlay}
            className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-white/20 hover:bg-white/30 text-white font-medium transition-colors"
          >
            <Play className="w-3 h-3 fill-current" />
            Resume
          </button>
        </div>
      )}
    </div>
  );
};
