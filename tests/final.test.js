const assert = require('node:assert/strict')
const fs = require('node:fs')
const path = require('node:path')
const test = require('node:test')
const React = require('react')
const { renderToStaticMarkup } = require('react-dom/server')
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

const Final = require(path.join(__dirname, '..', 'components', 'Final.tsx')).default

test('final section keeps its summary and presents the monthly and promotional annual plans', () => {
  const markup = renderToStaticMarkup(React.createElement(Final))

  assert.match(markup, /Vamos olhar para o próximo/)
  assert.equal((markup.match(/class="plan-card(?: plan-card--annual)?"/g) || []).length, 2)
  assert.match(markup, /<span>R\$<\/span><strong>119,99<\/strong>/)
  assert.match(markup, /<span>R\$<\/span><strong>929,99<\/strong>/)
  assert.match(markup, /R\$ 1\.440/)
  assert.match(markup, /aria-pressed="true"/)
  assert.match(markup, /plano%20mensal/)
})
