import React, { useState } from 'react';
import { Play, Pause, Maximize, Minimize, HelpCircle, Layers, Sliders } from 'lucide-react';
import { WallpaperTheme } from '../types/theme';

interface PlaybackControlProps {
  isPlaying: boolean;
  onTogglePlay: () => void;
  currentTheme: WallpaperTheme;
  onOpenSpecsModal: () => void;
}

export const PlaybackControl: React.FC<PlaybackControlProps> = ({
  isPlaying,
  onTogglePlay,
  currentTheme,
  onOpenSpecsModal,
}) => {
  const [isFullscreen, setIsFullscreen] = useState(false);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().then(() => setIsFullscreen(true)).catch(() => {});
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen().then(() => setIsFullscreen(false)).catch(() => {});
      }
    }
  };

  return (
    <div className="fixed bottom-6 left-6 z-30 hidden sm:flex items-center gap-2 p-1.5 rounded-xl glass-panel-subtle border border-white/10 text-white/80">
      {/* Play / Pause toggle */}
      <button
        onClick={onTogglePlay}
        title={isPlaying ? 'Pause background video (Space)' : 'Play background video (Space)'}
        aria-label={isPlaying ? 'Pause video' : 'Play video'}
        className="p-2.5 rounded-lg hover:bg-white/10 hover:text-white transition-all text-xs flex items-center gap-1.5 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-white/40"
      >
        {isPlaying ? (
          <Pause className="w-3.5 h-3.5" />
        ) : (
          <Play className="w-3.5 h-3.5 fill-current" />
        )}
        <span className="font-mono-tech text-[11px] uppercase tracking-wider">
          {isPlaying ? 'Pause' : 'Play'}
        </span>
      </button>

      <div className="w-[1px] h-4 bg-white/10" aria-hidden="true" />

      {/* Cinematic Specs / About */}
      <button
        onClick={onOpenSpecsModal}
        title="View Camera & Color Specs"
        aria-label="View Technical Specifications"
        className="p-2.5 rounded-lg hover:bg-white/10 hover:text-white transition-all text-xs flex items-center gap-1.5"
      >
        <Sliders className="w-3.5 h-3.5" />
        <span className="font-mono-tech text-[11px] uppercase tracking-wider hidden md:inline">
          Specs
        </span>
      </button>

      {/* Fullscreen toggle */}
      <button
        onClick={toggleFullscreen}
        title="Toggle Fullscreen"
        aria-label="Toggle Fullscreen"
        className="p-2.5 rounded-lg hover:bg-white/10 hover:text-white transition-all text-xs"
      >
        {isFullscreen ? <Minimize className="w-3.5 h-3.5" /> : <Maximize className="w-3.5 h-3.5" />}
      </button>
    </div>
  );
};
