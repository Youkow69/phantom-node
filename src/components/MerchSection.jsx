import { motion } from 'framer-motion'
import SectionFrame from './ui/SectionFrame'
import TextScramble from './ui/TextScramble'

export default function MerchSection() {
  return (
    <SectionFrame label="merch">
      <section id="store" className="py-32 px-6 md:px-16">
        <div className="flex flex-col md:flex-row gap-12 items-center max-w-6xl mx-auto">
          {/* Image */}
          <motion.div
            className="w-full md:w-1/2"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div
              className="w-full aspect-[4/3]"
              style={{
                backgroundImage: 'url(https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&h=600&fit=crop)',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
            />
          </motion.div>

          {/* Text */}
          <div className="w-full md:w-1/2">
            <div
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: '11px',
                color: 'var(--muted)',
              }}
            >
              <TextScramble text="SUPPORT THOSE WHO GUARD THE DAWNS" />
            </div>

            <h2
              className="mt-4"
              style={{
                fontFamily: "'Bebas Neue', sans-serif",
                fontSize: 'clamp(36px, 4vw, 48px)',
                color: 'var(--accent)',
                margin: 0,
                marginTop: '16px',
              }}
            >
              OUR MERCH
            </h2>

            <p
              className="mt-4"
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: '16px',
                color: 'var(--muted)',
                lineHeight: 1.7,
              }}
            >
              By buying a t-shirt or hoodie, you help strengthen our crews'
              capabilities and become part of building the anti-drone architecture.
            </p>

            <a
              href="#"
              className="inline-block no-underline px-8 py-4 mt-8 transition-all duration-300"
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: '13px',
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
              SHOP NOW
            </a>
          </div>
        </div>
      </section>
    </SectionFrame>
  )
}
