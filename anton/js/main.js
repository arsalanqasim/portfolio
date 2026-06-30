import { SECTIONS, EVENTS } from './constants.js';
import { el, icon, clearContainer } from './utils/dom.js';
import storage from './storage.js';
import events from './events.js';

// Import Feature Components
import ProgressTrackerComponent from './components/progress.js';
import InspirationBoardComponent from './components/board.js';
import PromptLibraryComponent from './components/prompts.js';
import DNAPanelComponent from './components/dna.js';
import LogComponent from './components/log.js';

class StudioWorkspaceApp {
  constructor() {
    // Active UI Components
    this.components = {};
    this.workspaceState = null;
    this.projectConfig = null;
    
    // UI Selectors
    this.navContainer = document.getElementById('sidebar-navigation');
    this.panels = document.querySelectorAll('.workspace-panel');
    this.searchInput = document.getElementById('prompt-search-input');
    
    this.init();
  }

  async init() {
    // 1. Fetch metadata configuration details from storage
    this.projectConfig = await storage.getProjectConfig();
    this.workspaceState = await storage.getWorkspaceState();

    // 2. Hydrate Header and Sidebar details
    this.hydrateMetaText();

    // 3. Initialize Shared Sidebar Components
    const progressContainer = document.getElementById('progress-sidebar-container');
    if (progressContainer) {
      this.components.progress = new ProgressTrackerComponent(progressContainer);
    }

    // 4. Initialize Main Panel components
    this.initPanelComponents();

    // 5. Hydrate Landing Dashboard Feed Panels
    this.hydrateDashboardFeed();

    // 6. Bind Event Listeners (Routing nav + inputs)
    this.bindEvents();

    // 7. Route to initial section
    this.routeToSection(this.workspaceState.activeSection || SECTIONS.DASHBOARD);
  }

  hydrateMetaText() {
    if (!this.projectConfig) return;

    // Header updates
    const headerVer = document.getElementById('header-project-ver');
    const headerUpdated = document.getElementById('header-last-updated');
    if (headerVer) headerVer.textContent = `v${this.projectConfig.version}`;
    if (headerUpdated) headerUpdated.textContent = new Date(this.projectConfig.lastUpdated).toLocaleDateString('en-US', {
      month: 'short', day: '2-digit', year: 'numeric'
    }).toUpperCase();

    // Sidebar updates
    const sidebarDirector = document.getElementById('sidebar-creative-director');
    const sidebarPhase = document.getElementById('sidebar-milestone-phase');
    if (sidebarDirector) sidebarDirector.textContent = this.projectConfig.creative_director;
    if (sidebarPhase) sidebarPhase.textContent = `Phase: ${this.projectConfig.phase}`;

    // Today's Goal Updates
    const goalTitle = document.getElementById('today-goal-title');
    const goalDesc = document.getElementById('today-goal-desc');
    if (goalTitle) goalTitle.textContent = this.projectConfig.nextMilestone;
    if (goalDesc) goalDesc.textContent = `Current milestone focus target: ${this.projectConfig.phase} locks.`;
  }

  initPanelComponents() {
    // Inspiration Board
    const inspirationContainer = document.getElementById('inspiration-board-root');
    if (inspirationContainer) {
      this.components.board = new InspirationBoardComponent(inspirationContainer);
    }

    // Prompt Library
    const promptsContainer = document.getElementById('prompt-library-root');
    if (promptsContainer) {
      this.components.prompts = new PromptLibraryComponent(promptsContainer);
    }

    // DNA Editor
    const dnaContainer = document.getElementById('dna-editor-root');
    if (dnaContainer) {
      this.components.dna = new DNAPanelComponent(dnaContainer);
    }

    // Logs components (timeline, decisions, concepts)
    const historyContainer = document.getElementById('version-history-root');
    const decisionsContainer = document.getElementById('decision-log-root');
    const conceptsContainer = document.getElementById('concept-gallery-root');
    
    // We bind single instances of LogComponent to respective containers
    if (historyContainer) this.components.history = new LogComponent(historyContainer);
    if (decisionsContainer) this.components.decisions = new LogComponent(decisionsContainer);
    if (conceptsContainer) this.components.concepts = new LogComponent(conceptsContainer);
  }

