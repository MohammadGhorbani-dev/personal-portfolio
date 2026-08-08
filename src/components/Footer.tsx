import { useLanguage } from '../context/LanguageContext';

export default function Footer() {
  const { lang, t } = useLanguage();

  return (
    <footer className="relative z-10 w-full px-4 md:px-8 py-10 border-t border-white/10 mt-12 bg-black/20 backdrop-blur-md">
      <div className="max-w-7xl mx-auto text-center">
        <p className={`text-gray-500 text-sm ${lang === 'en' ? 'tracking-wide' : ''}`}>
          {t('footer.copy')}
        </p>
      </div>
    </footer>
  );
}
