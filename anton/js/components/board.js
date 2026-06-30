import { el, icon, clearContainer } from '../utils/dom.js';
import { INSPIRATION_CATEGORIES, EVENTS } from '../constants.js';
import storage from '../storage.js';
import events from '../events.js';

export default class InspirationBoardComponent {
  /**
   * @param {HTMLElement} container - DOM node to render inside.
   */
  constructor(container) {
    this.container = container;
    this.cards = [];
    this.init();
  }

  async init() {
    this.cards = await storage.getInspirationCards();
    this.render();
  }

  /**
   * Update the category of a card.
   * @param {string} cardId - The target card ID.
   * @param {string} newCategory - The column dropped in.
   */
  updateCardCategory(cardId, newCategory) {
    this.cards = this.cards.map(card => {
      if (card.id === cardId) {
        return { ...card, category: newCategory };
      }
      return card;
    });

    storage.saveInspirationCards(this.cards);
    events.emit(EVENTS.WORKSPACE_STATE_CHANGED);
    this.render();
  }

  render() {
    clearContainer(this.container);

    const workspace = el('div', { className: 'inspiration-workspace' });

    // Render columns for each category
    INSPIRATION_CATEGORIES.forEach(category => {
      const columnCards = this.cards.filter(c => c.category === category);
      
      const cardsContainer = el('div', { 
        className: 'column-cards-container',
        dataset: { category }
      });

      // HTML5 Drag and Drop event listeners on container
      cardsContainer.addEventListener('dragover', (e) => {
        e.preventDefault(); // Required to allow drop
      });

      cardsContainer.addEventListener('dragenter', (e) => {
        cardsContainer.parentElement.classList.add('drag-over');
      });

      cardsContainer.addEventListener('dragleave', (e) => {
        // Only trigger if leaving container, not children
        if (e.target === cardsContainer) {
          cardsContainer.parentElement.classList.remove('drag-over');
        }
      });

      cardsContainer.addEventListener('drop', (e) => {
        e.preventDefault();
        cardsContainer.parentElement.classList.remove('drag-over');
        
        const cardId = e.dataTransfer.getData('text/plain');
        if (cardId) {
          this.updateCardCategory(cardId, category);
        }
      });

      // Render cards in this column
      columnCards.forEach(card => {
        const cardElement = el('div', {
          className: 'inspiration-card',
          draggable: 'true',
          on: {
            dragstart: (e) => {
              e.dataTransfer.setData('text/plain', card.id);
              e.dataTransfer.effectAllowed = 'move';
              cardElement.classList.add('dragging');
            },
            dragend: () => {
              cardElement.classList.remove('dragging');
            }
          }
        }, [
          el('div', { className: 'card-img-placeholder' }, [
            icon(card.imgPlaceholder || 'icon-silhouette', 'nav-icon')
          ]),
          el('div', { className: 'card-details' }, [
            el('span', { className: 'card-title' }, card.title),
            el('span', { className: 'card-desc' }, card.desc)
          ])
        ]);

        cardsContainer.appendChild(cardElement);
      });

      const column = el('div', { className: 'board-column' }, [
        el('div', { className: 'column-header' }, [
          el('span', { className: 'column-title' }, category),
          el('span', { className: 'column-count' }, String(columnCards.length))
        ]),
        cardsContainer
      ]);

      workspace.appendChild(column);
    });

    this.container.appendChild(workspace);
  }
}
