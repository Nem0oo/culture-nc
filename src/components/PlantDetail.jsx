import PlantImage from './PlantImage'
import Timeline from './Timeline'
import TimelineLegend from './TimelineLegend'
import Chip from './Chip'
import { wikipediaUrl } from '../utils/plants'

const SECTIONS = [
  { key: 'semis', label: 'Semer' },
  { key: 'en_terre', label: 'Mettre en terre' },
  { key: 'recolte', label: 'Récolter' },
  { key: 'bouture_rejet', label: 'Bouture/Rejet' }
]

export default function PlantDetail({ plant, onBack }) {
  const wikiUrl = wikipediaUrl(plant.wikipedia)

  return (
    <div className="pb-24">
      <div className="sticky top-0 z-10 bg-bg/95 backdrop-blur px-4 pt-3 pb-2">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-1 text-primary text-sm font-medium"
        >
          ← Retour
        </button>
      </div>

      <div className="px-4">
        <PlantImage
          src={plant.photo}
          alt={plant.nom}
          round={false}
          className="w-full h-56"
        />

        <div className="mt-4">
          <h1 className="text-2xl font-bold text-gray-900">{plant.nom}</h1>
          {plant.nom_scientifique && (
            <p className="italic text-gray-500 mt-0.5">{plant.nom_scientifique}</p>
          )}
          {plant.touteAnnee && (
            <span className="inline-block mt-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold">
              Disponible toute l'année
            </span>
          )}
          {wikiUrl && (
            <a
              href={wikiUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block mt-2 text-sm text-secondary underline"
            >
              Voir sur Wikipédia →
            </a>
          )}
        </div>

        <div className="mt-6">
          <h2 className="text-sm font-semibold text-gray-700 mb-2">Calendrier</h2>
          <Timeline plant={plant} />
          <div className="mt-3">
            <TimelineLegend />
          </div>
        </div>

        <div className="mt-6 space-y-4">
          {SECTIONS.map(({ key, label }) => {
            const months = plant[key]
            if (!months || months.length === 0) return null
            return (
              <div key={key}>
                <h3 className="text-sm font-semibold text-gray-700 mb-1.5">{label}</h3>
                <div className="flex flex-wrap gap-2">
                  {months.map((m) => (
                    <Chip key={m}>{m}</Chip>
                  ))}
                </div>
              </div>
            )
          })}
        </div>

        {plant.compagnons.length > 0 && (
          <div className="mt-6">
            <h3 className="text-sm font-semibold text-gray-700 mb-1.5">Plantes compagnes</h3>
            <div className="flex flex-wrap gap-2">
              {plant.compagnons.map((c) => (
                <Chip key={c}>{c}</Chip>
              ))}
            </div>
          </div>
        )}

        {plant.mauvais_compagnons.length > 0 && (
          <div className="mt-6">
            <h3 className="text-sm font-semibold text-gray-700 mb-1.5">Mauvais voisins</h3>
            <div className="flex flex-wrap gap-2">
              {plant.mauvais_compagnons.map((c) => (
                <Chip key={c} variant="bad">{c}</Chip>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
