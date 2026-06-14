
name: remotion-vertical-data-motion
description: "Build and iterate a 9:16 Remotion motion design template that is fully data-driven from JSON (scenes, timing, typography, assets), including render scripts and guardrails."
user-invocable: true
---

# Remotion Vertical Data Motion (9:16)

## Goal
Create a reusable Remotion template for short-form vertical videos (9:16) driven by JSON input, with clean motion design, safe typography, and reliable rendering.

## When to use
- You want to generate many videos from structured data (titles, bullets, stats, screenshots, logo, music/voice).
- You need a consistent visual system and repeatable scene pipeline.

## Inputs (ask only if missing)
1) Target platform: TikTok / Reels / Shorts
2) Duration target: default 12s (ok to auto-scale)
3) Brand tokens: font(s), primary accent, background style (dark/light)
4) Data source shape: JSON schema (or use the default schema below)

If user does not provide details, proceed with defaults.

## Defaults
- Format: 1080x1920
- FPS: 30
- Duration: 12s
- Theme: dark
- Safe area: 120px top/bottom, 90px left/right
- Motion style: minimal, modern, smooth easing, no cheesy transitions

## Hard rules
- No absolute “magic numbers” scattered: centralize timing + theme tokens.
- No brittle text overflow: implement text-fit or multi-line clamp with fallback.
- No remote assets without caching strategy: allow both local and URL, but guard failures.
- No rendering instructions that require paid services.

---

## Output (must produce all)
1) Folder structure + key files
2) JSON schema (zod recommended) + example JSON
3) Main composition + 3–5 scenes (Intro/Title/Points/Proof/CTA)
4) A render script to render from a JSON file (single + batch)
5) A short “How to use” section with exact commands

---

## Recommended project structure
Create/ensure this structure:

/src
  /compositions
    Main.tsx
  /scenes
    Intro.tsx
    Title.tsx
    Points.tsx
    Proof.tsx
    Outro.tsx
  /components
    SafeArea.tsx
    TitleBlock.tsx
    ProgressBar.tsx
    LogoBug.tsx
  /style
    theme.ts
    typography.ts
  /data
    schema.ts
    example.json
  /utils
    timing.ts
    textFit.ts
    assets.ts
/scripts
  render-from-json.ts

---

## JSON schema (baseline)
Design a schema like:

meta: { fps, width, height, durationSec, brand }
style: { theme, accent, font }
content: {
  hook, title, subtitle?,
  points: [{ label?, text }],
  proof?: { stat?, screenshotUrl? },
  cta,
  logoUrl?,
  bgVideoUrl?,
  musicUrl?,
  voiceUrl?
}

Validate strictly and provide helpful error messages.

---

## Scene timeline (baseline 12s)
- 0.0–1.5s: Intro hook (big, punchy)
- 1.5–3.0s: Title (clean, readable)
- 3.0–9.0s: Points (3 points x ~2s) with progress indicator
- 9.0–11.0s: Proof (stat or screenshot) optional
- 11.0–12.0s: CTA + logo bug

If points length != 3, auto-scale segment durations.

---

## Motion design guidelines
- Prefer opacity + translateY + subtle scale (1.00–1.03) over flashy effects.
- Use consistent easing and a single motion “language” across scenes.
- Keep typography readable: line height, tracking, max lines, safe margins.
- Avoid layout shifts: measure text, clamp, or shrink font in a predictable way.

---

## Implementation checklist
1) Main composition reads JSON props (or loads from file for preview).
2) schema.ts validates props at runtime (zod).
3) theme.ts centralizes colors and spacing.
4) timing.ts centralizes frame ranges per scene.
5) textFit.ts prevents overflow (fallback to clamp + smaller font).
6) assets.ts handles local vs URL and missing-asset fallback.
7) render-from-json.ts supports:
   - `--input path/to.json`
   - `--out out.mp4`
   - batch folder mode `--dir data/inputs`

---

## Testing / QA (must do)
- Render example.json successfully (no runtime errors)
- Test long strings (hook/title/points) → no overflow
- Test missing optional assets (logo/music/bg) → graceful fallback
- Confirm safe area compliance (no text near edges)

---

## How to respond
- Start by generating the files + code with minimal commentary.
- Provide exact commands to run dev preview and render mp4.
- Keep changes incremental: if files exist, modify them instead of rewriting everything.