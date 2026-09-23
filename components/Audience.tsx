'use client'

import { useState } from 'react'

const audiences = [
  ['Criadores', 'Encontrar um novo jeito de dizer.'],
  ['Marcas', 'Participar da cultura com contexto.'],
  ['Agências', 'Dar profundidade à próxima ideia.'],
  ['Mídia', 'Perceber a história que está começando.'],
  ['Pesquisa', 'Fazer perguntas que abrem caminhos.'],
]

const audienceKeys = ['criadores', 'marcas', 'agencias', 'midia', 'pesquisa']

export function AudienceIllustration({ activeIndex }: { activeIndex: number }) {
  const photoFrame = activeIndex === 0
    ? { x: 66, y: 74, width: 119, height: 56 }
    : { x: 20, y: 24, width: 280, height: 132 }

  return (
    <svg
      className="audience-illustration"
      key={activeIndex}
      data-audience-art={audienceKeys[activeIndex]}
      viewBox="0 0 320 180"
      fill="none"
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        <clipPath id={`audience-photo-${audienceKeys[activeIndex]}`} clipPathUnits="userSpaceOnUse">
          {activeIndex === 0 && <path d="M67 73h116v55H67Z" />}
          {activeIndex === 1 && <path d="M72 42h123a11 11 0 0 1 11 11v77a11 11 0 0 1-11 11H72a11 11 0 0 1-11-11V53a11 11 0 0 1 11-11Z" />}
          {activeIndex === 2 && <><rect x="50" y="38" width="48" height="30" rx="5" /><rect x="50" y="123" width="48" height="30" rx="5" /><rect x="222" y="38" width="48" height="30" rx="5" /><rect x="222" y="123" width="48" height="30" rx="5" /></>}
          {activeIndex === 3 && <path d="M79 75 170 75 169 133 79 133Z" />}
          {activeIndex === 4 && <circle cx="139" cy="80" r="35" />}
        </clipPath>
      </defs>
      <g className="audience-art-lines" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
        <image className="audience-photo-fragment" href="/assets/culture-hands.jpg" x={photoFrame.x} y={photoFrame.y} width={photoFrame.width} height={photoFrame.height} preserveAspectRatio="xMidYMid slice" clipPath={`url(#audience-photo-${audienceKeys[activeIndex]})`} />
        {activeIndex === 0 && <>
          <path d="M69 45h112a13 13 0 0 1 13 13v70a13 13 0 0 1-13 13H69a13 13 0 0 1-13-13V58a13 13 0 0 1 13-13Z" />
          <path d="M83 45l9-13h29l9 13M56 67h138" />
          <circle cx="124" cy="101" r="24" stroke="var(--red)" strokeWidth="2" />
          <circle cx="124" cy="101" r="9" />
          <path d="M158 58h16M81 126h13M216 53l5 9 10 1-7 7 2 10-10-5-9 5 2-10-7-7 10-1 4-9ZM230 121h30M245 106v30" stroke="var(--red)" />
          <path d="M211 83c16-12 35-15 52-9M214 93c11-7 23-9 35-7" strokeDasharray="2 5" />
        </>}
        {activeIndex === 1 && <>
          <path d="M72 42h123a11 11 0 0 1 11 11v77a11 11 0 0 1-11 11H72a11 11 0 0 1-11-11V53a11 11 0 0 1 11-11Z" />
          <path d="M61 65h145" />
          <rect x="83" y="82" width="47" height="47" rx="12" fill="var(--red)" fillOpacity=".13" stroke="var(--red)" />
          <path d="M97 116V94l19 22V94M148 91h35M148 101h28M148 111h32M148 121h22" />
          <circle cx="106" cy="105" r="26" stroke="var(--red)" strokeDasharray="3 5" />
          <path d="M229 49h25v25h-25zM241 49v25M229 61h25M225 113h43M225 123h29M225 133h35" stroke="var(--red)" />
          <circle cx="247" cy="96" r="4" fill="var(--red)" />
        </>}
        {activeIndex === 2 && <>
          <path d="M150 91C117 91 118 53 91 53M150 91c-29 0-29 38-59 38M170 91c34 0 32-38 61-38M170 91c31 0 31 38 61 38" />
          <rect x="125" y="70" width="70" height="42" rx="21" stroke="var(--red)" strokeWidth="2" />
          <circle cx="160" cy="91" r="6" fill="var(--red)" />
          <rect x="50" y="38" width="48" height="30" rx="5" />
          <rect x="50" y="123" width="48" height="30" rx="5" />
          <rect x="222" y="38" width="48" height="30" rx="5" />
          <rect x="222" y="123" width="48" height="30" rx="5" />
          <path d="M61 53h25M61 61h17M61 138h25M61 146h17M233 53h25M233 61h17M233 138h25M233 146h17" stroke="var(--red)" />
          <circle cx="107" cy="53" r="2" fill="var(--red)" /><circle cx="107" cy="138" r="2" fill="var(--red)" />
          <circle cx="214" cy="53" r="2" fill="var(--red)" /><circle cx="214" cy="138" r="2" fill="var(--red)" />
        </>}
        {activeIndex === 3 && <>
          <rect x="63" y="33" width="125" height="116" rx="5" />
          <path d="M79 49h43M79 58h26" stroke="var(--red)" />
          <path d="M79 75h91M79 82h91M79 89h66" />
          <rect x="79" y="101" width="42" height="32" rx="2" fill="var(--red)" fillOpacity=".16" stroke="var(--red)" />
          <path d="M133 104h37M133 112h37M133 120h30M133 128h34" />
          <circle cx="232" cy="91" r="31" stroke="var(--red)" strokeWidth="1.5" />
          <path d="M226 78l18 13-18 13V78Z" fill="var(--red)" fillOpacity=".22" stroke="var(--red)" />
          <path d="M216 49a47 47 0 0 1 33 0M210 40a58 58 0 0 1 44 0M217 133a46 46 0 0 0 31 0" strokeDasharray="2 4" />
        </>}
        {activeIndex === 4 && <>
          <circle cx="139" cy="80" r="39" stroke="var(--red)" strokeWidth="2" />
          <path d="m167 109 32 32" stroke="var(--red)" strokeWidth="5" />
          <circle cx="139" cy="80" r="26" strokeDasharray="2 5" />
          <path d="M118 91V80M129 91V67M140 91V74M151 91V57M162 91V71" />
          <circle cx="118" cy="80" r="2.5" fill="var(--red)" /><circle cx="129" cy="67" r="2.5" fill="var(--red)" />
          <circle cx="140" cy="74" r="2.5" fill="var(--red)" /><circle cx="151" cy="57" r="2.5" fill="var(--red)" />
          <path d="M220 48h42M220 59h30M220 70h37M220 121h33M220 132h42M220 143h25" stroke="var(--red)" />
          <path d="M68 101h24M80 89v24" strokeDasharray="2 4" />
        </>}
      </g>
    </svg>
  )
}

