import { ChartLineUp, MagnifyingGlass, SquaresFour } from '@phosphor-icons/react/dist/ssr'

const steps = [
  { name: 'Detectar.', note: 'Hoje · Do monitoramento ao Telegram.', text: 'Nosso bot acompanha vídeos por quatro dias. Os que ultrapassam 100 mil visualizações entram na nossa seleção de virais e são enviados ao Telegram.', icon: MagnifyingGlass },
  { name: 'Organizar.', note: 'Em desenvolvimento · Seu acervo de sinais.', text: 'Uma plataforma própria para reunir os vídeos selecionados no Telegram e explorá-los por categoria e rede social. Referências organizadas para encontrar o que faz sentido para você.', icon: SquaresFour },
  { name: 'Decidir.', note: 'Em desenvolvimento · Da referência à ação.', text: 'Análises e insights para entender os conteúdos em alta, com recursos de gestão pensados para criadores, influenciadores, marcas e agências.', icon: ChartLineUp },
]
export default function Intelligence() {
  return (
    <section className="intelligence section-shell" id="intelligence" aria-labelledby="intelligence-title">
      <p className="eyebrow">A plataforma TrendHunter</p><h2 id="intelligence-title">Do vídeo em alta.<br /><em>À próxima decisão.</em></h2>
      <ol className="method-list" aria-label="Como a plataforma funciona e seus próximos passos">
        {steps.map(({ icon: Icon, ...step }, index) => (
          <li className="method-row" key={step.name}>
            <span className="method-index">0{index + 1}</span>
            <h3>{step.name}</h3>
            <div><h4>{step.note}</h4><p>{step.text}</p></div>
            <span className={'method-art method-art--' + index} aria-hidden="true">
              <span className="method-icon-motion">
                <Icon className="method-icon" size={56} weight="duotone" aria-hidden="true" focusable="false" />
              </span>
            </span>
          </li>
        ))}
      </ol>
    </section>
  )
}
