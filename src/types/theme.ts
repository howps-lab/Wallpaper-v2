/**
 * AFTERGLOW — Theme and Wallpaper Data Types
 */

export interface ThemeColors {
  primaryAccent: string;
  secondaryAccent: string;
  mainText: string;
  mutedText: string;
  surface: string;
  surfaceBorder: string;
  activeGlow: string;
  overlayGradient: string;
  filmTone: string;
}

export interface TechnicalSpecs {
  resolution: string;
  aspectRatio: string;
  colorGrade: string;
  frameRate: string;
  camera: string;
  focalLength: string;
  iso: string;
  aperture: string;
  shutter: string;
}

export interface WallpaperTheme {
  id: 'blue-hour' | 'golden-haze' | 'neon-afterdark';
  index: '01' | '02' | '03';
  indexLabel: string;
  name: string;
  headline: string;
  tagline: string;
  description: string;
  atmosphereMood: string;
  locationConcept: string;
  videoSrc: string;
  posterSrc: string;
  colors: ThemeColors;
  specs: TechnicalSpecs;
  audioFrequency: number; // Hz for atmospheric ambient sound drone
}
