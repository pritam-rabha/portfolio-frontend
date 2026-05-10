import { useState, useEffect, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import {
  LayoutDashboard, FolderKanban, MessageSquare, Plus, Trash2,
  Check, Loader2, LogOut, X, ChevronRight, Mail, ExternalLink, Github,
  RefreshCw, Send, Pencil, FileText, Upload, Download,
} from 'lucide-react'
import {
  getProjects, createProject, deleteProject, updateProject,
  getMessages, markMessageRead, deleteMessage,
} from '../services/api'
import { useAuth } from '../context/AuthContext'
import api from '../services/api'

/* ─── Toast ──────────────────────────────────────────────────────────────── */
function useToast() {
  const [toasts, setToasts] = useState([])
  const push = (msg, type = 'success') => {
    const id = Date.now()
    setToasts(t => [...t, { id, msg, type }])
    setTimeout(() => setToasts(t => t.filter(x => x.id !== id)), 3500)
  }
  return { toasts, push }
}
function ToastContainer({ toasts }) {
  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-2">
      {toasts.map(t => (
        <div key={t.id} className={`px-4 py-3 rounded-xl text-sm font-medium shadow-lg ${
          t.type === 'error' ? 'bg-ember-500 text-white' : 'bg-volt-500 text-ink-950'
        }`}>{t.msg}</div>
      ))}
    </div>
  )
}

/* ─── Constants ──────────────────────────────────────────────────────────── */
const TABS = [
  { id: 'overview',  label: 'Overview',  icon: LayoutDashboard },
  { id: 'projects',  label: 'Projects',  icon: FolderKanban },
  { id: 'messages',  label: 'Messages',  icon: MessageSquare },
  { id: 'resume',    label: 'Resume',    icon: FileText },
]
const EMPTY_PROJECT = {
  title: '', description: '', shortDescription: '',
  techStack: '', githubUrl: '', liveUrl: '', imageUrl: '',
  featured: false, badge: '', isPublished: true,
}


function Field({ label, name, type = 'text', placeholder, required, form, upd }) {
  return (
    <div>
      <label className="text-xs text-ash-500 block mb-1.5">
        {label}{required && ' *'}
      </label>

      <input
        type={type}
        value={form[name] || ''}
        onChange={upd(name)}
        required={required}
        placeholder={placeholder}
        className="field text-sm"
      />
    </div>
  )
}

