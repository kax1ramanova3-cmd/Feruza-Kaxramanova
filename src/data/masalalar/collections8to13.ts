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
      `#include <iostream>\n#include <vector>\n#include <algorithm>\nusing namespace std;\n\nint main() {\n    // ${code}: Yechim kodini yozing\n    \n    return 0;\n}`,
    ...data,
  };
}

// ============================================================================
// 8. MINIMUM VA MAKSIMUM — 30 exercises
// ============================================================================
const minmaxProblems: CppProblem[] = Array.from({ length: 30 }, (_, idx) => {
  const num = idx + 1;
  const colId = 'col-8-minmax';
  const sampleArr = [14, 5, 29, 5, 29, 11];
  const sampleStr = `${sampleArr.length} ` + sampleArr.join(' ');
  const lvl: CppLevel = num <= 10 ? 'Elementary' : num <= 20 ? 'Intermediate' : 'Upper-Intermediate';

  switch (num % 10) {
    case 1:
      return makeProblem(colId, 'Minmax', num, {
        title: `Eng kichik va eng katta element (#${num})`,
        statementUz: `N ta butun sondan iborat to‘plam berilgan. Undagi eng kichik (min) va eng katta (max) qiymatlarni toping (boshlang‘ich siljish +${num - 1}).`,
        inputSpecUz: 'Birinchi qatorda N, keyin N ta butun son.',
        outputSpecUz: 'min+offset va max+offset qiymatlari.',
        sampleInput: sampleStr,
        sampleOutput: `${5 + (num - 1)} ${29 + (num - 1)}`,
        difficulty: lvl,
        topicTag: 'Ekstremum qidirish',
        hintUz: 'Birinchi elementni ham min, ham max deb olib siklda yangilang.',
        solutionCode: `#include <iostream>\nusing namespace std;\nint main(){\n    int n, x; cin >> n >> x;\n    int mn = x, mx = x;\n    for(int i = 1; i < n; i++){ cin >> x; if(x < mn) mn = x; if(x > mx) mx = x; }\n    cout << mn + ${num - 1} << " " << mx + ${num - 1};\n}`,
        explanationUz: `O(N) vaqtda barcha elementlarni bir marta ko‘rib chiqib eng kichik va eng katta qiymat topiladi, so‘ngra ${num - 1} qo‘shiladi.`,
      });
    case 2:
      return makeProblem(colId, 'Minmax', num, {
        title: `Birinchi uchragan eng kichik element indeksi (#${num})`,
        statementUz: `N ta butun son berilgan. Birinchi uchragan eng kichik elementning 1-indeksli tartib raqamini toping (agar qiymatlar teng bo‘lsa eng chapdagisi).`,
        inputSpecUz: 'N va N ta butun son.',
        outputSpecUz: 'Birinchi min indeksi (1..N).',
        sampleInput: `${num === 2 ? '6 14 5 29 5 29 11' : `5 ${num} 8 3 3 9`}`,
        sampleOutput: `${num === 2 ? 2 : 3}`,
        difficulty: lvl,
        topicTag: 'Birinchi ekstremum',
        hintUz: 'Faqat x < mn (qat’iy kichik) bo‘lgandagina indeksni yangilang.',
        solutionCode: `#include <iostream>\nusing namespace std;\nint main(){\n    int n, x; cin >> n >> x;\n    int mn = x, idx = 1;\n    for(int i = 2; i <= n; i++){ cin >> x; if(x < mn){ mn = x; idx = i; } }\n    cout << idx;\n}`,
        explanationUz: 'Qat’iy < belgisi birinchi uchragan minimal element indeksini saqlab qolishni kafolatlaydi.',
      });
    case 3:
      return makeProblem(colId, 'Minmax', num, {
        title: `Oxirgi uchragan eng katta element indeksi (#${num})`,
        statementUz: `N ta butun son berilgan. Oxirgi uchragan eng katta elementning tartib raqamini (1..N) toping.`,
        inputSpecUz: 'N va N ta son.',
        outputSpecUz: 'Oxirgi max indeksi.',
        sampleInput: `6 14 5 29 5 ${29} 11`,
        sampleOutput: '5',
        difficulty: lvl,
        topicTag: 'Oxirgi ekstremum',
        hintUz: 'x >= mx (katta yoki teng) shartidan foydalaning.',
        solutionCode: `#include <iostream>\nusing namespace std;\nint main(){\n    int n, x; cin >> n >> x;\n    int mx = x, idx = 1;\n    for(int i = 2; i <= n; i++){ cin >> x; if(x >= mx){ mx = x; idx = i; } }\n    cout << idx;\n}`,
        explanationUz: 'x >= mx sharti teng qiymatlar uchraganda indeksni oxirgisiga yangilab boradi.',
      });
    case 4:
      return makeProblem(colId, 'Minmax', num, {
        title: `Juftliklardan eng kichik yig‘indi (#${num})`,
        statementUz: `N ta sonlar jufti (a, b) berilgan. (a + b + ${num}) ifodasining eng kichik qiymatini toping.`,
        inputSpecUz: 'N va N juft (a, b).',
        outputSpecUz: 'Eng kichik qiymat.',
        sampleInput: '3 4 7 2 3 9 1',
        sampleOutput: `${5 + num}`,
        difficulty: lvl,
        topicTag: 'Juftliklar ekstremumi',
        hintUz: 'Har bir juftlik uchun a + b ni hisoblab min bilan solishtiring.',
        solutionCode: `#include <iostream>\n#include <algorithm>\nusing namespace std;\nint main(){\n    int n; cin >> n;\n    long long ans = 1e18;\n    for(int i = 0; i < n; i++){ long long a, b; cin >> a >> b; ans = min(ans, a + b + ${num}); }\n    cout << ans;\n}`,
        explanationUz: `Har bir juftlik yig‘indisi mustaqil baholanadi: min(11, 5, 10) + ${num} = ${5 + num}.`,
      });
    case 5:
      return makeProblem(colId, 'Minmax', num, {
        title: `Minimal musbat sonni topish (#${num})`,
        statementUz: `N ta butun son berilgan. Musbat sonlar orasidan eng kichigini toping (agar musbat son bo‘lmasa 0 chiqaring).`,
        inputSpecUz: 'N va N ta butun son.',
        outputSpecUz: 'Eng kichik musbat son yoki 0.',
        sampleInput: `6 -5 0 ${10 + num} -2 ${4 + num} 99`,
        sampleOutput: `${4 + num}`,
        difficulty: lvl,
        topicTag: 'Shartli ekstremum',
        hintUz: 'found bayrog‘ini saqlang va faqat x > 0 bo‘lganda tekshiring.',
        solutionCode: `#include <iostream>\nusing namespace std;\nint main(){\n    int n; cin >> n;\n    bool found = false; long long mn = 0;\n    for(int i = 0; i < n; i++){ long long x; cin >> x; if(x > 0 && (!found || x < mn)){ mn = x; found = true; } }\n    cout << (found ? mn : 0);\n}`,
        explanationUz: 'Shartli ekstremumda avval bitta mos element topilganligini belgilash juda muhim.',
      });
    case 6:
      return makeProblem(colId, 'Minmax', num, {
        title: `Minimal va maksimal orasidagi elementlar soni (#${num})`,
        statementUz: `N ta har xil son berilgan. Birinchi minimal va birinchi maksimal elementlar orasida nechta element joylashgan?`,
        inputSpecUz: 'N va N ta son.',
        outputSpecUz: 'Oradagi elementlar soni.',
        sampleInput: `6 10 ${2 + num} 8 15 ${30 + num} 7`,
        sampleOutput: '2',
        difficulty: lvl,
        topicTag: 'Ekstremumlar oralig‘i',
        hintUz: 'abs(idxMax - idxMin) - 1.',
        solutionCode: `#include <iostream>\n#include <cmath>\nusing namespace std;\nint main(){\n    int n, x; cin >> n >> x;\n    int mn = x, mx = x, imn = 1, imx = 1;\n    for(int i = 2; i <= n; i++){ cin >> x; if(x < mn){ mn = x; imn = i; } if(x > mx){ mx = x; imx = i; } }\n    cout << (imn == imx ? 0 : abs(imx - imn) - 1);\n}`,
        explanationUz: 'Indekslar 2 va 5 orasida 2 ta element (3 va 4-o‘rinlar) bor.',
      });
    case 7:
      return makeProblem(colId, 'Minmax', num, {
        title: `Ekstremumlardan tashqari elementlar yig‘indisi (#${num})`,
        statementUz: `N ta son berilgan. Barcha minimal va maksimal qiymatlarni chiqarib tashlaganda qolgan elementlar yig‘indisini toping.`,
        inputSpecUz: 'N va N ta son.',
        outputSpecUz: 'Qolgan elementlar yig‘indisi.',
        sampleInput: '5 2 10 4 6 10',
        sampleOutput: '10',
        difficulty: lvl,
        topicTag: 'Ekstremum filtri',
        hintUz: 'Avval min va max ni toping, so‘ngra x != mn && x != mx larni qo‘shing.',
        solutionCode: `#include <iostream>\n#include <vector>\n#include <algorithm>\nusing namespace std;\nint main(){\n    int n; cin >> n; vector<long long> a(n);\n    for(int i=0;i<n;i++) cin>>a[i];\n    long long mn = *min_element(a.begin(), a.end()), mx = *max_element(a.begin(), a.end()), s = 0;\n    for(long long x : a) if(x != mn && x != mx) s += x;\n    cout << s;\n}`,
        explanationUz: '2 va 10 lar chiqarib tashlansa 4 + 6 = 10 qoladi.',
      });
    case 8:
      return makeProblem(colId, 'Minmax', num, {
        title: `Ikki eng kichik element (#${num})`,
        statementUz: `N >= 2 ta son berilgan. Eng kichik ikkita elementni o‘sish tartibida chiqaring.`,
        inputSpecUz: 'N va N ta son.',
        outputSpecUz: 'min1 va min2.',
        sampleInput: `5 12 ${3 + num} 9 ${1 + num} 20`,
        sampleOutput: `${1 + num} ${3 + num}`,
        difficulty: lvl,
        topicTag: 'Ikkinchi ekstremum',
        hintUz: 'Agar x < m1 bo‘lsa m2 = m1; m1 = x; aks holda agar x < m2 bo‘lsa m2 = x.',
        solutionCode: `#include <iostream>\nusing namespace std;\nint main(){\n    int n; cin >> n;\n    long long m1 = 1e18, m2 = 1e18;\n    for(int i=0;i<n;i++){ long long x; cin>>x; if(x < m1){ m2 = m1; m1 = x; } else if(x < m2){ m2 = x; } }\n    cout << m1 << " " << m2;\n}`,
        explanationUz: 'Massivni saralamasdan ham O(N) vaqtda ikkita eng kichik qiymatni topish mumkin.',
      });
    case 9:
      return makeProblem(colId, 'Minmax', num, {
        title: `Ketma-ket qo‘shni juftliklar eng katta yig‘indisi (#${num})`,
        statementUz: `N >= 2 ta son berilgan. Qo‘shni ikki element yig‘indisining maksimal qiymatini toping.`,
        inputSpecUz: 'N va N ta son.',
        outputSpecUz: 'Maksimal qo‘shni yig‘indi.',
        sampleInput: `5 3 8 ${4 + num} 6 2`,
        sampleOutput: `${8 + 4 + num}`,
        difficulty: lvl,
        topicTag: 'Qo‘shni juftlik',
        hintUz: 'Oldingi element prev ni saqlab prev + cur ni tekshiring.',
        solutionCode: `#include <iostream>\n#include <algorithm>\nusing namespace std;\nint main(){\n    int n; cin >> n; long long prev; cin >> prev; long long ans = -1e18;\n    for(int i=1;i<n;i++){ long long cur; cin>>cur; ans = max(ans, prev + cur); prev = cur; }\n    cout << ans;\n}`,
        explanationUz: 'Har qadamda prev + cur yangilanadi va prev = cur qilinadi.',
      });
    default:
      return makeProblem(colId, 'Minmax', num, {
        title: `Ekstremal toq elementlar soni (#${num})`,
        statementUz: `N ta son berilgan. Toq sonlar ichida eng kattasini toping (toq son bo‘lmasa -1).`,
        inputSpecUz: 'N va N ta son.',
        outputSpecUz: 'Maksimal toq son yoki -1.',
        sampleInput: `5 4 ${11 + num} 8 ${23 + (num % 2 === 0 ? 1 : 0)} 10`,
        sampleOutput: `${23 + (num % 2 === 0 ? 1 : 0)}`,
        difficulty: lvl,
        topicTag: 'Shartli ekstremum',
        hintUz: 'abs(x) % 2 == 1 bo‘lgandagina max yangilanadi.',
        solutionCode: `#include <iostream>\n#include <cmath>\nusing namespace std;\nint main(){\n    int n; cin>>n; bool ok=false; long long mx=-1;\n    for(int i=0;i<n;i++){ long long x; cin>>x; if(abs(x)%2==1 && (!ok || x>mx)){ mx=x; ok=true; } }\n    cout<<(ok?mx:-1);\n}`,
        explanationUz: 'Faqat toq sonlar orasida maksimal qiymat qidiriladi.',
      });
  }
});

