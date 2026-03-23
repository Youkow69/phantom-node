import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

function CTAButton({ children, accent, delay }) {
  const borderColor = accent ? 'var(--accent)' : 'white'
  const textColor = accent ? 'var(--accent)' : 'white'

  return (
    <motion.a
      href="#"
      className="no-underline px-8 py-4 transition-all duration-300 inline-block"
      style={{
        fontFamily: "'JetBrains Mono', monospace",
        fontSize: '13px',
        color: textColor,
        border: `1px solid ${borderColor}`,
        mixBlendMode: 'difference',
      }}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay }}
      onMouseEnter={(e) => {
        e.currentTarget.style.backgroundColor = accent ? 'var(--accent)' : 'white'
        e.currentTarget.style.color = 'var(--bg)'
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.backgroundColor = 'transparent'
        e.currentTarget.style.color = textColor
      }}
    >
      {children}
    </motion.a>
  )
}

export default function CTASection() {
  const sectionRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  })

  const redWidth = useTransform(scrollYProgress, [0, 0.5], ['0%', '50%'])

  return (
    <section ref={sectionRef} className="h-screen relative overflow-hidden">
      {/* Left red wipe */}
      <motion.div
        className="absolute top-0 left-0 h-full"
        style={{
          width: redWidth,
          backgroundColor: 'var(--accent)',
        }}
      />

      {/* Right black */}
      <div
        className="absolute top-0 right-0 w-1/2 h-full"
        style={{ backgroundColor: 'var(--bg)' }}
      />

      {/* Content overlay */}
      <div
        className="relative z-10 h-full flex flex-col items-center justify-center px-6"
        style={{ mixBlendMode: 'difference', color: 'white' }}
      >
        <div className="text-center" style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 'clamp(48px, 6vw, 96px)', lineHeight: 1 }}>
          <div>BECOME THE ONE</div>
          <div>WHO PROTECTS</div>
          <div>THE SKY</div>
        </div>

        <div className="flex gap-4 justify-center mt-12 flex-wrap">
          <CTAButton delay={0.2}>I'M A CIVILIAN</CTAButton>
          <CTAButton accent delay={0.4}>I'M MILITARY</CTAButton>
        </div>
      </div>
    </section>
  )
}
