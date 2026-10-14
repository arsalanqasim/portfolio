import { useState, useEffect } from 'react';
import { Volume2, VolumeX, Sun, Moon } from 'lucide-react';
import { westernAudio } from '../utils/westernAudio';

export default function CinematicControls() {
  const [isAudioEnabled, setIsAudioEnabled] = useState(false);
  const [theme, setTheme] = useState<'high-noon' | 'midnight'>('high-noon');

  useEffect(() => {
    setIsAudioEnabled(!westernAudio.getIsMuted());

    const saved = localStorage.getItem('portfolio_theme');
    if (saved === 'midnight' || (!saved && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      setTheme('midnight');
      document.documentElement.classList.add('dark');
      document.documentElement.setAttribute('data-theme', 'midnight');
    } else {
      setTheme('high-noon');
      document.documentElement.classList.remove('dark');
      document.documentElement.setAttribute('data-theme', 'high-noon');
    }
  }, []);

  const toggleSound = () => {
    const enabled = westernAudio.toggleMute();
    setIsAudioEnabled(enabled);
  };

  const toggleLighting = () => {
    westernAudio.playCylinderClick();
    const next = theme === 'high-noon' ? 'midnight' : 'high-noon';
    setTheme(next);
    localStorage.setItem('portfolio_theme', next);
    if (next === 'midnight') {
      document.documentElement.classList.add('dark');
      document.documentElement.setAttribute('data-theme', 'midnight');
    } else {
      document.documentElement.classList.remove('dark');
      document.documentElement.setAttribute('data-theme', 'high-noon');
    }
  };

  return (
    <div className="flex items-center gap-2">
      {/* Sound FX Toggle */}
      <button
        onClick={toggleSound}
        className={`inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded border text-xs font-serif font-medium transition-colors cursor-pointer ${
          isAudioEnabled
            ? 'border-accent bg-accent/15 text-accent'
            : 'border-border bg-surface text-ink-muted hover:text-ink hover:border-border-strong'
        }`}
        title={isAudioEnabled ? 'Western Sound: ON (Click to Mute)' : 'Western Sound: OFF (Click to Enable)'}
        aria-label="Toggle Western Sound"
      >
        {isAudioEnabled ? <Volume2 className="h-3.5 w-3.5 text-accent" /> : <VolumeX className="h-3.5 w-3.5" />}
        <span className="hidden sm:inline">{isAudioEnabled ? 'SFX: ON' : 'SFX: OFF'}</span>
      </button>

      {/* High Noon / Midnight Toggle */}
      <button
        onClick={toggleLighting}
        className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded border border-border bg-surface text-xs font-serif font-medium text-ink-secondary hover:text-accent hover:border-accent transition-colors cursor-pointer"
        title={`Toggle to ${theme === 'high-noon' ? 'Midnight in Dirt' : 'High Noon'}`}
        aria-label="Toggle Lighting Mode"
      >
        {theme === 'high-noon' ? (
          <>
            <Sun className="h-3.5 w-3.5 text-accent" />
            <span className="hidden sm:inline">High Noon</span>
          </>
        ) : (
          <>
            <Moon className="h-3.5 w-3.5 text-accent" />
            <span className="hidden sm:inline">Midnight</span>
          </>
        )}
      </button>
    </div>
  );
}
