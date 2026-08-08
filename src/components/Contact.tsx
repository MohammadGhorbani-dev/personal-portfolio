import { motion } from 'motion/react';

export default function Contact() {
  return (
    <section id="contact" className="relative z-10 w-full max-w-2xl mx-auto px-6 py-24">
      <div className="text-center mb-12">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-3xl md:text-4xl font-bold tracking-tight text-white/90 mb-4"
        >
          Let's Connect
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.1 }}
          className="text-gray-400 text-lg"
        >
          Have a project in mind or just want to say hi? I'd love to hear from you.
        </motion.p>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="rounded-3xl p-8 sm:p-10 bg-white/5 backdrop-blur-xl border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.1)]"
      >
        <form className="flex flex-col gap-8" onSubmit={(e) => e.preventDefault()}>
          <div className="flex flex-col sm:flex-row gap-8">
            <div className="flex-1">
              <input
                type="text"
                placeholder="Name"
                className="w-full bg-transparent border-b border-white/20 px-2 py-3 text-white placeholder-white/40 focus:outline-none focus:border-white/60 transition-colors rounded-none"
              />
            </div>
            <div className="flex-1">
              <input
                type="email"
                placeholder="Email"
                className="w-full bg-transparent border-b border-white/20 px-2 py-3 text-white placeholder-white/40 focus:outline-none focus:border-white/60 transition-colors rounded-none"
              />
            </div>
          </div>
          <div>
            <textarea
              placeholder="Message"
              rows={4}
              className="w-full bg-transparent border-b border-white/20 px-2 py-3 text-white placeholder-white/40 focus:outline-none focus:border-white/60 transition-colors rounded-none resize-none"
            ></textarea>
          </div>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full mt-4 px-8 py-4 rounded-full bg-white text-black font-medium transition-colors hover:bg-white/90 shadow-[0_0_20px_rgba(255,255,255,0.15)]"
          >
            Send Message
          </motion.button>
        </form>
      </motion.div>
    </section>
  );
}
