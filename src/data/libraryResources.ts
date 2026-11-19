import type { StudyMaterial } from '../types/codeverse';

export const LIBRARY_RESOURCES: StudyMaterial[] = [
  {
    id: 'mat-textbook-cpp',
    courseId: 'cpp-foundations',
    title: {
      en: 'CODEVERSE Textbook: Modern C++17 From Zero to Olympiad',
      uz: 'CODEVERSE Darslik: Noldan Olimpiadagacha Zamonaviy C++17',
    },
    category: 'Textbook',
    level: 'Elementary',
    author: 'CODEVERSE Engineering Faculty · Tashkent',
    readTime: '28 min read',
    format: 'Digital Textbook',
    chapters: [
      '1. Kiritish, chiqarish va o‘zgaruvchilar',
      '2. Butun sonlar (/ va %) hamda mantiqiy ifodalar',
      '3. Tarmoqlanish (if, switch) va Sikllar (for, while)',
      '4. Funksiyalar, Massivlar va 2D Matritsalar',
      '5. STL (vector, string, stack, queue) va Fayl oqimlari',
    ],
    description: {
      en: 'Complete structured C++17 textbook aligned with all 19 Masalalar collections (989 exercises), written in clear Uzbek Latin and English.',
      uz: 'Barcha 19 ta Masalalar bo‘limi (989 ta mashq) bilan bog‘langan to‘liq C++17 darsligi: o‘zgaruvchilar, sikllar, massivlar, STL va fayllar.',
    },
    content: {
      en: `# CODEVERSE C++17 Textbook\n\n## Chapter 1: Input, Output & Memory Types\nUse \`std::cin\` and \`std::cout\` with \`ios::sync_with_stdio(false); cin.tie(nullptr);\` for fast I/O.\n- \`int\`: 32-bit (-2×10⁹ to +2×10⁹)\n- \`long long\`: 64-bit (-9×10¹⁸ to +9×10¹⁸)\n- \`double\`: 64-bit IEEE-754 floating point (pair with \`fixed << setprecision(2)\`)\n\n## Chapter 2: Integer & Boolean Algebra\n- Last digit of \`n\`: \`n % 10\`\n- Drop last digit: \`n / 10\`\n- Divisibility check: \`a % b == 0\`\n\n## Chapter 3: Arrays, Vectors & Complexity\nPrefer \`std::vector<int>\` over raw C arrays. Pass read-only vectors using \`const vector<int>&\` to avoid O(n) copying.\n\n## Chapter 4: Recursion & Dynamic Structures\nAlways define a base case before recursive transitions. Use \`std::stack\` for LIFO parentheses/DFS problems and \`std::queue\` for FIFO BFS traversals.`,
      uz: `# CODEVERSE C++17 Darsligi\n\n## 1-bob: Kiritish, Chiqarish va Turlar\nTezkor kirish-chiqish uchun \`ios::sync_with_stdio(false); cin.tie(nullptr);\` ishlating.\n- \`int\`: 32-bit (-2×10⁹ dan +2×10⁹ gacha)\n- \`long long\`: 64-bit (katta ko‘paytmalar uchun xavfsiz)\n- \`double\`: haqiqiy sonlar (\`fixed << setprecision(2)\` bilan)\n\n## 2-bob: Butun Sonlar va Mantiq\n- Oxirgi raqam: \`n % 10\`\n- Oxirgi raqamni o‘chirish: \`n / 10\`\n- Bo‘linish tekshiruvi: \`a % b == 0\`\n\n## 3-bob: Massivlar, Matritsalar va Havolalar\nFunksiyalarga vektorlarni nusxa olmasdan uzatish uchun \`const vector<int>&\` dan foydalaning.\n\n## 4-bob: Rekursiya va Dinamik Tuzilmalar\nHar bir rekursiyada baza shartini aniq belgilang. Qavslar balansi uchun \`std::stack\`, navbatli algoritmlar uchun \`std::queue\` ishlating.`,
    },
  },
  {
    id: 'mat-textbook-python',
    courseId: 'python-foundations',
    title: {
      en: 'CODEVERSE Textbook: Python 3.11 & Algorithmic Problem Solving',
      uz: 'CODEVERSE Darslik: Python 3.11 va Algoritmik Masalalar Yechish',
    },
    category: 'Textbook',
    level: 'Beginner',
    author: 'CODEVERSE Curriculum Team',
    readTime: '22 min read',
    format: 'Digital Textbook',
    chapters: [
      '1. Python Types, Strings & f-strings',
      '2. Branching, Loops & Pure Functions',
      '3. Lists, Sets & Hash Dictionaries',
      '4. Binary Search & Time Complexity',
    ],
    description: {
      en: 'Beginner-friendly textbook covering Python 3.11 core syntax, data structures, and algorithmic analysis with Uzbek examples.',
      uz: 'Boshlang‘ich o‘rganuvchilar uchun Python 3.11 sintaksisi, ma’lumotlar tuzilmasi va algoritmik tahlil bo‘yicha to‘liq darslik.',
    },
    content: {
      en: `# Python 3.11 & Algorithmic Thinking Textbook\n\n## 1. Variables & Formatting\nPython variables bind names to objects dynamically. Use f-strings for readable formatting: \`f"{total:,} UZS"\`.\n\n## 2. Core Data Structures\n- \`list\`: ordered sequence, O(1) append, O(n) membership check.\n- \`dict\`: hash map, O(1) average lookup by key.\n- \`set\`: unique elements, O(1) membership check.\n\n## 3. Binary Search Template\n\`\`\`python\ndef binary_search(arr, target):\n    l, r = 0, len(arr) - 1\n    while l <= r:\n        m = (l + r) // 2\n        if arr[m] == target: return m\n        if arr[m] < target: l = m + 1\n        else: r = m - 1\n    return -1\n\`\`\``,
      uz: `# Python 3.11 va Algoritmik Fikrlash Darsligi\n\n## 1. O‘zgaruvchilar va Formatlash\nO‘zgaruvchilarni chiqarishda \`f"{total:,} UZS"\` kabi f-stringlardan foydalaning.\n\n## 2. Asosiy Ma’lumot Tuzilmalari\n- \`list\`: tartiblangan ro‘yxat, oxiriga qo‘shish O(1).\n- \`dict\`: kalit-qiymat jadvali, qidirish O(1).\n- \`set\`: takrorlanmas to‘plam, tekshirish O(1).\n\n## 3. Ikkilik Qidiruv Shablon Kodi\n\`\`\`python\ndef binary_search(arr, target):\n    l, r = 0, len(arr) - 1\n    while l <= r:\n        m = (l + r) // 2\n        if arr[m] == target: return m\n        if arr[m] < target: l = m + 1\n        else: r = m - 1\n    return -1\n\`\`\``,
    },
  },
  {
    id: 'mat-cambridge-9618',
    courseId: 'cpp-algorithms',
    title: {
      en: 'Cambridge AS & A Level Computer Science (9618) Complete Guide',
      uz: 'Cambridge AS & A Level Computer Science (9618) To‘liq Qo‘llanma',
    },
    category: 'Cambridge Resource',
    level: 'Upper-Intermediate',
    author: 'Cambridge CS Alignment Module',
    readTime: '24 min read',
    format: 'Exam Workbook',
    chapters: [
      'Paper 1: Data Representation, Binary/Hex & Logic Gates',
      'Paper 2: Cambridge Pseudocode, Trace Tables & Structured English',
      'Paper 3: Recursion, Abstract Data Types & OOP',
      'Paper 4: Practical Programming (Python & C++ Mapping)',
    ],
    description: {
      en: 'Official Cambridge 9618 syllabus alignment for Uzbek Presidential Schools & international CS students: pseudocode syntax, trace tables, ADTs, and Paper 4 coding.',
      uz: 'Prezident maktablari va xalqaro IT maktablari o‘quvchilari uchun Cambridge 9618 dasturi bo‘yicha qo‘llanma: psevdokod, trace table, ADT va Paper 4 amaliyoti.',
    },
    content: {
      en: `# Cambridge International AS & A Level CS (9618) Resource\n\n## 1. Cambridge Pseudocode Standard\n- Assignment uses \`<--\`: \`Total <-- 0\`\n- Output uses \`OUTPUT\`, Input uses \`INPUT\`\n- Loops: \`FOR Index <-- 1 TO 10 ... NEXT Index\`, \`WHILE Condition DO ... ENDWHILE\`, \`REPEAT ... UNTIL Condition\`\n- Arrays are 1-indexed by default in exams: \`DECLARE Scores : ARRAY[1:30] OF INTEGER\`\n\n## 2. Trace Table Discipline\nWrite columns for every variable, loop counter, condition check, and OUTPUT row-by-row as lines execute.\n\n## 3. Abstract Data Types (ADTs)\n- **Stack**: LIFO (\`TopPointer\`), push/pop boundary checks (\`Full\`, \`Empty\`).\n- **Queue**: Circular buffer (\`HeadPointer\`, \`TailPointer\`, \`NumberOfItems\`).\n- **Binary Tree**: \`LeftPointer\`, \`Data\`, \`RightPointer\` arrays for static-memory implementations.`,
      uz: `# Cambridge AS & A Level CS (9618) Imtihon Qo‘llanmasi\n\n## 1. Cambridge Psevdokod Qoidalari\n- Qiymat berish \`<--\` bilan yoziladi: \`Total <-- 0\`\n- Kiritish \`INPUT\`, chiqarish \`OUTPUT\`\n- Sikllar: \`FOR i <-- 1 TO 10 ... NEXT i\`, \`WHILE Shart DO ... ENDWHILE\`, \`REPEAT ... UNTIL Shart\`\n- Imtihon massivlari odatda 1-indeksdan boshlanadi: \`DECLARE A : ARRAY[1:30] OF INTEGER\`\n\n## 2. Trace Table (Kuzatuv Jadvali)\nHar bir o‘zgaruvchi va OUTPUT qiymatini qadamba-qadam jadval ustunlarida yozib boring.\n\n## 3. Abstrakt Ma’lumot Turlari (ADT)\n- **Stack**: LIFO tuzilma, to‘lish va bo‘shlik shartlarini tekshirish.\n- **Queue**: Halqasimon navbat (\`HeadPointer\`, \`TailPointer\`).\n- **Binary Tree**: \`LeftPointer\`, \`Data\`, \`RightPointer\` massivlari yordamida qurish.`,
    },
  },
  {
    id: 'mat-cambridge-igcse-0478',
    courseId: 'python-foundations',
    title: {
      en: 'Cambridge IGCSE Computer Science (0478) Algorithms & Logic Workbook',
      uz: 'Cambridge IGCSE Computer Science (0478) Algoritmlar va Mantiq Dafrati',
    },
    category: 'Cambridge Resource',
    level: 'Beginner',
    author: 'Cambridge IGCSE Alignment Module',
    readTime: '16 min read',
    format: 'Exam Workbook',
    chapters: [
      'Binary, Denary & Hexadecimal Conversions',
      'Boolean Logic Gates (AND, OR, NOT, NAND, NOR, XOR)',
      'Validation Checks (Range, Length, Type, Presence, Check Digit)',
      'Linear Search & Bubble Sort in Pseudocode',
    ],
    description: {
      en: 'Targeted Cambridge IGCSE 0478 Paper 1 & Paper 2 preparation: truth tables, validation rules, test data (Normal, Abnormal, Extreme, Boundary), and pseudocode.',
      uz: 'Cambridge IGCSE 0478 imtihonining 1- va 2-qismlari uchun tayyorgarlik: mantiqiy eshiklar, ma’lumot tekshiruvi, test turlari va psevdokod.',
    },
    content: {
      en: `# Cambridge IGCSE Computer Science (0478) Workbook\n\n## 1. Test Data Categories\nFor an accepted range \`1..100\`:\n- **Normal**: \`50\` (accepted)\n- **Boundary**: \`1\`, \`100\` (accepted), \`0\`, \`101\` (rejected)\n- **Extreme**: \`1\`, \`100\` (valid endpoints)\n- **Abnormal / Erroneous**: \`-5\`, \`"abc"\` (rejected)\n\n## 2. Validation vs Verification\n- **Validation**: Automated computer check that data is reasonable (Range, Length, Format, Presence, Type).\n- **Verification**: Checking data matches original source (Double Entry, Visual Check).\n\n## 3. Standard Algorithms\nPractice Linear Search, Bubble Sort (with early-exit \`Swapped\` flag), Totalling, and Counting.`,
      uz: `# Cambridge IGCSE (0478) Tayyorgarlik Qo‘llanmasi\n\n## 1. Test Ma’lumotlari Turlari (1..100 oralig‘i uchun)\n- **Normal**: \`50\` (qabul qilinadi)\n- **Boundary (Chegara)**: \`1\`, \`100\` (qabul) va \`0\`, \`101\` (rad)\n- **Extreme (Chekka)**: \`1\`, \`100\`\n- **Abnormal (Noto‘g‘ri)**: \`-5\`, \`"abc"\` (rad etiladi)\n\n## 2. Validation va Verification Farqi\n- **Validation**: Dastur ma’lumotning mantiqiy to‘g‘riligini tekshiradi (Oraliq, Uzunlik, Tur).\n- **Verification**: Ma’lumot asl manbaga mosligini tekshiradi (Ikki marta kiritish, Vizual tekshiruv).`,
    },
  },
  {
    id: 'mat-py-cheatsheet',
    courseId: 'python-foundations',
    title: {
      en: 'Python 3.11 Core Syntax & Data Structures Reference',
      uz: 'Python 3.11 Asosiy Sintaksis va Ma’lumotlar Tuzilmasi Qo‘llanmasi',
    },
    category: 'Cheat Sheet',
    level: 'Beginner',
    readTime: '6 min read',
    format: 'Markdown Guide',
    description: {
      en: 'Quick reference for lists, dicts, sets, list comprehensions, f-strings, and Big-O lookup speeds.',
      uz: 'Ro‘yxatlar, lug‘atlar, to‘plamlar, f-stringlar va Big-O tezliklari bo‘yicha tezkor ma’lumotnoma.',
    },
    content: {
      en: `# Python 3.11 Quick Reference (CODEVERSE)\n\n## 1. Core Collections\n- **List** \`items = [1, 2, 3]\` — Ordered, mutable, O(1) append, O(n) search.\n- **Dictionary** \`user = {"name": "Azizbek", "city": "Tashkent"}\` — Key-value hash map, O(1) lookup.\n- **Set** \`tags = {"python", "ai"}\` — Unique unordered values, O(1) membership test.\n\n## 2. Clean Formatting\n\`\`\`python\nprice = 125000\nprint(f"Price: {price:,} UZS")\n\`\`\`\n\n## 3. List Comprehension\n\`\`\`python\nevens = [x for x in range(20) if x % 2 == 0]\n\`\`\``,
      uz: `# Python 3.11 Tezkor Qo‘llanma (CODEVERSE)\n\n## 1. Asosiy Tuzilmalar\n- **Ro‘yxat (List)** \`items = [1, 2, 3]\` — Tartiblangan, o‘zgaruvchan, oxiriga qo‘shish O(1).\n- **Lug‘at (Dict)** \`user = {"name": "Azizbek", "city": "Tashkent"}\` — Kalit-qiymat juftligi, qidirish O(1).\n- **To‘plam (Set)** \`tags = {"python", "ai"}\` — Takrorlanmas elementlar, tekshirish O(1).\n\n## 2. Qulay Formatlash\n\`\`\`python\nprice = 125000\nprint(f"Narxi: {price:,} so‘m")\n\`\`\`\n\n## 3. List Comprehension\n\`\`\`python\njuftlar = [x for x in range(20) if x % 2 == 0]\n\`\`\``,
    },
  },
  {
    id: 'mat-algo-bigo',
    courseId: 'cpp-algorithms',
    title: {
      en: 'Big-O Complexity & Interview Algorithm Patterns',
      uz: 'Big-O Murakkabligi va Suhbat Algoritmlari',
    },
    category: 'Algorithm Reference',
    level: 'Upper-Intermediate',
    readTime: '8 min read',
    format: 'Markdown Guide',
    description: {
      en: 'Master O(1), O(log n), O(n), and O(n log n) trade-offs with binary search and two-pointer templates.',
      uz: 'O(1), O(log n), O(n) va ikkilik qidiruv hamda ikki ko‘rsatkich (two-pointer) shablonlarini o‘rganing.',
    },
    content: {
      en: `# Big-O Complexity Guide\n\n| Complexity | Example | 1,000,000 items |\n|---|---|---|\n| O(1) | Dict / array index lookup | 1 step |\n| O(log n) | Binary Search | ~20 steps |\n| O(n) | Single loop scan | 1,000,000 steps |\n| O(n log n) | std::sort / MergeSort | ~20,000,000 steps |\n\nTip: When an interview problem mentions a **sorted array**, immediately consider Binary Search or Two Pointers.`,
      uz: `# Big-O Murakkablik Jadvali\n\n| Murakkablik | Misol | 1 000 000 element |\n|---|---|---|\n| O(1) | Massiv indeksi / Lug‘at | 1 qadam |\n| O(log n) | Ikkilik qidiruv | ~20 qadam |\n| O(n) | Bitta sikl | 1 000 000 qadam |\n| O(n log n) | std::sort / MergeSort | ~20 000 000 qadam |\n\nMaslahat: Agar masalada **saralangan massiv** berilgan bo‘lsa, darhol Binary Search yoki Two Pointers usulini o‘ylang.`,
    },
  },
  {
    id: 'mat-cloud-run',
    courseId: 'backend-cloud',
    title: {
      en: 'Google Cloud Run Free-Tier Deployment Checklist',
      uz: 'Google Cloud Run Bepul Tarifda Joylashtirish Ro‘yxati',
    },
    category: 'Architecture Guide',
    level: 'Intermediate',
    readTime: '5 min read',
    format: 'Checklist',
    description: {
      en: 'Step-by-step production readiness checklist for Node.js + Express services on Cloud Run.',
      uz: 'Node.js + Express ilovalarini Cloud Run da xavfsiz ishga tushirish bo‘yicha qo‘llanma.',
    },
    content: {
      en: `# Cloud Run Checklist\n\n1. Bind Express to \`0.0.0.0\` and \`process.env.PORT || 3000\`.\n2. Store \`GEMINI_API_KEY\` in Secret Manager / Environment Secrets—never in frontend code.\n3. Keep \`min-instances = 0\` so idle time costs $0.\n4. Stay within Free Tier: 2M requests/month, 180k vCPU-seconds, 360k GiB-seconds.\n5. Configure health endpoint \`GET /api/health\`.`,
      uz: `# Cloud Run Tekshiruv Ro‘yxati\n\n1. Serverni \`0.0.0.0\` va \`process.env.PORT || 3000\` portiga ulang.\n2. \`GEMINI_API_KEY\` ni faqat server muhitida saqlang.\n3. \`min-instances = 0\` qoldiring — trafik yo‘q paytda $0 xarajat.\n4. Bepul limit: oyiga 2M so‘rov, 180k vCPU-soniya, 360k GiB-soniya.\n5. \`GET /api/health\` tekshiruv nuqtasini qo‘shing.`,
    },
  },
  {
    id: 'mat-uz-interview',
    courseId: 'web-engineering',
    title: {
      en: 'Junior Developer Interview Prep (Tashkent & Remote)',
      uz: 'Junior Dasturchi Suhbatiga Tayyorgarlik (Toshkent va Masofaviy)',
    },
    category: 'Interview Prep',
    level: 'Intermediate',
    readTime: '9 min read',
    format: 'Study Guide',
    description: {
      en: 'Top 12 technical concepts asked by Uzbekistan fintechs, IT Park companies, and remote teams.',
      uz: 'O‘zbekiston fintex kompaniyalari, IT Park rezidentlari va xorijiy jamoalarda eng ko‘p beriladigan 12 savol.',
    },
    content: {
      en: `# Interview Prep Checklist\n\n1. Explain HTTP methods (GET, POST, PUT, PATCH, DELETE) & status codes (200, 201, 400, 401, 404, 500).\n2. Event Loop: Call Stack vs Microtask Queue (Promises) vs Macrotask Queue.\n3. C++ stack vs heap memory and pass-by-reference vs pass-by-value.\n4. Python Mutable vs Immutable types (list vs tuple).\n5. How to secure API keys and validate user input on the backend.`,
      uz: `# Texnik Suhbatga Tayyorgarlik\n\n1. HTTP metodlar (GET, POST, PUT, PATCH, DELETE) va status kodlari (200, 201, 400, 401, 404, 500).\n2. Event Loop: Call Stack, Microtask (Promise) va Macrotask navbatlari.\n3. C++ da stek va heap xotirasi hamda havola (&) orqali uzatish.\n4. Python da o‘zgaruvchan (list) va o‘zgarmas (tuple) turlar farqi.\n5. API kalitlarni himoyalash va backend tekshiruvlari.`,
    },
  },
];
