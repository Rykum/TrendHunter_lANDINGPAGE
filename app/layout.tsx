import type { Metadata } from 'next'
import type { ReactNode } from 'react'
import Script from 'next/script'
import GradualBlur from '@/components/GradualBlur'
import FooterBlurFade from '@/components/FooterBlurFade'
import SmoothScroll from '@/components/SmoothScroll'
import 'lenis/dist/lenis.css'
import './globals.css'

export const metadata: Metadata = {
  title: 'TRENDHUNTER — A Internet Está se Movendo',
  description: 'Entre o que passa e o que fica, existe um sinal. Inteligência cultural para encontrar o próximo movimento.',
}

export default function RootLayout({
  children,
}: {
  children: ReactNode
}) {
  return (
    <html lang="pt-BR">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://fonts.cdnfonts.com" />
        <link href="https://fonts.cdnfonts.com/css/switzer" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;500;600&display=swap" rel="stylesheet" />
      </head>
      <body>
        <a className="skip-link" href="#top">IR PARA O CONTEÚDO ↓</a>

        {children}
        <SmoothScroll />
        <FooterBlurFade />

        <GradualBlur
          target="page"
          position="bottom"
          height="8rem"
          strength={1.3}
          divCount={6}
          curve="bezier"
          zIndex={0}
          responsive
          tabletHeight="4rem"
          mobileHeight="2rem"
        />

        <Script src="/script.js" strategy="afterInteractive" />
      </body>
    </html>
  )
}
