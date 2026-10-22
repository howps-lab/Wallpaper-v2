import React from 'react';
import { X, Camera, Film, Keyboard, Volume2 } from 'lucide-react';
import { WallpaperTheme } from '../types/theme';
import { motion, AnimatePresence } from 'motion/react';

interface SpecsModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentTheme: WallpaperTheme;
}

export const SpecsModal: React.FC<SpecsModalProps> = ({
  isOpen,
  onClose,
  currentTheme,
}) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 select-none"
        >
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/80 backdrop-blur-xl -z-10"
          />

          {/* Modal Panel */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-2xl rounded-2xl glass-panel p-6 sm:p-8 shadow-2xl border border-white/15 max-h-[90vh] overflow-y-auto"
            style={{
              borderColor: `${currentTheme.colors.primaryAccent}40`,
            }}
          >
            {/* Header */}
            <div className="flex items-center justify-between pb-5 border-b border-white/10">
              <div>
                <span className="text-[10px] font-mono-tech tracking-[0.25em] uppercase text-white/50 block">
                  CINEMATOGRAPHY & CURATION
                </span>
                <h2 className="font-serif-cinematic text-xl sm:text-2xl font-bold text-white tracking-wide">
                  AFTERGLOW Architecture
                </h2>
              </div>
              <button
                onClick={onClose}
                className="p-2 rounded-lg border border-white/10 hover:bg-white/10 text-white transition-colors"
                aria-label="Close Dialog"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Content */}
            <div className="space-y-6 pt-6">
              {/* Active Theme Telemetry */}
              <div className="p-4 rounded-xl bg-white/[0.04] border border-white/10">
                <div className="flex items-center gap-2 text-xs font-mono-tech text-white/60 mb-2">
                  <Camera className="w-4 h-4" style={{ color: currentTheme.colors.primaryAccent }} />
                  <span>ACTIVE ATMOSPHERE: {currentTheme.name}</span>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs">
                  <div>
                    <span className="text-white/40 block">Camera Rig</span>
                    <span className="font-medium text-white/90">{currentTheme.specs.camera}</span>
                  </div>
                  <div>
                    <span className="text-white/40 block">Optics</span>
                    <span className="font-medium text-white/90">{currentTheme.specs.focalLength}</span>
                  </div>
                  <div>
                    <span className="text-white/40 block">Aperture</span>
                    <span className="font-medium text-white/90">{currentTheme.specs.aperture}</span>
                  </div>
                  <div>
                    <span className="text-white/40 block">Sensor Rating</span>
                    <span className="font-medium text-white/90">{currentTheme.specs.iso}</span>
                  </div>
                  <div>
                    <span className="text-white/40 block">Shutter Angle</span>
                    <span className="font-medium text-white/90">{currentTheme.specs.shutter}</span>
                  </div>
                  <div>
                    <span className="text-white/40 block">Color Transform</span>
                    <span className="font-medium text-white/90">{currentTheme.specs.colorGrade}</span>
                  </div>
                </div>
              </div>

              {/* Philosophy */}
              <div>
                <h3 className="text-sm font-semibold tracking-wider text-white uppercase font-serif-cinematic mb-2 flex items-center gap-2">
                  <Film className="w-4 h-4 text-white/60" />
                  Editorial Vision
                </h3>
                <p className="text-xs sm:text-sm text-white/75 leading-relaxed">
                  Afterglow is an interactive cinematic exhibition exploring the intersection of light, time, and atmospheric landscape cinematography. Each sequence loops natively with seamless dual-buffer crossfades and color grading tuned to specific solar elevations.
                </p>
              </div>

              {/* Keyboard Shortcuts */}
              <div>
                <h3 className="text-sm font-semibold tracking-wider text-white uppercase font-serif-cinematic mb-2 flex items-center gap-2">
                  <Keyboard className="w-4 h-4 text-white/60" />
                  Keyboard Navigation
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-mono-tech text-white/70">
                  <div className="flex items-center justify-between p-2 rounded bg-white/[0.03] border border-white/5">
                    <span>Spacebar</span>
                    <span className="text-white/40">Toggle Video Play/Pause</span>
                  </div>
                  <div className="flex items-center justify-between p-2 rounded bg-white/[0.03] border border-white/5">
                    <span>← / →</span>
                    <span className="text-white/40">Cycle Atmospheres</span>
                  </div>
                  <div className="flex items-center justify-between p-2 rounded bg-white/[0.03] border border-white/5">
                    <span>E Key</span>
                    <span className="text-white/40">Explore Wallpaper Lightbox</span>
                  </div>
                  <div className="flex items-center justify-between p-2 rounded bg-white/[0.03] border border-white/5">
                    <span>M Key</span>
                    <span className="text-white/40">Toggle Audio Ambiance</span>
                  </div>
                  <div className="flex items-center justify-between p-2 rounded bg-white/[0.03] border border-white/5">
                    <span>Escape</span>
                    <span className="text-white/40">Close Any Modal</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="mt-8 pt-4 border-t border-white/10 flex items-center justify-between text-[11px] text-white/40 font-mono-tech">
              <span>AFTERGLOW v1.0 · PRODUCTION MASTER</span>
              <button
                onClick={onClose}
                className="px-4 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white font-medium transition-colors"
              >
                Close
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
