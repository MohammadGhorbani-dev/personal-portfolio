import { createContext, useState, useContext, ReactNode } from 'react';

type Language = 'en' | 'fa';

interface LanguageContextType {
  lang: Language;
  toggleLang: () => void;
  t: (key: string) => string;
}

const dictionary = {
  en: {
    'nav.home': 'Home',
    'nav.projects': 'Projects',
    'nav.skills': 'Skills',
    'nav.contact': 'Contact',
    'hero.badge': 'Hello, World!',
    'hero.title': "I'm Mohamad Ghorbani",
    'hero.subtitle': 'Computer Engineering Student & Web Developer',
    'hero.desc': 'Passionate about crafting clean, modern, and high-performance digital experiences. Always exploring new technologies to build the future of the web.',
    'hero.cta.explore': 'Explore My Work',
    'hero.cta.touch': 'Get in Touch',
    'hero.cta.cv': 'Download CV',
    'projects.title': 'Selected Work',
    'projects.subtitle': 'A showcase of my recent academic and freelance projects.',
    'projects.p1.title': 'University Student Portal',
    'projects.p1.desc': 'A comprehensive university management system with course selection, news, and room reservations.',
    'projects.p2.title': 'E-Commerce Dashboard',
    'projects.p2.desc': 'A modern merchant dashboard with real-time analytics, inventory management, and secure payments.',
    'projects.p3.title': 'AI Content Generator',
    'projects.p3.desc': 'An intelligent writing assistant that generates blog posts, social media copy, and SEO metadata.',
    'skills.title': 'Tech Arsenal',
    'skills.subtitle': 'Tools and technologies I use to build modern digital experiences.',
    'contact.title': "Let's Connect",
    'contact.subtitle': "Have a project in mind or just want to say hi? I'd love to hear from you.",
    'contact.name': 'Name',
    'contact.email': 'Email',
    'contact.message': 'Message',
    'contact.send': 'Send Message',
    'contact.coffee': 'Buy me a coffee',
    'social.playing': 'Playing CS2 & Battlefield 6',
    'footer.copy': '© 2026 Mohamad Ghorbani. Crafted with React & AI.',
  },
  fa: {
    'nav.home': 'خانه',
    'nav.projects': 'پروژه‌ها',
    'nav.skills': 'مهارت‌ها',
    'nav.contact': 'تماس',
    'hero.badge': 'سلام، دنیا!',
    'hero.title': 'من محمد قربانی هستم',
    'hero.subtitle': 'دانشجوی مهندسی کامپیوتر و توسعه‌دهنده وب',
    'hero.desc': 'علاقه‌مند به خلق تجربه‌های دیجیتال تمیز، مدرن و با عملکرد بالا. همیشه در حال کشف تکنولوژی‌های جدید برای ساختن آینده وب.',
    'hero.cta.explore': 'مشاهده نمونه‌کارها',
    'hero.cta.touch': 'تماس با من',
    'hero.cta.cv': 'دانلود رزومه',
    'projects.title': 'پروژه‌های منتخب',
    'projects.subtitle': 'نمایشی از پروژه‌های اخیر دانشگاهی و فریلنسری من.',
    'projects.p1.title': 'پورتال دانشجویی دانشگاه',
    'projects.p1.desc': 'یک سیستم جامع مدیریت دانشگاه با امکان انتخاب واحد، اخبار و رزرو اتاق.',
    'projects.p2.title': 'داشبورد فروشگاهی',
    'projects.p2.desc': 'داشبورد مدرن فروشندگان با تحلیل بلادرنگ، مدیریت موجودی و پرداخت‌های امن.',
    'projects.p3.title': 'تولیدکننده محتوای هوش مصنوعی',
    'projects.p3.desc': 'دستیار نویسندگی هوشمند که پست‌های وبلاگ، متن شبکه‌های اجتماعی و متادیتا سئو تولید می‌کند.',
    'skills.title': 'تجهیزات فنی',
    'skills.subtitle': 'ابزارها و تکنولوژی‌هایی که برای ساخت تجربه‌های مدرن دیجیتال استفاده می‌کنم.',
    'contact.title': 'ارتباط با من',
    'contact.subtitle': 'پروژه‌ای در ذهن دارید یا فقط می‌خواهید سلامی کنید؟ خوشحال می‌شوم پیام شما را دریافت کنم.',
    'contact.name': 'نام',
    'contact.email': 'ایمیل',
    'contact.message': 'پیام',
    'contact.send': 'ارسال پیام',
    'contact.coffee': 'مهمانم کن',
    'social.playing': 'در حال بازی CS2 و Battlefield 6',
    'footer.copy': '© ۲۰۲۶ محمد قربانی. ساخته شده با React و هوش مصنوعی.',
  }
};

export const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [lang, setLang] = useState<Language>('en');

  const toggleLang = () => {
    setLang(prev => prev === 'en' ? 'fa' : 'en');
  };

  const t = (key: string) => {
    return dictionary[lang][key as keyof typeof dictionary['en']] || key;
  };

  return (
    <LanguageContext.Provider value={{ lang, toggleLang, t }}>
      <div dir={lang === 'en' ? 'ltr' : 'rtl'} className="w-full h-full text-left rtl:text-right">
        {children}
      </div>
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) throw new Error('useLanguage must be used within LanguageProvider');
  return context;
};
