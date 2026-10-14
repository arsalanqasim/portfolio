/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { CONTACT } from '../data';
import { westernAudio } from '../utils/westernAudio';

export default function Footer() {
  const year = new Date().getFullYear();

  const links = [
    { label: 'GitHub', href: CONTACT.github },
    { label: 'LinkedIn', href: CONTACT.linkedin },
    { label: 'Telegram / Email', href: `mailto:${CONTACT.email}` },
  ];

  return (
    <footer id="footer" data-anton-surface="section" data-anton-priority-type="low" className="border-t-2 border-border bg-surface py-12 mt-12 font-serif">
      <div className="mx-auto max-w-5xl px-6 flex flex-col sm:flex-row items-center justify-between gap-6">
        <div>
          <p className="text-sm text-ink-muted">
            © {year} Arsalan Qasim · Full Stack AI/ML Engineer · {CONTACT.location}
          </p>
          <p className="text-xs text-accent/80 italic mt-1 font-serif">
            "I tip my hat to you. One legend to another." — Rango (2011)
          </p>
        </div>
        <div className="flex items-center gap-6">
          {links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target={link.label !== 'Telegram / Email' ? '_blank' : undefined}
              rel={link.label !== 'Telegram / Email' ? 'noopener noreferrer' : undefined}
              onClick={() => westernAudio.playPaperRustle()}
              className="text-sm font-western tracking-wider text-ink-muted hover:text-accent transition-colors"
            >
              {link.label}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
