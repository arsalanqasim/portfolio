/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type AntonState =
  | 'Idle'
  | 'Watching'
  | 'Thinking'
  | 'Happy'
  | 'Pointing'
  | 'Reading'
  | 'Sleeping'
  | 'Greeting'
  | 'Celebrating'
  | 'Goodbye'
  | 'Traveling';

export interface StateMachineState {
  current: AntonState;
  previous: AntonState | null;
}

export function isValidTransition(from: AntonState, to: AntonState): boolean {
  if (from === 'Sleeping' && to !== 'Idle') {
    // Must wake up to Idle first
    return false;
  }
  return true;
}
