import { deepMerge } from './utils/helpers.js';

const STORAGE_KEYS = {
  PROJECT: 'anton_studio_project',
  DNA: 'anton_studio_dna',
  WORKSPACE: 'anton_studio_workspace',
  RECENT: 'anton_studio_recent',
  SESSION: 'anton_studio_session',
  INSPIRATION: 'anton_studio_inspiration',
  PROMPTS: 'anton_studio_prompts',
  CONCEPTS: 'anton_studio_concepts',
  DECISIONS: 'anton_studio_decisions',
  VERSIONS: 'anton_studio_versions',
  REVIEWS: 'anton_studio_reviews'
};

class StorageManager {
  /**
   * Helper to load JSON from server.
   * @private
   * @param {string} path - URL path to JSON file.
   * @returns {Promise<any>} Parsed JSON.
   */
  async _fetchJSON(path) {
    try {
      const response = await fetch(path);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (err) {
      console.error(`Failed to fetch JSON from ${path}:`, err);
      return null;
    }
  }

  /**
   * Helper to load data from localStorage or fallback to server.
   * @private
   * @param {string} storageKey - Local storage key name.
   * @param {string} fallbackPath - Backup server file path.
   * @returns {Promise<any>} Active config payload.
   */
  async _loadData(storageKey, fallbackPath) {
    const localData = localStorage.getItem(storageKey);
    if (localData) {
      try {
        return JSON.parse(localData);
      } catch (err) {
        console.error(`Error parsing local storage for key ${storageKey}:`, err);
      }
    }

    const serverData = await this._fetchJSON(fallbackPath);
    if (serverData) {
      this._saveData(storageKey, serverData);
      return serverData;
    }
    return null;
  }

  /**
   * Helper to save data to localStorage.
   * @private
   * @param {string} storageKey - Local storage key name.
   * @param {any} data - JSON payload.
   */
  _saveData(storageKey, data) {
    try {
      localStorage.setItem(storageKey, JSON.stringify(data));
    } catch (err) {
      console.error(`Failed to write to localStorage for key ${storageKey}:`, err);
    }
  }

  // --- Project Configuration ---
  async getProjectConfig() {
    return await this._loadData(STORAGE_KEYS.PROJECT, 'data/project.json');
  }

  saveProjectConfig(config) {
    this._saveData(STORAGE_KEYS.PROJECT, config);
  }

  // --- Anton DNA ---
  async getDNA() {
    return await this._loadData(STORAGE_KEYS.DNA, 'data/Anton_DNA.json');
  }

  saveDNA(dna) {
    this._saveData(STORAGE_KEYS.DNA, dna);
  }

  // --- Workspace State ---
  async getWorkspaceState() {
    return await this._loadData(STORAGE_KEYS.WORKSPACE, 'state/workspace.json');
  }

  saveWorkspaceState(state) {
    this._saveData(STORAGE_KEYS.WORKSPACE, state);
  }

  // --- Recent Logs ---
  async getRecentLogs() {
    return await this._loadData(STORAGE_KEYS.RECENT, 'state/recent.json');
  }

  saveRecentLogs(recent) {
    this._saveData(STORAGE_KEYS.RECENT, recent);
  }

  // --- Session Attributes ---
  async getSession() {
    return await this._loadData(STORAGE_KEYS.SESSION, 'state/session.json');
  }

  saveSession(session) {
    this._saveData(STORAGE_KEYS.SESSION, session);
  }

  // --- Inspiration Cards ---
  async getInspirationCards() {
    return await this._loadData(STORAGE_KEYS.INSPIRATION, 'data/inspiration.json');
  }

  saveInspirationCards(cards) {
    this._saveData(STORAGE_KEYS.INSPIRATION, cards);
  }

  // --- Prompt Library ---
  async getPrompts() {
    return await this._loadData(STORAGE_KEYS.PROMPTS, 'data/prompts.json');
  }

  savePrompts(prompts) {
    this._saveData(STORAGE_KEYS.PROMPTS, prompts);
  }

  // --- Concept Cards ---
  async getConcepts() {
    const data = await this._fetchJSON('/api/concepts');
    return data || [];
  }

  // --- Reviews Configuration ---
  async getReviews() {
    return await this._loadData(STORAGE_KEYS.REVIEWS, 'data/reviews.json');
  }

  saveReviews(reviews) {
    this._saveData(STORAGE_KEYS.REVIEWS, reviews);
  }

  // --- Design Decision Log ---
  async getDecisions() {
    return await this._loadData(STORAGE_KEYS.DECISIONS, 'data/decisions.json');
  }

  saveDecisions(decisions) {
    this._saveData(STORAGE_KEYS.DECISIONS, decisions);
  }

  // --- Version Timeline ---
  async getVersions() {
    return await this._loadData(STORAGE_KEYS.VERSIONS, 'data/versions.json');
  }

  saveVersions(versions) {
    this._saveData(STORAGE_KEYS.VERSIONS, versions);
  }

  /**
   * Reset all data overrides back to server-side JSON defaults.
   */
  clearAllLocalData() {
    Object.values(STORAGE_KEYS).forEach(key => {
      localStorage.removeItem(key);
    });
  }
}

export const storage = new StorageManager();
export default storage;
