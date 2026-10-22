import React from 'react';
import { WallpaperTheme } from '../types/theme';
import { Maximize2, Sparkles, Volume2, VolumeX, Info } from 'lucide-react';

interface TopNavProps {
  currentTheme: WallpaperTheme;
  onOpenPreview: () => void;
  onOpenAbout: () => void;
  isAudioEnabled: boolean;
  onToggleAudio: () => void;
  onSelectThemeById: (id: WallpaperTheme['id']) => void;
}

export const TopNav: React.FC<TopNavProps> = ({
  currentTheme,
  onOpenPreview,
  onOpenAbout,
  isAudioEnabled,
  onToggleAudio,
  onSelectThemeById,
}) => {
  return (
    <header className="fixed top-0 left-0 right-0 z-40 flex items-center justify-between gap-8 px-6 sm:px-12 py-5 sm:py-6 border-b border-white/[0.08] backdrop-blur-md bg-black/25">
      {/* Zone 1: Single text element wordmark */}
      <a
        href="#"
        onClick={(e) => {
          e.preventDefault();
          onSelectThemeById('blue-hour');
        }}
        className="font-serif-cinematic text-lg sm:text-xl font-bold tracking-[0.25em] text-white hover:opacity-90 transition-opacity whitespace-nowrap shrink-0 flex items-center gap-2"
        style={{
          textShadow: `0 0 20px ${currentTheme.colors.primaryAccent}40`,
        }}
      >
        AFTERGLOW
      </a>

      {/* Zone 2: 4 clean single-line nav links with subtle hover underlines */}
      <nav className="hidden md:flex items-center gap-8 text-xs uppercase tracking-[0.2em] font-medium text-white/70">
        <button
          onClick={() => onSelectThemeById('blue-hour')}
          className={`hover:text-white transition-colors pb-0.5 whitespace-nowrap shrink-0 ${
            currentTheme.id === 'blue-hour' ? 'text-white border-b border-current font-semibold' : ''
          }`}
        >
          Blue Hour
        </button>
        <button
          onClick={() => onSelectThemeById('golden-haze')}
          className={`hover:text-white transition-colors pb-0.5 whitespace-nowrap shrink-0 ${
            currentTheme.id === 'golden-haze' ? 'text-white border-b border-current font-semibold' : ''
          }`}
        >
          Golden Haze
        </button>
        <button
          onClick={() => onSelectThemeById('neon-afterdark')}
          className={`hover:text-white transition-colors pb-0.5 whitespace-nowrap shrink-0 ${
            currentTheme.id === 'neon-afterdark' ? 'text-white border-b border-current font-semibold' : ''
          }`}
        >
          Neon Afterdark
        </button>
        <button
          onClick={onOpenAbout}
          className="hover:text-white transition-colors pb-0.5 whitespace-nowrap shrink-0 flex items-center gap-1.5"
        >
          <Info className="w-3.5 h-3.5" />
          <span>Curator Note</span>
        </button>
      </nav>

      {/* Zone 3: 1 primary action + subtle audio ambiance trigger */}
      <div className="flex items-center gap-3 shrink-0">
        <button
          onClick={onToggleAudio}
          title={isAudioEnabled ? 'Mute ambient synthesizer' : 'Enable ambient synthesizer'}
          aria-label={isAudioEnabled ? 'Mute ambient sound' : 'Enable ambient sound'}
          className="p-2.5 rounded-lg border border-white/10 bg-white/[0.04] hover:bg-white/10 text-white/80 hover:text-white transition-all text-xs flex items-center gap-1.5"
        >
          {isAudioEnabled ? (
            <>
              <Volume2 className="w-4 h-4 text-emerald-400" />
              <span className="hidden lg:inline text-[11px] font-mono-tech tracking-wider text-emerald-400">ATMOSPHERE ON</span>
            </>
          ) : (
            <>
              <VolumeX className="w-4 h-4 text-white/60" />
              <span className="hidden lg:inline text-[11px] font-mono-tech tracking-wider text-white/60">AUDIO AMBIENCE</span>
            </>
          )}
        </button>

        <button
          onClick={onOpenPreview}
          className="group relative flex items-center gap-2 px-4 py-2 text-xs font-semibold uppercase tracking-[0.15em] rounded-lg transition-all duration-300 whitespace-nowrap shrink-0"
          style={{
            backgroundColor: currentTheme.colors.primaryAccent,
            color: '#05070c',
            boxShadow: currentTheme.colors.activeGlow,
          }}
        >
          <Maximize2 className="w-3.5 h-3.5 group-hover:scale-110 transition-transform" />
          <span>Explore Lightbox</span>
        </button>
      </div>
    </header>
  );
};