// ============================================================================
// 9. SODDA FUNKSIYALAR — 60 exercises (Proc1..Proc60)
// ============================================================================
const procProblems: CppProblem[] = Array.from({ length: 60 }, (_, idx) => {
  const num = idx + 1;
  const colId = 'col-9-proc';
  const lvl: CppLevel = num <= 20 ? 'Elementary' : num <= 45 ? 'Intermediate' : 'Upper-Intermediate';
  const cat = idx % 10;
  if (cat === 0) {
    const pwr = 2 + (idx % 4);
    const val = 2 + (idx % 3);
    const res = Math.pow(val, pwr);
    return makeProblem(colId, 'Proc', num, {
      title: `PowerA${pwr} funksiyasi (#${num})`,
      statementUz: `Sonning ${pwr}-darajasini hisoblovchi PowerA${pwr}(x) funksiyasini tuzing va berilgan A soni uchun natijani chiqaring.`,
      inputSpecUz: 'Butun son A.',
      outputSpecUz: `A^${pwr} qiymati.`,
      sampleInput: `${val}`,
      sampleOutput: `${res}`,
      difficulty: lvl,
      topicTag: 'Qiymat qaytaruvchi funksiya',
      hintUz: `long long PowerA${pwr}(long long x) funksiyasini yozing.`,
      solutionCode: `#include <iostream>\nusing namespace std;\nlong long powerN(long long x){ long long r=1; for(int i=0;i<${pwr};i++) r*=x; return r; }\nint main(){ long long a; cin>>a; cout<<powerN(a); }`,
      explanationUz: `Funksiya sikl yordamida ${pwr}-darajani hisoblab qaytaradi.`,
    });
  }
  if (cat === 1) {
    return makeProblem(colId, 'Proc', num, {
      title: `O‘rta arifmetik va o‘rta geometrik Mean funksiyasi (#${num})`,
      statementUz: `Ikki X va Y musbat sonining o‘rta arifmetigi va o‘rta geometrigini havola (&) parametrlari orqali hisoblovchi Mean(X, Y, AMean, GMean) funksiyasini tuzing.`,
      inputSpecUz: 'Ikkita haqiqiy son X va Y.',
      outputSpecUz: 'AMean va GMean (2 kasr aniqlikda).',
      sampleInput: '4 16',
      sampleOutput: '10.00 8.00',
      difficulty: lvl,
      topicTag: 'Havola (&) parametri',
      hintUz: 'void Mean(double x, double y, double &am, double &gm) ko‘rinishida yozing.',
      solutionCode: `#include <iostream>\n#include <cmath>\n#include <iomanip>\nusing namespace std;\nvoid Mean(double x, double y, double &am, double &gm){ am=(x+y)/2.0; gm=sqrt(x*y); }\nint main(){ double x,y,a,g; cin>>x>>y; Mean(x,y,a,g); cout<<fixed<<setprecision(2)<<a<<" "<<g; }`,
      explanationUz: 'C++ da & havolasi funksiyaga bir nechta natijani tashqariga qaytarish imkonini beradi.',
    });
  }
  if (cat === 2) {
    const sample = 10 + num;
    return makeProblem(colId, 'Proc', num, {
      title: `Sign(X) ishora funksiyasi (#${num})`,
      statementUz: `X < 0 bo‘lsa -1, X == 0 bo‘lsa 0, X > 0 bo‘lsa 1 qaytaruvchi Sign(X) funksiyasini yozing va Sign(A) + Sign(B) ni toping.`,
      inputSpecUz: 'Ikkita son A va B.',
      outputSpecUz: 'Sign(A) + Sign(B).',
      sampleInput: `${-sample} ${sample}`,
      sampleOutput: '0',
      difficulty: lvl,
      topicTag: 'Funksiya kompozitsiyasi',
      hintUz: 'int Sign(int x) funksiyasini tuzing.',
      solutionCode: `#include <iostream>\nusing namespace std;\nint Sign(int x){ return x < 0 ? -1 : (x > 0 ? 1 : 0); }\nint main(){ int a,b; cin>>a>>b; cout<<Sign(a)+Sign(b); }`,
      explanationUz: 'Manfiy va musbat ishoralar yig‘indisi -1 + 1 = 0 beradi.',
    });
  }
  if (cat === 3) {
    const sampleN = 1230 + num;
    const sumD = String(sampleN).split('').reduce((a, c) => a + Number(c), 0);
    const cntD = String(sampleN).length;
    return makeProblem(colId, 'Proc', num, {
      title: `DigitCountSum funksiyasi (#${num})`,
      statementUz: `Butun K sonining raqamlari soni C va yig‘indisi S ni topuvchi DigitCountSum(K, C, S) funksiyasini yozing.`,
      inputSpecUz: 'Butun son K.',
      outputSpecUz: 'C va S qiymatlari.',
      sampleInput: `${sampleN}`,
      sampleOutput: `${cntD} ${sumD}`,
      difficulty: lvl,
      topicTag: 'Havola (&) parametri',
      hintUz: 'while(k > 0) bilan c++ va s += k % 10 bajaring.',
      solutionCode: `#include <iostream>\nusing namespace std;\nvoid DigitCountSum(long long k, int &c, int &s){ c=0; s=0; while(k>0){ c++; s+=k%10; k/=10; } }\nint main(){ long long k; int c,s; cin>>k; DigitCountSum(k,c,s); cout<<c<<" "<<s; }`,
      explanationUz: 'Raqamlar soni va yig‘indisi bitta funksiya chaqiruvida hisoblanadi.',
    });
  }
  if (cat === 4) {
    const sampleN = 450 + num;
    const rev = Number(String(sampleN).split('').reverse().join(''));
    return makeProblem(colId, 'Proc', num, {
      title: `InvDigits teskari son funksiyasi (#${num})`,
      statementUz: `Musbat K sonining raqamlarini teskari tartibda qaytaruvchi InvDigits(K) funksiyasini tuzing.`,
      inputSpecUz: 'Butun son K.',
      outputSpecUz: 'Teskari aylantirilgan son.',
      sampleInput: `${sampleN}`,
      sampleOutput: `${rev}`,
      difficulty: lvl,
      topicTag: 'Qiymat qaytaruvchi funksiya',
      hintUz: 'r = r * 10 + k % 10.',
      solutionCode: `#include <iostream>\nusing namespace std;\nlong long InvDigits(long long k){ long long r=0; while(k>0){ r=r*10+k%10; k/=10; } return r; }\nint main(){ long long k; cin>>k; cout<<InvDigits(k); }`,
      explanationUz: 'Funksiya sonni teskari yozib qaytaradi.',
    });
  }
  if (cat === 5) {
    return makeProblem(colId, 'Proc', num, {
      title: `Swap va SortInc3 funksiyasi (#${num})`,
      statementUz: `Uchta sonni o‘sish tartibida joylashtiruvchi SortInc3(A, B, C) protsedurasini tuzing.`,
      inputSpecUz: 'Uchta butun son A, B, C.',
      outputSpecUz: 'Tartiblangan A, B, C.',
      sampleInput: `${num + 10} ${num} ${num + 5}`,
      sampleOutput: `${num} ${num + 5} ${num + 10}`,
      difficulty: lvl,
      topicTag: 'Saralash funksiyasi',
      hintUz: 'if(a>b)swap(a,b); if(b>c)swap(b,c); if(a>b)swap(a,b);',
      solutionCode: `#include <iostream>\n#include <algorithm>\nusing namespace std;\nvoid SortInc3(int &a, int &b, int &c){ if(a>b)swap(a,b); if(b>c)swap(b,c); if(a>b)swap(a,b); }\nint main(){ int a,b,c; cin>>a>>b>>c; SortInc3(a,b,c); cout<<a<<" "<<b<<" "<<c; }`,
      explanationUz: 'Uchta taqqoslash va swap har qanday uchlikni tartiblaydi.',
    });
  }
  if (cat === 6) {
    const primes = [2, 3, 5, 7, 11, 13, 17, 19, 23, 29];
    const pSample = primes[idx % primes.length];
    return makeProblem(colId, 'Proc', num, {
      title: `IsPrime tub son tekshiruvchi funksiya (#${num})`,
      statementUz: `N > 1 soni tub bo‘lsa 1, aks holda 0 qaytaruvchi IsPrime(N) funksiyasini tuzing.`,
      inputSpecUz: 'Butun son N.',
      outputSpecUz: '1 yoki 0.',
      sampleInput: `${pSample}`,
      sampleOutput: '1',
      difficulty: lvl,
      topicTag: 'Sonlar nazariyasi',
      hintUz: 'i = 2 dan i*i <= n gacha bo‘linuvchini tekshiring.',
      solutionCode: `#include <iostream>\nusing namespace std;\nbool IsPrime(int n){ if(n<2)return false; for(int i=2;i*i<=n;i++) if(n%i==0)return false; return true; }\nint main(){ int n; cin>>n; cout<<IsPrime(n); }`,
      explanationUz: 'Ildiz N gacha tekshirish O(sqrt(N)) tezlik beradi.',
    });
  }
  if (cat === 7) {
    const a = 12 + idx;
    const b = 18 + idx;
    const gcd = (x: number, y: number): number => (y === 0 ? x : gcd(y, x % y));
    const g = gcd(a, b);
    return makeProblem(colId, 'Proc', num, {
      title: `GCD2(A, B) funksiyasi (#${num})`,
      statementUz: `A va B sonlarining eng katta umumiy bo‘luvchisini qaytaruvchi GCD2(A, B) funksiyasini yozing.`,
      inputSpecUz: 'A va B.',
      outputSpecUz: 'EKUB(A, B).',
      sampleInput: `${a} ${b}`,
      sampleOutput: `${g}`,
      difficulty: lvl,
      topicTag: 'EKUB/EKUK',
      hintUz: 'Evklid algoritmini funksiya ichida yozing.',
      solutionCode: `#include <iostream>\nusing namespace std;\nlong long GCD2(long long a, long long b){ while(b){ long long t=a%b; a=b; b=t; } return a; }\nint main(){ long long a,b; cin>>a>>b; cout<<GCD2(a,b); }`,
      explanationUz: 'Qayta ishlatiluvchi GCD2 funksiyasi.',
    });
  }
  if (cat === 8) {
    const nVal = 4 + (idx % 5);
    let fact = 1;
    for (let i = 2; i <= nVal; i++) fact *= i;
    return makeProblem(colId, 'Proc', num, {
      title: `Fact(N) faktorial funksiyasi (#${num})`,
      statementUz: `N! ni hisoblovchi Fact(N) funksiyasini tuzing.`,
      inputSpecUz: 'N (1 <= N <= 15).',
      outputSpecUz: 'N! qiymati.',
      sampleInput: `${nVal}`,
      sampleOutput: `${fact}`,
      difficulty: lvl,
      topicTag: 'Matematik funksiya',
      hintUz: '1 dan N gacha ko‘paytma qaytaring.',
      solutionCode: `#include <iostream>\nusing namespace std;\nlong long Fact(int n){ long long r=1; for(int i=2;i<=n;i++) r*=i; return r; }\nint main(){ int n; cin>>n; cout<<Fact(n); }`,
      explanationUz: `${nVal}! = ${fact}.`,
    });
  }
  // cat === 9: Kabisa yili / Oy kunlari
  const ySample = 2000 + num;
  const leap = ySample % 400 === 0 || (ySample % 4 === 0 && ySample % 100 !== 0);
  return makeProblem(colId, 'Proc', num, {
    title: `IsLeapYear(Y) funksiyasi (#${num})`,
    statementUz: `Yil Y kabisa bo‘lsa 1, aks holda 0 qaytaruvchi IsLeapYear(Y) funksiyasini yozing.`,
    inputSpecUz: 'Yil Y.',
    outputSpecUz: '1 yoki 0.',
    sampleInput: `${ySample}`,
    sampleOutput: leap ? '1' : '0',
    difficulty: lvl,
    topicTag: 'Kalendar funksiyasi',
    hintUz: 'return (y%400==0) || (y%4==0 && y%100!=0);',
    solutionCode: `#include <iostream>\nusing namespace std;\nbool IsLeapYear(int y){ return (y%400==0)||(y%4==0&&y%100!=0); }\nint main(){ int y; cin>>y; cout<<IsLeapYear(y); }`,
    explanationUz: 'Grigorian kalendari qoidasiga ko‘ra kabisa yili tekshiriladi.',
  });
});

