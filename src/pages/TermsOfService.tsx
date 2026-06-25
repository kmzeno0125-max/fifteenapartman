export default function TermsOfService() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: '#f9fafb' }}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
        <h1 className="text-3xl md:text-5xl font-bold text-gray-900 mb-8 md:mb-12">
          Általános Szerződési Feltételek (ÁSZF)
        </h1>

        <div className="bg-white shadow-sm rounded-lg p-6 md:p-10 space-y-8">
          <section>
            <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-4">
              1. Szolgáltató adatai
            </h2>
            <div className="text-gray-700 leading-relaxed space-y-2">
              <p><strong>Szolgáltató / Üzemeltető:</strong> Gertig Anett, adószámos magánszemély, szálláshely-szolgáltató</p>
              <p><strong>Székhely / levelezési cím:</strong> 8623 Balatonföldvár, Hunyadi János utca 15.</p>
              <p><strong>Adószám:</strong> 57386940-1-22</p>
              <p><strong>Telefonszám:</strong> <a href="tel:+36204530000" className="text-gray-900 hover:underline">+36 20 453 0000</a></p>
              <p><strong>E-mail cím:</strong> <a href="mailto:info@fifteenapartman.hu" className="text-gray-900 hover:underline">info@fifteenapartman.hu</a></p>
              <p><strong>Weboldal:</strong> <a href="https://www.fifteenapartman.hu" className="text-gray-900 hover:underline">www.fifteenapartman.hu</a></p>
            </div>
          </section>

          <hr className="border-gray-200" />

          <section>
            <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-4">
              2. Az ÁSZF hatálya
            </h2>
            <div className="text-gray-700 leading-relaxed space-y-3">
              <p>Jelen ÁSZF a Szolgáltató által üzemeltetett Fifteen Apartman szálláshely-szolgáltatás igénybevételének feltételeit rögzíti.</p>
              <p>Az ÁSZF hatálya kiterjed minden természetes személyre, aki a weboldalon ajánlatkérést nyújt be, illetve a szálláshelyet igénybe veszi.</p>
            </div>
          </section>

          <hr className="border-gray-200" />

          <section>
            <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-4">
              3. A szolgáltatás jellege
            </h2>
            <div className="text-gray-700 leading-relaxed space-y-3">
              <p>A Fifteen Apartman szálláshely-szolgáltatást nyújt. A weboldalon keresztül kizárólag ajánlatkérésre van lehetőség, online foglalás és fizetés nem történik.</p>
              <p>A szolgáltatás igénybevétele egyedi megállapodás alapján, az ajánlat elfogadásával jön létre.</p>
            </div>
          </section>

          <hr className="border-gray-200" />

          <section>
            <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-4">
              4. Ajánlatkérés menete
            </h2>
            <div className="text-gray-700 leading-relaxed space-y-3">
              <p>A vendég a weboldalon elérhető ajánlatkérő űrlap kitöltésével kezdeményezheti a foglalást. Az ajánlatkérés során megadandó adatok:</p>
              <ul className="list-disc list-inside ml-4 space-y-1">
                <li>érkezés és távozás dátuma</li>
                <li>felnőttek és gyermekek száma</li>
                <li>kisállat érkezése</li>
                <li>fizetési mód</li>
                <li>név, telefonszám, e-mail</li>
                <li>egyéb megjegyzés</li>
              </ul>
              <p className="mt-3">A vendég felel azért, hogy a megadott adatok valósak legyenek. Az ajánlatkérés nem minősül automatikus foglalásnak. A Szolgáltató az ajánlatkérést visszaigazolja vagy elutasítja.</p>
            </div>
          </section>

          <hr className="border-gray-200" />

          <section>
            <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-4">
              5. Szerződés létrejötte
            </h2>
            <div className="text-gray-700 leading-relaxed space-y-3">
              <p>A szerződés a Szolgáltató írásos visszaigazolásával jön létre. A visszaigazolás tartalmazza a szálláshely igénybevételének feltételeit, az árakat és az esetleges további kikötéseket.</p>
            </div>
          </section>

          <hr className="border-gray-200" />

          <section>
            <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-4">
              6. Fizetési feltételek
            </h2>
            <div className="text-gray-700 leading-relaxed space-y-3">
              <p>Online fizetés nem történik. A fizetés módja és ideje a felek közötti egyedi megállapodás szerint kerül meghatározásra.</p>
            </div>
          </section>

          <hr className="border-gray-200" />

          <section>
            <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-4">
              7. Lemondás és módosítás
            </h2>
            <div className="text-gray-700 leading-relaxed space-y-3">
              <p>A foglalás lemondásának és módosításának feltételeit a Szolgáltató az ajánlat visszaigazolásában határozza meg. A lemondási feltételek hiányában a Polgári Törvénykönyv rendelkezései az irányadók.</p>
            </div>
          </section>

          <hr className="border-gray-200" />

          <section>
            <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-4">
              8. A vendég kötelezettségei
            </h2>
            <div className="text-gray-700 leading-relaxed space-y-3">
              <p>A vendég köteles:</p>
              <ul className="list-disc list-inside ml-4 space-y-1">
                <li>a szálláshelyet rendeltetésszerűen használni</li>
                <li>a házirendet betartani</li>
                <li>a berendezéseket megóvni</li>
                <li>a szálláshelyet tiszta, rendeltetésszerű állapotban visszaadni</li>
              </ul>
            </div>
          </section>

          <hr className="border-gray-200" />

          <section>
            <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-4">
              9. Felelősség kizárása és korlátozása
            </h2>
            <div className="text-gray-700 leading-relaxed space-y-3">
              <p>A Szolgáltató nem vállal felelősséget a vendég személyes tárgyainak elvesztéséért vagy károsodásáért, kivéve, ha a kár a Szolgáltató szándékos vagy súlyosan gondatlan magatartásából ered.</p>
            </div>
          </section>

          <hr className="border-gray-200" />

          <section>
            <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-4">
              10. Panaszkezelés
            </h2>
            <div className="text-gray-700 leading-relaxed space-y-3">
              <p>A vendég panaszát írásban, az <a href="mailto:info@fifteenapartman.hu" className="text-gray-900 hover:underline font-medium">info@fifteenapartman.hu</a> e-mail címen nyújthatja be. A Szolgáltató a panaszt ésszerű határidőn belül kivizsgálja.</p>
              <p>Az érintett továbbá jogosult a fogyasztóvédelmi hatósághoz és a békéltető testülethez fordulni.</p>
            </div>
          </section>

          <hr className="border-gray-200" />

          <section>
            <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-4">
              11. Záró rendelkezések
            </h2>
            <div className="text-gray-700 leading-relaxed space-y-3">
              <p>Jelen ÁSZF-re a magyar jog az irányadó. A Szolgáltató fenntartja a jogot az ÁSZF módosítására.</p>
            </div>
          </section>
        </div>

        <div className="mt-8 text-center text-sm text-gray-500">
          <p>Utolsó frissítés: 2026. január</p>
        </div>
      </div>
    </div>
  );
}
