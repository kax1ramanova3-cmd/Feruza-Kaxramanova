import type { CppCollection, CppLevel, CppProblem } from '../../types/masalalar';

function makeProblem(
  collectionId: string,
  prefix: string,
  num: number,
  data: Omit<CppProblem, 'id' | 'collectionId' | 'number' | 'code' | 'starterCode'> & { starterCode?: string },
): CppProblem {
  const code = `${prefix}${num}`;
  return {
    id: `${collectionId}-${num}`,
    collectionId,
    number: num,
    code,
    starterCode:
      data.starterCode ??
      `#include <iostream>\n#include <string>\n#include <vector>\nusing namespace std;\n\nint main() {\n    // ${code}: Yechim kodini shu yerga yozing\n    \n    return 0;\n}`,
    ...data,
  };
}

// ============================================================================
// 14. STD::STRING BILAN ISHLASH — 45 exercises (String1..String45)
// ============================================================================
const stringProblems: CppProblem[] = Array.from({ length: 45 }, (_, idx) => {
  const num = idx + 1;
  const colId = 'col-14-string';
  const lvl: CppLevel = num <= 15 ? 'Elementary' : num <= 32 ? 'Intermediate' : 'Upper-Intermediate';
  const kind = idx % 9;

  if (kind === 0) {
    return makeProblem(colId, 'String', num, {
      title: `Satrni teskari aylantirish (#${num})`,
      statementUz: `S satri berilgan. Uni teskari tartibda chiqaring.`,
      inputSpecUz: 'Bo‘sh joysiz satr S.',
      outputSpecUz: 'Teskari satr.',
      sampleInput: 'CODEVERSE',
      sampleOutput: 'ESREVEDOC',
      difficulty: lvl,
      topicTag: 'Satr transformatsiyasi',
      hintUz: 'reverse(s.begin(), s.end());',
      solutionCode: `#include <iostream>\n#include <string>\n#include <algorithm>\nusing namespace std;\nint main(){ string s; cin>>s; reverse(s.begin(), s.end()); cout<<s; }`,
      explanationUz: '<algorithm> kutubxonasidagi reverse() satrni joyida teskari aylantiradi.',
    });
  }
  if (kind === 1) {
    return makeProblem(colId, 'String', num, {
      title: `Satrdagi harflar orasiga bo‘sh joy qo‘yish (#${num})`,
      statementUz: `S satri berilgan. Har bir belgisini bo‘sh joy bilan ajratib chiqaring.`,
      inputSpecUz: 'Satr S.',
      outputSpecUz: 'Bo‘sh joylar bilan ajratilgan belgilar.',
      sampleInput: 'UZBEK',
      sampleOutput: 'U Z B E K',
      difficulty: lvl,
      topicTag: 'Satr formatlash',
      hintUz: 'i > 0 bo‘lganda oldidan " " chiqaring.',
      solutionCode: `#include <iostream>\n#include <string>\nusing namespace std;\nint main(){ string s; cin>>s; for(size_t i=0;i<s.size();i++) cout<<(i?" ":"")<<s[i]; }`,
      explanationUz: 'Satr uzunligi s.size() gacha yuriladi.',
    });
  }
  if (kind === 2) {
    return makeProblem(colId, 'String', num, {
      title: `Katta harflarni kichikka aylantirish (#${num})`,
      statementUz: `S satridagi barcha katta lotin harflarini kichik harflarga o‘tkazing.`,
      inputSpecUz: 'Satr S.',
      outputSpecUz: 'Kichik harfli satr.',
      sampleInput: 'TashkentUZ',
      sampleOutput: 'tashkentuz',
      difficulty: lvl,
      topicTag: 'Registr o‘zgartirish',
      hintUz: 'for (char &c : s) c = tolower(c);',
      solutionCode: `#include <iostream>\n#include <string>\n#include <cctype>\nusing namespace std;\nint main(){ string s; cin>>s; for(char &c:s) c=(char)tolower((unsigned char)c); cout<<s; }`,
      explanationUz: 'Havola &c orqali satr belgilari bevosita o‘zgartiriladi.',
    });
  }
  if (kind === 3) {
    return makeProblem(colId, 'String', num, {
      title: `Satr palindrom ekanligini tekshirish (#${num})`,
      statementUz: `S satri palindrom bo‘lsa "YES", aks holda "NO" chiqaring.`,
      inputSpecUz: 'Satr S.',
      outputSpecUz: 'YES yoki NO.',
      sampleInput: 'aziza',
      sampleOutput: 'YES',
      difficulty: lvl,
      topicTag: 'Palindrom',
      hintUz: 'Ikki ko‘rsatkich l=0, r=s.size()-1 bilan tekshiring.',
      solutionCode: `#include <iostream>\n#include <string>\nusing namespace std;\nint main(){ string s; cin>>s; string t=s; int l=0,r=(int)s.size()-1; bool ok=true; while(l<r){ if(s[l++]!=s[r--]) ok=false; } cout<<(ok?"YES":"NO"); }`,
      explanationUz: '"aziza" chapdan ham, o‘ngdan ham bir xil o‘qiladi.',
    });
  }
  if (kind === 4) {
    return makeProblem(colId, 'String', num, {
      title: `Gapdagi so‘zlar sonini sanash (#${num})`,
      statementUz: `Bir nechta bo‘sh joylar bilan ajratilgan so‘zlardan iborat satr berilgan. So‘zlar sonini toping.`,
      inputSpecUz: 'Bitta qatorda matn.',
      outputSpecUz: 'So‘zlar soni.',
      sampleInput: 'Learn Code Create Uzbekistan',
      sampleOutput: '4',
      difficulty: lvl,
      topicTag: 'So‘zlarga ajratish',
      hintUz: 'stringstream ss(line); while (ss >> word) cnt++;',
      solutionCode: `#include <iostream>\n#include <string>\n#include <sstream>\nusing namespace std;\nint main(){ string line, w; getline(cin, line); stringstream ss(line); int c=0; while(ss>>w) c++; cout<<c; }`,
      explanationUz: 'std::stringstream ortiqcha bo‘sh joylarni avtomatik tashlab so‘zlarni o‘qiydi.',
    });
  }
  if (kind === 5) {
    return makeProblem(colId, 'String', num, {
      title: `Eng uzun so‘z uzunligi (#${num})`,
      statementUz: `Matn satrida eng uzun so‘zning uzunligini toping.`,
      inputSpecUz: 'Bitta qatorda matn.',
      outputSpecUz: 'Maksimal so‘z uzunligi.',
      sampleInput: 'Tashkent Samarkand Bukhara',
      sampleOutput: '9',
      difficulty: lvl,
      topicTag: 'So‘z tahlili',
      hintUz: 'ss >> word bilan har bir so‘z uzunligini max ga solishtiring.',
      solutionCode: `#include <iostream>\n#include <string>\n#include <sstream>\n#include <algorithm>\nusing namespace std;\nint main(){ string line, w; getline(cin, line); stringstream ss(line); size_t mx=0; while(ss>>w) mx=max(mx, w.size()); cout<<mx; }`,
      explanationUz: 'Samarkand so‘zi 9 ta harfdan iborat.',
    });
  }
  if (kind === 6) {
    return makeProblem(colId, 'String', num, {
      title: `Qism satr uchrashlar soni (#${num})`,
      statementUz: `S va S0 satrlari berilgan. S ichida S0 necha marta uchrashini toping.`,
      inputSpecUz: 'Ikki satr S va S0.',
      outputSpecUz: 'Uchrashlar soni.',
      sampleInput: 'ababa\naba',
      sampleOutput: '1',
      difficulty: lvl,
      topicTag: 'Qidiruv',
      hintUz: 's.find(s0, pos) dan foydalaning va pos += s0.size() qiling.',
      solutionCode: `#include <iostream>\n#include <string>\nusing namespace std;\nint main(){ string s, s0; cin>>s>>s0; size_t pos=0; int cnt=0; while((pos=s.find(s0, pos))!=string::npos){ cnt++; pos+=s0.size(); } cout<<cnt; }`,
      explanationUz: 'Kesishmasdan qidirganda pos s0.size() ga suriladi.',
    });
  }
  if (kind === 7) {
    return makeProblem(colId, 'String', num, {
      title: `Fayl yo‘lidan fayl nomini ajratish (#${num})`,
      statementUz: `To‘liq fayl yo‘li berilgan (masalan C:/docs/lesson.cpp). Faylning kengaytmasiz nomini chiqaring.`,
      inputSpecUz: 'Fayl yo‘li satri.',
      outputSpecUz: 'Fayl nomi.',
      sampleInput: 'C:/codeverse/labs/main.cpp',
      sampleOutput: 'main',
      difficulty: lvl,
      topicTag: 'Satr ajratish',
      hintUz: 'find_last_of("/") va find_last_of(".") dan foydalaning.',
      solutionCode: `#include <iostream>\n#include <string>\nusing namespace std;\nint main(){ string p; cin>>p; size_t sl=p.find_last_of("/\\\\"); size_t dt=p.find_last_of('.'); size_t st=(sl==string::npos?0:sl+1); cout<<p.substr(st, dt-st); }`,
      explanationUz: 'Oxirgi / va oxirgi . orasidagi qism substr bilan ajratib olinadi.',
    });
  }
  return makeProblem(colId, 'String', num, {
    title: `Satr ichidagi raqamlar yig‘indisi (#${num})`,
    statementUz: `Harf va raqamlar aralash satr berilgan. Undagi barcha raqam belgilarining son qiymatlari yig‘indisini toping.`,
    inputSpecUz: 'Satr S.',
    outputSpecUz: 'Raqamlar yig‘indisi.',
    sampleInput: 'C2O0D2E6',
    sampleOutput: '10',
    difficulty: lvl,
    topicTag: 'Belgi tahlili',
    hintUz: 'isdigit(c) bo‘lsa sum += c - \'0\'.',
    solutionCode: `#include <iostream>\n#include <string>\n#include <cctype>\nusing namespace std;\nint main(){ string s; cin>>s; int sum=0; for(char c:s) if(isdigit(c)) sum+=(c-'0'); cout<<sum; }`,
    explanationUz: '2 + 0 + 2 + 6 = 10.',
  });
});

