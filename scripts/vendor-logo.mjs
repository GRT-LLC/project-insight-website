// Re-vendor the brand marks from a design-library checkout into brand/logo/.
//
// The marks are the design library's, not this repo's — see brand/logo/PROVENANCE.md
// for why a copy exists here at all. This script is the only sanctioned way to
// update that copy, because it also rewrites the pinned upstream commit; hand-copying
// the SVGs leaves the pin lying about which revision they came from.
//
//   DESIGN_LIBRARY=../design-library npm run logo:vendor
//   npm run logo:gen
import { readFileSync, writeFileSync, existsSync, copyFileSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const lib = process.env.DESIGN_LIBRARY;

if (!lib) {
  console.error('Set DESIGN_LIBRARY to a design-library checkout, e.g.\n' +
    '  DESIGN_LIBRARY=../design-library npm run logo:vendor');
  process.exit(1);
}

const src = resolve(lib, 'brand/logo/normalized');
if (!existsSync(src)) {
  console.error(`No marks at ${src}.\n` +
    'The normalized marks live on design-library PR #2 and are not on main yet.');
  process.exit(1);
}

for (const mark of ['lockup', 'wordmark', 'icon']) {
  const file = `jarvistravel-${mark}-current.svg`;
  copyFileSync(resolve(src, file), resolve(ROOT, 'brand/logo', file));
  console.log(`vendored ${file}`);
}

// Re-pin. A copy whose provenance says the wrong commit is worse than no note.
const sha = execFileSync('git', ['-C', lib, 'rev-parse', 'HEAD'], { encoding: 'utf8' }).trim();
const today = new Date().toISOString().slice(0, 10);
const doc = resolve(ROOT, 'brand/logo/PROVENANCE.md');
const updated = readFileSync(doc, 'utf8')
  .replace(/\| Upstream commit \| `[0-9a-f]+` \|/, `| Upstream commit | \`${sha}\` |`)
  .replace(/\| Vendored on \| [\d-]+ \|/, `| Vendored on | ${today} |`);
writeFileSync(doc, updated);
console.log(`pinned upstream ${sha.slice(0, 8)} (${today}) — now run: npm run logo:gen`);