export default function Audience() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [activeName, activeDescription] = audiences[activeIndex]

  return (
    <section className="audience section-shell" id="audience" aria-labelledby="audience-title">
      <div className="audience-intro">
        <p className="eyebrow">Para quem move a cultura</p>
        <h2 id="audience-title">O próximo<br />movimento<br />pode ser <em>seu.</em></h2>
      </div>
      <div className="audience-selector">
        <p className="audience-selector-label">Uma leitura. Muitos pontos de vista.</p>
        <div className="audience-options" role="group" aria-label="Escolha seu ponto de vista">
          {audiences.map(([name], index) => (
            <button
              className="audience-option"
              type="button"
              key={name}
              aria-pressed={activeIndex === index}
              onClick={() => setActiveIndex(index)}
            >
              <span className="audience-option-index">0{index + 1}</span>
              <span>{name}</span>
            </button>
          ))}
        </div>
        <div className="audience-progress" aria-hidden="true">
          <span style={{ transform: `scaleX(${(activeIndex + 1) / audiences.length})` }} />
        </div>
        <div className="audience-visual-frame" aria-hidden="true">
          <div className="audience-visual-meta"><span>REPRESENTAÇÃO DO PERFIL</span><span>0{activeIndex + 1} / 05</span></div>
          <AudienceIllustration activeIndex={activeIndex} />
          <span className="audience-visual-name">{activeName}</span>
        </div>
        <article className="audience-reading" aria-live="polite" aria-atomic="true">
          <div className="audience-reading-index"><span>PARA</span><span>0{activeIndex + 1} / 0{audiences.length}</span></div>
          <h3 key={activeName}>{activeName}</h3>
          <p>{activeDescription}</p>
        </article>
      </div>
    </section>
  )
}
