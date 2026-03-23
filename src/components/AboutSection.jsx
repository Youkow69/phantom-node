import { motion } from 'framer-motion'
import SectionFrame from './ui/SectionFrame'
import TextScramble from './ui/TextScramble'
import GlowPulse from './ui/GlowPulse'

export default function AboutSection() {
  return (
    <SectionFrame label="about">
      <section
        id="about"
        className="min-h-screen flex items-center justify-center text-center px-6 md:px-16"
        style={{ background: 'linear-gradient(to bottom, var(--bg), #0A0F15)' }}
      >
        <div className="max-w-4xl">
          {/* Label */}
          <div
            className="mb-8"
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: '11px',
              color: 'var(--muted)',
            }}
          >
            <TextScramble text="WHO WE ARE?" />
          </div>

          {/* Title */}
          <h2
            style={{
              fontFamily: "'Bebas Neue', sans-serif",
              fontSize: 'clamp(36px, 5vw, 72px)',
              color: 'var(--text)',
              lineHeight: 1.1,
              margin: 0,
            }}
          >
            <TextScramble text="WE DESTROY " delay={200} />
            <span className="relative inline-block" style={{ color: 'var(--accent)' }}>
              <TextScramble text="SHAHEDS" delay={400} />
              <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                <GlowPulse color="var(--accent)" size="300px" />
              </span>
            </span>
            <TextScramble text=", PROTECTING UKRAINE'S CITIES" delay={600} />
          </h2>

          {/* Paragraph */}
          <motion.p
            className="mt-8 max-w-2xl mx-auto"
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: '16px',
              color: 'var(--muted)',
              lineHeight: 1.7,
            }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            Over 2,300 Shaheds destroyed. Our crews are the most effective at
            eliminating Russian kamikaze drones using interceptor UAVs.
          </motion.p>
        </div>
      </section>
    </SectionFrame>
  )
}
