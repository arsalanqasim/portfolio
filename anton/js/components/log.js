import { el, icon, clearContainer } from '../utils/dom.js';
import storage from '../storage.js';
import events from '../events.js';
import { EVENTS } from '../constants.js';

export default class LogComponent {
  /**
   * @param {HTMLElement} container - DOM node to render inside.
   */
  constructor(container) {
    this.container = container;
  }

  /**
   * Renders the Version History timeline view.
   */
  async renderVersionHistory() {
    clearContainer(this.container);
    const versions = await storage.getVersions();

    const timeline = el('div', { className: 'history-timeline' });

    versions.forEach(v => {
      const bulletList = el('ul', { className: 'timeline-list' });
      v.decisions.forEach(d => {
        bulletList.appendChild(el('li', {}, d));
      });

      const filesList = el('div', { style: { marginTop: '8px', fontSize: '10px', color: 'var(--text-muted)' } }, [
        el('strong', {}, 'Files: '),
        document.createTextNode(v.filesChanged.length > 0 ? v.filesChanged.join(', ') : 'None')
      ]);

      const card = el('div', { className: `timeline-card ${v.completed ? 'completed' : ''}` }, [
        el('span', { className: 'timeline-date' }, v.date),
        el('div', { className: 'timeline-header' }, [
          el('h4', { className: 'timeline-version' }, v.version)
        ]),
        el('p', { className: 'timeline-summary' }, v.summary),
        v.decisions.length > 0 ? bulletList : null,
        filesList
      ]);

      timeline.appendChild(card);
    });

    this.container.appendChild(timeline);
  }

  /**
   * Renders the Design Decision Log view.
   */
  async renderDecisionLog() {
    clearContainer(this.container);
    const decisions = await storage.getDecisions();

    const grid = el('div', { className: 'decisions-grid' });

    decisions.forEach(d => {
      const card = el('div', { className: 'decision-card' }, [
        el('div', { className: 'decision-header' }, [
          el('span', { className: 'decision-id' }, `Decision ${d.id}`),
          el('span', { className: 'decision-badge' }, d.status)
        ]),
        el('span', { className: 'decision-category' }, d.category),
        el('p', { className: 'decision-text' }, d.description),
        el('div', { className: 'decision-reason' }, [
          el('strong', {}, 'Reasoning: '),
          document.createTextNode(d.reason)
        ]),
        el('span', { style: { fontSize: '10px', color: 'var(--text-muted)', marginTop: '8px', textAlign: 'right' } }, `Locked on ${d.date}`)
      ]);

      grid.appendChild(card);
    });

    this.container.appendChild(grid);
  }

