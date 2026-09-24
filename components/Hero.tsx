const globeOrbitPath = 'M 70 4 C 108 4 136 30 136 64 C 136 103 107 136 70 136 C 33 136 4 105 4 70 C 4 34 33 4 70 4 Z'

export default function Hero() {
  return (
    <section className="hero" id="hero" aria-label="A internet está se movendo">
      <div className="hero-inner">
        <p className="hero-intro micro">Inteligência cultural para um mundo em transformação</p>
        <div className="hero-art" aria-hidden="true">
          <div className="hero-globe">
            <div className="hero-disc">
              <span className="hero-cut" />
            </div>
            <svg className="hero-globe-orbits" viewBox="0 0 140 140" preserveAspectRatio="none" aria-hidden="true" focusable="false">
              <path className="hero-orbit-route" d={globeOrbitPath} />
              <g className="hero-orbit-comet hero-orbit-comet--one">
                <animateMotion dur="10.8s" begin="0s" repeatCount="indefinite" rotate="auto" path={globeOrbitPath} />
                <path className="hero-comet-tail" d="M -12 0 Q -6 -1 0 0" />
                <circle className="hero-comet-head" r="2" />
              </g>
              <g className="hero-orbit-comet hero-orbit-comet--two">
                <animateMotion dur="10.8s" begin="-3.4s" repeatCount="indefinite" rotate="auto" path={globeOrbitPath} />
                <path className="hero-comet-tail" d="M -10 0 Q -5 -1 0 0" />
                <circle className="hero-comet-head" r="1.7" />
              </g>
              <g className="hero-orbit-comet hero-orbit-comet--three">
                <animateMotion dur="10.8s" begin="-7.1s" repeatCount="indefinite" rotate="auto" path={globeOrbitPath} />
                <path className="hero-comet-tail" d="M -9 0 Q -4 -1 0 0" />
                <circle className="hero-comet-head" r="1.5" />
              </g>
            </svg>
            <span className="hero-social hero-social--tiktok" />
            <span className="hero-social hero-social--instagram" />
            <span className="hero-social hero-social--youtube" />
          </div>
          <div className="hero-orbit" />
          <div className="hero-layers">
            <img className="hero-layer hero-layer--cap" data-hero-parallax="-0.28" src="/assets/parallax/person-01-left-cap.png" alt="" fetchPriority="high" />
            <img className="hero-layer hero-layer--left-phone" data-hero-parallax="-0.16" src="/assets/parallax/person-02-left-phone.png" alt="" />
            <img className="hero-layer hero-layer--leather" data-hero-parallax="0.2" src="/assets/parallax/person-03-leather-phone.png" alt="" />
            <img className="hero-layer hero-layer--curls" data-hero-parallax="0.1" src="/assets/parallax/person-04-center-curls-v2.png" alt="" />
            <img className="hero-layer hero-layer--braids" data-hero-parallax="0.34" src="/assets/parallax/person-06-right-braids.png" alt="" />
          </div>
        </div>
        <h1 className="hero-type"><span className="hero-type-line hero-type-line--one">A INTERNET</span><span className="hero-type-line hero-type-indent hero-type-line--two">ESTÁ SE</span><span className="hero-type-line hero-type-accent hero-type-line--three">MOVENDO.<span className="hero-type-caret" aria-hidden="true" /></span></h1>
        <div className="hero-bottom"><p>Entre o que passa e o que fica,<br />existe um sinal. Nós seguimos esse sinal.</p><a className="text-link" href="#noise">Entre no movimento <span aria-hidden="true">↗</span></a></div>
      </div>
    </section>
  )
}
