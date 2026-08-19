import { useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { Download } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import MagneticWrapper from './MagneticWrapper';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 40, filter: 'blur(10px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: {
      duration: 0.7,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

export default function Hero() {
  const { lang, t } = useLanguage();
  const [greeting, setGreeting] = useState('');
  const [emoji, setEmoji] = useState('');

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour >= 5 && hour < 12) {
      setGreeting('hero.greeting.morning');
      setEmoji('☀️');
    } else if (hour >= 12 && hour < 17) {
      setGreeting('hero.greeting.afternoon');
      setEmoji('🌤️');
    } else if (hour >= 17 && hour < 21) {
      setGreeting('hero.greeting.evening');
      setEmoji('🌇');
    } else {
      setGreeting('hero.greeting.night');
      setEmoji('🌙');
    }
  }, []);

  const { scrollY } = useScroll();
  const heroOpacity = useTransform(scrollY, [0, 500], [1, 0]);
  const heroScale = useTransform(scrollY, [0, 500], [1, 0.8]);
  const heroRotateX = useTransform(scrollY, [0, 500], [0, 15]);

  return (
    <main id="home" className="min-h-[100dvh] flex flex-col items-center relative z-10 w-full pt-24 pb-8 px-6" style={{ perspective: "1000px" }}>
      <motion.section
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="flex-1 flex flex-col items-center justify-center gap-6 md:gap-8 w-full max-w-3xl mx-auto text-center origin-top"
        style={{
          opacity: heroOpacity,
          scale: heroScale,
          rotateX: heroRotateX
        }}
      >
        <motion.div variants={itemVariants} className="mb-6">
          <img src="/profile.jpg" alt="Mohamad Ghorbani" className="w-32 h-32 md:w-40 md:h-40 rounded-full object-cover border-4 border-white/10 shadow-[0_0_30px_rgba(255,255,255,0.05)] mx-auto" />
        </motion.div>

        {/* Badge */}
        <motion.div variants={itemVariants} className="mb-8">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 backdrop-blur-md border border-white/10 text-sm text-white/90 shadow-[0_4px_30px_rgba(0,0,0,0.1)]">
            <span>{greeting ? t(greeting) : t('hero.badge')}</span>
            <span className="text-base">{emoji || '👋'}</span>
          </div>
        </motion.div>

        {/* Headline */}
        <motion.h1 
          variants={itemVariants}
          className={`text-4xl md:text-6xl lg:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-b from-white to-white/60 leading-relaxed py-2 overflow-visible ${lang === 'en' ? 'tracking-tight' : ''}`}
        >
          {t('hero.title')}
        </motion.h1>

        {/* Sub-headline */}
        <motion.h2 
          variants={itemVariants}
          className={`text-xl sm:text-2xl font-medium text-white/60 ${lang === 'en' ? 'tracking-wide' : ''}`}
        >
          {t('hero.subtitle')}
        </motion.h2>

        {/* CTA Buttons */}
        <motion.div variants={itemVariants} className="flex flex-col sm:flex-row items-center justify-center gap-6 md:gap-8 w-full flex-wrap">
          <MagneticWrapper>
            <motion.a
              href="#projects"
              className="block w-full sm:w-auto px-8 py-3.5 rounded-full text-white text-center font-medium transition-all bg-white/10 border border-white/20 border-t-white/30 shadow-[0_4px_15px_rgba(0,0,0,0.3),_inset_0_1px_1px_rgba(255,255,255,0.2)] hover:bg-white/20 hover:-translate-y-0.5 hover:shadow-[0_6px_20px_rgba(0,0,0,0.4),_inset_0_1px_1px_rgba(255,255,255,0.3)] active:translate-y-0.5 active:shadow-[inset_0_2px_4px_rgba(0,0,0,0.4)] active:border-t-white/10"
            >
              {t('hero.cta.explore')}
            </motion.a>
          </MagneticWrapper>
          
          <MagneticWrapper>
            <motion.a
              href="#contact"
              className="block w-full sm:w-auto px-8 py-3.5 rounded-full text-white text-center font-medium transition-all bg-white/10 border border-white/20 border-t-white/30 shadow-[0_4px_15px_rgba(0,0,0,0.3),_inset_0_1px_1px_rgba(255,255,255,0.2)] hover:bg-white/20 hover:-translate-y-0.5 hover:shadow-[0_6px_20px_rgba(0,0,0,0.4),_inset_0_1px_1px_rgba(255,255,255,0.3)] active:translate-y-0.5 active:shadow-[inset_0_2px_4px_rgba(0,0,0,0.4)] active:border-t-white/10"
            >
              {t('hero.cta.touch')}
            </motion.a>
          </MagneticWrapper>

          <MagneticWrapper>
            <motion.a
              href="/cv.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-3.5 rounded-full text-white font-medium transition-all bg-white/10 border border-white/20 border-t-white/30 shadow-[0_4px_15px_rgba(0,0,0,0.3),_inset_0_1px_1px_rgba(255,255,255,0.2)] hover:bg-white/20 hover:-translate-y-0.5 hover:shadow-[0_6px_20px_rgba(0,0,0,0.4),_inset_0_1px_1px_rgba(255,255,255,0.3)] active:translate-y-0.5 active:shadow-[inset_0_2px_4px_rgba(0,0,0,0.4)] active:border-t-white/10"
            >
              <Download size={18} />
              {t('hero.cta.cv')}
            </motion.a>
          </MagneticWrapper>
        </motion.div>
      </motion.section>

      {/* Animated Scroll Indicator */}
      <motion.div 
        style={{ opacity: heroOpacity }}
        className="mt-auto pt-8 flex flex-col items-center gap-3 z-20 pointer-events-none"
      >
        <div className="w-7 h-12 rounded-full border border-white/20 flex justify-center p-1.5 bg-white/5 backdrop-blur-md shadow-[inset_0_1px_1px_rgba(255,255,255,0.15)]">
          <motion.div 
            animate={{ y: [0, 16, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            className="w-1.5 h-2.5 bg-white/80 rounded-full shadow-[0_0_8px_rgba(255,255,255,0.8)]"
          />
        </div>
        <span className="text-[10px] text-white/50 uppercase tracking-widest font-medium">
          {t('hero.scroll')}
        </span>
      </motion.div>
    </main>
  );
}
