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
import { SpeedInsights } from '@vercel/speed-insights/react';
import DustParticles from './components/animations/DustParticles';

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
    <div className="min-h-screen flex flex-col bg-canvas text-ink relative overflow-x-hidden">
      {/* Living Desert Atmosphere: Windblown Dust Particles & Rolling Tumbleweed */}
      <DustParticles />

      <Header activeSection={activeSection} />

      <main className="flex-grow w-full max-w-5xl mx-auto px-6 relative z-10">
        <Hero />

        <SectionWrapper
          id="work"
          label="★ BOUNTIES HUNTED"
          title="Field Deployments & Projects"
          subtitle="Full-stack machine learning, computer vision, and multi-agent systems — backed by hard mathematical rigor and verifiable benchmarks."
        >
          <div className="space-y-10">
            <FeaturedWork />
            <Projects />
          </div>
        </SectionWrapper>

        <SectionWrapper
          id="experience"
          label="★ THE FRONTIER LEDGER"
          title="Where I've Rode & Delivered"
          subtitle="Engineering leadership and client automations across 20+ European storefronts — slashing turnaround times by 90%."
        >
          <Experience />
        </SectionWrapper>

        <SectionWrapper
          id="skills"
          label="★ THE GUNSMITH & ARSENAL"
          title="Weapons of Choice"
          subtitle="Hover a tool or framework to inspect where it was fired in the field."
        >
          <Skills />
        </SectionWrapper>

        <SectionWrapper
          id="about"
          label="★ THE DISPATCH"
          title="The Tale of Arsalan"
        >
          <About />
        </SectionWrapper>
      </main>

      <Footer />
      <PortfolioChatbot />
      <SpeedInsights />
    </div>
  );
}
