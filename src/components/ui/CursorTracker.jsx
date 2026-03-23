import { useState, useEffect } from 'react'

export default function CursorTracker() {
  const [pos, setPos] = useState({ x: 0, y: 0 })

  useEffect(() => {
    function handleMove(e) {
      setPos({ x: e.clientX, y: e.clientY })
    }
    window.addEventListener('mousemove', handleMove)
    return () => window.removeEventListener('mousemove', handleMove)
  }, [])

  return (
    <div
      className="fixed top-[80px] left-[24px] z-50 hidden md:block"
      style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '11px', color: 'var(--muted)' }}
    >
      <div>X: {String(pos.x).padStart(4, '0')}</div>
      <div>Y: {String(pos.y).padStart(4, '0')}</div>
    </div>
  )
}
