import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { westernAudio } from '../utils/westernAudio';

export type AnimationMode = 'atmosphere' | 'novelty' | 'threejs';

interface AnimationContextType {
  mode: AnimationMode;
  setMode: (mode: AnimationMode) => void;
}

const AnimationContext = createContext<AnimationContextType | undefined>(undefined);

export function AnimationProvider({ children }: { children: ReactNode }) {
  const [mode, setModeState] = useState<AnimationMode>('atmosphere');

  useEffect(() => {
    // 1. Read URL query parameter ?anim=
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const urlAnim = params.get('anim');
      if (urlAnim === 'atmosphere' || urlAnim === 'novelty' || urlAnim === 'threejs') {
        setModeState(urlAnim);
        return;
      }
      // 2. Or read localStorage
      const saved = localStorage.getItem('portfolio_anim_mode');
      if (saved === 'atmosphere' || saved === 'novelty' || saved === 'threejs') {
        setModeState(saved);
      }
    }
  }, []);

  const setMode = (newMode: AnimationMode) => {
    westernAudio.playCylinderClick();
    setModeState(newMode);
    if (typeof window !== 'undefined') {
      localStorage.setItem('portfolio_anim_mode', newMode);
      const url = new URL(window.location.href);
      url.searchParams.set('anim', newMode);
      window.history.replaceState({}, '', url.toString());
    }
  };

  return (
    <AnimationContext.Provider value={{ mode, setMode }}>
      {children}
    </AnimationContext.Provider>
  );
}

export function useAnimation() {
  const context = useContext(AnimationContext);
  if (!context) {
    throw new Error('useAnimation must be used within an AnimationProvider');
  }
  return context;
}
