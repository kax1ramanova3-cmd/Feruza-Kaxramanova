import type { Course } from '../types/codeverse';

export const CPP_COURSES: Course[] = [
  {
    id: 'cpp-foundations',
    slug: 'cpp-foundations',
    title: {
      en: 'C++17 Core Programming & Control Flow',
      uz: 'C++17 Asosiy Dasturlash va Boshqaruv Operatorlari',
    },
    subtitle: {
      en: 'Elementary C++17: cin/cout streams, integer arithmetic, conditions, and loops',
      uz: 'Elementary C++17: cin/cout oqimlari, butun sonlar arifmetikasi, shartlar va sikllar',
    },
    description: {
      en: 'Build rock-solid C++17 foundations before tackling the 989 Masalalar collections. Practice variables, precision formatting, modulo arithmetic, switch-case, and for/while loops with real g++ compilation.',
      uz: '989 ta C++ Masalalar to‘plamini yechishdan oldin C++17 asoslarini mukammal egallang. O‘zgaruvchilar, aniqlik bilan chiqarish, bo‘lish qoldig‘i, shart va sikllarni haqiqiy g++ kompilyatorida mashq qiling.',
    },
    difficulty: 'Elementary',
    hours: 8,
    image: '/src/assets/images/track_python_foundations_1795066067384.jpg',
    technologies: ['C++17', 'g++ Compiler', 'STL I/O', 'Loops'],
    outcomes: [
      {
        en: 'Compile C++17 programs using std::cin, std::cout, and iomanip precision',
        uz: 'std::cin, std::cout va iomanip aniqlik formati bilan C++17 dasturlarini kompilyatsiya qilish',
      },
      {
        en: 'Avoid 32-bit integer overflow using long long for large calculations',
        uz: 'Katta hisob-kitoblarda long long yordamida to‘lib ketishning oldini olish',
      },
      {
        en: 'Write clean branching (if / switch) and iterative (for / while) algorithms',
        uz: 'Toza tarmoqlanish (if / switch) va sikl (for / while) algoritmlarini yozish',
      },
    ],
    lessons: [
      {
        id: 'cpp-1',
        order: 1,
        title: {
          en: 'C++17 Program Structure, Streams & Types',
          uz: 'C++17 Dastur Tuzilishi, Oqimlar va Ma’lumot Turlari',
        },
        durationMinutes: 25,
        summary: {
          en: 'Understand #include <iostream>, main(), int, long long, and double.',
          uz: '#include <iostream>, main(), int, long long va double turlarini o‘rganing.',
        },
        content: [
          {
            en: 'Every C++ executable begins at int main(). Unlike Python, C++ is statically typed: you declare variable types explicitly (int for 32-bit integers up to ~2e9, long long for 64-bit integers up to ~9e18, and double for floating-point numbers).',
            uz: 'Har bir C++ dasturi int main() funksiyasidan boshlanadi. Python dan farqli ravishda, C++ qat’iy tiplangan til: o‘zgaruvchi turini oldindan ko‘rsatasiz (int ~2 milliardgacha, long long 64-bitli katta butun sonlar, double haqiqiy sonlar uchun).',
          },
          {
            en: 'Using std::fixed and std::setprecision(2) from <iomanip> guarantees deterministic decimal output when solving Masalalar geometry and physics problems.',
            uz: '<iomanip> kutubxonasidagi fixed va setprecision(2) buyruqlari geometriya va fizika masalalarida verguldan keyin aniq raqamlar sonini chiqarishni kafolatlaydi.',
          },
        ],
        codeExample: {
          language: 'cpp',
          caption: {
            en: 'Reading two numbers and printing formatted area',
            uz: 'Ikki sonni o‘qib, formatlangan yuzani chiqarish',
          },
          code: `#include <iostream>\n#include <iomanip>\nusing namespace std;\n\nint main() {\n    double r = 4.0;\n    double area = 3.14159 * r * r;\n    cout << fixed << setprecision(2) << area << "\\n";\n    return 0;\n}`,
        },
        challenge: {
          prompt: {
            en: 'Read two integers a and b from input (sample: 12 8) and print their sum and product separated by a space: "20 96".',
            uz: 'Kirishdan ikki butun son a va b ni o‘qing (namuna: 12 8) va ularning yig‘indisi hamda ko‘paytmasini probel bilan chiqaring: "20 96".',
          },
          language: 'cpp',
          sampleInput: '12 8',
          starterCode: `#include <iostream>\nusing namespace std;\n\nint main() {\n    long long a, b;\n    cin >> a >> b;\n    // Print (a + b) and (a * b) separated by a space\n    cout << 0 << " " << 0 << "\\n";\n    return 0;\n}`,
          expectedOutputIncludes: '20 96',
          hint: {
            en: 'Replace the two 0s with (a + b) and (a * b).',
            uz: 'Ikkita 0 o‘rniga (a + b) va (a * b) ni yozing.',
          },
        },
      },
      {
        id: 'cpp-2',
        order: 2,
        title: {
          en: 'Integer Division (/), Modulo (%) & Digit Extraction',
          uz: 'Butun Bo‘lish (/), Qoldiq (%) va Raqamlarga Ajratish',
        },
        durationMinutes: 25,
        summary: {
          en: 'Master integer arithmetic used in the Integer1–Integer30 Masalalar set.',
          uz: 'Integer1–Integer30 masalalarida ishlatiladigan butun bo‘lish va qoldiq usullarini o‘rganing.',
        },
        content: [
          {
            en: 'In C++, dividing two integers (e.g. 29 / 10) truncates toward zero and produces 2, while 29 % 10 yields the remainder 9. Combining / and % extracts individual digits of any integer cleanly.',
            uz: 'C++ tilida ikkita butun sonni bo‘lish (masalan 29 / 10) kasr qismni tashlab yuboradi va 2 beradi, 29 % 10 esa 9 qoldiqni qaytaradi. / va % yordamida har qanday sonning raqamlarini ajratib olish mumkin.',
          },
          {
            en: 'For a 3-digit number n: hundreds = n / 100, tens = (n / 10) % 10, units = n % 10.',
            uz: 'Uch xonali n soni uchun: yuzlik = n / 100, o‘nlik = (n / 10) % 10, birlik = n % 10.',
          },
        ],
        codeExample: {
          language: 'cpp',
          caption: {
            en: 'Reversing a 2-digit number in C++',
            uz: 'Ikki xonali son raqamlarini almashtirish',
          },
          code: `#include <iostream>\nusing namespace std;\n\nint main() {\n    int n = 47;\n    int swapped = (n % 10) * 10 + (n / 10);\n    cout << swapped << "\\n"; // 74\n    return 0;\n}`,
        },
        challenge: {
          prompt: {
            en: 'Given a 3-digit integer n (sample: 358), print the sum of its digits ("16").',
            uz: 'Uch xonali n soni berilgan (namuna: 358). Uning raqamlari yig‘indisini chiqaring ("16").',
          },
          language: 'cpp',
          sampleInput: '358',
          starterCode: `#include <iostream>\nusing namespace std;\n\nint main() {\n    int n;\n    cin >> n;\n    int sum = 0;\n    // Compute sum of hundreds, tens, and units digits\n    cout << sum << "\\n";\n    return 0;\n}`,
          expectedOutputIncludes: '16',
          hint: {
            en: 'sum = (n / 100) + ((n / 10) % 10) + (n % 10);',
            uz: 'sum = (n / 100) + ((n / 10) % 10) + (n % 10);',
          },
        },
      },
      {
        id: 'cpp-3',
        order: 3,
        title: {
          en: 'Boolean Expressions, if-else & switch-case',
          uz: 'Mantiqiy Ifodalar, if-else va switch-case Operatorlari',
        },
        durationMinutes: 30,
        summary: {
          en: 'Write bug-free conditions with &&, ||, ! and multi-branch switch blocks.',
          uz: '&&, ||, ! operatorlari va switch-case konstruksiyasi bilan xatosiz shartlar yozing.',
        },
        content: [
          {
            en: 'C++ uses = for assignment and == for equality comparison. Combining comparisons like (a > 0 && b > 0) checks both conditions simultaneously, while || checks if at least one holds.',
            uz: 'C++ da = qiymat berish, == esa tenglikni tekshirish uchun ishlatiladi. (a > 0 && b > 0) bir vaqtda ikkala shartni, || esa kamida bittasini tekshiradi.',
          },
          {
            en: 'When dispatching on discrete integer options (days 1–7, months 1–12), switch-case is cleaner than chained if-else statements—just remember break after each case!',
            uz: 'Aniq butun sonli tanlovlar (hafta kunlari 1–7, oylar 1–12) uchun switch-case ancha qulay. Har bir case oxirida break yozishni unutmang.',
          },
        ],
        codeExample: {
          language: 'cpp',
          caption: {
            en: 'Checking leap year in C++17',
            uz: 'Kabisa yilini aniqlash',
          },
          code: `#include <iostream>\nusing namespace std;\n\nint main() {\n    int year = 2024;\n    bool isLeap = (year % 400 == 0) || (year % 4 == 0 && year % 100 != 0);\n    cout << (isLeap ? 366 : 365) << "\\n";\n    return 0;\n}`,
        },
        challenge: {
          prompt: {
            en: 'Read integer x (sample: 42). Print "JUFT" if x is even, else "TOQ".',
            uz: 'Butun son x ni o‘qing (namuna: 42). Juft bo‘lsa "JUFT", toq bo‘lsa "TOQ" deb chiqaring.',
          },
          language: 'cpp',
          sampleInput: '42',
          starterCode: `#include <iostream>\nusing namespace std;\n\nint main() {\n    int x;\n    cin >> x;\n    // Print JUFT or TOQ\n    \n    return 0;\n}`,
          expectedOutputIncludes: 'JUFT',
          hint: {
            en: 'if (x % 2 == 0) cout << "JUFT\\n"; else cout << "TOQ\\n";',
            uz: 'if (x % 2 == 0) cout << "JUFT\\n"; else cout << "TOQ\\n";',
          },
        },
      },
      {
        id: 'cpp-4',
        order: 4,
        title: {
          en: 'Loops (for, while) & Euclidean GCD',
          uz: 'Sikllar (for, while) va Evklid EKUB Algoritmi',
        },
        durationMinutes: 30,
        summary: {
          en: 'Iterate over ranges with for loops and solve unknown-step loops with while.',
          uz: 'for sikli bilan oraliqlarni aylanish va while bilan Evklid algoritmini yozish.',
        },
        content: [
          {
            en: 'Use a for loop when the iteration count is known beforehand (for (int i = 1; i <= n; ++i)). Use a while loop when repetition depends on a dynamic stopping condition, such as reducing a number by dividing by 10 or running Euclid’s GCD algorithm.',
            uz: 'Takrorlanish soni aniq bo‘lsa for siklidan, to‘xtash sharti dinamik bo‘lsa (masalan sonni 10 ga bo‘lib borish yoki Evklid EKUB algoritmi) while siklidan foydalaning.',
          },
        ],
        codeExample: {
          language: 'cpp',
          caption: {
            en: 'Computing GCD (EKUB) in O(log min(a, b))',
            uz: 'Evklid algoritmi bilan EKUB topish',
          },
          code: `#include <iostream>\nusing namespace std;\n\nint main() {\n    int a = 48, b = 18;\n    while (b != 0) {\n        int r = a % b;\n        a = b;\n        b = r;\n    }\n    cout << a << "\\n"; // 6\n    return 0;\n}`,
        },
        challenge: {
          prompt: {
            en: 'Read N (sample: 5) and compute the sum 1 + 2 + ... + N using a for loop ("15").',
            uz: 'N sonini o‘qing (namuna: 5) va for sikli orqali 1 + 2 + ... + N yig‘indisini chiqaring ("15").',
          },
          language: 'cpp',
          sampleInput: '5',
          starterCode: `#include <iostream>\nusing namespace std;\n\nint main() {\n    int n;\n    cin >> n;\n    long long sum = 0;\n    // Loop from 1 to n\n    cout << sum << "\\n";\n    return 0;\n}`,
          expectedOutputIncludes: '15',
          hint: {
            en: 'for (int i = 1; i <= n; ++i) sum += i;',
            uz: 'for (int i = 1; i <= n; ++i) sum += i;',
          },
        },
      },
    ],
    quiz: [
      {
        id: 'cpp-f-q1',
        question: {
          en: 'Which integer type should you choose in C++ when products may exceed 2,147,483,647?',
          uz: 'C++ da ko‘paytma 2 milliarddan oshishi mumkin bo‘lsa qaysi tur tanlanadi?',
        },
        options: [
          { en: 'short', uz: 'short' },
          { en: 'int', uz: 'int' },
          { en: 'long long', uz: 'long long' },
          { en: 'bool', uz: 'bool' },
        ],
        correctIndex: 2,
        explanation: {
          en: 'long long provides a 64-bit signed range up to ~9.22 × 10^18.',
          uz: 'long long 64-bitli bo‘lib, ~9.22 × 10^18 gacha qiymatlarni xavfsiz saqlaydi.',
        },
      },
      {
        id: 'cpp-f-q2',
        question: {
          en: 'What does 259 % 10 evaluate to in C++?',
          uz: 'C++ da 259 % 10 ifodasi qanday natija beradi?',
        },
        options: [
          { en: '25', uz: '25' },
          { en: '9', uz: '9' },
          { en: '25.9', uz: '25.9' },
          { en: '0', uz: '0' },
        ],
        correctIndex: 1,
        explanation: {
          en: 'The % operator returns the remainder of integer division: 259 = 25 * 10 + 9.',
          uz: '% operatori butun bo‘lish qoldig‘ini qaytaradi: 259 % 10 = 9.',
        },
      },
      {
        id: 'cpp-f-q3',
        question: {
          en: 'What happens if you omit break at the end of a switch case in C++?',
          uz: 'C++ da switch blokidagi case oxirida break yozilmasa nima bo‘ladi?',
        },
        options: [
          { en: 'Compilation fails immediately', uz: 'Dastur kompilyatsiya bo‘lmaydi' },
          { en: 'Execution falls through into the next case', uz: 'Bajarish keyingi case ga o‘tib ketadi (fall-through)' },
          { en: 'The loop restarts from case 0', uz: 'Sikl qaytadan boshlanadi' },
          { en: 'std::cout stops printing', uz: 'std::cout ishlamay qoladi' },
        ],
        correctIndex: 1,
        explanation: {
          en: 'Without break, C++ continues executing subsequent case branches until a break or closing brace.',
          uz: 'break bo‘lmasa, boshqaruv keyingi case bloklariga ham kirib ketadi.',
        },
      },
    ],
  },
  {
    id: 'cpp-algorithms',
    slug: 'cpp-algorithms',
    title: {
      en: 'C++17 Vectors, Matrices, Recursion & STL',
      uz: 'C++17 Vektorlar, Matritsalar, Rekursiya va STL',
    },
    subtitle: {
      en: 'Upper-Intermediate C++: std::vector, 2D grids, std::string, stack/queue, and file streams',
      uz: 'Upper-Intermediate C++: std::vector, 2D matritsalar, std::string, stek/navbat va fayl oqimlari',
    },
    description: {
      en: 'Level up to algorithmic problem solving in C++17. Master dynamic arrays, 2D matrices, std::string manipulation, recursive divide-and-conquer, STL containers (stack, queue), and file streams.',
      uz: 'C++17 da yuqori darajali algoritmik masalalarni yechishga o‘ting. Dinamik massivlar, 2D matritsalar, std::string, rekursiya, STL stek/navbat va fayllar bilan ishlashni o‘rganing.',
    },
    difficulty: 'Upper-Intermediate',
    hours: 10,
    image: '/src/assets/images/track_backend_cloud_1795066067982.jpg',
    technologies: ['std::vector', '2D Matrices', 'Recursion', 'STL Stack/Queue'],
    outcomes: [
      {
        en: 'Process 1D arrays and 2D matrices cleanly with std::vector and reference parameters',
        uz: 'std::vector va havola (&) parametrlari bilan 1D massiv va 2D matritsalarni qayta ishlash',
      },
      {
        en: 'Design recursive algorithms with clear base cases and memoization',
        uz: 'Aniq baza sharti va keshlash bilan rekursiv algoritmlar tuzish',
      },
      {
        en: 'Use std::stack, std::queue, and std::fstream for structured I/O',
        uz: 'std::stack, std::queue va fayl oqimlari bilan ishlash',
      },
    ],
    lessons: [
      {
        id: 'cpp-adv-1',
        order: 1,
        title: {
          en: 'std::vector, References (&) & Array Sliding Window',
          uz: 'std::vector, Havolalar (&) va Massivda Sirpanuvchi Oyna',
        },
        durationMinutes: 30,
        summary: {
          en: 'Pass large vectors by const reference without copying memory.',
          uz: 'Katta vektorlarni xotiradan nusxa olmasdan const havola orqali uzating.',
        },
        content: [
          {
            en: 'In C++, passing std::vector<int> by value copies every element—O(n) overhead per call! Passing by const vector<int>& gives read-only zero-copy access in O(1), while vector<int>& allows in-place modification.',
            uz: 'C++ da std::vector<int> ni qiymat bo‘yicha uzatish barcha elementlarni nusxalaydi. const vector<int>& esa nusxa olmasdan O(1) vaqtda o‘qish, vector<int>& esa joyida o‘zgartirish imkonini beradi.',
          },
        ],
        codeExample: {
          language: 'cpp',
          caption: {
            en: 'Finding maximum element using const reference',
            uz: 'const havola bilan maksimal elementni topish',
          },
          code: `#include <iostream>\n#include <vector>\nusing namespace std;\n\nint findMax(const vector<int>& a) {\n    int best = a[0];\n    for (int x : a) if (x > best) best = x;\n    return best;\n}\n\nint main() {\n    vector<int> nums = {4, 19, 7, 23, 11};\n    cout << findMax(nums) << "\\n";\n    return 0;\n}`,
        },
        challenge: {
          prompt: {
            en: 'Read N and N integers (sample: "5\\n3 8 2 10 4") and print how many are strictly greater than 4 ("2").',
            uz: 'N va N ta butun sonni o‘qing (namuna: "5\\n3 8 2 10 4") va 4 dan katta sonlar sonini chiqaring ("2").',
          },
          language: 'cpp',
          sampleInput: '5\n3 8 2 10 4',
          starterCode: `#include <iostream>\n#include <vector>\nusing namespace std;\n\nint main() {\n    int n;\n    cin >> n;\n    vector<int> a(n);\n    for (int i = 0; i < n; ++i) cin >> a[i];\n    int cnt = 0;\n    // Count elements > 4\n    cout << cnt << "\\n";\n    return 0;\n}`,
          expectedOutputIncludes: '2',
          hint: {
            en: 'for (int x : a) if (x > 4) cnt++;',
            uz: 'for (int x : a) if (x > 4) cnt++;',
          },
        },
      },
      {
        id: 'cpp-adv-2',
        order: 2,
        title: {
          en: '2D Matrices: Row Sums & Diagonal Traversal',
          uz: '2D Matritsalar: Qator Yig‘indilari va Diagonallar',
        },
        durationMinutes: 35,
        summary: {
          en: 'Master index invariants i == j (main diagonal) and i + j == n - 1 (secondary).',
          uz: 'Asosiy diagonal (i == j) va yordamchi diagonal (i + j == n - 1) indekslarini o‘zlashtiring.',
        },
        content: [
          {
            en: 'An N×M matrix is represented cleanly in C++ as vector<vector<int>> mat(n, vector<int>(m)). Main diagonal elements satisfy row == col, and secondary diagonal elements satisfy row + col == n - 1.',
            uz: 'N×M matritsa vector<vector<int>> mat(n, vector<int>(m)) shaklida yaratiladi. Asosiy diagonalda i == j, yordamchi diagonalda esa i + j == n - 1 sharti bajariladi.',
          },
        ],
        codeExample: {
          language: 'cpp',
          caption: {
            en: 'Main diagonal trace of a square matrix',
            uz: 'Kvadrat matritsa asosiy diagonali yig‘indisi',
          },
          code: `#include <iostream>\n#include <vector>\nusing namespace std;\n\nint main() {\n    vector<vector<int>> m = {{1, 2, 3}, {4, 5, 6}, {7, 8, 9}};\n    int trace = 0;\n    for (int i = 0; i < 3; ++i) trace += m[i][i];\n    cout << trace << "\\n"; // 15\n    return 0;\n}`,
        },
        challenge: {
          prompt: {
            en: 'Read a 2x2 matrix (sample: "1 4\\n2 7") and print the sum of all 4 elements ("14").',
            uz: '2x2 matritsani o‘qing (namuna: "1 4\\n2 7") va barcha 4 element yig‘indisini chiqaring ("14").',
          },
          language: 'cpp',
          sampleInput: '1 4\n2 7',
          starterCode: `#include <iostream>\n#include <vector>\nusing namespace std;\n\nint main() {\n    int sum = 0;\n    // Read 2x2 matrix and compute sum\n    cout << sum << "\\n";\n    return 0;\n}`,
          expectedOutputIncludes: '14',
          hint: {
            en: 'Nested loops i = 0..1, j = 0..1 reading x into sum += x.',
            uz: 'Ichma-ich sikllarda 4 ta sonni o‘qib sum += x qiling.',
          },
        },
      },
      {
        id: 'cpp-adv-3',
        order: 3,
        title: {
          en: 'Recursion & Balanced Brackets with std::stack',
          uz: 'Rekursiya va std::stack Bilan Qavslar Balansi',
        },
        durationMinutes: 35,
        summary: {
          en: 'Solve recursive subproblems and LIFO stack verification in C++17.',
          uz: 'Rekursiv masalalar va LIFO stek tekshiruvini C++17 da amalga oshiring.',
        },
        content: [
          {
            en: 'Every recursive function needs a terminating base case and a smaller subproblem step. Similarly, std::stack provides O(1) push, pop, and top operations—ideal for expression parsing and balanced parentheses checks.',
            uz: 'Har bir rekursiv funksiyada to‘xtash (baza) sharti va muammoni kichiklashtirish qadami bo‘lishi shart. std::stack esa O(1) tezlikda push, pop va top amallarini bajarib, qavslar balansini tekshirishda qo‘llaniladi.',
          },
        ],
        codeExample: {
          language: 'cpp',
          caption: {
            en: 'Recursive fast power a^b in O(log b)',
            uz: 'Rekursiv tez darajaga ko‘tarish',
          },
          code: `#include <iostream>\nusing namespace std;\n\nlong long fastPow(long long a, long long b) {\n    if (b == 0) return 1;\n    long long half = fastPow(a, b / 2);\n    return (b % 2 == 0) ? half * half : half * half * a;\n}\n\nint main() {\n    cout << fastPow(2, 10) << "\\n"; // 1024\n    return 0;\n}`,
        },
        challenge: {
          prompt: {
            en: 'Implement recursive fib(n) (fib(0)=0, fib(1)=1) and print fib(7) ("13").',
            uz: 'Rekursiv fib(n) funksiyasini yozing (fib(0)=0, fib(1)=1) va n=7 uchun natijani chiqaring ("13").',
          },
          language: 'cpp',
          sampleInput: '7',
          starterCode: `#include <iostream>\nusing namespace std;\n\nlong long fib(int n) {\n    // Write base case and recursive step\n    return 0;\n}\n\nint main() {\n    int n;\n    cin >> n;\n    cout << fib(n) << "\\n";\n    return 0;\n}`,
          expectedOutputIncludes: '13',
          hint: {
            en: 'if (n <= 1) return n; return fib(n - 1) + fib(n - 2);',
            uz: 'if (n <= 1) return n; return fib(n - 1) + fib(n - 2);',
          },
        },
      },
    ],
    quiz: [
      {
        id: 'cpp-a-q1',
        question: {
          en: 'Why pass std::vector<int> as const std::vector<int>& to read-only functions?',
          uz: 'Nima uchun o‘qish funksiyalariga std::vector<int> ni const std::vector<int>& ko‘rinishida uzatamiz?',
        },
        options: [
          { en: 'To avoid O(n) memory copying on every call', uz: 'Har chaqiruvda O(n) xotira nusxalashdan qochish uchun' },
          { en: 'To delete elements automatically', uz: 'Elementlarni avtomatik o‘chirish uchun' },
          { en: 'Because vectors cannot be returned', uz: 'Vektorlarni funksiyadan qaytarib bo‘lmagani uchun' },
          { en: 'To sort the vector in reverse', uz: 'Vektorni teskari saralash uchun' },
        ],
        correctIndex: 0,
        explanation: {
          en: 'const reference passes only an address without duplicating vector memory, while preventing accidental writes.',
          uz: 'const havola xotiradan nusxa olmasdan O(1) da manzilni uzatadi va o‘zgartirishdan himoyalaydi.',
        },
      },
      {
        id: 'cpp-a-q2',
        question: {
          en: 'Which rule does std::stack enforce?',
          uz: 'std::stack konteyneri qaysi qoidaga amal qiladi?',
        },
        options: [
          { en: 'FIFO (First-In, First-Out)', uz: 'FIFO (Birinchi kirgan, birinchi chiqadi)' },
          { en: 'LIFO (Last-In, First-Out)', uz: 'LIFO (Oxirgi kirgan, birinchi chiqadi)' },
          { en: 'Random Access by index', uz: 'Indeks bo‘yicha tasodifiy kirish' },
          { en: 'Automatic sorting', uz: 'Avtomatik saralash' },
        ],
        correctIndex: 1,
        explanation: {
          en: 'A stack pushes and pops from the top (Last-In, First-Out).',
          uz: 'Stekda oxirgi qo‘shilgan element birinchi olinadi (LIFO).',
        },
      },
    ],
  },
];
