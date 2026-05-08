import { motion } from 'framer-motion'
import { Download, GraduationCap, Trophy, MapPin } from 'lucide-react'
import PageLayout from '../components/layout/PageLayout'
import SkillBar from '../components/ui/SkillBar'

const SKILLS = [
  { group: 'Programming',    color: 'volt',     items: [
    { name: 'Python',      level: 92 },
    { name: 'Java',        level: 78 },
    { name: 'C++',         level: 74 },
    { name: 'SQL',         level: 80 },
    { name: 'Embedded C',  level: 70 },
  ]},
  { group: 'AI / ML',        color: 'sapphire', items: [
    { name: 'TensorFlow',     level: 85 },
    { name: 'Deep Learning',  level: 82 },
    { name: 'Computer Vision',level: 80 },
    { name: 'OpenCV',         level: 78 },
    { name: 'Scikit-Learn',   level: 75 },
  ]},
  { group: 'Robotics',       color: 'ember',    items: [
    { name: 'Arduino',        level: 88 },
    { name: 'Raspberry Pi',   level: 84 },
    { name: 'Sensor Fusion',  level: 78 },
    { name: 'ROS',            level: 65 },
  ]},
]

const TIMELINE = [
  {
    year: '2024',
    title: '1st Prize — National Innovation Challenge',
    org: 'Ministry of Education, India',
    highlight: true,
  },
  { year: '2024', title: 'MCA — AI Specialisation (ongoing)', org: 'Masters in Computer Applications' },
  { year: '2023', title: 'Smart India Hackathon Finalist', org: 'Government of India' },
  { year: '2023', title: 'Research Paper Published', org: 'International Journal of Computer Science' },
  { year: '2022', title: 'Best Project — State Robotics Competition', org: 'Assam' },
]

const TOOLS = ['Git', 'Linux', 'Docker', 'VS Code', 'Jupyter', 'Firebase', 'Flask', 'NumPy', 'Pandas', 'Matplotlib']

export default function About() {
  return (
    <PageLayout>
      <div className="max-w-6xl mx-auto px-5 py-16">
        {/* ── Header ──────────────────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
          className="mb-16"
        >
          <span className="section-label mb-4 inline-flex">About me</span>
          <h1 className="font-display font-semibold text-4xl sm:text-5xl text-white mt-4 leading-tight">
            Building at the edge of<br />
            <span className="text-volt-500">AI & the physical world.</span>
          </h1>
        </motion.div>

        {/* ── Bio + info card ──────────────────────────────────────────────── */}
        <div className="grid lg:grid-cols-5 gap-12 mb-20">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="lg:col-span-3 space-y-5"
          >
            {[
              "I'm Pritam Rabha — an MCA student specialising in AI, Machine Learning, and Robotics. My work lives at the boundary between software intelligence and physical hardware.",
              "I build real-world intelligent systems: autonomous drones, computer vision pipelines, IoT anomaly detectors. I care about technology that doesn't just compute, but senses, decides, and acts.",
              "Currently pursuing my Master's while competing in national-level challenges and publishing research. I believe the most powerful AI is the kind you can hold in your hands — or that holds your life in its hands.",
            ].map((para, i) => (
              <p key={i} className="text-ash-400 leading-relaxed">{para}</p>
            ))}

            <div className="flex items-center gap-2 pt-2">
              <MapPin size={14} className="text-ash-500" />
              <span className="text-ash-400 text-sm">India · Open to remote</span>
            </div>

            <div className="flex gap-3 pt-2">
              <a href="/resume.pdf" download className="btn-volt">
                <Download size={15} /> Download Resume
              </a>
            </div>
          </motion.div>

          {/* Info card */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="lg:col-span-2"
          >
            <div className="card p-6 space-y-4">
              <div className="flex items-center gap-3 pb-4 border-b border-white/[0.06]">
                <div className="w-12 h-12 rounded-2xl bg-volt-500/15 flex items-center justify-center">
                  <span className="font-display font-bold text-volt-500 text-lg">P</span>
                </div>
                <div>
                  <p className="font-display font-semibold text-white">Pritam Rabha</p>
                  <p className="text-ash-400 text-sm">AI & Robotics Developer</p>
                </div>
              </div>
              {[
                { label: 'Degree',  val: 'MCA — AI Specialisation' },
                { label: 'Email',   val: 'pritamrba@gmail.com' },
                { label: 'Focus',   val: 'AI · ML · Robotics' },
                { label: 'Status',  val: 'Open to work' },
              ].map(({ label, val }) => (
                <div key={label} className="flex justify-between items-start text-sm">
                  <span className="text-ash-500 font-mono text-xs uppercase tracking-wider">{label}</span>
                  <span className="text-ash-200 text-right max-w-[55%]">{val}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* ── Skills ──────────────────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45 }}
          className="mb-20"
        >
          <span className="section-label mb-4 inline-flex">Technical skills</span>
          <h2 className="font-display font-semibold text-2xl text-white mt-4 mb-8">
            Tools & Expertise
          </h2>

          <div className="grid md:grid-cols-3 gap-6">
            {SKILLS.map(({ group, color, items }) => (
              <div key={group} className="card p-6 space-y-4">
                <p className="font-display font-semibold text-sm text-white mb-5">{group}</p>
                {items.map(({ name, level }) => (
                  <SkillBar key={name} name={name} level={level} color={color} />
                ))}
              </div>
            ))}
          </div>

          {/* Tools */}
          <div className="card p-5 mt-4">
            <p className="text-xs font-mono text-ash-500 mb-4 tracking-widest uppercase">Tools & Ecosystem</p>
            <div className="flex flex-wrap gap-2">
              {TOOLS.map((t) => <span key={t} className="tag">{t}</span>)}
            </div>
          </div>
        </motion.div>

        {/* ── Timeline ────────────────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45 }}
        >
          <span className="section-label mb-4 inline-flex">Journey</span>
          <h2 className="font-display font-semibold text-2xl text-white mt-4 mb-8">
            Achievements & Education
          </h2>

          <div className="space-y-3">
            {TIMELINE.map(({ year, title, org, highlight }, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.07 }}
                className={`card p-5 flex items-start gap-4 hover:border-white/10 transition-all ${
                  highlight ? 'border-volt-500/25 bg-gradient-to-r from-volt-500/5 to-transparent' : ''
                }`}
              >
                <div className="flex-shrink-0 mt-0.5">
                  {highlight
                    ? <Trophy size={16} className="text-volt-500" />
                    : <GraduationCap size={16} className="text-ash-500" />
                  }
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-display font-semibold text-white text-sm">{title}</p>
                  <p className="text-ash-500 text-xs mt-1">{org}</p>
                </div>
                <span className="font-mono text-xs text-ash-500 flex-shrink-0">{year}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </PageLayout>
  )
}
