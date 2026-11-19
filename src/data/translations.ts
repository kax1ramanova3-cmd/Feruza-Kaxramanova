import type { Lang } from '../types/codeverse';

export interface UIStrings {
  nav: {
    courses: string;
    masalalar: string;
    playground: string;
    tutor: string;
    materials: string;
    dashboard: string;
    signIn: string;
    profile: string;
  };
  hero: {
    kicker: string;
    headline: string;
    subheadline: string;
    primaryCta: string;
    secondaryCta: string;
    langLabel: string;
  };
  metrics: {
    tracksLabel: string;
    tracksUnit: string;
    lessonsLabel: string;
    lessonsUnit: string;
    bilingualLabel: string;
    bilingualUnit: string;
    tierLabel: string;
    tierUnit: string;
  };
  tracks: {
    heading: string;
    subheading: string;
    viewAll: string;
    startCourse: string;
    continueCourse: string;
    lessonsUnit: string;
    hoursUnit: string;
  };
  cloud: {
    heading: string;
    subheading: string;
    freeTierTitle: string;
    usageTitle: string;
    estimatorTitle: string;
    studentsLabel: string;
    monthlyEstimate: string;
  };
  coursesPage: {
    title: string;
    subtitle: string;
    searchPlaceholder: string;
    filterAll: string;
    filterBeginner: string;
    filterElementary: string;
    filterIntermediate: string;
    filterUpperIntermediate: string;
    filterAdvanced: string;
    noResults: string;
    clearFilters: string;
    syllabus: string;
    markComplete: string;
    completed: string;
    runChallenge: string;
    takeQuiz: string;
    backToCourses: string;
    generateExtraQuiz: string;
  };
  playgroundPage: {
    title: string;
    subtitle: string;
    runCode: string;
    aiReview: string;
    saveSnippet: string;
    templates: string;
    savedSnippets: string;
    outputTitle: string;
    clearOutput: string;
  };
  tutorPage: {
    title: string;
    subtitle: string;
    placeholder: string;
    send: string;
    clearChat: string;
    contextLabel: string;
    responseLangLabel: string;
  };
  materialsPage: {
    title: string;
    subtitle: string;
    searchPlaceholder: string;
    download: string;
    bookmark: string;
    bookmarked: string;
    readNow: string;
  };
  dashboardPage: {
    title: string;
    subtitle: string;
    xpTotal: string;
    lessonsDone: string;
    avgQuizScore: string;
    savedSnippetsCount: string;
    trackProgress: string;
    recentActivity: string;
    profileSettings: string;
    saveProfile: string;
    signOut: string;
  };
  auth: {
    titleSignIn: string;
    titleRegister: string;
    subtitle: string;
    nameLabel: string;
    emailLabel: string;
    cityLabel: string;
    submitSignIn: string;
    submitRegister: string;
    demoButton: string;
    switchToRegister: string;
    switchToSignIn: string;
  };
}

