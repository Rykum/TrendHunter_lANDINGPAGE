'use client'

import { useEffect, useRef, type CSSProperties } from 'react'

const fragments = [
  { word: 'MEME', x: -28, y: -30, angle: -16 },
  { word: 'DESEJO', x: 29, y: -23, angle: 12 },
  { word: 'REMIX', x: -23, y: 28, angle: 9 },
  { word: 'GESTO', x: 26, y: 32, angle: -13 },
  { word: 'FUTURO', x: 0, y: -3, angle: -6 },
]

export function calculateNoiseProgress(sectionTop: number, viewportHeight: number, headerHeight: number) {
  const scrollDistance = Math.max(1, viewportHeight - headerHeight)
  const visibilityProgress = (viewportHeight - sectionTop) / scrollDistance
  if (visibilityProgress <= 0.08) return 0
  if (visibilityProgress >= 1) return 1
  return Math.min(1, Math.max(0, (visibilityProgress - 0.08) / 0.92))
}

export default function Noise() {
  const section = useRef<HTMLElement>(null)
  const artwork = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)')
    let frame = 0

    function updateComposition() {
      frame = 0
      if (!section.current || !artwork.current || reducedMotion.matches) return

      const bounds = section.current.getBoundingClientRect()
      const headerHeight = document.getElementById('nav')?.getBoundingClientRect().height ?? 0
      const progress = calculateNoiseProgress(bounds.top, window.innerHeight, headerHeight)
      artwork.current.style.setProperty('--coherence', String(progress))
    }

    function scheduleUpdate() {
      if (frame) return
      frame = window.requestAnimationFrame(updateComposition)
    }

    function handleMotionPreference() {
      if (reducedMotion.matches) {
        artwork.current?.style.setProperty('--coherence', '1')
      } else {
        scheduleUpdate()
      }
    }

    window.addEventListener('scroll', scheduleUpdate, { passive: true })
    window.addEventListener('resize', scheduleUpdate)
    reducedMotion.addEventListener('change', handleMotionPreference)
    handleMotionPreference()

    return () => {
      window.removeEventListener('scroll', scheduleUpdate)
      window.removeEventListener('resize', scheduleUpdate)
      reducedMotion.removeEventListener('change', handleMotionPreference)
      if (frame) window.cancelAnimationFrame(frame)
    }
  }, [])

  return (
    <section className="noise section-shell" id="noise" aria-labelledby="noise-title" ref={section}>
      <div className="noise-inner">
        <div className="noise-heading sr-only"><h2 id="noise-title">Toda cultura começa com ruído.</h2><p>A colagem se transforma e revela um sinal enquanto você avança pela página.</p></div>
        <div className="artwork" ref={artwork}>
        <div className="artwork-canvas" role="img" aria-label="Colagem de fragmentos e fotografias que se organizam para revelar a palavra Sinal">
          <div className="optical-field" />
          <div className="artwork-ring artwork-ring--one" /><div className="artwork-ring artwork-ring--two" />
          <div className="artwork-photo"><img src="/assets/culture-hands.jpg" alt="" loading="lazy" /></div>
          <div className="artwork-stripe" />
          {fragments.map((fragment, index) => (
            <span key={fragment.word} className={'artwork-fragment artwork-fragment--' + index} style={{
              '--x': fragment.x + '%', '--y': fragment.y + '%', '--angle': fragment.angle + 'deg', '--order': index,
            } as CSSProperties}>{fragment.word}</span>
          ))}
          <span className="artwork-signal">SINAL</span>
          <span className="artwork-cross artwork-cross--a">+</span><span className="artwork-cross artwork-cross--b">+</span>
        </div>
        <p className="artwork-caption">Ruído, repetição, reconhecimento.</p>
      </div>
      </div>
    </section>
  )
}
