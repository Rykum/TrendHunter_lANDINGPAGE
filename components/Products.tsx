'use client'

import { useMemo, useState } from 'react'
import type { CSSProperties } from 'react'
import { filterSignals } from '../lib/filterSignals.mjs'

type CulturalSignal = {
  id: string
  name: string
  shortName: string
  category: string
  tag: string
  platform: string
  views: string
  age: string
  text: string
  x: number
  y: number
}

const signals: CulturalSignal[] = [
  { id: 'pov', name: 'Um POV. Mil versões.', shortName: 'POV', category: 'Humor', platform: 'TikTok', views: '248 mil', age: '2 dias', tag: 'Formato · Situações do cotidiano', text: 'Insight ilustrativo: uma situação reconhecível abre espaço para diferentes criadores adaptarem a mesma ideia à sua comunidade.', x: 21, y: 30 },
  { id: 'routine', name: 'A rotina vira conteúdo.', shortName: 'Rotina', category: 'Lifestyle', platform: 'Instagram', views: '186 mil', age: '3 dias', tag: 'Formato · Minivlog', text: 'Insight ilustrativo: cortes curtos e uma narrativa pessoal transformam pequenos momentos em uma referência de conteúdo.', x: 62, y: 44 },
  { id: 'transformation', name: 'A transformação prende o olhar.', shortName: 'Antes / depois', category: 'Beleza', platform: 'YouTube Shorts', views: '412 mil', age: '4 dias', tag: 'Formato · Antes e depois', text: 'Insight ilustrativo: o contraste entre o início e o resultado cria uma promessa visual que pode orientar novas abordagens.', x: 32, y: 73 },
]

const categories = ['Todos', ...signals.map((signal) => signal.category)]

export default function Products() {
  const [category, setCategory] = useState('Todos')
  const [activeId, setActiveId] = useState(signals[0].id)
  const visibleSignals = useMemo(() => filterSignals(signals, category), [category])
  const activeSignal = visibleSignals.find((signal) => signal.id === activeId) ?? visibleSignals[0]

  function selectCategory(nextCategory: string) {
    setCategory(nextCategory)
    const firstSignal = filterSignals(signals, nextCategory)[0]
    if (firstSignal) setActiveId(firstSignal.id)
  }

  return (
    <section className="products section-shell" id="products" aria-labelledby="products-title">
      <div className="product-heading">
        <p className="eyebrow">A plataforma</p>
        <h2 id="products-title">Um radar para<br />o <em>agora.</em></h2>
        <p>Do vídeo que ultrapassou 100 mil views à referência para sua próxima criação. Explore uma prévia de como queremos reunir esses sinais na plataforma.</p>
      </div>

      <div className="signal-feed">
        <div className="radar-platform">
          <div className="radar-topbar">
            <span className="radar-brand"><i aria-hidden="true" /> TRH <b>/</b> VIRAL RADAR</span>
            <span className="radar-demo">PRÉVIA INTERATIVA</span>
          </div>

          <div className="radar-toolbar">
            <div>
              <p className="radar-overline">Vídeos no radar</p>
              <p className="radar-period">Janela de 4 dias · Mais de 100 mil views</p>
            </div>
            <span className="radar-count">{String(visibleSignals.length).padStart(2, '0')} localizados</span>
          </div>

          <div className="radar-filters" role="group" aria-label="Filtrar exemplos de vídeos por categoria">
            {categories.map((item) => (
              <button
                className="radar-filter"
                type="button"
                key={item}
                aria-pressed={category === item}
                onClick={() => selectCategory(item)}
              >
                {item}
              </button>
            ))}
          </div>

          <div className="radar-workspace">
            <div className="radar-plot" aria-label="Radar ilustrativo de vídeos virais. Selecione um ponto para explorar.">
              <div className="radar-sweep" aria-hidden="true" />
              <span className="radar-cross radar-cross--h" aria-hidden="true" />
              <span className="radar-cross radar-cross--v" aria-hidden="true" />
              <span className="radar-axis radar-axis--top">VÍDEOS EM ALTA</span>
              <span className="radar-axis radar-axis--bottom">ESCOLHA UM PONTO</span>
              {visibleSignals.map((signal, index) => (
                <button
                  key={signal.id}
                  type="button"
                  className={`radar-point${activeSignal.id === signal.id ? ' is-active' : ''}`}
                  style={{ '--point-x': `${signal.x}%`, '--point-y': `${signal.y}%`, '--point-delay': `${index * 180}ms` } as CSSProperties}
                  aria-pressed={activeSignal.id === signal.id}
                  aria-label={`Explorar exemplo: ${signal.name}, ${signal.platform}, ${signal.views} visualizações`}
                  onClick={() => setActiveId(signal.id)}
                >
                  <span className="radar-point-core" aria-hidden="true" />
                  <span className="radar-point-label">{signal.shortName}</span>
                </button>
              ))}
              <span className="radar-center" aria-hidden="true">TH</span>
            </div>

            <article className="radar-reading" aria-live="polite" aria-atomic="true">
              <div className="reading-meta"><span>{activeSignal.category}</span><span>{activeSignal.platform}</span></div>
              <div className={`radar-video radar-video--${activeSignal.id}`} key={`cover-${activeSignal.id}`} aria-hidden="true">
                <span className="radar-video-format">{activeSignal.shortName}</span>
                <svg viewBox="0 0 32 32" width="32" height="32"><path d="M11 6 26 16 11 26Z" fill="currentColor" /></svg>
                <span className="radar-video-caption">CAPA ILUSTRATIVA</span>
              </div>
              <dl className="radar-video-stats"><div><dt>Visualizações</dt><dd>{activeSignal.views}</dd></div><div><dt>Tempo observado</dt><dd>{activeSignal.age}</dd></div></dl>
              <h3 key={activeSignal.id}>{activeSignal.name}</h3>
              <p className="reading-tag">{activeSignal.tag}</p>
              <p className="reading-copy">{activeSignal.text}</p>
              <div className="reading-footer"><span className="reading-index">EXEMPLO 0{signals.indexOf(activeSignal) + 1} · CRITÉRIO ATINGIDO</span><span className="reading-line" aria-hidden="true" /></div>
            </article>
          </div>
          <p className="radar-disclaimer">Vídeos, métricas e insights fictícios para demonstrar a plataforma planejada. Hoje, os alertas do bot chegam pelo Telegram.</p>
        </div>
        <a className="text-link" href="mailto:hello@trendhunter.co?subject=Quero%20conhecer%20a%20plataforma">Conhecer a plataforma <span aria-hidden="true">↗</span></a>
      </div>
    </section>
  )
}
