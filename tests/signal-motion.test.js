const assert = require('node:assert/strict')
const fs = require('node:fs')
const path = require('node:path')
const test = require('node:test')

const css = fs.readFileSync(path.join(__dirname, '..', 'app', 'globals.css'), 'utf8')

test('signal rings use a subtle continuous loop only when motion is allowed', () => {
  const motionAllowed = [...css.matchAll(/@media \(prefers-reduced-motion: no-preference\) \{[\s\S]*?\n\}/g)]
    .map(([block]) => block)
    .find((block) => block.includes('.signal-thread i'))
  assert.ok(motionAllowed, 'signal-ring motion belongs inside the no-preference media block')
  assert.match(motionAllowed, /\.signal-thread i[^{}]*\{[^}]*animation:\s*signal-ring-drift/)
  assert.match(css, /@keyframes signal-ring-drift/)
  assert.match(css, /prefers-reduced-motion: reduce[\s\S]*?animation:\s*none/)
})
