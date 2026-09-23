import { Compass, Ear, ShareNetwork } from '@phosphor-icons/react/dist/ssr'

const steps = [
  { name: 'Escutar.', note: 'Estar perto de onde começa.', text: 'Observar linguagens, formatos e conversas no contexto das comunidades que os criam.', icon: Ear },
  { name: 'Conectar.', note: 'Ver relações que não são óbvias.', text: 'Cruzar comportamentos, reconhecer recorrências e separar um pico de atenção de uma mudança cultural.', icon: ShareNetwork },
  { name: 'Interpretar.', note: 'Transformar percepção em direção.', text: 'Construir uma leitura que ajude a decidir o que criar, quando agir e quais perguntas fazer a seguir.', icon: Compass },
]
export default function Intelligence() {
  return (
    <section className="intelligence section-shell" id="intelligence" aria-labelledby="intelligence-title">
      <p className="eyebrow">Nosso modo de olhar</p><h2 id="intelligence-title">Sensibilidade cultural.<br /><em>Clareza para agir.</em></h2>
      <ol className="method-list" aria-label="Etapas da leitura cultural">
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
