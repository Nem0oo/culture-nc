import { STEP_BG } from '../utils/colors'

export default function StepDots({ activeSteps }) {
  if (activeSteps.length === 0) {
    return <span className="inline-block w-2 h-2 rounded-full bg-gray-200" />
  }
  return (
    <span className="inline-flex gap-1">
      {activeSteps.map((step) => (
        <span key={step} className={`inline-block w-2 h-2 rounded-full ${STEP_BG[step]}`} />
      ))}
    </span>
  )
}