// ============================================================================
// 15. REKURSIYA — 30 exercises (Recur1..Recur30)
// ============================================================================
const recurProblems: CppProblem[] = Array.from({ length: 30 }, (_, idx) => {
  const num = idx + 1;
  const colId = 'col-15-recur';
  const lvl: CppLevel = num <= 10 ? 'Intermediate' : num <= 20 ? 'Upper-Intermediate' : 'Advanced';
  const kind = idx % 6;

  if (kind === 0) {
    const nSample = 5 + (idx % 4);
    let f = 1;
    for (let i = 2; i <= nSample; i++) f *= i;
    return makeProblem(colId, 'Recur', num, {
      title: `Rekursiv Fact(N) funksiyasi (#${num})`,
      statementUz: `Rekursiv usulda N! ni hisoblovchi Fact(N) funksiyasini tuzing.`,
      inputSpecUz: 'Butun son N (0 <= N <= 12).',
      outputSpecUz: 'N! qiymati.',
      sampleInput: `${nSample}`,
      sampleOutput: `${f}`,
      difficulty: lvl,
      topicTag: 'Asosiy rekursiya',
      hintUz: 'Bazaviy holat: if (n <= 1) return 1; aks holda return n * Fact(n - 1).',
      solutionCode: `#include <iostream>\nusing namespace std;\nlong long Fact(int n){ return n<=1 ? 1 : n*Fact(n-1); }\nint main(){ int n; cin>>n; cout<<Fact(n); }`,
      explanationUz: 'Rekursiya muammoni kichikroq N-1 ga tushirib bazaviy holatda to‘xtaydi.',
    });
  }
  if (kind === 1) {
    const nSample = 6 + (idx % 4);
    const fib = (k: number): number => (k <= 2 ? 1 : fib(k - 1) + fib(k - 2));
    return makeProblem(colId, 'Recur', num, {
      title: `Rekursiv Fib(N) Fibonachchi soni (#${num})`,
      statementUz: `Fib(1)=1, Fib(2)=1, Fib(N)=Fib(N-1)+Fib(N-2) rekursiv funksiyasini yozing.`,
      inputSpecUz: 'Butun son N (1 <= N <= 20).',
      outputSpecUz: 'N-Fibonachchi soni.',
      sampleInput: `${nSample}`,
      sampleOutput: `${fib(nSample)}`,
      difficulty: lvl,
      topicTag: 'Tarmoqlangan rekursiya',
      hintUz: 'if (n <= 2) return 1; return Fib(n - 1) + Fib(n - 2);',
      solutionCode: `#include <iostream>\nusing namespace std;\nlong long Fib(int n){ return n<=2 ? 1 : Fib(n-1)+Fib(n-2); }\nint main(){ int n; cin>>n; cout<<Fib(n); }`,
      explanationUz: 'Ikki marta o‘zini chaqiruvchi klassik rekursiya namunasi.',
    });
  }
  if (kind === 2) {
    const p = 3 + (idx % 4);
    return makeProblem(colId, 'Recur', num, {
      title: `Tezkor rekursiv daraja PowerN(x, N) (#${num})`,
      statementUz: `Rekursiv PowerN(x, N) funksiyasi yordamida x^N ni O(log N) da hisoblang.`,
      inputSpecUz: 'Butun son x va N >= 0.',
      outputSpecUz: 'x^N qiymati.',
      sampleInput: `2 ${p}`,
      sampleOutput: `${Math.pow(2, p)}`,
      difficulty: lvl,
      topicTag: 'Binary Exponentiation',
      hintUz: 'Juft N da PowerN(x, N/2) ning kvadratini oling.',
      solutionCode: `#include <iostream>\nusing namespace std;\nlong long PowerN(long long x, int n){ if(n==0)return 1; long long h=PowerN(x,n/2); return n%2==0 ? h*h : x*h*h; }\nint main(){ long long x; int n; cin>>x>>n; cout<<PowerN(x,n); }`,
      explanationUz: 'Darajani ikkiga bo‘lish hisoblash tezligini keskin oshiradi.',
    });
  }
  if (kind === 3) {
    return makeProblem(colId, 'Recur', num, {
      title: `Rekursiv EKUB(A, B) (#${num})`,
      statementUz: `Evklid algoritmini rekursiv GCD(A, B) funksiyasi ko‘rinishida yozing.`,
      inputSpecUz: 'A va B.',
      outputSpecUz: 'EKUB(A, B).',
      sampleInput: '48 18',
      sampleOutput: '6',
      difficulty: lvl,
      topicTag: 'Rekursiv Evklid',
      hintUz: 'return b == 0 ? a : GCD(b, a % b);',
      solutionCode: `#include <iostream>\nusing namespace std;\nlong long GCD(long long a, long long b){ return b==0 ? a : GCD(b, a%b); }\nint main(){ long long a,b; cin>>a>>b; cout<<GCD(a,b); }`,
      explanationUz: 'B nolga teng bo‘lganda A javob sifatida qaytadi.',
    });
  }
  if (kind === 4) {
    return makeProblem(colId, 'Recur', num, {
      title: `Rekursiv raqamlar yig‘indisi DigitSum(N) (#${num})`,
      statementUz: `N sonining raqamlari yig‘indisini siklsiz, faqat rekursiya yordamida toping.`,
      inputSpecUz: 'Musbat son N.',
      outputSpecUz: 'Raqamlar yig‘indisi.',
      sampleInput: '5492',
      sampleOutput: '20',
      difficulty: lvl,
      topicTag: 'Raqam rekursiyasi',
      hintUz: 'if (n < 10) return n; return n % 10 + DigitSum(n / 10);',
      solutionCode: `#include <iostream>\nusing namespace std;\nint DigitSum(long long n){ return n<10 ? (int)n : (int)(n%10) + DigitSum(n/10); }\nint main(){ long long n; cin>>n; cout<<DigitSum(n); }`,
      explanationUz: '5 + 4 + 9 + 2 = 20.',
    });
  }
  return makeProblem(colId, 'Recur', num, {
    title: `Kombinatorika C(N, K) rekursiv hisoblash (#${num})`,
    statementUz: `Paskal uchburchagi qoidasi C(N, K) = C(N-1, K) + C(N-1, K-1) bo‘yicha kombinatsiyalar sonini toping.`,
    inputSpecUz: 'N va K (0 <= K <= N <= 20).',
    outputSpecUz: 'C(N, K).',
    sampleInput: '6 2',
    sampleOutput: '15',
    difficulty: lvl,
    topicTag: 'Kombinatorika',
    hintUz: 'if (k == 0 || k == n) return 1;',
    solutionCode: `#include <iostream>\nusing namespace std;\nlong long C(int n, int k){ if(k==0||k==n)return 1; return C(n-1,k)+C(n-1,k-1); }\nint main(){ int n,k; cin>>n>>k; cout<<C(n,k); }`,
    explanationUz: '6 ta elementdan 2 tasini tanlash usullari soni 15 ga teng.',
  });
});

