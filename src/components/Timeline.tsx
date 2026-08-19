import { motion } from 'motion/react';
import { useLanguage } from '../context/LanguageContext';

export default function Timeline() {
  const { lang, t } = useLanguage();

  const journeyData = [
    {
      title: t('timeline.node1.title'),
      desc: t('timeline.node1.desc'),
    },
    {
      title: t('timeline.node2.title'),
      desc: t('timeline.node2.desc'),
    },
    {
      title: t('timeline.node3.title'),
      desc: t('timeline.node3.desc'),
    }
  ];

  return (
    <section id="journey" className="relative z-10 w-full max-w-4xl mx-auto px-4 md:px-8 py-24">
      <div className="text-center mb-16">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className={`text-3xl md:text-4xl font-bold text-white/90 mb-4 ${lang === 'en' ? 'tracking-tight' : ''}`}
        >
          {t('timeline.title')}
        </motion.h2>
      </div>

      <div className="relative max-w-3xl mx-auto">
        {/* Glowing vertical line */}
        <div className="absolute top-4 bottom-0 left-[15px] md:left-[31px] w-[2px] bg-gradient-to-b from-blue-500/60 via-purple-500/40 to-transparent shadow-[0_0_15px_rgba(59,130,246,0.4)] rtl:left-auto rtl:right-[15px] rtl:md:right-[31px] z-0 rounded-full"></div>

        <div className="space-y-8 relative z-10">
          {journeyData.map((node, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: lang === 'en' ? -20 : 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              className={`relative pl-12 md:pl-20 rtl:pl-0 rtl:pr-12 rtl:md:pr-20 flex items-center`}
            >
              {/* Timeline dot */}
              <div className={`absolute top-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-blue-400 ring-4 ring-blue-500/20 shadow-[0_0_15px_rgba(59,130,246,0.8)] left-[8px] md:left-[24px] rtl:left-auto rtl:right-[8px] rtl:md:right-[24px] z-10`} />
              
              <div className="bg-white/5 backdrop-blur-md shadow-[0_8px_30px_rgba(0,0,0,0.5),_inset_0_1px_1px_rgba(255,255,255,0.15)] border border-white/10 border-t-white/20 border-l-white/20 p-6 sm:p-8 rounded-2xl hover:bg-white/10 transition-all w-full group">
                <h3 className="text-xl font-bold text-white/90 mb-3 group-hover:text-blue-400 transition-colors">{node.title}</h3>
                <p className="text-white/60 leading-relaxed text-sm md:text-base">
                  {node.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
