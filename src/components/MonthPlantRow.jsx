import PlantImage from './PlantImage'
import { STEPS, getActiveSteps } from '../utils/plants'

const BADGE_CLASSES = {
  semis: 'bg-semis/20 text-yellow-800',
  en_terre: 'bg-enterre/20 text-orange-800',
  recolte: 'bg-recolte/20 text-green-800',
  bouture_rejet: 'bg-bouture/20 text-purple-800'
}

export default function MonthPlantRow({ plant, month, onClick }) {
  const activeSteps = getActiveSteps(plant, month)
  const labels = STEPS.filter((s) => activeSteps.includes(s.key))

  return (
    <button
      onClick={onClick}
      className="w-full flex items-center gap-3 bg-white rounded-card shadow-sm px-3 py-2.5 text-left active:scale-[0.99] transition-transform"
    >
      <PlantImage src={plant.photo} alt={plant.nom} className="w-11 h-11 shrink-0" />
      <span className="flex-1 min-w-0">
        <span className="block font-medium text-gray-900 truncate">{plant.nom}</span>
        <span className="flex flex-wrap gap-1 mt-1">
          {plant.touteAnnee && (
            <span className="px-2 py-0.5 rounded-full text-[11px] font-medium bg-primary/10 text-primary">
              Toute l'année
            </span>
          )}
          {labels.map((s) => (
            <span
              key={s.key}
              className={`px-2 py-0.5 rounded-full text-[11px] font-medium ${BADGE_CLASSES[s.key]}`}
            >
              {s.emoji} {s.label}
            </span>
          ))}
        </span>
      </span>
    </button>
  )
}
