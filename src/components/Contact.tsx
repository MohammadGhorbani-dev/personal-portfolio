import { motion } from 'motion/react';
import { Coffee, Linkedin, Github, Music, Gamepad2 } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export default function Contact() {
  const { t } = useLanguage();

  return (
    <section id="contact" className="relative z-10 w-full max-w-5xl mx-auto px-6 py-24">
      <div className="text-center mb-16">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-3xl md:text-4xl font-bold tracking-tight text-white/90 mb-4"
        >
          {t('contact.title')}
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.1 }}
          className="text-gray-400 text-lg"
        >
          {t('contact.subtitle')}
        </motion.p>
      </div>

      <div className="flex flex-col xl:flex-row gap-12 max-w-4xl mx-auto">
        {/* Contact Form */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="flex-1 rounded-3xl p-8 sm:p-10 bg-white/5 backdrop-blur-xl border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.1)] flex flex-col"
        >
          <form 
            action="https://api.web3forms.com/submit"
            method="POST"
            className="flex flex-col gap-8 flex-grow"
          >
            <input type="hidden" name="access_key" value="dc17bd35-b312-486d-959a-d781714a6400" />
            <div className="flex flex-col sm:flex-row gap-8">
              <div className="flex-1">
                <input
                  type="text"
                  name="name"
                  placeholder={t('contact.name')}
                  required
                  className="w-full bg-transparent border-b border-white/20 px-2 py-3 text-white placeholder-white/40 focus:outline-none focus:border-white/60 transition-colors rounded-none"
                />
              </div>
              <div className="flex-1">
                <input
                  type="email"
                  name="email"
                  placeholder={t('contact.email')}
                  required
                  className="w-full bg-transparent border-b border-white/20 px-2 py-3 text-white placeholder-white/40 focus:outline-none focus:border-white/60 transition-colors rounded-none"
                />
              </div>
            </div>
            <div>
              <textarea
                name="message"
                placeholder={t('contact.message')}
                rows={4}
                required
                className="w-full bg-transparent border-b border-white/20 px-2 py-3 text-white placeholder-white/40 focus:outline-none focus:border-white/60 transition-colors rounded-none resize-none"
              ></textarea>
            </div>
            <motion.button
              type="submit"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full mt-4 px-8 py-4 rounded-full bg-white text-black font-medium transition-colors hover:bg-white/90 shadow-[0_0_20px_rgba(255,255,255,0.15)]"
            >
              {t('contact.send')}
            </motion.button>
          </form>

          {/* Coffee Donation Button */}
          <div className="mt-8 pt-8 border-t border-white/10 flex justify-center">
            <motion.a
              href="https://coffeebede.com/rahnama"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 px-6 py-2.5 rounded-full bg-white/5 backdrop-blur-md border border-white/10 text-white/90 hover:bg-white/10 hover:border-white/30 transition-all shadow-[0_0_15px_rgba(255,221,0,0.15)] hover:shadow-[0_0_25px_rgba(255,221,0,0.25)]"
            >
              <Coffee size={18} className="text-[#FFDD00]" />
              <span className="font-medium text-sm">{t('contact.coffee')}</span>
            </motion.a>
          </div>
        </motion.div>
      </div>

      {/* Social & Gaming Showcase */}
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
        className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-5xl mx-auto"
      >
        {/* LinkedIn */}
        <div className="flex items-center gap-4 p-5 rounded-3xl bg-white/5 backdrop-blur-md border border-white/10 opacity-50 cursor-not-allowed group">
          <div className="p-3 bg-blue-500/10 rounded-2xl group-hover:bg-blue-500/20 transition-colors">
            <Linkedin className="text-blue-400" size={24} />
          </div>
          <div className="flex flex-col">
            <span className="font-medium text-white/90">LinkedIn</span>
            <span className="text-xs text-white/40">Coming Soon</span>
          </div>
        </div>

        {/* GitHub */}
        <a href="https://github.com/MohammadGhorbani-dev" target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 p-5 rounded-3xl bg-white/5 backdrop-blur-md border border-white/10 hover:bg-white/10 hover:border-white/30 transition-all group">
          <div className="p-3 bg-white/5 rounded-2xl group-hover:bg-white/10 transition-colors">
            <Github className="text-white" size={24} />
          </div>
          <span className="font-medium text-white/90">GitHub</span>
        </a>

        {/* Spotify */}
        <a href="https://open.spotify.com/user/31f3fkgfesvzseehg7hqxlsz3j4q?si=130b58e4b389409f" target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 p-5 rounded-3xl bg-white/5 backdrop-blur-md border border-white/10 hover:bg-white/10 hover:border-[#1DB954]/40 transition-all group">
          <div className="p-3 bg-[#1DB954]/10 rounded-2xl group-hover:bg-[#1DB954]/20 transition-colors">
            <Music className="text-[#1DB954]" size={24} />
          </div>
          <div className="flex flex-col">
            <span className="font-medium text-white/90">Spotify</span>
            <span className="text-xs text-white/40">Vibing</span>
          </div>
        </a>

        {/* Steam Badge */}
        <a href="https://steamcommunity.com/profiles/76561198839628975/" target="_blank" rel="noopener noreferrer" className="relative overflow-hidden flex items-center gap-4 p-5 rounded-3xl bg-white/5 backdrop-blur-md border border-white/10 hover:bg-white/10 hover:border-blue-500/40 transition-all group">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-purple-600/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
          <div className="p-3 bg-blue-500/10 rounded-2xl group-hover:bg-blue-500/20 transition-colors relative z-10">
            <Gamepad2 className="text-blue-400" size={24} />
          </div>
          <div className="flex flex-col relative z-10">
            <span className="font-medium text-white/90">Steam</span>
            <span className="text-[10px] sm:text-xs text-white/50 whitespace-nowrap">{t('social.playing')}</span>
          </div>
        </a>
      </motion.div>
    </section>
  );
}
