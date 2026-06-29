/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { ReactNode } from 'react';

interface SectionWrapperProps {
  id: string;
  label: string;
  title: string;
  subtitle?: string;
  children: ReactNode;
  className?: string;
}

export default function SectionWrapper({
  id,
  label,
  title,
  subtitle,
  children,
  className = '',
}: SectionWrapperProps) {
  return (
    <section id={id} className={`scroll-mt-24 py-16 md:py-20 ${className}`}>
      <div className="mb-10 md:mb-12">
        <p className="section-label mb-2">{label}</p>
        <h2 className="font-serif text-3xl sm:text-4xl font-semibold text-ink tracking-tight">
          {title}
        </h2>
        {subtitle && (
          <p className="mt-3 text-ink-secondary max-w-2xl leading-relaxed">{subtitle}</p>
        )}
      </div>
      {children}
    </section>
  );
}