// ============================================================================
// 16. FUNKSIYALAR: MASSIV, SATR VA TUZILMA PARAMETRLARI — 70 exercises (Param1..Param70)
// ============================================================================
const paramProblems: CppProblem[] = Array.from({ length: 70 }, (_, idx) => {
  const num = idx + 1;
  const colId = 'col-16-param';
  const lvl: CppLevel =
    num <= 20 ? 'Intermediate' : num <= 50 ? 'Upper-Intermediate' : 'Advanced';
  const kind = idx % 7;

  if (kind === 0) {
    return makeProblem(colId, 'Param', num, {
      title: `MinElem(A, N) massiv parametri (#${num})`,
      statementUz: `Massiv (vector<int>) va o‘lchami N berilgan. Eng kichik elementni qaytaruvchi MinElem funksiyasini yozing.`,
      inputSpecUz: 'N va N ta son.',
      outputSpecUz: 'Minimal element.',
      sampleInput: '5 12 4 19 7 8',
      sampleOutput: '4',
      difficulty: lvl,
      topicTag: 'Massiv parametri',
      hintUz: 'int MinElem(const vector<int>& a) ko‘rinishida const reference ishlating.',
      solutionCode: `#include <iostream>\n#include <vector>\n#include <algorithm>\nusing namespace std;\nint MinElem(const vector<int>& a){ return *min_element(a.begin(), a.end()); }\nint main(){ int n; cin>>n; vector<int> a(n); for(int &x:a)cin>>x; cout<<MinElem(a); }`,
      explanationUz: 'const vector<int>& nusxalashsiz xavfsiz uzatishni ta’minlaydi.',
    });
  }
  if (kind === 1) {
    return makeProblem(colId, 'Param', num, {
      title: `SortArray funksiyasi (#${num})`,
      statementUz: `Massivni havola (&) orqali qabul qilib o‘sish tartibida saralovchi SortArray(vector<int>& a) funksiyasini tuzing.`,
      inputSpecUz: 'N va N ta son.',
      outputSpecUz: 'Saralangan massiv.',
      sampleInput: '5 9 2 7 1 5',
      sampleOutput: '1 2 5 7 9',
      difficulty: lvl,
      topicTag: 'Massivni o‘zgartirish',
      hintUz: 'Parametrda & belgisini qo‘yishni unutmang.',
      solutionCode: `#include <iostream>\n#include <vector>\n#include <algorithm>\nusing namespace std;\nvoid SortArray(vector<int>& a){ sort(a.begin(), a.end()); }\nint main(){ int n; cin>>n; vector<int> a(n); for(int &x:a)cin>>x; SortArray(a); for(int i=0;i<n;i++) cout<<(i?" ":"")<<a[i]; }`,
      explanationUz: 'Havola orqali o‘zgarish asl massivga ta’sir qiladi.',
    });
  }
  if (kind === 2) {
    return makeProblem(colId, 'Param', num, {
      title: `CompressArray qo‘shni takrorlarni siqish (#${num})`,
      statementUz: `Massivdan ketma-ket bir xil elementlarni o‘chiruvchi Compress(vector<int>& a) funksiyasini yozing.`,
      inputSpecUz: 'N va N ta son.',
      outputSpecUz: 'Siqilgan massiv.',
      sampleInput: '7 1 1 2 2 2 3 1',
      sampleOutput: '1 2 3 1',
      difficulty: lvl,
      topicTag: 'Massiv filtrlash',
      hintUz: 'std::unique yoki yangi vector tuzing.',
      solutionCode: `#include <iostream>\n#include <vector>\nusing namespace std;\nvoid Compress(vector<int>& a){ vector<int> r; for(int x:a) if(r.empty()||r.back()!=x) r.push_back(x); a=r; }\nint main(){ int n; cin>>n; vector<int> a(n); for(int &x:a)cin>>x; Compress(a); for(size_t i=0;i<a.size();i++) cout<<(i?" ":"")<<a[i]; }`,
      explanationUz: 'Qo‘shni bir xil qiymatlar bittaga qisqartiriladi.',
    });
  }
  if (kind === 3) {
    return makeProblem(colId, 'Param', num, {
      title: `TrimLeftSpace satr parametri (#${num})`,
      statementUz: `Satr boshidagi bo‘sh joylarni olib tashlovchi TrimLeft(string& s) funksiyasini tuzing.`,
      inputSpecUz: 'Bitta qatorda matn.',
      outputSpecUz: 'Tozalangan satr.',
      sampleInput: '   CODEVERSE',
      sampleOutput: 'CODEVERSE',
      difficulty: lvl,
      topicTag: 'Satr parametri',
      hintUz: 'find_first_not_of(" ") bilan boshlanish indeksini toping.',
      solutionCode: `#include <iostream>\n#include <string>\nusing namespace std;\nvoid TrimLeft(string& s){ size_t p=s.find_first_not_of(' '); s=(p==string::npos?"":s.substr(p)); }\nint main(){ string s; getline(cin, s); TrimLeft(s); cout<<s; }`,
      explanationUz: 'Chap tarafdagi ortiqcha bo‘shliqlar o‘chiriladi.',
    });
  }
  if (kind === 4) {
    return makeProblem(colId, 'Param', num, {
      title: `TPoint struct va masofa funksiyasi (#${num})`,
      statementUz: `struct TPoint { double x, y; } tuzilmasini yarating va ikki nuqta orasidagi masofani hisoblovchi Leng(TPoint A, TPoint B) funksiyasini yozing.`,
      inputSpecUz: 'x1 y1 x2 y2.',
      outputSpecUz: 'Masofa 2 kasr aniqlikda.',
      sampleInput: '0 0 6 8',
      sampleOutput: '10.00',
      difficulty: lvl,
      topicTag: 'Tuzilma (struct)',
      hintUz: 'hypot(A.x - B.x, A.y - B.y).',
      solutionCode: `#include <iostream>\n#include <cmath>\n#include <iomanip>\nusing namespace std;\nstruct TPoint{ double x,y; };\ndouble Leng(TPoint a, TPoint b){ return hypot(a.x-b.x, a.y-b.y); }\nint main(){ TPoint a,b; cin>>a.x>>a.y>>b.x>>b.y; cout<<fixed<<setprecision(2)<<Leng(a,b); }`,
      explanationUz: 'struct orqali bog‘liq maydonlar bitta mantiqiy turga birlashtiriladi.',
    });
  }
  if (kind === 5) {
    return makeProblem(colId, 'Param', num, {
      title: `TTime vaqtni qo‘shish tuzilmasi (#${num})`,
      statementUz: `struct TTime { int h, m, s; } tuzilmasi berilgan. Vaqtga K sekund qo‘shuvchi AddSeconds(TTime& t, int k) funksiyasini yozing.`,
      inputSpecUz: 'h m s va k.',
      outputSpecUz: 'Yangi h m s (24 soatlik formatda).',
      sampleInput: '23 59 50 25',
      sampleOutput: '0 0 15',
      difficulty: lvl,
      topicTag: 'Tuzilma (struct)',
      hintUz: 'Jami sekundga o‘tkazib k qo‘shing va % 86400 oling.',
      solutionCode: `#include <iostream>\nusing namespace std;\nstruct TTime{ int h,m,s; };\nvoid AddSeconds(TTime& t, int k){ int tot=(t.h*3600+t.m*60+t.s+k)%86400; t.h=tot/3600; t.m=(tot%3600)/60; t.s=tot%60; }\nint main(){ TTime t; int k; cin>>t.h>>t.m>>t.s>>k; AddSeconds(t,k); cout<<t.h<<" "<<t.m<<" "<<t.s; }`,
      explanationUz: 'Sutka 86400 sekunddan iborat, % 86400 yarim tundan o‘tishni to‘g‘ri boshqaradi.',
    });
  }
  return makeProblem(colId, 'Param', num, {
    title: `TStudent struct bo‘yicha eng yuqori ball (#${num})`,
    statementUz: `N ta talaba (ism, ball) tuzilmalar ro‘yxati berilgan. Eng yuqori ball olgan talabaning ismini chiqaring.`,
    inputSpecUz: 'N va N qator (ism ball).',
    outputSpecUz: 'Eng yuqori ballli talaba ismi.',
    sampleInput: '3\nMalika 88\nJavohir 96\nDiyor 91',
    sampleOutput: 'Javohir',
    difficulty: lvl,
    topicTag: 'Tuzilmalar massivi',
    hintUz: 'vector<TStudent> ichida max ballni toping.',
    solutionCode: `#include <iostream>\n#include <vector>\n#include <string>\nusing namespace std;\nstruct TStudent{ string name; int score; };\nint main(){ int n; cin>>n; vector<TStudent> v(n); int best=0; for(int i=0;i<n;i++){ cin>>v[i].name>>v[i].score; if(v[i].score>v[best].score) best=i; } cout<<v[best].name; }`,
    explanationUz: 'Tuzilmalar vektori real ma’lumotlar modellarini yaratishda ishlatiladi.',
  });
});

