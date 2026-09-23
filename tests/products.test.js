const assert = require('node:assert/strict')
const test = require('node:test')

test('radar filters cultural signals by category and keeps the full set for all', async () => {
  const { filterSignals } = await import('../lib/filterSignals.mjs')
  const signals = [
    { name: 'Texture', category: 'Estética' },
    { name: 'Pertencer', category: 'Comunidades' },
    { name: 'Arquivo', category: 'Comportamento' },
  ]

  assert.deepEqual(filterSignals(signals, 'Comunidades'), [signals[1]])
  assert.deepEqual(filterSignals(signals, 'Todos'), signals)
})
