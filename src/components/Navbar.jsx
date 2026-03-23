import { useState } from 'react'
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import NightModeToggle from './ui/NightModeToggle'

const NAV_LINKS = ['ABOUT', 'MISSION', 'TARGET', 'STORE']

function MobileMenu({ isOpen, onClose }) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-[200] flex flex-col items-center justify-center gap-8"
          style={{ backgroundColor: 'var(--bg)' }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
        >
          <button
            onClick={onClose}
            className="absolute top-4 right-6 bg-transparent border-none cursor-pointer"
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: '11px',
              color: 'var(--text)',
            }}
          >
            CLOSE
          </button>
          {NAV_LINKS.map((link, i) => (
            <motion.a
              key={link}
              href={`#${link.toLowerCase()}`}
              onClick={onClose}
              className="no-underline"
              style={{
                fontFamily: "'Bebas Neue', sans-serif",
                fontSize: 'clamp(32px, 8vw, 48px)',
                color: 'var(--text)',
              }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + i * 0.08, duration: 0.4 }}
            >
              {link}
            </motion.a>
          ))}
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const { scrollY } = useScroll()

  const bgOpacity = useTransform(scrollY, [0, 100], [0, 0.9])
  const blur = useTransform(scrollY, [0, 100], [0, 24])

  return (
    <>
      <motion.nav
        className="fixed z-50 w-full py-4 px-6 md:px-12 flex justify-between items-start"
        style={{
          backgroundColor: useTransform(bgOpacity, (v) => `rgba(0,0,0,${v})`), // Intentional: nav always dark for readability
          backdropFilter: useTransform(blur, (v) => `blur(${v}px)`),
          WebkitBackdropFilter: useTransform(blur, (v) => `blur(${v}px)`),
        }}
      >
        {/* Logo */}
        <a href="#" className="no-underline flex" style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: '24px' }}>
          <span style={{ color: 'var(--text)' }}>PHANTOM</span>
          <span style={{ color: 'var(--accent)' }}>NODE</span>
        </a>

        {/* Center links — desktop only */}
        <div className="hidden md:flex gap-8 items-center">
          {NAV_LINKS.map((link) => (
            <a
              key={link}
              href={`#${link.toLowerCase()}`}
              className="no-underline transition-opacity duration-300 hover:opacity-50"
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: '11px',
                color: 'var(--text)',
                textTransform: 'uppercase',
              }}
            >
              {link}
            </a>
          ))}
        </div>

        {/* Right side */}
        <div className="flex gap-4 items-center">
          <NightModeToggle />

          {/* Mobile menu button */}
          <button
            className="md:hidden bg-transparent border-none cursor-pointer"
            onClick={() => setMenuOpen(true)}
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: '11px',
              color: 'var(--text)',
            }}
          >
            MENU
          </button>

          {/* JOIN US — desktop only */}
          <a
            href="#"
            className="hidden md:block no-underline px-5 py-2 transition-all duration-300"
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: '11px',
              color: 'var(--accent)',
              border: '1px solid var(--accent)',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = 'var(--accent)'
              e.currentTarget.style.color = 'var(--bg)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'transparent'
              e.currentTarget.style.color = 'var(--accent)'
            }}
          >
            JOIN US
          </a>
        </div>
      </motion.nav>

      <MobileMenu isOpen={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  )
}
