import { useState, useEffect } from 'react'

const jbMono11 = {
  fontFamily: "'JetBrains Mono', monospace",
  fontSize: '11px',
}

const inter13 = {
  fontFamily: "'Inter', sans-serif",
  fontSize: '13px',
}

function HoverLink({ href, children, style = {} }) {
  return (
    <a
      href={href}
      className="no-underline transition-colors duration-300"
      style={{ color: 'var(--text)', ...style }}
      onMouseEnter={(e) => { e.currentTarget.style.color = 'var(--accent)' }}
      onMouseLeave={(e) => { e.currentTarget.style.color = 'var(--text)' }}
    >
      {children}
    </a>
  )
}

function Clock() {
  const [time, setTime] = useState('')

  useEffect(() => {
    function update() {
      const now = new Date()
      const gmt3 = new Date(now.getTime() + (3 * 60 - now.getTimezoneOffset()) * 60000)
      setTime(gmt3.toLocaleTimeString() + ' (GMT+3)')
    }
    update()
    const id = setInterval(update, 1000)
    return () => clearInterval(id)
  }, [])

  return <span>{time}</span>
}

export default function Footer() {
  return (
    <footer className="relative overflow-hidden" style={{ backgroundColor: '#0A0505' }}>
      <div className="relative z-10 py-16 px-6 md:px-16">
        {/* Grid */}
        <div className="grid md:grid-cols-3 gap-12">
          {/* Col 1 — Contact */}
          <div>
            <p style={{ ...inter13, color: 'var(--muted)', margin: 0 }}>For media inquiries</p>
            <HoverLink href="mailto:media@phantomnode.army" style={inter13}>
              media@phantomnode.army
            </HoverLink>

            <p className="mt-6" style={{ ...inter13, color: 'var(--muted)', margin: 0, marginTop: '24px' }}>For partnership</p>
            <HoverLink href="mailto:phantomnode@gmail.com" style={inter13}>
              phantomnode@gmail.com
            </HoverLink>

            <div className="mt-6 flex gap-4" style={{ marginTop: '24px' }}>
              <HoverLink href="#" style={jbMono11}>INSTAGRAM</HoverLink>
              <HoverLink href="#" style={jbMono11}>TELEGRAM</HoverLink>
            </div>
          </div>

          {/* Col 2 — Brand */}
          <div className="text-center">
            <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: '20px', color: 'var(--text)' }}>
              PHANTOM NODE
            </div>
            <div className="mt-2" style={{ ...jbMono11, color: 'var(--muted)' }}>
              412TH BRIGADE NEMESIS
            </div>
          </div>

          {/* Col 3 — Nav */}
          <div className="flex flex-col gap-2 md:items-end">
            {['ABOUT', 'MISSION', 'TARGET', 'STORE'].map((link) => (
              <HoverLink key={link} href={`#${link.toLowerCase()}`} style={jbMono11}>
                {link}
              </HoverLink>
            ))}
          </div>
        </div>

        {/* Separator */}
        <div className="h-[1px] my-8" style={{ backgroundColor: 'rgba(255,255,255,0.1)' }} />

        {/* Bottom bar */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <span style={{ ...jbMono11, color: 'var(--muted)' }}>
            &copy;2025 PHANTOM NODE. ALL RIGHTS RESERVED.
          </span>

          <span style={{ ...jbMono11, color: 'var(--muted)' }}>
            <Clock />
          </span>

          <a
            href="https://katrava.com"
            target="_blank"
            rel="noopener noreferrer"
            className="no-underline transition-colors duration-300"
            style={{ ...jbMono11, color: 'var(--muted)' }}
            onMouseEnter={(e) => { e.currentTarget.style.color = 'var(--accent)' }}
            onMouseLeave={(e) => { e.currentTarget.style.color = 'var(--muted)' }}
          >
            Designed by Katrava
          </a>
        </div>
      </div>

      {/* Watermark */}
      <div
        className="absolute bottom-0 w-full text-center pointer-events-none"
        style={{
          fontFamily: "'Bebas Neue', sans-serif",
          fontSize: '15vw',
          color: '#150808',
          lineHeight: 0.85,
          overflow: 'hidden',
        }}
      >
        PHANTOM NODE
      </div>
    </footer>
  )
}
