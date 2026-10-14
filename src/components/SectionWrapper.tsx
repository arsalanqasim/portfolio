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
  const surfaceType = id === 'work' ? 'technical' : id === 'skills' || id === 'experience' ? 'content' : 'section';

  return (
    <section
      id={id}
      data-anton-surface="section"
      data-anton-priority-type={surfaceType}
      className={`scroll-mt-24 py-16 md:py-20 ${className}`}
    >
      <div className="mb-10 md:mb-12">
        <p className="section-label mb-2 flex items-center gap-1.5">{label}</p>
        <h2 className="western-font text-2xl sm:text-3xl text-ink font-normal tracking-wide">
          {title}
        </h2>
        {subtitle && (
          <p className="mt-3 font-serif text-ink-secondary max-w-2xl leading-relaxed text-base italic">{subtitle}</p>
        )}
      </div>
      {children}
    </section>
  );
}
