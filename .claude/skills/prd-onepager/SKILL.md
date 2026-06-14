---
name: prd-onepager
description: "Turn a vague idea into an executable 1-page PRD with clear scope, risks, metrics, and acceptance criteria."
user-invocable: true
---

# PRD One-Pager

## Goal
Produce a 1-page PRD that engineering can build and product can validate.

## When to use
- Before starting any new feature/product
- When requirements are unclear or scope is drifting

## Inputs (ask only if missing)
- Target user / customer segment (ICP)
- Problem statement (what pain, for whom, now)
- Success definition (metric + timeframe)
- Constraints (deadline, stack, compliance, budget)
- Must-have vs nice-to-have

## Defaults
- MVP-first: prefer shipping within 1–2 weeks
- If unclear: propose 2–3 options and pick the simplest

## Hard rules
- No implementation details (keep it product/behavioral)
- No fluff, no “maybe”: every statement must be testable
- Explicit non-goals (what is excluded)

## Output (must produce)
1) Title + context
2) Problem + users + current alternatives
3) Goals + non-goals
4) User stories (3–8) with acceptance criteria
5) Functional requirements (P0/P1)
6) Edge cases & failure modes (at least 5)
7) Analytics/instrumentation events (3–8)
8) Risks + mitigations
9) Open questions (only if truly blocking)

## Quality gates
- A developer can build it without guessing
- A stakeholder can say “yes/no” based on the page alone