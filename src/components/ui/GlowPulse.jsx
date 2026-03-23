import { motion } from 'framer-motion'

export default function GlowPulse({ color = 'var(--accent)', size = '200px' }) {
  return (
    <motion.div
      style={{
        position: 'absolute',
        zIndex: -1,
        borderRadius: '50%',
        width: size,
        height: size,
        background: `radial-gradient(circle, ${color} 0%, transparent 70%)`,
      }}
      animate={{
        scale: [1, 1.2, 1],
        opacity: [0.4, 0.25, 0.4],
      }}
      transition={{
        duration: 3,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
    />
  )
}
