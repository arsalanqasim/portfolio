/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { CONTACT } from '../data';

export default function Footer() {
  const year = new Date().getFullYear();

  const links = [
    { label: 'GitHub', href: CONTACT.github },
    { label: 'LinkedIn', href: CONTACT.linkedin },
    { label: 'Email', href: `mailto:${CONTACT.email}` },
  ];

  return (
    <footer className="border-t border-border bg-surface py-10 mt-8">
      <div className="mx-auto max-w-5xl px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-sm text-ink-muted">
          © {year} Arsalan Qasim · {CONTACT.location}
        </p>
        <div className="flex items-center gap-6">
          {links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target={link.label !== 'Email' ? '_blank' : undefined}
              rel={link.label !== 'Email' ? 'noopener noreferrer' : undefined}
              className="text-sm text-ink-muted hover:text-accent transition-colors"
            >
              {link.label}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
