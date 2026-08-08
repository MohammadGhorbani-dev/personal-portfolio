/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import Background from './components/Background';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
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
    }, 1500);

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
      <div className="min-h-screen bg-[#0a0a0a] text-white font-sans relative overflow-x-hidden selection:bg-white/20 selection:text-white">
        <Background />
        <Navbar />
        <Hero />
        <Projects />
        <Timeline />
        <Skills />
        <Contact />
        <Footer />
      </div>
    </LanguageProvider>
  );
}
