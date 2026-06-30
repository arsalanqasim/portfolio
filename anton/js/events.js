/**
 * Simple Pub/Sub Event Bus for decoupled module communication.
 */
class EventBus {
  constructor() {
    this.listeners = {};
  }

  /**
   * Register an event listener.
   * @param {string} eventName - The event name from EVENTS constant.
   * @param {Function} callback - Callback function receiving event data.
   */
  on(eventName, callback) {
    if (!this.listeners[eventName]) {
      this.listeners[eventName] = [];
    }
    this.listeners[eventName].push(callback);
  }

  /**
   * Deregister an event listener.
   * @param {string} eventName - The event name.
   * @param {Function} callback - Callback to remove.
   */
  off(eventName, callback) {
    if (!this.listeners[eventName]) return;
    this.listeners[eventName] = this.listeners[eventName].filter(cb => cb !== callback);
  }

  /**
   * Broadcast an event to all subscribers.
   * @param {string} eventName - The event name.
   * @param {*} [data] - Event payload data.
   */
  emit(eventName, data) {
    if (!this.listeners[eventName]) return;
    this.listeners[eventName].forEach(callback => {
      try {
        callback(data);
      } catch (err) {
        console.error(`Error in event listener for ${eventName}:`, err);
      }
    });
  }
}

export const events = new EventBus();
export default events;
