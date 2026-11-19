import type { Course, StudyMaterial } from '../types/codeverse';
import { CPP_COURSES } from './cppCurriculum';
import { LIBRARY_RESOURCES } from './libraryResources';

export const HERO_IMAGE = '/src/assets/images/hero_codeverse_studio_1795066064658.jpg';

const BASE_COURSES: Course[] = [
  {
    id: 'python-foundations',
    slug: 'python-foundations',
    title: {
      en: 'Python & Algorithmic Thinking',
      uz: 'Python va Algoritmik Fikrlash',
    },
    subtitle: {
      en: 'Core programming logic, data structures, and problem solving',
      uz: 'Dasturlash mantig‘i, ma’lumotlar tuzilmasi va masalalar yechish',
    },
    description: {
      en: 'Start from zero and build solid computer science intuition with Python 3.11. Write real scripts, master loops, functions, dictionaries, and algorithmic complexity using practical examples tailored for Uzbek developers.',
      uz: 'Noldan boshlab Python 3.11 yordamida mustahkam dasturlash poydevorini quring. O‘zbekistonlik dasturchilar uchun moslashtirilgan amaliy misollar orqali sikllar, funksiyalar, lug‘atlar va algoritmik murakkablikni o‘rganing.',
    },
    difficulty: 'Beginner',
    hours: 6,
    image: '/src/assets/images/track_python_foundations_1795066067384.jpg',
    technologies: ['Python 3.11', 'Algorithms', 'Data Structures', 'CLI Tools'],
    outcomes: [
      {
        en: 'Write clean Python functions, loops, and conditional pipelines',
        uz: 'Toza Python funksiyalari, sikllar va shartli mantiqlarni yozish',
      },
      {
        en: 'Model real-world entities using lists, sets, and dictionaries',
        uz: 'Ro‘yxatlar, to‘plamlar va lug‘atlar bilan real tizimlarni modellashtirish',
      },
      {
        en: 'Analyze O(n) vs O(log n) search efficiency on sorted datasets',
        uz: 'Saralangan ma’lumotlarda O(n) va O(log n) qidiruv samaradorligini tahlil qilish',
      },
    ],
    lessons: [
      {
        id: 'py-1',
        order: 1,
        title: {
          en: 'Variables, Types & Uzbek Currency Formatter',
          uz: 'O‘zgaruvchilar, turlar va So‘m formatlash',
        },
        durationMinutes: 20,
        summary: {
          en: 'Learn dynamic typing, f-strings, and numeric formatting in Python 3.11.',
          uz: 'Python 3.11 da dinamik turlar, f-stringlar va sonlarni formatlashni o‘rganing.',
        },
        content: [
          {
            en: 'In Python, variables store references to typed values such as int, float, str, and bool. Unlike low-level languages, you do not declare types manually, yet understanding value types prevents runtime bugs when processing user input or financial amounts.',
            uz: 'Python tilida o‘zgaruvchilar int, float, str va bool kabi turlarga ega qiymatlarga havolani saqlaydi. Turlarni qo‘lda e’lon qilmasangiz ham, foydalanuvchi kiritgan ma’lumotlar yoki moliyaviy hisob-kitoblarda xatolarning oldini olish uchun turlarni aniq bilish zarur.',
          },
          {
            en: 'Formatted string literals (f-strings) allow you to embed expressions directly inside strings with clean thousand separators and precision specifiers—essential when displaying UZS prices in e-commerce platforms.',
            uz: 'Formatlangan satrlar (f-string) matn ichiga ifodalarni to‘g‘ridan-to‘g‘ri kiritish va minglik ajratuvchilarni qo‘yish imkonini beradi—bu O‘zbekistondagi onlayn do‘konlarda so‘m narxlarini ko‘rsatishda juda qulay.',
          },
        ],
        codeExample: {
          language: 'python',
          caption: {
            en: 'Formatting UZS totals with Python f-strings',
            uz: 'Python f-string orqali UZS summasini formatlash',
          },
          code: `course_name = "CODEVERSE Python"\nprice_uzs = 450000\ndiscount_rate = 0.20\nfinal_price = int(price_uzs * (1 - discount_rate))\n\nprint(f"{course_name}: {final_price:,} UZS")`,
        },
        challenge: {
          prompt: {
            en: 'Calculate the total price of 3 books costing 85,000 UZS each and print "Total: 255000 UZS".',
            uz: 'Har biri 85 000 so‘m bo‘lgan 3 ta kitobning umumiy narxini hisoblang va "Total: 255000 UZS" deb chiqaring.',
          },
          language: 'python',
          starterCode: `book_price = 85000\nquantity = 3\n# Calculate total and print the exact string\ntotal = 0\nprint(f"Total: {total} UZS")`,
          expectedOutputIncludes: 'Total: 255000 UZS',
          hint: {
            en: 'Multiply book_price by quantity: total = book_price * quantity',
            uz: 'book_price va quantity ni ko‘paytiring: total = book_price * quantity',
          },
        },
      },
      {
        id: 'py-2',
        order: 2,
        title: {
          en: 'Control Flow & Tashkent Metro Fare Calculator',
          uz: 'Shart operatorlari va Toshkent Metro chipta kalkulyatori',
        },
        durationMinutes: 25,
        summary: {
          en: 'Build conditional decision trees using if/elif/else and clean boolean logic.',
          uz: 'if/elif/else va mantiqiy operatorlar yordamida qaror qabul qilish tizimini tuzing.',
        },
        content: [
          {
            en: 'Real software makes decisions based on conditions. Python uses indentation (4 spaces) rather than braces to define code blocks under if, elif, and else statements.',
            uz: 'Haqiqiy dasturlar shartlarga qarab qaror qabul qiladi. Python bloklarni ajratish uchun jingalak qavslar o‘rniga 4 ta bo‘sh joydan (indentation) foydalanadi.',
          },
          {
            en: 'Always order conditions from most specific to most general, and encapsulate decision logic inside pure functions so it can be unit-tested independently.',
            uz: 'Shartlarni har doim eng anig‘idan umumiyga qarab joylashtiring va ularni alohida test qilish uchun toza funksiyalar ichiga yozing.',
          },
        ],
        codeExample: {
          language: 'python',
          caption: {
            en: 'Pure function for transit fare tiers',
            uz: 'Yo‘l haqi tarifini aniqlovchi funksiya',
          },
          code: `def get_fare(passenger_type: str, trips: int) -> int:\n    if passenger_type == "student":\n        return trips * 1400\n    elif passenger_type == "standard":\n        return trips * 2000\n    return trips * 2000\n\nprint("Student 2 trips:", get_fare("student", 2))`,
        },
        challenge: {
          prompt: {
            en: 'Complete check_grade(score) so scores >= 90 print "A", >= 75 print "B", else "C". Test with score = 82.',
            uz: 'check_grade(score) funksiyasini yakunlang: >= 90 bo‘lsa "A", >= 75 bo‘lsa "B", aks holda "C". score = 82 bilan tekshiring.',
          },
          language: 'python',
          starterCode: `def check_grade(score):\n    # Write if/elif/else logic\n    return "C"\n\nprint("Grade:", check_grade(82))`,
          expectedOutputIncludes: 'Grade: B',
          hint: {
            en: 'Check if score >= 90: return "A", elif score >= 75: return "B".',
            uz: 'if score >= 90: return "A", elif score >= 75: return "B" deb tekshiring.',
          },
        },
      },
      {
        id: 'py-3',
        order: 3,
        title: {
          en: 'Dictionaries & Lists: Regional Student Directory',
          uz: 'Lug‘atlar va Ro‘yxatlar: Hududiy talabalar katalogi',
        },
        durationMinutes: 30,
        summary: {
          en: 'Aggregate records and perform O(1) dictionary lookups in Python.',
          uz: 'Ma’lumotlarni guruhlash va Python lug‘atlarida O(1) tezlikda qidirish.',
        },
        content: [
          {
            en: 'Lists preserve ordered collections, while dictionaries (dict) map unique keys to values in constant average time O(1). Combining lists of dictionaries is the standard pattern for working with JSON APIs and Firestore documents.',
            uz: 'Ro‘yxatlar tartiblangan elementlarni saqlaydi, lug‘atlar (dict) esa kalitlarni qiymatlarga o‘rtacha O(1) vaqtda bog‘laydi. Lug‘atlar ro‘yxati JSON API va ma’lumotlar bazasi hujjatlari bilan ishlashning asosiy usulidir.',
          },
          {
            en: 'List comprehensions offer a concise, readable way to filter and transform collections in a single expression without mutating the original list.',
            uz: 'List comprehension usuli asl ro‘yxatni o‘zgartirmasdan ma’lumotlarni bitta qatorda filtrlash va qayta ishlash imkonini beradi.',
          },
        ],
        codeExample: {
          language: 'python',
          caption: {
            en: 'Grouping Uzbek students by city using dictionaries',
            uz: 'Talabalarni shaharlar bo‘yicha guruhlash',
          },
          code: `students = [\n    {"name": "Madina", "city": "Tashkent", "xp": 420},\n    {"name": "Sardor", "city": "Samarkand", "xp": 380},\n    {"name": "Jasur", "city": "Tashkent", "xp": 510},\n]\n\ntashkent_names = [s["name"] for s in students if s["city"] == "Tashkent"]\nprint("Tashkent:", tashkent_names)`,
        },
        challenge: {
          prompt: {
            en: 'Sum all XP points from the students list and print "Total XP: 1310".',
            uz: 'students ro‘yxatidagi barcha XP ballarini qo‘shing va "Total XP: 1310" deb chiqaring.',
          },
          language: 'python',
          starterCode: `students = [\n    {"name": "Madina", "xp": 420},\n    {"name": "Sardor", "xp": 380},\n    {"name": "Jasur", "xp": 510},\n]\n\ntotal_xp = 0\n# Sum xp across all students\nprint(f"Total XP: {total_xp}")`,
          expectedOutputIncludes: 'Total XP: 1310',
          hint: {
            en: 'Use total_xp = sum(s["xp"] for s in students)',
            uz: 'total_xp = sum(s["xp"] for s in students) dan foydalaning.',
          },
        },
      },
      {
        id: 'py-4',
        order: 4,
        title: {
          en: 'Binary Search & Time Complexity',
          uz: 'Ikkilik qidiruv (Binary Search) va Vaqt murakkabligi',
        },
        durationMinutes: 35,
        summary: {
          en: 'Cut search steps from millions to ~20 comparisons using divide-and-conquer.',
          uz: 'Bo‘lib tashla va hukmronlik qil tamoyili bilan qidiruv qadamlarini keskin kamaytiring.',
        },
        content: [
          {
            en: 'Linear search checks items one by one—O(n). On a sorted array of 1,000,000 student IDs, linear search could take 1,000,000 checks. Binary search halves the remaining search space on every step, finishing in at most 20 steps: O(log n).',
            uz: 'Chiziqli qidiruv elementlarni birma-bir tekshiradi — O(n). 1 000 000 ta saralangan talaba ID raqamidan qidirishda bu 1 million qadam olishi mumkin. Ikkilik qidiruv esa har qadamda oraliqni ikkiga bo‘lib, ko‘pi bilan 20 qadamda topadi: O(log n).',
          },
          {
            en: 'This algorithmic mindset separates casual coders from software engineers capable of passing technical interviews at international tech companies.',
            uz: 'Aynan shu algoritmik fikrlash oddiy kod yozuvchini xalqaro IT kompaniyalarning texnik suhbatlaridan muvaffaqiyatli o‘ta oladigan muhandisdan ajratib turadi.',
          },
        ],
        codeExample: {
          language: 'python',
          caption: {
            en: 'Iterative Binary Search returning target index',
            uz: 'Ikkilik qidiruv algoritmi',
          },
          code: `def binary_search(nums, target):\n    left, right = 0, len(nums) - 1\n    while left <= right:\n        mid = (left + right) // 2\n        if nums[mid] == target:\n            return mid\n        elif nums[mid] < target:\n            left = mid + 1\n        else:\n            right = mid - 1\n    return -1\n\nprint("Index of 42:", binary_search([10, 21, 35, 42, 58, 70], 42))`,
        },
        challenge: {
          prompt: {
            en: 'Implement binary_search and print the index of 55 in [5, 12, 24, 39, 55, 81]. Expected: "Found at: 4".',
            uz: 'binary_search funksiyasini yozing va [5, 12, 24, 39, 55, 81] ichida 55 ning indeksini "Found at: 4" tarzida chiqaring.',
          },
          language: 'python',
          starterCode: `def binary_search(arr, target):\n    left, right = 0, len(arr) - 1\n    # Implement loop\n    return -1\n\nidx = binary_search([5, 12, 24, 39, 55, 81], 55)\nprint(f"Found at: {idx}")`,
          expectedOutputIncludes: 'Found at: 4',
          hint: {
            en: 'Inside while left <= right, compute mid = (left + right) // 2 and adjust left or right.',
            uz: 'while left <= right ichida mid = (left + right) // 2 ni hisoblang va left/right ni siljiting.',
          },
        },
      },
    ],
    quiz: [
      {
        id: 'py-q1',
        question: {
          en: 'What is the average time complexity of looking up a key in a Python dictionary (dict)?',
          uz: 'Python lug‘atidan (dict) kalit bo‘yicha qiymat topishning o‘rtacha vaqt murakkabligi qanday?',
        },
        options: [
          { en: 'O(1) — Constant time', uz: 'O(1) — O‘zgarmas vaqt' },
          { en: 'O(n) — Linear time', uz: 'O(n) — Chiziqli vaqt' },
          { en: 'O(n²) — Quadratic time', uz: 'O(n²) — Kvadratik vaqt' },
          { en: 'O(log n) — Logarithmic time', uz: 'O(log n) — Logarifmik vaqt' },
        ],
        correctIndex: 0,
        explanation: {
          en: 'Python dictionaries are implemented as hash tables, enabling O(1) average-case key lookup.',
          uz: 'Python lug‘atlari hash-jadval asosida qurilgani uchun o‘rtacha O(1) vaqtda qiymat topadi.',
        },
      },
      {
        id: 'py-q2',
        question: {
          en: 'Which prerequisite is mandatory for Binary Search to work correctly?',
          uz: 'Ikkilik qidiruv (Binary Search) to‘g‘ri ishlashi uchun qaysi shart majburiy?',
        },
        options: [
          { en: 'The list must contain only strings', uz: 'Ro‘yxat faqat matnlardan iborat bo‘lishi kerak' },
          { en: 'The list must be sorted', uz: 'Ro‘yxat tartiblangan (saralangan) bo‘lishi kerak' },
          { en: 'The list length must be a power of 2', uz: 'Ro‘yxat uzunligi 2 ning darajasi bo‘lishi kerak' },
          { en: 'The list must have no even numbers', uz: 'Ro‘yxatda juft sonlar bo‘lmasligi kerak' },
        ],
        correctIndex: 1,
        explanation: {
          en: 'Binary search relies on comparing the middle element to discard half of the remaining range, which only works on sorted sequences.',
          uz: 'Ikkilik qidiruv o‘rta elementni taqqoslab yarim oraliqni tashlab yuboradi, bu faqat tartiblangan ro‘yxatda ishlaydi.',
        },
      },
      {
        id: 'py-q3',
        question: {
          en: 'What does f"{150000:,} UZS" evaluate to in Python?',
          uz: 'Python tilida f"{150000:,} UZS" ifodasi qanday natija beradi?',
        },
        options: [
          { en: '150000 UZS', uz: '150000 UZS' },
          { en: '150,000 UZS', uz: '150,000 UZS' },
          { en: '150.000 UZS', uz: '150.000 UZS' },
          { en: 'SyntaxError', uz: 'Sintaksis xatosi' },
        ],
        correctIndex: 1,
        explanation: {
          en: 'The :, format specifier adds comma thousands separators automatically.',
          uz: ':, format spetsifikatori avtomatik ravishda minglik vergul ajratuvchisini qo‘shadi.',
        },
      },
      {
        id: 'py-q4',
        question: {
          en: 'How does Python define code blocks inside functions and if statements?',
          uz: 'Python funksiya va if operatorlari ichidagi kod bloklarini qanday belgilaydi?',
        },
        options: [
          { en: 'Curly braces { }', uz: 'Jingalak qavslar { }' },
          { en: 'Indentation (whitespace)', uz: 'Chekinish (bo‘sh joylar / indentation)' },
          { en: 'begin / end keywords', uz: 'begin / end kalit so‘zlari' },
          { en: 'Semicolons ;', uz: 'Nuqtali vergul ;' },
        ],
        correctIndex: 1,
        explanation: {
          en: 'Python enforces consistent indentation (typically 4 spaces) to structure blocks.',
          uz: 'Python bloklarni ajratish uchun bir xil chekinishdan (odatda 4 ta bo‘sh joy) foydalanadi.',
        },
      },
    ],
  },
  {
    id: 'web-engineering',
    slug: 'web-engineering',
    title: {
      en: 'Modern Web Engineering (React & TypeScript)',
      uz: 'Zamonaviy Veb-Muhandislik (React va TypeScript)',
    },
    subtitle: {
      en: 'Type-safe frontend architecture, component state, and responsive UI',
      uz: 'Tip xavfsiz frontend arxitekturasi, komponent holati va moslashuvchan UI',
    },
    description: {
      en: 'Move beyond static HTML pages. Master JavaScript ES2023, TypeScript interfaces, React hooks, and clean frontend engineering patterns used in modern international web products.',
      uz: 'Oddiy statik sahifalardan keyingi bosqichga o‘ting. Zamonaviy xalqaro veb-mahsulotlarda qo‘llaniladigan JavaScript ES2023, TypeScript interfeyslari va React hooklarini o‘rganing.',
    },
    difficulty: 'Intermediate',
    hours: 8,
    image: '/src/assets/images/track_web_engineering_1795066066814.jpg',
    technologies: ['TypeScript', 'React 19', 'Tailwind CSS', 'Async JS'],
    outcomes: [
      {
        en: 'Design type-safe interfaces and generic data transformers in TypeScript',
        uz: 'TypeScript da tip xavfsiz interfeyslar va ma’lumot o‘zgartirgichlar yaratish',
      },
      {
        en: 'Manage immutable UI state and side effects cleanly in React',
        uz: 'React da o‘zgarmas (immutable) holat va effektlarni toza boshqarish',
      },
      {
        en: 'Build accessible, high-contrast responsive interfaces',
        uz: 'Barcha qurilmalarga mos va qulay interfeyslar qurish',
      },
    ],
    lessons: [
      {
        id: 'web-1',
        order: 1,
        title: {
          en: 'Modern JavaScript: Array Pipelines (map, filter, reduce)',
          uz: 'Zamonaviy JavaScript: Massiv metodlari (map, filter, reduce)',
        },
        durationMinutes: 25,
        summary: {
          en: 'Transform datasets declaratively without mutating state.',
          uz: 'Ma’lumotlarni asl holatini o‘zgartirmasdan deklarativ tarzda qayta ishlash.',
        },
        content: [
          {
            en: 'React and modern TypeScript applications rely on immutable data transformations. Rather than pushing items in a manual for-loop, functional array methods like filter, map, and reduce express intent clearly and prevent shared-state bugs.',
            uz: 'React va zamonaviy TypeScript ilovalari ma’lumotlarni o‘zgartirmasdan qayta ishlashga tayanadi. Qo‘lda sikl yozish o‘rniga filter, map va reduce metodlari kodni tushunarli va xatosiz qiladi.',
          },
          {
            en: 'Chaining filter followed by map lets you select active records and shape them directly for UI rendering.',
            uz: 'filter dan keyin map ni ulash faol yozuvlarni ajratib olib, ularni bevosita interfeys uchun tayyorlash imkonini beradi.',
          },
        ],
        codeExample: {
          language: 'javascript',
          caption: {
            en: 'Filtering completed lessons and calculating XP',
            uz: 'Tugallangan darslarni ajratib olib XP hisoblash',
          },
          code: `const lessons = [\n  { title: "Variables", done: true, xp: 50 },\n  { title: "Hooks", done: false, xp: 80 },\n  { title: "Async API", done: true, xp: 100 },\n];\n\nconst earnedXP = lessons\n  .filter((item) => item.done)\n  .reduce((sum, item) => sum + item.xp, 0);\n\nconsole.log("Earned XP:", earnedXP);`,
        },
        challenge: {
          prompt: {
            en: 'Filter courses where hours >= 7 and log their titles joined by ", ". Expected: "Web Engineering, Cloud Run".',
            uz: 'hours >= 7 bo‘lgan kurslarni ajrating va nomlarini ", " bilan birlashtirib chiqaring. Kutilgan natija: "Web Engineering, Cloud Run".',
          },
          language: 'javascript',
          starterCode: `const tracks = [\n  { title: "Python", hours: 6 },\n  { title: "Web Engineering", hours: 8 },\n  { title: "Cloud Run", hours: 7 },\n];\n\nconst result = ""; // Use filter + map + join(", ")\nconsole.log(result);`,
          expectedOutputIncludes: 'Web Engineering, Cloud Run',
          hint: {
            en: 'tracks.filter(t => t.hours >= 7).map(t => t.title).join(", ")',
            uz: 'tracks.filter(t => t.hours >= 7).map(t => t.title).join(", ")',
          },
        },
      },
      {
        id: 'web-2',
        order: 2,
        title: {
          en: 'TypeScript Interfaces & Discriminated Unions',
          uz: 'TypeScript Interfeyslari va Ajratilgan Birlashmalar',
        },
        durationMinutes: 30,
        summary: {
          en: 'Eliminate null-reference crashes before code ever reaches the browser.',
          uz: 'Kod brauzerga yetib bormasdan turib null/undefined xatolarini bartaraf eting.',
        },
        content: [
          {
            en: 'TypeScript adds static type verification on top of JavaScript. When modeling API states—loading, success, or error—discriminated unions guarantee that your UI handles every state explicitly.',
            uz: 'TypeScript JavaScript ustiga statik tip tekshiruvini qo‘shadi. API holatlarini (yuklanmoqda, muvaffaqiyatli, xato) modellashtirishda discriminated union har bir holatni majburiy tekshirishni kafolatlaydi.',
          },
          {
            en: 'By pairing strict interfaces with helper guards, teams across Tashkent and global remote companies collaborate safely on large codebases.',
            uz: 'Qat’iy interfeyslar yordamida Toshkentdagi va xalqaro masofaviy jamoalar katta loyihalarda ishonch bilan hamkorlik qilishadi.',
          },
        ],
        codeExample: {
          language: 'javascript',
          caption: {
            en: 'Modeling API response formatting cleanly',
            uz: 'API javob holatini xavfsiz qayta ishlash',
          },
          code: `function formatStatus(state) {\n  if (state.status === "loading") return "Loading...";\n  if (state.status === "error") return "Error: " + state.message;\n  return "Loaded " + state.items.length + " courses";\n}\n\nconsole.log(formatStatus({ status: "success", items: ["Py", "TS"] }));`,
        },
        challenge: {
          prompt: {
            en: 'Write formatUser(user) that prints "Azizbek (Tashkent)" when city exists, or "Azizbek (Uzbekistan)" if missing.',
            uz: 'formatUser(user) funksiyasini yozing: city bo‘lsa "Azizbek (Tashkent)", bo‘lmasa "Azizbek (Uzbekistan)" qaytarsin.',
          },
          language: 'javascript',
          starterCode: `function formatUser(user) {\n  // Return formatted string using nullish coalescing ??\n  return "";\n}\n\nconsole.log(formatUser({ name: "Azizbek", city: "Tashkent" }));\nconsole.log(formatUser({ name: "Azizbek" }));`,
          expectedOutputIncludes: 'Azizbek (Tashkent)',
          hint: {
            en: 'return `${user.name} (${user.city ?? "Uzbekistan"})`;',
            uz: 'return `${user.name} (${user.city ?? "Uzbekistan"})`;',
          },
        },
      },
      {
        id: 'web-3',
        order: 3,
        title: {
          en: 'React State, Props & Unidirectional Data Flow',
          uz: 'React State, Props va Bir Yo‘nalishli Ma’lumot Oqimi',
        },
        durationMinutes: 30,
        summary: {
          en: 'Understand how React re-renders predictably from state snapshots.',
          uz: 'React komponentlari state o‘zgarganda qanday qilib aniq qayta chizilishini tushuning.',
        },
        content: [
          {
            en: 'In React, UI is a pure function of state: UI = f(state). Parent components pass data down via props and receive events back via callback functions.',
            uz: 'React da interfeys holatning sof funksiyasidir: UI = f(state). Ota komponentlar ma’lumotlarni props orqali pastga uzatadi va hodisalarni callback funksiyalar orqali qabul qiladi.',
          },
          {
            en: 'Never mutate arrays or objects stored in state directly; always create a fresh copy with spread syntax ([...prev, item]) so React detects the change immediately.',
            uz: 'State ichidagi massiv yoki obyektlarni hech qachon to‘g‘ridan-to‘g‘ri o‘zgartirmang; React o‘zgarishni sezishi uchun doimo yangi nusxa yarating ([...prev, item]).',
          },
        ],
        codeExample: {
          language: 'javascript',
          caption: {
            en: 'Immutable state update simulation',
            uz: 'O‘zgarmas state yangilanishi',
          },
          code: `const prevCompleted = ["py-1", "py-2"];\nconst nextLesson = "py-3";\nconst updated = prevCompleted.includes(nextLesson)\n  ? prevCompleted\n  : [...prevCompleted, nextLesson];\n\nconsole.log("Completed:", updated.join(", "));`,
        },
        challenge: {
          prompt: {
            en: 'Toggle "web-2" inside completedIds immutably and log the resulting length (expected: "Count: 2").',
            uz: 'completedIds ichida "web-2" ni immutabllik bilan qo‘shing/o‘chiring va uzunlikni chiqaring (Kutilgan: "Count: 2").',
          },
          language: 'javascript',
          starterCode: `const completedIds = ["web-1"];\nconst target = "web-2";\n// Create updatedIds without mutating completedIds\nconst updatedIds = completedIds;\nconsole.log("Count:", updatedIds.length);`,
          expectedOutputIncludes: 'Count: 2',
          hint: {
            en: 'const updatedIds = completedIds.includes(target) ? completedIds.filter(id => id !== target) : [...completedIds, target];',
            uz: 'const updatedIds = [...completedIds, target];',
          },
        },
      },
      {
        id: 'web-4',
        order: 4,
        title: {
          en: 'Async / Await & Safe Fetch Error Handling',
          uz: 'Async / Await va Xavfsiz Fetch Xatolarini Boshqarish',
        },
        durationMinutes: 35,
        summary: {
          en: 'Handle network responses, HTTP status checks, and user-facing errors gracefully.',
          uz: 'Tarmoq javoblari, HTTP holat kodlari va foydalanuvchi xabarlarini to‘g‘ri boshqarish.',
        },
        content: [
          {
            en: 'A common mistake with browser fetch() is assuming it rejects on HTTP 404 or 500 errors. In reality, fetch() only rejects on network failures—you must explicitly inspect response.ok before parsing JSON.',
            uz: 'fetch() bilan ishlashda ko‘p uchraydigan xato — 404 yoki 500 xatolarida u avtomatik catch ga tushadi deb o‘ylash. Aslida JSON o‘qishdan oldin response.ok ni majburiy tekshirish kerak.',
          },
          {
            en: 'Always wrap async requests in try/catch/finally so loading spinners stop reliably even when an API request fails.',
            uz: 'Asinxron so‘rovlarni doimo try/catch/finally ichiga oling, shunda xatolik yuz berganda ham yuklanish indikatori to‘xtaydi.',
          },
        ],
        codeExample: {
          language: 'javascript',
          caption: {
            en: 'Validating HTTP responses with async/await',
            uz: 'async/await yordamida HTTP javobini tekshirish',
          },
          code: `async function parseApi(mockResponse) {\n  if (!mockResponse.ok) {\n    throw new Error("HTTP " + mockResponse.status);\n  }\n  return mockResponse.data;\n}\n\nparseApi({ ok: true, data: { status: "Ready" } })\n  .then((res) => console.log("API:", res.status));`,
        },
        challenge: {
          prompt: {
            en: 'Create checkResponse(status) that returns "OK" for 200-299 and "ERR" otherwise. Log checkResponse(201) + " " + checkResponse(500).',
            uz: 'checkResponse(status) yozing: 200-299 oralig‘ida "OK", aks holda "ERR" qaytarsin. checkResponse(201) + " " + checkResponse(500) ni chiqaring.',
          },
          language: 'javascript',
          starterCode: `function checkResponse(status) {\n  // Return "OK" if 200 <= status < 300 else "ERR"\n  return "ERR";\n}\n\nconsole.log(checkResponse(201) + " " + checkResponse(500));`,
          expectedOutputIncludes: 'OK ERR',
          hint: {
            en: 'return status >= 200 && status < 300 ? "OK" : "ERR";',
            uz: 'return status >= 200 && status < 300 ? "OK" : "ERR";',
          },
        },
      },
    ],
    quiz: [
      {
        id: 'web-q1',
        question: {
          en: 'Why should React state arrays never be modified with .push() directly?',
          uz: 'Nima uchun React state massivlarini to‘g‘ridan-to‘g‘ri .push() bilan o‘zgartirib bo‘lmaydi?',
        },
        options: [
          { en: '.push() is slower than .map()', uz: '.push() metodi .map() dan sekinroq' },
          { en: 'Same reference prevents React from detecting state change', uz: 'Massiv havolasi o‘zgarmagani uchun React yangilanishni sezmaydi' },
          { en: 'TypeScript forbids .push() on all arrays', uz: 'TypeScript barcha massivlarda .push() ni taqiqlaydi' },
          { en: '.push() deletes previous items', uz: '.push() oldingi elementlarni o‘chirib yuboradi' },
        ],
        correctIndex: 1,
        explanation: {
          en: 'React uses shallow reference comparison (Object.is) to detect state updates; mutating in place keeps the same array reference.',
          uz: 'React o‘zgarishni havola (reference) bo‘yicha tekshiradi; joyida o‘zgartirish havolani saqlab qoladi.',
        },
      },
      {
        id: 'web-q2',
        question: {
          en: 'When does browser fetch() throw an error automatically into catch()?',
          uz: 'Brauzerdagi fetch() qachon avtomatik ravishda catch() blokiga xato uzatadi?',
        },
        options: [
          { en: 'On HTTP 404 Not Found', uz: 'HTTP 404 topilmagan xatosida' },
          { en: 'On HTTP 500 Server Error', uz: 'HTTP 500 server xatosida' },
          { en: 'Only on network failure or aborted request', uz: 'Faqat tarmoq uzilishi yoki so‘rov bekor qilinganda' },
          { en: 'Whenever JSON is empty', uz: 'JSON bo‘sh bo‘lganda' },
        ],
        correctIndex: 2,
        explanation: {
          en: 'HTTP error statuses like 404 or 500 still resolve the Promise; you must check response.ok manually.',
          uz: '404 yoki 500 javoblarida ham Promise bajariladi, shuning uchun response.ok ni tekshirish shart.',
        },
      },
      {
        id: 'web-q3',
        question: {
          en: 'What does the nullish coalescing operator (??) check for?',
          uz: 'Nullish coalescing operatori (??) nimani tekshiradi?',
        },
        options: [
          { en: 'Only 0 and empty strings', uz: 'Faqat 0 va bo‘sh satrni' },
          { en: 'Only null and undefined', uz: 'Faqat null va undefined qiymatlarni' },
          { en: 'All falsy values including false', uz: 'false ni ham o‘z ichiga olgan barcha falsy qiymatlarni' },
          { en: 'Only NaN values', uz: 'Faqat NaN qiymatlarni' },
        ],
        correctIndex: 1,
        explanation: {
          en: '?? falls back only when the left operand is null or undefined, preserving valid 0 or "" values.',
          uz: '?? faqat null yoki undefined bo‘lganda o‘ng qiymatni oladi, 0 yoki "" qiymatlarini saqlab qoladi.',
        },
      },
    ],
  },
  {
    id: 'backend-cloud',
    slug: 'backend-cloud',
    title: {
      en: 'Backend Systems & Google Cloud Run',
      uz: 'Backend Tizimlari va Google Cloud Run',
    },
    subtitle: {
      en: 'Express APIs, input validation, serverless containers, and cost engineering',
      uz: 'Express API, ma’lumot tekshiruvi, konteynerlar va xarajat optimizatsiyasi',
    },
    description: {
      en: 'Architect secure Node.js + Express backends and deploy stateless services to Google Cloud Run. Learn environment secret management, rate-limiting, and how to stay within Cloud free tiers.',
      uz: 'Xavfsiz Node.js + Express backend tizimlarini loyihalang va Google Cloud Run ga joylashtiring. Muhit o‘zgaruvchilari xavfsizligi va bepul bulut limitlarida ishlashni o‘rganing.',
    },
    difficulty: 'Intermediate',
    hours: 7,
    image: '/src/assets/images/track_backend_cloud_1795066067982.jpg',
    technologies: ['Node.js 22', 'Express', 'Cloud Run', 'Docker'],
    outcomes: [
      {
        en: 'Design RESTful JSON APIs with strict input validation',
        uz: 'Qat’iy tekshiruvga ega RESTful JSON API lar yaratish',
      },
      {
        en: 'Keep API keys strictly on the server side using environment variables',
        uz: 'API kalitlarni faqat server tomonida muhit o‘zgaruvchilarida saqlash',
      },
      {
        en: 'Configure Cloud Run scale-to-zero containers for free-tier efficiency',
        uz: 'Cloud Run da scale-to-zero konteynerlarini bepul limitlarga mos sozlash',
      },
    ],
    lessons: [
      {
        id: 'cloud-1',
        order: 1,
        title: {
          en: 'REST API Design & Payload Validation',
          uz: 'REST API Dizayni va Kiritilgan Ma’lumotni Tekshirish',
        },
        durationMinutes: 25,
        summary: {
          en: 'Never trust client payloads—validate every route at the boundary.',
          uz: 'Mijozdan kelgan ma’lumotlarga ko‘r-ko‘rona ishonmang — har bir yo‘nalishni tekshiring.',
        },
        content: [
          {
            en: 'A resilient Express backend validates request bodies before running business logic or database writes. Returning clear 400 Bad Request errors protects downstream services and prevents malformed state.',
            uz: 'Ishonchli Express backend har qanday biznes mantiq yoki bazaga yozishdan oldin so‘rov tarkibini tekshiradi. Aniq 400 Bad Request xatolarini qaytarish tizimni buzilishdan saqlaydi.',
          },
          {
            en: 'Use explicit field allowlists instead of spreading req.body directly into storage.',
            uz: 'req.body ni to‘g‘ridan-to‘g‘ri bazaga yozish o‘rniga faqat ruxsat etilgan maydonlarni ajratib oling.',
          },
        ],
        codeExample: {
          language: 'javascript',
          caption: {
            en: 'Boundary validator function for student registration',
            uz: 'Talaba ro‘yxatdan o‘tish ma’lumotlarini tekshirish',
          },
          code: `function validateStudentPayload(body) {\n  if (!body.name || body.name.trim().length < 2) {\n    return { ok: false, error: "Name is too short" };\n  }\n  if (!body.email || !body.email.includes("@")) {\n    return { ok: false, error: "Valid email required" };\n  }\n  return { ok: true, clean: { name: body.name.trim(), email: body.email.toLowerCase() } };\n}\n\nconsole.log(validateStudentPayload({ name: "Ali", email: "ali@codeverse.uz" }));`,
        },
        challenge: {
          prompt: {
            en: 'Write validatePort(port) returning true if port is an integer between 1024 and 65535, else false. Log validatePort(3000) + " " + validatePort(80).',
            uz: 'validatePort(port) yozing: port 1024..65535 oralig‘ida butun son bo‘lsa true, aks holda false. Natija: "true false".',
          },
          language: 'javascript',
          starterCode: `function validatePort(port) {\n  // Check Number.isInteger and range\n  return false;\n}\n\nconsole.log(validatePort(3000) + " " + validatePort(80));`,
          expectedOutputIncludes: 'true false',
          hint: {
            en: 'return Number.isInteger(port) && port >= 1024 && port <= 65535;',
            uz: 'return Number.isInteger(port) && port >= 1024 && port <= 65535;',
          },
        },
      },
      {
        id: 'cloud-2',
        order: 2,
        title: {
          en: 'Server-Side Secrets & API Proxy Pattern',
          uz: 'Server Tomonidagi Maxfiy Kalitlar va Proxy Usuli',
        },
        durationMinutes: 25,
        summary: {
          en: 'Why GEMINI_API_KEY lives strictly inside Node.js process.env.',
          uz: 'Nima uchun GEMINI_API_KEY faqat Node.js server muhitida saqlanishi shart.',
        },
        content: [
          {
            en: 'Any variable bundled into browser JavaScript can be inspected by anyone opening DevTools. Therefore, production platforms place third-party keys like GEMINI_API_KEY in server environment variables and expose focused /api/* routes.',
            uz: 'Brauzer JavaScript kodiga qo‘shilgan har qanday o‘zgaruvchini DevTools orqali hamma ko‘ra oladi. Shu sababli GEMINI_API_KEY kabi kalitlar faqat server muhitida saqlanadi va frontend /api/* yo‘nalishlari orqali muloqot qiladi.',
          },
          {
            en: 'This proxy pattern also lets the server enforce rate limits, sanitize prompts, and log usage metrics cleanly.',
            uz: 'Bu usul serverga so‘rovlar sonini cheklash, promptlarni tekshirish va xarajat hisobini yuritish imkonini ham beradi.',
          },
        ],
        codeExample: {
          language: 'javascript',
          caption: {
            en: 'Checking environment readiness safely on boot',
            uz: 'Server ishga tushganda muhit kalitini tekshirish',
          },
          code: `function checkEnvConfig(env) {\n  const port = Number(env.PORT || 3000);\n  const hasGemini = Boolean(env.GEMINI_API_KEY);\n  return { port, geminiReady: hasGemini };\n}\n\nconsole.log(JSON.stringify(checkEnvConfig({ PORT: "3000", GEMINI_API_KEY: "configured" })));`,
        },
        challenge: {
          prompt: {
            en: 'Mask an API key keeping only the first 4 characters and replacing the rest with "***". Test with "AIza123456" -> "AIza***".',
            uz: 'API kalitning faqat birinchi 4 ta belgisini qoldirib, qolganini "***" ga almashtiring. "AIza123456" -> "AIza***".',
          },
          language: 'javascript',
          starterCode: `function maskKey(key) {\n  // Return first 4 chars + "***"\n  return "***";\n}\n\nconsole.log(maskKey("AIza123456"));`,
          expectedOutputIncludes: 'AIza***',
          hint: {
            en: 'return key.slice(0, 4) + "***";',
            uz: 'return key.slice(0, 4) + "***";',
          },
        },
      },
      {
        id: 'cloud-3',
        order: 3,
        title: {
          en: 'Stateless Containers & Google Cloud Run',
          uz: 'Stateless Konteynerlar va Google Cloud Run',
        },
        durationMinutes: 30,
        summary: {
          en: 'Listen on process.env.PORT and scale automatically from zero to thousands.',
          uz: 'process.env.PORT ni tinglash va noldan minglab foydalanuvchigacha avtomatik kengayish.',
        },
        content: [
          {
            en: 'Google Cloud Run executes stateless HTTP containers on demand. When no students are online at 3 AM in Tashkent, Cloud Run scales instances down to zero—meaning you pay $0 for idle compute.',
            uz: 'Google Cloud Run so‘rov kelgandagina ishga tushadigan stateless konteynerlarni boshqaradi. Toshkent vaqti bilan tungi soat 3 da foydalanuvchi bo‘lmasa, tizim nol nusxagacha tushadi va bo‘sh turgan vaqt uchun $0 to‘laysiz.',
          },
          {
            en: 'Every Cloud Run service must bind to 0.0.0.0 on the port specified by process.env.PORT (3000 in AI Studio preview, 8080 default in standard Cloud Run).',
            uz: 'Har bir Cloud Run xizmati 0.0.0.0 manzilida process.env.PORT ko‘rsatgan portni tinglashi kerak.',
          },
        ],
        codeExample: {
          language: 'javascript',
          caption: {
            en: 'Calculating Cloud Run free-tier remaining requests',
            uz: 'Cloud Run bepul so‘rov limitini hisoblash',
          },
          code: `const FREE_REQUESTS_PER_MONTH = 2_000_000;\nconst monthlyStudents = 1200;\nconst avgRequestsPerStudent = 450;\nconst used = monthlyStudents * avgRequestsPerStudent;\n\nconsole.log("Remaining free requests:", FREE_REQUESTS_PER_MONTH - used);`,
        },
        challenge: {
          prompt: {
            en: 'Compute total requests for 500 students * 300 requests each and print "Within Free Tier: true" if <= 2000000.',
            uz: '500 talaba * 300 so‘rov uchun jami so‘rovni hisoblang va <= 2000000 bo‘lsa "Within Free Tier: true" chiqaring.',
          },
          language: 'javascript',
          starterCode: `const students = 500;\nconst reqPerStudent = 300;\nconst total = 0;\nconst withinFree = false;\nconsole.log("Within Free Tier:", withinFree);`,
          expectedOutputIncludes: 'Within Free Tier: true',
          hint: {
            en: 'const total = students * reqPerStudent; const withinFree = total <= 2_000_000;',
            uz: 'const total = students * reqPerStudent; const withinFree = total <= 2_000_000;',
          },
        },
      },
      {
        id: 'cloud-4',
        order: 4,
        title: {
          en: 'Rate Limiting & Usage-Based Cost Guardrails',
          uz: 'So‘rovlarni Cheklash va Xarajat Nazorati',
        },
        durationMinutes: 25,
        summary: {
          en: 'Protect free-tier student platforms against runaway loops and abuse.',
          uz: 'Bepul ta’lim platformalarini ortiqcha so‘rovlar va kutilmagan xarajatlardan himoyalash.',
        },
        content: [
          {
            en: 'Even on generous free tiers, an accidental infinite useEffect loop can exhaust daily API quotas in minutes. Implementing per-user request throttling and payload size limits keeps your education platform sustainable.',
            uz: 'Bepul limitlar katta bo‘lsa ham, tasodifiy cheksiz sikl kunlik kvotani bir necha daqiqada tugatishi mumkin. Har bir foydalanuvchi uchun so‘rov cheklovlari va matn hajmi limitlari tizim barqarorligini ta’minlaydi.',
          },
        ],
        codeExample: {
          language: 'javascript',
          caption: {
            en: 'Simple sliding-window quota check',
            uz: 'Oddiy so‘rov limiti tekshiruvi',
          },
          code: `function canMakeRequest(usedToday, dailyLimit = 50) {\n  return usedToday < dailyLimit;\n}\nconsole.log("Allowed:", canMakeRequest(12, 50));`,
        },
        challenge: {
          prompt: {
            en: 'Truncate long prompts over 200 chars safely. Test with "a".repeat(250) and print the final length (expected: "Length: 200").',
            uz: '200 belgidan uzun matnlarni qisqartiring. "a".repeat(250) bilan tekshirib "Length: 200" chiqaring.',
          },
          language: 'javascript',
          starterCode: `function capPrompt(text, maxLen = 200) {\n  // Return truncated string\n  return text;\n}\n\nconsole.log("Length:", capPrompt("a".repeat(250)).length);`,
          expectedOutputIncludes: 'Length: 200',
          hint: {
            en: 'return text.length > maxLen ? text.slice(0, maxLen) : text;',
            uz: 'return text.length > maxLen ? text.slice(0, maxLen) : text;',
          },
        },
      },
    ],
    quiz: [
      {
        id: 'cloud-q1',
        question: {
          en: 'How many monthly requests are included in Google Cloud Run’s always-free tier?',
          uz: 'Google Cloud Run bepul tarifi oyiga nechta so‘rovni o‘z ichiga oladi?',
        },
        options: [
          { en: '50,000 requests', uz: '50 000 ta so‘rov' },
          { en: '2,000,000 requests', uz: '2 000 000 ta so‘rov' },
          { en: '100 requests', uz: '100 ta so‘rov' },
          { en: 'Unlimited with zero limits', uz: 'Cheklovsiz' },
        ],
        correctIndex: 1,
        explanation: {
          en: 'Google Cloud Run offers 2 million requests per month (plus 180,000 vCPU-seconds and 360,000 GiB-seconds) in its free tier.',
          uz: 'Google Cloud Run bepul tarifiga oyiga 2 million so‘rov va 180 000 vCPU-soniya kiradi.',
        },
      },
      {
        id: 'cloud-q2',
        question: {
          en: 'Why should GEMINI_API_KEY never be placed in client-side React components?',
          uz: 'Nima uchun GEMINI_API_KEY ni React mijoz kodida ishlatib bo‘lmaydi?',
        },
        options: [
          { en: 'React does not support strings', uz: 'React satrlarni qo‘llab-quvvatlamaydi' },
          { en: 'Client bundles are visible to every visitor in browser DevTools', uz: 'Brauzer kodini har qanday foydalanuvchi DevTools da ko‘ra oladi' },
          { en: 'Node.js forbids HTTPS calls', uz: 'Node.js HTTPS so‘rovlarini taqiqlaydi' },
          { en: 'Keys expire every 5 seconds in browsers', uz: 'Brauzerda kalitlar 5 soniyada tugaydi' },
        ],
        correctIndex: 1,
        explanation: {
          en: 'Everything sent to the browser is public. Server-side Express proxy routes keep secrets safe in process.env.',
          uz: 'Brauzerga yuborilgan barcha kod ochiq hisoblanadi. Server proxy kalitni maxfiy saqlaydi.',
        },
      },
      {
        id: 'cloud-q3',
        question: {
          en: 'What does "scale to zero" mean on Google Cloud Run?',
          uz: 'Google Cloud Run da "scale to zero" nimani anglatadi?',
        },
        options: [
          { en: 'The app deletes its database at midnight', uz: 'Ilova yarim tunda bazani o‘chiradi' },
          { en: 'No container instances run or incur compute charges when there is no traffic', uz: 'Trafik bo‘lmaganda konteynerlar to‘xtaydi va hisob-kitob uchun haq olinmaydi' },
          { en: 'All responses return HTTP 0', uz: 'Barcha javoblar HTTP 0 qaytaradi' },
          { en: 'CPU speed drops to 0 Hz permanently', uz: 'Protsessor doimiy o‘chiriladi' },
        ],
        correctIndex: 1,
        explanation: {
          en: 'Cloud Run spins down idle containers when traffic stops and cold-starts them automatically on the next request.',
          uz: 'So‘rovlar to‘xtaganda konteynerlar o‘chiriladi va yangi so‘rov kelganda avtomatik ishga tushadi.',
        },
      },
    ],
  },
  {
    id: 'ai-gemini',
    slug: 'ai-gemini',
    title: {
      en: 'Applied AI & Gemini Engineering',
      uz: 'Amaliy AI va Gemini Muhandisligi',
    },
    subtitle: {
      en: 'Structured JSON outputs, system instructions, and bilingual AI tutors',
      uz: 'Tuzilgan JSON javoblar, tizim ko‘rsatmalari va ikki tilli AI ustozlar',
    },
    description: {
      en: 'Build production AI features using the official @google/genai SDK. Learn how to enforce deterministic JSON schemas, design pedagogical system prompts in Uzbek and English, and evaluate code safely.',
      uz: 'Rasmiy @google/genai SDK yordamida haqiqiy AI funksiyalarini yarating. Qat’iy JSON sxemalar, o‘zbek va ingliz tillarida pedagogik promptlar tuzish va kodni tahlil qilishni o‘rganing.',
    },
    difficulty: 'Advanced',
    hours: 6,
    image: '/src/assets/images/track_ai_gemini_1795066067899.jpg',
    technologies: ['@google/genai', 'gemini-4-hydrogen', 'JSON Schema', 'AI UX'],
    outcomes: [
      {
        en: 'Use GoogleGenAI on Node.js servers with systemInstruction',
        uz: 'Node.js serverida GoogleGenAI va systemInstruction dan foydalanish',
      },
      {
        en: 'Enforce strict responseSchema types for reliable UI rendering',
        uz: 'Interfeys uchun ishonchli responseSchema JSON javoblarini olish',
      },
      {
        en: 'Build Socratic bilingual coding mentors that guide without spoiling answers',
        uz: 'Javobni tayyor bermasdan fikrlashga yo‘naltiradigan AI ustoz yaratish',
      },
    ],
    lessons: [
      {
        id: 'ai-1',
        order: 1,
        title: {
          en: 'Pedagogical System Instructions for Uzbek Learners',
          uz: 'O‘zbek talabalar uchun Pedagogik Tizim Ko‘rsatmalari',
        },
        durationMinutes: 25,
        summary: {
          en: 'Shape model tone, language fluency, and step-by-step teaching style.',
          uz: 'Model ohangi, til ravonligi va bosqichma-bosqich o‘qitish uslubini sozlash.',
        },
        content: [
          {
            en: 'A raw LLM often dumps overwhelming walls of text or simply solves homework outright. By supplying a clear systemInstruction in ai.models.generateContent, you turn the model into a patient mentor that explains concepts clearly in Uzbek or English.',
            uz: 'Oddiy AI ko‘pincha uzun matn chiqaradi yoki vazifani tayyor yechib beradi. systemInstruction orqali modelni o‘zbek yoki ingliz tilida sabr bilan tushuntiradigan ustozga aylantirish mumkin.',
          },
          {
            en: 'Always specify output structure, audience skill level, and whether technical terms like "array" or "closure" should be paired with Uzbek explanations.',
            uz: 'Har doim javob tuzilishi, talaba darajasi va texnik atamalarni o‘zbekcha izoh bilan berish kerakligini ko‘rsating.',
          },
        ],
        codeExample: {
          language: 'javascript',
          caption: {
            en: 'Building a bilingual tutor system instruction',
            uz: 'Ikki tilli ustoz ko‘rsatmasini tuzish',
          },
          code: `function buildSystemPrompt(lang, track) {\n  const langRule = lang === "uz"\n    ? "Respond in clear Uzbek using modern Latin script."\n    : "Respond in clear, concise English.";\n  return \`You are the CODEVERSE AI Mentor for \${track}. \${langRule}\`;\n}\n\nconsole.log(buildSystemPrompt("uz", "Python Foundations"));`,
        },
        challenge: {
          prompt: {
            en: 'Complete formatTutorConfig(model, level) returning JSON string with model and thinkingLevel. Expected output includes "gemini-4-hydrogen".',
            uz: 'formatTutorConfig(model, level) funksiyasini yakunlang va natija ichida "gemini-4-hydrogen" bo‘lsin.',
          },
          language: 'javascript',
          starterCode: `function formatTutorConfig(model, level) {\n  return JSON.stringify({ model, thinkingConfig: { thinkingLevel: level } });\n}\n\nconsole.log(formatTutorConfig("gemini-4-hydrogen", "LOW"));`,
          expectedOutputIncludes: 'gemini-4-hydrogen',
          hint: {
            en: 'Click Run & Verify Code to test the structured config builder!',
            uz: 'Kodni ishga tushirish tugmasini bosib tekshiring!',
          },
        },
      },
      {
        id: 'ai-2',
        order: 2,
        title: {
          en: 'Structured JSON Outputs with responseSchema',
          uz: 'responseSchema orqali Tuzilgan JSON Javoblar',
        },
        durationMinutes: 30,
        summary: {
          en: 'Guarantee machine-parseable quiz questions and code reviews.',
          uz: 'Test savollari va kod tahlili uchun kafolatlangan JSON formatini oling.',
        },
        content: [
          {
            en: 'When an educational platform generates quizzes or automated code feedback, free-form markdown is brittle to parse. Setting responseMimeType: "application/json" alongside responseSchema forces Gemini to return exact typed keys.',
            uz: 'Ta’lim platformasi test yoki kod tahlili yaratganda oddiy matnni ajratib olish qiyin. responseMimeType: "application/json" va responseSchema esa aniq maydonlarga ega JSON qaytarilishini ta’minlaydi.',
          },
        ],
        codeExample: {
          language: 'javascript',
          caption: {
            en: 'Safely parsing structured AI quiz payloads',
            uz: 'AI test JSON javobini xavfsiz o‘qish',
          },
          code: `const raw = '{"question":"What is O(1)?","correctIndex":0}';\nconst parsed = JSON.parse(raw);\nconsole.log("Parsed question:", parsed.question);`,
        },
        challenge: {
          prompt: {
            en: 'Validate a parsed review object has summary and issues array. Print "Valid Review: true".',
            uz: 'Tahlil obyektida summary va issues massivi borligini tekshiring va "Valid Review: true" chiqaring.',
          },
          language: 'javascript',
          starterCode: `const review = { summary: "Clean loop", issues: [] };\nconst isValid = false; // Check typeof review.summary === "string" && Array.isArray(review.issues)\nconsole.log("Valid Review:", isValid);`,
          expectedOutputIncludes: 'Valid Review: true',
          hint: {
            en: 'const isValid = typeof review.summary === "string" && Array.isArray(review.issues);',
            uz: 'const isValid = typeof review.summary === "string" && Array.isArray(review.issues);',
          },
        },
      },
      {
        id: 'ai-3',
        order: 3,
        title: {
          en: 'Multi-Turn Chat Context & Token Budgets',
          uz: 'Ko‘p Bosqichli Suhbat Konteksti va Token Byudjeti',
        },
        durationMinutes: 25,
        summary: {
          en: 'Keep follow-up conversations coherent without blowing up token costs.',
          uz: 'Token xarajatini oshirmasdan suhbat davomiyligini saqlash.',
        },
        content: [
          {
            en: 'Each follow-up question in a chat sends prior turns back to the model. Capping conversation history to the most recent 10–12 turns keeps latency low (<2 seconds) and preserves free-tier token budgets.',
            uz: 'Har bir keyingi savolda oldingi xabarlar ham modelga yuboriladi. Suhbat tarixini oxirgi 10–12 ta xabar bilan cheklash javob tezligini oshiradi va token limitini tejaydi.',
          },
        ],
        codeExample: {
          language: 'javascript',
          caption: {
            en: 'Trimming chat history to the latest 10 turns',
            uz: 'Suhbat tarixini oxirgi 10 ta xabargacha qisqartirish',
          },
          code: `function trimHistory(messages, limit = 10) {\n  return messages.slice(-limit);\n}\nconsole.log("Kept:", trimHistory([1,2,3,4,5,6,7,8,9,10,11,12]).length);`,
        },
        challenge: {
          prompt: {
            en: 'Keep only the last 4 messages from a 7-message array and print "Kept: 4".',
            uz: '7 ta xabardan faqat oxirgi 4 tasini saqlab qoling va "Kept: 4" chiqaring.',
          },
          language: 'javascript',
          starterCode: `const history = ["m1", "m2", "m3", "m4", "m5", "m6", "m7"];\nconst recent = history; // Slice last 4\nconsole.log("Kept:", recent.length);`,
          expectedOutputIncludes: 'Kept: 4',
          hint: {
            en: 'const recent = history.slice(-4);',
            uz: 'const recent = history.slice(-4);',
          },
        },
      },
      {
        id: 'ai-4',
        order: 4,
        title: {
          en: 'AI Code Review Pipelines',
          uz: 'AI Kod Tekshiruvi Tizimlari',
        },
        durationMinutes: 30,
        summary: {
          en: 'Combine static execution output with Gemini reasoning for targeted feedback.',
          uz: 'Aniq xulosa olish uchun kod natijasi va Gemini tahlilini birlashtirish.',
        },
        content: [
          {
            en: 'The strongest AI coding mentors combine actual compiler/runtime output with LLM reasoning. Try this right now in CODEVERSE’s Playground tab by writing a function and clicking AI Code Review!',
            uz: 'Eng kuchli AI ustozlar haqiqiy kod natijasini model tahlili bilan birlashtiradi. Buni hoziroq CODEVERSE Kod Maydonida sinab ko‘rishingiz mumkin!',
          },
        ],
        codeExample: {
          language: 'python',
          caption: {
            en: 'Preparing a code-review payload',
            uz: 'Kod tahlili so‘rovini tayyorlash',
          },
          code: `payload = {\n    "language": "python",\n    "code": "def add(a, b): return a + b",\n    "goal": "Check edge cases"\n}\nprint("Ready for review:", payload["language"])`,
        },
        challenge: {
          prompt: {
            en: 'Print "Review ready for python" using the payload dictionary.',
            uz: 'payload lug‘atidan foydalanib "Review ready for python" deb chiqaring.',
          },
          language: 'python',
          starterCode: `payload = {"language": "python"}\n# Print formatted message\nprint("")`,
          expectedOutputIncludes: 'Review ready for python',
          hint: {
            en: 'print(f"Review ready for {payload[\'language\']}")',
            uz: 'print(f"Review ready for {payload[\'language\']}")',
          },
        },
      },
    ],
    quiz: [
      {
        id: 'ai-q1',
        question: {
          en: 'Which Gemini SDK property extracts the generated string from GenerateContentResponse?',
          uz: 'GenerateContentResponse obyektidan hosil bo‘lgan matnni qaysi xususiyat (property) oladi?',
        },
        options: [
          { en: 'response.text()', uz: 'response.text()' },
          { en: 'response.text', uz: 'response.text' },
          { en: 'response.getString()', uz: 'response.getString()' },
          { en: 'response.json()', uz: 'response.json()' },
        ],
        correctIndex: 1,
        explanation: {
          en: 'In @google/genai, response.text is a getter property, not a function call.',
          uz: '@google/genai kutubxonasida response.text funksiya emas, balki getter xususiyatidir.',
        },
      },
      {
        id: 'ai-q2',
        question: {
          en: 'Why use responseSchema together with responseMimeType: "application/json"?',
          uz: 'Nima uchun responseMimeType: "application/json" bilan birga responseSchema ishlatiladi?',
        },
        options: [
          { en: 'To make responses longer', uz: 'Javoblarni uzaytirish uchun' },
          { en: 'To guarantee exact JSON field names and types', uz: 'Aniq JSON maydon nomlari va turlarini kafolatlash uchun' },
          { en: 'To disable safety checks', uz: 'Xavfsizlikni o‘chirish uchun' },
          { en: 'To run Python inside CSS', uz: 'CSS ichida Python ishlatish uchun' },
        ],
        correctIndex: 1,
        explanation: {
          en: 'responseSchema constrains the model output to your TypeScript-compatible object structure.',
          uz: 'responseSchema model javobini siz belgilagan obyekt tuzilishiga qat’iy moslashtiradi.',
        },
      },
      {
        id: 'ai-q3',
        question: {
          en: 'How should multi-turn chat history be managed for low latency and predictable cost?',
          uz: 'Past kechikish va barqaror xarajat uchun suhbat tarixini qanday boshqarish kerak?',
        },
        options: [
          { en: 'Store infinite messages in every request', uz: 'Har so‘rovda cheksiz xabarlarni yuborish' },
          { en: 'Window history to the most recent turns', uz: 'Tarixni oxirgi kerakli xabarlargacha cheklash' },
          { en: 'Delete the user prompt before sending', uz: 'Foydalanuvchi savolini o‘chirib yuborish' },
          { en: 'Send binary images on every turn', uz: 'Har safar katta rasm yuborish' },
        ],
        correctIndex: 1,
        explanation: {
          en: 'Sliding window history preserves relevant context while bounding token consumption.',
          uz: 'Oxirgi xabarlarni saqlash kontekstni ushlab turadi va token sarfini cheklaydi.',
        },
      },
    ],
  },
];

