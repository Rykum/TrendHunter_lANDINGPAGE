const assert = require('node:assert/strict')
const fs = require('node:fs')
const test = require('node:test')

const hero = fs.readFileSync('components/Hero.tsx', 'utf8')
const script = fs.readFileSync('public/script.js', 'utf8')

test('hero mounts each verified crowd layer as an independent parallax asset', () => {
  const expectedAssets = [
    'person-01-left-cap.png',
    'person-02-left-phone.png',
    'person-03-leather-phone.png',
    'person-04-center-curls-v2.png',
    'person-06-right-braids.png',
  ]

  for (const asset of expectedAssets) {
    assert.match(hero, new RegExp(asset.replaceAll('.', '\\.') ))
  }

  assert.equal((hero.match(/className="hero-layer /g) || []).length, expectedAssets.length)
  assert.doesNotMatch(hero, /hero-crowd\.jpg|hero-image|hero-atmosphere/)
})

test('hero parallax is updated on scroll with animation-frame scheduling', () => {
  assert.match(script, /data-hero-parallax/)
  assert.match(script, /requestAnimationFrame\(updateHeroParallax\)/)
})
