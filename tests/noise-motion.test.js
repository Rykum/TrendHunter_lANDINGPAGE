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

const { calculateNoiseProgress } = require(path.join(__dirname, '..', 'components', 'Noise.tsx'))

test('noise composition waits for the first eight percent of entry', () => {
  assert.equal(typeof calculateNoiseProgress, 'function')
  assert.equal(calculateNoiseProgress(1000, 1000, 80), 0)
  assert.ok(calculateNoiseProgress(926.4, 1000, 80) < 1e-9)
})

test('noise composition reaches one at the navigation boundary and clamps outside it', () => {
  assert.equal(typeof calculateNoiseProgress, 'function')
  assert.equal(calculateNoiseProgress(80, 1000, 80), 1)
  assert.equal(calculateNoiseProgress(-20, 1000, 80), 1)
  assert.equal(calculateNoiseProgress(1100, 1000, 80), 0)
})
