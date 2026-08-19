import { motion, AnimatePresence } from 'motion/react';
import { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Menu, X } from 'lucide-react';

const navLinks = [
  { key: 'nav.home', href: '#' },
  { key: 'nav.projects', href: '#projects' },
  { key: 'nav.journey', href: '#journey' },
  { key: 'nav.skills', href: '#skills' },
  { key: 'nav.contact', href: '#contact' }
];

export default function Navbar() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [activeSection, setActiveSection] = useState<string>('home');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { lang, toggleLang, t } = useLanguage();

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'projects', 'journey', 'skills', 'contact'];
      let current = 'home';
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= window.innerHeight * 0.4 && rect.bottom >= window.innerHeight * 0.4) {
            current = section;
          }
        }
      }
      setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="fixed top-6 left-1/2 -translate-x-1/2 w-full max-w-3xl px-4 z-50">
      <motion.nav 
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative flex items-center justify-between px-6 py-3 bg-black/40 backdrop-blur-xl shadow-[0_8px_30px_rgba(0,0,0,0.6),_inset_0_1px_1px_rgba(255,255,255,0.2)] border border-white/10 border-t-white/20 rounded-full"
      >
        {/* Logo */}
        <div className={`text-white font-medium text-lg cursor-default whitespace-nowrap font-semibold ${lang === 'en' ? 'tracking-wide' : ''}`}>
          {t('name')}
        </div>

        {/* Desktop Links & Actions */}
        <div className="flex items-center gap-2 md:gap-4 mis-auto">
          <ul className="hidden md:flex items-center gap-1">
            {navLinks.map((link, index) => {
              const sectionId = link.href === '#' ? 'home' : link.href.substring(1);
              const isActive = activeSection === sectionId;
              
              return (
                <li key={link.key} className="relative">
                  <a
                    href={link.href}
                    onMouseEnter={() => setHoveredIndex(index)}
                    onMouseLeave={() => setHoveredIndex(null)}
                    className={`relative block px-4 py-2 text-sm transition-all z-10 ${
                      isActive 
                        ? 'text-white font-medium bg-white/20 shadow-[inset_0_1px_1px_rgba(255,255,255,0.3)] rounded-full' 
                        : 'text-white/80 hover:text-white'
                    } ${lang === 'en' ? 'tracking-wide' : ''}`}
                  >
                    {t(link.key)}
                  </a>
                  {hoveredIndex === index && !isActive && (
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
              );
            })}
          </ul>
          
          <div className="flex items-center gap-2 md:gap-4 md:border-is border-white/10 md:pis-4">
            <button
              onClick={toggleLang}
              className={`px-3 py-1.5 text-xs font-semibold rounded-full bg-white/10 hover:bg-white/20 transition-colors text-white border border-white/5 ${lang === 'en' ? 'tracking-wider' : ''}`}
            >
              {lang === 'en' ? 'FA' : 'EN'}
            </button>
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-1.5 text-white/80 hover:text-white bg-white/5 hover:bg-white/10 rounded-full border border-white/10 transition-colors"
              aria-label="Toggle Menu"
            >
              {isMobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="absolute top-full left-0 right-0 mt-4 p-4 bg-[#0a0b10]/95 backdrop-blur-3xl rounded-2xl border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.8)] flex flex-col gap-4 md:hidden overflow-hidden z-[999]"
            >
              {navLinks.map((link) => {
                const sectionId = link.href === '#' ? 'home' : link.href.substring(1);
                const isActive = activeSection === sectionId;
                
                return (
                  <a
                    key={link.key}
                    href={link.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`block px-4 py-3 rounded-xl text-sm transition-all ${
                      isActive 
                        ? 'bg-white/20 text-white font-medium shadow-[inset_0_1px_1px_rgba(255,255,255,0.2)]' 
                        : 'text-white/70 hover:text-white hover:bg-white/10'
                    } ${lang === 'en' ? 'tracking-wide' : ''}`}
                  >
                    {t(link.key)}
                  </a>
                );
              })}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>
    </div>
  );
}

