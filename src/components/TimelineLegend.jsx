const ITEMS = [
  { color: 'bg-semis', label: 'Semis' },
  { color: 'bg-enterre', label: 'En terre' },
  { color: 'bg-recolte', label: 'Récolte' },
  { color: 'bg-bouture', label: 'Bouture/Rejet' }
]

export default function TimelineLegend() {
  return (
    <div className="flex flex-wrap gap-3 text-xs text-gray-500">
      {ITEMS.map((item) => (
        <span key={item.label} className="inline-flex items-center gap-1.5">
          <span className={`inline-block w-2.5 h-2.5 rounded-sm ${item.color}`} />
          {item.label}
        </span>
      ))}
    </div>
  )
}
