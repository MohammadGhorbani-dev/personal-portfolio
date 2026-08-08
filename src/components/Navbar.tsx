import { motion } from 'motion/react';
import { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';

const navLinks = [
  { key: 'nav.home', href: '#' },
  { key: 'nav.projects', href: '#projects' },
  { key: 'nav.skills', href: '#skills' },
  { key: 'nav.contact', href: '#contact' }
];

export default function Navbar() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const { lang, toggleLang, t } = useLanguage();

  return (
    <div className="fixed top-6 left-1/2 -translate-x-1/2 w-full max-w-3xl px-4 z-50">
      <motion.nav 
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="flex items-center justify-between px-6 py-3 rounded-full bg-white/5 backdrop-blur-xl border border-white/10 shadow-[0_4px_30px_rgba(0,0,0,0.1)]"
      >
        {/* Logo */}
        <div className="text-white font-medium text-lg tracking-wide cursor-default whitespace-nowrap font-semibold">
          {t('name')}
        </div>

        {/* Links */}
        <ul className="flex items-center gap-1 sm:gap-2 mis-auto">
          {navLinks.map((link, index) => (
            <li key={link.key} className="relative hidden sm:block">
              <a
                href={link.href}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                className="relative block px-3 md:px-4 py-2 text-sm text-white/80 hover:text-white transition-colors z-10"
              >
                {t(link.key)}
              </a>
              {hoveredIndex === index && (
                <motion.div
                  layoutId="nav-hover-pill"
                  className="absolute inset-0 bg-white/10 rounded-full z-0"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4, ease: "easeInOut" }}
                />
              )}
            </li>
          ))}
          
          <li className="pis-2 sm:pis-4 sm:mis-2 sm:border-is border-white/10">
            <button
              onClick={toggleLang}
              className="px-3 py-1.5 text-xs font-semibold tracking-wider rounded-full bg-white/10 hover:bg-white/20 transition-colors text-white border border-white/5"
            >
              {lang === 'en' ? 'FA' : 'EN'}
            </button>
          </li>
        </ul>
      </motion.nav>
    </div>
  );
}

