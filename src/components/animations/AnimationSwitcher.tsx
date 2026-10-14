import { useAnimation, AnimationMode } from '../../context/AnimationContext';
import { Sparkles, Eye, Box } from 'lucide-react';

const MODES: { id: AnimationMode; label: string; icon: typeof Sparkles }[] = [
  { id: 'atmosphere', label: 'Atmosphere', icon: Sparkles },
  { id: 'novelty', label: 'Novelty', icon: Eye },
  { id: 'threejs', label: '3D WebGL', icon: Box },
];

export default function AnimationSwitcher() {
  const { mode, setMode } = useAnimation();

  return (
    <div className="flex items-center gap-1 p-0.5 rounded border border-border-strong bg-canvas/60 text-xs font-serif shadow-xs">
      {MODES.map((item) => {
        const Icon = item.icon;
        const isActive = mode === item.id;
        return (
          <button
            key={item.id}
            onClick={() => setMode(item.id)}
            className={`px-2 py-1 rounded flex items-center gap-1 text-[11px] font-medium transition-all cursor-pointer ${
              isActive
                ? 'bg-accent text-white font-semibold shadow-xs'
                : 'text-ink-secondary hover:text-accent hover:bg-surface'
            }`}
            title={`Switch to ${item.label} animations (?anim=${item.id})`}
            aria-pressed={isActive}
          >
            <Icon className="h-3 w-3" />
            <span className="hidden sm:inline">{item.label}</span>
          </button>
        );
      })}
    </div>
  );
}
