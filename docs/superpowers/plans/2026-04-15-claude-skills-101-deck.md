# Claude Skills 101 Deck Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Fill the existing `decks/claude-skills-101/` stub with slide content for a 15-minute lunch-and-learn, wrapped around a live demo.

**Architecture:** Pure Reveal.js edit — all slide content lives in `decks/claude-skills-101/index.html` as `<section>` elements inside `.reveal .slides`. No JS changes, no per-slide CSS beyond one or two tweaks for emphasis. Uses the existing dracula theme.

**Tech Stack:** Reveal.js 5.x, Vite, plain HTML/CSS. No build-time content generation.

**Note on granularity:** Slide decks aren't TDD-shaped — there are no unit tests to fail-then-pass. "Verification" here is visual: run `bun run dev`, open the deck, walk the slides. The plan keeps tasks small and commits frequent, but replaces the red/green/commit loop with a write/visually-verify/commit loop.

---

### Task 1: Replace stub with all nine Part-1-and-Part-2 sections

**Files:**
- Modify: `decks/claude-skills-101/index.html` (replace the single stub `<section>` inside `.slides` with the full slide set)

- [ ] **Step 1: Replace the slides block with the full deck**

Open `decks/claude-skills-101/index.html` and replace the existing `<div class="slides">…</div>` contents with:

```html
      <!-- 1. Title -->
      <section>
        <h1>Claude Skills 101</h1>
        <p>Rick Whalley</p>
        <p><small>Lunch &amp; Learn · April 2026</small></p>
      </section>

      <!-- 2. The hook -->
      <section>
        <h2>Skills are the cheapest piece of harness investment.</h2>
        <p class="fragment">And the one most people still haven't touched.</p>
      </section>

      <!-- 3. What a skill actually is -->
      <section>
        <h2>What is a skill?</h2>
        <ul>
          <li>A markdown file.</li>
          <li>Frontmatter says <em>when</em> it fires.</li>
          <li>Body says <em>what to do</em> when it does.</li>
        </ul>
        <p class="fragment"><strong>That's it.</strong> No runtime. No SDK. No compile step.</p>
      </section>

      <!-- 4. The two insights -->
      <section>
        <h2>Two things separate good skills from bad</h2>
        <ol>
          <li>
            <strong>Description is a classifier, not documentation.</strong><br />
            <small>Lead with the trigger phrases. Write for the model, not the reader.</small>
          </li>
          <li>
            <strong>Body is a runbook, not an explanation.</strong><br />
            <small>Imperative. Numbered. Concrete commands. Explicit "do not" clauses.</small>
          </li>
        </ol>
      </section>

      <!-- 5. Best practices -->
      <section>
        <h2>Rules of thumb</h2>
        <ul>
          <li>One skill, one job.</li>
          <li>Keep <code>SKILL.md</code> under ~500 lines.</li>
          <li>Progressive disclosure — references in sibling files, loaded on demand.</li>
          <li>Templates go in files, not in prose.</li>
          <li>Lead the description with explicit trigger phrases.</li>
          <li>Two smells: <em>never fires</em> → fix the description. <em>Fires but ignored</em> → shorten and make it concrete.</li>
        </ul>
      </section>

      <!-- 6. Demo marker -->
      <section data-background-color="#282a36">
        <h2>Let's build one →</h2>
        <p><small>Live demo</small></p>
      </section>

      <!-- 7. Where skills live -->
      <section>
        <h2>Where skills live</h2>
        <table>
          <thead>
            <tr><th>Location</th><th>Scope</th><th>Use for</th></tr>
          </thead>
          <tbody>
            <tr>
              <td><code>~/.claude/skills/</code></td>
              <td>Personal</td>
              <td>Your habits — commits, debugging, shortcuts</td>
            </tr>
            <tr>
              <td><code>.claude/skills/</code></td>
              <td>Project (in git)</td>
              <td>Team conventions — review, deploy, glossary</td>
            </tr>
            <tr>
              <td>Plugin-provided</td>
              <td>Installed packs</td>
              <td>Third-party skill collections</td>
            </tr>
          </tbody>
        </table>
        <p class="fragment"><small>The project tier is where the leverage is. Checked in, reviewed, inherited by everyone — including every future session.</small></p>
      </section>

      <!-- 8. Why this compounds -->
      <section>
        <h2>The investment that compounds</h2>
        <ul>
          <li>Plain markdown. No runtime, no lock-in.</li>
          <li>Survives harness changes. Survives model changes.</li>
          <li>Institutional memory as a file tree.</li>
        </ul>
        <p class="fragment">The most <em>portable</em> piece of harness investment you can make.</p>
      </section>

      <!-- 9. Start with one -->
      <section>
        <h2>Start with one.</h2>
        <p>Pick the most boring, repetitive thing you did this week.</p>
        <p>Write a skill for it by Friday.</p>
        <p style="margin-top: 2em;">
          <small>Longer version: <a href="https://fourohfour.dev/insights/claude-skills-101">fourohfour.dev/insights/claude-skills-101</a></small>
        </p>
      </section>
```

