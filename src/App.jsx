import React, { useState } from 'react';
import BlackHole from './components/BlackHole'; // Title Logic Only
import CosmicBackground from './components/CosmicBackground'; // Fixed Visual Layer
import Intro from './components/Intro';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Navbar from './components/Navbar'; // New Top Nav

import Services from './components/Services';

function App() {
  /* Transition Logic:
     1. introFinished=true (Triggered by Intro) -> Main Interface set to Visible (Opacity 1). Intro stays for fade out.
     2. Wait 1s (Transition duration).
     3. unmountIntro=true -> Remove Intro from DOM.
  */
  const [introFinished, setIntroFinished] = useState(false);
  const [unmountIntro, setUnmountIntro] = useState(false);
  const [heroRevealed, setHeroRevealed] = useState(false);

  // Ref for the main scroll container
  const mainInterfaceRef = React.useRef(null);

  const handleIntroComplete = () => {
    setIntroFinished(true); // Start showing Main
    setTimeout(() => {
      setUnmountIntro(true); // Remove Intro after fade
    }, 1500); // Wait >1s for CSS transition
  };

  return (
    <div className="App">
      {!unmountIntro && (
        <div style={{
          opacity: introFinished ? 0 : 1,
          transition: 'opacity 1.5s ease-out',
          position: 'relative',
          zIndex: 9999
        }}>
          <Intro onComplete={handleIntroComplete} />
        </div>
      )}

      <div
        ref={mainInterfaceRef} // Attach Ref here
        className={`main-interface ${introFinished ? 'visible' : 'hidden'}`}
        style={{
          opacity: introFinished ? 1 : 0,
          transition: 'opacity 1s ease-in',
          backgroundColor: '#000000', // Explicit Black
          width: '100vw',
          height: '100vh',
          position: 'fixed',
          top: 0,
          left: 0,
          overflowY: 'auto',
          overflowX: 'hidden',
          scrollBehavior: 'smooth'
        }}>
        {/* Fixed Top Navigation */}
        <Navbar />

        {/* Fixed Background Layer - ALWAYS VISIBLE now (prop true) */}
        <CosmicBackground isRevealed={true} />

        <main className="content" style={{ width: '100%', position: 'relative', zIndex: 10 }}>
          {/* Section 1: Hero (Void) */}
          <section id="hero" style={{ height: '100vh', position: 'relative', overflow: 'hidden' }}>
            <BlackHole
              onReveal={() => setHeroRevealed(true)}
              isReady={introFinished} // Pass intro state
              scrollRef={mainInterfaceRef} // Pass the Ref
            />
          </section>


          {/* Scrolling Content Sections */}
          <div className="scroll-content" style={{ position: 'relative' }}>
            <About />
            <Services />
            <Skills />
            <Projects />
            <Contact />
          </div>
        </main>
      </div>
    </div>
  );
}

export default App;
