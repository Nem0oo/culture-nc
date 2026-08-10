import PlantImage from './PlantImage'
import StepDots from './StepDots'
import { getActiveSteps } from '../utils/plants'
import { getCurrentMonth } from '../utils/months'

export default function PlantListItem({ plant, onClick }) {
  const activeSteps = getActiveSteps(plant, getCurrentMonth())

  return (
    <button
      onClick={onClick}
      className="w-full flex items-center gap-3 bg-white rounded-card shadow-sm px-3 py-2.5 text-left active:scale-[0.99] transition-transform"
    >
      <PlantImage src={plant.photo} alt={plant.nom} className="w-11 h-11 shrink-0" />
      <span className="flex-1 min-w-0">
        <span className="block font-medium text-gray-900 truncate">{plant.nom}</span>
        {plant.touteAnnee && (
          <span className="block text-[11px] text-primary">Toute l'année</span>
        )}
      </span>
      <StepDots activeSteps={activeSteps} />
    </button>
  )
}
