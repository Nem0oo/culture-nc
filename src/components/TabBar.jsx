const TABS = [
  { key: 'plante', label: 'Plante', emoji: '🌱' },
  { key: 'mois', label: 'Mois', emoji: '📅' },
  { key: 'apropos', label: 'À propos', emoji: 'ℹ️' }
]

export default function TabBar({ active, onChange }) {
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 flex pb-[env(safe-area-inset-bottom)] z-20">
      {TABS.map((tab) => {
        const isActive = active === tab.key
        return (
          <button
            key={tab.key}
            onClick={() => onChange(tab.key)}
            className={`flex-1 flex flex-col items-center justify-center gap-0.5 py-2.5 text-xs font-medium transition-colors ${
              isActive ? 'text-primary' : 'text-gray-400'
            }`}
          >
            <span className="text-xl leading-none">{tab.emoji}</span>
            <span>{tab.label}</span>
          </button>
        )
      })}
    </nav>
  )
}
