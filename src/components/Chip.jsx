export default function Chip({ children, variant = 'default' }) {
  const variants = {
    default: 'bg-gray-100 text-gray-700',
    bad: 'bg-secondary/10 text-secondary'
  }
  return (
    <span className={`inline-block px-3 py-1 rounded-full text-sm ${variants[variant]}`}>
      {children}
    </span>
  )
}