- [ ] **Step 2: Start the dev server (if not already running) and visually verify**

Run: `bun run dev`
Open the deck at `http://localhost:5173/decks/claude-skills-101/index.html`

Walk through all nine slides with the arrow keys. Check:
- Title slide renders.
- Hook slide's fragment ("And the one most people still haven't touched.") reveals on the second press.
- "What is a skill?" bullets read cleanly; "That's it." is a fragment.
- Two-insights slide is scannable — two items, not a wall of text.
- Rules-of-thumb list fits on one screen without needing scroll at presenter resolution.
- Demo-marker slide is visually distinct (darker background).
- Hierarchy table renders legibly (see Task 2 if it doesn't).
- Compounds slide's punchline reveals as a fragment.
- CTA slide shows the blog-post URL.

- [ ] **Step 3: Commit**

```bash
git add decks/claude-skills-101/index.html
git commit -m "$(cat <<'EOF'
feat(claude-skills-101): fill deck with 15-min lunch-and-learn content

Nine slides wrapped around a live-demo beat: hook, anatomy, two insights,
best practices, demo marker, hierarchy, durability argument, CTA.
EOF
)"
```

---

### Task 2: Tidy table rendering on the hierarchy slide (only if Step 2 flagged it)

Reveal.js's default table styles can be cramped inside a slide. If the hierarchy slide looked fine during visual verification, **skip this task entirely**.

**Files:**
- Modify: `decks/claude-skills-101/style.css`

- [ ] **Step 1: Add table rules scoped to this deck**

Append to `decks/claude-skills-101/style.css`:

```css
.reveal table {
  font-size: 0.7em;
  margin: 0 auto;
}

.reveal table th,
.reveal table td {
  padding: 0.4em 0.8em;
  border-bottom: 1px solid #44475a;
}

.reveal table code {
  font-size: 0.9em;
}
```

- [ ] **Step 2: Reload the deck and re-verify the hierarchy slide**

Hard-reload `http://localhost:5173/decks/claude-skills-101/index.html` and navigate to slide 7. The table should now breathe, with clear column separation and readable `code` spans.

- [ ] **Step 3: Commit**

```bash
git add decks/claude-skills-101/style.css
git commit -m "$(cat <<'EOF'
style(claude-skills-101): scope table rules for hierarchy slide
EOF
)"
```

---

### Task 3: Presenter dry-run pass

**Files:** none — this is a review task.

- [ ] **Step 1: Read the deck out loud at presenter pace**

With the deck open, read each slide as you would present it. Time yourself loosely. The target is ~4 minutes for slides 1–6 (part 1 + demo marker) and ~3 minutes for slides 7–9 (close). If any slide takes > 45 seconds of talking, either the slide is too dense or you're padding — decide which and note it.

- [ ] **Step 2: Flag any content issues back to the user**

If any slide reads awkwardly, feels redundant with the demo, or has a claim you'd want to soften, stop here and surface it rather than editing silently. The writer (Rick) should make final wording calls.

- [ ] **Step 3: If no issues, report done**

No commit — nothing changed.

---

## Self-Review

**Spec coverage:** All nine slides in the spec map to sections in Task 1 (title → 1, hook → 2, what-it-is → 3, two insights → 4, best practices → 5, demo marker → 6, hierarchy → 7, compounds → 8, CTA with blog-post link → 9). CTA includes the `fourohfour.dev/insights/claude-skills-101` URL the user asked for.

**Placeholder scan:** All HTML content is concrete. No TBDs. The only conditional task (Task 2) is explicitly gated on a visual check from Task 1.

**Type consistency:** N/A — no code types in play. Class names used (`.reveal table`, `.fragment`, `data-background-color`) match Reveal.js 5.x conventions.

**Scope:** Single deck, single repo area, three small tasks. No decomposition needed.