export const COURSES: Course[] = [
  BASE_COURSES[0],
  CPP_COURSES[0],
  BASE_COURSES[1],
  BASE_COURSES[2],
  CPP_COURSES[1],
  BASE_COURSES[3],
];

export const STUDY_MATERIALS: StudyMaterial[] = LIBRARY_RESOURCES;

export const PLAYGROUND_TEMPLATES: Array<{
  id: string;
  label: string;
  language: 'javascript' | 'typescript' | 'python' | 'html' | 'cpp';
  code: string;
}> = [
  {
    id: 'tpl-cpp-vector',
    label: 'C++17 · Vector & Max Element',
    language: 'cpp',
    code: `#include <iostream>\n#include <vector>\nusing namespace std;\n\nint main() {\n    vector<int> scores = {84, 92, 78, 96, 89};\n    int best = scores[0];\n    int total = 0;\n    for (int s : scores) {\n        if (s > best) best = s;\n        total += s;\n    }\n    cout << "Best: " << best << " | Average: " << (total / (double)scores.size()) << "\\n";\n    return 0;\n}`,
  },
  {
    id: 'tpl-py-tashkent',
    label: 'Python · Tashkent GPA & Scholarship',
    language: 'python',
    code: `# CODEVERSE Python 3.11 Sandbox\nstudents = [\n    {"name": "Azizbek", "city": "Tashkent", "score": 94},\n    {"name": "Dilnoza", "city": "Samarkand", "score": 88},\n    {"name": "Bekzod", "city": "Fergana", "score": 97},\n]\n\nfor s in sorted(students, key=lambda x: x["score"], reverse=True):\n    tier = "Full Grant" if s["score"] >= 93 else "Partial Grant"\n    print(f"{s['name']} ({s['city']}) -> {s['score']} pts | {tier}")`,
  },
  {
    id: 'tpl-js-algo',
    label: 'JavaScript · Binary Search Benchmark',
    language: 'javascript',
    code: `// CODEVERSE JavaScript Sandbox\nfunction binarySearch(arr, target) {\n  let left = 0;\n  let right = arr.length - 1;\n  let steps = 0;\n\n  while (left <= right) {\n    steps++;\n    const mid = Math.floor((left + right) / 2);\n    if (arr[mid] === target) return { index: mid, steps };\n    if (arr[mid] < target) left = mid + 1;\n    else right = mid - 1;\n  }\n  return { index: -1, steps };\n}\n\nconst sortedIds = Array.from({ length: 10000 }, (_, i) => i * 2);\nconsole.log("Found:", binarySearch(sortedIds, 14880));`,
  },
  {
    id: 'tpl-ts-cart',
    label: 'TypeScript · UZS Cart Calculator',
    language: 'typescript',
    code: `// CODEVERSE TypeScript Sandbox\ninterface CartItem {\n  title: string;\n  priceUzs: number;\n  qty: number;\n}\n\nconst cart: CartItem[] = [\n  { title: "Clean Code Handbook", priceUzs: 140000, qty: 1 },\n  { title: "Algorithm Notebook", priceUzs: 45000, qty: 2 },\n];\n\nconst subtotal = cart.reduce((acc, item) => acc + item.priceUzs * item.qty, 0);\nconsole.log("Cart items:", cart.length);\nconsole.log("Subtotal:", subtotal.toLocaleString("en-US"), "UZS");`,
  },
  {
    id: 'tpl-html-card',
    label: 'HTML/CSS · CODEVERSE UI Card',
    language: 'html',
    code: `<!doctype html>
<html>
<head>
  <style>
    body {
      margin: 0;
      min-height: 100vh;
      display: grid;
      place-items: center;
      background: #060B1A;
      font-family: system-ui, sans-serif;
      color: #F8FAFC;
    }
    .card {
      width: 320px;
      padding: 24px;
      border-radius: 12px;
      background: #101B3B;
      border: 1px solid rgba(56, 189, 248, 0.25);
    }
    .kicker { font-size: 12px; color: #38BDF8; margin-bottom: 8px; }
    h2 { margin: 0 0 8px; font-size: 20px; }
    p { margin: 0 0 18px; color: #94A3B8; font-size: 14px; line-height: 1.5; }
    button {
      background: #2563EB;
      color: white;
      border: 0;
      padding: 10px 16px;
      border-radius: 8px;
      font-weight: 600;
      cursor: pointer;
    }
  </style>
</head>
<body>
  <div class="card">
    <div class="kicker">CODEVERSE · Live Preview</div>
    <h2>Learn. Code. Create.</h2>
    <p>Edit this HTML and CSS to see your interface update immediately.</p>
    <button onclick="this.textContent = 'Clicked!'">Test Interaction</button>
  </div>
</body>
</html>`,
  },
];