// ============================================================================
// 10. BIR O‘LCHAMLI MASSIVLAR — 140 exercises (Array1..Array140)
// ============================================================================
const arrayProblems: CppProblem[] = Array.from({ length: 140 }, (_, idx) => {
  const num = idx + 1;
  const colId = 'col-10-array';
  const lvl: CppLevel =
    num <= 30 ? 'Beginner' : num <= 65 ? 'Elementary' : num <= 105 ? 'Intermediate' : 'Upper-Intermediate';
  const mode = idx % 14;
  const baseArr = [3, 8, 12, 5, 19, 8, 2];

  if (mode === 0) {
    const nSample = 4 + (idx % 4);
    const odds = Array.from({ length: nSample }, (_, i) => 2 * i + 1);
    return makeProblem(colId, 'Array', num, {
      title: `Dastlabki N ta toq son massivi (#${num})`,
      statementUz: `N > 0 berilgan. Dastlabki N ta musbat toq sondan iborat massiv hosil qiling va chiqaring.`,
      inputSpecUz: 'Butun son N.',
      outputSpecUz: 'N ta toq son.',
      sampleInput: `${nSample}`,
      sampleOutput: odds.join(' '),
      difficulty: lvl,
      topicTag: 'Massiv yaratish',
      hintUz: 'a[i] = 2 * i + 1.',
      solutionCode: `#include <iostream>\n#include <vector>\nusing namespace std;\nint main(){ int n; cin>>n; vector<int> a(n); for(int i=0;i<n;i++) a[i]=2*i+1; for(int i=0;i<n;i++) cout<<(i?" ":"")<<a[i]; }`,
      explanationUz: '0-indekstdan boshlab 2*i+1 formulasi toq sonlarni beradi.',
    });
  }
  if (mode === 1) {
    const nSample = 4 + (idx % 3);
    const pow2 = Array.from({ length: nSample }, (_, i) => 1 << (i + 1));
    return makeProblem(colId, 'Array', num, {
      title: `2 ning darajalari massivi (#${num})`,
      statementUz: `N > 0 berilgan. 2^1, 2^2, ..., 2^N qiymatlardan iborat massiv hosil qiling.`,
      inputSpecUz: 'Butun son N.',
      outputSpecUz: 'Massiv elementlari.',
      sampleInput: `${nSample}`,
      sampleOutput: pow2.join(' '),
      difficulty: lvl,
      topicTag: 'Massiv yaratish',
      hintUz: 'a[0]=2, keyin a[i] = a[i-1] * 2.',
      solutionCode: `#include <iostream>\n#include <vector>\nusing namespace std;\nint main(){ int n; cin>>n; vector<long long> a(n); a[0]=2; for(int i=1;i<n;i++) a[i]=a[i-1]*2; for(int i=0;i<n;i++) cout<<(i?" ":"")<<a[i]; }`,
      explanationUz: 'Har keyingi element oldingisidan 2 marta katta.',
    });
  }
  if (mode === 2) {
    const nSample = 5;
    const rev = [...baseArr.slice(0, nSample)].reverse();
    return makeProblem(colId, 'Array', num, {
      title: `Massivni teskari tartibda chiqarish (#${num})`,
      statementUz: `N ta elementli massiv berilgan. Elementlarni oxiridan boshiga qarab teskari tartibda chiqaring.`,
      inputSpecUz: 'N va N ta son.',
      outputSpecUz: 'Teskari tartibdagi elementlar.',
      sampleInput: `${nSample} ${baseArr.slice(0, nSample).join(' ')}`,
      sampleOutput: rev.join(' '),
      difficulty: lvl,
      topicTag: 'Indekslash',
      hintUz: 'for (int i = n - 1; i >= 0; i--).',
      solutionCode: `#include <iostream>\n#include <vector>\nusing namespace std;\nint main(){ int n; cin>>n; vector<int> a(n); for(int &x:a)cin>>x; for(int i=n-1;i>=0;i--) cout<<(i<n-1?" ":"")<<a[i]; }`,
      explanationUz: 'Massiv oxirgi n-1 indeksdan 0 gacha o‘qiladi.',
    });
  }
  if (mode === 3) {
    const evens = baseArr.filter((x) => x % 2 === 0);
    return makeProblem(colId, 'Array', num, {
      title: `Massivdagi juft elementlar va ularning soni (#${num})`,
      statementUz: `N ta elementli massiv berilgan. Undagi barcha juft sonlarni va oxirida ularning sonini chiqaring.`,
      inputSpecUz: 'N va N ta son.',
      outputSpecUz: 'Juft elementlar va soni.',
      sampleInput: `${baseArr.length} ${baseArr.join(' ')}`,
      sampleOutput: `${evens.join(' ')} ${evens.length}`,
      difficulty: lvl,
      topicTag: 'Filtrlash',
      hintUz: 'x % 2 == 0 shartini tekshiring.',
      solutionCode: `#include <iostream>\n#include <vector>\nusing namespace std;\nint main(){ int n; cin>>n; vector<int> e; for(int i=0;i<n;i++){ int x; cin>>x; if(x%2==0) e.push_back(x); } for(int x:e) cout<<x<<" "; cout<<e.size(); }`,
      explanationUz: 'Juft sonlar alohida yig‘ilib, oxirida size() chiqariladi.',
    });
  }
  if (mode === 4) {
    const sum = baseArr.reduce((a, b) => a + b, 0);
    return makeProblem(colId, 'Array', num, {
      title: `Massiv elementlari yig‘indisi (#${num})`,
      statementUz: `N ta butun sonli massiv berilgan. Barcha elementlar yig‘indisini toping.`,
      inputSpecUz: 'N va N ta son.',
      outputSpecUz: 'Yig‘indi.',
      sampleInput: `${baseArr.length} ${baseArr.join(' ')}`,
      sampleOutput: `${sum}`,
      difficulty: lvl,
      topicTag: 'Yig‘indi',
      hintUz: 'long long sum = 0; for(int x : a) sum += x;',
      solutionCode: `#include <iostream>\nusing namespace std;\nint main(){ int n; cin>>n; long long s=0; for(int i=0;i<n;i++){ long long x; cin>>x; s+=x; } cout<<s; }`,
      explanationUz: 'Har bir element akkumulyatorga qo‘shiladi.',
    });
  }
  if (mode === 5) {
    const kShift = (idx % 3) + 1;
    const arr = [10, 20, 30, 40, 50];
    const sumRange = arr.slice(kShift, 5).reduce((a, b) => a + b, 0);
    return makeProblem(colId, 'Array', num, {
      title: `K dan L gacha elementlar yig‘indisi (#${num})`,
      statementUz: `N ta elementli massiv va K <= L (1-indeksli) berilgan. K dan L gacha elementlar yig‘indisini toping.`,
      inputSpecUz: 'N, N ta son, hamda K va L.',
      outputSpecUz: 'Yig‘indi.',
      sampleInput: `5 10 20 30 40 50 ${kShift + 1} 5`,
      sampleOutput: `${sumRange}`,
      difficulty: lvl,
      topicTag: 'Oraliq yig‘indisi',
      hintUz: '0-indeksli massivda K-1 dan L-1 gacha yuriladi.',
      solutionCode: `#include <iostream>\n#include <vector>\nusing namespace std;\nint main(){ int n; cin>>n; vector<long long> a(n); for(auto &x:a)cin>>x; int k,l; cin>>k>>l; long long s=0; for(int i=k-1;i<l;i++) s+=a[i]; cout<<s; }`,
      explanationUz: '1-indeksli oraliq C++ da k-1 dan l-1 gacha mos keladi.',
    });
  }
  if (mode === 6) {
    // Arifmetik progressiya tekshiruvi
    const diff = 3 + (idx % 4);
    const prog = [2, 2 + diff, 2 + 2 * diff, 2 + 3 * diff, 2 + 4 * diff];
    return makeProblem(colId, 'Array', num, {
      title: `Arifmetik progressiyani tekshirish (#${num})`,
      statementUz: `N ta elementli massiv arifmetik progressiya tashkil etsa uning ayirmasi d ni, aks holda 0 ni chiqaring.`,
      inputSpecUz: 'N va N ta son.',
      outputSpecUz: 'Ayirma d yoki 0.',
      sampleInput: `${prog.length} ${prog.join(' ')}`,
      sampleOutput: `${diff}`,
      difficulty: lvl,
      topicTag: 'Progressiya',
      hintUz: 'd = a[1] - a[0] olib, barcha i >= 2 uchun a[i] - a[i-1] == d ni tekshiring.',
      solutionCode: `#include <iostream>\n#include <vector>\nusing namespace std;\nint main(){ int n; cin>>n; vector<long long> a(n); for(auto &x:a)cin>>x; long long d=a[1]-a[0]; bool ok=true; for(int i=2;i<n;i++) if(a[i]-a[i-1]!=d) ok=false; cout<<(ok?d:0); }`,
      explanationUz: `Qo‘shni elementlar ayirmasi o‘zgarmas (${diff}) bo‘lsa arifmetik progressiya bo‘ladi.`,
    });
  }
  if (mode === 7) {
    // Lokal maksimumlar soni
    const arr = [2, 9, 4, 15, 7, 11, 3];
    return makeProblem(colId, 'Array', num, {
      title: `Lokal maksimumlar soni (#${num})`,
      statementUz: `N ta elementli massivda o‘zining ikkala qo‘shnisidan qat’iy katta bo‘lgan ichki lokal maksimumlar sonini toping.`,
      inputSpecUz: 'N va N ta son.',
      outputSpecUz: 'Lokal maksimumlar soni.',
      sampleInput: `${arr.length} ${arr.join(' ')}`,
      sampleOutput: '3',
      difficulty: lvl,
      topicTag: 'Qo‘shni tahlil',
      hintUz: 'i = 1 dan n - 2 gacha a[i] > a[i-1] && a[i] > a[i+1] ni sanang.',
      solutionCode: `#include <iostream>\n#include <vector>\nusing namespace std;\nint main(){ int n; cin>>n; vector<int> a(n); for(int &x:a)cin>>x; int cnt=0; for(int i=1;i<n-1;i++) if(a[i]>a[i-1] && a[i]>a[i+1]) cnt++; cout<<cnt; }`,
      explanationUz: '9, 15 va 11 elementlari ikkala qo‘shnisidan katta.',
    });
  }
  if (mode === 8) {
    const arr = [4, 7, 2, 9, 5];
    const minVal = 2;
    const maxVal = 9;
    const swapped = arr.map((x) => (x === minVal ? maxVal : x === maxVal ? minVal : x));
    return makeProblem(colId, 'Array', num, {
      title: `Minimal va maksimal elementlarni almashtirish (#${num})`,
      statementUz: `Har xil elementli massivda eng kichik va eng katta elementlarning o‘rnini almashtiring.`,
      inputSpecUz: 'N va N ta son.',
      outputSpecUz: 'O‘zgartirilgan massiv.',
      sampleInput: `${arr.length} ${arr.join(' ')}`,
      sampleOutput: swapped.join(' '),
      difficulty: lvl,
      topicTag: 'Massiv o‘zgartirish',
      hintUz: 'imin va imax indekslarini topib swap(a[imin], a[imax]) bajaring.',
      solutionCode: `#include <iostream>\n#include <vector>\n#include <algorithm>\nusing namespace std;\nint main(){ int n; cin>>n; vector<int> a(n); for(int &x:a)cin>>x; int mn=0,mx=0; for(int i=1;i<n;i++){ if(a[i]<a[mn])mn=i; if(a[i]>a[mx])mx=i; } swap(a[mn],a[mx]); for(int i=0;i<n;i++) cout<<(i?" ":"")<<a[i]; }`,
      explanationUz: 'Indekslar topilgandan keyin bitta swap bilan joylar almashadi.',
    });
  }
  if (mode === 9) {
    const arr = [5, 1, 9, 3, 7];
    const sorted = [...arr].sort((a, b) => a - b);
    return makeProblem(colId, 'Array', num, {
      title: `Massivni o‘sish tartibida saralash (#${num})`,
      statementUz: `N ta elementli massivni o‘sish tartibida saralang.`,
      inputSpecUz: 'N va N ta son.',
      outputSpecUz: 'Saralangan massiv.',
      sampleInput: `${arr.length} ${arr.join(' ')}`,
      sampleOutput: sorted.join(' '),
      difficulty: lvl,
      topicTag: 'Saralash',
      hintUz: 'sort(a.begin(), a.end()) yoki pufakchali saralash ishlating.',
      solutionCode: `#include <iostream>\n#include <vector>\n#include <algorithm>\nusing namespace std;\nint main(){ int n; cin>>n; vector<int> a(n); for(int &x:a)cin>>x; sort(a.begin(), a.end()); for(int i=0;i<n;i++) cout<<(i?" ":"")<<a[i]; }`,
      explanationUz: 'std::sort O(N log N) tezlikda massivni tartiblaydi.',
    });
  }
  if (mode === 10) {
    const arr = [4, 4, 7, 2, 7, 7, 9];
    const uniq = Array.from(new Set(arr));
    return makeProblem(colId, 'Array', num, {
      title: `Takroriy elementlarni o‘chirish (#${num})`,
      statementUz: `N ta butun son berilgan. Birinchi uchragan tartibni saqlagan holda takrorlanuvchi elementlarni olib tashlang.`,
      inputSpecUz: 'N va N ta son.',
      outputSpecUz: 'Noyob elementlar.',
      sampleInput: `${arr.length} ${arr.join(' ')}`,
      sampleOutput: uniq.join(' '),
      difficulty: lvl,
      topicTag: 'Noyob elementlar',
      hintUz: 'set yoki oldingi uchraganlarni tekshiruvchi sikldan foydalaning.',
      solutionCode: `#include <iostream>\n#include <vector>\n#include <unordered_set>\nusing namespace std;\nint main(){ int n; cin>>n; unordered_set<int> seen; bool first=true; for(int i=0;i<n;i++){ int x; cin>>x; if(seen.insert(x).second){ cout<<(first?"":" ")<<x; first=false; } } }`,
      explanationUz: 'unordered_set element ilgari uchramaganligini O(1) da tekshiradi.',
    });
  }
  if (mode === 11) {
    const arr = [1, 2, 3, 4, 5];
    const shifted = [5, 1, 2, 3, 4];
    return makeProblem(colId, 'Array', num, {
      title: `Massivni o‘ngga 1 pozitsiya siklik siljitish (#${num})`,
      statementUz: `N ta elementli massivni o‘ngga 1 pozitsiyaga siklik siljiting (oxirgi element boshiga o‘tadi).`,
      inputSpecUz: 'N va N ta son.',
      outputSpecUz: 'Siljitilgan massiv.',
      sampleInput: `${arr.length} ${arr.join(' ')}`,
      sampleOutput: shifted.join(' '),
      difficulty: lvl,
      topicTag: 'Siklik siljitish',
      hintUz: 'Oxirgi elementni saqlab, orqadan oldinga ko‘chiring.',
      solutionCode: `#include <iostream>\n#include <vector>\nusing namespace std;\nint main(){ int n; cin>>n; vector<int> a(n); for(int &x:a)cin>>x; int last=a[n-1]; for(int i=n-1;i>0;i--) a[i]=a[i-1]; a[0]=last; for(int i=0;i<n;i++) cout<<(i?" ":"")<<a[i]; }`,
      explanationUz: 'Orqadan surish hech bir elementni yo‘qotmaslikni ta’minlaydi.',
    });
  }
  if (mode === 12) {
    const arr = [1, 3, 5, 7, 9];
    const pref = [1, 4, 9, 16, 25];
    return makeProblem(colId, 'Array', num, {
      title: `Prefiks yig‘indilar massivi B (#${num})`,
      statementUz: `A massiv berilgan. B[k] = A[0] + ... + A[k] bo‘ladigan prefiks yig‘indilar massivini hosil qiling.`,
      inputSpecUz: 'N va N ta son.',
      outputSpecUz: 'B massiv elementlari.',
      sampleInput: `${arr.length} ${arr.join(' ')}`,
      sampleOutput: pref.join(' '),
      difficulty: lvl,
      topicTag: 'Prefiks yig‘indi',
      hintUz: 'B[i] = B[i-1] + A[i].',
      solutionCode: `#include <iostream>\n#include <vector>\nusing namespace std;\nint main(){ int n; cin>>n; vector<long long> a(n); long long s=0; for(int i=0;i<n;i++){ cin>>a[i]; s+=a[i]; cout<<(i?" ":"")<<s; } }`,
      explanationUz: 'Prefiks yig‘indilar keyinchalik oraliq yig‘indisini O(1) da topishga yordam beradi.',
    });
  }
  // mode === 13: Eng ko'p uchragan element chastotasi
  const freqArr = [3, 7, 3, 9, 3, 7, 1];
  return makeProblem(colId, 'Array', num, {
    title: `Eng ko‘p uchragan element chastotasi (#${num})`,
    statementUz: `N ta elementli massivda eng ko‘p takrorlangan element necha marta uchrashini toping.`,
    inputSpecUz: 'N va N ta son.',
    outputSpecUz: 'Maksimal chastota.',
    sampleInput: `${freqArr.length} ${freqArr.join(' ')}`,
    sampleOutput: '3',
    difficulty: lvl,
    topicTag: 'Chastota tahlili',
    hintUz: 'map<int, int> yordamida har bir sonning takrorlanish sonini sanang.',
    solutionCode: `#include <iostream>\n#include <map>\n#include <algorithm>\nusing namespace std;\nint main(){ int n, mx=0; cin>>n; map<int,int> cnt; for(int i=0;i<n;i++){ int x; cin>>x; mx = max(mx, ++cnt[x]); } cout<<mx; }`,
    explanationUz: '3 soni massivda 3 marta uchragani uchun javob 3.',
  });
});

