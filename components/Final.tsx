'use client'

import { useState } from 'react'

const plans = [
  { id: 'monthly', name: 'Mensal', amount: '119,99', period: 'por mês' },
  { id: 'annual', name: 'Anual', amount: '929,99', period: 'por ano', previous: '1.440', savings: 'R$ 510,01 a menos em 12 meses' },
]

export default function Final() {
  const [activeIndex, setActiveIndex] = useState(0)
  const activePlan = plans[activeIndex]
  const subject = encodeURIComponent(`Quero conversar sobre o plano ${activePlan.name.toLowerCase()}`)

  return (
    <section className="final section-shell" id="final" aria-labelledby="final-title">
      <p className="eyebrow">A conversa começa aqui</p>
      <h2 id="final-title">E agora,<br /><em>o que vem?</em></h2>
      <div className="final-bottom">
        <div className="final-summary">
          <p>Vamos olhar para o próximo<br />movimento juntos.</p>
          <span className="plan-selection-status" aria-live="polite">Plano {activePlan.name.toLowerCase()} selecionado</span>
        </div>
        <div className="plan-picker">
          <p className="plan-picker-label">Escolha seu ritmo</p>
          <div className="plan-grid" role="group" aria-label="Escolha um plano">
            {plans.map((plan, index) => (
              <button
                className={`plan-card${index === 1 ? ' plan-card--annual' : ''}`}
                type="button"
                key={plan.id}
                aria-pressed={activeIndex === index}
                onClick={() => setActiveIndex(index)}
              >
                {plan.previous && <span className="plan-badge">OFERTA ANUAL</span>}
                <span className="plan-name">{plan.name}<span>{index === 1 ? '12 meses' : 'Flexibilidade mensal'}</span></span>
                {plan.previous && <span className="plan-old-price"><s>R$ {plan.previous}</s><span>/ ano</span></span>}
                <span className="plan-price"><span>R$</span><strong>{plan.amount}</strong><small>{plan.period}</small></span>
                {plan.savings && <span className="plan-savings">{plan.savings}</span>}
                <span className="plan-choose">{activeIndex === index ? 'Selecionado' : 'Selecionar'}<i aria-hidden="true">{activeIndex === index ? '✓' : '+'}</i></span>
              </button>
            ))}
          </div>
          <a className="contact-link" href={`mailto:hello@trendhunter.co?subject=${subject}`}>
            Conversar sobre o plano {activePlan.name.toLowerCase()} <span aria-hidden="true">↗</span>
          </a>
        </div>
      </div>
      <div className="final-orbit" aria-hidden="true" />
    </section>
  )
}