  /**
   * Renders the Concept Gallery view (extended for asset pipeline).
   */
  async renderConceptGallery() {
    clearContainer(this.container);

    // 1. Load data from server & workspace states
    const concepts = await storage.getConcepts();
    const reviews = await storage.getReviews();
    const workspace = await storage.getWorkspaceState();
    
    // Default favorites array in state if missing
    if (!workspace.favorites) {
      workspace.favorites = [];
      storage.saveWorkspaceState(workspace);
    }

    // Initialize local filter states (we can store them on class instance or element data attributes)
    this.filterState = this.filterState || {
      category: 'ALL',
      version: 'ALL',
      status: 'ALL',
      decision: 'ALL',
      minRating: 0,
      showOnlyFavorites: false
    };

    // --- Header Filter Panels Layout ---
    const filterPanel = el('div', { 
      className: 'library-controls', 
      style: { marginBottom: 'var(--space-md)', flexWrap: 'wrap', gap: 'var(--space-xs)', padding: 'var(--space-xs) 0' } 
    });

    // Generate option select inputs
    const makeSelect = (label, key, options) => {
      const select = el('select', {
        style: {
          backgroundColor: 'var(--bg-panel)',
          border: '1px solid var(--border-color)',
          padding: 'var(--space-xxs) var(--space-xs)',
          borderRadius: 'var(--radius-sm)',
          fontSize: 'var(--fs-xs)',
          cursor: 'pointer'
        }
      });
      
      select.appendChild(el('option', { value: 'ALL' }, `${label}: All`));
      options.forEach(opt => {
        select.appendChild(el('option', { value: opt }, opt));
      });

      select.value = this.filterState[key];
      select.addEventListener('change', (e) => {
        this.filterState[key] = e.target.value;
        this.renderConceptGallery();
      });

      return select;
    };

    // Collect dynamic options from active data
    const categories = [...new Set(concepts.map(c => c.category.toUpperCase()))];
    const versions = [...new Set(concepts.map(c => c.version))];
    const statuses = [...new Set(concepts.map(c => c.status.toUpperCase()))];
    const decisions = [...new Set(reviews.map(r => r.decision.toUpperCase()))];

    const categorySelect = makeSelect('Category', 'category', categories);
    const versionSelect = makeSelect('Version', 'version', versions);
    const statusSelect = makeSelect('Status', 'status', statuses);
    const decisionSelect = makeSelect('Review Decision', 'decision', decisions);

    // Min Rating Select
    const ratingSelect = el('select', {
      style: {
        backgroundColor: 'var(--bg-panel)',
        border: '1px solid var(--border-color)',
        padding: 'var(--space-xxs) var(--space-xs)',
        borderRadius: 'var(--radius-sm)',
        fontSize: 'var(--fs-xs)',
        cursor: 'pointer'
      }
    }, [
      el('option', { value: '0' }, 'Rating: All'),
      el('option', { value: '3' }, '★ 3+ Stars'),
      el('option', { value: '5' }, '★ 5 Stars')
    ]);
    ratingSelect.value = String(this.filterState.minRating);
    ratingSelect.addEventListener('change', (e) => {
      this.filterState.minRating = parseInt(e.target.value);
      this.renderConceptGallery();
    });

    // Favorites Checkbox toggle
    const favLabel = el('label', { 
      style: { 
        display: 'flex', 
        alignItems: 'center', 
        gap: '4px', 
        fontSize: 'var(--fs-xs)', 
        cursor: 'pointer',
        color: 'var(--text-secondary)'
      } 
    });
    const favCheckbox = el('input', { 
      type: 'checkbox',
      checked: this.filterState.showOnlyFavorites ? 'true' : undefined 
    });
    favCheckbox.addEventListener('change', (e) => {
      this.filterState.showOnlyFavorites = e.target.checked;
      this.renderConceptGallery();
    });
    favLabel.appendChild(favCheckbox);
    favLabel.appendChild(document.createTextNode('★ Favorites Only'));

    filterPanel.appendChild(categorySelect);
    filterPanel.appendChild(versionSelect);
    filterPanel.appendChild(statusSelect);
    filterPanel.appendChild(decisionSelect);
    filterPanel.appendChild(ratingSelect);
    filterPanel.appendChild(favLabel);

    this.container.appendChild(filterPanel);

    // --- Side-by-Side Comparison Extension Hook Panel ---
    const comparisonPanel = el('div', {
      className: 'dashboard-panel-card',
      style: {
        marginBottom: 'var(--space-md)',
        borderStyle: 'dashed',
        borderColor: 'var(--accent-primary)',
        backgroundColor: 'rgba(138, 92, 245, 0.02)',
        padding: 'var(--space-sm) var(--space-md)',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
      }
    }, [
      el('div', {}, [
        el('h4', { style: { fontSize: 'var(--fs-sm)', fontWeight: '600', color: 'var(--accent-primary)' } }, 'Comparison Mode (Extension Point)'),
        el('p', { style: { fontSize: '11px', color: 'var(--text-secondary)' } }, 'Select 2 to 4 concepts to compare proportions, expressions, and brand scores side-by-side.')
      ]),
      el('button', {
        className: 'prompt-copy-btn',
        style: { cursor: 'not-allowed', opacity: '0.5' },
        title: 'Compare feature locked for Milestone v0.2'
      }, 'Compare Selected (Locked)')
    ]);
    this.container.appendChild(comparisonPanel);

    // --- Filter Concepts Logic ---
    const filtered = concepts.filter(c => {
      const f = this.filterState;
      
      // Category Match
      if (f.category !== 'ALL' && c.category.toUpperCase() !== f.category) return false;
      
      // Version Match
      if (f.version !== 'ALL' && c.version !== f.version) return false;
      
      // Status Match
      if (f.status !== 'ALL' && c.status.toUpperCase() !== f.status) return false;

      // Rating Match
      if (c.rating < f.minRating) return false;

      // Favorites Match
      if (f.showOnlyFavorites && !workspace.favorites.includes(c.id)) return false;

      // Decision Match (Requires matching review record)
      if (f.decision !== 'ALL') {
        const review = reviews.find(r => r.conceptId === c.id);
        if (!review || review.decision.toUpperCase() !== f.decision) return false;
      }

      return true;
    });

    // --- Render Empty State ---
    if (filtered.length === 0) {
      this.container.appendChild(
        el('div', { 
          className: 'viewer-placeholder-silhouette', 
          style: { padding: '80px 0', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-lg)', backgroundColor: 'var(--bg-panel)' } 
        }, [
          icon('icon-concepts', 'silhouette-svg'),
          el('div', { className: 'viewer-label' }, [
            el('h3', {}, 'Concept Gallery Empty'),
            el('p', {}, 'Waiting for real artwork files to be populated inside assets/concepts/')
          ])
        ])
      );
      return;
    }

    // --- Render Concept Grid Cards ---
    const grid = el('div', { className: 'concept-grid' });

    filtered.forEach(c => {
      const isFav = workspace.favorites.includes(c.id);
      
      // Toggle favorite action
      const favBtn = el('button', {
        className: 'progress-lock-btn',
        style: { color: isFav ? 'var(--accent-warning)' : 'var(--text-muted)' },
        title: isFav ? 'Remove from favorites' : 'Mark as favorite',
        on: {
          click: () => {
            if (isFav) {
              workspace.favorites = workspace.favorites.filter(id => id !== c.id);
            } else {
              workspace.favorites.push(c.id);
            }
            storage.saveWorkspaceState(workspace);
            events.emit(EVENTS.WORKSPACE_STATE_CHANGED);
            this.renderConceptGallery();
          }
        }
      }, [
        el('span', { style: { fontSize: '14px' } }, isFav ? '★' : '☆')
      ]);

      // Check if a review log exists for this concept ID
      const review = reviews.find(r => r.conceptId === c.id);

      // Score list display if review exists
      let reviewSection = null;
      if (review) {
        reviewSection = el('div', { 
          className: 'concept-pros-cons',
          style: { borderLeft: '2px solid var(--accent-primary)', marginTop: '8px' }
        }, [
          el('div', { style: { fontWeight: '600', color: 'var(--text-main)', marginBottom: '4px', fontSize: '10px' } }, `Review by ${review.reviewer}`),
          el('div', { style: { fontSize: '9px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2px 8px' } }, [
            el('span', {}, `Silhouette: ${review.scores.silhouette}/10`),
            el('span', {}, `Intelligence: ${review.scores.intelligence}/10`),
            el('span', {}, `Curiosity: ${review.scores.curiosity}/10`),
            el('span', {}, `Timelessness: ${review.scores.timelessness}/10`),
            el('span', {}, `Portfolio Fit: ${review.scores.portfolioFit}/10`),
            el('span', {}, `Overall: ${review.scores.overall}/10`)
          ]),
          review.notes ? el('p', { style: { fontSize: '10px', fontStyle: 'italic', marginTop: '4px', color: 'var(--text-secondary)' } }, `"${review.notes}"`) : null
        ]);
      }

      // Check if image is placeholder or local file path
      const imgPath = c.imageUrl.startsWith('http') || c.imageUrl.startsWith('data:') ? c.imageUrl : c.imageUrl;

      const stars = '★'.repeat(c.rating) + '☆'.repeat(5 - c.rating);

      const card = el('div', { className: 'concept-card' }, [
        el('div', { className: 'concept-preview' }, [
          // Fallback checks for canvas or image rendering
          c.imageUrl === 'icon-silhouette' ? 
            icon('icon-silhouette', 'silhouette-svg') : 
            el('img', { 
              src: c.thumbnailUrl || imgPath, 
              alt: c.id, 
              style: { width: '100%', height: '100%', objectFit: 'cover' }
            })
        ]),
        el('div', { className: 'concept-details' }, [
          el('div', { className: 'concept-header-bar' }, [
            el('span', { className: 'concept-ver', style: { fontWeight: '700' } }, c.id),
            el('div', { style: { display: 'flex', alignItems: 'center', gap: '4px' } }, [
              el('span', { className: `concept-status-pill ${c.status.toLowerCase()}` }, c.status),
              favBtn
            ])
          ]),
          el('div', { style: { color: 'var(--accent-warning)', fontSize: '12px', margin: '2px 0' } }, stars),
          el('p', { style: { fontSize: '11px', color: 'var(--text-secondary)' } }, c.notes),
          
          // Tags
          el('div', { style: { display: 'flex', flexWrap: 'wrap', gap: '4px', marginTop: '6px' } }, 
            c.tags.map(tag => el('span', { 
              style: { 
                fontSize: '9px', 
                backgroundColor: 'var(--bg-input)', 
                border: '1px solid var(--border-color)', 
                padding: '1px 4px', 
                borderRadius: 'var(--radius-xs)', 
                color: 'var(--text-secondary)' 
              } 
            }, tag))
          ),

          reviewSection
        ])
      ]);

      grid.appendChild(card);
    });

    this.container.appendChild(grid);
  }
}
