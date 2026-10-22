# AFTERGLOW — Cinematic Wallpaper Slider

An immersive, editorial cinematic wallpaper gallery combining looping video backgrounds, atmospheric color grading, elegant typography, interactive wallpaper previews, smooth transitions, and a dark visual identity.

---

## Features

- **Full-Viewport Video Backgrounds**: Looping, muted H.264 video playback with dual-buffer crossfades and zero layout shifts.
- **Three Dynamic Color Themes**:
  - `01 / BLUE HOUR` — Luminous sky blue, cyan, and cool teal light across Tuscan rolling hills (`summer_day.mp4`).
  - `02 / GOLDEN HAZE` — Burnt amber, warm gold, and sun-drenched mountain passes (`sunset_field.mp4`).
  - `03 / NEON AFTERDARK` — Futuristic cyberpunk obsidian monoliths, misty nocturnal corridors, and electric cyan streaks (`night_time.mp4`).
- **Seamless Theme Switching**: Updates background video, color palette, active glows, typography accents, and procedural ambient audio frequency.
- **Cinematic Photography Lightbox**:
  - Full-screen centered landscape preview with dimmed backdrop.
  - Gallery counter (`1 / 3`), previous/next navigation, close button.
  - Horizontal thumbnail strip with active indicators.
  - Direct 4K wallpaper download and one-click "Set Background" application.
- **Procedural Ambient Synthesizer**: Procedural audio drone using the Web Audio API with smooth ramps tuned to the harmonic key of each theme.
- **Responsive Architecture**:
  - Desktop: Editorial left column with vertically stacked miniature cinematic frames on the right.
  - Mobile & Tablet: Fluid typography using `clamp()`, horizontal bottom thumbnail selector with safe-area support, no horizontal overflow.
- **Accessibility & Motion Discipline**: Keyboard controls (`Space` to pause, `←/→` to cycle themes, `E` to explore lightbox, `M` to toggle audio, `ESC` to close modals), visible focus rings, and `prefers-reduced-motion` compliance.

---

## Project Structure

```text
cinematic-wallpaper-slider/
├── public/
│   ├── videos/
│   │   ├── summer_day.mp4
│   │   ├── sunset_field.mp4
│   │   └── night_time.mp4
│   └── images/
│       ├── summer_day_poster.jpg
│       ├── sunset_field_poster.jpg
│       └── night_time_poster.jpg
├── src/
│   ├── components/
│   │   ├── BackgroundVideo.tsx
│   │   ├── TopNav.tsx
│   │   ├── MainContent.tsx
│   │   ├── ThemeSelector.tsx
│   │   ├── WallpaperPreview.tsx
│   │   ├── PlaybackControl.tsx
│   │   └── SpecsModal.tsx
│   ├── data/
│   │   └── themes.ts
│   ├── hooks/
│   │   ├── useBackgroundVideo.ts
│   │   └── useAmbientAudio.ts
│   ├── types/
│   │   └── theme.ts
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
├── index.html
├── package.json
├── tsconfig.json
├── vite.config.ts
└── README.md
```

---

## Local Development & Build

### Prerequisites

- Node.js 18+ or 20+
- npm or pnpm

### 1. Install Dependencies

```bash
npm install
```

### 2. Run the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) (or the port indicated in your console) to view the application.

### 3. Build for Production

```bash
npm run build
```

This compiles TypeScript and bundles assets into the optimized `dist/` directory.

### 4. Preview the Production Build

```bash
npm run preview
```

---

## Deployment to Vercel via GitHub

1. **Push to GitHub**:
   ```bash
   git init
   git add .
   git commit -m "Initial commit: AFTERGLOW Cinematic Wallpaper Slider"
   git remote add origin https://github.com/<your-username>/<your-repo-name>.git
   git branch -M main
   git push -u origin main
   ```

2. **Deploy on Vercel**:
   - Go to [Vercel Dashboard](https://vercel.com) and click **"Add New Project"**.
   - Import your GitHub repository.
   - Vercel automatically detects the **Vite** framework preset:
     - **Build Command**: `npm run build`
     - **Output Directory**: `dist`
     - **Install Command**: `npm install`
   - Click **Deploy**. The site will be live within seconds with high-speed global CDN delivery for all videos and poster imagery.

---

## Keyboard Shortcuts

| Key | Action |
| --- | --- |
| `Space` | Toggle Background Video Play / Pause |
| `←` / `→` | Cycle Previous / Next Atmosphere |
| `E` | Open Wallpaper Lightbox Preview |
| `M` | Toggle Ambient Synthesizer Audio |
| `Esc` | Close Preview Lightbox or Dialog |