// ============================================================================
// 11. KETMA-KETLIKLAR — 40 exercises (Series1..Series40)
// ============================================================================
const seriesProblems: CppProblem[] = Array.from({ length: 40 }, (_, idx) => {
  const num = idx + 1;
  const colId = 'col-11-series';
  const lvl: CppLevel = num <= 15 ? 'Elementary' : num <= 30 ? 'Intermediate' : 'Upper-Intermediate';
  const kind = idx % 8;
  const sampleSeq = [4, -2, 7, 0, 11, 3];

  if (kind === 0) {
    const kMul = 1 + (idx % 4);
    const ans = sampleSeq.reduce((a, b) => a + b * kMul, 0);
    return makeProblem(colId, 'Series', num, {
      title: `Ketma-ketlik chiziqli yig‘indisi (#${num})`,
      statementUz: `N ta son ketma-ketligi berilgan. Har bir hadni ${kMul} ga ko‘paytirib umumiy yig‘indisini toping.`,
      inputSpecUz: 'N va N ta son.',
      outputSpecUz: 'Yig‘indi.',
      sampleInput: `${sampleSeq.length} ${sampleSeq.join(' ')}`,
      sampleOutput: `${ans}`,
      difficulty: lvl,
      topicTag: 'Yig‘indi',
      hintUz: 'Kiritish jarayonida darhol x * k ni qo‘shing.',
      solutionCode: `#include <iostream>\nusing namespace std;\nint main(){ int n; cin>>n; long long s=0; for(int i=0;i<n;i++){ long long x; cin>>x; s+=x*${kMul}; } cout<<s; }`,
      explanationUz: 'Ketma-ketlikni massivga saqlamasdan ham O(1) xotirada yig‘indini topish mumkin.',
    });
  }
  if (kind === 1) {
    const posCount = sampleSeq.filter((x) => x > 0).length;
    return makeProblem(colId, 'Series', num, {
      title: `0 bilan tugaydigan ketma-ketlik musbatlari (#${num})`,
      statementUz: `0 bilan tugaydigan noma’lum uzunlikdagi butun sonlar ketma-ketligi berilgan. Undagi musbat sonlar sonini toping.`,
      inputSpecUz: '0 bilan tugaydigan sonlar ketma-ketligi.',
      outputSpecUz: 'Musbat sonlar soni.',
      sampleInput: '4 -2 7 11 3 0',
      sampleOutput: `${posCount}`,
      difficulty: lvl,
      topicTag: 'Sentinel sikl',
      hintUz: 'while (cin >> x && x != 0) shaklida o‘qing.',
      solutionCode: `#include <iostream>\nusing namespace std;\nint main(){ long long x; int c=0; while(cin>>x && x!=0) if(x>0) c++; cout<<c; }`,
      explanationUz: '0 sentinel (to‘xtatuvchi) belgi vazifasini bajaradi.',
    });
  }
  if (kind === 2) {
    return makeProblem(colId, 'Series', num, {
      title: `O‘suvchi ketma-ketlikni tekshirish (#${num})`,
      statementUz: `N ta son ketma-ketligi qat’iy o‘suvchi bo‘lsa "TRUE", aks holda "FALSE" chiqaring.`,
      inputSpecUz: 'N va N ta son.',
      outputSpecUz: 'TRUE yoki FALSE.',
      sampleInput: '5 1 4 9 12 20',
      sampleOutput: 'TRUE',
      difficulty: lvl,
      topicTag: 'Monotonlik',
      hintUz: 'Har bir hadni oldingi had bilan solishtiring.',
      solutionCode: `#include <iostream>\nusing namespace std;\nint main(){ int n; cin>>n; long long prev; cin>>prev; bool ok=true; for(int i=1;i<n;i++){ long long cur; cin>>cur; if(cur<=prev) ok=false; prev=cur; } cout<<(ok?"TRUE":"FALSE"); }`,
      explanationUz: 'Har keyingi element oldingisidan katta bo‘lsa qat’iy o‘suvchi.',
    });
  }
  if (kind === 3) {
    return makeProblem(colId, 'Series', num, {
      title: `Birinchi K ga teng element indeksi (#${num})`,
      statementUz: `K va N ta son berilgan. Ketma-ketlikda birinchi uchragan K ga teng elementning 1-indeksli o‘rnini (yoki 0) chiqaring.`,
      inputSpecUz: 'K, N va N ta son.',
      outputSpecUz: 'Indeks yoki 0.',
      sampleInput: '7 5 3 9 7 1 7',
      sampleOutput: '3',
      difficulty: lvl,
      topicTag: 'Qidiruv',
      hintUz: 'Birinchi marta topilganda ans = i qilib saqlab oling.',
      solutionCode: `#include <iostream>\nusing namespace std;\nint main(){ int k,n,ans=0; cin>>k>>n; for(int i=1;i<=n;i++){ int x; cin>>x; if(x==k && ans==0) ans=i; } cout<<ans; }`,
      explanationUz: 'ans==0 sharti faqat birinchi topilgan indeksni saqlashni ta’minlaydi.',
    });
  }
  if (kind === 4) {
    return makeProblem(colId, 'Series', num, {
      title: `Ikki nol orasidagi yig‘indi (#${num})`,
      statementUz: `Kamida ikkita 0 uchraydigan ketma-ketlik berilgan. Birinchi va oxirgi nollar orasidagi sonlar yig‘indisini toping.`,
      inputSpecUz: 'N va N ta son.',
      outputSpecUz: 'Yig‘indi.',
      sampleInput: '7 5 0 4 6 2 0 9',
      sampleOutput: '12',
      difficulty: lvl,
      topicTag: 'Segment yig‘indisi',
      hintUz: 'Birinchi 0 dan keyin yig‘ishni boshlang, har 0 da oxirgi natijani yangilang.',
      solutionCode: `#include <iostream>\nusing namespace std;\nint main(){ int n; cin>>n; bool started=false; long long cur=0, ans=0; for(int i=0;i<n;i++){ long long x; cin>>x; if(x==0){ if(started) ans=cur; started=true; } else if(started){ cur+=x; } } cout<<ans; }`,
      explanationUz: 'Birinchi va oxirgi 0 orasida 4 + 6 + 2 = 12 joylashgan.',
    });
  }
  if (kind === 5) {
    return makeProblem(colId, 'Series', num, {
      title: `K ta to‘plamning o‘sish tartiblilari soni (#${num})`,
      statementUz: `K ta ketma-ketlik berilgan, har biri 0 bilan tugaydi. Nechtasi qat’iy o‘suvchi ekanligini toping.`,
      inputSpecUz: 'K va K ta 0-tugaydigan ketma-ketlik.',
      outputSpecUz: 'O‘suvchi ketma-ketliklar soni.',
      sampleInput: '2 1 3 5 0 4 2 6 0',
      sampleOutput: '1',
      difficulty: lvl,
      topicTag: 'Ichma-ich ketma-ketlik',
      hintUz: 'Tashqi sikl K marta, ichki while (cin >> x && x != 0).',
      solutionCode: `#include <iostream>\nusing namespace std;\nint main(){ int k, ans=0; cin>>k; while(k--){ long long prev; cin>>prev; bool ok=true; long long x; while(cin>>x && x!=0){ if(x<=prev) ok=false; prev=x; } if(ok) ans++; } cout<<ans; }`,
      explanationUz: '1-to‘plam (1,3,5) o‘suvchi, 2-to‘plam (4,2,6) o‘suvchi emas.',
    });
  }
  if (kind === 6) {
    return makeProblem(colId, 'Series', num, {
      title: `Qo‘shni manfiy-musbat ishora almashinishi (#${num})`,
      statementUz: `N ta nolga teng bo‘lmagan sonlar ketma-ketligida ishora almashinishlar sonini toping.`,
      inputSpecUz: 'N va N ta son.',
      outputSpecUz: 'Almashinishlar soni.',
      sampleInput: '5 2 -3 -4 7 -1',
      sampleOutput: '3',
      difficulty: lvl,
      topicTag: 'Ishora tahlili',
      hintUz: '(prev > 0) != (cur > 0) holatlarini sanang.',
      solutionCode: `#include <iostream>\nusing namespace std;\nint main(){ int n; cin>>n; long long prev; cin>>prev; int cnt=0; for(int i=1;i<n;i++){ long long cur; cin>>cur; if((prev>0)!=(cur>0)) cnt++; prev=cur; } cout<<cnt; }`,
      explanationUz: '2->-3, -4->7, 7->-1 o‘tishlarida ishora almashgan (3 marta).',
    });
  }
  return makeProblem(colId, 'Series', num, {
    title: `Ketma-ketlikdagi juft sonlar o‘rta arifmetigi (#${num})`,
    statementUz: `N ta son berilgan. Juft sonlar o‘rta arifmetigini 2 kasr aniqlikda chiqaring (juft bo‘lmasa 0.00).`,
    inputSpecUz: 'N va N ta son.',
    outputSpecUz: 'O‘rta arifmetik.',
    sampleInput: '5 4 7 10 3 6',
    sampleOutput: '6.67',
    difficulty: lvl,
    topicTag: 'Statistika',
    hintUz: '(4 + 10 + 6) / 3.0 = 6.67.',
    solutionCode: `#include <iostream>\n#include <iomanip>\nusing namespace std;\nint main(){ int n,c=0; double s=0; cin>>n; for(int i=0;i<n;i++){ int x; cin>>x; if(x%2==0){ s+=x; c++; } } cout<<fixed<<setprecision(2)<<(c?s/c:0.0); }`,
    explanationUz: 'Juft sonlar yig‘indisi ularning soniga haqiqiy bo‘linadi.',
  });
});

