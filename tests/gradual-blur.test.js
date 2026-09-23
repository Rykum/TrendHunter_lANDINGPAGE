const assert = require('node:assert/strict')
const fs = require('node:fs')
const path = require('node:path')
const test = require('node:test')
const React = require('react')
const { renderToStaticMarkup } = require('react-dom/server')
const ts = require('typescript')

require.extensions['.css'] = () => {}
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

const componentPath = path.join(__dirname, '..', 'components', 'GradualBlur.tsx')
const GradualBlur = require(componentPath).default

test('GradualBlur creates a fixed, non-interactive page blur with progressive layers', () => {
  const markup = renderToStaticMarkup(
    React.createElement(GradualBlur, {
      target: 'page',
      position: 'bottom',
      height: '9rem',
      divCount: 6,
      zIndex: 0,
    }),
  )

  assert.match(markup, /class="gradual-blur gradual-blur-page/)
  assert.match(markup, /position:fixed/)
  assert.match(markup, /bottom:0/)
  assert.match(markup, /pointer-events:none/)
  assert.equal((markup.match(/style="position:absolute;inset:0;mask-image/g) || []).length, 6)
})
