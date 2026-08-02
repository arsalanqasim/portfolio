/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { Section } from './types';
import Header from './components/Header';
import Footer from './components/Footer';
import Hero from './components/Hero';
import FeaturedWork from './components/FeaturedWork';
import Projects from './components/Projects';
import Experience from './components/Experience';
import Skills from './components/Skills';
import About from './components/About';
import SectionWrapper from './components/SectionWrapper';
import PortfolioChatbot from './components/PortfolioChatbot';

const SECTIONS: Section[] = ['home', 'work', 'experience', 'skills', 'about'];

export default function App() {
  const [activeSection, setActiveSection] = useState<Section>('home');

  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    SECTIONS.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActiveSection(id);
          }
        },
        { rootMargin: '-40% 0px -45% 0px', threshold: 0 }
      );

      observer.observe(el);
      observers.push(observer);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-canvas text-ink">
      <Header activeSection={activeSection} />

      <main className="flex-grow w-full max-w-5xl mx-auto px-6">
        <Hero />

        <SectionWrapper
          id="work"
          label="Selected work"
          title="Projects I've built"
          subtitle="Machine learning, computer vision, and automation — with real metrics where I have them."
        >
          <div className="space-y-10">
            <FeaturedWork />
            <Projects />
          </div>
        </SectionWrapper>

        <SectionWrapper
          id="experience"
          label="Experience"
          title="Where I've worked"
          subtitle="Freelance AI engineering and client automation — measured by outcomes, not slide decks."
        >
          <Experience />
        </SectionWrapper>

        <SectionWrapper
          id="skills"
          label="Skills"
          title="What I work with"
          subtitle="Hover a skill to see where I've used it."
        >
          <Skills />
        </SectionWrapper>

        <SectionWrapper
          id="about"
          label="About"
          title="A bit about me"
        >
          <About />
        </SectionWrapper>
      </main>

      <Footer />
      <PortfolioChatbot />
    </div>
  );
}
