import { MONTHS, MONTHS_SHORT, getCurrentMonth } from '../utils/months'

export default function MonthSelector({ selected, onSelect }) {
  const currentMonth = getCurrentMonth()

  return (
    <div className="flex gap-2 overflow-x-auto pb-1 px-4 -mx-4">
      {MONTHS.map((month, i) => {
        const isSelected = month === selected
        const isCurrent = month === currentMonth
        return (
          <button
            key={month}
            onClick={() => onSelect(month)}
            className={`relative shrink-0 px-3.5 py-2 rounded-full text-sm font-medium border transition-colors ${
              isSelected
                ? 'bg-primary text-white border-primary'
                : 'bg-white text-gray-600 border-gray-200'
            }`}
          >
            {MONTHS_SHORT[i]}
            {isCurrent && (
              <span
                className={`absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full ${
                  isSelected ? 'bg-white' : 'bg-secondary'
                }`}
              />
            )}
          </button>
        )
      })}
    </div>
  )
}
