export default function LegalNotice() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: '#f9fafb' }}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
        <h1 className="text-3xl md:text-5xl font-bold text-gray-900 mb-8 md:mb-12">
          Jogi nyilatkozat
        </h1>

        <div className="bg-white shadow-sm rounded-lg p-6 md:p-10 space-y-8">
          <section>
            <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-4">
              1. A weboldal tartalma
            </h2>
            <div className="text-gray-700 leading-relaxed space-y-3">
              <p>A <strong>www.fifteenapartman.hu</strong> weboldalon található tartalom tájékoztató jellegű. A Szolgáltató fenntartja a jogot a tartalom módosítására.</p>
            </div>
          </section>

          <hr className="border-gray-200" />

          <section>
            <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-4">
              2. Szerzői jog
            </h2>
            <div className="text-gray-700 leading-relaxed space-y-3">
              <p>A weboldalon található minden tartalom szerzői jogvédelem alatt áll. A tartalom előzetes írásos engedély nélkül nem másolható, nem terjeszthető.</p>
            </div>
          </section>

          <hr className="border-gray-200" />

          <section>
            <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-4">
              3. Felelősség kizárása
            </h2>
            <div className="text-gray-700 leading-relaxed space-y-3">
              <p>A Szolgáltató nem vállal felelősséget a weboldal használatából eredő közvetlen vagy közvetett károkért.</p>
            </div>
          </section>

          <hr className="border-gray-200" />

          <section>
            <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-4">
              4. Kapcsolat
            </h2>
            <div className="text-gray-700 leading-relaxed space-y-2">
              <p><strong>Gertig Anett</strong>, adószámos magánszemély, szálláshely-szolgáltató</p>
              <p>8623 Balatonföldvár, Hunyadi János utca 15.</p>
              <p><a href="mailto:info@fifteenapartman.hu" className="text-gray-900 hover:underline">info@fifteenapartman.hu</a></p>
              <p><a href="tel:+36204530000" className="text-gray-900 hover:underline">+36 20 453 0000</a></p>
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