// ============================================================================
// 12. IKKI O‘LCHAMLI MASSIVLAR: MATRITSALAR — 100 exercises (Matrix1..Matrix100)
// ============================================================================
const matrixProblems: CppProblem[] = Array.from({ length: 100 }, (_, idx) => {
  const num = idx + 1;
  const colId = 'col-12-matrix';
  const lvl: CppLevel =
    num <= 25 ? 'Elementary' : num <= 60 ? 'Intermediate' : num <= 85 ? 'Upper-Intermediate' : 'Advanced';
  const mType = idx % 10;

  if (mType === 0) {
    const mult = 10 + (idx % 5);
    return makeProblem(colId, 'Matrix', num, {
      title: `M x N matritsani i*${mult} qoida bilan to‘ldirish (#${num})`,
      statementUz: `M va N berilgan. M x N o‘lchamli matritsaning i-satridagi barcha elementlari (i+1)*${mult} ga teng bo‘lsin.`,
      inputSpecUz: 'M va N.',
      outputSpecUz: 'Matritsa satrlari.',
      sampleInput: '2 3',
      sampleOutput: `${mult} ${mult} ${mult}\n${2 * mult} ${2 * mult} ${2 * mult}`,
      difficulty: lvl,
      topicTag: 'Matritsa yaratish',
      hintUz: 'Ichma-ich for(i) va for(j) sikllarini yozing.',
      solutionCode: `#include <iostream>\nusing namespace std;\nint main(){ int m,n; cin>>m>>n; for(int i=1;i<=m;i++){ for(int j=1;j<=n;j++) cout<<(j>1?" ":"")<<i*${mult}; cout<<"\\n"; } }`,
      explanationUz: 'Har bir satrda qiymat faqat satr raqami i ga bog‘liq.',
    });
  }
  if (mType === 1) {
    return makeProblem(colId, 'Matrix', num, {
      title: `Matritsaning barcha elementlari yig‘indisi (#${num})`,
      statementUz: `M x N o‘lchamli butun sonli matritsa berilgan. Barcha elementlar yig‘indisini toping.`,
      inputSpecUz: 'M, N va M x N ta son.',
      outputSpecUz: 'Umumiy yig‘indi.',
      sampleInput: '2 3\n1 2 3\n4 5 6',
      sampleOutput: '21',
      difficulty: lvl,
      topicTag: 'Matritsa yig‘indisi',
      hintUz: 'Ikki sikl ichida sum += a[i][j].',
      solutionCode: `#include <iostream>\nusing namespace std;\nint main(){ int m,n; cin>>m>>n; long long s=0; for(int i=0;i<m*n;i++){ long long x; cin>>x; s+=x; } cout<<s; }`,
      explanationUz: 'Matritsa elementlari yig‘indisi 1+2+3+4+5+6 = 21.',
    });
  }
  if (mType === 2) {
    return makeProblem(colId, 'Matrix', num, {
      title: `Har bir satr yig‘indisi (#${num})`,
      statementUz: `M x N matritsa berilgan. Har bir satr elementlarining yig‘indisini chiqaring.`,
      inputSpecUz: 'M, N va matritsa.',
      outputSpecUz: 'M ta satr yig‘indisi.',
      sampleInput: '2 3\n2 4 6\n1 3 5',
      sampleOutput: '12 9',
      difficulty: lvl,
      topicTag: 'Satr tahlili',
      hintUz: 'Tashqi sikl boshida rowSum = 0 qiling.',
      solutionCode: `#include <iostream>\nusing namespace std;\nint main(){ int m,n; cin>>m>>n; for(int i=0;i<m;i++){ long long s=0; for(int j=0;j<n;j++){ long long x; cin>>x; s+=x; } cout<<(i?" ":"")<<s; } }`,
      explanationUz: '1-satr yig‘indisi 12, 2-satr yig‘indisi 9.',
    });
  }
  if (mType === 3) {
    return makeProblem(colId, 'Matrix', num, {
      title: `Har bir ustun maksimal elementi (#${num})`,
      statementUz: `M x N matritsa berilgan. Har bir ustunning eng katta elementini chiqaring.`,
      inputSpecUz: 'M, N va matritsa.',
      outputSpecUz: 'N ta maksimal qiymat.',
      sampleInput: '2 3\n5 1 9\n3 8 4',
      sampleOutput: '5 8 9',
      difficulty: lvl,
      topicTag: 'Ustun tahlili',
      hintUz: 'Ustunlar bo‘yicha tashqi sikl j = 0..N-1 yuriting.',
      solutionCode: `#include <iostream>\n#include <vector>\n#include <algorithm>\nusing namespace std;\nint main(){ int m,n; cin>>m>>n; vector<vector<int>> a(m, vector<int>(n)); for(int i=0;i<m;i++)for(int j=0;j<n;j++)cin>>a[i][j]; for(int j=0;j<n;j++){ int mx=a[0][j]; for(int i=1;i<m;i++) mx=max(mx,a[i][j]); cout<<(j?" ":"")<<mx; } }`,
      explanationUz: 'Ustunlar bo‘yicha maksimumlar: 5, 8, 9.',
    });
  }
  if (mType === 4) {
    return makeProblem(colId, 'Matrix', num, {
      title: `Asosiy diagonal elementlari yig‘indisi (#${num})`,
      statementUz: `M x M kvadrat matritsa berilgan. Asosiy diagonal (i == j) elementlari yig‘indisini toping.`,
      inputSpecUz: 'M va M x M matritsa.',
      outputSpecUz: 'Diagonal yig‘indisi.',
      sampleInput: '3\n1 2 3\n4 5 6\n7 8 9',
      sampleOutput: '15',
      difficulty: lvl,
      topicTag: 'Diagonallar',
      hintUz: 'sum += a[i][i].',
      solutionCode: `#include <iostream>\n#include <vector>\nusing namespace std;\nint main(){ int m; cin>>m; long long s=0; for(int i=0;i<m;i++) for(int j=0;j<m;j++){ long long x; cin>>x; if(i==j) s+=x; } cout<<s; }`,
      explanationUz: 'Asosiy diagonal: 1 + 5 + 9 = 15.',
    });
  }
  if (mType === 5) {
    return makeProblem(colId, 'Matrix', num, {
      title: `Yordamchi diagonal elementlari yig‘indisi (#${num})`,
      statementUz: `M x M kvadrat matritsa berilgan. Yordamchi diagonal (i + j == M - 1) elementlari yig‘indisini toping.`,
      inputSpecUz: 'M va M x M matritsa.',
      outputSpecUz: 'Yordamchi diagonal yig‘indisi.',
      sampleInput: '3\n1 2 3\n4 5 6\n7 8 9',
      sampleOutput: '15',
      difficulty: lvl,
      topicTag: 'Diagonallar',
      hintUz: 'i + j == m - 1 shartini tekshiring.',
      solutionCode: `#include <iostream>\nusing namespace std;\nint main(){ int m; cin>>m; long long s=0; for(int i=0;i<m;i++) for(int j=0;j<m;j++){ long long x; cin>>x; if(i+j==m-1) s+=x; } cout<<s; }`,
      explanationUz: 'Yordamchi diagonal: 3 + 5 + 7 = 15.',
    });
  }
  if (mType === 6) {
    return makeProblem(colId, 'Matrix', num, {
      title: `Matritsani transponirlash (#${num})`,
      statementUz: `M x N matritsa berilgan. Satr va ustunlarni almashtirib (N x M transponirlangan matritsa) chiqaring.`,
      inputSpecUz: 'M, N va matritsa.',
      outputSpecUz: 'N x M matritsa.',
      sampleInput: '2 3\n1 2 3\n4 5 6',
      sampleOutput: '1 4\n2 5\n3 6',
      difficulty: lvl,
      topicTag: 'Transformatsiya',
      hintUz: 'a[i][j] o‘rniga a[j][i] tartibda chiqaring.',
      solutionCode: `#include <iostream>\n#include <vector>\nusing namespace std;\nint main(){ int m,n; cin>>m>>n; vector<vector<int>> a(m, vector<int>(n)); for(int i=0;i<m;i++)for(int j=0;j<n;j++)cin>>a[i][j]; for(int j=0;j<n;j++){ for(int i=0;i<m;i++) cout<<(i?" ":"")<<a[i][j]; cout<<"\\n"; } }`,
      explanationUz: '2x3 matritsa transponirlanganda 3x2 matritsaga aylanadi.',
    });
  }
  if (mType === 7) {
    return makeProblem(colId, 'Matrix', num, {
      title: `Matritsani gorizontal aks ettirish (#${num})`,
      statementUz: `M x N matritsa satrlari tartibini teskarisiga o‘zgartiring (1-satr M-satr bilan almashadi).`,
      inputSpecUz: 'M, N va matritsa.',
      outputSpecUz: 'O‘zgartirilgan matritsa.',
      sampleInput: '2 2\n1 2\n3 4',
      sampleOutput: '3 4\n1 2',
      difficulty: lvl,
      topicTag: 'Transformatsiya',
      hintUz: 'i = m-1 dan 0 gacha chiqaring yoki reverse(a.begin(), a.end()).',
      solutionCode: `#include <iostream>\n#include <vector>\n#include <algorithm>\nusing namespace std;\nint main(){ int m,n; cin>>m>>n; vector<vector<int>> a(m, vector<int>(n)); for(int i=0;i<m;i++)for(int j=0;j<n;j++)cin>>a[i][j]; reverse(a.begin(), a.end()); for(int i=0;i<m;i++){ for(int j=0;j<n;j++) cout<<(j?" ":"")<<a[i][j]; cout<<"\\n"; } }`,
      explanationUz: 'Satrlar vektorini teskari aylantirish eng qulay usul.',
    });
  }
  if (mType === 8) {
    return makeProblem(colId, 'Matrix', num, {
      title: `Matritsani soat miliga 90 gradus burish (#${num})`,
      statementUz: `M x M kvadrat matritsani soat mili yo‘nalishida 90 gradusga buring.`,
      inputSpecUz: 'M va M x M matritsa.',
      outputSpecUz: 'Burilgan matritsa.',
      sampleInput: '2\n1 2\n3 4',
      sampleOutput: '3 1\n4 2',
      difficulty: lvl,
      topicTag: 'Burish',
      hintUz: 'Yangi (i, j) element eski (m - 1 - j, i) ga teng.',
      solutionCode: `#include <iostream>\n#include <vector>\nusing namespace std;\nint main(){ int m; cin>>m; vector<vector<int>> a(m, vector<int>(m)); for(int i=0;i<m;i++)for(int j=0;j<m;j++)cin>>a[i][j]; for(int i=0;i<m;i++){ for(int j=0;j<m;j++) cout<<(j?" ":"")<<a[m-1-j][i]; cout<<"\\n"; } }`,
      explanationUz: 'Transponirlash + har bir satrni teskari qilish ham 90 gradus burish beradi.',
    });
  }
  return makeProblem(colId, 'Matrix', num, {
    title: `Bosh diagonaldan yuqori uchburchakni nolga aylantirish (#${num})`,
    statementUz: `M x M matritsada bosh diagonaldan yuqoridagi (j > i) elementlarni 0 ga almashtirib chiqaring.`,
    inputSpecUz: 'M va M x M matritsa.',
    outputSpecUz: 'Quyi uchburchak matritsa.',
    sampleInput: '2\n5 8\n3 7',
    sampleOutput: '5 0\n3 7',
    difficulty: lvl,
    topicTag: 'Uchburchak matritsa',
    hintUz: 'if (j > i) a[i][j] = 0;',
    solutionCode: `#include <iostream>\nusing namespace std;\nint main(){ int m; cin>>m; for(int i=0;i<m;i++){ for(int j=0;j<m;j++){ int x; cin>>x; cout<<(j?" ":"")<<(j>i?0:x); } cout<<"\\n"; } }`,
    explanationUz: 'Ustun indeksi satr indeksidan katta bo‘lganda element bosh diagonal ustida yotadi.',
  });
});

