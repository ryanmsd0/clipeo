---
name: feature-slice
description: "Break a feature into 30–90 minute tasks with ordering, done conditions, risks, and test hooks."
user-invocable: true
---

# Feature Slice

## Goal
Turn a feature into a precise, ordered execution plan (small tasks).

## When to use
- Before implementing a feature
- When you feel “stuck” or too broad

## Inputs (ask only if missing)
- Feature description + scope (P0 only)
- Tech constraints (stack, repo structure)
- Target “demo” behavior

## Defaults
- Task size: 30–90 min
- Include test hooks and logging early

## Hard rules
- Each task must have a “Done = …” condition
- Order must reduce risk early (spike unknowns first)
- Include rollback/guardrails if the feature touches prod-critical paths

## Output (must produce)
1) Task list (ordered), each with:
   - Goal
   - Files/components touched
   - Done condition
   - Risks
2) Test plan for the feature (smoke + edge cases)
3) Rollout plan (feature flag if needed)

## Quality gates
- A developer can follow the list without re-planning mid-way
- First 20% of tasks should de-risk the hardest unknowns