// ============================================================================
// 17. DINAMIK TUZILMALAR: STEK, NAVBAT, RO‘YXAT — 69 exercises (Dynamic1..Dynamic69)
// ============================================================================
const dynamicProblems: CppProblem[] = Array.from({ length: 69 }, (_, idx) => {
  const num = idx + 1;
  const colId = 'col-17-dynamic';
  const lvl: CppLevel = num <= 20 ? 'Intermediate' : num <= 45 ? 'Upper-Intermediate' : 'Advanced';
  const kind = idx % 6;

  if (kind === 0) {
    return makeProblem(colId, 'Dynamic', num, {
      title: `Stek (LIFO) Push va Pop amallari (#${num})`,
      statementUz: `N ta son ketma-ket stekka (std::stack) qo‘shildi, so‘ngra K ta element olindi (pop). Stekning yangi cho‘qqisidagi elementni (bo‘sh bo‘lsa -1) chiqaring.`,
      inputSpecUz: 'N, K va N ta son.',
      outputSpecUz: 'Stek cho‘qqisi (top) yoki -1.',
      sampleInput: '5 2\n10 20 30 40 50',
      sampleOutput: '30',
      difficulty: lvl,
      topicTag: 'Stek (LIFO)',
      hintUz: 'Oxirgi kirgan birinchi chiqadi (LIFO). 50 va 40 chiqsa 30 qoladi.',
      solutionCode: `#include <iostream>\n#include <stack>\nusing namespace std;\nint main(){ int n,k; cin>>n>>k; stack<int> st; for(int i=0;i<n;i++){ int x; cin>>x; st.push(x); } while(k-- && !st.empty()) st.pop(); cout<<(st.empty()?-1:st.top()); }`,
      explanationUz: 'std::stack LIFO tamoyilida ishlaydi.',
    });
  }
  if (kind === 1) {
    return makeProblem(colId, 'Dynamic', num, {
      title: `Qavslar balansini stek bilan tekshirish (#${num})`,
      statementUz: `'(', ')', '[', ']', '{', '}' qavslaridan iborat satr to‘g‘ri muvozanatlangan bo‘lsa "YES", aks holda "NO" chiqaring.`,
      inputSpecUz: 'Qavslar satri.',
      outputSpecUz: 'YES yoki NO.',
      sampleInput: '{[()]}',
      sampleOutput: 'YES',
      difficulty: lvl,
      topicTag: 'Stek algoritmi',
      hintUz: 'Ochiluvchi qavsni stekkga soling, yopiluvchida st.top() mosligini tekshiring.',
      solutionCode: `#include <iostream>\n#include <stack>\n#include <string>\nusing namespace std;\nint main(){ string s; cin>>s; stack<char> st; bool ok=true; for(char c:s){ if(c=='('||c=='['||c=='{') st.push(c); else{ if(st.empty()){ ok=false; break; } char t=st.top(); st.pop(); if((c==')'&&t!='(')||(c==']'&&t!='[')||(c=='}'&&t!='{')){ ok=false; break; } } } if(!st.empty()) ok=false; cout<<(ok?"YES":"NO"); }`,
      explanationUz: 'Kompilyatorlar sintaksis tekshiruvida aynan shu stek algoritmidan foydalanadi.',
    });
  }
  if (kind === 2) {
    return makeProblem(colId, 'Dynamic', num, {
      title: `Navbat (Queue FIFO) boshqarish (#${num})`,
      statementUz: `N ta element navbatga (std::queue) qo‘shildi va K tasi xizmat ko‘rsatilib chiqarildi. Navbatda qolgan elementlarni chiqaring.`,
      inputSpecUz: 'N, K va N ta son.',
      outputSpecUz: 'Qolgan elementlar (bo‘sh bo‘lsa EMPTY).',
      sampleInput: '5 2\n1 2 3 4 5',
      sampleOutput: '3 4 5',
      difficulty: lvl,
      topicTag: 'Navbat (FIFO)',
      hintUz: 'queue<int> q; q.push(x); K marta q.pop();',
      solutionCode: `#include <iostream>\n#include <queue>\nusing namespace std;\nint main(){ int n,k; cin>>n>>k; queue<int> q; for(int i=0;i<n;i++){ int x; cin>>x; q.push(x); } while(k-- && !q.empty()) q.pop(); if(q.empty()){ cout<<"EMPTY"; return 0; } bool f=true; while(!q.empty()){ cout<<(f?"":" ")<<q.front(); q.pop(); f=false; } }`,
      explanationUz: 'Birinchi kirgan 1 va 2 chiqib, 3 4 5 qoladi.',
    });
  }
  if (kind === 3) {
    return makeProblem(colId, 'Dynamic', num, {
      title: `Bir bog‘lamli ro‘yxat (Linked List) tugunlari yig‘indisi (#${num})`,
      statementUz: `Dinamik Node* bog‘lamli ro‘yxat yaratib N ta sonni joylashtiring va barcha tugunlar qiymati yig‘indisini hisoblang.`,
      inputSpecUz: 'N va N ta son.',
      outputSpecUz: 'Yig‘indi.',
      sampleInput: '4\n5 10 15 20',
      sampleOutput: '50',
      difficulty: lvl,
      topicTag: 'Bog‘lamli ro‘yxat',
      hintUz: 'struct Node { int val; Node* next; }; yaratib head bo‘ylab yuring.',
      solutionCode: `#include <iostream>\nusing namespace std;\nstruct Node{ int val; Node* next; Node(int v):val(v),next(nullptr){} };\nint main(){ int n; cin>>n; Node *head=nullptr, *tail=nullptr; for(int i=0;i<n;i++){ int x; cin>>x; Node* p=new Node(x); if(!head) head=tail=p; else{ tail->next=p; tail=p; } } long long sum=0; for(Node* cur=head; cur!=nullptr; cur=cur->next) sum+=cur->val; cout<<sum; }`,
      explanationUz: 'Ko‘rsatkichlar (pointers) yordamida dinamik tugunlar zanjiri quriladi.',
    });
  }
  if (kind === 4) {
    return makeProblem(colId, 'Dynamic', num, {
      title: `Ikki tomonlama navbat (std::deque) palindrom tekshiruvi (#${num})`,
      statementUz: `N ta sondan iborat ketma-ketlikni deque ga joylab, chapdan va o‘ngdan bir xil o‘qilishini (YES/NO) tekshiring.`,
      inputSpecUz: 'N va N ta son.',
      outputSpecUz: 'YES yoki NO.',
      sampleInput: '5\n1 4 9 4 1',
      sampleOutput: 'YES',
      difficulty: lvl,
      topicTag: 'Deque',
      hintUz: 'dq.front() == dq.back() bo‘lsa pop_front() va pop_back() qiling.',
      solutionCode: `#include <iostream>\n#include <deque>\nusing namespace std;\nint main(){ int n; cin>>n; deque<int> dq; for(int i=0;i<n;i++){ int x; cin>>x; dq.push_back(x); } bool ok=true; while(dq.size()>1){ if(dq.front()!=dq.back()){ ok=false; break; } dq.pop_front(); dq.pop_back(); } cout<<(ok?"YES":"NO"); }`,
      explanationUz: 'std::deque ikkala uchidan O(1) vaqtda element olish imkonini beradi.',
    });
  }
  return makeProblem(colId, 'Dynamic', num, {
    title: `Postfix (Teskari Polyak) ifodasini stek bilan hisoblash (#${num})`,
    statementUz: `N ta tokenli postfix ifodani (masalan: 3 4 + 2 *) stek yordamida hisoblang.`,
    inputSpecUz: 'N va N ta token.',
    outputSpecUz: 'Natija.',
    sampleInput: '5\n3 4 + 2 *',
    sampleOutput: '14',
    difficulty: lvl,
    topicTag: 'Postfix evaluator',
    hintUz: 'Son bo‘lsa push, operator bo‘lsa ikkita sonni pop qilib amalni bajaring.',
    solutionCode: `#include <iostream>\n#include <stack>\n#include <string>\nusing namespace std;\nint main(){ int n; cin>>n; stack<long long> st; while(n--){ string t; cin>>t; if(t=="+"||t=="-"||t=="*"){ long long b=st.top(); st.pop(); long long a=st.top(); st.pop(); if(t=="+") st.push(a+b); else if(t=="-") st.push(a-b); else st.push(a*b); } else st.push(stoll(t)); } cout<<st.top(); }`,
    explanationUz: '(3 + 4) * 2 = 14.',
  });
});

