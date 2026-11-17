#!/usr/bin/env node
/*
 * Pre-compiles the JSX in each page so browsers don't have to run Babel.
 *
 *   node build.js           compile every page in this folder
 *   node build.js --check   report pages that are out of date (exit code 1), change nothing
 *
 * Needs Node.js only: it uses the Babel copy in vendor/, no npm install.
 *
 * How it works, per .html file in this folder:
 *   - A <script type="text/babel"> block (for example a freshly uploaded page) is moved
 *     into src/<page-name>.jsx, and the page gets the compiled JavaScript in its place.
 *   - A block already built from src/ (<script data-jsx-source="src/...">) is rebuilt from
 *     that file, so to change a page you edit src/<page-name>.jsx and run this again.
 *   - The <script src="vendor/babel.min.js"> tag is removed: pages no longer load Babel.
 */
'use strict';
const fs = require('fs');
const path = require('path');

const ROOT = __dirname;
const SRC = path.join(ROOT, 'src');
const Babel = require(path.join(ROOT, 'vendor', 'babel.min.js'));

// Same presets and plugins Babel uses for <script type="text/babel"> in the browser,
// but aimed at current browsers instead of old ES5 ones.
const BABEL_OPTIONS = {
  presets: ['react', ['env', { targets: 'defaults' }]],
  plugins: ['transform-class-properties', 'transform-object-rest-spread', 'transform-flow-strip-types'],
  compact: false,
  comments: true,
};

const BABEL_TAG = /[ \t]*<script src="vendor\/babel\.min\.js"><\/script>[ \t]*\r?\n?/g;
const RAW_BLOCK = /<script type="text\/babel">([\s\S]*?)<\/script>/;
const BUILT_BLOCK = /<script data-jsx-source="([^"]+)">[\s\S]*?<\/script>/;

const check = process.argv.includes('--check');

function slug(file) {
  return path.basename(file, '.html').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
}

function compile(jsx, srcRel) {
  const code = Babel.transform(jsx, { ...BABEL_OPTIONS, filename: srcRel }).code;
  // Keep the code from closing its own <script> tag early. "<\/" means the same as "</" in JavaScript.
  const safe = code.replace(/<\/(script)/gi, '<\\/$1').replace(/<!--/g, '<\\!--');
  return `<script data-jsx-source="${srcRel}">\n` +
    `/* Built from ${srcRel} by build.js. Edit that file and run "node build.js"; do not edit this block. */\n` +
    safe + '\n</script>';
}

let stale = 0, built = 0;
for (const file of fs.readdirSync(ROOT).filter(f => f.endsWith('.html')).sort()) {
  const full = path.join(ROOT, file);
  const html = fs.readFileSync(full, 'utf8');
  let out = html.replace(BABEL_TAG, '');
  let srcRel = null, jsx = null;

  const raw = out.match(RAW_BLOCK);
  if (raw) {
    srcRel = `src/${slug(file)}.jsx`;
    jsx = raw[1].replace(/^\r?\n/, '');
  } else {
    const done = out.match(BUILT_BLOCK);
    if (done) {
      srcRel = done[1];
      const srcFull = path.join(ROOT, srcRel);
      if (!fs.existsSync(srcFull)) { console.error(`${file}: missing ${srcRel}`); process.exitCode = 1; continue; }
      jsx = fs.readFileSync(srcFull, 'utf8');
    }
  }
  if (out === html && !jsx) continue; // plain page, nothing to do

  if (jsx) {
    let block;
    try { block = compile(jsx, srcRel); }
    catch (e) { console.error(`${file}: ${e.message}`); process.exitCode = 1; continue; }
    out = out.replace(raw ? RAW_BLOCK : BUILT_BLOCK, () => block);
  }
  const srcFull = srcRel && path.join(ROOT, srcRel);
  const srcChanged = raw && (!fs.existsSync(srcFull) || fs.readFileSync(srcFull, 'utf8') !== jsx);

  if (out === html && !srcChanged) continue;
  if (check) { console.log(`out of date: ${file}`); stale++; continue; }
  if (raw) { fs.mkdirSync(SRC, { recursive: true }); fs.writeFileSync(srcFull, jsx); console.log(`saved source: ${srcRel}`); }
  fs.writeFileSync(full, out);
  console.log(`built: ${file}`);
  built++;
}

if (check) {
  if (stale) { console.log(`${stale} page(s) need "node build.js".`); process.exitCode = 1; }
  else if (!process.exitCode) console.log('All pages are up to date.');
} else if (!built && !process.exitCode) {
  console.log('Nothing to build: all pages are up to date.');
}
