import { MONTHS_SHORT, MONTHS, getCurrentMonth } from '../utils/months'
import { getActiveSteps } from '../utils/plants'
import { STEP_BG } from '../utils/colors'

export default function Timeline({ plant }) {
  const currentMonth = getCurrentMonth()

  return (
    <div className="grid grid-cols-6 sm:grid-cols-12 gap-1.5">
      {MONTHS.map((month, i) => {
        const active = getActiveSteps(plant, month)
        const isCurrent = month === currentMonth
        return (
          <div key={month} className="flex flex-col items-center gap-1">
            <div
              className={`w-full aspect-square rounded-md overflow-hidden flex flex-col border ${
                isCurrent ? 'border-2 border-primary' : 'border-gray-200'
              } ${active.length === 0 ? 'bg-gray-100' : ''}`}
              title={month}
            >
              {active.map((step) => (
                <div key={step} className={`flex-1 w-full ${STEP_BG[step]}`} />
              ))}
            </div>
            <span className={`text-[10px] ${isCurrent ? 'text-primary font-semibold' : 'text-gray-500'}`}>
              {MONTHS_SHORT[i]}
            </span>
          </div>
        )
      })}
    </div>
  )
}
