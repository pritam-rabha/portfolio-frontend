import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Search, Loader2 } from 'lucide-react'
import PageLayout from '../components/layout/PageLayout'
import ProjectCard from '../components/ui/ProjectCard'
import { getProjects } from '../services/api'

const FALLBACK = [
  { _id: '1', title: 'AI Medical Emergency Drone', description: 'Autonomous drone with real-time computer vision for victim detection and GPS-guided delivery, cutting emergency response time by 70%.', techStack: ['Python', 'TensorFlow', 'OpenCV', 'Raspberry Pi', 'Arduino', 'GPS'], featured: true, badge: '1st Prize — Ministry of Education 2024', githubUrl: null },
  { _id: '2', title: 'Real-Time Object Detection', description: 'YOLO-based pipeline optimised for edge devices achieving 30+ FPS on Raspberry Pi via custom quantisation.', techStack: ['Python', 'YOLO', 'TensorFlow Lite', 'OpenCV'], githubUrl: null },
  { _id: '3', title: 'Smart Environment Monitor', description: 'IoT sensor network with LSTM anomaly detection for temperature, humidity and air-quality.', techStack: ['Arduino', 'Python', 'LSTM', 'Firebase', 'React'], githubUrl: null },
  { _id: '4', title: 'Medical Image Classifier', description: 'ResNet50 transfer-learning CNN achieving 96% accuracy on chest X-ray classification.', techStack: ['Python', 'TensorFlow', 'ResNet50', 'Matplotlib'], githubUrl: null },
  { _id: '5', title: 'Autonomous Obstacle Robot', description: 'Ultrasonic sensor array with real-time path planning — winner of 2022 state robotics competition.', techStack: ['Arduino', 'Embedded C', 'Ultrasonic Sensors'], githubUrl: null },
  { _id: '6', title: 'Face Recognition Attendance', description: 'OpenCV + deep metric learning system for contactless classroom attendance tracking.', techStack: ['Python', 'OpenCV', 'dlib', 'Flask', 'SQLite'], githubUrl: null },
]

const ALL_TAGS = ['All', 'Python', 'TensorFlow', 'Arduino', 'OpenCV', 'React', 'Raspberry Pi']

export default function Projects() {
  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState('All')
  const [search, setSearch] = useState('')

  useEffect(() => {
    getProjects()
      .then(({ data }) => setProjects(data.data?.length ? data.data : FALLBACK))
      .catch(() => setProjects(FALLBACK))
      .finally(() => setLoading(false))
  }, [])

  const visible = projects.filter((p) => {
    const matchTag = filter === 'All' || p.techStack?.includes(filter)
    const matchSearch =
      !search ||
      p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.description.toLowerCase().includes(search.toLowerCase())
    return matchTag && matchSearch
  })

  return (
    <PageLayout>
      <div className="max-w-6xl mx-auto px-5 py-16">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
          className="mb-12"
        >
          <span className="section-label mb-4 inline-flex">Portfolio</span>
          <h1 className="font-display font-semibold text-4xl sm:text-5xl text-white mt-4">
            All Projects
          </h1>
          <p className="text-ash-400 mt-4 max-w-lg leading-relaxed">
            From autonomous robotics to deep learning — a collection of things I've built and shipped.
          </p>
        </motion.div>

        {/* Filter bar */}
        <div className="flex flex-col sm:flex-row gap-3 mb-10">
          <div className="relative flex-1 max-w-sm">
            <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-ash-500" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search projects…"
              className="field pl-9"
            />
          </div>
          <div className="flex flex-wrap gap-2">
            {ALL_TAGS.map((tag) => (
              <button
                key={tag}
                onClick={() => setFilter(tag)}
                className={`text-xs font-mono px-3 py-1.5 rounded-lg border transition-all duration-200 ${
                  filter === tag
                    ? 'bg-volt-500 text-ink-950 border-volt-500 font-semibold'
                    : 'border-white/[0.08] text-ash-400 hover:border-volt-500/30 hover:text-volt-400'
                }`}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>

        {/* Grid */}
        {loading ? (
          <div className="flex items-center justify-center py-24">
            <Loader2 size={24} className="text-volt-500 animate-spin" />
          </div>
        ) : visible.length === 0 ? (
          <div className="text-center py-24">
            <p className="text-ash-500">No projects match your search.</p>
            <button onClick={() => { setSearch(''); setFilter('All') }}
              className="mt-4 text-volt-500 text-sm hover:underline">
              Clear filters
            </button>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {visible.map((p, i) => <ProjectCard key={p._id} project={p} index={i} />)}
          </div>
        )}

        {/* Count */}
        {!loading && visible.length > 0 && (
          <p className="text-ash-500 text-xs text-center mt-10 font-mono">
            {visible.length} project{visible.length !== 1 ? 's' : ''}
          </p>
        )}
      </div>
    </PageLayout>
  )
}
