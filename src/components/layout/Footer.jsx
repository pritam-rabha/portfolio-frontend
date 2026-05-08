import { Link } from 'react-router-dom'
import { Github, Linkedin, Mail, Twitter } from 'lucide-react'

const socials = [
  { icon: Github,   href: 'https://github.com/pritamrabha',     label: 'GitHub' },
  { icon: Linkedin, href: 'https://linkedin.com/in/pritamrabha', label: 'LinkedIn' },
  { icon: Twitter,  href: 'https://twitter.com/pritamrabha',    label: 'Twitter' },
  { icon: Mail,     href: 'mailto:pritamrba@gmail.com',          label: 'Email' },
]

export default function Footer() {
  return (
    <footer className="border-t border-white/[0.06] mt-24">
      <div className="max-w-6xl mx-auto px-5 py-10 flex flex-col sm:flex-row
                      items-center justify-between gap-6">
        <div>
          <Link to="/" className="font-display font-semibold text-white">
            Pritam<span className="text-volt-500">.</span>
          </Link>
          <p className="text-ash-400 text-xs mt-1">
            pritamrba@gmail.com
          </p>
        </div>

        <div className="flex items-center gap-3">
          {socials.map(({ icon: Icon, href, label }) => (
            <a key={label} href={href} target="_blank" rel="noopener noreferrer"
               title={label}
               className="w-9 h-9 flex items-center justify-center rounded-xl
                          border border-white/[0.08] text-ash-400
                          hover:border-volt-500/40 hover:text-volt-500
                          transition-all duration-200">
              <Icon size={15} />
            </a>
          ))}
        </div>

        <p className="text-ash-400 text-xs">
          © {new Date().getFullYear()} Pritam Rabha
        </p>
      </div>
    </footer>
  )
}