// ============================================================================
// 18. MATNLI FAYLLAR — 60 exercises (Text1..Text60)
// ============================================================================
const textProblems: CppProblem[] = Array.from({ length: 60 }, (_, idx) => {
  const num = idx + 1;
  const colId = 'col-18-text';
  const lvl: CppLevel = num <= 20 ? 'Intermediate' : num <= 45 ? 'Upper-Intermediate' : 'Advanced';
  const kind = idx % 6;

  if (kind === 0) {
    return makeProblem(colId, 'Text', num, {
      title: `Matnli fayldagi satrlar sonini hisoblash (#${num})`,
      statementUz: `Matnli fayl oqimi (simulyatsiya: kirish oxirigacha getline) berilgan. Fayldagi jami satrlar sonini toping.`,
      inputSpecUz: 'Bir nechta matn satrlari (EOF gacha).',
      outputSpecUz: 'Satrlar soni.',
      sampleInput: 'Birinchi satr\nIkkinchi satr\nUchinchi satr',
      sampleOutput: '3',
      difficulty: lvl,
      topicTag: 'Fayl oqimi (getline)',
      hintUz: 'while (getline(cin, line)) count++; (real faylda cin o‘rniga ifstream fin ishlatiladi).',
      solutionCode: `#include <iostream>\n#include <string>\nusing namespace std;\nint main(){ string s; int c=0; while(getline(cin, s)) c++; cout<<c; }`,
      explanationUz: 'Matnli fayllarni satrma-satr o‘qishda ifstream fin("file.txt"); while(getline(fin, s)) usuli qo‘llanadi; onlayn tekshiruvda cin oqimi faylni modellashtiradi.',
    });
  }
  if (kind === 1) {
    return makeProblem(colId, 'Text', num, {
      title: `Matnli fayldagi belgilar soni (#${num})`,
      statementUz: `Matnli fayl oqimidagi bo‘sh joydan tashqari barcha belgilar sonini toping.`,
      inputSpecUz: 'Matn satrlari.',
      outputSpecUz: 'Belgilar soni.',
      sampleInput: 'Salom Dunyo\nCodeverse',
      sampleOutput: '19',
      difficulty: lvl,
      topicTag: 'Fayl tahlili',
      hintUz: 'Har bir satrda !isspace(c) belgilarni sanang.',
      solutionCode: `#include <iostream>\n#include <string>\n#include <cctype>\nusing namespace std;\nint main(){ string s; int c=0; while(getline(cin,s)) for(char ch:s) if(!isspace((unsigned char)ch)) c++; cout<<c; }`,
      explanationUz: 'Bo‘sh joy va yangi qator belgilari hisobga olinmaydi (10 + 9 = 19).',
    });
  }
  if (kind === 2) {
    return makeProblem(colId, 'Text', num, {
      title: `Matnli fayldagi bo‘sh satrlarni olib tashlash (#${num})`,
      statementUz: `Matnli fayldan bo‘sh (yoki faqat probelli) satrlarni chiqarib tashlab, qolganlarini chiqaring.`,
      inputSpecUz: 'Matn satrlari.',
      outputSpecUz: 'Bo‘sh bo‘lmagan satrlar.',
      sampleInput: 'Satr 1\n\nSatr 2',
      sampleOutput: 'Satr 1\nSatr 2',
      difficulty: lvl,
      topicTag: 'Faylni tozalash',
      hintUz: 'Satrda kamida bitta !isspace belgi borligini tekshiring.',
      solutionCode: `#include <iostream>\n#include <string>\n#include <cctype>\nusing namespace std;\nint main(){ string s; bool first=true; while(getline(cin,s)){ bool has=false; for(char c:s) if(!isspace((unsigned char)c)) has=true; if(has){ if(!first)cout<<"\\n"; cout<<s; first=false; } } }`,
      explanationUz: 'Real loyihalarda log yoki CSV fayllarni tozalashda shu usul ishlatiladi.',
    });
  }
  if (kind === 3) {
    return makeProblem(colId, 'Text', num, {
      title: `Matnli fayldagi butun sonlar yig‘indisi (#${num})`,
      statementUz: `Fayl satrlarida joylashgan barcha butun sonlarning soni va yig‘indisini toping.`,
      inputSpecUz: 'Butun sonlar oqimi.',
      outputSpecUz: 'Soni va yig‘indisi.',
      sampleInput: '10 20\n30 40 50',
      sampleOutput: '5 150',
      difficulty: lvl,
      topicTag: 'Raqamli matn fayli',
      hintUz: 'while (cin >> x) { cnt++; sum += x; }',
      solutionCode: `#include <iostream>\nusing namespace std;\nint main(){ long long x,s=0; int c=0; while(cin>>x){ c++; s+=x; } cout<<c<<" "<<s; }`,
      explanationUz: 'Oqim operatori >> barcha whitespace belgilarni avtomatik o‘tkazib yuboradi.',
    });
  }
  if (kind === 4) {
    return makeProblem(colId, 'Text', num, {
      title: `Eng uzun satr uzunligi va tartib raqami (#${num})`,
      statementUz: `Matnli fayldagi eng uzun satrning 1-indeksli raqami va uzunligini toping.`,
      inputSpecUz: 'Matn satrlari.',
      outputSpecUz: 'Satr raqami va uzunligi.',
      sampleInput: 'Salom\nToshkent shahri\nC++',
      sampleOutput: '2 15',
      difficulty: lvl,
      topicTag: 'Fayl qidiruvi',
      hintUz: 'getline bilan o‘qib s.size() ni solishtiring.',
      solutionCode: `#include <iostream>\n#include <string>\nusing namespace std;\nint main(){ string s; int idx=0, bestIdx=0; size_t bestLen=0; while(getline(cin,s)){ idx++; if(s.size()>bestLen){ bestLen=s.size(); bestIdx=idx; } } cout<<bestIdx<<" "<<bestLen; }`,
      explanationUz: '2-satr ("Toshkent shahri") 15 belgidan iborat.',
    });
  }
  return makeProblem(colId, 'Text', num, {
    title: `Fayldagi barcha satrlarga raqam qo‘shib chiqarish (#${num})`,
    statementUz: `Matnli faylning har bir satri boshiga "1: ", "2: ", ... shaklida tartib raqami qo‘shing.`,
    inputSpecUz: 'Matn satrlari.',
    outputSpecUz: 'Raqamlangan satrlar.',
    sampleInput: 'Alpha\nBeta',
    sampleOutput: '1: Alpha\n2: Beta',
    difficulty: lvl,
    topicTag: 'Fayl formatlash',
    hintUz: 'int lineNo = 1; cout << lineNo++ << ": " << s.',
    solutionCode: `#include <iostream>\n#include <string>\nusing namespace std;\nint main(){ string s; int n=1; while(getline(cin,s)){ if(n>1)cout<<"\\n"; cout<<n++<<": "<<s; } }`,
    explanationUz: 'Natija boshqa ofstream fout("out.txt") fayliga ham xuddi shunday yoziladi.',
  });
});

