'use client'

import { useEffect, useRef } from 'react'
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
  const scrollbar = useRef<HTMLDivElement>(null)
  const thumb = useRef<HTMLDivElement>(null)

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    const lenis = new Lenis({
      anchors: { offset: -78, force: true },
      autoRaf: false,
      lerp: 0.12,
      prevent: element => element.closest('dialog[open]') !== null,
      respectReducedMotion: true,
      smoothWheel: true,
      syncTouch: false,
      wheelMultiplier: 1,
    })

    const track = scrollbar.current
    const handle = thumb.current
    const customScrollbarMedia = window.matchMedia('(min-width: 768px) and (pointer: fine) and (prefers-reduced-motion: no-preference)')
    let grabOffset = 0
    let activePointer: number | null = null

    const syncScrollbar = () => {
      if (!track || !handle || !customScrollbarMedia.matches) return
      const range = Math.max(0, document.documentElement.scrollHeight - window.innerHeight)
      const height = Math.max(44, track.clientHeight * window.innerHeight / document.documentElement.scrollHeight)
      const travel = Math.max(0, track.clientHeight - height)
      handle.style.height = `${height}px`
      handle.style.transform = `translate3d(0, ${range ? lenis.scroll / range * travel : 0}px, 0)`
      track.setAttribute('aria-valuemax', String(Math.round(range)))
      track.setAttribute('aria-valuenow', String(Math.round(lenis.scroll)))
      track.style.visibility = range > 0 && !lenis.isStopped ? 'visible' : 'hidden'
    }

    const syncScrollbarMode = () => {
      document.documentElement.classList.toggle('site-custom-scrollbar', customScrollbarMedia.matches)
      syncScrollbar()
    }

    const moveToPointer = (clientY: number) => {
      if (!track || !handle) return
      const bounds = track.getBoundingClientRect()
      const travel = Math.max(1, bounds.height - handle.offsetHeight)
      const position = Math.min(travel, Math.max(0, clientY - bounds.top - grabOffset))
      lenis.scrollTo(position / travel * lenis.limit, { lerp: 0.2 })
    }

    const onPointerDown = (event: PointerEvent) => {
      if (!track || !handle || !customScrollbarMedia.matches || lenis.isStopped) return
      event.preventDefault()
      activePointer = event.pointerId
      grabOffset = handle.contains(event.target as Node)
        ? event.clientY - handle.getBoundingClientRect().top
        : handle.offsetHeight / 2
      track.setPointerCapture(event.pointerId)
      track.classList.add('is-dragging')
      moveToPointer(event.clientY)
    }

    const onPointerMove = (event: PointerEvent) => {
      if (activePointer === event.pointerId) moveToPointer(event.clientY)
    }

    const onPointerUp = (event: PointerEvent) => {
      if (activePointer !== event.pointerId) return
      activePointer = null
      track?.classList.remove('is-dragging')
      if (track?.hasPointerCapture(event.pointerId)) track.releasePointerCapture(event.pointerId)
    }

    const onScrollbarKeyDown = (event: KeyboardEvent) => {
      const step = event.key === 'PageDown' || event.key === 'PageUp' ? window.innerHeight * 0.85 : 90
      const direction = event.key === 'ArrowDown' || event.key === 'PageDown' ? 1 : event.key === 'ArrowUp' || event.key === 'PageUp' ? -1 : 0
      if (direction) {
        event.preventDefault()
        lenis.scrollTo(lenis.targetScroll + direction * step, { lerp: 0.2 })
      } else if (event.key === 'Home' || event.key === 'End') {
        event.preventDefault()
        lenis.scrollTo(event.key === 'Home' ? 0 : lenis.limit, { lerp: 0.2 })
      }
    }

    const updateScrollTriggers = () => ScrollTrigger.update()
    const updateLenis = (time: number) => lenis.raf(time * 1000)
    const handleMenuScroll = (event: Event) => {
      const control = (event as CustomEvent<MenuScrollControl>).detail
      control.handled = true

      if (control.locked) {
        control.scrollY = lenis.scroll
        lenis.stop()
        syncScrollbar()
        return
      }

      lenis.start()
      if (control.restorePosition && typeof control.scrollY === 'number') {
        lenis.scrollTo(control.scrollY, { force: true, immediate: true })
      }
      syncScrollbar()
    }

    lenis.on('scroll', updateScrollTriggers)
    lenis.on('scroll', syncScrollbar)
    track?.addEventListener('pointerdown', onPointerDown)
    track?.addEventListener('pointermove', onPointerMove)
    track?.addEventListener('pointerup', onPointerUp)
    track?.addEventListener('pointercancel', onPointerUp)
    track?.addEventListener('keydown', onScrollbarKeyDown)
    customScrollbarMedia.addEventListener('change', syncScrollbarMode)
    window.addEventListener('resize', syncScrollbar)
    syncScrollbarMode()
    window.addEventListener('trendhunter:menu-scroll', handleMenuScroll)
    gsap.ticker.add(updateLenis)
    gsap.ticker.lagSmoothing(0)

    return () => {
      lenis.off('scroll', updateScrollTriggers)
      lenis.off('scroll', syncScrollbar)
      track?.removeEventListener('pointerdown', onPointerDown)
      track?.removeEventListener('pointermove', onPointerMove)
      track?.removeEventListener('pointerup', onPointerUp)
      track?.removeEventListener('pointercancel', onPointerUp)
      track?.removeEventListener('keydown', onScrollbarKeyDown)
      customScrollbarMedia.removeEventListener('change', syncScrollbarMode)
      window.removeEventListener('resize', syncScrollbar)
      document.documentElement.classList.remove('site-custom-scrollbar')
      window.removeEventListener('trendhunter:menu-scroll', handleMenuScroll)
      gsap.ticker.remove(updateLenis)
      lenis.destroy()
    }
  }, [])

  return <div className="smooth-scrollbar" role="scrollbar" aria-label="Rolagem da página" aria-orientation="vertical" aria-valuemin={0} aria-valuemax={0} aria-valuenow={0} tabIndex={0} ref={scrollbar}><div className="smooth-scrollbar-thumb" ref={thumb} /></div>
}
