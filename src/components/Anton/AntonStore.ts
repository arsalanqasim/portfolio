import { create } from 'zustand';
import { AntonState, Point } from './AntonTypes';

interface AntonStore {
  state: AntonState;
  previousState: AntonState | null;
  position: Point;
  targetPosition: Point | null;
  visible: boolean;
  isDragging: boolean;
  activeSection: string;
  message: string | null;
  sessionGreeted: boolean;
  isChatbotOpen: boolean;
  setState: (state: AntonState) => void;
  setPosition: (position: Point) => void;
  setTargetPosition: (position: Point | null) => void;
  setVisible: (visible: boolean) => void;
  setDragging: (isDragging: boolean) => void;
  setActiveSection: (section: string) => void;
  setMessage: (message: string | null) => void;
  setSessionGreeted: (value: boolean) => void;
  setChatbotOpen: (value: boolean) => void;
}

export const useAntonStore = create<AntonStore>((set) => ({
  state: 'arrival',
  previousState: null,
  position: { x: 80, y: 150 },
  targetPosition: null,
  visible: true,
  isDragging: false,
  activeSection: 'home',
  message: null,
  sessionGreeted: false,
  isChatbotOpen: false,
  setState: (state) => set((current) => ({ previousState: current.state, state })),
  setPosition: (position) => set({ position }),
  setTargetPosition: (targetPosition) => set({ targetPosition }),
  setVisible: (visible) => set({ visible }),
  setDragging: (isDragging) => set({ isDragging }),
  setActiveSection: (activeSection) => set({ activeSection }),
  setMessage: (message) => set({ message }),
  setSessionGreeted: (sessionGreeted) => set({ sessionGreeted }),
  setChatbotOpen: (isChatbotOpen) => set({ isChatbotOpen }),
}));
