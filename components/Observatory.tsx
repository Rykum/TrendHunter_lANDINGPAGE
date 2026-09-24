'use client'

import { useState } from 'react'

const videos = [
  { id: 'pov', title: 'Um POV. Mil versões.', platform: 'TikTok', category: 'Humor', image: '/assets/parallax/person-01-left-cap.png', before: [1800, 96, 12], after: [248000, 18600, 4200], daily: [1800, 24000, 96000, 248000], insight: 'O salto mais forte aparece entre o terceiro e o quarto dia. Os compartilhamentos sugerem uma ideia que as pessoas querem repassar.', opportunity: 'Investigue o gancho e a situação cotidiana. Adapte a ideia à sua comunidade, sem repetir o vídeo.' },
  { id: 'routine', title: 'A rotina vira conteúdo.', platform: 'Instagram', category: 'Lifestyle', image: '/assets/parallax/person-03-leather-phone.png', before: [2400, 180, 24], after: [186000, 14200, 2800], daily: [2400, 18000, 74000, 186000], insight: 'As visualizações aceleram ao longo da janela. Curtidas e compartilhamentos oferecem pistas para investigar a identificação com a rotina.', opportunity: 'Observe como a abertura apresenta a história e como os cortes conectam pequenos momentos.' },
  { id: 'beauty', title: 'Do primeiro take ao resultado.', platform: 'YouTube Shorts', category: 'Beleza', image: '/assets/parallax/person-06-right-braids.png', before: [3200, 210, 18], after: [412000, 29700, 6300], daily: [3200, 46000, 182000, 412000], insight: 'O vídeo ultrapassa 100 mil visualizações no terceiro dia e continua crescendo. O contraste visual é uma hipótese criativa a explorar.', opportunity: 'Analise quando o resultado é revelado. Uma transformação clara pode servir de referência para outro tema.' },
]
const format = (value: number) => new Intl.NumberFormat('pt-BR').format(value)
const labels = ['Visualizações', 'Curtidas', 'Compartilhamentos']

export default function Observatory() {
  const [selected, setSelected] = useState(0)
  const [expanded, setExpanded] = useState(false)
  const video = videos[selected]
  const metrics = expanded ? video.after : video.before
  const growth = Math.round(video.after[0] / video.before[0])
  const points = video.daily.map((value, index) => `${24 + index * 144},${160 - value / video.after[0] * 132}`)

  return (
    <section className="observatory section-shell" id="observatory" aria-labelledby="observatory-title">
      <p className="eyebrow">Por dentro da plataforma</p>
      <h2 id="observatory-title">Antes, um vídeo.<br /><em>Depois, um sinal.</em></h2>
      <p className="observatory-intro">Poucas visualizações podem ser só o começo. Compare dois momentos e veja como os números ajudam a escolher o que investigar.</p>
      <div className="platform-preview">
        <div className="platform-preview-bar"><span>TRH <b>/</b> VIDEO INTELLIGENCE</span><span>DEMONSTRAÇÃO INTERATIVA</span></div>
        <div className="platform-preview-layout">
          <aside className="platform-library" aria-label="Selecionar vídeo de demonstração">
            <div className="platform-library-heading"><span>Seu radar de vídeos</span><span>03</span></div>
            <p>Escolha uma referência para explorar.</p>
            <div className="platform-video-list">
              {videos.map((item, index) => (
                <button key={item.id} className="platform-video-option" aria-pressed={selected === index} onClick={() => setSelected(index)} type="button">
                  <span className={`platform-video-cover platform-video-cover--${index}`} aria-hidden="true"><img src={item.image} alt="" loading="lazy" /><span>↗</span></span>
                  <span className="platform-video-info"><small>{item.platform} · {item.category}</small><strong>{item.title}</strong><span>Ver evolução <i aria-hidden="true">↗</i></span></span>
                </button>
              ))}
            </div>
            <p className="platform-library-note">Capas ilustrativas.<br />Uma prévia do acervo que estamos construindo.</p>
          </aside>
          <div className="platform-analysis">
            <div className="platform-analysis-heading"><div><p>{video.platform} / {video.category}</p><h3>{video.title}</h3></div><span className="platform-sample-tag">VÍDEO EXEMPLO</span></div>
            <div className="platform-period" role="group" aria-label="Momento da análise">
              <button type="button" aria-pressed={!expanded} onClick={() => setExpanded(false)}>01 <span>Primeiro registro</span></button>
              <button type="button" aria-pressed={expanded} onClick={() => setExpanded(true)}>02 <span>Após 4 dias</span><span aria-hidden="true">↗</span></button>
            </div>
            <div className="platform-analysis-results" aria-live="polite" aria-atomic="true">
              <div className="platform-moment"><span>{expanded ? 'CRITÉRIO DE VIRAL ATINGIDO' : 'AINDA NO COMEÇO'}</span><strong>{expanded ? `≈ ${growth}× as visualizações iniciais` : 'Acompanhar antes de concluir.'}</strong></div>
              <dl className="platform-metrics">
                {labels.map((label, index) => <div key={label}><dt>{label}</dt><dd key={`${video.id}-${expanded}-${index}`}>{format(metrics[index])}</dd><small>{expanded ? `Antes: ${format(video.before[index])}` : 'No primeiro registro'}</small></div>)}
              </dl>
              <figure className="platform-chart">
                <figcaption><span>Evolução das visualizações</span><span>{expanded ? '4 DIAS OBSERVADOS' : 'PRIMEIRO PONTO'}</span></figcaption>
                <svg viewBox="0 0 480 190" role="img" aria-label={expanded ? `Visualizações do dia 1 ao dia 4: ${video.daily.map(format).join(', ')}.` : `${format(video.before[0])} visualizações no primeiro registro. Os dias seguintes ainda não estão exibidos.`}>
                  {[28, 72, 116, 160].map(y => <path key={y} d={`M24 ${y}H456`} className="platform-chart-grid" />)}
                  <path d={`M24 ${160 - 100000 / video.after[0] * 132}H456`} className="platform-chart-threshold" />
                  <text x="454" y={153 - 100000 / video.after[0] * 132} textAnchor="end">100 mil · critério</text>
                  {expanded && <polyline key={video.id} points={points.join(' ')} className="platform-chart-line" pathLength="1" />}
                  {points.map((point, index) => { const [cx, cy] = point.split(','); return (expanded || index === 0) && <circle key={index} cx={cx} cy={cy} r={index === 3 ? 5 : 3.5} className="platform-chart-dot" /> })}
                  {[1, 2, 3, 4].map((day, index) => <text key={day} x={24 + index * 144} y="185" textAnchor={index === 0 ? 'start' : index === 3 ? 'end' : 'middle'}>DIA {day}</text>)}
                </svg>
              </figure>
              <div className="platform-insight" key={`${video.id}-${expanded}`}><span className="platform-insight-label">{expanded ? 'O QUE ESSE MOVIMENTO SUGERE' : 'O QUE JÁ PODEMOS LER'}</span><p>{expanded ? video.insight : 'Um registro isolado ainda diz pouco. Acompanhar a evolução ajuda a diferenciar um começo discreto de um conteúdo que está ganhando alcance.'}</p>{expanded && <p className="platform-opportunity"><strong>Para sua próxima ideia</strong>{video.opportunity}</p>}</div>
            </div>
          </div>
        </div>
        <p className="platform-preview-disclaimer">Simulação com vídeos, métricas e insights fictícios. O crescimento ilustra a evolução de um conteúdo; não é uma promessa de resultado. Recursos da plataforma em desenvolvimento.</p>
      </div>
    </section>
  )
}
