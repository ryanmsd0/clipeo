---
name: security-baseline
description: "Minimum-viable web security checklist for SaaS and marketplaces (XSS/CSRF/SSRF, uploads, auth, rate limits, secrets, headers)."
user-invocable: true
---

# Web Security Baseline

Treat security as a **product requirement**. Assume hostile input, bots, and abuse.

## 1) Input & Output
- Validate **at boundaries** (API layer): type, length, format, allowed values.
- Reject unknown fields (strict schemas).
- Encode output for the target context (HTML/URL/JS/CSS) — never raw interpolation.

## 2) AuthN / Sessions
- Use **httpOnly + secure + sameSite** cookies for sessions when possible.
- Never trust client claims (role, plan, subscription) without server verification.
- Rotate and expire tokens; store refresh tokens securely.

## 3) AuthZ / Multi-tenant Isolation
- Default deny. Authorization on **every** server route and DB query.
- Always scope by `tenant_id`/`org_id` at the DB layer.
- Prevent IDOR: never allow reading/writing by predictable IDs without checking ownership.

## 4) XSS / Injection
- Avoid `dangerouslySetInnerHTML`.
- Sanitize rich text with a proven sanitizer if you must support HTML.
- Use parameterized queries / ORM safely; no string-built SQL.

## 5) CSRF
- If cookie-based auth: CSRF protection (sameSite + CSRF token for state-changing requests).
- Use POST/PUT/PATCH/DELETE for mutations; block state changes via GET.

## 6) SSRF
- For any URL fetch/upload-by-URL: allowlist domains, block private IP ranges, enforce timeouts.
- Never let user-controlled URLs reach internal networks/metadata endpoints.

## 7) File Uploads
- Enforce: max size, allowed mime/types, content sniffing, virus scan if needed.
- Store uploads out of the web root; serve via signed URLs or proxy.
- Strip EXIF for images if privacy matters.

## 8) Rate limiting / Abuse
- Rate limit: auth endpoints, signup, password reset, webhooks, expensive searches.
- Add bot friction where needed (email verification, captcha for abuse only).
- Audit logs for admin actions + permission changes.

## 9) Secrets & Config
- Never commit secrets. Use env vars + secret manager where possible.
- Separate dev/staging/prod credentials.
- Lock down third-party API keys by origin/IP when available.

## 10) Security Headers (baseline)
- CSP (at least script-src 'self' + no unsafe-inline if possible)
- HSTS (prod)
- X-Content-Type-Options: nosniff
- Referrer-Policy: strict-origin-when-cross-origin
- Permissions-Policy: minimal

## 11) Webhooks
- Verify signature.
- Idempotent handlers (dedupe by event id).
- Constant-time compare for secrets, strict timestamp tolerance.

## Output requirement for any implementation plan
When asked to build a feature, always include:
- Top 5 abuse cases + mitigations
- Any new PII stored + retention policy
- Rate-limit strategy if the endpoint is public
