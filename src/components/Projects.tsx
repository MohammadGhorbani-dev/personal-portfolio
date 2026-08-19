import { useState } from 'react';
import { motion } from 'motion/react';
import { Github, ExternalLink } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { FaLaptopCode } from 'react-icons/fa';
import TiltCard from './TiltCard';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2 }
  }
};

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] }
  }
};

function ProjectImage({ src, alt }: { src: string, alt: string }) {
  const [hasError, setHasError] = useState(false);

  if (!src || hasError) {
    return (
      <div className="w-full h-48 rounded-t-2xl bg-white/5 flex items-center justify-center border-b border-white/10">
        <FaLaptopCode size={40} color="rgba(59, 130, 246, 0.5)" />
      </div>
    );
  }

  return (
    <img 
      src={src} 
      alt={alt} 
      onError={() => setHasError(true)}
      className="w-full h-48 object-cover rounded-t-2xl" 
    />
  );
}

export default function Projects() {
  const { lang, t } = useLanguage();

  const projects = [
    {
      title: t('projects.p2.title'), // Farawin Messenger
      description: t('projects.p2.desc'),
      tags: ['React', 'REST API', 'Tailwind CSS'],
      gradient: 'from-emerald-500/20 to-teal-500/20',
      image: '/p1.jpg',
      github: "https://github.com/MohammadGhorbani-dev/Farawin-messenger",
      live: null
    },
    {
      title: t('projects.p4.title'), // TodoList
      description: t('projects.p4.desc'),
      tags: ['React', 'Context API', 'Tailwind CSS'],
      gradient: 'from-pink-500/20 to-indigo-500/20',
      image: '/p2.jpg',
      github: "https://github.com/MohammadGhorbani-dev/TodoList",
      live: "https://mohammadghorbani-dev.github.io/TodoList/"
    },
    {
      title: t('projects.p3.title'), // Contacts Manager
      description: t('projects.p3.desc'),
      tags: ['React', 'Axios', 'Material-UI', 'React Router'],
      gradient: 'from-orange-500/20 to-red-500/20',
      image: '/p3.jpg',
      github: "https://github.com/MohammadGhorbani-dev/Contacts-manager",
      live: null
    },
    {
      title: t('projects.p1.title'), // University portal
      description: t('projects.p1.desc'),
      tags: ['React', 'Vite', 'Firebase', 'Tailwind CSS'],
      gradient: 'from-blue-500/20 to-purple-500/20',
      image: '/p4.jpg',
      github: "https://github.com/MohammadGhorbani-dev/university-student-portal",
      live: null
    }
  ];

  return (
    <section id="projects" className="relative z-10 w-full max-w-7xl mx-auto px-4 md:px-8 py-24">
      {/* Section Header */}
      <div className="text-center mb-16">
        <motion.h2 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className={`text-3xl md:text-4xl font-bold text-white/90 mb-4 ${lang === 'en' ? 'tracking-tight' : ''}`}
        >
          {t('projects.title')}
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, ease: "easeOut", delay: 0.1 }}
          className="text-gray-400 text-lg max-w-2xl mx-auto"
        >
          {t('projects.subtitle')}
        </motion.p>
      </div>

      {/* Grid Layout */}
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10"
      >
        {projects.map((project, index) => (
          <motion.div
            key={index}
            variants={cardVariants}
            className="flex h-full"
          >
            <TiltCard className="w-full h-full">
              <div
                className="group relative h-full flex flex-col bg-white/5 backdrop-blur-md shadow-[0_8px_30px_rgba(0,0,0,0.5),_inset_0_1px_1px_rgba(255,255,255,0.15)] border border-white/10 border-t-white/20 border-l-white/20 rounded-2xl overflow-hidden transition-all duration-500 hover:border-white/30 hover:shadow-[0_8px_32px_rgba(255,255,255,0.05)]"
              >
                <ProjectImage src={project.image} alt={project.title} />

                {/* Content Area */}
                <div className="flex flex-col flex-grow p-6 sm:p-8">
                  <h3 className={`text-xl font-semibold text-white/90 mb-3 ${lang === 'en' ? 'tracking-wide' : ''}`}>{project.title}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed mb-6 flex-grow">{project.description}</p>
                  
                  {/* Tech Stack Tags */}
                  <div className="flex flex-wrap gap-2 mb-8">
                    {project.tags.map(tag => (
                      <span key={tag} className="px-3 py-1 text-xs font-medium rounded-full bg-white/5 border border-white/10 text-white/70">
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Footer */}
                  <div className="flex items-center gap-5 pt-5 border-t border-white/10 mt-auto rtl:flex-row-reverse rtl:justify-end">
                    {project.github && (
                      <a 
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-white/40 hover:text-white transition-colors duration-300 z-10"
                        aria-label={t('projects.source')}
                        title={t('projects.source')}
                      >
                        <Github size={20} strokeWidth={2} />
                      </a>
                    )}
                    {project.live && (
                      <a 
                        href={project.live}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-white/40 hover:text-white transition-colors duration-300 z-10"
                        aria-label={t('projects.live')}
                        title={t('projects.live')}
                      >
                        <ExternalLink size={20} strokeWidth={2} />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </TiltCard>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