/* ─── Project Form Modal ─────────────────────────────────────────────────── */
function ProjectForm({ onClose, onSaved, toast, editData = null }) {
  const isEdit = !!editData
  const [form, setForm] = useState(
    isEdit ? { ...editData, techStack: editData.techStack?.join(', ') || '' } : EMPTY_PROJECT
  )
  const [saving, setSaving] = useState(false)
  const upd = k => e => setForm(f => ({ ...f, [k]: e.target.type === 'checkbox' ? e.target.checked : e.target.value }))

  const submit = async e => {
    e.preventDefault()
    setSaving(true)
    try {
      const payload = { ...form, techStack: form.techStack.split(',').map(s => s.trim()).filter(Boolean) }
      if (isEdit) await updateProject(editData._id, payload)
      else await createProject(payload)
      toast.push(isEdit ? 'Project updated!' : 'Project created!')
      onSaved()
      onClose()
    } catch (err) {
      toast.push(err.response?.data?.message || 'Failed to save project.', 'error')
    } finally { setSaving(false) }
  }

  // function Field({ label, name, type = 'text', placeholder, required, form, upd }) {
  // return (
  //   <div>
  //     <label className="text-xs text-ash-500 block mb-1.5">{label}{required && ' *'}</label>
  //     <input type={type} value={form[name] || ''} onChange={upd(name)} required={required} placeholder={placeholder} className="field text-sm" />
  //   </div>
  // )


  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 bg-ink-950/80 backdrop-blur-sm flex items-center justify-center p-4">
      <motion.div initial={{ scale: 0.95, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.95, y: 20 }}
        className="card w-full max-w-xl max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-white/[0.06]">
          <h3 className="font-display font-semibold text-white">{isEdit ? 'Edit project' : 'New project'}</h3>
          <button onClick={onClose} className="p-1.5 text-ash-500 hover:text-white rounded-lg transition-colors"><X size={16} /></button>
        </div>
        <form onSubmit={submit} className="p-6 space-y-4">
          <Field label="Title" name="title" placeholder="Project name" required form={form} upd={upd} />
          <div>
            <label className="text-xs text-ash-500 block mb-1.5">Description *</label>
            <textarea value={form.description} onChange={upd('description')} required rows={3}
              placeholder="What does it do?" className="field text-sm resize-none" />
          </div>
         <Field label="Tech stack (comma-separated)" name="techStack" placeholder="Python, TensorFlow, Arduino" required form={form} upd={upd} />
          <div className="grid grid-cols-2 gap-3">
            <Field label="GitHub URL" name="githubUrl" placeholder="https://github.com/…" form={form} upd={upd} />
            <Field label="Live URL" name="liveUrl" placeholder="https://…" form={form} upd={upd} />
          </div>
          <Field label="Badge text" name="badge" placeholder="1st Prize — MoE 2024" form={form} upd={upd} />
          <Field label="Image URL" name="imageUrl" placeholder="https://…" form={form} upd={upd} />
          <div className="flex items-center gap-5">
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" checked={form.featured} onChange={upd('featured')}
                className="w-4 h-4 rounded border-white/20 bg-ink-700 accent-volt-500" />
              <span className="text-sm text-ash-300">Featured</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" checked={form.isPublished} onChange={upd('isPublished')}
                className="w-4 h-4 rounded border-white/20 bg-ink-700 accent-volt-500" />
              <span className="text-sm text-ash-300">Published</span>
            </label>
          </div>
          <div className="flex gap-3 pt-2">
            <button type="button" onClick={onClose} className="btn-ghost flex-1 justify-center text-sm">Cancel</button>
            <button type="submit" disabled={saving} className="btn-volt flex-1 justify-center text-sm">
              {saving ? <Loader2 size={14} className="animate-spin" /> : isEdit ? <Pencil size={14} /> : <Plus size={14} />}
              {saving ? 'Saving…' : isEdit ? 'Update' : 'Create'}
            </button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  )
}





