import { useRef, useEffect, useCallback } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import SectionFrame from './ui/SectionFrame'

const PARTICLE_COLORS = ['#FF4500', '#FF6600', '#FFD700', '#E21B1B']
const PARTICLE_COUNT = 50

function createParticle(canvasW, canvasH) {
  const centerX = canvasW / 2
  const centerY = canvasH * 0.35
  return {
    x: centerX + (Math.random() - 0.5) * 200,
    y: centerY + (Math.random() - 0.5) * 60,
    vx: (Math.random() - 0.5) * 0.8,
    vy: -(Math.random() * 1.5 + 0.5),
    size: Math.random() * 4 + 1,
    opacity: Math.random() * 0.6 + 0.4,
    color: PARTICLE_COLORS[Math.floor(Math.random() * PARTICLE_COLORS.length)],
    life: 1,
    decay: Math.random() * 0.008 + 0.004,
  }
}

function FireCanvas() {
  const canvasRef = useRef(null)
  const particlesRef = useRef([])
  const animRef = useRef(null)
  const isVisibleRef = useRef(false)

  const animate = useCallback(() => {
    if (!isVisibleRef.current) {
      animRef.current = null
      return
    }

    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    const w = canvas.width
    const h = canvas.height

    ctx.clearRect(0, 0, w, h)

    // 1. Initialize particles if needed
    if (particlesRef.current.length === 0) {
      for (let i = 0; i < PARTICLE_COUNT; i++) {
        particlesRef.current.push(createParticle(w, h))
      }
    }

    // 2. Update and draw each particle
    for (let i = 0; i < particlesRef.current.length; i++) {
      const p = particlesRef.current[i]
      p.x += p.vx
      p.y += p.vy
      p.life -= p.decay
      p.size *= 0.995

      if (p.life <= 0 || p.size < 0.3) {
        particlesRef.current[i] = createParticle(w, h)
        continue
      }

      ctx.beginPath()
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
      ctx.fillStyle = p.color
      ctx.globalAlpha = p.life * p.opacity
      ctx.fill()
    }

    ctx.globalAlpha = 1
    animRef.current = requestAnimationFrame(animate)
  }, [])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    function resize() {
      const parent = canvas.parentElement
      canvas.width = parent.offsetWidth
      canvas.height = parent.offsetHeight
      particlesRef.current = []
    }

    resize()
    window.addEventListener('resize', resize)

    // Only animate when visible
    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisibleRef.current = entry.isIntersecting
        if (entry.isIntersecting && !animRef.current) {
          animRef.current = requestAnimationFrame(animate)
        }
      },
      { threshold: 0 }
    )
    observer.observe(canvas.parentElement)

    return () => {
      window.removeEventListener('resize', resize)
      observer.disconnect()
      if (animRef.current) cancelAnimationFrame(animRef.current)
    }
  }, [animate])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ zIndex: 2 }}
    />
  )
}

function Crosshair() {
  return (
    <svg
      width="150"
      height="150"
      viewBox="0 0 150 150"
      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
      style={{ zIndex: 3 }}
    >
      <line x1="75" y1="0" x2="75" y2="150" stroke="rgba(255,255,255,0.3)" strokeWidth="0.5" />
      <line x1="0" y1="75" x2="150" y2="75" stroke="rgba(255,255,255,0.3)" strokeWidth="0.5" />
      <circle cx="75" cy="75" r="30" fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="0.5" />
    </svg>
  )
}

export default function DroneScene() {
  const sectionRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  })
  const droneY = useTransform(scrollYProgress, [0, 1], [0, 50])

  return (
    <SectionFrame label="shaheds">
      <section
        ref={sectionRef}
        className="h-screen relative overflow-hidden"
        style={{ backgroundColor: 'var(--bg)' }}
      >
        <FireCanvas />
        <Crosshair />

        {/* Drone image */}
        <motion.div
          className="relative z-[1] max-w-2xl mx-auto mt-20 px-6"
          style={{ y: droneY }}
        >
          <div
            className="w-full aspect-[4/3]"
            style={{
              backgroundImage: 'url(https://images.unsplash.com/photo-1508614589041-895b88991e3e?w=800&h=600&fit=crop)',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              filter: 'grayscale(0.6) brightness(0.8)',
            }}
          />
        </motion.div>

        {/* Info bar */}
        <div className="relative z-[4] flex flex-col md:flex-row justify-between max-w-2xl mx-auto mt-8 px-6 gap-2">
          <span
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: '14px',
              color: 'var(--text)',
            }}
          >
            SHAHED-136 / GERANIUM-2
          </span>
          <span
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: '11px',
              color: 'var(--muted)',
            }}
          >
            Range: 1,000 km &bull; Warhead: 90 kg &bull; Speed: 220 km/h
          </span>
        </div>

        {/* Counter */}
        <div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-[4]"
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: '14px',
            color: 'var(--muted)',
          }}
        >
          01 / 02
        </div>
      </section>
    </SectionFrame>
  )
}
