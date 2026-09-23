'use client'

import { useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

type RevealOptions = {
  duration?: number
  ease?: string
  stagger?: number
}

type SectionScene = {
  id: string
  animate: (
    section: HTMLElement,
    timeline: gsap.core.Timeline,
    mobile: boolean,
    distance: number,
  ) => void
}

const select = (section: HTMLElement, selector: string) =>
  Array.from(section.querySelectorAll<HTMLElement>(selector))

function enter(
  timeline: gsap.core.Timeline,
  targets: HTMLElement[],
  from: gsap.TweenVars,
  mobile: boolean,
  options: RevealOptions = {},
  position: string = '>',
) {
  if (!targets.length) return

  timeline.fromTo(
    targets,
    { autoAlpha: 0, ...from },
    {
      autoAlpha: 1,
      x: 0,
      y: 0,
      rotation: 0,
      rotationX: 0,
      scale: 1,
      clipPath: 'inset(0% 0% 0% 0%)',
      duration: options.duration ?? (mobile ? 0.68 : 0.88),
      ease: options.ease ?? 'power3.out',
      stagger: options.stagger ?? 0,
      clearProps: 'opacity,visibility,transform,clipPath',
    },
    position,
  )
}

const scenes: SectionScene[] = [
  {
    id: 'noise',
    animate(section, timeline, mobile) {
      enter(timeline, select(section, '.artwork'), { y: mobile ? 18 : 34, scale: 0.93, rotation: 1.5 }, mobile, { duration: 1.05 })
      enter(timeline, select(section, '.artwork-caption'), { x: 16, y: 8 }, mobile, { duration: 0.55 }, '>-0.45')
    },
  },
  {
    id: 'signal',
    animate(section, timeline, mobile) {
      enter(
        timeline,
        select(section, '.signal-statement > span'),
        { y: mobile ? 24 : 40, rotation: 2.5 },
        mobile,
        { stagger: 0.14, duration: 0.72 },
      )
      enter(timeline, select(section, '.signal-thread i'), { scaleX: 0.48, scaleY: 0.76, rotation: -18 }, mobile, { stagger: 0.06, duration: 0.8 }, '>-0.25')
      enter(timeline, select(section, '.signal-bottom > p'), { x: 22 }, mobile, { duration: 0.68 }, '>-0.35')
    },
  },
  {
    id: 'culture',
    animate(section, timeline, mobile) {
      enter(timeline, select(section, '.culture-image'), { clipPath: 'inset(0% 100% 0% 0%)' }, mobile, { duration: 0.92 })
      enter(timeline, select(section, '.culture-type'), { clipPath: 'inset(0% 0% 100% 0%)', y: 14, rotation: -2 }, mobile, { duration: 0.82 }, '>-0.52')
      enter(timeline, select(section, '.culture-note'), { x: 26, rotation: -12 }, mobile, { duration: 0.62 }, '>-0.45')
      enter(timeline, select(section, '.culture-copy > *'), { y: 18 }, mobile, { stagger: 0.075, duration: 0.64 }, '>-0.25')
    },
  },
  {
    id: 'intelligence',
    animate(section, timeline, mobile, distance) {
      enter(timeline, select(section, '.eyebrow, #intelligence-title'), { y: 22 }, mobile, { stagger: 0.09, duration: 0.7 })
      select(section, '.method-row').forEach((row, index) => {
        enter(
          timeline,
          [row],
          { x: (index % 2 === 0 ? -1 : 1) * distance, clipPath: index % 2 === 0 ? 'inset(0% 12% 0% 0%)' : 'inset(0% 0% 0% 12%)' },
          mobile,
          { duration: 0.72 },
          index === 0 ? '>-0.2' : '>-0.42',
        )
      })
      enter(timeline, select(section, '.method-art'), { rotation: -22, scale: 0.78 }, mobile, { stagger: 0.11, ease: 'back.out(1.5)', duration: 0.78 }, '>-0.55')
    },
  },
  {
    id: 'products',
    animate(section, timeline, mobile) {
      enter(timeline, select(section, '.product-heading > *'), { y: 18 }, mobile, { stagger: 0.09, duration: 0.68 })
      enter(timeline, select(section, '.radar-topbar, .radar-toolbar'), { y: 12 }, mobile, { stagger: 0.08, duration: 0.62 }, '>-0.25')
      enter(timeline, select(section, '.radar-filters'), { x: 16, clipPath: 'inset(0% 0% 0% 100%)' }, mobile, { duration: 0.58 }, '>-0.35')
      enter(timeline, select(section, '.radar-plot'), { scale: 0.9, rotation: -8 }, mobile, { ease: 'back.out(1.3)', duration: 0.75 }, '>-0.2')
      enter(timeline, select(section, '.radar-reading'), { x: 16, y: 8 }, mobile, { duration: 0.66 }, '>-0.42')
      enter(timeline, select(section, '.radar-disclaimer'), { y: 8 }, mobile, { duration: 0.5 }, '>-0.38')
      enter(timeline, select(section, '.signal-feed > .text-link'), { y: 12 }, mobile, { duration: 0.56 }, '>-0.3')
    },
  },
  {
    id: 'audience',
    animate(section, timeline, mobile, distance) {
      enter(timeline, select(section, '.audience-intro > .eyebrow, .audience-intro > h2'), { y: 20 }, mobile, { stagger: 0.08, duration: 0.67 })
      enter(timeline, select(section, '.audience-selector-label, .audience-options'), { x: distance * 0.35, y: 10 }, mobile, { stagger: 0.08, duration: 0.58 }, '>-0.35')
      enter(timeline, select(section, '.audience-reading'), { y: 12 }, mobile, { duration: 0.62 }, '>-0.35')
    },
  },
  {
    id: 'proof',
    animate(section, timeline, mobile, distance) {
      enter(timeline, select(section, '.eyebrow, #proof-title'), { y: 22 }, mobile, { stagger: 0.1, duration: 0.72 })
      enter(timeline, select(section, '.proof-asterisk'), { scale: 0.28, rotation: -150 }, mobile, { duration: 1, ease: 'back.out(1.6)' }, '>-0.22')
      select(section, '.proof-copy > p').forEach((paragraph, index) => {
        enter(timeline, [paragraph], { x: (index === 0 ? -1 : 1) * distance * 0.65, y: 9 }, mobile, { duration: 0.7 }, index === 0 ? '>-0.5' : '>-0.44')
      })
    },
  },
  {
    id: 'observatory',
    animate(section, timeline, mobile, distance) {
      enter(timeline, select(section, '.eyebrow, #observatory-title'), { y: 24, scale: 0.985 }, mobile, { stagger: 0.09, duration: 0.7 })
      select(section, '.journal-entry').forEach((article, index) => {
        enter(
          timeline,
          [article],
          { x: (index % 2 === 0 ? -1 : 1) * distance * 0.6, y: 22, rotation: index % 2 === 0 ? -2.5 : 2.5, scale: 0.965 },
          mobile,
          { duration: 0.78 },
          index === 0 ? '>-0.14' : '>-0.36',
        )
      })
    },
  },
  {
    id: 'final',
    animate(section, timeline, mobile) {
      enter(timeline, select(section, '.eyebrow'), { y: 18 }, mobile, { duration: 0.58 })
      enter(timeline, select(section, 'h2'), { y: 26, scale: 0.96, rotation: -1.4 }, mobile, { duration: 0.88, ease: 'power4.out' }, '>-0.2')
      enter(timeline, select(section, '.final-orbit'), { scale: 0.78, rotation: -20 }, mobile, { duration: 1, ease: 'back.out(1.2)' }, '>-0.58')
      enter(timeline, select(section, '.final-bottom > *'), { y: 20 }, mobile, { stagger: 0.12, duration: 0.68 }, '>-0.42')
      enter(timeline, select(section, '.plan-card'), { y: 15, scale: 0.98 }, mobile, { stagger: 0.12, duration: 0.58 }, '>-0.24')
      enter(timeline, select(section, '.plan-picker > .contact-link'), { y: 10 }, mobile, { duration: 0.54 }, '>-0.28')
    },
  },
  {
    id: 'site-footer',
    animate(section, timeline, mobile) {
      enter(timeline, select(section, '.footer-overline'), { y: 10 }, mobile, { duration: 0.48 })
      timeline.fromTo(
        select(section, '.footer-letter'),
        { autoAlpha: 0, y: 7 },
        { autoAlpha: 1, y: 0, duration: 0.045, ease: 'none', stagger: 0.075, clearProps: 'opacity,visibility,transform' },
        '>-0.08',
      )
      enter(timeline, select(section, '.footer-bottom > *'), { y: 12 }, mobile, { stagger: 0.08, duration: 0.56 }, '>-0.18')
    },
  },
]

export default function ScrollReveals() {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    const media = gsap.matchMedia()
    media.add(
      {
        mobile: '(max-width: 767px)',
        desktop: '(min-width: 768px)',
        reduceMotion: '(prefers-reduced-motion: reduce)',
      },
      context => {
        if (context.conditions?.reduceMotion) return

        const mobile = Boolean(context.conditions?.mobile)
        const distance = mobile ? 16 : 30

        scenes.forEach(({ id, animate }) => {
          const section = document.getElementById(id)
          if (!section) return

          const timeline = gsap.timeline({
            scrollTrigger: {
              trigger: section,
              start: mobile ? 'top 93%' : 'top 88%',
              fastScrollEnd: mobile ? 2200 : false,
              once: true,
            },
          })

          animate(section, timeline, mobile, distance)
        })
      },
    )

    return () => media.revert()
  }, [])

  return null
}
