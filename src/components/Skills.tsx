import { motion } from 'motion/react';
import { useLanguage } from '../context/LanguageContext';
import { FaReact, FaHtml5, FaCss3Alt, FaGitAlt, FaFigma, FaRobot, FaEnvelope } from "react-icons/fa";
import { SiNextdotjs, SiTypescript, SiJavascript, SiRedux, SiMui, SiTailwindcss, SiCplusplus, SiVite, SiFirebase, SiFramer } from "react-icons/si";

const skills = [
  { name: 'React', icon: <FaReact color="#61DAFB" size={20} /> },
  { name: 'Next.js', icon: <SiNextdotjs color="#ffffff" size={20} /> },
  { name: 'TypeScript', icon: <SiTypescript color="#3178C6" size={20} /> },
  { name: 'JavaScript', icon: <SiJavascript color="#F7DF1E" size={20} /> },
  { name: 'Redux', icon: <SiRedux color="#764ABC" size={20} /> },
  { name: 'Material-UI', icon: <SiMui color="#007FFF" size={20} /> },
  { name: 'Tailwind CSS', icon: <SiTailwindcss color="#06B6D4" size={20} /> },
  { name: 'HTML/CSS', icon: <div className="flex -space-x-1"><FaHtml5 color="#E34F26" size={20} /><FaCss3Alt color="#1572B6" size={20} /></div> },
  { name: 'C++', icon: <SiCplusplus color="#00599C" size={20} /> },
  { name: 'Vite', icon: <SiVite color="#646CFF" size={20} /> },
  { name: 'Git', icon: <FaGitAlt color="#F05032" size={20} /> },
  { name: 'Figma', icon: <FaFigma color="#F24E1E" size={20} /> },
  { name: 'Firebase', icon: <SiFirebase color="#FFCA28" size={20} /> },
  { name: 'Framer Motion', icon: <SiFramer color="#0055FF" size={20} /> },
  { name: 'AI Studio', icon: <FaRobot color="#A855F7" size={20} /> },
  { name: 'Web3Forms', icon: <FaEnvelope color="#3B82F6" size={20} /> }
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
  const { lang, t } = useLanguage();

  return (
    <section id="skills" className="relative z-10 w-full max-w-5xl mx-auto px-4 md:px-8 py-24">
      <div className="text-center mb-16">
        <motion.h2 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className={`text-3xl md:text-4xl font-bold text-white/90 mb-4 ${lang === 'en' ? 'tracking-tight' : ''}`}
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
            key={skill.name}
            variants={badgeVariants}
            whileHover={{ 
              scale: 1.05, 
              rotate: [-1, 1, -1, 0], 
              borderColor: 'rgba(255,255,255,0.3)',
              backgroundColor: 'rgba(255,255,255,0.1)'
            }}
            className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 text-white/80 font-medium transition-colors shadow-[0_4px_30px_rgba(0,0,0,0.1)] cursor-default"
          >
            {skill.icon}
            <span>{skill.name}</span>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
