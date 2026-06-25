import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import EmergencyNumbers from '../components/EmergencyNumbers';

interface RuleSection {
  title: string;
  content: string[];
}

export default function HouseRules() {
  const [expandedSection, setExpandedSection] = useState<string | null>('intro');

  const rules: Record<string, RuleSection> = {
    intro: {
      title: 'Házirend',
      content: [
        'Kedves Vendégeink!',
        'Szeretettel köszöntjük a Fifteen apartman-ban. Mindent megteszünk annak érdekében, hogy kellemessé tegyük pihenését',
        'Házirendünk célja, hogy a szükséges információk birtokában nyugodt, kellemes pihenést biztosítsunk és elkerüljük az esetleges félreértéseket. A házirend az apartmanban tartózkodó valamennyi vendégre vonatkozik.',
        'Azzal, hogy igénybe veszik apartmanunk szálláshelyének szolgáltatásait kijelentik, hogy magukra nézve azt elfogadják és érvényesnek tekintik.',
        'A hatályos jogszabályok szerint Magyarországi szálláshelyen kötelező minden vendég (beleértve a 14 év alattiak is) adatait az NTAK (Nemzeti Turisztikai Adatvédelmi Központ) rendszerbe felvinni.',
        'Minden érkező Vendég az apartman elfoglalását megelőzően köteles a személyazonosságát a törvényes előírásoknak megfelelően igazolni (okmányait a Vendégem applikációba beolvassuk (jogszabályi előírás).',
        'A szálláshelyet a Vendégek a foglalásban és a bejelentkezésben szereplő létszámban vehetik igénybe. A szállásadó előzetes bejelentés nélkül jogosult ellenőrizni a vendégek létszámát, azoknak zaklatása és személyiségi jogaik megsértése nélkül.',
        'Vendégeink látogatót napközben 8:00-21:00 óra között a szállásadóval előzetesen egyeztetve fogadhatnak.'
      ]
    },
    checkin: {
      title: 'Érkezés/Távozás',
      content: [
        'Check-in: mivel az apartmanban nem működik állandó nyitvatartással rendelkező recepció, így a szállást az érkezés napján, 14.00 órától, előre egyeztetett időpontban lehet elfoglalni.',
        'Időpont egyeztetés miatt kérem, hívja a 06 20 453 0000 telefonszámot.',
        'Távozás: az apartmanházakat a távozás napján 10:00 óráig szükséges elhagyni.',
        'A távozás napján a tartózkodás meghosszabbítására felár ellenében van lehetőség, ha aznap nem érkezik vendég az apartmanházba.',
        'Csomagmegőrzést nem vállalunk.',
        'A szobából való távozáskor kérjük győződjön meg arról, hogy klíma, villany, egyéb elektromos eszközök le vannak kapcsolva, illetve a vízcsapok el vannak zárva.',
        'Választható "Korai érkezés" 10.00 órától (10 000 Ft/apartman) és "Késői távozás" 15.00 óráig (15 000 Ft/apartman) amennyiben nem érkezik új vendég.',
        'Kérjük ez az igény minden esetben kerüljön egyeztetésre a kapcsolattársra megadott telefonszámon.',
        '(A megadott érkezési/elutazási időpontban a tulajdonos, vagy annak képviselője jelen jelen van.)',
        'Távozáskor az esetleges károk okozása esetén, az ebből eredő költségeket a vendég köteles a helyszínen megtéríteni.'
      ]
    },
    payment: {
      title: 'Fizetés/Foglalás',
      content: [
        'Foglalást, lemondást, módosítást csak és kizárólag írásban fogadunk el.',
        'A szállásfoglalás 50 % foglaló befizetésével történik.',
        'A foglalás meghatározott időre (a visszaigazolásban szereplő) szól. Ha a Vendég nem érkezik meg időben a foglalását másnap 10 óráig tartjuk fennt. Ha nem kaptunk értesítést a Vendégtől a később érkezésről és nem érjük el, az apartmant tovább értékesítjük és a foglaló nem jár vissza!',
        'A foglalási díjat 24 órán belül kérjük elutalni, ellenkező esetben a foglalás érvényét veszti!',
        'A lefoglalt időpontnál korábbi elutazás esetén szállásdíjat nem térítünk vissza.',
        'A számlát a foglalásban megadott névre állítjuk ki.',
        'Az áraink bruttó árak, +IFA 700 Ft/fő',
        'Az árak apartman/éj értendők.',
        'A szállásdíj és az idegenforgalmi adó fizetése a megérkezés után történik.',
        'Ha valami miatt az Ön által előre lefoglalt időszak vége előtt távozik a szállásról, nem áll módunkban a szállásdíjat csökkenteni, visszafizetni.',
        'Felhívjuk kedves figyelmét, hogy a szálláshelyen csak azok a személyek tartózkodhatnak, akik a bejelentő lapon szerepelnek. Amennyiben más személy tartózkodik a vendégház területén, abban az esetben a szerződés azonnal felmondható és a vendégeknek el kell hagyniuk a ház területét.'
      ]
    },
    pets: {
      title: 'Kisállat',
      content: [
        'Kisállat hozható a tulajdonossal való előzetes egyeztetést követően!',
        'A kisállatért felárat nem kell fizetni.',
        'Minden esetben kérjük az állat gazdáját, hogy az állattal kapcsolatos igazoló dokumentumot hozza magával, a biztonságát szavatoló egyéb kiegészítő felszereléssel együtt.'
      ]
    },
    usage: {
      title: 'Rendeltetésszerű használat',
      content: [
        'Kérjük a szálláshely épületeit, eszközeit rendeltetésszerűen használni, a tűz- és baleset-védelmi szabályokat betartani!',
        'Ha a vendég az apartmant nem rendeltetésszerűen használja azonnal távozásra szólítjuk fel és a foglalás díja nem jár vissza! pl.: 22:00 után hangoskodik, a szomszédok, a lakókörnyezet nyugalmát, pihenését zavarja vagy durván, sértőn viselkedik az apartman tulajdonosaival, szomszédokkal szemben.',
        'A rendellenes használat, illetve a gondatlanság által előidézett károkért a Vendég teljes kártérítéssel tartozik.',
        'Gondatlanságnak minősül a szobákban az ablakok nyitva hagyása, ezért kérjük, az apartman elhagyásakor ezeket feltétlenül csukják, és a bejárati ajtót zárják be.',
        'Az átadott kulcsok elvesztése esetén a Vendég köteles haladéktalanul jelezni, annak árát és a zárcserét a tulajdonosnak megtéríteni.',
        'A házirend megsértése kitiltást, illetőleg a tárgyak eltulajdonítása, rongálása, egyéb intézkedést von maga után!',
        'Az apartmanban életvitelszerű használat, normális lakhatás megengedett. Bulik, legény vagy lánybúcsú tartása nem megengedett.',
        'Túlzott hangoskodás, hangos zenehallgatás stb. amely zavarhatja a lakókat vagy a többi vendéget TILOS!',
        'A házban található berendezési tárgyakat csak a szállásadó előzetes hozzájárulásával lehet átrendezni.',
        'A szállásadó nem vállal felelősséget a nem rendeltetésszerű használatból adódó esetleges anyagi károkért vagy balesetekért.',
        'A benti berendezési tárgyakat (ágy, ágynemű, pléd, asztalok, székek, stb.) kérjük, ne vigyék ki a kertbe.',
        'A szállás területén okozott kárt, a károkozó vagy annak törvényes képviselője köteles megtéríteni.'
      ]
    },
    equipment: {
      title: 'Felszereltség/Berendezés',
      content: [
        'Igyekeztünk rendkívül kényelmessé tenni pihenését, éppen ezért jól felszerelt konyhával (hűtő, mikró, főzőlap, kenyérpirító, kávéfőző, stb.), mind a két szobában nagyteljesítményű hűtő-fűtő klímával, tv-vel, ingyenes wifi használattal, vasalóval, hajszárítóval, bekészített törölközővel és ágyneművel, ingyenes parkolóval várjuk kedves vendégeinket!'
      ]
    },
    smoking: {
      title: 'Dohányzás',
      content: [
        'Az épületben dohányozni, valamint füstölőt használni tilos!',
        'Dohányozni a kijelölt helyen lehet.',
        'Erre kijelölt hely: udvar.',
        'Szíveskedjenek a dohányzást erre a helyre korlátozni, továbbá hamutartót használni!',
        'A szálláshelyen, 18 éven aluli vendégek szeszesitalt nem fogyaszthatnak, nem dohányozhatnak!'
      ]
    },
    fire: {
      title: 'Tűzrakás-bográcsozás',
      content: [
        'Tüzet rakni kizárólag a kijelölt tűzrakó helyen a kijelölt farakásból, szélcsendben, egy vödör oltóvízzel felszerelkezve lehet.',
        'A tűzrakás után kérjük Vendégeinket a szemét eltávolítására és a parázs leöntésére.',
        'Eszközöket igény szerint biztosítunk.'
      ]
    },
    waste: {
      title: 'Hulladék gyűjtése',
      content: [
        'Kérjük, ügyeljenek a rendre és a tisztaságra. A szemetet szelektíven gyűjtjük, ezért kérjük a hulladékot a megfelelő helyre dobják.',
        'A háztartási szemét gyűjtése a konyhában található szemetesben lehetséges. Ha ez megtelne az Önök itt tartózkodása alatt, kérjük, ürítsék ki azt a ház mellett található nagy szemeteskukába, valamint az elutazáskor a konyhában ne hagyjanak mosatlan edényt, ill. szemetet.',
        'Új szemeteszsákot a mosogató alatti szekrényben találnak.'
      ]
    },
    cleaning: {
      title: 'Takarítás',
      content: [
        'Az apartmant a Vendégek tisztán, kitakarítva veszik át.',
        'Hosszabb tartózkodás esetén (1 hét) friss ágynemű huzatot, törülköző cserét és takarítást biztosítunk.'
      ]
    },
    valuables: {
      title: 'Értékek',
      content: [
        'Felhívjuk figyelmét, hogy a szálláshely területére behozott személyes értéktárgyakért (pl. ékszer, telefon, laptop stb.), valamint az udvaron álló gépjárművek biztonságáért felelősséget nem vállalunk, és kártérítést nem fizetünk az önhibánkon kívül történt eseményekből eredő károkért (pl. természeti csapás, jégeső, tűz, áramszünet stb.).'
      ]
    },
    important: {
      title: 'Fontos!',
      content: [
        'Minden háztartásban, így az apartmanban is előfordulhat, hogy a vendég hibáján kívül valami meghibásodik, tönkre megy. A nagyobb károk elkerülése érdekében szíveskedjenek ezt felénk jelezni!',
        'Amennyiben a tartózkodás alatt az apartmannal, szobával kapcsolatban bármilyen probléma felmerül, kérjük, haladéktalanul értesítse arról a szállásadót. Utólagos reklamációt nem áll módunkban elfogadni!',
        'Az átvett kulcsokra kérjük nagyon vigyázzanak. Eltávozáskor és éjszakára kérjük a kapukat és az épület bejáratait kulcsra zárni!',
        'A szobák elhagyásakor az ablakok és ajtók zárására fokozottan ügyeljenek.',
        'Eső, vihar esetén amennyiben a tulajdonos úgy látja, hogy valamely ablak nyitva van, úgy a kár (beázás) elkerülése végett, előzetes egyeztetés nélkül, a tartalék kulccsal az apartmanba bemehet és az ablakokat becsukhatja.',
        'A szálláshely végleges elhagyásakor a kulcsot le kell adnia szállásadó részére.',
        'A szobában felejtett értékeket 2 hónapig áll módunkban megőrizni, s amennyiben kérik a megadott időtartamon belül, akkor postázzuk.',
        'Az apartman 24 órás telefonos ügyelettel rendelkezik. Probléma vagy kérdés esetén hívja az alábbi számot +36 20 453 0000',
        'Kapcsolattartó: Bocsárdi Albert',
        'Köszönjük, hogy betartja a házirendet! Jó pihenést kívánunk!'
      ]
    }
  };

  const toggleSection = (key: string) => {
    setExpandedSection(expandedSection === key ? null : key);
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#f9fafb' }}>
      <section className="bg-white py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-light mb-6" style={{ color: '#111828' }}>
              {['Házirend'].map((word, index) => (
                <span
                  key={index}
                  className="inline-block opacity-0 animate-fadeInSlide"
                  style={{
                    animationDelay: `${index * 0.1}s`,
                    animationFillMode: 'forwards'
                  }}
                >
                  {word}
                </span>
              ))}
            </h1>
            <p className="text-xl" style={{ color: '#6b7280' }}>
              {['Átlátható', 'szabályok', 'a', 'kényelmes', 'és', 'felelős', 'tartózkodáshoz'].map((word, index) => (
                <span
                  key={index}
                  className="inline-block opacity-0 animate-fadeInSlide"
                  style={{
                    animationDelay: `${(index + 3) * 0.1}s`,
                    animationFillMode: 'forwards'
                  }}
                >
                  {word}{index < 6 ? '\u00A0' : ''}
                </span>
              ))}
            </p>
          </div>
        </div>
      </section>

      <section className="py-12 md:py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white shadow-sm mb-8 p-6 md:p-8 border-l-4 border-gray-900">
            <p className="text-gray-700 leading-relaxed">
              Szeretettel köszöntjük a Fifteen Apartman-ban! Az alábbiakban megtalálod az összes lényeges információt a foglalásról, érkezésről és a tartózkodás szabályairól. Kattints a címekre a részletek megtekintéséhez.
            </p>
          </div>

          <div className="space-y-4">
            {Object.entries(rules).map(([key, rule]) => (
              <div key={key} className="bg-white shadow-sm overflow-hidden">
                <button
                  onClick={() => toggleSection(key)}
                  className="w-full px-6 md:px-8 py-6 flex items-center justify-between hover:bg-gray-50 transition-colors"
                >
                  <h2 className="text-xl font-medium text-gray-900 text-left">
                    {rule.title}
                  </h2>
                  {expandedSection === key ? (
                    <ChevronUp size={24} className="text-gray-600 flex-shrink-0" />
                  ) : (
                    <ChevronDown size={24} className="text-gray-600 flex-shrink-0" />
                  )}
                </button>

                {expandedSection === key && (
                  <div className="px-6 md:px-8 pb-6 border-t border-gray-100">
                    <ul className="space-y-3 pt-6">
                      {rule.content.map((item, idx) => (
                        <li key={idx} className="flex items-start text-gray-700">
                          <span className="text-gray-400 mr-3 mt-1 flex-shrink-0">•</span>
                          <span className="leading-relaxed">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 md:py-16 bg-gray-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <EmergencyNumbers />
        </div>
      </section>

    </div>
  );
}
