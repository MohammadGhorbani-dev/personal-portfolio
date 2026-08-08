/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import Background from './components/Background';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Projects from './components/Projects';
import Skills from './components/Skills';
import Contact from './components/Contact';
import Footer from './components/Footer';
import { LanguageProvider } from './context/LanguageContext';

export default function App() {
  return (
    <LanguageProvider>
      <div className="min-h-screen bg-[#0a0a0a] text-white font-sans relative overflow-x-hidden selection:bg-white/20 selection:text-white">
        <Background />
        <Navbar />
        <Hero />
        <Projects />
        <Skills />
        <Contact />
        <Footer />
      </div>
    </LanguageProvider>
  );
}
