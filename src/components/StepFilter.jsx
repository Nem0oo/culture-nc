import { STEPS } from '../utils/plants'

const ACTIVE_CLASSES = {
  semis: 'bg-semis/20 text-yellow-800 border-semis',
  en_terre: 'bg-enterre/20 text-orange-800 border-enterre',
  recolte: 'bg-recolte/20 text-green-800 border-recolte',
  bouture_rejet: 'bg-bouture/20 text-purple-800 border-bouture'
}

export default function StepFilter({ selected, onToggle }) {
  return (
    <div className="flex gap-2 overflow-x-auto px-4 -mx-4 pb-1">
      {STEPS.map((step) => {
        const isActive = selected.includes(step.key)
        return (
          <button
            key={step.key}
            onClick={() => onToggle(step.key)}
            className={`shrink-0 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium border transition-colors ${
              isActive ? ACTIVE_CLASSES[step.key] : 'bg-white text-gray-500 border-gray-200'
            }`}
          >
            <span>{step.emoji}</span>
            {step.label}
          </button>
        )
      })}
    </div>
  )
}