export const TRANSLATIONS: Record<Lang, UIStrings> = {
  en: {
    nav: {
      courses: 'Courses',
      masalalar: 'Masalalar',
      playground: 'Playground',
      tutor: 'AI Tutor',
      materials: 'Library',
      dashboard: 'Dashboard',
      signIn: 'Sign In',
      profile: 'Student Hub',
    },
    hero: {
      kicker: 'Learn. Code. Create. · A World of Programming',
      headline: 'Master Software Engineering from Tashkent to the World.',
      subheadline:
        'A structured, bilingual programming academy built for Uzbek learners across all five mastery levels. Practice real C++17, Python 3.11, TypeScript, Cloud Run, Cambridge CS resources, and Gemini AI labs.',
      primaryCta: 'Explore Learning Tracks',
      secondaryCta: 'Open Code Playground',
      langLabel: 'Interface Language',
    },
    metrics: {
      tracksLabel: 'Structured Tracks',
      tracksUnit: '5 Mastery Levels',
      lessonsLabel: 'Interactive Labs',
      lessonsUnit: 'C++, Python & Web',
      bilingualLabel: 'Bilingual Support',
      bilingualUnit: 'O‘zbekcha & English',
      tierLabel: 'Core Access Cost',
      tierUnit: 'Free-Tier Cloud Ready',
    },
    tracks: {
      heading: 'Engineering Curriculum',
      subheading:
        'Six progressive tracks spanning Beginner to Advanced levels: C++17 engineering, Python algorithms, modern React & TypeScript, Cloud Run backends, and Gemini AI.',
      viewAll: 'View All Tracks',
      startCourse: 'Start Track',
      continueCourse: 'Continue Track',
      lessonsUnit: 'Lessons',
      hoursUnit: 'Hours',
    },
    cloud: {
      heading: 'Google Ecosystem & Transparent Cost Architecture',
      subheading:
        'Built to run within free service allowances for Uzbek universities, bootcamps, and solo learners—with local storage persistence ready for Firebase Auth & Cloud Firestore.',
      freeTierTitle: 'Zero-Cost Foundation Tier',
      usageTitle: 'Usage-Based Google Cloud Scaling',
      estimatorTitle: 'Monthly Student Scale Estimator',
      studentsLabel: 'Active Monthly Students',
      monthlyEstimate: 'Estimated Monthly Cloud Cost',
    },
    coursesPage: {
      title: 'Programming Tracks & Interactive Labs',
      subtitle:
        'Select any track across our 5 learning levels to study bilingual lessons, compile real C++17 or Python code, and pass quizzes.',
      searchPlaceholder: 'Search courses, topics, or technologies...',
      filterAll: 'All Levels',
      filterBeginner: 'Beginner',
      filterElementary: 'Elementary',
      filterIntermediate: 'Intermediate',
      filterUpperIntermediate: 'Upper-Intermediate',
      filterAdvanced: 'Advanced',
      noResults: 'No tracks match your current search or level filter.',
      clearFilters: 'Reset Filters',
      syllabus: 'Course Syllabus',
      markComplete: 'Mark Lesson Complete',
      completed: 'Completed',
      runChallenge: 'Run & Verify Code',
      takeQuiz: 'Course Assessment Quiz',
      backToCourses: 'All Tracks',
      generateExtraQuiz: 'Generate Bonus AI Practice Question',
    },
    playgroundPage: {
      title: 'Interactive Code Playground',
      subtitle:
        'Write and execute C++17, Python 3.11, JavaScript, TypeScript, or HTML/CSS live, save snippets locally, and request Gemini AI code reviews.',
      runCode: 'Run Code',
      aiReview: 'AI Code Review',
      saveSnippet: 'Save Snippet',
      templates: 'Starter Templates',
      savedSnippets: 'Saved Snippets',
      outputTitle: 'Execution Output',
      clearOutput: 'Clear',
    },
    tutorPage: {
      title: 'CODEVERSE AI Mentor',
      subtitle:
        'Ask coding questions, debug C++/Python/TypeScript errors, or prepare for Cambridge CS exams in Uzbek or English.',
      placeholder: 'Ask a question or paste code to explain or debug...',
      send: 'Send Message',
      clearChat: 'New Session',
      contextLabel: 'Course Context',
      responseLangLabel: 'Mentor Language',
    },
    materialsPage: {
      title: 'Textbook Library & Cambridge Resources',
      subtitle:
        'Bilingual programming textbooks, Cambridge International AS & A Level / IGCSE Computer Science study guides, algorithm references, and Cloud Run checklists.',
      searchPlaceholder: 'Search textbooks, Cambridge guides, or topics...',
      download: 'Download Guide',
      bookmark: 'Save Bookmark',
      bookmarked: 'Bookmarked',
      readNow: 'Open Reader',
    },
    dashboardPage: {
      title: 'Student Learning Dashboard',
      subtitle:
        'Track your completed lessons, 989 C++ Masalalar progress, quiz accuracy, XP progression, saved snippets, and local/server storage status.',
      xpTotal: 'Total XP Earned',
      lessonsDone: 'Lessons Completed',
      avgQuizScore: 'Average Quiz Score',
      savedSnippetsCount: 'Saved Snippets',
      trackProgress: 'Track Mastery Breakdown',
      recentActivity: 'Recent Learning Activity',
      profileSettings: 'Student Profile & Preferences',
      saveProfile: 'Save Changes',
      signOut: 'Sign Out',
    },
    auth: {
      titleSignIn: 'Sign In to CODEVERSE',
      titleRegister: 'Create Your Student Account',
      subtitle:
        'Save your lesson progress, 989 C++ Masalalar solutions, quiz scores, bookmarks, and code snippets.',
      nameLabel: 'Full Name',
      emailLabel: 'Email Address',
      cityLabel: 'City / Region (Uzbekistan)',
      submitSignIn: 'Sign In',
      submitRegister: 'Create Account',
      demoButton: 'Continue as Demo Student (Tashkent)',
      switchToRegister: 'New to CODEVERSE? Create an account',
      switchToSignIn: 'Already registered? Sign in',
    },
  },
  uz: {
    nav: {
      courses: 'Kurslar',
      masalalar: 'Masalalar',
      playground: 'Kod Maydoni',
      tutor: 'AI Ustoz',
      materials: 'Kutubxona',
      dashboard: 'Kabinet',
      signIn: 'Kirish',
      profile: 'Kabinetim',
    },
    hero: {
      kicker: 'Learn. Code. Create. · Dasturlash Olami',
      headline: 'Toshkentdan jahon darajasigacha dasturlashni mukammal o‘rganing.',
      subheadline:
        'O‘zbekistonlik talabalar uchun 5 ta bosqichda noldan professional darajagacha mo‘ljallangan amaliy akademiya. C++17, Python 3.11, TypeScript, Cloud Run va Cambridge CS resurslarini jonli mashqlar orqali o‘zlashtiring.',
      primaryCta: 'Yo‘nalishlarni ko‘rish',
      secondaryCta: 'Kod Maydonini ochish',
      langLabel: 'Interfeys tili',
    },
    metrics: {
      tracksLabel: 'Ta’lim Yo‘nalishlari',
      tracksUnit: '5 ta O‘quv Darajasi',
      lessonsLabel: 'Amaliy Darslar',
      lessonsUnit: 'C++, Python va Web',
      bilingualLabel: 'Ikki tilli tizim',
      bilingualUnit: 'O‘zbekcha va Inglizcha',
      tierLabel: 'Asosiy foydalanish',
      tierUnit: 'Bepul Cloud limiti bilan',
    },
    tracks: {
      heading: 'O‘quv Dasturi Yo‘nalishlari',
      subheading:
        'Beginner dan Advanced gacha bo‘lgan 5 darajali izchil dastur: C++17 darslari, Python algoritmlari, React va TypeScript, Cloud Run hamda Gemini AI.',
      viewAll: 'Barcha kurslar',
      startCourse: 'Boshlash',
      continueCourse: 'Davom ettirish',
      lessonsUnit: 'Dars',
      hoursUnit: 'Soat',
    },
    cloud: {
      heading: 'Google Ekotizimi va Shaffof Xarajatlar Arxitekturasi',
      subheading:
        'Bepul xizmat limitlarida ishlashga moslashtirilgan, lokal saqlash bilan ishlaydigan va keyinchalik Firebase Auth hamda Cloud Firestore ga ulashga tayyor arxitektura.',
      freeTierTitle: 'Bepul Boshlang‘ich Limitlar',
      usageTitle: 'Foydalanishga qarab Google Cloud narxlari',
      estimatorTitle: 'Oylik Talabalar Miqyosi Kalkulyatori',
      studentsLabel: 'Oylik faol talabalar soni',
      monthlyEstimate: 'Taxminiy oylik Cloud xarajati',
    },
    coursesPage: {
      title: 'Dasturlash Kurslari va Amaliy Laboratoriyalar',
      subtitle:
        '5 ta darajadan mos yo‘nalishni tanlang, ikki tilli C++17 va Python darslarini o‘qing, kod topshiriqlarini bajaring va testlardan o‘ting.',
      searchPlaceholder: 'Kurslar, mavzular yoki texnologiyalarni qidiring...',
      filterAll: 'Barchasi',
      filterBeginner: 'Beginner',
      filterElementary: 'Elementary',
      filterIntermediate: 'Intermediate',
      filterUpperIntermediate: 'Upper-Intermediate',
      filterAdvanced: 'Advanced',
      noResults: 'Qidiruv yoki daraja filtri bo‘yicha mos kurs topilmadi.',
      clearFilters: 'Filtrlarni tozalash',
      syllabus: 'Kurs Dasturi',
      markComplete: 'Darsni tugallangan deb belgilash',
      completed: 'Tugallangan',
      runChallenge: 'Kodni ishga tushirish va tekshirish',
      takeQuiz: 'Kurs yakuniy testi',
      backToCourses: 'Barcha kurslar',
      generateExtraQuiz: 'AI yordamida qo‘shimcha test yaratish',
    },
    playgroundPage: {
      title: 'Interaktiv Kod Maydoni',
      subtitle:
        'C++17, Python 3.11, JavaScript, TypeScript yoki HTML/CSS kodlarini jonli yozing, saqlang va Gemini AI orqali tahlil qiling.',
      runCode: 'Kodni bajarish',
      aiReview: 'AI Kod Tahlili',
      saveSnippet: 'Kodni saqlash',
      templates: 'Tayyor shablonlar',
      savedSnippets: 'Saqlangan kodlar',
      outputTitle: 'Natija oynasi',
      clearOutput: 'Tozalash',
    },
    tutorPage: {
      title: 'CODEVERSE AI Ustoz',
      subtitle:
        'C++, Python, TypeScript yoki Cambridge Computer Science imtihonlari bo‘yicha savollar bering va o‘zbek hamda ingliz tillarida javob oling.',
      placeholder: 'Savol yozing yoki tahlil qilish uchun kodni joylashtiring...',
      send: 'Yuborish',
      clearChat: 'Yangi suhbat',
      contextLabel: 'Kurs mavzusi',
      responseLangLabel: 'Javob tili',
    },
    materialsPage: {
      title: 'Darsliklar Kutubxonasi va Cambridge Resurslari',
      subtitle:
        'O‘zbek va ingliz tillaridagi darsliklar, Cambridge International AS & A Level / IGCSE Computer Science qo‘llanmalari va algoritm ma’lumotnomalari.',
      searchPlaceholder: 'Darslik, Cambridge qo‘llanmasi yoki mavzu qidiring...',
      download: 'Yuklab olish',
      bookmark: 'Saqlash',
      bookmarked: 'Saqlangan',
      readNow: 'O‘qish',
    },
    dashboardPage: {
      title: 'Talaba Shaxsiy Kabineti',
      subtitle:
        'Tugallangan darslar, 989 ta C++ Masalalar natijalari, test ballari, XP va lokal/server saqlash holatini boshqaring.',
      xpTotal: 'Jami XP Ballari',
      lessonsDone: 'Tugallangan Darslar',
      avgQuizScore: 'O‘rtacha Test Natijasi',
      savedSnippetsCount: 'Saqlangan Kodlar',
      trackProgress: 'Yo‘nalishlar bo‘yicha o‘zlashtirish',
      recentActivity: 'So‘nggi faoliyat',
      profileSettings: 'Talaba Profili va Sozlamalar',
      saveProfile: 'Saqlash',
      signOut: 'Chiqish',
    },
    auth: {
      titleSignIn: 'CODEVERSE hisobiga kirish',
      titleRegister: 'Yangi talaba hisobini yaratish',
      subtitle:
        'Darslardagi natijalaringiz, 989 ta C++ masalalari, test ballari va kodlaringizni saqlab boring.',
      nameLabel: 'To‘liq ismingiz',
      emailLabel: 'Elektron pochta',
      cityLabel: 'Shahar / Viloyat (O‘zbekiston)',
      submitSignIn: 'Kirish',
      submitRegister: 'Ro‘yxatdan o‘tish',
      demoButton: 'Demo talaba sifatida kirish (Toshkent)',
      switchToRegister: 'Hisobingiz yo‘qmi? Ro‘yxatdan o‘ting',
      switchToSignIn: 'Allaqachon ro‘yxatdan o‘tganmisiz? Kiring',
    },
  },
};
