---
name: playwright-e2e
description: "Define and implement Playwright E2E flows for critical journeys (auth, onboarding, checkout, dashboards) with stable selectors."
user-invocable: true
---

# Playwright E2E Flows

## Goal
Automate browser-level verification for the highest-risk user journeys.

## When to use
- UI-heavy SaaS
- Payments / onboarding / permissions
- Before production releases

## Inputs (ask only if missing)
- App base URL (local/dev)
- Top 1–3 journeys
- Auth method (email/pass, magic link, OAuth)

## Defaults
- Use data-testid selectors
- Keep E2E suite small and stable
- Record traces on failure

## Hard rules
- No brittle selectors (no nth-child, no random classes)
- Each test must be independent (setup/teardown)
- Avoid flakiness: waits should be condition-based

## Output (must produce)
1) Test plan table (journeys → tests)
2) Playwright config recommendations
3) 3–8 core tests:
   - signup/login
   - create resource
   - permissions denial
   - checkout/subscription (if applicable)
4) CI run notes + flake triage checklist

## Quality gates
- Tests pass consistently (no “sometimes”)
- Failures are debuggable (trace/screenshot/video)