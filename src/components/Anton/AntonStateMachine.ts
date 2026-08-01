import { AntonState } from './AntonTypes';

export type AntonEvent =
  | { type: 'ARRIVAL_FINISHED' }
  | { type: 'TARGET_FOUND' }
  | { type: 'TARGET_REACHED' }
  | { type: 'CURSOR_NEAR' }
  | { type: 'CURSOR_LEFT' }
  | { type: 'CLICKED' }
  | { type: 'PICKUP_STARTED' }
  | { type: 'PICKUP_ENDED' }
  | { type: 'NO_SAFE_TARGET' }
  | { type: 'SAFE_SPACE_AVAILABLE' }
  | { type: 'HIDE' }
  | { type: 'RETURN' }
  | { type: 'TIMEOUT' };

const transitions: Partial<Record<AntonState, Partial<Record<AntonEvent['type'], AntonState>>>> = {
  arrival: { ARRIVAL_FINISHED: 'greeting', HIDE: 'hidden' },
  greeting: { ARRIVAL_FINISHED: 'explore', CLICKED: 'react', HIDE: 'hidden' },
  explore: {
    TARGET_FOUND: 'explore',
    TARGET_REACHED: 'inspect',
    CURSOR_NEAR: 'observe',
    CLICKED: 'react',
    PICKUP_STARTED: 'picked-up',
    NO_SAFE_TARGET: 'rest',
    HIDE: 'hidden',
  },
  inspect: {
    CURSOR_NEAR: 'observe',
    CURSOR_LEFT: 'rest',
    CLICKED: 'react',
    PICKUP_STARTED: 'picked-up',
    TARGET_FOUND: 'explore',
    HIDE: 'hidden',
  },
  observe: {
    CURSOR_LEFT: 'explore',
    CLICKED: 'react',
    PICKUP_STARTED: 'picked-up',
    TARGET_FOUND: 'explore',
    HIDE: 'hidden',
  },
  react: {
    TIMEOUT: 'explore',
    PICKUP_STARTED: 'picked-up',
    HIDE: 'hidden',
  },
  rest: {
    TARGET_FOUND: 'explore',
    CURSOR_NEAR: 'observe',
    CLICKED: 'react',
    PICKUP_STARTED: 'picked-up',
    HIDE: 'hidden',
  },
  hidden: {
    SAFE_SPACE_AVAILABLE: 'return',
    RETURN: 'return',
  },
  'picked-up': { PICKUP_ENDED: 'return', HIDE: 'hidden' },
  return: {
    TARGET_REACHED: 'explore',
    ARRIVAL_FINISHED: 'explore',
    CLICKED: 'react',
    HIDE: 'hidden',
  },
};

export function transitionAntonState(state: AntonState, event: AntonEvent): AntonState {
  return transitions[state]?.[event.type] ?? state;
}

export function isAntonState(value: string): value is AntonState {
  return [
    'arrival',
    'greeting',
    'explore',
    'inspect',
    'observe',
    'react',
    'rest',
    'hidden',
    'picked-up',
    'return',
  ].includes(value);
}
