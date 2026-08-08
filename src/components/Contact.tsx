import { motion } from 'motion/react';
import { Coffee, Linkedin, Github, Music, Gamepad2, CheckCircle2, Send } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import React, { useState, useEffect } from 'react';

export default function Contact() {
  const { lang, t } = useLanguage();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [cooldownLeft, setCooldownLeft] = useState(0);
  const [errors, setErrors] = useState({ name: '', email: '', message: '' });

  useEffect(() => {
    const lastSubmit = localStorage.getItem('lastContactSubmit');
    if (lastSubmit) {
      const elapsed = Math.floor((Date.now() - parseInt(lastSubmit)) / 1000);
      if (elapsed < 300) {
        setCooldownLeft(300 - elapsed);
      }
    }
  }, []);

  useEffect(() => {
    if (cooldownLeft > 0) {
      const timer = setInterval(() => {
        setCooldownLeft(prev => prev - 1);
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [cooldownLeft]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (cooldownLeft > 0) return;

    const formData = new FormData(e.currentTarget);
    const name = formData.get('name') as string;
    const email = formData.get('email') as string;
    const message = formData.get('message') as string;

    const newErrors = { name: '', email: '', message: '' };
    let hasError = false;

    if (!name.trim()) {
      newErrors.name = t('contact.err.name');
      hasError = true;
    }
    if (!email.trim()) {
      newErrors.email = t('contact.err.email');
      hasError = true;
    }
    if (!message.trim()) {
      newErrors.message = t('contact.err.message');
      hasError = true;
    }

    setErrors(newErrors);
    if (hasError) return;

    setIsSubmitting(true);
    const object = Object.fromEntries(formData.entries());
    const json = JSON.stringify(object);

    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json"
        },
        body: json
      });
      const data = await res.json();
      
      if (data.success) {
        setIsSuccess(true);
        const form = e.target as HTMLFormElement;
        form.reset();
        localStorage.setItem('lastContactSubmit', Date.now().toString());
        setCooldownLeft(300);
        setTimeout(() => setIsSuccess(false), 5000);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60).toString().padStart(2, '0');
    const s = (seconds % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  return (
    <section id="contact" className="relative z-10 w-full max-w-5xl mx-auto px-6 py-24">
      <div className="text-center mb-16">
        <motion.h2 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className={`text-3xl md:text-4xl font-bold text-white/90 mb-4 ${lang === 'en' ? 'tracking-tight' : ''}`}
        >
          {t('contact.title')}
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, ease: "easeOut", delay: 0.1 }}
          className="text-gray-400 text-lg"
        >
          {t('contact.subtitle')}
        </motion.p>
      </div>

      <div className="flex flex-col xl:flex-row gap-12 max-w-4xl mx-auto">
        {/* Contact Form */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="flex-1 rounded-3xl p-8 sm:p-10 bg-white/5 backdrop-blur-xl border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.1)] flex flex-col"
        >
          <form 
            onSubmit={handleSubmit}
            className="flex flex-col gap-6 flex-grow"
          >
            <input type="hidden" name="access_key" value="dc17bd35-b312-486d-959a-d781714a6400" />
            <div className="flex flex-col sm:flex-row gap-6">
              <div className="flex-1">
                <input
                  type="text"
                  name="name"
                  placeholder={t('contact.name')}
                  onChange={() => setErrors(prev => ({ ...prev, name: '' }))}
                  disabled={cooldownLeft > 0 || isSubmitting}
                  className="w-full bg-transparent border-b border-white/20 px-2 py-3 text-white placeholder-white/40 focus:outline-none focus:border-white/60 transition-colors rounded-none disabled:opacity-50"
                />
                {errors.name && <span className="text-red-400 text-xs mt-1 block px-2">{errors.name}</span>}
              </div>
              <div className="flex-1">
                <input
                  type="email"
                  name="email"
                  placeholder={t('contact.email')}
                  onChange={() => setErrors(prev => ({ ...prev, email: '' }))}
                  disabled={cooldownLeft > 0 || isSubmitting}
                  className="w-full bg-transparent border-b border-white/20 px-2 py-3 text-white placeholder-white/40 focus:outline-none focus:border-white/60 transition-colors rounded-none disabled:opacity-50"
                />
                {errors.email && <span className="text-red-400 text-xs mt-1 block px-2">{errors.email}</span>}
              </div>
            </div>
            <div>
              <textarea
                name="message"
                placeholder={t('contact.message')}
                rows={4}
                onChange={() => setErrors(prev => ({ ...prev, message: '' }))}
                disabled={cooldownLeft > 0 || isSubmitting}
                className="w-full bg-transparent border-b border-white/20 px-2 py-3 text-white placeholder-white/40 focus:outline-none focus:border-white/60 transition-colors rounded-none resize-none disabled:opacity-50"
              ></textarea>
              {errors.message && <span className="text-red-400 text-xs mt-1 block px-2">{errors.message}</span>}
            </div>
            
            <div className="mt-4 relative">
              <motion.button
                type="submit"
                disabled={cooldownLeft > 0 || isSubmitting}
                whileHover={cooldownLeft === 0 && !isSubmitting ? { scale: 1.02 } : {}}
                whileTap={cooldownLeft === 0 && !isSubmitting ? { scale: 0.98 } : {}}
                className="w-full px-8 py-4 rounded-full bg-white text-black font-medium transition-all hover:bg-white/90 shadow-[0_0_20px_rgba(255,255,255,0.15)] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <span className="opacity-70">Sending...</span>
                ) : cooldownLeft > 0 ? (
                  <span>Wait {formatTime(cooldownLeft)}</span>
                ) : (
                  t('contact.send')
                )}
              </motion.button>
              
              {isSuccess && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="absolute -bottom-10 left-0 right-0 text-center flex items-center justify-center gap-2 text-emerald-400 text-sm font-medium"
                >
                  <CheckCircle2 size={16} />
                  Message sent successfully!
                </motion.div>
              )}
            </div>
            
            <div className="mt-4 text-center">
              <p className="text-white/50 text-sm">
                {t('contact.direct')} <a href="mailto:mohamad.ghorbani.official@gmail.com" className="text-white hover:underline transition-colors">mohamad.ghorbani.official@gmail.com</a>
              </p>
            </div>
          </form>
        </motion.div>
      </div>

      {/* Social & Gaming Showcase */}
      <motion.div 
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.7, ease: "easeOut", delay: 0.2 }}
        className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-5xl mx-auto"
      >
        {/* LinkedIn */}
        <div className="h-32 w-full flex items-center gap-4 p-5 rounded-3xl bg-white/5 backdrop-blur-md border border-white/10 opacity-50 cursor-not-allowed group">
          <div className="p-3 bg-blue-500/10 rounded-2xl group-hover:bg-blue-500/20 transition-colors">
            <Linkedin className="text-blue-400" size={24} />
          </div>
          <div className="flex flex-col">
            <span className="font-medium text-white/90">LinkedIn</span>
            <span className="text-xs text-white/40">Coming Soon</span>
          </div>
        </div>

        {/* GitHub */}
        <a href="https://github.com/MohammadGhorbani-dev" target="_blank" rel="noopener noreferrer" className="h-32 w-full relative overflow-hidden flex items-center gap-4 p-5 rounded-3xl bg-white/5 backdrop-blur-md border border-white/10 hover:bg-white/10 hover:border-white/30 transition-all group">
          <div style={{ backgroundImage: "url('/assets/gifs/github.gif')" }} className="absolute inset-0 bg-cover bg-center z-0"></div>
          <div className="absolute inset-0 bg-black/60 group-hover:bg-black/30 transition-colors duration-300 z-0"></div>
          <div className="p-3 bg-white/5 rounded-2xl group-hover:bg-white/10 transition-colors relative z-10">
            <Github className="text-white" size={24} />
          </div>
          <span className="font-medium text-white/90 relative z-10 [text-shadow:0_2px_4px_rgba(0,0,0,0.8)]">GitHub</span>
        </a>

        {/* Telegram */}
        <a href="https://t.me/MrMGH_1999" target="_blank" rel="noopener noreferrer" className="h-32 w-full relative overflow-hidden flex items-center gap-4 p-5 rounded-3xl bg-white/5 backdrop-blur-md border border-white/10 hover:bg-white/10 hover:border-blue-400/40 transition-all group">
          <div style={{ backgroundImage: "url('/assets/gifs/telegram.gif')" }} className="absolute inset-0 bg-cover bg-center z-0"></div>
          <div className="absolute inset-0 bg-black/60 group-hover:bg-black/30 transition-colors duration-300 z-0"></div>
          <div className="p-3 bg-blue-400/10 rounded-2xl group-hover:bg-blue-400/20 transition-colors relative z-10">
            <Send className="text-blue-400" size={24} />
          </div>
          <span className="font-medium text-white/90 relative z-10 [text-shadow:0_2px_4px_rgba(0,0,0,0.8)]">{t('social.telegram')}</span>
        </a>

        {/* Spotify */}
        <a href="https://open.spotify.com/user/31f3fkgfesvzseehg7hqxlsz3j4q?si=130b58e4b389409f" target="_blank" rel="noopener noreferrer" className="h-32 w-full relative overflow-hidden flex items-center gap-4 p-5 rounded-3xl bg-white/5 backdrop-blur-md border border-white/10 hover:bg-white/10 hover:border-[#1DB954]/40 transition-all group">
          <div style={{ backgroundImage: "url('/assets/gifs/spotify.gif')" }} className="absolute inset-0 bg-cover bg-center z-0"></div>
          <div className="absolute inset-0 bg-black/60 group-hover:bg-black/30 transition-colors duration-300 z-0"></div>
          <div className="p-3 bg-[#1DB954]/10 rounded-2xl group-hover:bg-[#1DB954]/20 transition-colors relative z-10">
            <Music className="text-[#1DB954]" size={24} />
          </div>
          <div className="flex flex-col relative z-10 [text-shadow:0_2px_4px_rgba(0,0,0,0.8)]">
            <span className="font-medium text-white/90">Spotify</span>
            <span className="text-xs text-white/40">Vibing</span>
          </div>
        </a>

        {/* Steam Badge */}
        <a href="https://steamcommunity.com/profiles/76561198839628975/" target="_blank" rel="noopener noreferrer" className="col-span-2 md:col-span-4 h-32 w-full relative overflow-hidden flex items-center justify-center gap-4 p-5 rounded-3xl bg-white/5 backdrop-blur-md border border-white/10 hover:bg-white/10 hover:border-blue-500/40 transition-all group">
          <div style={{ backgroundImage: "url('/assets/gifs/steam.gif')" }} className="absolute inset-0 bg-cover bg-center z-0"></div>
          <div className="absolute inset-0 bg-black/60 group-hover:bg-black/30 transition-colors duration-300 z-0"></div>
          <div className="p-3 bg-blue-500/10 rounded-2xl group-hover:bg-blue-500/20 transition-colors relative z-10">
            <Gamepad2 className="text-blue-400" size={24} />
          </div>
          <div className="flex flex-col relative z-10 [text-shadow:0_2px_4px_rgba(0,0,0,0.8)]">
            <span className="font-medium text-white/90">Steam</span>
            <span className="text-[10px] sm:text-xs text-white/50 whitespace-nowrap">{t('social.playing')}</span>
          </div>
        </a>
      </motion.div>

      {/* Coffee Donation Button at the bottom */}
      <motion.div 
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.7, ease: "easeOut", delay: 0.3 }}
        className="mt-16 flex justify-center"
      >
        <motion.a
          href="https://coffeebede.com/rahnama"
          target="_blank"
          rel="noopener noreferrer"
          title={t('contact.coffeeTooltip')}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="flex items-center gap-3 px-8 py-4 rounded-full bg-white/5 backdrop-blur-xl border border-[#FFDD00]/30 text-white/90 hover:bg-[#FFDD00]/10 hover:border-[#FFDD00]/60 transition-all shadow-[0_0_20px_rgba(255,221,0,0.15)] hover:shadow-[0_0_35px_rgba(255,221,0,0.3)]"
        >
          <Coffee size={24} className="text-[#FFDD00]" />
          <span className="font-semibold text-base">{t('contact.coffee')}</span>
        </motion.a>
      </motion.div>
    </section>
  );
}
