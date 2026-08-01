import { AntonDialogueContext } from './AntonTypes';

const dialogue = {
  arrival: ["There you are.", "Let's see what you've been building."],
  inspect: ["This is interesting.", "There's something worth looking at here.", "The details are doing the work."],
  click: ["Oh, hello.", "I noticed that.", "A brief interruption. I can work with that."],
  return: ["I found a better place.", "Back again.", "This view works better."],
  observe: ["I'm watching.", "Take your time.", "That caught my eye."],
};

export function selectAntonDialogue(context: AntonDialogueContext): string {
  const key = context.action ?? (context.state === 'inspect' ? 'inspect' : 'observe');
  const lines = dialogue[key] ?? dialogue.observe;
  const index = Math.abs(`${context.sectionId}:${context.surfaceType ?? 'none'}`.length) % lines.length;
  return lines[index];
}
