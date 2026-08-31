#!/usr/bin/env node
// Contract test for the pricing-CTA guard (JAR-1184 review F2).
//
// Until this file, the guard was wired into two workflows but NEVER EXECUTED
// by CI: `test:scripts` enumerates suites explicitly and this suite was
// missing, so every mutation the PR description claimed (revert to /contact,
// a drifted key, a missing PRICES block) was unverifiable. It also pins the
// backward-scan's exact boundaries - the `<a` prefix matches `<article` too,
// which is the known sharp edge (review F3) - so a formatter rearranging the
// page cannot silently change what the guard reads.
//
// Each case builds a throwaway repo skeleton: PricingPage.tsx + pricing.ts,
// then runs the guard against it via its CLI (same path CI uses).
import { mkdtempSync, writeFileSync, rmSync, mkdirSync } from 'node:fs';
import { join } from 'node:path';
import { tmpdir } from 'node:os';
import { execSync } from 'node:child_process';

const GUARD = new URL('../check-pricing-ctas.mjs', import.meta.url).pathname;

let passed = 0;
let failed = 0;
function test(name, fn) {
  try {
    fn();
    passed++;
    console.log(`  \u2713 ${name}`);
  } catch (e) {
    failed++;
    console.error(`  \u2717 ${name}\n      ${e.message}`);
  }
}

const PRICES = `export const PRICES = {
  jt_trip_pass: { amount: 4900, interval: 'one_time' },
  jt_explore_annual: { amount: 9500, interval: 'year' },
  jt_explore_monthly: { amount: 1195, interval: 'month' },
} as const;`;

function withRepo({ page, pricing = PRICES }, fn) {
  const dir = mkdtempSync(join(tmpdir(), 'ctaguard-'));
  try {
    mkdirSync(join(dir, 'src/app/pages'), { recursive: true });
    mkdirSync(join(dir, 'src/app/data'), { recursive: true });
    writeFileSync(join(dir, 'src/app/pages/PricingPage.tsx'), page);
    writeFileSync(join(dir, 'src/app/data/pricing.ts'), pricing);
    return fn(dir);
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
}

function run(dir) {
  try {
    const out = execSync(`node ${GUARD}`, { cwd: dir, encoding: 'utf8', stdio: 'pipe' });
    return { code: 0, out };
  } catch (e) {
    return { code: e.status, out: (e.stdout || '') + (e.stderr || '') };
  }
}

const assert = (c, m) => {
  if (!c) throw new Error(m);
};

const cta = (target) => `<a
  href={${target}}
  className="mt-auto self-start px-8 py-3.5 rounded-full font-semibold border"
>
  Join Now
</a>`;

const GOOD_PAGE = `import { appJoinUrl } from '../data/appLink';
export function PricingPage() {
  return (
    <div>
      <a href={appJoinUrl('jt_trip_pass')} className="px-8 py-3.5">Join Now</a>
      <a href={appJoinUrl('jt_explore_annual')} className="px-8 py-3.5">Join Now</a>
    </div>
  );
}`;

test('accepts the shipped page: both CTAs via appJoinUrl with declared keys', () => {
  withRepo({ page: GOOD_PAGE }, (d) => {
    const r = run(d);
    assert(r.code === 0, `guard failed a correct page: ${r.out}`);
    assert(/pricing CTAs OK/.test(r.out), `unexpected output: ${r.out}`);
  });
});

// MUTATION 1: the regression the guard exists for - a CTA reverted to the
// waitlist. Building, rendering, and screenshotting all stay green.
test('refuses a Join Now reverted to /contact', () => {
  withRepo({
    page: `import { Link } from 'react-router-dom';
export function PricingPage() {
  return (
    <div>
      <Link to="/contact" className="px-8 py-3.5">Join Now</Link>
    </div>
  );
}`,
  }, (d) => {
    const r = run(d);
    assert(r.code === 1, 'guard passed a CTA reverted to the waitlist');
    assert(/instead of appJoinUrl/.test(r.out), `wrong reason: ${r.out}`);
  });
});

// MUTATION 2: a literal key the catalogue does not declare - the drift case.
test('refuses a lookup key PRICES does not declare', () => {
  withRepo({
    page: GOOD_PAGE.replace("appJoinUrl('jt_explore_annual')", "appJoinUrl('jt_explore_annual_plus')"),
  }, (d) => {
    const r = run(d);
    assert(r.code === 1, 'guard passed a key that is not in PRICES');
    assert(/names a lookup key PRICES does not declare/.test(r.out), `wrong reason: ${r.out}`);
  });
});

// MUTATION 3: the vacuous pass - no catalogue, nothing to check against.
test('fails closed when PRICES declares no lookup keys', () => {
  withRepo({ page: GOOD_PAGE, pricing: 'export const PRICES = {} as const;' }, (d) => {
    const r = run(d);
    assert(r.code === 1, 'guard passed with an empty catalogue (vacuous check)');
    assert(/no lookup keys found/.test(r.out), `wrong reason: ${r.out}`);
  });
});

// MUTATION 4: the page losing its CTAs entirely must not read as clean.
test('refuses a page with no Join Now CTA at all', () => {
  withRepo({
    page: `export function PricingPage() {
  return <div>Nothing to see here</div>;
}`,
  }, (d) => {
    const r = run(d);
    assert(r.code === 1, 'guard passed a page with no CTA (vacuous check)');
    assert(/no "Join Now" CTA found/.test(r.out), `wrong reason: ${r.out}`);
  });
});

// BOUNDARY (review F3): `<article` between the anchor open and the label must
// not be read as the anchor's open tag. Locked so a future tightening or a
// formatter cannot change what the backward scan reads without this going red.
test('accepts a card-wrapped CTA (<article is not an anchor opener)', () => {
  withRepo({
    page: `import { appJoinUrl } from '../data/appLink';
export function PricingPage() {
  return (
    <div>
      <a
        href={appJoinUrl('jt_trip_pass')}
        className="px-8 py-3.5"
      >
        <article className="card">
          <span>Join Now</span>
        </article>
      </a>
    </div>
  );
}`,
  }, (d) => {
    const r = run(d);
    // The boundary-checked scan skips `<article` (not an anchor) and reads the
    // real `<a` opener with its appJoinUrl target: the card-wrapped CTA is
    // CORRECT and must pass. Pinning this the other way round - before the
    // tightening, the scan flagged it as a false positive.
    assert(r.code === 0, `guard flagged a card-wrapped CTA: ${r.out}`);
  });
});

// DIRECT-KEY: a hand-written href with a valid key bypassing appJoinUrl.
test('refuses a hand-written signup href that bypasses appJoinUrl', () => {
  withRepo({
    page: `export function PricingPage() {
  return (
    <div>
      <a href="https://app.jarvistravel.com/auth/sign-up?plan=jt_trip_pass" className="px-8 py-3.5">Join Now</a>
    </div>
  );
}`,
  }, (d) => {
    const r = run(d);
    assert(r.code === 1, 'guard passed a hand-written href bypassing appJoinUrl');
    assert(/instead of appJoinUrl/.test(r.out), `wrong reason: ${r.out}`);
  });
});

console.log(`\n${passed} passed, ${failed} failed`);
process.exit(failed ? 1 : 0);
