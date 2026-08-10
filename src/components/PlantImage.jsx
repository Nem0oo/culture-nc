import { useState } from 'react'

export default function PlantImage({ src, alt, className = '', round = true }) {
  const [failed, setFailed] = useState(false)
  const initial = alt ? alt.charAt(0).toUpperCase() : '?'

  if (!src || failed) {
    return (
      <div
        className={`${className} ${round ? 'rounded-full' : 'rounded-card'} bg-primary/10 text-primary flex items-center justify-center font-semibold select-none`}
        aria-label={alt}
      >
        {initial}
      </div>
    )
  }

  return (
    <img
      src={src}
      alt={alt}
      loading="lazy"
      onError={() => setFailed(true)}
      className={`${className} ${round ? 'rounded-full' : 'rounded-card'} object-cover bg-gray-100`}
    />
  )
}
