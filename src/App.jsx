import { useEffect } from 'react'
import Lenis from '@studio-freight/lenis'
import { ThemeProvider } from './context/ThemeContext'
import CursorTracker from './components/ui/CursorTracker'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import AboutSection from './components/AboutSection'
import MissionCarousel from './components/MissionCarousel'
import TargetSection from './components/TargetSection'
import DroneScene from './components/DroneScene'
import CTASection from './components/CTASection'
import MerchSection from './components/MerchSection'
import FAQSection from './components/FAQSection'
import Footer from './components/Footer'

function App() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smooth: true,
    })

    function raf(time) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }
    requestAnimationFrame(raf)

    return () => lenis.destroy()
  }, [])

  return (
    <ThemeProvider>
      {/* Border overlay */}
      <div
        className="fixed inset-0 z-[100] pointer-events-none"
        style={{ border: '1px solid rgba(226,27,27,0.12)' }}
      />

      {/* Grain overlay */}
      <div
        className="fixed inset-0 z-[99] pointer-events-none"
        style={{
          opacity: 0.04,
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Scan line */}
      <div
        className="fixed w-full h-[1px] z-[98] pointer-events-none"
        style={{
          backgroundColor: 'rgba(226,27,27,0.08)',
          animation: 'scanline 8s linear infinite',
        }}
      />

      <CursorTracker />
      <header>
        <Navbar />
      </header>

      <main>
        <Hero />
        <AboutSection />
        <MissionCarousel />
        <TargetSection />
        <DroneScene />
        <CTASection />
        <MerchSection />
        <FAQSection />
      </main>
      <Footer />
    </ThemeProvider>
  )
}

export default App
