# Claude Skills 101 — Deck Design

## Context

A 15-minute internal lunch-and-learn for an AI-competent audience: devs who already use Claude Code but haven't written a skill. Source material is Rick's blog post at `fourohfour.dev/insights/claude-skills-101`. Deck lives at `decks/claude-skills-101/` (already scaffolded via the `new-deck` skill).

## Goal

Audience walks out able to — and motivated to — write their first skill this week. Tactical, not organisational.

## Format

- Two deck segments wrapped around a live demo.
- Part 1: framing + best-practices setup (~4 min).
- Live demo: build a skill together, likely using `skill-creator` (~7 min).
- Part 2: close — hierarchy, durability argument, CTA (~3 min).
- Total ~14 min + buffer.

## Slide Outline

**Part 1 — Setup**

1. **Title** — "Claude Skills 101", author, date.
2. **The hook** — one claim: skills are the cheapest piece of harness investment, and the one most people still haven't touched. No scene-setting on harnesses or LLMs.
3. **What a skill actually is** — markdown file, frontmatter + body, no runtime. Deliberately anticlimactic; the "that's it" is the point.
4. **The two insights** — the single most load-bearing slide. Two bullets:
   - Description = classifier, not documentation. Lead with trigger phrases.
   - Body = runbook, not explanation. Imperative, numbered, concrete.
5. **Best practices** — scannable list of 5–6 rules (one skill one job, ~500 lines, progressive disclosure, templates in files, the two smells). Designed to be screenshotted.

**→ Live demo**

**Part 2 — Close**

6. **Where skills live** — hierarchy table: personal (`~/.claude/skills/`), project (`.claude/skills/`), plugin. Deliberately placed *after* the demo so it lands concretely.
7. **Why this is the investment that compounds** — durability argument: plain markdown, survives harness changes, institutional memory as a file tree.
8. **Start with one** — CTA: "pick the most boring repetitive thing you did this week, write a skill for it by Friday." Includes link to the full blog post at `fourohfour.dev/insights/claude-skills-101` for anyone who wants more depth.

## Non-Goals

- No `skill-creator` dedicated slide — it emerges in the demo.
- No progressive-disclosure concept slide — it's one bullet in best practices.
- No `semantic-commits` code example on slides — the live demo replaces it.
- No "what is a harness" / "what is an LLM" framing.

## Implementation Notes

- Uses the existing stub at `decks/claude-skills-101/` created by the `new-deck` skill.
- Reveal.js vertical sections are a good fit for the two-bullet "insights" slide and the best-practices list — drill-down if there's audience interest.
- The demo beat should be signposted on the last slide of Part 1 with a clear "→ demo" marker so the presenter can pivot cleanly.
- Keep slide text sparse: an AI-competent audience doesn't need the body-copy version of the blog post on screen.
