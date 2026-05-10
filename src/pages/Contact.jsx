import { useState, useRef } from 'react'
import { motion } from 'framer-motion'
import { Send, Mail, MapPin, Github, Linkedin, Twitter, CheckCircle } from 'lucide-react'
import PageLayout from '../components/layout/PageLayout'
import { submitContact } from '../services/api'

const SOCIALS = [
  { icon: Github,   href: 'https://github.com/pritam-rabha',      label: 'GitHub' },
  { icon: Linkedin, href: 'https://linkedin.com/in/pritamrabha',  label: 'LinkedIn' },
  { icon: Twitter,  href: 'https://twitter.com/pritam__rabha',     label: 'Twitter' },
  { icon: Mail,     href: 'mailto:pritamrba@gmail.com',           label: 'Email' },
]

const INIT = { name: '', email: '', subject: '', message: '' }

export default function Contact() {
  const [form, setForm] = useState(INIT)
  const [state, setState] = useState('idle') // idle | sending | success | error
  const [errMsg, setErrMsg] = useState('')
  // Keep submitted email for success message — form clears on success so we need a ref
  const submittedEmail = useRef('')

  const update = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }))

  const handleSubmit = async (e) => {
    e.preventDefault()
    setState('sending')
    submittedEmail.current = form.email
    try {
      await submitContact(form)
      setState('success')
      setForm(INIT)
    } catch (err) {
      setState('error')
      setErrMsg(
        err.response?.data?.message ||
        'Something went wrong. Please email me directly.'
      )
    }
  }

  return (
    <PageLayout>
      <div className="max-w-6xl mx-auto px-5 py-16">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
          className="mb-14"
        >
          <span className="section-label mb-4 inline-flex">Get in touch</span>
          <h1 className="font-display font-semibold text-4xl sm:text-5xl text-white mt-4">
            Let's build something<br />
            <span className="text-volt-500">together.</span>
          </h1>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-10">
          {/* ── Left info panel ─────────*/}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="lg:col-span-2 space-y-6"
          >
            <p className="text-ash-400 leading-relaxed">
              Have a project idea, collaboration proposal, or just want to talk AI
              and robotics? My inbox is open. I reply within 24 hours.
            </p>

            {/* Direct email */}
            <a href="mailto:pritamrba@gmail.com"
               className="card p-4 flex items-center gap-3 hover:border-volt-500/20
                          hover:bg-ink-700 transition-all group block">
              <div className="w-10 h-10 rounded-xl bg-volt-500/10 flex items-center justify-center flex-shrink-0
                              group-hover:bg-volt-500/20 transition-colors">
                <Mail size={16} className="text-volt-500" />
              </div>
              <div>
                <p className="text-xs text-ash-500 mb-0.5">Primary</p>
                <p className="text-ash-200 text-sm font-medium">pritamrba@gmail.com</p>
              </div>
            </a>

            <div className="flex items-center gap-2 text-ash-500 text-sm">
              <MapPin size={14} />
              India · Open to remote work
            </div>

            {/* Socials */}
            <div>
              <p className="text-xs font-mono text-ash-500 mb-3 uppercase tracking-widest">Find me on</p>
              <div className="flex gap-2">
                {SOCIALS.map(({ icon: Icon, href, label }) => (
                  <a key={label} href={href} target="_blank" rel="noopener noreferrer" title={label}
                     className="w-10 h-10 card flex items-center justify-center text-ash-400
                                hover:text-volt-400 hover:border-volt-500/30 transition-all">
                    <Icon size={15} />
                  </a>
                ))}
              </div>
            </div>
          </motion.div>

          {/* ── Contact form ─────────────────────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="lg:col-span-3"
          >
            {state === 'success' ? (
              <div className="card p-10 flex flex-col items-center justify-center gap-4 min-h-[360px] text-center">
                <div className="w-14 h-14 rounded-2xl bg-volt-500/15 flex items-center justify-center">
                  <CheckCircle size={24} className="text-volt-500" />
                </div>
                <h3 className="font-display font-semibold text-lg text-white">Message sent!</h3>
                <p className="text-ash-400 text-sm max-w-xs leading-relaxed">
                  Thanks for reaching out. I'll reply to{' '}
                  <span className="text-volt-400">{submittedEmail.current}</span>{' '}
                  within 24 hours.
                </p>
                <button
                  onClick={() => setState('idle')}
                  className="btn-ghost mt-2 text-xs px-4 py-2"
                >
                  Send another
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="card p-7 space-y-4">
                <p className="text-xs font-mono text-ash-500 tracking-widest mb-2">New message</p>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs text-ash-500 block mb-1.5">Name *</label>
                    <input
                      value={form.name} onChange={update('name')}
                      required placeholder="Your name"
                      className="field"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-ash-500 block mb-1.5">Email *</label>
                    <input
                      type="email" value={form.email} onChange={update('email')}
                      required placeholder="your@email.com"
                      className="field"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs text-ash-500 block mb-1.5">Subject</label>
                  <input
                    value={form.subject} onChange={update('subject')}
                    placeholder="What's it about?"
                    className="field"
                  />
                </div>

                <div>
                  <label className="text-xs text-ash-500 block mb-1.5">Message *</label>
                  <textarea
                    value={form.message} onChange={update('message')}
                    required rows={5}
                    placeholder="Tell me about your project or idea…"
                    className="field resize-none"
                  />
                </div>

                {state === 'error' && (
                  <p className="text-xs text-ember-400 bg-ember-500/10 border border-ember-500/20
                                rounded-lg px-3 py-2">
                    {errMsg}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={state === 'sending'}
                  className="btn-volt w-full justify-center disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {state === 'sending' ? (
                    <>
                      <div className="w-4 h-4 border-2 border-ink-950/30 border-t-ink-950 rounded-full animate-spin" />
                      Sending…
                    </>
                  ) : (
                    <>
                      <Send size={14} /> Send Message
                    </>
                  )}
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </PageLayout>
  )
}
