export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: '#f9fafb' }}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
        <h1 className="text-3xl md:text-5xl font-bold text-gray-900 mb-8 md:mb-12">
          Adatkezelési tájékoztató
        </h1>

        <div className="bg-white shadow-sm rounded-lg p-6 md:p-10 space-y-8">
          <section>
            <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-4">
              1. Adatkezelő adatai
            </h2>
            <div className="text-gray-700 leading-relaxed space-y-2">
              <p><strong>Adatkezelő:</strong> Gertig Anett, adószámos magánszemély, szálláshely-szolgáltató</p>
              <p><strong>Cím:</strong> 8623 Balatonföldvár, Hunyadi János utca 15.</p>
              <p><strong>E-mail:</strong> <a href="mailto:info@fifteenapartman.hu" className="text-gray-900 hover:underline">info@fifteenapartman.hu</a></p>
              <p><strong>Telefonszám:</strong> <a href="tel:+36204530000" className="text-gray-900 hover:underline">+36 20 453 0000</a></p>
            </div>
          </section>

          <hr className="border-gray-200" />

          <section>
            <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-4">
              2. Kezelt személyes adatok köre
            </h2>
            <div className="text-gray-700 leading-relaxed space-y-3">
              <p>Az adatkezelő az ajánlatkérés során az alábbi személyes adatokat kezeli:</p>
              <ul className="list-disc list-inside ml-4 space-y-1">
                <li>név</li>
                <li>telefonszám</li>
                <li>e-mail cím</li>
                <li>érkezés és távozás dátuma</li>
                <li>vendégek száma</li>
                <li>kisállat adatai</li>
                <li>megjegyzés</li>
              </ul>
            </div>
          </section>

          <hr className="border-gray-200" />

          <section>
            <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-4">
              3. Az adatkezelés célja és jogalapja
            </h2>
            <div className="text-gray-700 leading-relaxed space-y-3">
              <p>Az adatkezelés célja az ajánlatkérés kezelése, kapcsolattartás és a szálláshely-szolgáltatás teljesítése.</p>
              <p><strong>Jogalap:</strong> GDPR 6. cikk (1) bekezdés b) pontja (szerződés teljesítése).</p>
            </div>
          </section>

          <hr className="border-gray-200" />

          <section>
            <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-4">
              4. Adatkezelés időtartama
            </h2>
            <div className="text-gray-700 leading-relaxed space-y-3">
              <p>A személyes adatokat a jogszabályi kötelezettségeknek megfelelő ideig kezeljük:</p>
              <ul className="list-disc list-inside ml-4 space-y-1">
                <li>számviteli bizonylatok: 8 év</li>
                <li>egyéb kapcsolattartási adatok: a jogviszony lezárását követő 5 évig</li>
              </ul>
            </div>
          </section>

          <hr className="border-gray-200" />

          <section>
            <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-4">
              5. Adattovábbítás
            </h2>
            <div className="text-gray-700 leading-relaxed space-y-3">
              <p>A személyes adatokat harmadik fél részére nem továbbítjuk.</p>
            </div>
          </section>

          <hr className="border-gray-200" />

          <section>
            <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-4">
              6. Cookie-k és statisztika
            </h2>
            <div className="text-gray-700 leading-relaxed space-y-3">
              <p>A weboldal jelenleg nem alkalmaz cookie-kat és statisztikai elemző rendszereket. A későbbi bevezetés esetén a látogatók hozzájárulása szükséges.</p>
            </div>
          </section>

          <hr className="border-gray-200" />

          <section>
            <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-4">
              7. Érintetti jogok
            </h2>
            <div className="text-gray-700 leading-relaxed space-y-3">
              <p>Az érintett jogosult tájékoztatást kérni, adatai helyesbítését, törlését, kezelésének korlátozását kérni, valamint panaszt tehet a Nemzeti Adatvédelmi és Információszabadság Hatóságnál (NAIH), bírósághoz fordulhat jogainak megsértése esetén.</p>
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
