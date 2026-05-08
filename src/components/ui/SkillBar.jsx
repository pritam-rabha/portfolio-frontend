import { useInView } from '../../hooks/useInView'

export default function SkillBar({ name, level, color = 'volt' }) {
  const [ref, inView] = useInView()

  const bg = {
    volt:     'bg-volt-500',
    ember:    'bg-ember-500',
    sapphire: 'bg-sapphire-500',
  }[color] || 'bg-volt-500'

  return (
    <div ref={ref}>
      <div className="flex justify-between items-center mb-1.5">
        <span className="text-sm text-ash-200 font-medium">{name}</span>
        <span className="text-xs font-mono text-ash-400">{level}%</span>
      </div>
      <div className="h-1 bg-ink-600 rounded-full overflow-hidden">
        <div
          className={`h-full ${bg} rounded-full transition-all duration-1000 ease-out`}
          style={{ width: inView ? `${level}%` : '0%' }}
        />
      </div>
    </div>
  )
}