  async hydrateDashboardFeed() {
    const decisionsFeed = document.getElementById('dashboard-decisions-feed');
    const conceptsFeed = document.getElementById('dashboard-concepts-feed');

    if (decisionsFeed) {
      clearContainer(decisionsFeed);
      const decisions = await storage.getDecisions();
      // Render first 2 decisions
      decisions.slice(0, 2).forEach(d => {
        const item = el('div', { 
          className: 'progress-item', 
          style: { borderLeft: '3px solid var(--accent-primary)', backgroundColor: 'var(--bg-card)' }
        }, [
          el('div', { className: 'progress-info' }, [
            el('span', { className: 'progress-name', style: { fontSize: '11px' } }, `${d.category} (Decision ${d.id})`),
            el('span', { className: 'progress-status', style: { color: 'var(--text-secondary)' } }, d.description)
          ])
        ]);
        decisionsFeed.appendChild(item);
      });
    }

    if (conceptsFeed) {
      clearContainer(conceptsFeed);
      const concepts = await storage.getConcepts();
      // Render first 2 concepts
      concepts.slice(0, 2).forEach(c => {
        const statusClass = c.status.toLowerCase();
        const item = el('div', { className: 'progress-item', style: { backgroundColor: 'var(--bg-card)' } }, [
          el('div', { className: 'progress-info' }, [
            el('span', { className: 'progress-name', style: { fontSize: '11px' } }, `Concept ${c.id} (${c.version})`),
            el('span', { className: 'progress-status', style: { color: 'var(--text-secondary)' } }, c.notes)
          ]),
          el('span', { className: `concept-status-pill ${statusClass}`, style: { fontSize: '9px', padding: '1px 4px' } }, c.status)
        ]);
        conceptsFeed.appendChild(item);
      });
    }
  }

  bindEvents() {
    // Navigation items click handling
    if (this.navContainer) {
      this.navContainer.addEventListener('click', (e) => {
        const navItem = e.target.closest('.nav-item');
        if (!navItem) return;

        const targetSection = navItem.dataset.section;
        this.routeToSection(targetSection);
      });
    }

    // Prompt search input handling
    if (this.searchInput) {
      this.searchInput.addEventListener('input', (e) => {
        const value = e.target.value;
        this.workspaceState.searchQuery = value;
        storage.saveWorkspaceState(this.workspaceState);
        events.emit(EVENTS.WORKSPACE_STATE_CHANGED);
      });
    }

    // Sync elements when DNA or states are updated
    events.on(EVENTS.DNA_UPDATED, () => {
      this.hydrateDashboardFeed();
    });

    events.on(EVENTS.WORKSPACE_STATE_CHANGED, () => {
      this.hydrateDashboardFeed();
    });
  }

  /**
   * Switch the active panel.
   * @param {string} sectionId - Target section from SECTIONS constant.
   */
  async routeToSection(sectionId) {
    if (!sectionId) return;

    // 1. Update navigation items
    const navItems = this.navContainer.querySelectorAll('.nav-item');
    navItems.forEach(item => {
      if (item.dataset.section === sectionId) {
        item.classList.add('active');
      } else {
        item.classList.remove('active');
      }
    });

    // 2. Swap panels visibility
    this.panels.forEach(panel => {
      if (panel.id === `panel-${sectionId}`) {
        panel.classList.add('active');
      } else {
        panel.classList.remove('active');
      }
    });

    // 3. Trigger component-specific rendering lifecycle methods
    if (sectionId === SECTIONS.INSPIRATION && this.components.board) {
      this.components.board.render();
    } else if (sectionId === SECTIONS.PROMPTS && this.components.prompts) {
      this.components.prompts.render();
    } else if (sectionId === SECTIONS.DNA && this.components.dna) {
      this.components.dna.render();
    } else if (sectionId === SECTIONS.VERSION_HISTORY && this.components.history) {
      await this.components.history.renderVersionHistory();
    } else if (sectionId === SECTIONS.DECISIONS && this.components.decisions) {
      await this.components.decisions.renderDecisionLog();
    } else if (sectionId === SECTIONS.CONCEPTS && this.components.concepts) {
      await this.components.concepts.renderConceptGallery();
    }

    // 4. Save state change
    this.workspaceState.activeSection = sectionId;
    storage.saveWorkspaceState(this.workspaceState);
    
    events.emit(EVENTS.SECTION_CHANGED, { sectionId });
  }
}

// Instantiate the application once DOM parses
document.addEventListener('DOMContentLoaded', () => {
  window.studioApp = new StudioWorkspaceApp();
});
