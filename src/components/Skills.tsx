import { motion } from 'motion/react';
import { useLanguage } from '../context/LanguageContext';

const skills = [
  'React', 'Vite', 'JavaScript', 'TypeScript', 'Firebase',
  'Tailwind CSS', 'Framer Motion', 'Git', 'NextUI', 'Node.js',
  'Figma', 'UI/UX Design'
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const badgeVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] }
  }
};

export default function Skills() {
  const { t } = useLanguage();

  return (
    <section id="skills" className="relative z-10 w-full max-w-4xl mx-auto px-6 py-24">
      <div className="text-center mb-16">
        <motion.h2 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="text-3xl md:text-4xl font-bold tracking-tight text-white/90 mb-4"
        >
          {t('skills.title')}
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, ease: "easeOut", delay: 0.1 }}
          className="text-gray-400 text-lg max-w-2xl mx-auto"
        >
          {t('skills.subtitle')}
        </motion.p>
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        className="flex flex-wrap justify-center gap-4"
      >
        {skills.map((skill) => (
          <motion.div
            key={skill}
            variants={badgeVariants}
            whileHover={{ 
              scale: 1.05, 
              rotate: [-1, 1, -1, 0], 
              borderColor: 'rgba(255,255,255,0.3)',
              backgroundColor: 'rgba(255,255,255,0.1)'
            }}
            className="px-6 py-3 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 text-white/80 font-medium transition-colors shadow-[0_4px_30px_rgba(0,0,0,0.1)] cursor-default"
          >
            {skill}
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
