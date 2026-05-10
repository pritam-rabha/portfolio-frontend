import { Link } from 'react-router-dom'
import { ArrowRight, Download, Cpu, Brain, Code2 } from 'lucide-react'
import { motion } from 'framer-motion'
import PageLayout from '../components/layout/PageLayout'
import ProjectCard from '../components/ui/ProjectCard'

const FEATURED = [
  {
    _id: '1',
    title: 'AI Medical Emergency Drone',
    description: 'Autonomous drone with real-time computer vision for victim detection and GPS-guided delivery, cutting emergency response time by 70%.',
    techStack: ['Python', 'TensorFlow', 'OpenCV', 'Raspberry Pi', 'Arduino', 'GPS'],
    featured: true,
    badge: '1st Prize — Ministry of Education 2024',
    githubUrl: null,
    liveUrl: null,
  },
  {
    _id: '2',
    title: 'Real-Time Object Detection',
    description: 'YOLO-based detection pipeline optimised for edge devices, achieving 30+ FPS on Raspberry Pi with custom quantisation.',
    techStack: ['Python', 'YOLO', 'TensorFlow Lite', 'OpenCV'],
    githubUrl: null,
  },
  {
    _id: '3',
    title: 'Smart Environment Monitor',
    description: 'IoT sensor network with LSTM-powered anomaly detection for temperature, humidity and air-quality monitoring.',
    techStack: ['Arduino', 'Python', 'LSTM', 'Firebase', 'React'],
    githubUrl: null,
  },
]

const STATS = [
  { val: '10+', label: 'Projects shipped' },
  { val: '3+',  label: 'Years coding' },
  { val: '1st', label: 'National prize' },
]

const PILLARS = [
  { icon: Brain,  label: 'AI / ML',    desc: 'TensorFlow · Deep Learning · Computer Vision' },
  { icon: Cpu,    label: 'Robotics',   desc: 'Arduino · Raspberry Pi · Sensor Fusion' },
  { icon: Code2,  label: 'Full Stack', desc: 'Python · React · Node.js · MongoDB' },
]

export default function Home() {
  return (
    <PageLayout>
      {/* ── Hero ──────────────────────────────────────────────────────────── */}
      <section className="relative min-h-[88vh] flex items-center overflow-hidden">
        {/* Background grid */}
        <div className="absolute inset-0 bg-grid opacity-100 pointer-events-none" />
        {/* Radial glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
                        w-[700px] h-[500px] rounded-full
                        bg-volt-500/[0.04] blur-[120px] pointer-events-none" />

        <div className="relative max-w-6xl mx-auto px-5 py-24">
          {/* Status badge */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-2.5 mb-8"
          >
            <div className="status-dot" />
            <span className="text-xs font-mono text-ash-400 tracking-wide">
              Available for opportunities
            </span>
          </motion.div>

          {/* Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.1 }}
            className="font-display font-semibold text-5xl sm:text-6xl lg:text-7xl
                       text-white leading-[1.05] tracking-tight max-w-3xl"
          >
            Building{' '}
            <span className="text-volt-500">intelligent</span>
            {' '}systems that matter.
          </motion.h1>

          {/* Sub */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.22 }}
            className="mt-6 text-ash-400 text-lg max-w-xl leading-relaxed"
          >
            I'm Pritam Rabha, an AI & Robotics developer and MCA student turning research
            into real-world impact, from autonomous drones to computer vision pipelines.
          </motion.p>

          {/* CTA row */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.34 }}
            className="mt-9 flex flex-wrap items-center gap-3"
          >
            <Link to="/projects" className="btn-volt">
              View Projects <ArrowRight size={15} />
            </Link>
            <Link to="/contact" className="btn-ghost">
              Get in touch
            </Link>
            {/* <a href="https://res.cloudinary.com/denyjxhia/raw/upload/v1778412151/yvqywwfhascli8gannmo.pdf" target="_blank" rel="noopener noreferrer"
               className="flex items-center gap-2 text-ash-400 hover:text-volt-400
                          text-sm font-medium transition-colors ml-1">
              <Download size={14} /> Resume
            </a> */}
            <a
    href="https://res.cloudinary.com/denyjxhia/image/upload/resume.pdf"
  target="_blank"
  rel="noopener noreferrer"
  download
  className="flex items-center gap-2 text-ash-400 hover:text-volt-400
             text-sm font-medium transition-colors ml-1"
>
  <Download size={14} />
  Resume
</a>
          </motion.div>

          {/* Stats row */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="mt-16 flex items-center gap-10 flex-wrap"
          >
            {STATS.map(({ val, label }) => (
              <div key={label}>
                <p className="font-display font-semibold text-2xl text-volt-500">{val}</p>
                <p className="text-xs text-ash-400 mt-0.5">{label}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Pillars ───────────────────────────────────────────────────────── */}
      <section className="max-w-6xl mx-auto px-5 pb-24">
        <div className="grid md:grid-cols-3 gap-4">
          {PILLARS.map(({ icon: Icon, label, desc }, i) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className="card p-5 flex items-start gap-4 hover:border-white/10 transition-all"
            >
              <div className="w-10 h-10 rounded-xl bg-volt-500/10 flex items-center justify-center flex-shrink-0">
                <Icon size={18} className="text-volt-500" />
              </div>
              <div>
                <p className="font-display font-semibold text-white text-sm">{label}</p>
                <p className="text-ash-400 text-xs mt-1 leading-relaxed">{desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── Featured projects ─────────────────────────────────────────────── */}
      <section className="max-w-6xl mx-auto px-5 pb-28">
        <div className="flex items-end justify-between mb-8">
          <div>
            <span className="section-label mb-3 inline-flex">Featured work</span>
            <h2 className="font-display font-semibold text-2xl text-white mt-3">
              Selected Projects
            </h2>
          </div>
          <Link to="/projects"
                className="text-sm text-ash-400 hover:text-volt-400 transition-colors
                           flex items-center gap-1 font-medium">
            All projects <ArrowRight size={14} />
          </Link>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {FEATURED.map((p, i) => <ProjectCard key={p._id} project={p} index={i} />)}
        </div>
      </section>
    </PageLayout>
  )
}
