import { createContext, useContext, useState, useCallback } from 'react'

const ThemeContext = createContext()

export function ThemeProvider({ children }) {
  const [isNight, setIsNight] = useState(false)

  const toggleNight = useCallback(() => {
    setIsNight((prev) => {
      const next = !prev
      if (next) {
        document.body.classList.add('night-mode')
      } else {
        document.body.classList.remove('night-mode')
      }
      return next
    })
  }, [])

  return (
    <ThemeContext.Provider value={{ isNight, toggleNight }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }
  return context
}
