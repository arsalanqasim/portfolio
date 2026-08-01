import { describe, expect, it } from 'vitest';
import { transitionAntonState } from './AntonStateMachine';

describe('Anton state machine', () => {
  it('moves through arrival, greeting, and exploration', () => {
    expect(transitionAntonState('arrival', { type: 'ARRIVAL_FINISHED' })).toBe('greeting');
    expect(transitionAntonState('greeting', { type: 'ARRIVAL_FINISHED' })).toBe('explore');
  });

  it('supports pickup and return transitions', () => {
    expect(transitionAntonState('explore', { type: 'PICKUP_STARTED' })).toBe('picked-up');
    expect(transitionAntonState('picked-up', { type: 'PICKUP_ENDED' })).toBe('return');
    expect(transitionAntonState('return', { type: 'TARGET_REACHED' })).toBe('explore');
  });

  it('keeps invalid transitions stable', () => {
    expect(transitionAntonState('hidden', { type: 'CLICKED' })).toBe('hidden');
    expect(transitionAntonState('rest', { type: 'PICKUP_ENDED' })).toBe('rest');
  });
});
