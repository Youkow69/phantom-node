import { motion } from 'framer-motion'
import SectionFrame from './ui/SectionFrame'

export default function TargetSection() {
  return (
    <SectionFrame label="target">
      <section
        id="target"
        className="h-screen flex items-center justify-center"
        style={{ backgroundColor: 'var(--bg)' }}
      >
        <motion.h2
          style={{
            fontFamily: "'Bebas Neue', sans-serif",
            fontSize: 'clamp(80px, 15vw, 200px)',
            color: 'var(--text)',
            margin: 0,
            lineHeight: 1,
          }}
          initial={{ clipPath: 'inset(0 50% 0 50%)' }}
          whileInView={{ clipPath: 'inset(0 0% 0 0%)' }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        >
          OUR TARGET
        </motion.h2>
      </section>
    </SectionFrame>
  )
}
