import { motion } from 'motion/react';
import { useState } from 'react';

const navLinks = ['Home', 'Projects', 'Skills', 'Contact'];

export default function Navbar() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <div className="fixed top-6 left-1/2 -translate-x-1/2 w-full max-w-3xl px-4 z-50">
      <motion.nav 
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="flex items-center justify-between px-6 py-3 rounded-full bg-white/5 backdrop-blur-xl border border-white/10 shadow-[0_4px_30px_rgba(0,0,0,0.1)]"
      >
        {/* Logo */}
        <div className="text-white font-medium text-lg tracking-wide cursor-default">
          Mohammad.dev
        </div>

        {/* Links */}
        <ul className="flex items-center gap-1">
          {navLinks.map((link, index) => (
            <li key={link} className="relative">
              <button
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                className="relative px-4 py-2 text-sm text-white/80 hover:text-white transition-colors z-10"
              >
                {link}
              </button>
              {hoveredIndex === index && (
                <motion.div
                  layoutId="nav-hover-pill"
                  className="absolute inset-0 bg-white/10 rounded-full z-0"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ type: "spring", bounce: 0.15, duration: 0.5 }}
                />
              )}
            </li>
          ))}
        </ul>
      </motion.nav>
    </div>
  );
}
