import React, { useRef, useState, useEffect } from 'react'
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import TextScramble from './ui/TextScramble'

const SLIDES = [
  {
    num: '01',
    title: 'MISSION',
    text: 'Build an effective air defense system capable of providing maximum protection for our families, cities and critical infrastructure.',
    image: 'https://images.unsplash.com/photo-1534643960519-11ad79bc19df?w=800&h=800&fit=crop',
  },
  {
    num: '02',
    title: 'VISION',
    text: 'Create a unit and working model that becomes the benchmark for fighting air targets in the world\'s armies.',
    image: 'https://images.unsplash.com/photo-1580153215516-5a3b39b5ec48?w=800&h=800&fit=crop',
  },
  {
    num: '03',
    title: 'GOAL',
    text: 'Ensure systematic effective destruction of enemy UAVs, passing this experience to other defense units.',
    image: 'https://images.unsplash.com/photo-1579912437766-7896df6d3cd3?w=800&h=800&fit=crop',
  },
]

function ScopeReticle() {
  return (
    <svg
      className="absolute inset-0 w-full h-full"
      viewBox="0 0 100 100"
      style={{ animation: 'rotate 20s linear infinite', willChange: 'transform' }}
    >
      {/* Crosshair lines */}
      <line x1="50" y1="0" x2="50" y2="100" stroke="rgba(255,255,255,0.5)" strokeWidth="0.5" />
      <line x1="0" y1="50" x2="100" y2="50" stroke="rgba(255,255,255,0.5)" strokeWidth="0.5" />
      {/* Concentric circles */}
      <circle cx="50" cy="50" r="25" fill="none" stroke="rgba(255,255,255,0.5)" strokeWidth="0.5" />
      <circle cx="50" cy="50" r="40" fill="none" stroke="rgba(255,255,255,0.5)" strokeWidth="0.5" />
    </svg>
  )
}

function ScopeCircle({ slide }) {
  return (
    <div className="relative w-[350px] h-[350px] md:w-[450px] md:h-[450px] rounded-full overflow-hidden border-2 border-white/30 mx-auto">
      <AnimatePresence mode="wait">
        <motion.div
          key={slide.num}
          className="absolute inset-0"
          style={{
            backgroundImage: `url(${slide.image})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6 }}
        />
      </AnimatePresence>
      <ScopeReticle />
    </div>
  )
}

export default function MissionCarousel() {
  const containerRef = useRef(null)
  const { scrollYProgress } = useScroll({ target: containerRef })

  const slideIndexMotion = useTransform(scrollYProgress, [0, 0.33, 0.34, 0.66, 0.67, 1], [0, 0, 1, 1, 2, 2])

  return (
    <>
      <style>{`
        @keyframes rotate {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
      <div
        ref={containerRef}
        id="mission"
        style={{
          height: '300vh',
          backgroundColor: 'var(--accent)',
          transition: 'background-color 0.8s ease',
        }}
      >
        <div className="sticky top-0 h-screen overflow-hidden">
          <MissionContent slideIndexMotion={slideIndexMotion} />
        </div>
      </div>
    </>
  )
}

function MissionContent({ slideIndexMotion }) {
  const currentIndex = useCurrentSlide(slideIndexMotion)
  const slide = SLIDES[currentIndex]

  return (
    <div className="h-full flex flex-col">
      {/* Main content */}
      <div className="flex-1 flex flex-col md:flex-row items-center justify-center px-6 md:px-16 gap-8 md:gap-16">
        {/* Left — Scope */}
        <div className="w-full md:w-1/2 flex items-center justify-center">
          <ScopeCircle slide={slide} />
        </div>

        {/* Right — Info panel */}
        <div className="w-full md:w-1/2 flex flex-col gap-6">
          {/* Tabs */}
          <div className="flex gap-3">
            {SLIDES.map((s, i) => (
              <span
                key={s.num}
                className="px-3 py-1 transition-all duration-300"
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: '14px',
                  backgroundColor: i === currentIndex ? 'var(--text)' : 'transparent',
                  color: i === currentIndex ? 'var(--bg)' : 'rgba(255,255,255,0.5)',
                }}
              >
                {s.num}
              </span>
            ))}
          </div>

          {/* Title */}
          <div
            style={{
              fontFamily: "'Bebas Neue', sans-serif",
              fontSize: 'clamp(28px, 4vw, 48px)',
              color: 'var(--text)',
              lineHeight: 1,
            }}
          >
            <TextScramble key={`title-${currentIndex}`} text={slide.title} />
          </div>

          {/* Text */}
          <AnimatePresence mode="wait">
            <motion.p
              key={`text-${currentIndex}`}
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: '16px',
                color: 'rgba(255,255,255,0.8)',
                lineHeight: 1.7,
                margin: 0,
              }}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.4 }}
            >
              {slide.text}
            </motion.p>
          </AnimatePresence>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="flex items-center justify-between px-6 md:px-16 pb-8">
        <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 'clamp(18px, 2vw, 24px)', color: '#FFFFFF' }}>
          <TextScramble key={`purpose-${currentIndex}`} text="OUR PURPOSE" />
        </div>
        <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '14px', color: '#FFFFFF' }}>
          {String(currentIndex + 1).padStart(2, '0')} / {String(SLIDES.length).padStart(2, '0')}
        </div>
      </div>
    </div>
  )
}

/** Converts a framer-motion MotionValue into a React state integer. */
function useCurrentSlide(motionValue) {
  const [index, setIndex] = useState(0)
  useEffect(() => {
    const unsub = motionValue.on('change', (v) => {
      const clamped = Math.min(2, Math.max(0, Math.round(v)))
      setIndex((prev) => (prev !== clamped ? clamped : prev))
    })
    return unsub
  }, [motionValue])
  return index
}