// ============================================================================
// 19. BINAR FAYLLAR — 90 exercises (File1..File90)
// ============================================================================
const fileProblems: CppProblem[] = Array.from({ length: 90 }, (_, idx) => {
  const num = idx + 1;
  const colId = 'col-19-file';
  const lvl: CppLevel =
    num <= 25 ? 'Intermediate' : num <= 60 ? 'Upper-Intermediate' : 'Advanced';
  const kind = idx % 9;

  if (kind === 0) {
    return makeProblem(colId, 'File', num, {
      title: `Binar fayldan yozuvlar soni va oxirgi element (#${num})`,
      statementUz: `Binar fayl yozuvlarini modellashtiruvchi N ta butun sondan iborat blok berilgan. Yozuvlar sonini va oxirgi yozuv qiymatini chiqaring.`,
      inputSpecUz: 'Butun sonlar oqimi.',
      outputSpecUz: 'Hajmi (baytda: count * 4) va oxirgi son.',
      sampleInput: '10 25 40 55',
      sampleOutput: '16 55',
      difficulty: lvl,
      topicTag: 'Binar yozuv hajmi',
      hintUz: 'int 4 bayt egallaydi: sizeof(int) * count.',
      solutionCode: `#include <iostream>\nusing namespace std;\nint main(){ int x, last=0, cnt=0; while(cin>>x){ last=x; cnt++; } cout<<cnt*4<<" "<<last; }`,
      explanationUz: 'Binar faylda har bir 32-bit int 4 bayt egallaydi; seekg(0, ios::end) fayl hajmini aniqlaydi.',
    });
  }
  if (kind === 1) {
    return makeProblem(colId, 'File', num, {
      title: `Binar faylning K-pozitsiyasidagi yozuvni o‘qish (#${num})`,
      statementUz: `K (0-indeksli) va N ta int yozuv berilgan. K-pozitsiyadagi yozuvni (seekg usuli mantiqi bilan) toping.`,
      inputSpecUz: 'K va yozuvlar ketma-ketligi.',
      outputSpecUz: 'K-yozuv qiymati (topilmasa -1).',
      sampleInput: '2\n11 22 33 44',
      sampleOutput: '33',
      difficulty: lvl,
      topicTag: 'Random Access (seekg)',
      hintUz: 'K * sizeof(int) ofsetiga sakrash mantiqini qo‘llang.',
      solutionCode: `#include <iostream>\n#include <vector>\nusing namespace std;\nint main(){ int k; cin>>k; vector<int> v; int x; while(cin>>x) v.push_back(x); cout<<(k>=0 && k<(int)v.size() ? v[k] : -1); }`,
      explanationUz: 'Binar fayllarning asosiy ustunligi — seekg(k * sizeof(T)) orqali O(1) tasodifiy murojaat.',
    });
  }
  if (kind === 2) {
    return makeProblem(colId, 'File', num, {
      title: `Binar fayl yozuvlarini teskari tartibda qayta yozish (#${num})`,
      statementUz: `Berilgan binar fayl yozuvlarini teskari tartibda chiqaring.`,
      inputSpecUz: 'Yozuvlar oqimi.',
      outputSpecUz: 'Teskari yozuvlar.',
      sampleInput: '5 10 15 20',
      sampleOutput: '20 15 10 5',
      difficulty: lvl,
      topicTag: 'Binar transformatsiya',
      hintUz: 'Vector ga o‘qib reverse() qiling.',
      solutionCode: `#include <iostream>\n#include <vector>\n#include <algorithm>\nusing namespace std;\nint main(){ vector<int> v; int x; while(cin>>x) v.push_back(x); reverse(v.begin(), v.end()); for(size_t i=0;i<v.size();i++) cout<<(i?" ":"")<<v[i]; }`,
      explanationUz: 'Binar fayldan o‘qilgan struct/int bloklarini teskari tartibda write() qilish mumkin.',
    });
  }
  if (kind === 3) {
    return makeProblem(colId, 'File', num, {
      title: `Binar fayldagi manfiy yozuvlarni o‘chirish (#${num})`,
      statementUz: `Fayl yozuvlari orasidan manfiy sonlarni olib tashlab, qolgan yozuvlarni chiqaring.`,
      inputSpecUz: 'Butun sonlar oqimi.',
      outputSpecUz: 'Nomanfiy yozuvlar.',
      sampleInput: '3 -5 8 -1 0 12',
      sampleOutput: '3 8 0 12',
      difficulty: lvl,
      topicTag: 'Binar filtrlash',
      hintUz: 'x >= 0 yozuvlarnigina saqlang.',
      solutionCode: `#include <iostream>\nusing namespace std;\nint main(){ int x; bool f=true; while(cin>>x) if(x>=0){ cout<<(f?"":" ")<<x; f=false; } }`,
      explanationUz: 'Vaqtinchalik faylga faqat shartga mos yozuvlar write() qilinadi.',
    });
  }
  if (kind === 4) {
    return makeProblem(colId, 'File', num, {
      title: `Ikki saralangan binar faylni birlashtirish (Merge) (#${num})`,
      statementUz: `Ikki tartiblangan yozuvlar oqimi (N1 ta va N2 ta son) berilgan. Ularni bitta saralangan oqimga birlashtiring.`,
      inputSpecUz: 'N1, N1 ta son, N2, N2 ta son.',
      outputSpecUz: 'Birlashtirilgan saralangan oqim.',
      sampleInput: '3 1 4 7\n3 2 5 6',
      sampleOutput: '1 2 4 5 6 7',
      difficulty: lvl,
      topicTag: 'External Merge',
      hintUz: 'Ikki ko‘rsatkich (two pointers) bilan birlashtiring.',
      solutionCode: `#include <iostream>\n#include <vector>\n#include <algorithm>\nusing namespace std;\nint main(){ int n1; cin>>n1; vector<int> a(n1); for(int &x:a)cin>>x; int n2; cin>>n2; vector<int> b(n2); for(int &x:b)cin>>x; vector<int> c; merge(a.begin(),a.end(),b.begin(),b.end(),back_inserter(c)); for(size_t i=0;i<c.size();i++) cout<<(i?" ":"")<<c[i]; }`,
      explanationUz: 'Tashqi saralashda katta binar fayllar shu tarzda birlashtiriladi.',
    });
  }
  if (kind === 5) {
    return makeProblem(colId, 'File', num, {
      title: `Binar fayldagi dublikat yozuvlarni sanash (#${num})`,
      statementUz: `Fayldagi noyob yozuvlar sonini toping.`,
      inputSpecUz: 'Yozuvlar oqimi.',
      outputSpecUz: 'Noyob yozuvlar soni.',
      sampleInput: '4 7 4 9 7 2',
      sampleOutput: '4',
      difficulty: lvl,
      topicTag: 'Indekslash',
      hintUz: 'std::set dan foydalaning.',
      solutionCode: `#include <iostream>\n#include <set>\nusing namespace std;\nint main(){ set<int> s; int x; while(cin>>x) s.insert(x); cout<<s.size(); }`,
      explanationUz: 'Noyob kalitlar: {2, 4, 7, 9} -> 4 ta.',
    });
  }
  if (kind === 6) {
    return makeProblem(colId, 'File', num, {
      title: `Sana yozuvlaridan eng ertasini topish (#${num})`,
      statementUz: `Binar yozuvlar (Kun Oy Yil) berilgan. Eng erta sanani chiqaring.`,
      inputSpecUz: 'N va N ta (D M Y) yozuv.',
      outputSpecUz: 'Eng erta sana D M Y.',
      sampleInput: '3\n15 5 2025\n10 1 2024\n20 3 2024',
      sampleOutput: '10 1 2024',
      difficulty: lvl,
      topicTag: 'Strukturali binar yozuv',
      hintUz: '(Y, M, D) tuple bo‘yicha taqqoslang.',
      solutionCode: `#include <iostream>\n#include <tuple>\nusing namespace std;\nint main(){ int n; cin>>n; int bd=0,bm=0,by=99999; while(n--){ int d,m,y; cin>>d>>m>>y; if(tie(y,m,d) < tie(by,bm,bd)){ by=y; bm=m; bd=d; } } cout<<bd<<" "<<bm<<" "<<by; }`,
      explanationUz: 'std::tie(y, m, d) yil-oy-kun leksikografik tartibida oson taqqoslaydi.',
    });
  }
  if (kind === 7) {
    return makeProblem(colId, 'File', num, {
      title: `Satr yozuvlari binar faylida eng qisqa satr (#${num})`,
      statementUz: `N ta satr yozuvi berilgan. Eng qisqa satrni chiqaring.`,
      inputSpecUz: 'N va N ta satr.',
      outputSpecUz: 'Eng qisqa satr.',
      sampleInput: '3\nToshkent\nXiva\nSamarqand',
      sampleOutput: 'Xiva',
      difficulty: lvl,
      topicTag: 'Matnli binar yozuv',
      hintUz: 's.size() bo‘yicha minimum toping.',
      solutionCode: `#include <iostream>\n#include <string>\nusing namespace std;\nint main(){ int n; cin>>n; string best, s; cin>>best; for(int i=1;i<n;i++){ cin>>s; if(s.size()<best.size()) best=s; } cout<<best; }`,
      explanationUz: '"Xiva" 4 ta belgidan iborat eng qisqa yozuv.',
    });
  }
  return makeProblem(colId, 'File', num, {
    title: `Binar fayldan seriyalar uzunliklarini ajratish (#${num})`,
    statementUz: `Bir xil qo‘shni sonlar seriyalari uzunliklarini alohida binar fayl yozuvlari ko‘rinishida chiqaring.`,
    inputSpecUz: 'Sonlar oqimi.',
    outputSpecUz: 'Seriyalar uzunliklari.',
    sampleInput: '2 2 2 5 5 1 9 9',
    sampleOutput: '3 2 1 2',
    difficulty: lvl,
    topicTag: 'RLE siqish',
    hintUz: 'Run-Length Encoding (RLE): prev == cur bo‘lsa cnt++, aks holda chiqaring.',
    solutionCode: `#include <iostream>\nusing namespace std;\nint main(){ int prev, cur, cnt=1; if(!(cin>>prev)) return 0; bool first=true; while(cin>>cur){ if(cur==prev) cnt++; else{ cout<<(first?"":" ")<<cnt; first=false; prev=cur; cnt=1; } } cout<<(first?"":" ")<<cnt; }`,
    explanationUz: '222 (3), 55 (2), 1 (1), 99 (2) -> RLE siqish algoritmining asosi.',
  });
});

