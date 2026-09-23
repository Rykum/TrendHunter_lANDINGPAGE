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

const css = fs.readFileSync(path.join(__dirname, '..', 'app', 'globals.css'), 'utf8')

test('page blur has a footer-visible state that can fade it out', () => {
  assert.match(css, /html\.footer-in-view \.gradual-blur-page\s*\{[^}]*opacity:\s*0/)
})

test('footer observer targets the footer and can hide and restore the blur', () => {
  const componentPath = path.join(__dirname, '..', 'components', 'FooterBlurFade.tsx')
  assert.ok(fs.existsSync(componentPath), 'FooterBlurFade module is missing')

  const source = fs.readFileSync(componentPath, 'utf8')
  assert.match(source, /getElementById\('site-footer'\)/)
  assert.match(source, /new IntersectionObserver/)
  assert.match(source, /entry\.isIntersecting/)
  assert.match(source, /observer\.disconnect\(\)/)

  const { setFooterBlurVisible } = require(componentPath)
  const calls = []
  const root = { classList: { toggle: (name, enabled) => calls.push([name, enabled]) } }
  setFooterBlurVisible(root, true)
  setFooterBlurVisible(root, false)
  assert.deepEqual(calls, [['footer-in-view', true], ['footer-in-view', false]])
})
