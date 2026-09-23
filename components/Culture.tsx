import { UsersThree } from '@phosphor-icons/react/dist/ssr'

export default function Culture() {
  return (
    <section className="culture section-shell" id="culture" aria-labelledby="culture-title">
      <div className="culture-composition">
        <figure className="culture-image"><img src="/assets/culture-hands.jpg" alt="Mãos erguendo celulares em uma multidão, em preto e branco" loading="lazy" /><figcaption>O coletivo começa num gesto.</figcaption></figure>
        <span className="culture-frame" aria-hidden="true" /><span className="culture-type" aria-hidden="true">CUL<br />TURA</span><span className="culture-note" aria-hidden="true">em construção.</span>
      </div>
      <div className="culture-copy"><p className="eyebrow">Do gesto ao movimento</p><h2 id="culture-title">Antes de ser<br />tendência,<br />é <em>gente.</em></h2><p>Um meme nunca é só um meme. É humor, pertencimento, uma maneira de dizer: eu também.</p><p>Olhamos para os comportamentos que se repetem, atravessam comunidades e ganham novos significados. A cultura acontece nesse encontro.</p><div className="culture-community"><span className="culture-community-mark" aria-hidden="true"><UsersThree size={25} weight="duotone" aria-hidden="true" focusable="false" /></span><span>pertencimento é coletivo.</span></div><a className="text-link" href="#intelligence">Como fazemos a leitura <span aria-hidden="true">↗</span></a></div>
    </section>
  )
}
