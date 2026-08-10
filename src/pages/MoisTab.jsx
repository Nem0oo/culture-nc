import { useMemo, useState } from 'react'
import MonthSelector from '../components/MonthSelector'
import StepFilter from '../components/StepFilter'
import MonthPlantRow from '../components/MonthPlantRow'
import { STEPS, getPlantsForMonthStep } from '../utils/plants'
import { getCurrentMonth } from '../utils/months'

const SECTION_TITLES = {
  semis: 'À semer',
  en_terre: 'À mettre en terre',
  recolte: 'À récolter',
  bouture_rejet: 'Boutures/Rejets'
}

export default function MoisTab({ onOpenPlant }) {
  const [month, setMonth] = useState(getCurrentMonth())
  const [selectedSteps, setSelectedSteps] = useState(STEPS.map((s) => s.key))

  const toggleStep = (key) => {
    setSelectedSteps((prev) =>
      prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key]
    )
  }

  const effectiveSteps = selectedSteps.length > 0 ? selectedSteps : STEPS.map((s) => s.key)

  const sections = useMemo(() => {
    return STEPS.filter((s) => effectiveSteps.includes(s.key)).map((step) => ({
      ...step,
      plants: getPlantsForMonthStep(month, step.key)
    }))
  }, [month, effectiveSteps])

  const totalPlants = sections.reduce((sum, s) => sum + s.plants.length, 0)

  return (
    <div className="pb-24">
      <div className="sticky top-0 z-10 bg-bg/95 backdrop-blur pt-4 pb-3 flex flex-col gap-3">
        <h1 className="text-xl font-bold text-gray-900 px-4">Mois</h1>
        <MonthSelector selected={month} onSelect={setMonth} />
        <StepFilter selected={selectedSteps} onToggle={toggleStep} />
      </div>

      <div className="px-4 flex flex-col gap-5 mt-2">
        {totalPlants === 0 && (
          <p className="text-center text-gray-400 mt-10">
            Rien à faire en {month.toLowerCase()} pour ces étapes 🌾
          </p>
        )}

        {sections.map((section) =>
          section.plants.length === 0 ? null : (
            <div key={section.key}>
              <h2 className="text-sm font-semibold text-gray-700 mb-2">
                {section.emoji} {SECTION_TITLES[section.key]}
              </h2>
              <div className="flex flex-col gap-2">
                {section.plants.map((plant) => (
                  <MonthPlantRow
                    key={plant.nom}
                    plant={plant}
                    month={month}
                    onClick={() => onOpenPlant(plant.nom)}
                  />
                ))}
              </div>
            </div>
          )
        )}
      </div>
    </div>
  )
}
