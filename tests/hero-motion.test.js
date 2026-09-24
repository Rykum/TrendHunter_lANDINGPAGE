const assert = require('node:assert/strict')
const fs = require('node:fs')
const path = require('node:path')
const test = require('node:test')
const ts = require('typescript')

require.extensions['.tsx'] = (module, filename) => {
  const source = fs.readFileSync(filename, 'utf8')
  const { outputText } = ts.transpileModule(source, {
    compilerOptions: {
      jsx: ts.JsxEmit.ReactJSX,
      module: ts.ModuleKind.CommonJS,
      esModuleInterop: true,
    },
  })
  module._compile(outputText, filename)
}

const Hero = require(path.join(__dirname, '..', 'components', 'Hero.tsx')).default
const css = fs.readFileSync(path.join(__dirname, '..', 'app', 'globals.css'), 'utf8')

function flattenElements(node, result = []) {
  if (Array.isArray(node)) {
    for (const child of node) flattenElements(child, result)
  } else if (node && typeof node === 'object' && node.type) {
    result.push(node)
    flattenElements(node.props.children, result)
  }
  return result
}

test('hero clips its black cut inside the red disc and layers portraits above it', () => {
  const elements = flattenElements(Hero())
  const classIndex = (className) => elements.findIndex(({ props }) => props.className === className)
  const disc = classIndex('hero-disc')
  const cut = classIndex('hero-cut')
  const portraits = classIndex('hero-layers')

  assert.ok(disc >= 0 && cut > disc && portraits > cut)
  assert.ok(elements.some(({ props }) => props.className === 'hero-globe-orbits' && props['aria-hidden'] === 'true'))
  assert.ok(elements.some(({ props }) => props.className === 'hero-orbit-route'))
  assert.ok(elements.some(({ type, props }) => type === 'animateMotion' && props.repeatCount === 'indefinite'))
  assert.match(css, /\.hero-globe-orbits[^{}]*\{[^}]*pointer-events:\s*none/)
  assert.match(css, /prefers-reduced-motion:\s*reduce[\s\S]*?\.hero-orbit-comet\s*\{[^}]*display:\s*none/)
})

test('hero keeps all five independent parallax image layers', () => {
  const layers = flattenElements(Hero()).filter(({ props }) => props.className?.startsWith('hero-layer '))
  assert.equal(layers.length, 5)
  assert.equal(layers.filter(({ props }) => props['data-hero-parallax'] !== undefined).length, 5)
})

test('three hero comets share one orbit with staggered timings behind the social marks', () => {
  const elements = flattenElements(Hero())
  const index = (className) => elements.findIndex(({ props }) => props.className?.split(' ').includes(className))
  const orbitComets = elements.filter(({ props }) => props.className?.startsWith('hero-orbit-comet '))
  const motions = elements.filter(({ type }) => type === 'animateMotion')

  assert.ok(index('hero-disc') < index('hero-globe-orbits'))
  assert.ok(index('hero-globe-orbits') < index('hero-social--tiktok'))
  assert.ok(index('hero-social--youtube') < index('hero-layers'))
  assert.equal(orbitComets.length, 3)
  assert.equal(motions.length, 3)
  assert.equal(new Set(motions.map(({ props }) => props.begin)).size, 3)
  assert.equal(new Set(motions.map(({ props }) => props.path)).size, 1)
})

test('hero headline types each line with a blinking cursor on desktop and mobile', () => {
  const elements = flattenElements(Hero())
  const title = elements.find(({ type, props }) => type === 'h1' && props.className === 'hero-type')
  const lines = title.props.children.filter(({ props }) => props.className?.includes('hero-type-line'))

  assert.equal(lines.length, 3)
  assert.ok(elements.some(({ props }) => props.className === 'hero-type-caret' && props['aria-hidden'] === 'true'))
  assert.match(css, /\.hero-type-line--one[^{}]*\{[^}]*animation:\s*hero-typewriter/)
  assert.match(css, /\.hero-type-caret[^{}]*\{[^}]*animation:\s*hero-caret-blink/)
  assert.match(css, /prefers-reduced-motion:\s*reduce[\s\S]*?\.hero-type-caret[^{}]*\{[^}]*display:\s*none/)
})
