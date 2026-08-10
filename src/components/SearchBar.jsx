export default function SearchBar({ value, onChange }) {
  return (
    <div className="relative">
      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">🔍</span>
      <input
        type="search"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Rechercher une plante…"
        className="w-full pl-9 pr-3 py-2.5 rounded-card bg-white border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
      />
    </div>
  )
}
