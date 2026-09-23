'use client'

import { useEffect, useRef, useState } from 'react'
const links = [
  { href: '#noise', label: 'A experiência', section: 'noise' },
  { href: '#intelligence', label: 'Nosso olhar', section: 'intelligence' },
  { href: '#products', label: 'Plataforma', section: 'products' },
  { href: '#observatory', label: 'Observatório', section: 'observatory' },
]

export default function Navigation() {
  const dialog = useRef<HTMLDialogElement>(null)
  const returnScrollPosition = useRef(0)
  const [open, setOpen] = useState(false)
  const [currentSection, setCurrentSection] = useState<string | null>(null)

  useEffect(() => {
    const sections = links
      .map(({ section }) => document.getElementById(section))
      .filter((section): section is HTMLElement => section instanceof HTMLElement)

    function syncCurrentSection() {
      const marker = window.innerHeight * 0.45
      const current = sections.filter(section => section.getBoundingClientRect().top <= marker).at(-1)
      setCurrentSection(current?.id ?? null)
    }

    syncCurrentSection()

    const observer = new IntersectionObserver(entries => {
      const entering = entries
        .filter(entry => entry.isIntersecting)
        .map(entry => entry.target as HTMLElement)
        .sort((first, second) => first.getBoundingClientRect().top - second.getBoundingClientRect().top)

      if (entering.length) setCurrentSection(entering.at(-1)?.id ?? null)
    }, { rootMargin: '-45% 0px -54% 0px' })

    sections.forEach(section => observer.observe(section))
    return () => observer.disconnect()
  }, [])

  function openMenu() {
    const control: { locked: boolean; scrollY?: number; handled?: boolean } = { locked: true, scrollY: window.scrollY }
    window.dispatchEvent(new CustomEvent('trendhunter:menu-scroll', { detail: control }))
    returnScrollPosition.current = control.scrollY ?? window.scrollY
    dialog.current?.showModal()
    setOpen(true)
  }

  function close(restorePosition = true) {
    dialog.current?.close()
    setOpen(false)
    const control: { locked: boolean; restorePosition: boolean; scrollY?: number; handled?: boolean } = {
      locked: false,
      restorePosition,
      scrollY: returnScrollPosition.current,
    }
    window.dispatchEvent(new CustomEvent('trendhunter:menu-scroll', { detail: control }))
    if (restorePosition && !control.handled && typeof control.scrollY === 'number') {
      requestAnimationFrame(() => window.scrollTo({ top: control.scrollY, left: 0, behavior: 'auto' }))
    }
  }
  return (
    <>
      <header className="nav" id="nav"><a className="nav-brand" href="#top" aria-label="TrendHunter, início">TRENDHUNTER<span className="brand-mark" aria-hidden="true">↗</span></a><nav className="nav-links" aria-label="Principal">{links.map(({ href, label, section }) => <a href={href} key={href} aria-current={currentSection === section ? 'location' : undefined}>{label}</a>)}</nav><button className="nav-menu" type="button" aria-expanded={open} aria-controls="menuOverlay" onClick={openMenu}>Menu <span aria-hidden="true">+</span></button><a className="nav-contact" href="#final">Vamos conversar <span aria-hidden="true">↗</span></a></header>
      <dialog ref={dialog} className="menu-overlay" id="menuOverlay" aria-label="Menu do site" onClose={() => setOpen(false)} onCancel={event => { event.preventDefault(); close() }} onClick={event => { if (event.target === event.currentTarget) close() }}><div className="menu-top"><span className="micro">TRENDHUNTER</span><button type="button" onClick={() => close()} autoFocus>Fechar <span aria-hidden="true">×</span></button></div><nav aria-label="Menu">{links.map(({ href, label, section }, index) => <a href={href} key={href} onClick={() => close(false)} aria-current={currentSection === section ? 'location' : undefined}><span>0{index + 1}</span>{label}</a>)}<a href="#final" onClick={() => close(false)}><span>05</span>Vamos conversar ↗</a></nav><p>O sinal antes da tendência.</p></dialog>
    </>
  )
}
