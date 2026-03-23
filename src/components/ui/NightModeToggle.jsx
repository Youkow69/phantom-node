import { motion } from 'framer-motion'
import { useTheme } from '../../context/ThemeContext'

export default function NightModeToggle() {
  const { isNight, toggleNight } = useTheme()

  return (
    <button
      onClick={toggleNight}
      className="flex items-center gap-2 cursor-pointer bg-transparent border-none outline-none"
      style={{
        fontFamily: "'JetBrains Mono', monospace",
        fontSize: '11px',
        color: 'var(--text)',
      }}
    >
      NIGHT MODE
      <motion.div
        style={{
          width: '6px',
          height: '6px',
          borderRadius: '50%',
          backgroundColor: isNight ? 'var(--accent)' : 'var(--muted)',
        }}
        animate={
          isNight
            ? { scale: [1, 1.3, 1] }
            : { scale: 1 }
        }
        transition={
          isNight
            ? { duration: 1.5, repeat: Infinity, ease: 'easeInOut' }
            : {}
        }
      />
    </button>
  )
}
