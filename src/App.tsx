/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import Background from './components/Background';
import Navbar from './components/Navbar';
import Hero from './components/Hero';

export default function App() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white font-sans relative overflow-hidden selection:bg-white/20 selection:text-white">
      <Background />
      <Navbar />
      <Hero />
    </div>
  );
}
