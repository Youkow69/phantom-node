import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import TextScramble from './ui/TextScramble'

const faqData = [
  { num: '01', q: 'What is Phantom Node?', a: 'We are a technological unit within the 412th Nemesis brigade. We destroy Shahed-type strike UAVs using interceptor drones. We build anti-drone architecture, passing experience to other defense units.' },
  { num: '02', q: 'Who is the unit commander?', a: 'Founded and commanded by Senior Lieutenant Alex Yarmak.' },
  { num: '03', q: 'Can I transfer from another unit?', a: 'Yes. Fill out the military service questionnaire — our recruiters will provide information about available positions.' },
  { num: '04', q: 'Can I join if classified as limited fitness?', a: 'Yes. You can join support units — logistics, engineering, communications, etc.' },
  { num: '05', q: 'How to support the unit?', a: 'Buy merch or make a charitable donation. 100% of proceeds go to combat capabilities and crew support.' },
  { num: '06', q: 'How to contact for partnership?', a: 'If you represent a business, NGO or government and have partnership proposals, write to: phantomnode@gmail.com' },
]

function FAQItem({ item, isOpen, onToggle }) {
  return (
    <div style={{ borderBottom: '1px solid rgba(255,255,255,0.1)' }} className="py-5">
      <div
        className="flex justify-between items-center cursor-pointer"
        onClick={onToggle}
      >
        <div className="flex items-center">
          <span
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: '14px',
              color: 'var(--accent)',
            }}
          >
            [{item.num}]
          </span>
          <span
            className="ml-4"
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: '16px',
              fontWeight: 500,
              color: 'var(--text)',
            }}
          >
            {item.q}
          </span>
        </div>

        <span
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: '20px',
            color: 'var(--muted)',
            display: 'inline-block',
            transition: 'transform 0.3s ease',
            transform: isOpen ? 'rotate(45deg)' : 'rotate(0deg)',
          }}
        >
          +
        </span>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            style={{ overflow: 'hidden' }}
          >
            <p
              className="py-4 pl-12"
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: '15px',
                color: 'var(--muted)',
                lineHeight: 1.7,
                margin: 0,
              }}
            >
              {item.a}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState(-1)

  return (
    <section className="py-32 px-6 md:px-16">
      <div className="max-w-4xl mx-auto">
        <div
          className="mb-4"
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: '11px',
            color: 'var(--muted)',
          }}
        >
          <TextScramble text="POPULAR QUESTIONS" />
        </div>

        <h2
          className="mb-12"
          style={{
            fontFamily: "'Bebas Neue', sans-serif",
            fontSize: 'clamp(36px, 4vw, 48px)',
            color: 'var(--text)',
            margin: 0,
            marginBottom: '48px',
          }}
        >
          FAQ
        </h2>

        {faqData.map((item, i) => (
          <FAQItem
            key={item.num}
            item={item}
            isOpen={openIndex === i}
            onToggle={() => setOpenIndex(openIndex === i ? -1 : i)}
          />
        ))}
      </div>
    </section>
  )
}
