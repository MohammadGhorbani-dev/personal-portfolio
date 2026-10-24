import { motion } from 'motion/react';
import { Coffee, Linkedin, Github, Music, Gamepad2, CheckCircle2, Send } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import React, { useState, useRef, useEffect } from 'react';
import GitHubStats from './GitHubStats';
import MagneticWrapper from './MagneticWrapper';
import TiltCard from './TiltCard';

export default function Contact() {
  const { lang, t } = useLanguage();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errors, setErrors] = useState({ name: '', email: '', message: '' });

  const submitTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const successTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (submitTimerRef.current) {
        clearTimeout(submitTimerRef.current);
        submitTimerRef.current = null;
      }
      if (successTimerRef.current) {
        clearTimeout(successTimerRef.current);
        successTimerRef.current = null;
      }
    };
  }, []);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isSubmitting) return;

    const form = e.currentTarget;
    const formData = new FormData(form);
    const name = (formData.get('name') as string) || '';
    const email = (formData.get('email') as string) || '';
    const message = (formData.get('message') as string) || '';

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

    // Clear any active notification timer so an older timer cannot prematurely dismiss a newer notification
    if (successTimerRef.current) {
      clearTimeout(successTimerRef.current);
      successTimerRef.current = null;
    }
    if (submitTimerRef.current) {
      clearTimeout(submitTimerRef.current);
      submitTimerRef.current = null;
    }

    setIsSubmitting(true);
    setIsSuccess(false);

    submitTimerRef.current = setTimeout(() => {
      form.reset();
      setIsSubmitting(false);
      setIsSuccess(true);
      submitTimerRef.current = null;

      successTimerRef.current = setTimeout(() => {
        setIsSuccess(false);
        successTimerRef.current = null;
      }, 5000);
    }, 550);
  };

  return (
    <section id="contact" className="relative z-10 w-full max-w-5xl mx-auto px-4 md:px-8 py-24">
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

      <div className="flex flex-col xl:flex-row gap-8 max-w-5xl mx-auto">
        {/* Contact Form */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="flex-[3] p-8 sm:p-10 bg-white/5 backdrop-blur-md shadow-[0_8px_30px_rgba(0,0,0,0.5),_inset_0_1px_1px_rgba(255,255,255,0.15)] border border-white/10 border-t-white/20 border-l-white/20 rounded-2xl flex flex-col"
        >
          <form 
            onSubmit={handleSubmit}
            className="flex flex-col gap-6 flex-grow"
          >
            <div className="flex flex-col sm:flex-row gap-6">
              <div className="flex-1">
                <input
                  type="text"
                  name="name"
                  placeholder={t('contact.name')}
                  onChange={() => setErrors(prev => ({ ...prev, name: '' }))}
                  disabled={isSubmitting}
                  className="w-full bg-black/20 border border-white/5 shadow-[inset_0_2px_4px_rgba(0,0,0,0.5)] focus:shadow-[inset_0_2px_4px_rgba(0,0,0,0.5),_0_0_10px_rgba(59,130,246,0.3)] px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:border-white/20 transition-all rounded-xl disabled:opacity-50"
                />
                {errors.name && <span className="text-red-400 text-xs mt-1 block px-2">{errors.name}</span>}
              </div>
              <div className="flex-1">
                <input
                  type="email"
                  name="email"
                  placeholder={t('contact.email')}
                  onChange={() => setErrors(prev => ({ ...prev, email: '' }))}
                  disabled={isSubmitting}
                  className="w-full bg-black/20 border border-white/5 shadow-[inset_0_2px_4px_rgba(0,0,0,0.5)] focus:shadow-[inset_0_2px_4px_rgba(0,0,0,0.5),_0_0_10px_rgba(59,130,246,0.3)] px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:border-white/20 transition-all rounded-xl disabled:opacity-50"
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
                disabled={isSubmitting}
                className="w-full bg-black/20 border border-white/5 shadow-[inset_0_2px_4px_rgba(0,0,0,0.5)] focus:shadow-[inset_0_2px_4px_rgba(0,0,0,0.5),_0_0_10px_rgba(59,130,246,0.3)] px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:border-white/20 transition-all rounded-xl resize-none disabled:opacity-50"
              ></textarea>
              {errors.message && <span className="text-red-400 text-xs mt-1 block px-2">{errors.message}</span>}
            </div>
            
            <div className="mt-4 flex flex-col items-center">
              <motion.button
                type="submit"
                disabled={isSubmitting}
                whileHover={!isSubmitting ? { scale: 1.02 } : {}}
                whileTap={!isSubmitting ? { scale: 0.98 } : {}}
                className="w-full px-8 py-4 rounded-full text-white font-medium transition-all bg-white/10 border border-white/20 border-t-white/30 shadow-[0_4px_15px_rgba(0,0,0,0.3),_inset_0_1px_1px_rgba(255,255,255,0.2)] hover:bg-white/20 hover:-translate-y-0.5 hover:shadow-[0_6px_20px_rgba(0,0,0,0.4),_inset_0_1px_1px_rgba(255,255,255,0.3)] active:translate-y-0.5 active:shadow-[inset_0_2px_4px_rgba(0,0,0,0.4)] active:border-t-white/10 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <span className="opacity-70">{t('contact.sending')}</span>
                ) : (
                  t('contact.send')
                )}
              </motion.button>
              
              <p className="text-white/40 text-xs text-center mt-2.5">
                {t('contact.demoNotice')}
              </p>

              {isSuccess && (
                <motion.div 
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-3 text-center flex items-center justify-center gap-2 text-emerald-400 text-sm font-medium"
                >
                  <CheckCircle2 size={16} />
                  <span>{t('contact.demoSuccess')}</span>
                </motion.div>
              )}
            </div>
            
            <div className="mt-4 text-center">
              <p className="text-white/50 text-sm">
                {t('contact.direct')}{' '}
                <span dir="ltr" className="text-white/80 font-mono text-xs select-all inline-block px-2 py-0.5 rounded bg-white/5 border border-white/10">
                  {t('contact.demoEmail')}
                </span>
              </p>
            </div>
          </form>
        </motion.div>

        {/* GitHub Stats */}
        <TiltCard className="flex-[2] h-full">
          <GitHubStats />
        </TiltCard>
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
        <MagneticWrapper>
          <TiltCard className="h-full">
            <div className="h-32 w-full flex items-center gap-4 p-5 bg-white/5 backdrop-blur-md shadow-[0_8px_30px_rgba(0,0,0,0.5),_inset_0_1px_1px_rgba(255,255,255,0.15)] border border-white/10 border-t-white/20 border-l-white/20 rounded-3xl hover:bg-white/10 transition-all group cursor-default select-none">
              <div className="p-3 bg-blue-500/10 rounded-2xl group-hover:bg-blue-500/20 transition-colors">
                <Linkedin className="text-blue-400" size={24} />
              </div>
              <div className="flex flex-col ml-1 rtl:ml-0 rtl:mr-1">
                <span className="font-medium text-white/90">LinkedIn</span>
                <span className="text-xs text-white/50">{t('social.demoProfile')}</span>
              </div>
            </div>
          </TiltCard>
        </MagneticWrapper>

        {/* GitHub */}
        <MagneticWrapper>
          <TiltCard className="h-full">
            <div className="h-32 w-full relative overflow-hidden flex items-center gap-4 p-5 bg-white/5 backdrop-blur-md shadow-[0_8px_30px_rgba(0,0,0,0.5),_inset_0_1px_1px_rgba(255,255,255,0.15)] border border-white/10 border-t-white/20 border-l-white/20 rounded-3xl hover:bg-white/10 transition-all group cursor-default select-none">
              <div style={{ backgroundImage: "url('/assets/gifs/github.gif')" }} className="absolute inset-0 bg-cover bg-center z-0"></div>
              <div className="absolute inset-0 bg-black/60 group-hover:bg-black/30 transition-colors duration-300 z-0"></div>
              <div className="p-3 bg-white/5 rounded-2xl group-hover:bg-white/10 transition-colors relative z-10 w-fit">
                <Github className="text-white" size={24} />
              </div>
              <div className="flex flex-col relative z-10 [text-shadow:0_2px_4px_rgba(0,0,0,0.8)] ml-4 rtl:ml-0 rtl:mr-4">
                <span className="font-medium text-white/90">GitHub</span>
                <span className="text-xs text-white/50">{t('social.demoProfile')}</span>
              </div>
            </div>
          </TiltCard>
        </MagneticWrapper>

        {/* Telegram */}
        <MagneticWrapper>
          <TiltCard className="h-full">
            <div className="h-32 w-full relative overflow-hidden flex items-center gap-4 p-5 bg-white/5 backdrop-blur-md shadow-[0_8px_30px_rgba(0,0,0,0.5),_inset_0_1px_1px_rgba(255,255,255,0.15)] border border-white/10 border-t-white/20 border-l-white/20 rounded-3xl hover:bg-white/10 transition-all group cursor-default select-none">
              <div style={{ backgroundImage: "url('/assets/gifs/telegram.gif')" }} className="absolute inset-0 bg-cover bg-center z-0"></div>
              <div className="absolute inset-0 bg-black/60 group-hover:bg-black/30 transition-colors duration-300 z-0"></div>
              <div className="p-3 bg-blue-400/10 rounded-2xl group-hover:bg-blue-400/20 transition-colors relative z-10 w-fit">
                <Send className="text-blue-400" size={24} />
              </div>
              <div className="flex flex-col relative z-10 [text-shadow:0_2px_4px_rgba(0,0,0,0.8)] ml-4 rtl:ml-0 rtl:mr-4">
                <span className="font-medium text-white/90">{t('social.telegram')}</span>
                <span className="text-xs text-white/50">{t('social.demoProfile')}</span>
              </div>
            </div>
          </TiltCard>
        </MagneticWrapper>

        {/* Spotify */}
        <MagneticWrapper>
          <TiltCard className="h-full">
            <div className="h-32 w-full relative overflow-hidden flex items-center gap-4 p-5 bg-white/5 backdrop-blur-md shadow-[0_8px_30px_rgba(0,0,0,0.5),_inset_0_1px_1px_rgba(255,255,255,0.15)] border border-white/10 border-t-white/20 border-l-white/20 rounded-3xl hover:bg-white/10 transition-all group cursor-default select-none">
              <div style={{ backgroundImage: "url('/assets/gifs/spotify.gif')" }} className="absolute inset-0 bg-cover bg-center z-0"></div>
              <div className="absolute inset-0 bg-black/60 group-hover:bg-black/30 transition-colors duration-300 z-0"></div>
              <div className="p-3 bg-[#1DB954]/10 rounded-2xl group-hover:bg-[#1DB954]/20 transition-colors relative z-10 w-fit">
                <Music className="text-[#1DB954]" size={24} />
              </div>
              <div className="flex flex-col relative z-10 [text-shadow:0_2px_4px_rgba(0,0,0,0.8)] ml-4 rtl:ml-0 rtl:mr-4">
                <span className="font-medium text-white/90">Spotify</span>
                <span className="text-xs text-white/40">{t('social.spotifyStatus')}</span>
              </div>
            </div>
          </TiltCard>
        </MagneticWrapper>

        {/* Steam Badge */}
        <MagneticWrapper className="col-span-2 md:col-span-4">
          <TiltCard className="h-full">
            <div className="h-36 w-full relative overflow-hidden flex items-center justify-center gap-4 p-5 bg-white/5 backdrop-blur-md shadow-[0_8px_30px_rgba(0,0,0,0.5),_inset_0_1px_1px_rgba(255,255,255,0.15)] border border-white/10 border-t-white/20 border-l-white/20 rounded-3xl hover:bg-white/10 transition-all group cursor-default select-none">
              <div style={{ backgroundImage: "url('/assets/gifs/steam.gif')", backgroundPosition: "50% 98%" }} className="absolute inset-0 bg-cover z-0"></div>
              <div className="absolute inset-0 bg-black/60 group-hover:bg-black/30 transition-colors duration-300 z-0"></div>
              <div className="flex items-center gap-4 relative z-10">
                <div className="p-3 bg-blue-500/10 rounded-2xl group-hover:bg-blue-500/20 transition-colors">
                  <Gamepad2 className="text-blue-400" size={24} />
                </div>
                <div className="flex flex-col [text-shadow:0_2px_4px_rgba(0,0,0,0.8)]">
                  <span className="font-medium text-white/90">Steam</span>
                  <span className="text-[10px] sm:text-xs text-white/50 whitespace-nowrap">{t('social.playing')}</span>
                </div>
              </div>
            </div>
          </TiltCard>
        </MagneticWrapper>
      </motion.div>

      {/* Coffee Donation Button at the bottom */}
      <motion.div 
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.7, ease: "easeOut", delay: 0.3 }}
        className="mt-16 flex justify-center"
      >
        <MagneticWrapper>
          <motion.div
            title={t('contact.coffeeTooltip')}
            whileHover={{ scale: 1.03 }}
            className="flex items-center gap-3 px-8 py-4 rounded-full bg-white/5 backdrop-blur-xl border border-[#FFDD00]/30 text-white/90 hover:bg-[#FFDD00]/10 hover:border-[#FFDD00]/60 transition-all shadow-[0_0_20px_rgba(255,221,0,0.15)] hover:shadow-[0_0_35px_rgba(255,221,0,0.3)] cursor-default select-none"
          >
            <Coffee size={24} className="text-[#FFDD00]" />
            <span className="font-semibold text-base">{t('contact.coffee')}</span>
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-[#FFDD00]/10 text-[#FFDD00] border border-[#FFDD00]/20 font-medium">
              {t('contact.coffeeDemoTag')}
            </span>
          </motion.div>
        </MagneticWrapper>
      </motion.div>
    </section>
  );
}
