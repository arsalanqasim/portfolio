/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { AntonState } from './AntonStateMachine';

export interface SectionConfig {
  id: string;
  message: string;
  animation: AntonState;
  cooldown: number; // in milliseconds
  // Target selector to locate the DOM element to dock to
  selector: string;
  // Offset relative to the dock element
  offset: { x: number; y: number };
}

export const ANTON_SECTIONS: SectionConfig[] = [
  {
    id: 'home',
    message: "Welcome! I'll show you around.",
    animation: 'Greeting',
    cooldown: 30000,
    selector: '#home',
    // Positioned in bottom-right corner when in Home
    offset: { x: 0, y: 0 }
  },
  {
    id: 'work',
    message: "This is where the interesting stuff begins.",
    animation: 'Pointing',
    cooldown: 30000,
    selector: '#work h2',
    // Sits to the right of the header title
    offset: { x: 320, y: -20 }
  },
  {
    id: 'experience',
    message: "Yep... real freelance work. Production systems, not tutorial projects.",
    animation: 'Celebrating',
    cooldown: 30000,
    selector: '#experience .relative.pl-6', // First timeline item
    // Sits on the timeline dot
    offset: { x: -80, y: 15 }
  },
  {
    id: 'skills',
    message: "Always learning. This list keeps growing every few months.",
    animation: 'Thinking',
    cooldown: 30000,
    selector: '#skills .card', // First skill accordion card
    // Sits on top right of the accordion card header
    offset: { x: 280, y: -45 }
  },
  {
    id: 'about',
    message: "Finally... the human behind the code.",
    animation: 'Happy',
    cooldown: 30000,
    selector: '#about .card', // First about card (Education)
    // Sits on top right of the education card
    offset: { x: 220, y: -45 }
  },
  {
    id: 'footer',
    message: "Made it to the end. Thanks for visiting.",
    animation: 'Goodbye',
    cooldown: 30000,
    selector: '#footer',
    // Hangs upside down from the top border of the footer
    offset: { x: 150, y: -65 }
  }
];

export const CLICK_REACTIONS = {
  resume: "That PDF has seen many revisions.",
  github: "My favorite place.",
  linkedin: "Professional mode activated.",
  email: "He actually replies.",
};

export const SCROLL_REACTIONS = {
  speedrun: "Speedrunning my portfolio?",
  backUp: "Looking again? Good sign.",
  heroIdle: "Still reading? Nice. Most people scroll immediately."
};

export const INACTIVITY_REACTIONS = {
  sleep: "I'll wait...",
  wake: "Oh, you're back."
};

export const RANDOM_CLICK_MESSAGES: string[] = [
  "Need something?",
  "I'm supervising.",
  "I only judge semicolons.",
  "I don't write the code. Mostly.",
  "That bug wasn't my fault.",
  "Yes?",
  "You clicked me again.",
  "I promise I'm helping.",
  "There are no bugs. Only undocumented features.",
  "Coffee count: unknown.",
  "I'm here for the moral support. And the warmth of the CPU.",
  "Have you tried turning it off and on again?",
  "Looks clean. I'd give it a solid B+.",
  "I don't bite. Unless you write spaghetti code.",
  "This screen is very bright.",
  "Is that a typo or a new programming language?",
  "Just checking if you're still awake.",
  "Don't mind me, just clinging to the screen.",
  "The scrollbar is your friend. Use it.",
  "You clicked. I listened. Now what?",
  "Are you going to read everything or just skim?",
  "Nice cursor. Very responsive.",
  "I've seen better code, but I've also seen much worse.",
  "I'm a gecko, not a search engine.",
  "No, I can't write your CSS for you.",
  "Looks like someone has been busy.",
  "Fascinating choice of font.",
  "Can we talk about the margin spacing here?",
  "I'm keeping an eye on you. Well, both eyes actually.",
  "Please don't scroll too fast. My feet are small.",
  "Are we coding or just browsing?",
  "I'm grading this portfolio. So far, so good.",
  "Yes, I can climb walls. No, I won't do it on command.",
  "My tail sways with the rhythm of the processor.",
  "Did you find what you were looking for?",
  "Is it hot in here or is it just the GPU?",
  "I prefer Python. It sounds delicious.",
  "A click! Exciting. Oh wait, it was just me again.",
  "I'm a static asset with personality.",
  "I approve of this design. It has high gecko-compatibility.",
  "I promise I am not tracking your search history.",
  "Let's keep scrolling. The best is yet to come."
];

export function getTargetPosition(sectionId: string, width: number, height: number, isMobile: boolean) {
  if (typeof window === 'undefined') {
    return { x: 0, y: 0, rotation: 0 };
  }

  let targetX = window.innerWidth - width - 200;
  let targetY = window.innerHeight - height - 24;
  let rotation = 0;

  if (isMobile) {
    // On mobile, keep him on the right edge, but slide him vertically based on section index to show climbing!
    const sectionIndex = ['home', 'work', 'experience', 'skills', 'about', 'footer'].indexOf(sectionId);
    const yOffset = 80 + (sectionIndex >= 0 ? sectionIndex * 20 : 0);
    targetX = window.innerWidth - width - 12;
    targetY = window.innerHeight - height - yOffset;
  } else {
    const section = ANTON_SECTIONS.find((s) => s.id === sectionId);
    if (section && sectionId !== 'home') {
      const element = document.querySelector(section.selector);
      if (element) {
        const rect = element.getBoundingClientRect();
        targetX = rect.left + section.offset.x;
        targetY = rect.top + section.offset.y;
        if (sectionId === 'footer') {
          rotation = 180;
        }
      }
    }
  }

  // Clamp coordinates so Anton never goes off-screen
  const clampedX = Math.max(10, Math.min(window.innerWidth - width - 10, targetX));
  const clampedY = Math.max(10, Math.min(window.innerHeight - height - 10, targetY));

  return {
    x: clampedX,
    y: clampedY,
    rotation,
  };
}

