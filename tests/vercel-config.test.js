const assert = require('node:assert/strict')
const fs = require('node:fs')
const path = require('node:path')
const test = require('node:test')

const root = path.join(__dirname, '..')

test('Vercel explicitly detects the project as Next.js', () => {
  const configPath = path.join(root, 'vercel.json')
  assert.ok(fs.existsSync(configPath), 'vercel.json is missing')
  const config = JSON.parse(fs.readFileSync(configPath, 'utf8'))
  assert.equal(config.framework, 'nextjs')
})

test('Vercel upload excludes local plans, logs, generated files, and legacy static duplicates', () => {
  const ignorePath = path.join(root, '.vercelignore')
  assert.ok(fs.existsSync(ignorePath), '.vercelignore is missing')
  const patterns = new Set(fs.readFileSync(ignorePath, 'utf8').split(/\r?\n/).map((line) => line.trim()))
  for (const pattern of [
    '/.superpowers/',
    '/docs/superpowers/',
    '/__person-inspect.png',
    '/next-start*.log',
    '/tsconfig.tsbuildinfo',
    '/assets/',
    '/index.html',
    '/script.js',
    '/styles.css',
    '/tests/',
  ]) {
    assert.ok(patterns.has(pattern), `${pattern} must not be uploaded to Vercel`)
  }
})
