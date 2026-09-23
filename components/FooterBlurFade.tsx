'use client'

import { useEffect } from 'react'

export function setFooterBlurVisible(root: Pick<HTMLElement, 'classList'>, visible: boolean) {
  root.classList.toggle('footer-in-view', visible)
}

export default function FooterBlurFade() {
  useEffect(() => {
    const footer = document.getElementById('site-footer')
    if (!footer) return

    const observer = new IntersectionObserver(([entry]) => {
      setFooterBlurVisible(document.documentElement, entry.isIntersecting)
    }, { threshold: 0 })

    observer.observe(footer)
    return () => {
      observer.disconnect()
      setFooterBlurVisible(document.documentElement, false)
    }
  }, [])

  return null
}