// ============================================================================
// 13. BELGILAR VA BELGILAR KETMA-KETLIGI — 25 exercises (Char1..Char25)
// ============================================================================
const charProblems: CppProblem[] = Array.from({ length: 25 }, (_, idx) => {
  const num = idx + 1;
  const colId = 'col-13-char';
  const lvl: CppLevel = num <= 10 ? 'Beginner' : num <= 20 ? 'Elementary' : 'Intermediate';
  const kind = idx % 5;

  if (kind === 0) {
    const ch = String.fromCharCode(65 + (idx % 10));
    return makeProblem(colId, 'Char', num, {
      title: `Belgidan ASCII kodni topish (#${num})`,
      statementUz: `C belgisi berilgan. Uning ASCII jadvalidagi raqamli kodini chiqaring.`,
      inputSpecUz: 'Bitta belgi C.',
      outputSpecUz: 'ASCII kodi (butun son).',
      sampleInput: ch,
      sampleOutput: `${ch.charCodeAt(0)}`,
      difficulty: lvl,
      topicTag: 'ASCII kod',
      hintUz: '(int)c tipga o‘tkazish (type casting) dan foydalaning.',
      solutionCode: `#include <iostream>\nusing namespace std;\nint main(){ char c; cin>>c; cout<<(int)c; }`,
      explanationUz: `C++ da char aslida 1 baytli butun son, (int)c uni raqam sifatida chiqaradi.`,
    });
  }
  if (kind === 1) {
    const codeVal = 65 + (idx % 20);
    return makeProblem(colId, 'Char', num, {
      title: `Koddan ASCII belgini chiqarish (#${num})`,
      statementUz: `N (32..126) butun soni berilgan. Shu ASCII kodga mos belgini chiqaring.`,
      inputSpecUz: 'Butun son N.',
      outputSpecUz: 'Mos belgi.',
      sampleInput: `${codeVal}`,
      sampleOutput: String.fromCharCode(codeVal),
      difficulty: lvl,
      topicTag: 'ASCII kod',
      hintUz: 'cout << (char)n;',
      solutionCode: `#include <iostream>\nusing namespace std;\nint main(){ int n; cin>>n; cout<<(char)n; }`,
      explanationUz: '(char)n kodni belgiga o‘giradi.',
    });
  }
  if (kind === 2) {
    const ch = String.fromCharCode(98 + (idx % 10));
    return makeProblem(colId, 'Char', num, {
      title: `Oldingi va keyingi ASCII belgilar (#${num})`,
      statementUz: `C belgisi berilgan. Jadvalda undan oldingi va keyingi belgilarni chiqaring.`,
      inputSpecUz: 'Belgi C.',
      outputSpecUz: 'Oldingi va keyingi belgilar.',
      sampleInput: ch,
      sampleOutput: `${String.fromCharCode(ch.charCodeAt(0) - 1)} ${String.fromCharCode(ch.charCodeAt(0) + 1)}`,
      difficulty: lvl,
      topicTag: 'ASCII arifmetikasi',
      hintUz: '(char)(c - 1) va (char)(c + 1).',
      solutionCode: `#include <iostream>\nusing namespace std;\nint main(){ char c; cin>>c; cout<<(char)(c-1)<<" "<<(char)(c+1); }`,
      explanationUz: 'Belgilar ustida +1 va -1 amallarini bajarish mumkin.',
    });
  }
  if (kind === 3) {
    return makeProblem(colId, 'Char', num, {
      title: `Belgi turini aniqlash (digit / capital / small) (#${num})`,
      statementUz: `C belgisi raqam bo‘lsa "digit", katta lotin harfi bo‘lsa "upper", kichik lotin harfi bo‘lsa "lower" chiqaring.`,
      inputSpecUz: 'Belgi C.',
      outputSpecUz: 'digit, upper yoki lower.',
      sampleInput: num % 2 === 0 ? '7' : 'K',
      sampleOutput: num % 2 === 0 ? 'digit' : 'upper',
      difficulty: lvl,
      topicTag: 'Belgi tasnifi',
      hintUz: 'isdigit(c), isupper(c), islower(c) funksiyalaridan foydalaning.',
      solutionCode: `#include <iostream>\n#include <cctype>\nusing namespace std;\nint main(){ char c; cin>>c; if(isdigit(c)) cout<<"digit"; else if(isupper(c)) cout<<"upper"; else cout<<"lower"; }`,
      explanationUz: '<cctype> kutubxonasidagi tayyor tekshiruv funksiyalari kodni soddalashtiradi.',
    });
  }
  return makeProblem(colId, 'Char', num, {
    title: `Satrdagi raqamlar va katta harflar soni (#${num})`,
    statementUz: `Bo‘sh joysiz satr berilgan. Undagi raqamlar sonini va katta harflar sonini toping.`,
    inputSpecUz: 'Satr S.',
    outputSpecUz: 'Raqamlar soni va katta harflar soni.',
    sampleInput: 'CodeVerse2026UZ',
    sampleOutput: '4 4',
    difficulty: lvl,
    topicTag: 'Belgilar oqimi',
    hintUz: 'Satrning har bir char c elementi uchun isdigit va isupper ni sanang.',
    solutionCode: `#include <iostream>\n#include <cctype>\nusing namespace std;\nint main(){ string s; cin>>s; int d=0,u=0; for(char c:s){ if(isdigit(c))d++; if(isupper(c))u++; } cout<<d<<" "<<u; }`,
    explanationUz: 'CodeVerse2026UZ satrida 4 ta raqam (2026) va 4 ta katta harf (C, V, U, Z) mavjud.',
  });
});