/* ─── Resume Tab ─────────────────────────────────────────────────────────── */
function ResumeTab({ toast }) {
  const [uploading, setUploading] = useState(false)
  const [resumeUrl, setResumeUrl] = useState(localStorage.getItem('resume_url') || '')

  const handleUpload = async e => {
    const file = e.target.files[0]
    if (!file) return
    if (file.type !== 'application/pdf') { toast.push('Only PDF files allowed.', 'error'); return }
    if (file.size > 5 * 1024 * 1024) { toast.push('File must be under 5MB.', 'error'); return }

    setUploading(true)
    try {
      const cloudName = 'denyjxhia'
      const preset    = 'portfolio_resume'
      const formData = new FormData()
      formData.append('file', file)
      formData.append('upload_preset', preset)
      formData.append('public_id', 'resume')

      const res  = await fetch(`https://api.cloudinary.com/v1_1/denyjxhia/auto/upload`, { method: 'POST', body: formData })
      const data = await res.json()

      if (data.secure_url) {
        setResumeUrl(data.secure_url)
        localStorage.setItem('resume_url', data.secure_url)
        toast.push('Resume uploaded! Copy the URL below and update Home.jsx.')
      } else {
        toast.push('Upload failed: ' + (data.error?.message || 'Unknown error'), 'error')
      }
    } catch { toast.push('Upload failed.', 'error') }
    finally { setUploading(false) }
  }

  const handleDelete = () => {
    setResumeUrl('')
    localStorage.removeItem('resume_url')
    toast.push('Resume URL removed.')
  }

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
      <div className="max-w-lg">
        <p className="text-ash-400 text-sm mb-6 leading-relaxed">
          Upload your resume as a PDF. It will be hosted on Cloudinary and you can link it from your portfolio.
        </p>

        {resumeUrl ? (
          <div className="card p-5 mb-6">
            <p className="text-xs font-mono text-ash-500 mb-3">// current resume</p>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-volt-500/15 flex items-center justify-center flex-shrink-0">
                <FileText size={18} className="text-volt-500" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-white text-sm font-medium">resume.pdf</p>
                <p className="text-ash-500 text-xs truncate">{resumeUrl}</p>
              </div>
            </div>
            <div className="flex gap-2">
              <a href={resumeUrl} target="_blank" rel="noopener noreferrer" className="btn-ghost text-xs px-3 py-2">
                <Download size={13} /> View
              </a>
              <button onClick={handleDelete} className="btn-ghost text-xs px-3 py-2 hover:text-ember-400">
                <Trash2 size={13} /> Remove
              </button>
            </div>
            <div className="mt-4 p-3 rounded-xl bg-volt-500/5 border border-volt-500/10">
              <p className="text-xs text-ash-400 mb-1">Copy this URL and paste it in <code className="text-volt-400">Home.jsx</code> resume link:</p>
              <code className="text-volt-400 text-xs break-all">{resumeUrl}</code>
            </div>
          </div>
        ) : (
          <div className="card p-8 mb-6 text-center border-dashed">
            <FileText size={32} className="text-ash-600 mx-auto mb-3" />
            <p className="text-ash-500 text-sm">No resume uploaded yet.</p>
          </div>
        )}

        <label className={`btn-volt cursor-pointer inline-flex ${uploading ? 'opacity-60 pointer-events-none' : ''}`}>
          {uploading ? <Loader2 size={15} className="animate-spin" /> : <Upload size={15} />}
          {uploading ? 'Uploading…' : resumeUrl ? 'Replace Resume' : 'Upload Resume'}
          <input type="file" accept=".pdf" className="hidden" onChange={handleUpload} />
        </label>
        <p className="text-ash-500 text-xs mt-3">PDF only · max 5MB · requires Cloudinary setup</p>

        <div className="card p-4 mt-6 border-white/[0.04]">
          <p className="text-xs font-mono text-ash-500 mb-2">// setup required</p>
          <p className="text-ash-400 text-xs leading-relaxed">
            Add these to <strong className="text-ash-300">Vercel → Environment Variables</strong>:
          </p>
          <div className="mt-2 space-y-1">
            <code className="text-volt-400 text-xs block">VITE_CLOUDINARY_CLOUD_NAME=your_cloud_name</code>
            <code className="text-volt-400 text-xs block">VITE_CLOUDINARY_PRESET=portfolio_resume</code>
          </div>
          <p className="text-ash-500 text-xs mt-2">
            Get these from <strong className="text-ash-300">cloudinary.com</strong> → Settings → Upload → Add unsigned preset named <code className="text-volt-400">portfolio_resume</code>
          </p>
        </div>
      </div>
    </motion.div>
  )
}

