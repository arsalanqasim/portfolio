export type AntonState =
  | 'arrival'
  | 'greeting'
  | 'explore'
  | 'inspect'
  | 'observe'
  | 'react'
  | 'rest'
  | 'hidden'
  | 'picked-up'
  | 'return';

export type AntonSurfaceType =
  | 'technical'
  | 'content'
  | 'interface'
  | 'section'
  | 'low';

export interface Point {
  x: number;
  y: number;
}

export interface Rect {
  left: number;
  top: number;
  right: number;
  bottom: number;
  width: number;
  height: number;
}

export interface AntonSurface {
  id: string;
  element: HTMLElement;
  rect: Rect;
  type: AntonSurfaceType;
  priority: number;
  sectionId: string;
  anchor: Point;
  obstacle?: boolean;
}

export interface AntonTarget {
  surface: AntonSurface;
  position: Point;
  score: number;
}

export interface AntonDialogueContext {
  state: AntonState;
  sectionId: string;
  surfaceType?: AntonSurfaceType;
  action?: 'arrival' | 'inspect' | 'click' | 'return' | 'observe';
}