export const COLLECTIONS_8_TO_13: CppCollection[] = [
  {
    id: 'col-8-minmax',
    order: 8,
    prefix: 'Minmax',
    title: 'Minimum va maksimum',
    descriptionUz: 'Ketma-ketliklarda ekstremal qiymatlar, indekslar, shartli minimum/maksimum va ikkinchi darajali ekstremumlarni topish.',
    targetCount: 30,
    recommendedLevel: 'Elementary',
    prerequisites: [
      { title: 'for va while sikllari', description: 'Kiruvchi oqimni bitta yurishda qayta ishlash.' },
    ],
    problems: minmaxProblems,
  },
  {
    id: 'col-9-proc',
    order: 9,
    prefix: 'Proc',
    title: 'Sodda funksiyalar',
    descriptionUz: 'Qiymat qaytaruvchi funksiyalar, havola (&) parametrlari, modullilik va sonlar nazariyasi yordamchi funksiyalari.',
    targetCount: 60,
    recommendedLevel: 'Intermediate',
    prerequisites: [
      { title: 'Sikllar va shart operatorlari', description: 'Mantiqni alohida funksiyalarga ajrata olish.' },
    ],
    problems: procProblems,
  },
  {
    id: 'col-10-array',
    order: 10,
    prefix: 'Array',
    title: 'Bir o‘lchamli massivlar',
    descriptionUz: 'std::vector va massivlarni to‘ldirish, filtrlash, progressiyalar, lokal ekstremumlar, saralash va siljitish algoritmlari.',
    targetCount: 140,
    recommendedLevel: 'Intermediate',
    prerequisites: [
      { title: 'for sikli va Sodda funksiyalar', description: 'Indeksli murojaat va xotira tuzilmalari.' },
    ],
    problems: arrayProblems,
  },
  {
    id: 'col-11-series',
    order: 11,
    prefix: 'Series',
    title: 'Ketma-ketliklar',
    descriptionUz: 'Noma’lum uzunlikdagi oqimlar, sentinel qiymatlar, monotonlik va ko‘p to‘plamli ketma-ketlik tahlillari.',
    targetCount: 40,
    recommendedLevel: 'Intermediate',
    prerequisites: [
      { title: 'while sikli va Minimum/maksimum', description: 'Oqimli kirishni massivsiz tahlil qilish.' },
    ],
    problems: seriesProblems,
  },
  {
    id: 'col-12-matrix',
    order: 12,
    prefix: 'Matrix',
    title: 'Ikki o‘lchamli massivlar: matritsalar',
    descriptionUz: 'Matritsa satrlari, ustunlari, asosiy va yordamchi diagonallar, transponirlash va 90 gradus burish masalalari.',
    targetCount: 100,
    recommendedLevel: 'Upper-Intermediate',
    prerequisites: [
      { title: 'Bir o‘lchamli massivlar', description: 'Ichma-ich sikllar va 2D indekslash a[i][j].' },
    ],
    problems: matrixProblems,
  },
  {
    id: 'col-13-char',
    order: 13,
    prefix: 'Char',
    title: 'Belgilar va belgilar ketma-ketligi',
    descriptionUz: 'ASCII kodlash jadvali, <cctype> tasnif funksiyalari va belgilar ustida arifmetik amallar.',
    targetCount: 25,
    recommendedLevel: 'Beginner',
    prerequisites: [
      { title: 'Kiritish, chiqarish va shartlar', description: 'char turi va ASCII tushunchasi.' },
    ],
    problems: charProblems,
  },
];
