import { createContext, useState, useEffect, useContext, ReactNode } from 'react';

type Language = 'en' | 'fa';

interface LanguageContextType {
  lang: Language;
  toggleLang: () => void;
  t: (key: string) => string;
}

const dictionary = {
  en: {
    'name': 'Mohamad Ghorbani',
    'nav.home': 'Home',
    'nav.projects': 'Projects',
    'nav.journey': 'My Journey',
    'nav.skills': 'Skills',
    'nav.contact': 'Contact',
    'hero.greeting.morning': 'Good Morning',
    'hero.greeting.afternoon': 'Good Afternoon',
    'hero.greeting.evening': 'Good Evening',
    'hero.greeting.night': 'Good Night',
    'hero.badge': 'Hello, World!',
    'hero.title': "Hi, I'm Mohammad Ghorbani",
    'hero.subtitle': 'Front-End Developer',
    'hero.desc': 'Crafting modern, responsive, and highly interactive digital experiences.',
    'hero.cta.explore': 'Explore My Work',
    'hero.cta.touch': 'Get in Touch',
    'hero.cta.cv': 'Download CV',
    'hero.scroll': 'Scroll Down',
    'about.title': 'About Me',
    'about.desc': "I am a Computer Engineering student who loves everything about computers—from writing code and exploring hardware to building digital tools that simplify everyday tasks. I enjoy experiencing new things and have a diverse background, having worked in fields ranging from customer support to dentistry. In my free time, you'll usually find me gaming, listening to music, or experimenting with new tech. I'm always eager to connect with others, share skills, and collaborate on exciting ideas!",
    'projects.title': 'Featured Projects',
    'projects.subtitle': 'A showcase of my recent academic and freelance projects.',
    'projects.live': 'Live Demo',
    'projects.source': 'Source Code',
    'projects.p1.title': 'University Student Portal',
    'projects.p1.desc': 'A comprehensive graduation project for university management, featuring course selection, news, and room reservations.',
    'projects.p2.title': 'Farawin Messenger',
    'projects.p2.desc': 'A messaging application utilizing RESTful APIs for real-time communication, contact management, and message editing.',
    'projects.p3.title': 'Contacts Manager',
    'projects.p3.desc': 'A robust application to seamlessly store and manage contacts with backend integration and routing.',
    'projects.p4.title': 'TodoList App',
    'projects.p4.desc': 'A state-driven task management tool utilizing Context API for seamless daily task organization.',
    'skills.title': 'Technical Arsenal',
    'skills.subtitle': 'Tools and technologies I use to build modern digital experiences.',
    'contact.title': "Let's Connect",
    'contact.subtitle': "Have a project in mind or just want to say hi? I'd love to hear from you.",
    'contact.name': 'Your Name',
    'contact.email': 'Your Email',
    'contact.message': 'Your Message',
    'contact.send': 'Send Message',
    'contact.coffee': 'Buy me a coffee',
    'contact.coffeeTooltip': 'Support my work & keep me caffeinated!',
    'contact.err.name': 'Name is required',
    'contact.err.email': 'Email is required',
    'contact.err.message': 'Message cannot be empty',
    'contact.direct': 'Or email me directly:',
    'social.playing': 'Playing CS2 & Battlefield 6',
    'social.telegram': 'Telegram',
    'footer.copy': '© 2026 Mohamad Ghorbani. Crafted with React & AI.',
    'timeline.title': 'My Journey',
    'timeline.node1.title': 'Computer Engineering Student',
    'timeline.node1.desc': 'Currently pursuing my degree, focusing on software architecture and digital tools.',
    'timeline.node2.title': 'University Student Portal',
    'timeline.node2.desc': 'Developing a comprehensive graduation project for university management (2026).',
    'timeline.node3.title': 'Diverse Professional Experience',
    'timeline.node3.desc': 'Built a strong foundation in problem-solving and communication through roles ranging from customer support to dentistry.',
  },
  fa: {
    'name': 'محمد قربانی',
    'nav.home': 'خانه',
    'nav.projects': 'پروژه\u200Cها',
    'nav.journey': 'مسیر من',
    'nav.skills': 'مهارت\u200Cها',
    'nav.contact': 'ارتباط با من',
    'hero.greeting.morning': 'صبح بخیر',
    'hero.greeting.afternoon': 'عصر بخیر',
    'hero.greeting.evening': 'عصر بخیر',
    'hero.greeting.night': 'شب بخیر',
    'hero.badge': 'سلام، دنیا!',
    'hero.title': 'سلام، من محمد قربانی هستم',
    'hero.subtitle': 'توسعه\u200Cدهنده فرانت\u200Cاند',
    'hero.desc': 'خلق تجربه\u200Cهای دیجیتالِ مدرن، تعاملی و بهینه.',
    'hero.cta.explore': 'پروژه\u200Cهای من',
    'hero.cta.touch': 'ارتباط با من',
    'hero.cta.cv': 'دانلود رزومه',
    'hero.scroll': 'اسکرول کنید',
    'about.title': 'درباره من',
    'about.desc': 'من دانشجوی مهندسی کامپیوتر هستم که عاشق دنیای کامپیوترهاست؛ از کدنویسی و بررسی سخت\u200Cافزارها گرفته تا ساخت ابزارهای دیجیتالی که کارهای روزمره را ساده\u200Cتر می\u200Cکنند. من از تجربه کارهای جدید لذت می\u200Cبرم و پیشینه متنوعی دارم؛ از پشتیبانی مشتریان تا کار در دندان\u200Cسازی. در زمان\u200Cهای آزاد، معمولاً مرا در حال بازی کردن، گوش دادن به موسیقی یا آزمایش تکنولوژی\u200Cهای جدید پیدا می\u200Cکنید. من همیشه مشتاق ارتباط با دیگران، اشتراک مهارت\u200Cها و همکاری در ایده\u200Cهای هیجان\u200Cانگیز هستم!',
    'projects.title': 'پروژه\u200Cهای منتخب',
    'projects.subtitle': 'نمایشی از پروژه\u200Cهای اخیر دانشگاهی و فریلنسری من.',
    'projects.live': 'مشاهده زنده',
    'projects.source': 'سورس کد',
    'projects.p1.title': 'پورتال دانشجویی دانشگاه',
    'projects.p1.desc': 'یک پروژه جامع مدیریت دانشگاه با امکان انتخاب واحد، اخبار و رزرو اتاق.',
    'projects.p2.title': 'پیام‌رسان فراوین',
    'projects.p2.desc': 'یک اپلیکیشن پیام‌رسان با استفاده از RESTful APIs برای ارتباط در لحظه، مدیریت مخاطبین و ویرایش پیام.',
    'projects.p3.title': 'مدیریت مخاطبین',
    'projects.p3.desc': 'یک اپلیکیشن قدرتمند برای ذخیره و مدیریت بی‌نقص مخاطبین با یکپارچگی بک‌اند و مسیریابی.',
    'projects.p4.title': 'اپلیکیشن تودولیست',
    'projects.p4.desc': 'یک ابزار مدیریت وظایف مبتنی بر State با استفاده از Context API برای سازماندهی یکپارچه وظایف روزانه.',
    'skills.title': 'ابزارها و مهارت\u200Cها',
    'skills.subtitle': 'ابزارها و تکنولوژی‌هایی که برای ساخت تجربه‌های مدرن دیجیتال استفاده می‌کنم.',
    'contact.title': 'ارتباط با من',
    'contact.subtitle': 'پروژه‌ای در ذهن دارید یا فقط می‌خواهید سلامی کنید؟ خوشحال می‌شوم پیام شما را دریافت کنم.',
    'contact.name': 'نام شما',
    'contact.email': 'ایمیل شما',
    'contact.message': 'پیام شما',
    'contact.send': 'ارسال پیام',
    'contact.coffee': 'مهمانم کن',
    'contact.coffeeTooltip': 'با یک قهوه از من حمایت کن!',
    'contact.err.name': 'تکمیل این فیلد الزامی است.',
    'contact.err.email': 'تکمیل این فیلد الزامی است.',
    'contact.err.message': 'تکمیل این فیلد الزامی است.',
    'contact.direct': 'یا مستقیماً به من ایمیل بزنید:',
    'social.playing': 'در حال بازی CS2 و Battlefield 6',
    'social.telegram': 'تلگرام',
    'footer.copy': '© ۲۰۲۶ محمد قربانی. ساخته شده با React و هوش مصنوعی.',
    'timeline.title': 'مسیر تحصیلی و حرفه\u200Cای',
    'timeline.node1.title': 'دانشجوی مهندسی کامپیوتر',
    'timeline.node1.desc': 'در حال تحصیل و تمرکز بر معماری نرم‌افزار و توسعه ابزارهای دیجیتال.',
    'timeline.node2.title': 'پورتال جامع دانشجویی',
    'timeline.node2.desc': 'توسعه پروژه جامع فارغ‌التحصیلی برای مدیریت فرآیندهای دانشگاه (2026).',
    'timeline.node3.title': 'تجربیات حرفه‌ای متنوع',
    'timeline.node3.desc': 'کسب مهارت‌های حل مسئله و ارتباطی در زمینه‌های مختلف از پشتیبانی مشتریان تا دندانسازی.',
  }
};

export const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [lang, setLang] = useState<Language>('en');

  useEffect(() => {
    document.documentElement.dir = lang === 'en' ? 'ltr' : 'rtl';
    document.documentElement.lang = lang;
  }, [lang]);

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