/* ─── Main Dashboard ─────────────────────────────────────────────────────── */
export default function AdminDashboard() {
  const [tab, setTab] = useState('overview')
  const [projects, setProjects] = useState([])
  const [messages, setMessages] = useState([])
  const [loadingP, setLoadingP] = useState(true)
  const [loadingM, setLoadingM] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editProject, setEditProject] = useState(null)
  const [expandedMsg, setExpandedMsg] = useState(null)
  const [replyText, setReplyText] = useState({})
  const [sendingReply, setSendingReply] = useState({})
  const { user, logoutUser } = useAuth()
  const navigate = useNavigate()
  const toast = useToast()

  const fetchProjects = useCallback(() => {
    setLoadingP(true)
    getProjects()
      .then(({ data }) => setProjects(data.data || []))
      .catch(() => toast.push('Failed to load projects.', 'error'))
      .finally(() => setLoadingP(false))
  }, [])

  const fetchMessages = useCallback(() => {
    setLoadingM(true)
    getMessages()
      .then(({ data }) => setMessages(data.data || []))
      .catch(() => toast.push('Failed to load messages.', 'error'))
      .finally(() => setLoadingM(false))
  }, [])

  useEffect(() => { fetchProjects(); fetchMessages() }, [fetchProjects, fetchMessages])

  const handleDeleteProject = async id => {
    if (!window.confirm('Delete this project?')) return
    try { await deleteProject(id); setProjects(p => p.filter(x => x._id !== id)); toast.push('Project deleted.') }
    catch { toast.push('Failed to delete.', 'error') }
  }

  const handleMarkRead = async id => {
    try { await markMessageRead(id); setMessages(m => m.map(x => x._id === id ? { ...x, isRead: true } : x)) }
    catch { toast.push('Failed to mark as read.', 'error') }
  }

  const handleDeleteMessage = async id => {
    if (!window.confirm('Delete this message?')) return
    try {
      await deleteMessage(id)
      setMessages(m => m.filter(x => x._id !== id))
      if (expandedMsg === id) setExpandedMsg(null)
      toast.push('Message deleted.')
    } catch { toast.push('Failed to delete.', 'error') }
  }

  const handleSendReply = async id => {
    const text = replyText[id]?.trim()
    if (!text) { toast.push('Please write a reply first.', 'error'); return }
    setSendingReply(s => ({ ...s, [id]: true }))
    try {
      await api.post(`/messages/${id}/reply`, { replyText: text })
      toast.push('Reply sent!')
      setReplyText(r => ({ ...r, [id]: '' }))
      setMessages(m => m.map(x => x._id === id ? { ...x, isRead: true } : x))
    } catch (err) {
      toast.push(err.response?.data?.message || 'Failed to send reply.', 'error')
    } finally { setSendingReply(s => ({ ...s, [id]: false })) }
  }

  const unread = messages.filter(m => !m.isRead).length
  const handleLogout = () => { logoutUser(); navigate('/') }

  return (
    <div className="min-h-screen bg-ink-950 flex">
      <ToastContainer toasts={toast.toasts} />

      {/* Sidebar */}
      <aside className="hidden md:flex flex-col w-56 border-r border-white/[0.06] sticky top-0 h-screen">
        <div className="p-5 border-b border-white/[0.06]">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 bg-volt-500 rounded-lg flex items-center justify-center">
              <span className="font-mono text-ink-950 font-bold text-xs">P</span>
            </div>
            <span className="font-display font-semibold text-white text-sm">Admin</span>
          </div>
        </div>
        <nav className="flex-1 p-3 space-y-1">
          {TABS.map(({ id, label, icon: Icon }) => (
            <button key={id} onClick={() => setTab(id)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-all duration-200 text-left ${
                tab === id ? 'bg-volt-500/10 text-volt-400 font-medium' : 'text-ash-400 hover:bg-ink-700 hover:text-white'
              }`}>
              <Icon size={15} />
              {label}
              {id === 'messages' && unread > 0 && (
                <span className="ml-auto text-xs bg-volt-500 text-ink-950 font-bold rounded-full w-4 h-4 flex items-center justify-center">
                  {unread > 9 ? '9+' : unread}
                </span>
              )}
            </button>
          ))}
        </nav>
        <div className="p-4 border-t border-white/[0.06]">
          <p className="text-xs text-ash-500 mb-1 truncate">{user?.name}</p>
          <p className="text-xs text-ash-600 truncate mb-3">{user?.email}</p>
          <button onClick={handleLogout}
            className="w-full flex items-center gap-2 text-xs text-ash-500 hover:text-ember-400 transition-colors py-1.5 px-2 rounded-lg hover:bg-ink-700">
            <LogOut size={13} /> Sign out
          </button>
        </div>
      </aside>

      {/* Main */}
      <div className="flex-1 min-w-0">
        <header className="border-b border-white/[0.06] px-6 py-4 flex items-center justify-between">
          <div>
            <h1 className="font-display font-semibold text-white">{TABS.find(t => t.id === tab)?.label}</h1>
            <p className="text-xs text-ash-500 mt-0.5">
              {new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
            </p>
          </div>
          <div className="flex md:hidden gap-1">
            {TABS.map(({ id, icon: Icon }) => (
              <button key={id} onClick={() => setTab(id)}
                className={`p-2 rounded-xl transition-all ${tab === id ? 'bg-volt-500/15 text-volt-400' : 'text-ash-500'}`}>
                <Icon size={16} />
              </button>
            ))}
          </div>
          <div className="hidden md:flex items-center gap-2">
            {tab === 'projects' && (
              <button onClick={() => { setEditProject(null); setShowForm(true) }} className="btn-volt text-xs px-3 py-2">
                <Plus size={13} /> New Project
              </button>
            )}
            {tab === 'messages' && (
              <button onClick={fetchMessages} className="btn-ghost text-xs px-3 py-2">
                <RefreshCw size={13} /> Refresh
              </button>
            )}
          </div>
        </header>

        <div className="p-6">
          {/* Overview */}
          {tab === 'overview' && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                <div className="card p-5 border-volt-500/25 bg-gradient-to-br from-volt-500/5 to-transparent">
                  <p className="text-xs font-mono text-ash-500 uppercase tracking-widest">Projects</p>
                  <p className="font-display font-semibold text-3xl mt-2 text-volt-500">{projects.length}</p>
                  <p className="text-xs text-ash-500 mt-1">Total</p>
                </div>
                <div className="card p-5">
                  <p className="text-xs font-mono text-ash-500 uppercase tracking-widest">Published</p>
                  <p className="font-display font-semibold text-3xl mt-2 text-white">{projects.filter(p => p.isPublished).length}</p>
                  <p className="text-xs text-ash-500 mt-1">Live</p>
                </div>
                <div className="card p-5">
                  <p className="text-xs font-mono text-ash-500 uppercase tracking-widest">Messages</p>
                  <p className="font-display font-semibold text-3xl mt-2 text-white">{messages.length}</p>
                  <p className="text-xs text-ash-500 mt-1">Total</p>
                </div>
                <div className={`card p-5 ${unread > 0 ? 'border-volt-500/25 bg-gradient-to-br from-volt-500/5 to-transparent' : ''}`}>
                  <p className="text-xs font-mono text-ash-500 uppercase tracking-widest">Unread</p>
                  <p className={`font-display font-semibold text-3xl mt-2 ${unread > 0 ? 'text-volt-500' : 'text-white'}`}>{unread}</p>
                  <p className="text-xs text-ash-500 mt-1">Pending reply</p>
                </div>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="card p-5">
                  <div className="flex items-center justify-between mb-4">
                    <p className="font-display font-semibold text-sm text-white">Recent Messages</p>
                    <button onClick={() => setTab('messages')} className="text-xs text-ash-500 hover:text-volt-400 transition-colors flex items-center gap-1">View all <ChevronRight size={12} /></button>
                  </div>
                  <div className="space-y-2">
                    {loadingM ? <Loader2 size={16} className="animate-spin text-volt-500" /> :
                      messages.slice(0, 4).map(m => (
                        <div key={m._id} className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-ink-700 cursor-pointer transition-all" onClick={() => setTab('messages')}>
                          <div className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${m.isRead ? 'bg-ink-500' : 'bg-volt-500'}`} />
                          <div className="flex-1 min-w-0">
                            <p className={`text-xs font-medium truncate ${m.isRead ? 'text-ash-400' : 'text-white'}`}>{m.name}</p>
                            <p className="text-xs text-ash-500 truncate">{m.message?.slice(0, 50)}</p>
                          </div>
                        </div>
                      ))
                    }
                    {!loadingM && messages.length === 0 && <p className="text-xs text-ash-500">No messages yet.</p>}
                  </div>
                </div>
                <div className="card p-5">
                  <div className="flex items-center justify-between mb-4">
                    <p className="font-display font-semibold text-sm text-white">Recent Projects</p>
                    <button onClick={() => setTab('projects')} className="text-xs text-ash-500 hover:text-volt-400 transition-colors flex items-center gap-1">View all <ChevronRight size={12} /></button>
                  </div>
                  <div className="space-y-2">
                    {loadingP ? <Loader2 size={16} className="animate-spin text-volt-500" /> :
                      projects.slice(0, 4).map(p => (
                        <div key={p._id} className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-ink-700 transition-all">
                          <div className="w-1.5 h-1.5 rounded-full bg-volt-500 flex-shrink-0" />
                          <p className="text-xs text-ash-200 flex-1 truncate">{p.title}</p>
                          {p.featured && <span className="text-xs font-mono text-volt-500">featured</span>}
                        </div>
                      ))
                    }
                    {!loadingP && projects.length === 0 && <p className="text-xs text-ash-500">No projects yet.</p>}
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* Projects */}
          {tab === 'projects' && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
              <div className="flex justify-end mb-5 md:hidden">
                <button onClick={() => { setEditProject(null); setShowForm(true) }} className="btn-volt text-xs px-3 py-2"><Plus size={13} /> New</button>
              </div>
              {loadingP ? (
                <div className="flex justify-center py-20"><Loader2 size={22} className="animate-spin text-volt-500" /></div>
              ) : projects.length === 0 ? (
                <div className="text-center py-20">
                  <p className="text-ash-500 mb-4">No projects yet.</p>
                  <button onClick={() => { setEditProject(null); setShowForm(true) }} className="btn-volt text-sm"><Plus size={14} /> Create your first project</button>
                </div>
              ) : (
                <div className="space-y-3">
                  {projects.map(p => (
                    <div key={p._id} className="card p-4 flex items-center gap-4 hover:border-white/10 transition-all">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-0.5">
                          <p className="font-display font-semibold text-sm text-white truncate">{p.title}</p>
                          {p.featured && <span className="text-xs font-mono text-volt-500 border border-volt-500/30 bg-volt-500/10 px-1.5 py-0.5 rounded-md flex-shrink-0">featured</span>}
                          {!p.isPublished && <span className="text-xs font-mono text-ash-500 border border-white/10 px-1.5 py-0.5 rounded-md flex-shrink-0">draft</span>}
                        </div>
                        <p className="text-ash-500 text-xs truncate">{p.description}</p>
                        <div className="flex flex-wrap gap-1 mt-2">
                          {p.techStack?.slice(0, 4).map(t => <span key={t} className="tag text-xs py-0.5 px-1.5">{t}</span>)}
                        </div>
                      </div>
                      <div className="flex items-center gap-1.5 flex-shrink-0">
                        {p.githubUrl && <a href={p.githubUrl} target="_blank" rel="noopener noreferrer" className="p-1.5 text-ash-500 hover:text-white transition-colors rounded-lg hover:bg-ink-600"><Github size={14} /></a>}
                        {p.liveUrl && <a href={p.liveUrl} target="_blank" rel="noopener noreferrer" className="p-1.5 text-ash-500 hover:text-volt-400 transition-colors rounded-lg hover:bg-ink-600"><ExternalLink size={14} /></a>}
                        <button onClick={() => { setEditProject(p); setShowForm(true) }}
                          className="p-1.5 text-ash-500 hover:text-volt-400 transition-colors rounded-lg hover:bg-ink-600" title="Edit">
                          <Pencil size={14} />
                        </button>
                        <button onClick={() => handleDeleteProject(p._id)}
                          className="p-1.5 text-ash-500 hover:text-ember-400 transition-colors rounded-lg hover:bg-ink-600" title="Delete">
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </motion.div>
          )}

          {/* Messages */}
          {tab === 'messages' && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
              <div className="flex justify-end mb-5 md:hidden">
                <button onClick={fetchMessages} className="btn-ghost text-xs px-3 py-2"><RefreshCw size={13} /> Refresh</button>
              </div>
              {loadingM ? (
                <div className="flex justify-center py-20"><Loader2 size={22} className="animate-spin text-volt-500" /></div>
              ) : messages.length === 0 ? (
                <div className="text-center py-20">
                  <Mail size={32} className="text-ash-600 mx-auto mb-3" />
                  <p className="text-ash-500">No messages yet.</p>
                </div>
              ) : (
                <div className="space-y-2">
                  {messages.map(m => (
                    <div key={m._id} className={`card transition-all ${!m.isRead ? 'border-volt-500/15 bg-volt-500/[0.02]' : ''}`}>
                      <div className="flex items-center gap-3 p-4 cursor-pointer hover:bg-ink-700/30 rounded-2xl transition-all"
                        onClick={() => { setExpandedMsg(expandedMsg === m._id ? null : m._id); if (!m.isRead) handleMarkRead(m._id) }}>
                        <div className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${m.isRead ? 'bg-ink-500' : 'bg-volt-500'}`} />
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <span className={`text-sm font-medium ${m.isRead ? 'text-ash-300' : 'text-white'}`}>{m.name}</span>
                            <span className="text-xs text-ash-600">{m.email}</span>
                          </div>
                          <p className="text-xs text-ash-500 truncate mt-0.5">{m.subject || m.message?.slice(0, 60)}</p>
                        </div>
                        <div className="flex items-center gap-2 flex-shrink-0">
                          <span className="text-xs text-ash-600 hidden sm:block">{new Date(m.createdAt).toLocaleDateString()}</span>
                          <ChevronRight size={14} className={`text-ash-600 transition-transform ${expandedMsg === m._id ? 'rotate-90' : ''}`} />
                        </div>
                      </div>
                      <AnimatePresence>
                        {expandedMsg === m._id && (
                          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.2 }} className="overflow-hidden">
                            <div className="px-6 pb-5 border-t border-white/[0.06] pt-4">
                              {m.subject && <p className="text-xs text-ash-500 mb-2"><span className="text-ash-600 font-mono">subject: </span>{m.subject}</p>}
                              <p className="text-sm text-ash-300 leading-relaxed whitespace-pre-wrap mb-5">{m.message}</p>
                              <div className="border border-white/[0.08] rounded-xl p-4 bg-ink-800/50">
                                <p className="text-xs font-mono text-ash-500 mb-3">Reply to {m.name} · {m.email}</p>
                                <textarea value={replyText[m._id] || ''} onChange={e => setReplyText(r => ({ ...r, [m._id]: e.target.value }))}
                                  rows={4} placeholder="Write your reply here…" className="field resize-none text-sm w-full mb-3" />
                                <div className="flex items-center gap-2">
                                  <button onClick={() => handleSendReply(m._id)} disabled={sendingReply[m._id]} className="btn-volt text-xs px-4 py-2 disabled:opacity-60">
                                    {sendingReply[m._id] ? <><Loader2 size={13} className="animate-spin" /> Sending…</> : <><Send size={13} /> Send Reply</>}
                                  </button>
                                  {!m.isRead && (
                                    <button onClick={() => handleMarkRead(m._id)} className="btn-ghost text-xs px-3 py-2">
                                      <Check size={12} /> Mark read
                                    </button>
                                  )}
                                  <button onClick={() => handleDeleteMessage(m._id)} className="ml-auto p-1.5 text-ash-500 hover:text-ember-400 transition-colors rounded-lg hover:bg-ink-600">
                                    <Trash2 size={13} />
                                  </button>
                                </div>
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  ))}
                </div>
              )}
            </motion.div>
          )}

          {/* Resume */}
          {tab === 'resume' && <ResumeTab toast={toast} />}
        </div>
      </div>

      {/* Project form modal */}
      <AnimatePresence>
        {showForm && (
          <ProjectForm
            onClose={() => { setShowForm(false); setEditProject(null) }}
            onSaved={fetchProjects}
            toast={toast}
            editData={editProject}
          />
        )}
      </AnimatePresence>
    </div>
  )
}