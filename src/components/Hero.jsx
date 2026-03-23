import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import TextScramble from './ui/TextScramble'

export default function Hero() {
  const [scanDone, setScanDone] = useState(false)
  const [showHud, setShowHud] = useState(false)

  useEffect(() => {
    const scanTimer = setTimeout(() => setScanDone(true), 1000)
    const hudTimer = setTimeout(() => setShowHud(true), 2500)
    return () => {
      clearTimeout(scanTimer)
      clearTimeout(hudTimer)
    }
  }, [])

  return (
    <section className="relative h-screen overflow-hidden">
      {/* Background image */}
      <motion.div
        className="absolute inset-0"
        style={{
          backgroundImage: 'url(https://images.unsplash.com/photo-1580153215516-5a3b39b5ec48?w=1920&h=1080&fit=crop)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          filter: 'grayscale(1)',
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: showHud ? 0.12 : 0 }}
        transition={{ duration: 1.2 }}
      />

      {/* Scan line effect on entry */}
      <AnimatePresence>
        {!scanDone && (
          <motion.div
            className="absolute w-full h-[2px] left-0"
            style={{ backgroundColor: 'var(--accent)', opacity: 0.6 }}
            initial={{ top: 0 }}
            animate={{ top: '100vh' }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1, ease: 'linear' }}
          />
        )}
      </AnimatePresence>

      {/* Title content */}
      <div className="relative z-10 h-full flex flex-col justify-center px-6 md:px-16">
        <div>
          <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 'clamp(40px, 7vw, 90px)', lineHeight: 1 }}>
            <div style={{ color: 'var(--text)' }}>
              <TextScramble text="GUARDING YOUR" delay={1000} />
            </div>
            <div style={{ color: 'var(--accent)' }}>
              <TextScramble text="PHANTOM NODE" delay={1300} />
            </div>
            <div style={{ color: 'var(--text)' }}>
              <TextScramble text="DAWNS" delay={1600} />
            </div>
          </div>
        </div>

        {/* HUD elements */}
        <AnimatePresence>
          {showHud && (
            <>
              {/* Badge — bottom left area */}
              <motion.div
                className="absolute bottom-12 left-6 md:left-16"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8 }}
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: '11px',
                  color: 'var(--muted)',
                }}
              >
                SOUND OFF / ON
              </motion.div>

              {/* Badge — bottom right */}
              <motion.div
                className="absolute bottom-20 right-6 md:right-16"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.1 }}
              >
                <span
                  className="px-3 py-1"
                  style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: '11px',
                    color: 'var(--muted)',
                    border: '1px solid rgba(255,255,255,0.2)',
                  }}
                >
                  412TH BRIGADE NEMESIS
                </span>
              </motion.div>

              {/* Scroll indicator — bottom right */}
              <motion.div
                className="absolute bottom-12 right-6 md:right-16 flex items-center gap-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: '11px',
                  color: 'var(--muted)',
                }}
              >
                SCROLL{' '}
                <motion.span
                  animate={{ y: [0, 6, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
                  style={{ display: 'inline-block' }}
                >
                  ↓
                </motion.span>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}
