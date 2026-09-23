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

const audienceModule = require(path.join(__dirname, '..', 'components', 'Audience.tsx'))
const Audience = audienceModule.default
const AudienceIllustration = audienceModule.AudienceIllustration

test('audience section is a five-option selector instead of a list of email links', () => {
  const markup = renderToStaticMarkup(React.createElement(Audience))

  assert.equal((markup.match(/class="audience-option"/g) || []).length, 5)
  assert.match(markup, /aria-pressed="true"/)
  assert.match(markup, /class="audience-reading"[^>]*aria-live="polite"/)
  assert.doesNotMatch(markup, /href="mailto:/)
})

test('each audience gets a distinct, decorative inline SVG illustration', () => {
  const expectedAudiences = ['criadores', 'marcas', 'agencias', 'midia', 'pesquisa']
  const rendered = expectedAudiences.map((audience, activeIndex) => {
    const markup = renderToStaticMarkup(React.createElement(AudienceIllustration, { activeIndex }))
    assert.match(markup, new RegExp(`data-audience-art="${audience}"`))
    assert.match(markup, /<svg[^>]+aria-hidden="true"/)
    return markup
  })

  assert.equal(new Set(rendered).size, expectedAudiences.length)
})

test('each audience collage reuses the site photo through its own SVG crop', () => {
  const expectedAudiences = ['criadores', 'marcas', 'agencias', 'midia', 'pesquisa']
  const rendered = expectedAudiences.map((audience, activeIndex) => {
    const markup = renderToStaticMarkup(React.createElement(AudienceIllustration, { activeIndex }))
    assert.match(markup, /<image[^>]+href="\/assets\/culture-hands\.jpg"/)
    assert.match(markup, new RegExp(`audience-photo-${audience}`))
    assert.match(markup, /clip-path="url\(#audience-photo-/)
    return markup.match(/clip-path="url\(#audience-photo-([^)]*)\)/)?.[1]
  })

  assert.equal(new Set(rendered).size, expectedAudiences.length)
})

test('creator photo stays inside the camera viewfinder crop', () => {
  const markup = renderToStaticMarkup(React.createElement(AudienceIllustration, { activeIndex: 0 }))

  assert.match(markup, /M67 73h116v55H67Z/)
  assert.match(markup, /<image[^>]+href="\/assets\/culture-hands\.jpg"[^>]+x="66" y="74" width="119" height="56"/)
})
