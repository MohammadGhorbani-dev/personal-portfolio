import { motion } from 'motion/react';
import { Github, ExternalLink } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

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

export default function Projects() {
  const { t } = useLanguage();

  const projects = [
    {
      title: t('projects.p2.title'),
      description: t('projects.p2.desc'),
      tags: ['React', 'REST API', 'Tailwind CSS'],
      gradient: 'from-emerald-500/20 to-teal-500/20',
      image: '/p2.jpg',
      github: "https://github.com/MohammadGhorbani-dev/Farawin-messenger",
      live: "https://mohammadghorbani-dev.github.io/Farawin-messenger/"
    },
    {
      title: t('projects.p4.title'),
      description: t('projects.p4.desc'),
      tags: ['React', 'Context API', 'Tailwind CSS'],
      gradient: 'from-pink-500/20 to-indigo-500/20',
      image: '/p4.jpg',
      github: "https://github.com/MohammadGhorbani-dev/TodoList",
      live: "https://mohammadghorbani-dev.github.io/TodoList/"
    },
    {
      title: t('projects.p3.title'),
      description: t('projects.p3.desc'),
      tags: ['React', 'Axios', 'Material-UI', 'React Router'],
      gradient: 'from-orange-500/20 to-red-500/20',
      image: '/p3.jpg',
      github: "https://github.com/MohammadGhorbani-dev/Contacts-manager",
      live: "https://contact-manager.iran.liara.run/"
    },
    {
      title: t('projects.p1.title'),
      description: t('projects.p1.desc'),
      tags: ['React', 'Vite', 'Firebase', 'Tailwind CSS'],
      gradient: 'from-blue-500/20 to-purple-500/20',
      image: '/p1.jpg',
      github: "https://github.com/MohammadGhorbani-dev/university-student-portal",
      live: null
    }
  ];

  return (
    <section id="projects" className="relative z-10 w-full max-w-7xl mx-auto px-6 py-24">
      {/* Section Header */}
      <div className="text-center mb-16">
        <motion.h2 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="text-3xl md:text-4xl font-bold tracking-tight text-white/90 mb-4"
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
            whileHover={{ scale: 1.02 }}
            className="group relative flex flex-col rounded-3xl overflow-hidden bg-white/5 backdrop-blur-xl border border-white/10 transition-all duration-500 hover:border-white/30 hover:shadow-[0_8px_32px_rgba(255,255,255,0.05)]"
          >
            <div className={`h-52 w-full relative overflow-hidden bg-gradient-to-br ${project.gradient}`}>
              <img src={project.image} alt={project.title} className="absolute inset-0 w-full h-full object-cover opacity-60 mix-blend-overlay transition-transform duration-700 group-hover:scale-110" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] to-transparent opacity-80"></div>
            </div>

            {/* Content Area */}
            <div className="flex flex-col flex-grow p-6 sm:p-8">
              <h3 className="text-xl font-semibold text-white/90 mb-3 tracking-wide">{project.title}</h3>
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
                    className="text-white/40 hover:text-white transition-colors duration-300"
                    aria-label="View source on GitHub"
                  >
                    <Github size={20} strokeWidth={2} />
                  </a>
                )}
                {project.live && (
                  <a 
                    href={project.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white/40 hover:text-white transition-colors duration-300"
                    aria-label="View live project"
                  >
                    <ExternalLink size={20} strokeWidth={2} />
                  </a>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
