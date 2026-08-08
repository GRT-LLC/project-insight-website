# Security & Robustness Review — JarvisTravel Marketing Website

**Review date:** July 21, 2026  
**Scope:** All source files in src/  
**Categories:** XSS injection, data leakage, legal overclaiming, input validation, FTC/GDPR compliance

---

## 1. XSS Injection Vectors (via user-facing copy)

**Risk level: LOW**

### Findings

All pages use React JSX which auto-escapes dynamic content. No dangerouslySetInnerHTML found anywhere.

AppDashboard.tsx:17 renders {user?.name} — React auto-escapes, but if a real backend feeds controlled data here later, escaping must be preserved.

ContactPage.tsx: Form data is never rendered back to user on submit (just sets submitted=true).

ForgotPasswordPage.tsx: 8-digit code input is digit-constrained via regex.

### Recommendation
Zero changes needed for current SPA. Document that no dangerouslySetInnerHTML must ever be introduced for user content.

---

## 2. Data Leakage / Over-disclosure in Privacy & Security Copy

**Risk level: MEDIUM**

### Findings
- PrivacyPage.tsx: Mentions collecting payment info without clarifying storage vs. PCI-compliant processor
- DataSecurityPage.tsx: Claims PCI DSS Compliant — critical if not actually certified
- DataSecurityPage.tsx: Claims regular third-party audits — false if none conducted
- FeaturesPage.tsx: Claims End-to-end encryption, 2FA, privacy controls — product has no backend
- PrivacyPage.tsx: Claims bank-level encryption (AES-256) and TLS 1.3 — unverifiable for pre-launch

### Data Collected: Stated vs. Actual
Stated: Account info, travel preferences, trip history, payment info, name, email
Actual: Nothing collected (no backend, forms submit nowhere)

### Recommendations
1. Remove PCI DSS Compliant unless certified
2. Remove or qualify End-to-end encryption (E2E incompatible with AI processing)
3. Qualify third-party audits as planned/targeting
4. Separate current vs. target security posture in copy

---

## 3. Overclaiming in Legal & Marketing Text

**Risk level: HIGH**

### FTC False Advertising Concerns

#### 3a. Fabricated Social Proof (HomePage)
Stats: 50K+ Happy Travelers, 120+ Countries, 4.9 App Rating
Named testimonials: Sarah Chen, Marcus Johnson, Elena Rodriguez — all fabricated
FTC Endorsement Guides (16 CFR Part 255) prohibit fabricated reviews
CRITICAL: Must be removed or labeled as mockups before public launch

#### 3b. Patent Pending Claim (HomePage, FeaturesPage)
Requires actual filed USPTO application. Verify filing status. Remove if not filed.

#### 3c. Bank-Level Encryption
Vague marketing term. Recommend specific claims: AES-256 at rest, TLS 1.3 in transit.

#### 3d. Pricing Page
Lists specific pricing (.99-9.99/mo) — no billing system exists.
Recommend adding Prices subject to change disclaimer.

#### 3e. Data Rights Claims
You can export, modify, or delete your data at any time — no account settings exist.
Recommend framing as future capabilities until implemented.

### Terms of Service Review
Good: Not a travel agency disclaimer correctly shields liability.
Missing: Limitation of liability, arbitration, class action waiver, DMCA section, termination clause.

---

## 4. Input Validation Gaps

**Risk level: MEDIUM**

### Findings
SignUpPage: Email gets browser-level type=email only, no regex
SignUpPage: Password checks length >= 8, no complexity rules
SignUpPage: Names have no length limits or character restrictions
SignInPage: Password checks length >= 6 (inconsistent with SignUp's 8)
ContactPage: Name/Message have no limits; form does nothing on submit (TODO)
ForgotPasswordPage: Email field has no type=email, no validation
ForgotPasswordPage: Code inputs: digit-only regex (good)
ForgotPasswordPage: New password: length >= 8 only

### Cross-Cutting Issues
- No input trimming
- No honeypot fields for bot detection
- No password strength meter
- No email confirmation step
- Inconsistent password length: 8 on signup, 6 on signin

### Recommendations
1. Align password requirements (use >= 8 for both)
2. Add email regex validation on all email fields
3. Add type=email to ForgotPassword email field
4. Add maxlength constraints (Name: 100, Email: 254, Message: 5000)
5. Add password complexity rules (1 upper, 1 lower, 1 digit)
6. Trim all text inputs before submission

---

## 5. Compliance Concerns (FTC, GDPR, CCPA)

**Risk level: HIGH**

### 5a. FTC Deceptive Advertising
CRITICAL: Fabricated testimonials and stats
Critical: Patent Pending without filing
Critical: PCI DSS Compliant claim
High: End-to-end encryption claim
High: Regular third-party audits claim
Critical: App Rating 4.9 with no app
Critical: 50K+ Happy Travelers with no users

### 5b. GDPR (EU Privacy Law)
Missing: Lawful basis for processing
Missing: Data retention periods
Weak: Right to erasure (mentioned but no process)
Weak: Data portability (mentioned but no mechanism)
Missing: Right to rectification
Missing: Automated decision-making/profiling disclosure
Missing: International data transfer safeguards
Missing: Data Protection Officer contact
Missing: Marketing consent mechanism
Missing: Cookie consent banner and policy
Missing: Privacy by design/default
Missing: Data breach notification procedure
Missing: Children's data protections

GDPR fine exposure: Up to EUR 20M or 4% of global annual turnover.

### 5c. CCPA (California)
Partial: Right to know / Right to delete
Missing: Do Not Sell My Personal Information link
Missing: Service provider agreements disclosure

### 5d. Other Gaps
- No cookie policy page (footer links to /privacy which lacks cookie content)
- No SSL/HTTPS enforcement in app code (verify at CDN level)
- No data processing agreement mention for third-party processors

---

## Summary Risk Matrix

XSS Injection: LOW — No changes needed
Data Overclaiming: MEDIUM — Remove PCI DSS, qualify E2E encryption
Legal Overclaiming: HIGH — Remove fabricated testimonials/stats; verify patent
Input Validation: MEDIUM — Align password rules, add email regex, maxlengths
FTC Compliance: HIGH — Remove fake reviews/stats; remove unverified claims
GDPR Compliance: HIGH — Privacy policy critically under-developed
CCPA Compliance: MEDIUM — Add Do Not Sell My Info link

## Top 5 Critical Fixes (Pre-Launch Blockers)

1. Remove fabricated testimonials and stats from HomePage (50K+ travelers, 4.9 rating, named reviews) — FTC violation
2. Remove or verify PCI DSS Compliant claim — false without certification
3. Remove or verify Patent Pending claim — cannot claim without filing
4. Remove End-to-end encryption from FeaturesPage — incompatible with AI service architecture
5. Expand Privacy Policy to meet GDPR minimums: lawful basis, retention, DPO, data subject rights, international transfers, cookie policy

---

Static code analysis of marketing website SPA (React/TypeScript). Backend systems, deployment infrastructure, and actual data handling outside scope. Verify claims with engineering and legal teams before public launch.
