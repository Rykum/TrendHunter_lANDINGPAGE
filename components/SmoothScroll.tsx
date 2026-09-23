'use client'

import { useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Lenis from 'lenis'

type MenuScrollControl = {
  locked: boolean
  restorePosition?: boolean
  scrollY?: number
  handled?: boolean
}

export default function SmoothScroll() {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    const lenis = new Lenis({
      anchors: { offset: -78, force: true },
      autoRaf: false,
      lerp: 0.09,
      prevent: element => element.closest('dialog[open]') !== null,
      respectReducedMotion: true,
      smoothWheel: true,
      syncTouch: false,
      wheelMultiplier: 0.95,
    })

    const updateScrollTriggers = () => ScrollTrigger.update()
    const updateLenis = (time: number) => lenis.raf(time * 1000)
    const handleMenuScroll = (event: Event) => {
      const control = (event as CustomEvent<MenuScrollControl>).detail
      control.handled = true

      if (control.locked) {
        control.scrollY = lenis.scroll
        lenis.stop()
        return
      }

      lenis.start()
      if (control.restorePosition && typeof control.scrollY === 'number') {
        lenis.scrollTo(control.scrollY, { force: true, immediate: true })
      }
    }

    lenis.on('scroll', updateScrollTriggers)
    window.addEventListener('trendhunter:menu-scroll', handleMenuScroll)
    gsap.ticker.add(updateLenis)
    gsap.ticker.lagSmoothing(0)

    return () => {
      lenis.off('scroll', updateScrollTriggers)
      window.removeEventListener('trendhunter:menu-scroll', handleMenuScroll)
      gsap.ticker.remove(updateLenis)
      lenis.destroy()
    }
  }, [])

  return null
}
