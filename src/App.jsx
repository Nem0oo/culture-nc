import { useState } from 'react'
import TabBar from './components/TabBar'
import PlanteTab from './pages/PlanteTab'
import MoisTab from './pages/MoisTab'
import AProposTab from './pages/AProposTab'

export default function App() {
  const [activeTab, setActiveTab] = useState('plante')
  const [selectedPlantName, setSelectedPlantName] = useState(null)

  const openPlantFromMois = (nom) => {
    setSelectedPlantName(nom)
    setActiveTab('plante')
  }

  const changeTab = (tab) => {
    if (tab === 'plante') {
      // un tap sur l'onglet Plante ramène toujours à la liste
      setSelectedPlantName(null)
    }
    setActiveTab(tab)
  }

  return (
    <div className="min-h-screen bg-bg">
      <main>
        {activeTab === 'plante' && (
          <PlanteTab
            selectedPlantName={selectedPlantName}
            onSelectPlant={setSelectedPlantName}
          />
        )}
        {activeTab === 'mois' && <MoisTab onOpenPlant={openPlantFromMois} />}
        {activeTab === 'apropos' && <AProposTab />}
      </main>
      <TabBar active={activeTab} onChange={changeTab} />
    </div>
  )
}
