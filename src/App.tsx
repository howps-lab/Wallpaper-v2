/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useCallback } from 'react';
import { THEMES } from './data/themes';
import { WallpaperTheme } from './types/theme';
import { BackgroundVideo } from './components/BackgroundVideo';
import { TopNav } from './components/TopNav';
import { MainContent } from './components/MainContent';
import { ThemeSelector } from './components/ThemeSelector';
import { WallpaperPreview } from './components/WallpaperPreview';
import { PlaybackControl } from './components/PlaybackControl';
import { SpecsModal } from './components/SpecsModal';
import { useBackgroundVideo } from './hooks/useBackgroundVideo';
import { useAmbientAudio } from './hooks/useAmbientAudio';

export default function App() {
  // 1. Initial State: Theme 01 (Blue Hour) is active by default; preview is closed.
  const [currentTheme, setCurrentTheme] = useState<WallpaperTheme>(THEMES[0]);
  const [isPreviewOpen, setIsPreviewOpen] = useState<boolean>(false);
  const [activePreviewTheme, setActivePreviewTheme] = useState<WallpaperTheme>(THEMES[0]);
  const [isSpecsOpen, setIsSpecsOpen] = useState<boolean>(false);

  // 2. Video & Audio Background Hooks
  const videoState = useBackgroundVideo({ currentTheme });
  const { isAudioEnabled, toggleAudio, updateFrequency } = useAmbientAudio();

  // 3. Update theme colors on CSS root
  useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty('--theme-primary', currentTheme.colors.primaryAccent);
    root.style.setProperty('--theme-secondary', currentTheme.colors.secondaryAccent);
    root.style.setProperty('--theme-text', currentTheme.colors.mainText);
    root.style.setProperty('--theme-muted', currentTheme.colors.mutedText);
    root.style.setProperty('--theme-surface', currentTheme.colors.surface);
    root.style.setProperty('--theme-border', currentTheme.colors.surfaceBorder);
    root.style.setProperty('--theme-glow', currentTheme.colors.activeGlow);

    // Update ambient synthesizer frequency to match the theme drone
    updateFrequency(currentTheme.audioFrequency);
  }, [currentTheme, updateFrequency]);

  // 4. Switching theme directly changes background video and colors
  const handleSelectTheme = useCallback((theme: WallpaperTheme) => {
    setCurrentTheme(theme);
  }, []);

  const handleSelectThemeById = useCallback((id: WallpaperTheme['id']) => {
    const target = THEMES.find((t) => t.id === id);
    if (target) {
      setCurrentTheme(target);
    }
  }, []);

  // 5. Open wallpaper lightbox preview
  const handleOpenPreview = useCallback(() => {
    setActivePreviewTheme(currentTheme);
    setIsPreviewOpen(true);
  }, [currentTheme]);

  // 6. Close wallpaper lightbox preview
  const handleClosePreview = useCallback(() => {
    setIsPreviewOpen(false);
  }, []);

  // 7. Cycle next theme
  const handleNextTheme = useCallback(() => {
    const idx = THEMES.findIndex((t) => t.id === currentTheme.id);
    const nextIdx = (idx + 1) % THEMES.length;
    setCurrentTheme(THEMES[nextIdx]);
  }, [currentTheme]);

  const handlePrevTheme = useCallback(() => {
    const idx = THEMES.findIndex((t) => t.id === currentTheme.id);
    const prevIdx = (idx - 1 + THEMES.length) % THEMES.length;
    setCurrentTheme(THEMES[prevIdx]);
  }, [currentTheme]);

  // 8. Global keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't intercept if user is typing in an input/textarea
      if (['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement).tagName)) return;

      if (e.code === 'Space') {
        e.preventDefault();
        videoState.togglePlay();
      } else if (e.key === 'ArrowRight' && !isPreviewOpen) {
        e.preventDefault();
        handleNextTheme();
      } else if (e.key === 'ArrowLeft' && !isPreviewOpen) {
        e.preventDefault();
        handlePrevTheme();
      } else if ((e.key === 'e' || e.key === 'E') && !isPreviewOpen && !isSpecsOpen) {
        e.preventDefault();
        handleOpenPreview();
      } else if (e.key === 'm' || e.key === 'M') {
        e.preventDefault();
        toggleAudio();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [
    videoState,
    isPreviewOpen,
    isSpecsOpen,
    handleNextTheme,
    handlePrevTheme,
    handleOpenPreview,
    toggleAudio,
  ]);

  return (
    <div className="relative min-h-[100dvh] w-full text-white font-sans overflow-x-hidden">
      {/* Background Video Layer */}
      <BackgroundVideo
        currentTheme={currentTheme}
        isPlaying={videoState.isPlaying}
        isMuted={videoState.isMuted}
        hasError={videoState.hasError}
        setHasError={videoState.setHasError}
        isLoaded={videoState.isLoaded}
        setIsLoaded={videoState.setIsLoaded}
        activeSlot={videoState.activeSlot}
        slotASrc={videoState.slotASrc}
        slotBSrc={videoState.slotBSrc}
        videoARef={videoState.videoARef}
        videoBRef={videoState.videoBRef}
        togglePlay={videoState.togglePlay}
      />

      {/* Top 3-Zone Navigation Header */}
      <TopNav
        currentTheme={currentTheme}
        onOpenPreview={handleOpenPreview}
        onOpenAbout={() => setIsSpecsOpen(true)}
        isAudioEnabled={isAudioEnabled}
        onToggleAudio={toggleAudio}
        onSelectThemeById={handleSelectThemeById}
      />

      {/* Left Editorial Main Content */}
      <main>
        <MainContent
          currentTheme={currentTheme}
          onOpenPreview={handleOpenPreview}
          onNextTheme={handleNextTheme}
        />
      </main>

      {/* Right Desktop / Bottom Mobile Theme Selector */}
      <ThemeSelector
        themes={THEMES}
        currentTheme={currentTheme}
        onSelectTheme={handleSelectTheme}
        onOpenPreview={handleOpenPreview}
      />

      {/* Enlarged Photography Lightbox Preview Modal */}
      <WallpaperPreview
        isOpen={isPreviewOpen}
        onClose={handleClosePreview}
        themes={THEMES}
        activePreviewTheme={activePreviewTheme}
        setActivePreviewTheme={setActivePreviewTheme}
        onApplyTheme={(theme) => {
          setCurrentTheme(theme);
        }}
        currentActiveThemeId={currentTheme.id}
      />

      {/* Bottom Left Playback & Fullscreen Controls */}
      <PlaybackControl
        isPlaying={videoState.isPlaying}
        onTogglePlay={videoState.togglePlay}
        currentTheme={currentTheme}
        onOpenSpecsModal={() => setIsSpecsOpen(true)}
      />

      {/* Cinematography & Keyboard Shortcuts Modal */}
      <SpecsModal
        isOpen={isSpecsOpen}
        onClose={() => setIsSpecsOpen(false)}
        currentTheme={currentTheme}
      />
    </div>
  );
}
