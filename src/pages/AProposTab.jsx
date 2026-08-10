const APP_VERSION = '1.0.0'
const DATA_DATE = 'Août 2022'

export default function AProposTab() {
  return (
    <div className="pb-24 px-4 pt-4">
      <h1 className="text-xl font-bold text-gray-900 mb-1">Calendrier cultural</h1>
      <p className="text-primary font-medium mb-6">Nouvelle-Calédonie</p>

      <section className="bg-white rounded-card shadow-sm p-4 mb-4">
        <h2 className="text-sm font-semibold text-gray-700 mb-2">Sources</h2>
        <ul className="text-sm text-gray-600 space-y-2 list-disc pl-4">
          <li>
            Calendrier cultural (semis/récolte) : Kévin Gallot / Fred Garcia — Maléva
            Pratiques Écologiques
          </li>
          <li>
            Calendrier de production locale : Arbofruits, DAVAR, Chambre d'agriculture et de
            la pêche, Provinces NC — août 2022
          </li>
          <li>Photos et descriptions : Wikimedia Commons / Wikipédia (licences libres)</li>
        </ul>
      </section>

      <section className="bg-white rounded-card shadow-sm p-4 mb-4">
        <h2 className="text-sm font-semibold text-gray-700 mb-2">À noter</h2>
        <p className="text-sm text-gray-600">
          Certaines données sont incomplètes, notamment les dates de récolte pour quelques
          plantes. Ce calendrier est indicatif.
        </p>
      </section>

      <section className="bg-white rounded-card shadow-sm p-4 mb-4">
        <h2 className="text-sm font-semibold text-gray-700 mb-2">Application</h2>
        <p className="text-sm text-gray-600">Version {APP_VERSION}</p>
        <p className="text-sm text-gray-600">Données mises à jour : {DATA_DATE}</p>
      </section>
    </div>
  )
}
