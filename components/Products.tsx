'use client'

import { useEffect, useState } from 'react'

type ViralClip = {
  title: string
  platform: string
  platformKey: 'tiktok' | 'instagram' | 'youtube'
  category: string
  views: number
  likes: number
  image: string
  time: string
}

const clips: ViralClip[] = [
  { title: 'Um POV. Mil versões.', platform: 'TikTok', platformKey: 'tiktok', category: 'HUMOR', views: 248000, likes: 18600, image: '/assets/parallax/person-01-left-cap.png', time: 'há 2 dias' },
  { title: 'A rotina vira conteúdo.', platform: 'Instagram', platformKey: 'instagram', category: 'LIFESTYLE', views: 186000, likes: 14200, image: '/assets/parallax/person-03-leather-phone.png', time: 'há 3 dias' },
  { title: 'Do primeiro take ao resultado.', platform: 'YouTube Shorts', platformKey: 'youtube', category: 'BELEZA', views: 412000, likes: 29700, image: '/assets/parallax/person-06-right-braids.png', time: 'há 4 dias' },
]

const formatMetric = (value: number) => new Intl.NumberFormat('pt-BR').format(Math.round(value))

export default function Products() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [views, setViews] = useState(0)
  const [likes, setLikes] = useState(0)
  const activeClip = clips[activeIndex]

  useEffect(() => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduceMotion) {
      setViews(activeClip.views)
      setLikes(activeClip.likes)
      return
    }
    const start = performance.now()
    const duration = 1250
    let frame = 0
    const animate = (now: number) => {
      const progress = Math.min((now - start) / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setViews(activeClip.views * eased)
      setLikes(activeClip.likes * eased)
      if (progress < 1) frame = requestAnimationFrame(animate)
    }
    frame = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(frame)
  }, [activeClip])

  useEffect(() => {
    const interval = window.setInterval(() => setActiveIndex(index => (index + 1) % clips.length), 5200)
    return () => window.clearInterval(interval)
  }, [])

  return (
    <section className="products section-shell" id="products" aria-labelledby="products-title">
      <div className="product-heading">
        <p className="eyebrow">A plataforma TrendHunter</p>
        <h2 id="products-title">Um radar para<br />o <em>agora.</em></h2>
        <p>Vídeos virais chegam, ganham contexto e viram pistas para a próxima decisão.</p>
        <div className="phone-criteria"><span>JANELA DE MONITORAMENTO</span><strong>04 dias <i>×</i> +100k views</strong><small>Uma prévia do que a plataforma organiza para você.</small></div>
      </div>

      <div className="phone-stage" aria-label="Demonstração da plataforma com vídeos virais e métricas">
        <div className="metric-stack" aria-live="polite" aria-atomic="true">
          <article className="metric-card metric-card--views"><span>VIEWS / 04 DIAS</span><strong>{formatMetric(views)}</strong><small><b>↑</b> alcance detectado</small></article>
          <article className="metric-card metric-card--likes"><span>CURTIDAS</span><strong>{formatMetric(likes)}</strong><small><b>↑</b> sinal de aderência</small></article>
          <div className="metric-signal"><i aria-hidden="true" />{activeClip.category} · {activeClip.platform}</div>
        </div>

        <div className="iphone-shell">
          <div className="iphone-button iphone-button--top" aria-hidden="true" />
          <div className="iphone-button iphone-button--bottom" aria-hidden="true" />
          <div className="iphone-screen">
            <div className="iphone-island" aria-hidden="true" />
            <div className="phone-appbar"><span>TRH <b>/</b> VIRAL FEED</span><span className="phone-live"><i /> ALERTAS</span></div>
            <div className="phone-summary"><strong>Seu radar</strong><span>03 vídeos localizados</span></div>
            <div className="phone-window"><span>ÚLTIMOS 04 DIAS</span><span>+100K</span></div>
            <div className="phone-feed">
              {clips.map((clip, index) => (
                <button key={clip.title} className={`phone-feed-item${index === activeIndex ? ' is-active' : ''}`} type="button" aria-pressed={index === activeIndex} onClick={() => setActiveIndex(index)}>
                  <span className={`phone-thumb phone-thumb--${index}`}><img src={clip.image} alt="" loading="lazy" /><i className={`platform-social-icon platform-social-icon--${clip.platformKey}`} aria-hidden="true" /><em>↗</em></span>
                  <span className="phone-feed-copy"><small>{clip.platform} · {clip.time}</small><strong>{clip.title}</strong><span>{formatMetric(clip.views)} views <b>·</b> {formatMetric(clip.likes)} curtidas</span></span>
                </button>
              ))}
            </div>
            <div className="phone-bottom-nav"><span className="is-current">Radar</span><span>Biblioteca</span><span>Insights</span></div>
          </div>
        </div>
      </div>
      <p className="phone-disclaimer">Demonstração visual com vídeos, métricas e dados fictícios. Os alertas atuais são enviados pelo Telegram.</p>
    </section>
  )
}
