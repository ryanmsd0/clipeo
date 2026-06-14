---
name: api-contracts
description: "Define API contracts (REST/JSON): endpoints, payloads, validation, errors, pagination, and versioning."
user-invocable: true
---

# API Contracts + Error Handling

## Goal
Specify a consistent API that frontend and backend can implement without drift.

## When to use
- Before implementing API routes
- When multiple clients consume the backend

## Inputs (ask only if missing)
- Resource list (entities)
- Auth model (sessions/JWT)
- Client types (web/mobile/admin)

## Defaults
- RESTful routes
- JSON only
- Cursor pagination for lists

## Hard rules
- Consistent error shape
- Validation on every input
- Never leak sensitive fields

## Output (must produce)
1) Endpoint table:
   - Method + path
   - Auth required
   - Request body/query
   - Response shape
   - Error codes
2) Global conventions:
   - Pagination
   - Sorting/filtering
   - Error format
   - Idempotency (where needed)
3) OpenAPI sketch (optional but recommended)

## Quality gates
- Frontend can be built from this alone
- Error handling is predictable across endpoints