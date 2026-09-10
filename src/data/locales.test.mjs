// node src/data/locales.test.mjs
// Guards the one invariant that fails silently in production: a key present in one
// locale and missing in the other renders `undefined` with no error.
import assert from 'node:assert'
import { readFileSync } from 'node:fs'

const load = f => JSON.parse(readFileSync(new URL(f, import.meta.url)))
const en = load('./profile.en.json')
const pt = load('./profile.pt.json')

const paths = (o, p = '') =>
  o === null || typeof o !== 'object' ? [p] : Object.keys(o).flatMap(k => paths(o[k], `${p}.${k}`))

assert.deepStrictEqual(paths(en).sort(), paths(pt).sort())

// cvLinks are URLs, not prose — they must be byte-identical across locales.
assert.deepStrictEqual(en.about.cvLinks, pt.about.cvLinks)
assert.deepStrictEqual(en.contact, pt.contact)

console.log('locales ok —', paths(en).length, 'leaves in both')
