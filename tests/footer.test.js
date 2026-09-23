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

const Footer = require(path.join(__dirname, '..', 'components', 'Footer.tsx')).default

test('footer presents the brand as a typing title, not a home link, and keeps its navigation', () => {
  const markup = renderToStaticMarkup(React.createElement(Footer))
  const scrollReveals = fs.readFileSync(path.join(__dirname, '..', 'components', 'ScrollReveals.tsx'), 'utf8')

  assert.match(markup, /<h2 class="footer-brand" aria-label="TrendHunter">/)
  assert.equal((markup.match(/class="footer-letter"/g) || []).length, 11)
  assert.doesNotMatch(markup, /<a[^>]*class="footer-brand"/)
  assert.match(markup, /href="#observatory"/)
  assert.match(markup, /href="mailto:hello@trendhunter\.co"/)
  assert.match(scrollReveals, /id: 'site-footer'/)
  assert.match(scrollReveals, /\.footer-letter/)
})
