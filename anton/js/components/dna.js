import { el, icon, clearContainer } from '../utils/dom.js';
import { EVENTS, STATUSES, MILESTONES } from '../constants.js';
import storage from '../storage.js';
import events from '../events.js';

export default class DNAPanelComponent {
  /**
   * @param {HTMLElement} container - DOM node to render inside.
   */
  constructor(container) {
    this.container = container;
    this.dna = null;
    this.workspaceState = null;
    this.init();
  }

  async init() {
    this.dna = await storage.getDNA();
    this.workspaceState = await storage.getWorkspaceState();

    // Subscribe to milestone status change events
    events.on(EVENTS.MILESTONE_CHANGED, (e) => {
      this.workspaceState.milestones[e.milestoneId] = e.status;
      this.render();
    });

    this.render();
  }

  /**
   * Check if a milestone is locked.
   * @param {string} milestoneId - The target milestone.
   * @returns {boolean} True if LOCKED.
   */
  isMilestoneLocked(milestoneId) {
    if (!this.workspaceState || !this.workspaceState.milestones) return false;
    return this.workspaceState.milestones[milestoneId] === STATUSES.LOCKED;
  }

  /**
   * Modify a nested key value in the DNA configuration.
   * @param {string} path - Dot-separated path (e.g. 'appearance.scale_rules.navbar_height_px').
   * @param {number|string} val - New value.
   */
  updateDNAValue(path, val) {
    const keys = path.split('.');
    let current = this.dna;
    
    for (let i = 0; i < keys.length - 1; i++) {
      current = current[keys[i]];
    }
    
    current[keys[keys.length - 1]] = val;

    storage.saveDNA(this.dna);
    events.emit(EVENTS.DNA_UPDATED, this.dna);
    
    // Refresh the JSON display text area
    const jsonDisplay = this.container.querySelector('.dna-json-display');
    if (jsonDisplay) {
      jsonDisplay.textContent = JSON.stringify(this.dna, null, 2);
    }
  }

  /**
   * Render a slider input group.
   * @param {string} title - Input label.
   * @param {string} path - Target DNA key path.
   * @param {number} val - Active value.
   * @param {number} min - Slider minimum.
   * @param {number} max - Slider maximum.
   * @param {number} step - Slider interval.
   * @param {string} lockMilestone - Milestone ID that locks this slider.
   * @returns {HTMLElement} The slider DOM element.
   */
  renderSliderControl(title, path, val, min, max, step, lockMilestone) {
    const locked = this.isMilestoneLocked(lockMilestone);
    
    const slider = el('input', {
      type: 'range',
      className: 'dna-slider',
      min: String(min),
      max: String(max),
      step: String(step),
      value: String(val)
    });

    if (locked) {
      slider.setAttribute('disabled', 'true');
    }

    const valueDisplay = el('span', { className: 'dna-slider-val' }, String(val));

    slider.addEventListener('input', (e) => {
      const numVal = parseFloat(e.target.value);
      valueDisplay.textContent = String(numVal);
      this.updateDNAValue(path, numVal);
    });

    return el('div', { className: `dna-card-field ${locked ? 'locked-milestone-field' : ''}` }, [
      el('div', { className: 'dna-field-title' }, [
        document.createTextNode(title),
        locked ? el('span', { style: { color: 'var(--accent-primary)', marginLeft: '6px', fontSize: '9px' } }, ' LOCKED 🔒') : null
      ]),
      el('div', { className: 'dna-input-slider-group' }, [
        slider,
        valueDisplay
      ])
    ]);
  }

  render() {
    if (!this.dna) return;
    clearContainer(this.container);

    const workspace = el('div', { className: 'dna-split-workspace' });

    // Left Panel: Interactive JSON Display
    const jsonView = el('div', { className: 'dna-viewer-panel' }, [
      el('div', { className: 'card-title' }, 'Anton_DNA.json'),
      el('pre', { className: 'dna-json-display' }, JSON.stringify(this.dna, null, 2))
    ]);

    // Right Panel: Form Sliders
    const controlsView = el('div', { className: 'dna-controls-panel' });

    // 1. Anatomy Scale Section (Locked by ANATOMY milestone)
    const scaleGroup = el('div', { style: { display: 'flex', flexDirection: 'column', gap: 'var(--space-md)' } }, [
      el('h4', { className: 'card-title', style: { color: 'var(--text-secondary)' } }, 'Proportional Scale (Anatomy)'),
      this.renderSliderControl(
        'Navbar Height (Pixels)',
        'appearance.scale_rules.navbar_height_px',
        this.dna.appearance.scale_rules.navbar_height_px,
        30, 100, 1,
        MILESTONES.ANATOMY
      ),
      this.renderSliderControl(
        'Project Card Height (Pixels)',
        'appearance.scale_rules.project_card_height_px',
        this.dna.appearance.scale_rules.project_card_height_px,
        40, 120, 1,
        MILESTONES.ANATOMY
      ),
      this.renderSliderControl(
        'Portrait Height (Pixels)',
        'appearance.scale_rules.portrait_focal_height_px',
        this.dna.appearance.scale_rules.portrait_focal_height_px,
        60, 200, 1,
        MILESTONES.ANATOMY
      )
    ]);

    // 2. Material Shader Section (Locked by IMPLEMENTATION milestone)
    const materialsGroup = el('div', { style: { display: 'flex', flexDirection: 'column', gap: 'var(--space-md)' } }, [
      el('h4', { className: 'card-title', style: { color: 'var(--text-secondary)' } }, 'Skin Shader Materials'),
      this.renderSliderControl(
        'Base Skin Roughness',
        'brand.materials.skin_roughness',
        this.dna.brand.materials.skin_roughness,
        0, 1, 0.01,
        MILESTONES.IMPLEMENTATION
      ),
      this.renderSliderControl(
        'Underbelly Roughness',
        'brand.materials.underbelly_roughness',
        this.dna.brand.materials.underbelly_roughness,
        0, 1, 0.01,
        MILESTONES.IMPLEMENTATION
      ),
      this.renderSliderControl(
        'Corneal Glossiness (Eyes)',
        'brand.materials.eye_glossiness',
        this.dna.brand.materials.eye_glossiness,
        0, 1, 0.01,
        MILESTONES.IMPLEMENTATION
      ),
      this.renderSliderControl(
        'Skin Specular Intensity',
        'brand.materials.body_specular',
        this.dna.brand.materials.body_specular,
        0, 1, 0.01,
        MILESTONES.IMPLEMENTATION
      )
    ]);

    controlsView.appendChild(scaleGroup);
    controlsView.appendChild(materialsGroup);

    workspace.appendChild(jsonView);
    workspace.appendChild(controlsView);

    this.container.appendChild(workspace);
  }
}
