import React, { useEffect, useCallback } from 'react';
import { WallpaperTheme } from '../types/theme';
import { X, ChevronLeft, ChevronRight, Download, Check, Sparkles, SlidersHorizontal } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface WallpaperPreviewProps {
  isOpen: boolean;
  onClose: () => void;
  themes: WallpaperTheme[];
  activePreviewTheme: WallpaperTheme;
  setActivePreviewTheme: (theme: WallpaperTheme) => void;
  onApplyTheme: (theme: WallpaperTheme) => void;
  currentActiveThemeId: string;
}

export const WallpaperPreview: React.FC<WallpaperPreviewProps> = ({
  isOpen,
  onClose,
  themes,
  activePreviewTheme,
  setActivePreviewTheme,
  onApplyTheme,
  currentActiveThemeId,
}) => {
  const currentIndex = themes.findIndex((t) => t.id === activePreviewTheme.id);

  const handlePrev = useCallback(() => {
    const nextIdx = (currentIndex - 1 + themes.length) % themes.length;
    setActivePreviewTheme(themes[nextIdx]);
  }, [currentIndex, themes, setActivePreviewTheme]);

  const handleNext = useCallback(() => {
    const nextIdx = (currentIndex + 1) % themes.length;
    setActivePreviewTheme(themes[nextIdx]);
  }, [currentIndex, themes, setActivePreviewTheme]);

  // Keyboard navigation
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowLeft') {
        handlePrev();
      } else if (e.key === 'ArrowRight') {
        handleNext();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose, handlePrev, handleNext]);

  // Handle high-res wallpaper download
  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = activePreviewTheme.posterSrc;
    link.download = `afterglow_${activePreviewTheme.id}_wallpaper_4k.jpg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const isAppliedAsBackground = activePreviewTheme.id === currentActiveThemeId;

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Wallpaper Preview Lightbox"
          className="fixed inset-0 z-50 flex flex-col justify-between p-4 sm:p-6 lg:p-8 select-none"
        >
          {/* 1. Backdrop Dim & Blur */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/85 backdrop-blur-2xl -z-10"
          />

          {/* 2. Top Header Bar: Counter, Title & Close */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="flex items-center justify-between gap-4 w-full max-w-7xl mx-auto"
          >
            {/* Gallery Counter */}
            <div className="flex items-center gap-3">
              <span className="font-mono-tech text-xs tracking-[0.25em] text-white/50">
                FRAME
              </span>
              <span
                className="font-mono-tech text-sm sm:text-base font-bold tracking-widest px-2.5 py-1 rounded bg-white/[0.06] border border-white/10"
                style={{ color: activePreviewTheme.colors.primaryAccent }}
              >
                {currentIndex + 1} / {themes.length}
              </span>
              <span className="hidden sm:inline text-xs tracking-wider uppercase text-white/60 font-serif-cinematic">
                {activePreviewTheme.name}
              </span>
            </div>

            {/* Actions: Download + Set Theme + Close */}
            <div className="flex items-center gap-2 sm:gap-3">
              <button
                onClick={() => onApplyTheme(activePreviewTheme)}
                className={`flex items-center gap-2 px-3 sm:px-4 py-2 rounded-lg text-xs font-semibold tracking-wider uppercase transition-all duration-300 ${
                  isAppliedAsBackground
                    ? 'bg-white/10 text-white/90 border border-white/20 cursor-default'
                    : 'hover:scale-[1.02] active:scale-95'
                }`}
                style={{
                  backgroundColor: !isAppliedAsBackground ? activePreviewTheme.colors.primaryAccent : undefined,
                  color: !isAppliedAsBackground ? '#05070c' : undefined,
                }}
              >
                {isAppliedAsBackground ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span className="hidden sm:inline">Active Background</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Set Background</span>
                  </>
                )}
              </button>

              <button
                onClick={handleDownload}
                title="Download 4K Ultra-HD Wallpaper"
                aria-label="Download Wallpaper"
                className="p-2 sm:px-3 sm:py-2 rounded-lg border border-white/15 bg-white/5 hover:bg-white/15 text-white transition-all text-xs flex items-center gap-2"
              >
                <Download className="w-4 h-4 text-white/80" />
                <span className="hidden sm:inline tracking-wider uppercase font-medium">Download 4K</span>
              </button>

              <button
                onClick={onClose}
                aria-label="Close Preview"
                className="p-2.5 rounded-lg border border-white/15 bg-white/10 hover:bg-white/20 text-white transition-all hover:rotate-90 duration-300"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </motion.div>

          {/* 3. Center Preview Lightbox Image & Navigation Arrows */}
          <div className="relative flex items-center justify-center w-full max-w-7xl mx-auto my-auto py-2">
            {/* Left Nav Arrow */}
            <button
              onClick={handlePrev}
              aria-label="Previous Wallpaper"
              className="absolute left-2 sm:left-4 z-20 p-3 sm:p-4 rounded-full bg-black/60 hover:bg-black/85 backdrop-blur-md border border-white/15 text-white/80 hover:text-white hover:scale-110 active:scale-95 transition-all shadow-xl"
            >
              <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>

            {/* Main Landscape Preview Container */}
            <div className="relative w-full lg:w-[75vw] max-w-5xl aspect-video rounded-2xl overflow-hidden shadow-[0_20px_80px_rgba(0,0,0,0.9)] border border-white/15 bg-black/50 group">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activePreviewTheme.id}
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.02 }}
                  transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                  className="relative w-full h-full"
                >
                  <img
                    src={activePreviewTheme.posterSrc}
                    alt={activePreviewTheme.name}
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />

                  {/* Measured scrim at bottom for photo metadata */}
                  <div className="absolute inset-x-0 bottom-0 p-4 sm:p-6 bg-gradient-to-t from-black/90 via-black/50 to-transparent flex flex-col sm:flex-row sm:items-end justify-between gap-3 pointer-events-none">
                    <div>
                      <span
                        className="text-[11px] font-mono-tech tracking-[0.2em] uppercase font-bold"
                        style={{ color: activePreviewTheme.colors.primaryAccent }}
                      >
                        {activePreviewTheme.indexLabel}
                      </span>
                      <h2 className="font-serif-cinematic text-lg sm:text-2xl font-bold text-white tracking-wide">
                        {activePreviewTheme.headline}
                      </h2>
                      <p className="text-xs sm:text-sm text-white/70 max-w-lg mt-0.5">
                        {activePreviewTheme.description}
                      </p>
                    </div>

                    {/* Camera / Film EXIF telemetry */}
                    <div className="flex flex-wrap items-center gap-2 text-[11px] font-mono-tech text-white/50 bg-black/50 px-3 py-1.5 rounded-lg border border-white/10 backdrop-blur-sm self-start sm:self-auto">
                      <span>{activePreviewTheme.specs.camera}</span>
                      <span>·</span>
                      <span>{activePreviewTheme.specs.focalLength}</span>
                      <span>·</span>
                      <span>{activePreviewTheme.specs.iso}</span>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Right Nav Arrow */}
            <button
              onClick={handleNext}
              aria-label="Next Wallpaper"
              className="absolute right-2 sm:right-4 z-20 p-3 sm:p-4 rounded-full bg-black/60 hover:bg-black/85 backdrop-blur-md border border-white/15 text-white/80 hover:text-white hover:scale-110 active:scale-95 transition-all shadow-xl"
            >
              <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>
          </div>

          {/* 4. Bottom Horizontal Thumbnail Strip */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.3 }}
            className="flex items-center justify-center gap-3 sm:gap-4 w-full max-w-xl mx-auto pb-2"
          >
            {themes.map((theme, idx) => {
              const isSelected = theme.id === activePreviewTheme.id;

              return (
                <button
                  key={theme.id}
                  onClick={() => setActivePreviewTheme(theme)}
                  className={`group relative rounded-lg overflow-hidden transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 ${
                    isSelected
                      ? 'scale-105 shadow-xl'
                      : 'opacity-50 hover:opacity-90 hover:scale-100'
                  }`}
                  style={{
                    border: isSelected
                      ? `2px solid ${theme.colors.primaryAccent}`
                      : '1px solid rgba(255,255,255,0.15)',
                    boxShadow: isSelected ? theme.colors.activeGlow : undefined,
                  }}
                >
                  <div className="relative w-20 sm:w-28 h-12 sm:h-16 bg-black/40">
                    <img
                      src={theme.posterSrc}
                      alt={theme.name}
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-black/30 group-hover:bg-transparent transition-colors" />
                    <span className="absolute bottom-1 right-1.5 text-[9px] font-mono-tech tracking-wider text-white/80 uppercase">
                      0{idx + 1}
                    </span>
                  </div>
                </button>
              );
            })}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
