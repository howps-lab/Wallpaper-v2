import React from 'react';
import { WallpaperTheme } from '../types/theme';
import { Eye, Film, Sparkles, ChevronRight, SlidersHorizontal } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface MainContentProps {
  currentTheme: WallpaperTheme;
  onOpenPreview: () => void;
  onNextTheme: () => void;
}

export const MainContent: React.FC<MainContentProps> = ({
  currentTheme,
  onOpenPreview,
  onNextTheme,
}) => {
  return (
    <div className="relative z-20 flex flex-col justify-center min-h-[calc(100dvh-100px)] max-w-2xl px-6 sm:px-12 lg:px-16 pt-24 pb-32 sm:pb-24 pointer-events-none">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentTheme.id}
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -18 }}
          transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col gap-6 sm:gap-7 pointer-events-auto"
        >
          {/* 1. Theme Identifier & Brand Kicker */}
          <div className="flex items-center gap-3 text-xs tracking-[0.25em] font-mono-tech uppercase">
            <span
              className="font-bold"
              style={{ color: currentTheme.colors.primaryAccent }}
            >
              {currentTheme.indexLabel}
            </span>
            <span className="text-white/30" aria-hidden="true">·</span>
            <span className="text-white/60 tracking-[0.3em]">
              CINEMATIC GALLERY
            </span>
          </div>

          {/* 2. Large Editorial Headline */}
          <h1
            className="font-serif-cinematic font-bold leading-[1.06] tracking-tight text-white text-[clamp(2.5rem,6vw,4.75rem)]"
            style={{
              textWrap: 'balance',
              textShadow: '0 4px 30px rgba(0, 0, 0, 0.75)',
            }}
          >
            {currentTheme.headline}
          </h1>

          {/* 3. Concise Supporting Description */}
          <p
            className="text-base sm:text-lg leading-relaxed text-white/80 max-w-xl font-light"
            style={{
              color: currentTheme.colors.mutedText,
              textWrap: 'balance',
            }}
          >
            {currentTheme.tagline}
          </p>

          {/* 4. Action Bar */}
          <div className="flex flex-wrap items-center gap-4 pt-2">
            <button
              onClick={onOpenPreview}
              className="group relative flex items-center gap-3 px-6 py-3.5 rounded-xl font-semibold text-xs tracking-[0.18em] uppercase transition-all duration-300 transform active:scale-95"
              style={{
                backgroundColor: currentTheme.colors.primaryAccent,
                color: '#05070c',
                boxShadow: currentTheme.colors.activeGlow,
              }}
            >
              <Eye className="w-4 h-4 transition-transform group-hover:scale-110" />
              <span>Explore Wallpaper</span>
              <ChevronRight className="w-4 h-4 opacity-70 group-hover:translate-x-1 transition-transform" />
            </button>

            <button
              onClick={onNextTheme}
              className="flex items-center gap-2.5 px-5 py-3.5 rounded-xl text-xs tracking-[0.16em] uppercase font-medium text-white/90 glass-panel-subtle hover:bg-white/10 hover:text-white transition-all active:scale-95"
            >
              <Film className="w-3.5 h-3.5 text-white/70" />
              <span>Next World</span>
            </button>
          </div>

          {/* 5. Clean Unboxed Technical Specs Strip */}
          <div className="pt-4 border-t border-white/[0.08] flex flex-wrap items-center gap-x-4 gap-y-2 text-xs font-mono-tech text-white/60">
            <span>{currentTheme.specs.resolution}</span>
            <span className="text-white/20" aria-hidden="true">·</span>
            <span>{currentTheme.specs.frameRate}</span>
            <span className="text-white/20" aria-hidden="true">·</span>
            <span>{currentTheme.specs.focalLength}</span>
            <span className="text-white/20" aria-hidden="true">·</span>
            <span
              className="font-medium"
              style={{ color: currentTheme.colors.secondaryAccent }}
            >
              {currentTheme.specs.colorGrade}
            </span>
          </div>

          {/* 6. Interaction Hint */}
          <div className="flex items-center gap-2 text-[11px] tracking-[0.25em] font-mono-tech uppercase text-white/40 pt-1">
            <span className="w-1.5 h-1.5 rounded-full bg-white/40" />
            <span>Select a world to explore</span>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};
