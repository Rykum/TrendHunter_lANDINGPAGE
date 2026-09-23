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
  text: string
  x: number
  y: number
}

const signals: CulturalSignal[] = [
  { id: 'texture', name: 'O digital quer ter textura.', shortName: 'Textura', category: 'Estética', tag: 'Analógico / digital', text: 'Grão, impressão aparente e enquadramentos imperfeitos reaparecem na linguagem de criadores. Uma pergunta para investigar: quando o acabamento perde importância e a sensação de proximidade ganha espaço?', x: 23, y: 30 },
  { id: 'belonging', name: 'Pertencer vale mais que aparecer.', shortName: 'Pertencer', category: 'Comunidades', tag: 'Público / íntimo', text: 'Grupos menores podem criar códigos e conversas que se perdem num feed aberto. O que muda no conteúdo quando ele é pensado para um círculo de pessoas, e não para uma audiência indistinta?', x: 72, y: 43 },
  { id: 'archive', name: 'O arquivo ganha outra vida.', shortName: 'Arquivo', category: 'Comportamento', tag: 'Memória / remix', text: 'Peças, imagens e referências do passado são recombinadas no presente. A oportunidade está em entender o novo significado atribuído ao arquivo, além da nostalgia.', x: 42, y: 73 },
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
        <p>Um lugar para explorar sinais, conectar contextos e alimentar sua próxima ideia.</p>
      </div>

      <div className="signal-feed">
        <div className="radar-platform">
          <div className="radar-topbar">
            <span className="radar-brand"><i aria-hidden="true" /> TRH <b>/</b> FIELD NOTES</span>
            <span className="radar-demo">DEMONSTRAÇÃO · 01</span>
          </div>

          <div className="radar-toolbar">
            <div>
              <p className="radar-overline">Sinais culturais</p>
              <p className="radar-period">Um recorte para explorar</p>
            </div>
            <span className="radar-count">{String(visibleSignals.length).padStart(2, '0')} sinais</span>
          </div>

          <div className="radar-filters" role="group" aria-label="Filtrar sinais por categoria">
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
            <div className="radar-plot" aria-label="Mapa ilustrativo de sinais culturais">
              <div className="radar-sweep" aria-hidden="true" />
              <span className="radar-cross radar-cross--h" aria-hidden="true" />
              <span className="radar-cross radar-cross--v" aria-hidden="true" />
              <span className="radar-axis radar-axis--top">AGORA</span>
              <span className="radar-axis radar-axis--bottom">EMERGENTE</span>
              {visibleSignals.map((signal, index) => (
                <button
                  key={signal.id}
                  type="button"
                  className={`radar-point${activeSignal.id === signal.id ? ' is-active' : ''}`}
                  style={{ '--point-x': `${signal.x}%`, '--point-y': `${signal.y}%`, '--point-delay': `${index * 180}ms` } as CSSProperties}
                  aria-pressed={activeSignal.id === signal.id}
                  aria-label={`Selecionar sinal: ${signal.name} (${signal.category})`}
                  onClick={() => setActiveId(signal.id)}
                >
                  <span className="radar-point-core" aria-hidden="true" />
                  <span className="radar-point-label">{signal.shortName}</span>
                </button>
              ))}
              <span className="radar-center" aria-hidden="true">TH</span>
            </div>

            <article className="radar-reading" aria-live="polite" aria-atomic="true">
              <div className="reading-meta"><span>{activeSignal.category}</span><span>LEITURA SELECIONADA</span></div>
              <h3 key={activeSignal.id}>{activeSignal.name}</h3>
              <p className="reading-tag">{activeSignal.tag}</p>
              <p className="reading-copy">{activeSignal.text}</p>
              <div className="reading-footer"><span className="reading-index">SINAL 0{signals.indexOf(activeSignal) + 1}</span><span className="reading-line" aria-hidden="true" /></div>
            </article>
          </div>
          <p className="radar-disclaimer">Composição editorial para demonstração. Não representa monitoramento em tempo real.</p>
        </div>
        <a className="text-link" href="mailto:hello@trendhunter.co?subject=Quero%20conhecer%20a%20plataforma">Conhecer a plataforma <span aria-hidden="true">↗</span></a>
      </div>
    </section>
  )
}
