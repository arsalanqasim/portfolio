import { el, icon, clearContainer } from '../utils/dom.js';
import { copyToClipboard } from '../utils/clipboard.js';
import storage from '../storage.js';
import events from '../events.js';
import { EVENTS } from '../constants.js';

export default class PromptLibraryComponent {
  /**
   * @param {HTMLElement} container - DOM node to render inside.
   */
  constructor(container) {
    this.container = container;
    this.prompts = [];
    this.searchQuery = '';
    this.init();
  }

  async init() {
    this.prompts = await storage.getPrompts();
    
    // Subscribe to search updates
    events.on(EVENTS.WORKSPACE_STATE_CHANGED, async () => {
      const state = await storage.getWorkspaceState();
      this.searchQuery = state.searchQuery || '';
      this.render();
    });

    this.render();
  }

  /**
   * Copy prompt text to clipboard with button indicator updates.
   * @param {string} text - Prompt body to copy.
   * @param {HTMLButtonElement} buttonEl - Copy button node.
   */
  async handleCopy(text, buttonEl) {
    const success = await copyToClipboard(text);
    if (success) {
      // Toggle button visual state
      const originalContent = buttonEl.innerHTML;
      buttonEl.innerHTML = '';
      buttonEl.appendChild(icon('icon-check'));
      buttonEl.appendChild(document.createTextNode(' Copied!'));
      buttonEl.style.backgroundColor = 'var(--accent-success)';
      buttonEl.style.borderColor = 'var(--accent-success)';

      setTimeout(() => {
        buttonEl.innerHTML = originalContent;
        buttonEl.style.backgroundColor = '';
        buttonEl.style.borderColor = '';
      }, 1500);
      
      events.emit(EVENTS.PROMPT_ADDED, { text });
    }
  }

  render() {
    clearContainer(this.container);

    const filteredPrompts = this.prompts.filter(p => {
      const query = this.searchQuery.toLowerCase();
      return (
        p.title.toLowerCase().includes(query) ||
        p.goal.toLowerCase().includes(query) ||
        p.text.toLowerCase().includes(query) ||
        p.category.toLowerCase().includes(query)
      );
    });

    if (filteredPrompts.length === 0) {
      this.container.appendChild(
        el('div', { className: 'viewer-placeholder-silhouette', style: { padding: '40px 0' } }, [
          icon('icon-search', 'silhouette-svg'),
          el('div', { className: 'viewer-label' }, [
            el('h3', {}, 'No Prompts Found'),
            el('p', {}, 'Try adjusting your search filter query')
          ])
        ])
      );
      return;
    }

    const grid = el('div', { className: 'prompt-grid' });

    filteredPrompts.forEach(p => {
      const copyBtn = el('button', { className: 'prompt-copy-btn' }, [
        icon('icon-copy'),
        document.createTextNode(' Copy')
      ]);

      copyBtn.addEventListener('click', () => this.handleCopy(p.text, copyBtn));

      const card = el('div', { className: 'prompt-card' }, [
        el('div', { className: 'prompt-card-header' }, [
          el('span', { className: 'prompt-version-tag' }, p.version),
          p.locked ? el('span', { className: 'prompt-lock-badge' }, 'Locked 🔒') : null
        ]),
        el('h4', { className: 'prompt-title' }, p.title),
        el('div', { className: 'prompt-goal' }, [
          el('strong', {}, 'Goal: '),
          document.createTextNode(p.goal)
        ]),
        el('div', { className: 'prompt-body-wrapper' }, p.text),
        p.notes ? el('div', { className: 'prompt-goal', style: { borderLeftColor: 'var(--accent-secondary)', fontSize: '10px' } }, [
          el('strong', {}, 'Note: '),
          document.createTextNode(p.notes)
        ]) : null,
        el('div', { className: 'prompt-card-footer' }, [
          el('span', { className: 'prompt-category' }, p.category),
          copyBtn
        ])
      ]);

      grid.appendChild(card);
    });

    this.container.appendChild(grid);
  }
}
