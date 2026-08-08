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
    'nav.journey': 'Journey',
    'nav.skills': 'Skills',
    'nav.contact': 'Contact',
    'hero.greeting.morning': 'Good Morning',
    'hero.greeting.afternoon': 'Good Afternoon',
    'hero.greeting.evening': 'Good Evening',
    'hero.greeting.night': 'Good Night',
    'hero.badge': 'Hello, World!',
    'hero.title': "Mohamad Ghorbani",
    'hero.subtitle': 'Computer Engineering Student',
    'hero.desc': "I am a Computer Engineering student who loves everything about computers—from writing code and exploring hardware to building digital tools that simplify everyday tasks. I enjoy experiencing new things and have a diverse background, having worked in fields ranging from customer support to dentistry. In my free time, you'll usually find me gaming, listening to music, or experimenting with new tech. I'm always eager to connect with others, share skills, and collaborate on exciting ideas!",
    'hero.cta.explore': 'Explore My Work',
    'hero.cta.touch': 'Get in Touch',
    'hero.cta.cv': 'Download CV',
    'projects.title': 'Selected Work',
    'projects.subtitle': 'A showcase of my recent academic and freelance projects.',
    'projects.p1.title': 'University Student Portal',
    'projects.p1.desc': 'A comprehensive graduation project for university management, featuring course selection, news, and room reservations.',
    'projects.p2.title': 'Farawin Messenger',
    'projects.p2.desc': 'A messaging application utilizing RESTful APIs for real-time communication, contact management, and message editing.',
    'projects.p3.title': 'Contacts Manager',
    'projects.p3.desc': 'A robust application to seamlessly store and manage contacts with backend integration and routing.',
    'projects.p4.title': 'TodoList App',
    'projects.p4.desc': 'A state-driven task management tool utilizing Context API for seamless daily task organization.',
    'skills.title': 'Tech Arsenal',
    'skills.subtitle': 'Tools and technologies I use to build modern digital experiences.',
    'contact.title': "Let's Connect",
    'contact.subtitle': "Have a project in mind or just want to say hi? I'd love to hear from you.",
    'contact.name': 'Name',
    'contact.email': 'Email',
    'contact.message': 'Message',
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
    'timeline.node1.title': 'B.Sc. in Computer Engineering',
    'timeline.node1.desc': 'Currently pursuing my degree, focusing on software architecture and digital tools.',
    'timeline.node2.title': 'University Student Portal',
    'timeline.node2.desc': 'Developing a comprehensive graduation project for university management (2026).',
    'timeline.node3.title': 'Diverse Professional Experience',
    'timeline.node3.desc': 'Built a strong foundation in problem-solving and communication through roles ranging from customer support to dentistry.',
  },
  fa: {
    'name': 'محمد قربانی',
    'nav.home': 'خانه',
    'nav.projects': 'پروژه ها',
    'nav.journey': 'مسیر من',
    'nav.skills': 'مهارت ها',
    'nav.contact': 'تماس',
    'hero.greeting.morning': 'صبح بخیر',
    'hero.greeting.afternoon': 'عصر بخیر',
    'hero.greeting.evening': 'عصر بخیر',
    'hero.greeting.night': 'شب بخیر',
    'hero.badge': 'سلام، دنیا!',
    'hero.title': 'محمد قربانی',
    'hero.subtitle': 'دانشجوی مهندسی کامپیوتر',
    'hero.desc': 'من دانشجوی مهندسی کامپیوتر هستم که عاشق دنیای کامپیوتره؛ از کدنویسی و سخت افزار گرفته تا ساخت ابزارهایی که کارهای روزمره رو برای اطرافیانم ساده تر میکنه. همیشه دنبال تجربه های جدیدم و در زمینه های مختلفی از پشتیبانی گرفته تا دندانسازی فعالیت داشتم که باعث شده دید بازتری به حل مسائل داشته باشم. در اوقات فراغتم بیشتر گیم میزنم، موزیک گوش میدم یا با تکنولوژی های جدید کار میکنم. همیشه از هم صحبتی و همکاری با افراد جدید تو زمینه های مختلف خوشحال میشم!',
    'hero.cta.explore': 'پروژه های من',
    'hero.cta.touch': 'ارتباط با من',
    'hero.cta.cv': 'دانلود رزومه',
    'projects.title': 'پروژه های منتخب',
    'projects.subtitle': 'نمایشی از پروژه های اخیر دانشگاهی و فریلنسری من.',
    'projects.p1.title': 'پورتال دانشجویی دانشگاه',
    'projects.p1.desc': 'یک پروژه جامع مدیریت دانشگاه با امکان انتخاب واحد، اخبار و رزرو اتاق.',
    'projects.p2.title': 'پیام‌رسان فراوین',
    'projects.p2.desc': 'یک اپلیکیشن پیام‌رسان با استفاده از RESTful APIs برای ارتباط در لحظه، مدیریت مخاطبین و ویرایش پیام.',
    'projects.p3.title': 'مدیریت مخاطبین',
    'projects.p3.desc': 'یک اپلیکیشن قدرتمند برای ذخیره و مدیریت بی‌نقص مخاطبین با یکپارچگی بک‌اند و مسیریابی.',
    'projects.p4.title': 'اپلیکیشن تودولیست',
    'projects.p4.desc': 'یک ابزار مدیریت وظایف مبتنی بر State با استفاده از Context API برای سازماندهی یکپارچه وظایف روزانه.',
    'skills.title': 'تجهیزات فنی',
    'skills.subtitle': 'ابزارها و تکنولوژی‌هایی که برای ساخت تجربه‌های مدرن دیجیتال استفاده می‌کنم.',
    'contact.title': 'ارتباط با من',
    'contact.subtitle': 'پروژه‌ای در ذهن دارید یا فقط می‌خواهید سلامی کنید؟ خوشحال می‌شوم پیام شما را دریافت کنم.',
    'contact.name': 'نام',
    'contact.email': 'ایمیل',
    'contact.message': 'پیام',
    'contact.send': 'ارسال پیام',
    'contact.coffee': 'کافی مهمونم میکنی',
    'contact.coffeeTooltip': 'با یک قهوه از من حمایت کن!',
    'contact.err.name': 'تکمیل این فیلد الزامی است.',
    'contact.err.email': 'تکمیل این فیلد الزامی است.',
    'contact.err.message': 'تکمیل این فیلد الزامی است.',
    'contact.direct': 'یا مستقیماً به من ایمیل بزنید:',
    'social.playing': 'Play with me',
    'social.telegram': 'Telegram',
    'footer.copy': '© ۲۰۲۶ محمد قربانی. ساخته شده با React و هوش مصنوعی.',
    'timeline.title': 'مسیر من',
    'timeline.node1.title': 'کارشناسی مهندسی کامپیوتر',
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
