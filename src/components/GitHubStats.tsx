import { motion } from 'motion/react';
import { Folder, Clock, GitCommit } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export default function GitHubStats() {
  const { lang, t } = useLanguage();

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
      className="flex-[2] p-6 bg-white/5 backdrop-blur-md shadow-[0_8px_30px_rgba(0,0,0,0.5),_inset_0_1px_1px_rgba(255,255,255,0.15)] border border-white/10 border-t-white/20 border-l-white/20 rounded-3xl flex flex-col justify-center items-center relative overflow-hidden group min-h-[250px]"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 opacity-50 group-hover:opacity-100 transition-opacity pointer-events-none"></div>
      
      <div className="relative z-10 w-full h-full flex flex-col items-center justify-between gap-6 cursor-default select-none">
        <div className="flex flex-col items-center gap-3">
          <div 
            aria-label="Alex Morgan Sample Avatar"
            className="w-20 h-20 rounded-full border-2 border-white/20 shadow-[0_0_15px_rgba(59,130,246,0.3)] transition-transform duration-300 group-hover:scale-105 flex items-center justify-center bg-gradient-to-br from-blue-600/30 via-indigo-600/20 to-purple-600/30 backdrop-blur-sm relative overflow-hidden"
          >
            <span className="font-mono text-xl font-bold text-white/90 select-none">AM</span>
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-white/10 pointer-events-none" />
          </div>
          <div className="text-center flex flex-col items-center">
            <div className="flex items-center justify-center gap-2">
              <h3 className="text-lg font-semibold text-white/90">{t('name')}</h3>
              <span className="px-2 py-0.5 text-[10px] font-mono rounded-full bg-blue-500/10 text-blue-300 border border-blue-500/20">
                {t('github.sampleBadge')}
              </span>
            </div>
            <p dir="ltr" className="text-sm text-blue-400 font-mono">@alexmorgan</p>
          </div>
        </div>
        
        <div className="flex flex-col gap-3 bg-black/20 px-5 py-4 rounded-2xl border border-white/5 shadow-inner w-full">
          <div className="flex items-center justify-between">
            <span className={`text-xs text-white/50 uppercase flex items-center gap-2 ${lang === 'en' ? 'tracking-wider' : ''}`}>
              <Folder size={14} /> {t('github.repos')}
            </span>
            <span dir="ltr" className="font-semibold text-white/90 font-mono">28</span>
          </div>
          <div className="w-full h-[1px] bg-white/5"></div>
          <div className="flex items-center justify-between">
            <span className={`text-xs text-white/50 uppercase flex items-center gap-2 ${lang === 'en' ? 'tracking-wider' : ''}`}>
              <Clock size={14} /> {t('github.active')}
            </span>
            <span className="text-sm text-white/80">{t('github.recent')}</span>
          </div>
          <div className="w-full h-[1px] bg-white/5"></div>
          <div className="flex items-center justify-between">
            <span className={`text-xs text-white/50 uppercase flex items-center gap-2 ${lang === 'en' ? 'tracking-wider' : ''}`}>
              <GitCommit size={14} /> {t('github.push')}
            </span>
            <span dir="ltr" className="text-sm text-blue-400 font-medium font-mono max-w-[130px] truncate" title="portfolio-core">
              portfolio-core
            </span>
          </div>
        </div>

        <p className="text-[11px] text-white/40 text-center">
          {t('github.demoNotice')}
        </p>
      </div>
    </motion.div>
  );
}