export const COLLECTIONS_14_TO_19: CppCollection[] = [
  {
    id: 'col-14-string',
    order: 14,
    prefix: 'String',
    title: 'std::string bilan ishlash',
    descriptionUz: 'Zamonaviy C++ std::string sinfi: palindromlar, stringstream bilan so‘zlarni ajratish, qidirish va matn transformatsiyalari.',
    targetCount: 45,
    recommendedLevel: 'Intermediate',
    prerequisites: [
      { title: 'Belgilar va belgilar ketma-ketligi', description: 'ASCII kodlar va <cctype> funksiyalari.' },
    ],
    problems: stringProblems,
  },
  {
    id: 'col-15-recur',
    order: 15,
    prefix: 'Recur',
    title: 'Rekursiya',
    descriptionUz: 'O‘z-o‘zini chaqiruvchi funksiyalar, bazaviy holat, tezkor daraja, rekursiv Evklid va kombinatorika.',
    targetCount: 30,
    recommendedLevel: 'Upper-Intermediate',
    prerequisites: [
      { title: 'Sodda funksiyalar', description: 'Funksiyalar stek ramkasi (call stack) va qiymat qaytarish.' },
    ],
    problems: recurProblems,
  },
  {
    id: 'col-16-param',
    order: 16,
    prefix: 'Param',
    title: 'Funksiyalar: massiv, satr va tuzilma parametrlari',
    descriptionUz: 'Katta ma’lumotlarni const& va & havolalar orqali uzatish, hamda struct tuzilmalari bilan ishlash.',
    targetCount: 70,
    recommendedLevel: 'Upper-Intermediate',
    prerequisites: [
      { title: 'Bir o‘lchamli massivlar va std::string', description: 'Vector va string metodlarini bilish.' },
    ],
    problems: paramProblems,
  },
  {
    id: 'col-17-dynamic',
    order: 17,
    prefix: 'Dynamic',
    title: 'Dinamik tuzilmalar: stek, navbat, ro‘yxat',
    descriptionUz: 'LIFO stek, FIFO navbat, ikki tomonlama deque, bog‘lamli ro‘yxatlar (Linked List) va postfix ifodalarni hisoblash.',
    targetCount: 69,
    recommendedLevel: 'Advanced',
    prerequisites: [
      { title: 'Tuzilmalar (struct) va ko‘rsatkichlar', description: 'Dinamik xotira va STL konteynerlari.' },
    ],
    problems: dynamicProblems,
  },
  {
    id: 'col-18-text',
    order: 18,
    prefix: 'Text',
    title: 'Matnli fayllar',
    descriptionUz: 'Fayl oqimlari (ifstream/ofstream), satrlarni sanash, filtrlash va raqamli matn fayllarini tahlil qilish.',
    targetCount: 60,
    recommendedLevel: 'Upper-Intermediate',
    prerequisites: [
      { title: 'std::string bilan ishlash', description: 'getline va stringstream bilan matn o‘qish.' },
    ],
    problems: textProblems,
  },
  {
    id: 'col-19-file',
    order: 19,
    prefix: 'File',
    title: 'Binar fayllar',
    descriptionUz: 'Binar yozuvlar hajmi, tasodifiy murojaat (seekg), tashqi birlashtirish (Merge) va RLE siqish masalalari.',
    targetCount: 90,
    recommendedLevel: 'Advanced',
    prerequisites: [
      { title: 'Matnli fayllar va Tuzilmalar', description: 'Bayt o‘lchamlari (sizeof) va oqim pozitsiyasi.' },
    ],
    problems: fileProblems,
  },
];
