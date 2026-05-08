import { ExternalLink, Github, Star } from 'lucide-react'
import { motion } from 'framer-motion'

export default function ProjectCard({ project, index = 0 }) {
  const {
    title, description, techStack = [], githubUrl, liveUrl, featured, badge,
  } = project

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.45, delay: index * 0.08 }}
      className={`card p-6 flex flex-col gap-4 group hover:border-white/10 transition-all duration-300 ${
        featured ? 'border-volt-500/20 bg-gradient-to-br from-ink-800 to-ink-700/60' : ''
      }`}
    >
      {/* Header */}
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1 min-w-0">
          {badge && (
            <div className="flex items-center gap-1.5 mb-2">
              <Star size={11} className="text-volt-500 fill-volt-500 flex-shrink-0" />
              <span className="text-xs font-mono text-volt-500 truncate">{badge}</span>
            </div>
          )}
          <h3 className="font-display font-semibold text-white group-hover:text-volt-400
                         transition-colors duration-200 leading-tight">
            {title}
          </h3>
        </div>
        <div className="flex items-center gap-2 flex-shrink-0">
          {githubUrl && githubUrl !== '#' && (
            <a href={githubUrl} target="_blank" rel="noopener noreferrer"
               className="p-1.5 text-ash-400 hover:text-white transition-colors rounded-lg hover:bg-ink-600">
              <Github size={15} />
            </a>
          )}
          {liveUrl && liveUrl !== '#' && (
            <a href={liveUrl} target="_blank" rel="noopener noreferrer"
               className="p-1.5 text-ash-400 hover:text-volt-400 transition-colors rounded-lg hover:bg-ink-600">
              <ExternalLink size={15} />
            </a>
          )}
        </div>
      </div>

      {/* Description */}
      <p className="text-ash-400 text-sm leading-relaxed flex-1">
        {description}
      </p>

      {/* Tech stack */}
      <div className="flex flex-wrap gap-1.5">
        {techStack.slice(0, 5).map((t) => (
          <span key={t} className="tag">{t}</span>
        ))}
        {techStack.length > 5 && (
          <span className="tag">+{techStack.length - 5}</span>
        )}
      </div>
    </motion.div>
  )
}
