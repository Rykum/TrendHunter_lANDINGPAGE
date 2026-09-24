const wordmark = Array.from('TRENDHUNTER')

export default function Footer() {
  return (
    <footer className="footer" id="site-footer">
      <div className="footer-overline">
        <span>INTELIGÊNCIA CULTURAL</span>
        <span>OBSERVAR · CONECTAR · INTERPRETAR</span>
      </div>
      <h2 className="footer-brand" aria-label="TrendHunter">
        <span className="footer-wordmark" aria-hidden="true">
          {wordmark.map((letter, index) => <span className="footer-letter" key={`${letter}-${index}`}>{letter}</span>)}
        </span>
        <span className="footer-mark" aria-hidden="true">↗</span>
      </h2>
      <div className="footer-bottom">
        <p className="footer-motto">Inteligência cultural.<br />Curiosidade em movimento.</p>
        <nav aria-label="Rodapé">
          <a href="#noise">A obra</a>
          <a href="#observatory">Por dentro da plataforma</a>
          <a href="mailto:hello@trendhunter.co">Contato</a>
        </nav>
        <p className="footer-copyright">© {new Date().getFullYear()} TrendHunter</p>
      </div>
    </footer>
  )
}
