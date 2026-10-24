import { useLanguage } from '../context/LanguageContext';

export default function Footer() {
  const { lang, t } = useLanguage();

  return (
    <footer className="relative z-10 w-full px-4 md:px-8 py-10 border-t border-white/10 mt-12 bg-black/20 backdrop-blur-md">
      <div className="max-w-4xl mx-auto text-center space-y-3">
        <p className={`text-xs text-gray-500 max-w-xl mx-auto leading-relaxed ${lang === 'en' ? 'tracking-wide' : ''}`}>
          {t('footer.disclosure')}
        </p>

        <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-xs md:text-sm text-gray-400">
          <span className="font-medium text-gray-300">{t('footer.creator')}</span>
          <span className="hidden sm:inline text-gray-600">•</span>
          <span>{t('footer.tech')}</span>
          <span className="hidden sm:inline text-gray-600">•</span>
          <a
            href="https://github.com/MohammadGhorbani-dev/personal-portfolio"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-300 hover:text-white transition-colors underline underline-offset-4 decoration-white/20 hover:decoration-white/60"
          >
            {t('footer.source')}
          </a>
        </div>

        <p className={`text-xs text-gray-500 pt-1 ${lang === 'en' ? 'tracking-wider font-mono' : ''}`}>
          {t('footer.copy')}
        </p>
      </div>
    </footer>
  );
}

