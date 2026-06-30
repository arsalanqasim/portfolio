import { el, icon } from '../utils/dom.js';
import { MILESTONES, MILESTONE_NAMES, STATUSES, EVENTS } from '../constants.js';
import events from '../events.js';
import storage from '../storage.js';

export default class ProgressTrackerComponent {
  /**
   * @param {HTMLElement} container - DOM node to attach to.
   */
  constructor(container) {
    this.container = container;
    this.milestoneStates = {};
    this.init();
  }

  async init() {
    // Load workspace state to retrieve locks
    const state = await storage.getWorkspaceState();
    
    // Set default statuses if not present
    this.milestoneStates = state.milestones || {
      [MILESTONES.IDENTITY]: STATUSES.IN_PROGRESS,
      [MILESTONES.ANATOMY]: STATUSES.NOT_STARTED,
      [MILESTONES.FACE]: STATUSES.NOT_STARTED,
      [MILESTONES.EXPRESSIONS]: STATUSES.NOT_STARTED,
      [MILESTONES.BEHAVIOR]: STATUSES.NOT_STARTED,
      [MILESTONES.ANIMATION]: STATUSES.NOT_STARTED,
      [MILESTONES.IMPLEMENTATION]: STATUSES.NOT_STARTED
    };

    this.render();
  }

  /**
   * Cycle the status of a milestone.
   * @param {string} milestoneId - The ID of the milestone.
   */
  cycleStatus(milestoneId) {
    const current = this.milestoneStates[milestoneId];
    let next;

    if (current === STATUSES.NOT_STARTED) {
      next = STATUSES.IN_PROGRESS;
    } else if (current === STATUSES.IN_PROGRESS) {
      next = STATUSES.LOCKED;
    } else {
      next = STATUSES.NOT_STARTED;
    }

    this.milestoneStates[milestoneId] = next;
    
    // Save updated state back to storage
    storage.getWorkspaceState().then(state => {
      state.milestones = this.milestoneStates;
      storage.saveWorkspaceState(state);
    });

    // Notify other components
    events.emit(EVENTS.MILESTONE_CHANGED, { milestoneId, status: next });
    events.emit(EVENTS.WORKSPACE_STATE_CHANGED);

    this.render();
  }

  render() {
    this.container.innerHTML = '';

    const listContainer = el('div', { className: 'progress-list' });

    for (const [id, status] of Object.entries(this.milestoneStates)) {
      const displayName = MILESTONE_NAMES[id] || id;
      
      const isLocked = status === STATUSES.LOCKED;
      const statusClass = status.replace(/\s+/g, '-').toLowerCase();

      // Render lock button icon
      const lockIcon = isLocked ? icon('icon-lock') : icon('icon-unlock');

      const item = el('div', { 
        className: `progress-item ${isLocked ? 'locked' : ''} status-${statusClass}`
      }, [
        el('div', { className: 'progress-info' }, [
          el('span', { className: 'progress-name' }, displayName),
          el('span', { className: 'progress-status' }, status)
        ]),
        el('button', { 
          className: 'progress-lock-btn',
          title: `Cycle Status (Current: ${status})`,
          on: {
            click: () => this.cycleStatus(id)
          }
        }, [lockIcon])
      ]);

      listContainer.appendChild(item);
    }

    this.container.appendChild(listContainer);
  }
}
