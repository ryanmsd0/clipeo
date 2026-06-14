---
name: authz-rbac
description: "Design authorization for SaaS: roles, permissions, multi-tenant isolation, and abuse cases."
user-invocable: true
---

# Auth + RBAC + Multi-tenant

## Output (strict)
1) Roles
- List roles (e.g., owner, admin, member, viewer)
- Who can assign which role

2) Resources
- List resources (org, project, invoice, campaign, asset, etc.)

3) Actions per resource
- create/read/update/delete + special actions (invite, publish, refund)

4) Permission matrix
A table: role × action (allow/deny)

5) Tenant isolation rules
- Every resource must have `org_id/tenant_id`
- All queries must scope by tenant
- Prevent cross-tenant access (IDOR)

6) Abuse cases (top 10) + mitigations
- privilege escalation, ID guessing, invite abuse, token replay, etc.

7) Implementation notes
- Where checks live (middleware/policies)
- Server-side enforcement only
- Audit logs for admin actions

## Rules
- Default deny.
- No “admin can do everything” without explicit listing.
- Never rely on the client to filter data.
