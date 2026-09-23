const assert = require('node:assert/strict')
const fs = require('node:fs')
const path = require('node:path')
const test = require('node:test')

const culture = fs.readFileSync(path.join(__dirname, '..', 'components', 'Culture.tsx'), 'utf8')
const scenes = fs.readFileSync(path.join(__dirname, '..', 'components', 'ScrollReveals.tsx'), 'utf8')

test('culture source imports a decorative community icon and places it below the explanatory copy', () => {
  const secondParagraph = culture.indexOf('Olhamos para os comportamentos')
  const cue = culture.indexOf('<div className="culture-community">')
  const link = culture.indexOf('href="#intelligence"')

  assert.ok(secondParagraph >= 0 && cue > secondParagraph && link > cue)
  assert.match(culture, /import \{ UsersThree \} from '@phosphor-icons\/react\/dist\/ssr'/)
  assert.match(culture, /<UsersThree[^>]+aria-hidden="true"[^>]+focusable="false"/)
  assert.match(culture, /pertencimento é coletivo/i)
})

test('culture word entrance is a vertical reveal in the existing ScrollTrigger scene', () => {
  assert.match(scenes, /select\(section, '\.culture-type'\)[\s\S]{0,120}clipPath/)
})

test('GSAP scenes activate on desktop and still stop for reduced motion', () => {
  assert.match(scenes, /desktop:\s*'\(min-width: 768px\)'/)
  assert.match(scenes, /if \(context\.conditions\?\.reduceMotion\) return/)
})
