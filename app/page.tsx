import Navigation from '@/components/Navigation'
import Hero from '@/components/Hero'
import Noise from '@/components/Noise'
import Signal from '@/components/Signal'
import Culture from '@/components/Culture'
import Intelligence from '@/components/Intelligence'
import Products from '@/components/Products'
import Proof from '@/components/Proof'
import Observatory from '@/components/Observatory'
import Final from '@/components/Final'
import Footer from '@/components/Footer'
import ScrollReveals from '@/components/ScrollReveals'

export default function Home() {
  return (
    <>
      <Navigation />

      <main id="top" tabIndex={-1}>
        <Hero />
        <Noise />
        <Signal />
        <Culture />
        <Intelligence />
        <Products />
        <Proof />
        <Observatory />
        <Final />
        <ScrollReveals />
      </main>

      <Footer />
    </>
  )
}
