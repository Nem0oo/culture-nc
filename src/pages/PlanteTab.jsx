import { useMemo, useState } from 'react'
import SearchBar from '../components/SearchBar'
import PlantListItem from '../components/PlantListItem'
import PlantDetail from '../components/PlantDetail'
import { PLANTS_LIST } from '../utils/plants'

export default function PlanteTab({ selectedPlantName, onSelectPlant }) {
  const [query, setQuery] = useState('')

  const selectedPlant = selectedPlantName
    ? PLANTS_LIST.find((p) => p.nom === selectedPlantName)
    : null

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return PLANTS_LIST
    return PLANTS_LIST.filter((p) => p.nom.toLowerCase().includes(q))
  }, [query])

  if (selectedPlant) {
    return <PlantDetail plant={selectedPlant} onBack={() => onSelectPlant(null)} />
  }

  return (
    <div className="pb-24">
      <div className="sticky top-0 z-10 bg-bg/95 backdrop-blur px-4 pt-4 pb-3">
        <h1 className="text-xl font-bold text-gray-900 mb-3">Plantes</h1>
        <SearchBar value={query} onChange={setQuery} />
      </div>

      <div className="px-4 flex flex-col gap-2">
        {filtered.length === 0 && (
          <p className="text-center text-gray-400 mt-10">Aucune plante trouvée pour « {query} ».</p>
        )}
        {filtered.map((plant) => (
          <PlantListItem
            key={plant.nom}
            plant={plant}
            onClick={() => onSelectPlant(plant.nom)}
          />
        ))}
      </div>
    </div>
  )
}
