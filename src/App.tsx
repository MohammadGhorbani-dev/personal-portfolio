/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import Background from './components/Background';
import CanvasScrollBackground from './components/CanvasScrollBackground';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import AboutMe from './components/AboutMe';
import Projects from './components/Projects';
import Skills from './components/Skills';
import Timeline from './components/Timeline';
import Contact from './components/Contact';
import Footer from './components/Footer';
import { LanguageProvider } from './context/LanguageContext';
import Preloader from './components/Preloader';
import CustomCursor from './components/CustomCursor';

export default function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2500);

    const handleLoad = () => {
      setIsLoading(false);
    };

    window.addEventListener('load', handleLoad);
    
    return () => {
      clearTimeout(timer);
      window.removeEventListener('load', handleLoad);
    };
  }, []);

  return (
    <LanguageProvider>
      <CustomCursor />
      <AnimatePresence>
        {isLoading && <Preloader />}
      </AnimatePresence>
      <div className="min-h-screen text-white font-sans relative overflow-x-hidden w-full max-w-[100vw] selection:bg-white/20 selection:text-white">
        <CanvasScrollBackground />
        <Background />
        
        {/* Content Wrapper for Liquid Glass Overlay */}
        <div className="relative z-10 w-full min-h-screen bg-gradient-to-b from-transparent to-[#0a0b10]">
          <Navbar />
          <Hero />
          <AboutMe />
          <Projects />
          <Timeline />
          <Skills />
          <Contact />
          <Footer />
        </div>
      </div>
    </LanguageProvider>
  );
}
