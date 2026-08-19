import { motion } from 'motion/react';
import { User } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export default function AboutMe() {
  const { lang, t } = useLanguage();

  return (
    <section id="about" className="relative z-10 w-full max-w-5xl mx-auto px-4 md:px-8 py-16">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="bg-white/5 backdrop-blur-md shadow-[0_8px_30px_rgba(0,0,0,0.5),_inset_0_1px_1px_rgba(255,255,255,0.15)] border border-white/10 border-t-white/20 rounded-3xl p-8 md:p-12 relative overflow-hidden group"
      >
        {/* Glow Effect */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full blur-[80px] -z-10 group-hover:bg-blue-500/20 transition-colors duration-500"></div>

        <div className="flex flex-col md:flex-row gap-8 items-start">
          <div className="p-4 bg-white/5 rounded-2xl border border-white/10 shadow-[0_4px_15px_rgba(0,0,0,0.3),_inset_0_1px_1px_rgba(255,255,255,0.15)] flex-shrink-0">
            <User size={32} className="text-white/80" />
          </div>
          <div>
            <h2 className={`text-2xl md:text-3xl font-bold text-white/90 mb-6 ${lang === 'en' ? 'tracking-tight' : ''}`}>
              {t('about.title')}
            </h2>
            <p className="text-white/60 text-base md:text-lg leading-loose">
              {t('about.desc')}
            </p>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
