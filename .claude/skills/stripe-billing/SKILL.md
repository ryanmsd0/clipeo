---
name: stripe-billing
description: "Design and implement Stripe payments correctly: subscriptions, checkout, webhooks, idempotency, entitlements, retries, refunds."
user-invocable: true
---

# Stripe Billing + Webhooks

## Goal
Produce a Stripe integration plan that is correct under retries, webhook duplication, and partial failures.

## Rules
- Webhooks are the **source of truth**. Never trust client callbacks.
- Every webhook handler must be **idempotent** (dedupe by event id).
- Define an **entitlements model** (what the user gets) separate from Stripe objects.

## Required outputs
1) Billing model
- One-time / subscription / usage-based / marketplace (Connect)
- Trial rules, proration rules, upgrade/downgrade rules

2) Stripe objects mapping
- Products, Prices, Customers
- Checkout Sessions vs Payment Intents
- Subscriptions, Invoices
- (If marketplace) Connect Accounts, Transfers, Application Fees

3) Entitlements & state machine
- trialing → active → past_due → canceled (and grace windows)
- What changes in your DB at each transition

4) Webhooks (minimum)
- checkout.session.completed
- invoice.paid
- invoice.payment_failed
- customer.subscription.updated
- customer.subscription.deleted
- charge.refunded (if you support refunds)
Add others only if needed.

5) Idempotency strategy
- Store processed `event.id` with timestamp (unique constraint).
- Use transactions to update subscription state.
- Handle out-of-order events safely (compare timestamps / invoice periods).

6) Edge cases checklist
- Double submit / user refresh
- Payment succeeds but webhook delayed
- Refund after cancellation
- Chargeback/dispute
- Plan change mid-cycle
- User deletes account with active subscription
- Multiple subscriptions per customer (allowed? forbidden?)

7) Testing plan
- Stripe CLI to trigger events
- Test mode checkout flows
- Regression tests for webhook handlers

## Output format
- A Markdown plan + a list of endpoints + the DB tables/fields required.
