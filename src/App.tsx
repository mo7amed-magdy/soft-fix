import { useEffect } from 'react';
import { MotionConfig } from 'framer-motion';
import { FloatingNav } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { About } from '@/sections/About';
import { CaseStudy } from '@/sections/CaseStudy';
import { Contact } from '@/sections/Contact';
import { Hero } from '@/sections/Hero';
import { Marquee } from '@/sections/Marquee';
import { Process } from '@/sections/Process';
import { Projects } from '@/sections/Projects';
import { Services } from '@/sections/Services';
import { WhyUs } from '@/sections/WhyUs';
import { PROJECTS } from '@/data/projects';
import { initSmoothScroll } from '@/lib/scroll';

export default function App() {
  useEffect(() => initSmoothScroll(), []);

  return (
    <MotionConfig reducedMotion="user">
      <a
        href="#main"
        className="sr-only z-[100] rounded-full bg-white px-5 py-3 font-medium text-canvas focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
      >
        Skip to content
      </a>
      <FloatingNav />
      <div className="bg-canvas" style={{ overflowX: 'clip' }}>
        <Hero />
        <main id="main">
          <Marquee />
          <About />
          <Services />
          <Projects />
          {PROJECTS.map((project, i) =>
            project.caseStudy ? <CaseStudy key={project.slug} project={project} index={i} /> : null,
          )}
          <WhyUs />
          <Process />
          <Contact />
        </main>
        <Footer />
      </div>
    </MotionConfig>
  );
}
