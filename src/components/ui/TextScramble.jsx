import { useState, useEffect, useRef, useCallback } from 'react'
import { useInView } from 'framer-motion'

const CHARS = '@#$%&*!?+=<>{}[]~'

function randomChar() {
  return CHARS[Math.floor(Math.random() * CHARS.length)]
}

export default function TextScramble({ text, className = '', delay = 0 }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.3 })
  const [displayed, setDisplayed] = useState('')
  const [decodedCount, setDecodedCount] = useState(0)
  const hasTriggered = useRef(false)

  const startScramble = useCallback(() => {
    const length = text.length
    const totalDuration = 1500
    const interval = 30
    const totalTicks = totalDuration / interval
    const decodeEvery = Math.max(1, Math.floor(totalTicks / length))

    let tick = 0
    let decoded = 0

    const timeoutId = setTimeout(() => {
      const intervalId = setInterval(() => {
        tick++

        if (tick % decodeEvery === 0 && decoded < length) {
          decoded++
          setDecodedCount(decoded)
        }

        const result = text.split('').map((char, i) => {
          if (char === ' ') return ' '
          if (i < decoded) return char
          return randomChar()
        }).join('')

        setDisplayed(result)

        if (decoded >= length) {
          setDisplayed(text)
          clearInterval(intervalId)
        }
      }, interval)
    }, delay)

    return () => clearTimeout(timeoutId)
  }, [text, delay])

  // Primary trigger: IntersectionObserver via useInView
  useEffect(() => {
    if (!isInView || hasTriggered.current) return
    hasTriggered.current = true
    startScramble()
  }, [isInView, startScramble])

  // Fallback: if useInView never fires (headless browsers), trigger after delay + 500ms
  useEffect(() => {
    const fallback = setTimeout(() => {
      if (!hasTriggered.current) {
        hasTriggered.current = true
        startScramble()
      }
    }, delay + 500)
    return () => clearTimeout(fallback)
  }, [delay, startScramble])

  return (
    <span ref={ref} className={className}>
      {displayed.split('').map((char, i) => (
        <span
          key={i}
          style={{
            color: i < decodedCount || char === ' ' ? 'inherit' : 'var(--muted)',
          }}
        >
          {char}
        </span>
      ))}
    </span>
  )
}
