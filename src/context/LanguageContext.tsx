import { createContext, useState, useEffect, useContext, ReactNode } from 'react';

type Language = 'en' | 'fa';

interface LanguageContextType {
  lang: Language;
  toggleLang: () => void;
  t: (key: string) => string;
}

const dictionary = {
  en: {
    'name': 'Alex Morgan',
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
    'hero.title': "Hi, I'm Alex Morgan",
    'hero.subtitle': 'Creative Frontend Developer',
    'hero.desc': 'Crafting modern, responsive, and highly interactive digital experiences with React & TypeScript.',
    'hero.cta.explore': 'Explore My Work',
    'hero.cta.touch': 'Get in Touch',
    'hero.cta.cv': 'Download Sample CV',
    'hero.scroll': 'Scroll Down',
    'about.title': 'About Me',
    'about.desc': "I am a Creative Frontend Developer with about four years of experience crafting modern, accessible, and performant web applications. Specializing in React, TypeScript, and design systems, I focus on building intuitive user interfaces, fluid animations, and robust responsive layouts. I enjoy transforming complex problems into clean, maintainable code and engaging digital experiences.",
    'projects.title': 'Featured Projects',
    'projects.subtitle': 'Concept projects created to showcase interface design and frontend development.',
    'projects.disclosure': 'Concept projects created to showcase interface design and frontend development.',
    'projects.live': 'Live Demo (Demo Mode)',
    'projects.source': 'Source Code (Demo Mode)',
    'projects.demoCode': 'Concept Code',
    'projects.demoLive': 'UI Showcase',
    'projects.demoBadge': 'UI Concept',
    'projects.demoNotice': 'Demo only — fictional UI concept',
    'projects.demoCodeNotice': 'Concept repository — non-navigating demo',
    'projects.demoLiveNotice': 'Showcase preview — non-navigating demo',
    'projects.p1.title': 'Nexus Dashboard',
    'projects.p1.category': 'Analytics Dashboard',
    'projects.p1.desc': 'A modern analytics dashboard concept featuring intuitive data visualizations, responsive widgets and a polished interface.',
    'projects.p2.title': 'Pulse Chat',
    'projects.p2.category': 'Messaging Interface',
    'projects.p2.desc': 'A fictional messaging application interface concept with conversation management, responsive layouts and fluid interactions.',
    'projects.p3.title': 'Orbit Contacts',
    'projects.p3.category': 'Contact Management',
    'projects.p3.desc': 'A clean contact management interface concept featuring organized profiles, search and intuitive information presentation.',
    'projects.p4.title': 'Flow Tasks',
    'projects.p4.category': 'Productivity Application',
    'projects.p4.desc': 'A modern task management interface concept focusing on clear priorities, organized workflows and responsive interactions.',
    'skills.title': 'Technical Arsenal',
    'skills.subtitle': 'Tools and technologies I use to build modern digital experiences.',
    'contact.title': "Let's Connect",
    'contact.subtitle': 'Explore this interactive contact form and social showcase in demo mode.',
    'contact.name': 'Your Name',
    'contact.email': 'Your Email',
    'contact.message': 'Your Message',
    'contact.send': 'Send Demo Message',
    'contact.sending': 'Processing...',
    'contact.demoSuccess': 'Demo mode: Your message was not sent or stored.',
    'contact.demoEmail': 'demo@example.com (Demo Mode)',
    'contact.coffee': 'Buy me a coffee',
    'contact.coffeeTooltip': 'Demo showcase — donations are disabled',
    'contact.coffeeDemoTag': 'Demo Mode',
    'contact.err.name': 'Name is required',
    'contact.err.email': 'Email is required',
    'contact.err.message': 'Message cannot be empty',
    'contact.direct': 'Example contact address:',
    'contact.demoNotice': 'Demo only — no information is sent or saved.',
    'social.playing': 'Sample gaming activity',
    'social.telegram': 'Telegram',
    'social.demoProfile': 'Demo Profile',
    'social.spotifyStatus': 'Demo Profile',
    'github.sampleBadge': 'Sample Data',
    'github.repos': 'Total Repos',
    'github.active': 'Last Active',
    'github.recent': 'Recent',
    'github.push': 'Latest Push',
    'github.demoNotice': 'Sample developer statistics for demonstration.',
    'footer.disclosure': 'Alex Morgan is a fictional developer identity created for this portfolio demo.',
    'footer.creator': 'Created by Mohammad Ghorbani',
    'footer.tech': 'Developed with React & TypeScript.',
    'footer.source': 'View Source on GitHub',
    'footer.copy': '© 2026 Mohammad Ghorbani',
    'timeline.title': 'My Journey',
    'timeline.node1.title': 'Junior Frontend Developer',
    'timeline.node1.desc': 'Started professional journey building responsive web interfaces, mastering modern JavaScript, and creating component-based layouts.',
    'timeline.node2.title': 'UI & Design Systems Engineer',
    'timeline.node2.desc': 'Led development of reusable UI component libraries, focusing on design tokens, accessibility, and smooth micro-interactions.',
    'timeline.node3.title': 'Creative Frontend Developer',
    'timeline.node3.desc': 'Crafting high-performance web applications and rich interactive experiences using React, TypeScript, and modern animation libraries.',
  },
  fa: {
    'name': 'الکس مورگان',
    'nav.home': 'خانه',
    'nav.projects': 'پروژه‌ها',
    'nav.journey': 'مسیر من',
    'nav.skills': 'مهارت‌ها',
    'nav.contact': 'ارتباط با من',
    'hero.greeting.morning': 'صبح بخیر',
    'hero.greeting.afternoon': 'عصر بخیر',
    'hero.greeting.evening': 'عصر بخیر',
    'hero.greeting.night': 'شب بخیر',
    'hero.badge': 'سلام، دنیا!',
    'hero.title': 'سلام، من الکس مورگان هستم',
    'hero.subtitle': 'توسعه‌دهنده خلاق فرانت‌اند',
    'hero.desc': 'خلق تجربه‌های دیجیتال مدرن، تعاملی و واکنش‌گرا با React و TypeScript.',
    'hero.cta.explore': 'پروژه‌های من',
    'hero.cta.touch': 'ارتباط با من',
    'hero.cta.cv': 'دانلود رزومه نمونه',
    'hero.scroll': 'اسکرول کنید',
    'about.title': 'درباره من',
    'about.desc': 'من یک توسعه‌دهنده خلاق فرانت‌اند با حدود ۴ سال تجربه در خلق وب‌اپلیکیشن‌های مدرن، دسترس‌پذیر و با کارایی بالا هستم. با تخصص در React، TypeScript و سیستم‌های طراحی، تمرکز اصلی من بر توسعه رابط‌های کاربری شهودی، انیمیشن‌های روان و ساختارهای کاملاً واکنش‌گرا است. همواره از تبدیل مسائل پیچیده به کدهای تمیز، نگهداری‌پذیر و تجربه‌های دیجیتال جذاب لذت می‌برم.',
    'projects.title': 'پروژه‌های منتخب',
    'projects.subtitle': 'پروژه‌های مفهومی برای نمایش طراحی رابط کاربری و توسعه فرانت‌اند.',
    'projects.disclosure': 'پروژه‌های مفهومی برای نمایش طراحی رابط کاربری و توسعه فرانت‌اند.',
    'projects.live': 'مشاهده زنده (حالت نمایشی)',
    'projects.source': 'سورس کد (حالت نمایشی)',
    'projects.demoCode': 'کد مفهومی',
    'projects.demoLive': 'پیش‌نمایش نمایشی',
    'projects.demoBadge': 'طرح مفهومی',
    'projects.demoNotice': 'صرفاً نمایشی — طرح مفهومی رابط کاربری',
    'projects.demoCodeNotice': 'مخزن مفهومی — حالت نمایشی بدون ناوبری',
    'projects.demoLiveNotice': 'پیش‌نمایش نمایشی — حالت بدون ناوبری',
    'projects.p1.title': 'داشبورد نکسوس',
    'projects.p1.category': 'داشبورد تحلیلی',
    'projects.p1.desc': 'طرح مفهومی مدرن از داشبورد تحلیلی شامل بصری‌سازی شهودی داده‌ها، ویجت‌های واکنش‌گرا و رابط کاربری چشم‌نواز.',
    'projects.p2.title': 'پیام‌رسان پالس',
    'projects.p2.category': 'رابط پیام‌رسان',
    'projects.p2.desc': 'طرح مفهومی از رابط کاربری یک پیام‌رسان فرضی با مدیریت گفتگوها، چیدمان واکنش‌گرا و تعاملات روان.',
    'projects.p3.title': 'مدیریت مخاطبین اربیت',
    'projects.p3.category': 'مدیریت مخاطبین',
    'projects.p3.desc': 'طرح مفهومی از یک رابط کاربری تمیز برای مدیریت مخاطبین با پروفایل‌های منظم، جستجو و نمایش سازمان‌یافته اطلاعات.',
    'projects.p4.title': 'مدیریت وظایف فلو',
    'projects.p4.category': 'اپلیکیشن بهره‌وری',
    'projects.p4.desc': 'طرح مفهومی مدرن از رابط مدیریت وظایف با تمرکز بر اولویت‌بندی شفاف، گردش کارهای منظم و تعاملات واکنش‌گرا.',
    'skills.title': 'ابزارها و مهارت‌ها',
    'skills.subtitle': 'ابزارها و تکنولوژی‌هایی که برای ساخت تجربه‌های مدرن دیجیتال استفاده می‌کنم.',
    'contact.title': 'ارتباط با من',
    'contact.subtitle': 'فرم تماس تعاملی و کارت‌های اجتماعی را در حالت نمایشی بررسی کنید.',
    'contact.name': 'نام شما',
    'contact.email': 'ایمیل شما',
    'contact.message': 'پیام شما',
    'contact.send': 'ارسال پیام آزمایشی',
    'contact.sending': 'در حال پردازش...',
    'contact.demoSuccess': 'حالت نمایشی: پیام شما ارسال یا ذخیره نشد.',
    'contact.demoEmail': 'demo@example.com (حالت نمایشی)',
    'contact.coffee': 'مهمانم کن',
    'contact.coffeeTooltip': 'صرفاً نمایشی — امکان پرداخت غیرفعال است',
    'contact.coffeeDemoTag': 'حالت نمایشی',
    'contact.err.name': 'تکمیل این فیلد الزامی است.',
    'contact.err.email': 'تکمیل این فیلد الزامی است.',
    'contact.err.message': 'تکمیل این فیلد الزامی است.',
    'contact.direct': 'آدرس تماس نمونه:',
    'contact.demoNotice': 'صرفاً نمایشی — هیچ اطلاعاتی ارسال یا ذخیره نمی‌شود.',
    'social.playing': 'فعالیت بازی نمایشی',
    'social.telegram': 'تلگرام',
    'social.demoProfile': 'پروفایل نمایشی',
    'social.spotifyStatus': 'پروفایل نمایشی',
    'github.sampleBadge': 'داده‌های نمونه',
    'github.repos': 'کل ریپازیتوری‌ها',
    'github.active': 'آخرین فعالیت',
    'github.recent': 'به‌تازگی',
    'github.push': 'آخرین کامیت',
    'github.demoNotice': 'آمار نمونه جهت نمایش ساختار پورتفولیو.',
    'footer.disclosure': 'الکس مورگان یک شخصیت فرضی برای نمایش این نمونه پورتفولیو است.',
    'footer.creator': 'ساخته‌شده توسط محمد قربانی',
    'footer.tech': 'توسعه‌یافته با React و TypeScript.',
    'footer.source': 'مشاهده سورس کد در گیت‌هاب',
    'footer.copy': '© ۲۰۲۶ محمد قربانی',
    'timeline.title': 'مسیر حرفه\u200Cای',
    'timeline.node1.title': 'توسعه\u200Cدهنده جونیور فرانت\u200Cاند',
    'timeline.node1.desc': 'آغاز مسیر حرفه\u200Cای با تمرکز بر توسعه رابط\u200Cهای وب واکنش\u200Cگرا، تسلط بر جاوااسکریپت مدرن و پیاده\u200Cسازی چیدمان\u200Cهای کامپوننت\u200Cمحور.',
    'timeline.node2.title': 'مهندس رابط کاربری و دیزاین سیستم',
    'timeline.node2.desc': 'طراحی و پیاده\u200Cسازی کتابخانه\u200Cهای کامپوننت مقیاس\u200Cپذیر با تاکید بر دسترس\u200Cپذیری، توکن\u200Cهای طراحی و تعاملات یکپارچه.',
    'timeline.node3.title': 'توسعه\u200Cدهنده خلاق فرانت\u200Cاند',
    'timeline.node3.desc': 'توسعه وب\u200Cاپلیکیشن\u200Cهای تعاملی و پرفورمنس\u200Cمحور با بهره\u200Cگیری از React، TypeScript و کتابخانه\u200Cهای مدرن انیمیشن.',
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
