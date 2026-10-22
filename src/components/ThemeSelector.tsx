import React from 'react';
import { WallpaperTheme } from '../types/theme';
import { motion } from 'motion/react';
import { Play, Sparkles } from 'lucide-react';

interface ThemeSelectorProps {
  themes: WallpaperTheme[];
  currentTheme: WallpaperTheme;
  onSelectTheme: (theme: WallpaperTheme) => void;
  onOpenPreview: () => void;
}

export const ThemeSelector: React.FC<ThemeSelectorProps> = ({
  themes,
  currentTheme,
  onSelectTheme,
  onOpenPreview,
}) => {
  return (
    <nav
      aria-label="Theme selector"
      className="fixed z-30 lg:right-10 lg:top-1/2 lg:-translate-y-1/2 bottom-5 left-4 right-4 lg:left-auto lg:bottom-auto flex lg:flex-col flex-row justify-center gap-3.5 sm:gap-4 p-2 sm:p-2.5 rounded-2xl glass-panel-subtle shadow-2xl backdrop-blur-xl border border-white/10"
    >
      {themes.map((theme) => {
        const isActive = theme.id === currentTheme.id;

        return (
          <div
            key={theme.id}
            className="relative flex-1 lg:flex-initial"
          >
            <button
              onClick={() => onSelectTheme(theme)}
              aria-label={`Switch to theme ${theme.name}`}
              aria-pressed={isActive}
              className={`group relative block w-full text-left rounded-xl overflow-hidden transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 ${
                isActive
                  ? 'scale-[1.02] shadow-xl'
                  : 'opacity-70 hover:opacity-100 hover:scale-[1.01]'
              }`}
              style={{
                border: isActive
                  ? `1.5px solid ${theme.colors.primaryAccent}`
                  : '1.5px solid rgba(255, 255, 255, 0.1)',
                boxShadow: isActive ? theme.colors.activeGlow : undefined,
              }}
            >
              {/* Miniature Cinematic Frame (16:9) */}
              <div className="relative w-full lg:w-56 h-20 sm:h-24 lg:h-32 overflow-hidden bg-black/40">
                <img
                  src={theme.posterSrc}
                  alt={theme.name}
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />

                {/* Atmospheric gradient overlay */}
                <div
                  className="absolute inset-0 transition-opacity duration-300"
                  style={{
                    background: `linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.2) 60%, transparent 100%)`,
                  }}
                />

                {/* Subtle active border glow animation */}
                {isActive && (
                  <motion.div
                    layoutId="activeThemeHighlight"
                    className="absolute inset-0 pointer-events-none ring-1 ring-inset"
                    style={{
                      borderColor: theme.colors.primaryAccent,
                    }}
                    transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                  />
                )}

                {/* Playing / Active indicator tag */}
                {isActive && (
                  <div className="absolute top-2 right-2 flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-[10px] font-mono-tech tracking-wider text-white">
                    <span
                      className="w-1.5 h-1.5 rounded-full"
                      style={{ backgroundColor: theme.colors.primaryAccent }}
                    />
                    <span className="hidden sm:inline">LIVE</span>
                  </div>
                )}

                {/* Theme index and name overlay */}
                <div className="absolute bottom-2 left-2.5 right-2.5 flex items-end justify-between">
                  <div>
                    <span className="block text-[10px] font-mono-tech tracking-[0.2em] text-white/60 uppercase">
                      {theme.index}
                    </span>
                    <h3 className="font-serif-cinematic text-xs sm:text-sm font-bold text-white tracking-wider uppercase truncate">
                      {theme.name}
                    </h3>
                  </div>

                  {isActive && (
                    <div
                      className="w-1.5 h-1.5 rounded-full mb-1"
                      style={{ backgroundColor: theme.colors.primaryAccent }}
                    />
                  )}
                </div>
              </div>
            </button>
          </div>
        );
      })}
    </nav>
  );
};
