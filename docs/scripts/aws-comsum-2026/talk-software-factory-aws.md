# The Software Factory — AWS Consumer Summit, Exec & Leadership Track

**Audience:** Technology and business leadership from AWS customers, all industries
**Format:** Single talk, no demo
**Runtime:** Under 20 minutes. Slide stamps are a guide at 130 words a minute, not a target.
**Headline argument:** AI coding tools give you speed. A factory gives you speed you can govern. The meta-repo is what makes the factory work at the scale of a system.

---

## 1 — The problem

*[Slide 1 (0:00–0:10): title card. Talk title, name, one line of credential-free context. Dark, plain.]*

*[Slide 2 (0:10–2:00): "Individually impressive. Collectively ungoverned." Visual: a grid of twelve small pull-request tiles, every one with a green tick. Each tile is drawn in a slightly different style: different logging shape, different error handling, different endpoint pattern. Individually each looks fine. As a grid they clearly don't match. Build: the tiles land one at a time with their ticks as the slide opens, no click needed; the headline drops in over them as I say the line.]*

Every engineering organisation in this room has AI coding tools in the hands of its developers by now. And I'd guess most of you have seen the same two things.

The first is the demo moment. A developer shows you a function written in seconds or a test suite generated from existing code. It is impressive. It's real.

The second thing is silent and takes longer to show up. A new endpoint that's patterned differently from the rest of the service. A pull request that passes every test and violates three architecture decisions your teams spent months agreeing. Logs that leak customer data because nobody told the tool that was a rule. The tool didn't know. Left alone, it can't know. Every session starts from zero, with no memory of your standards, your security posture, your architecture, or what the last ten services look like.

What you've actually built is a workshop. A room full of very good craftspeople, each working fast, each to their own pattern. Every piece that leaves the bench is good. No two of them match.

So at the level of an individual developer, you get speed. At the level of an organisation, every piece is impressive on its own but the whole doesn't hold together. It's inconsistent. It's hard to audit. It's disconnected from the standards you actually care about. Individually impressive. Collectively ungoverned.

And that's the gap I want to talk about. Not whether these tools are fast. They are. Whether you can govern that speed across a whole organisation.

---

## 2 — The factory insight

*[Slide 3 (2:00–3:25): "The standard travels with the tooling." Visual: two horizontal pipelines stacked. Top: a familiar CI pipeline, commit → lint → test → build → deploy, with the lint stage highlighted and a caption "nobody remembers to run this; it just runs". Bottom: the agentic equivalent, drawn with the same six stations slide 4 uses so that slide 4 reads as a closer look at this line: foundations → analyse → design → build → verify → operate, with three labelled inputs feeding into the build station from above: ADRs, security constraints, testing strategy. Build: the top pipeline first while I talk about CI; the bottom one appears when I say "that is exactly the move we've made"; the three inputs drop in as I name them.]*

The question we started with a little over a year ago was this. We had the craftspeople. What would it take to get the consistency of a factory without slowing them down?

Not factory in the sense of rigid or bureaucratic. Factory in the engineering sense. Opinionated tooling. An ordered process. Quality standards built into the machines themselves rather than held in the operator's memory.

You already run one of these. Think about a CI pipeline. Nobody asks engineers to remember to run the linter. Nobody puts it on a checklist. It's wired in, it runs every time, for everyone, and it enforces the same standard. The standard travels with the tooling.

That is exactly the move we've made for AI-assisted delivery. Your architecture decisions, your security constraints, your testing strategy: instead of documents that a developer might read and a tool will never see, they become behaviour the agent actually exhibits. Contract-first ordering isn't a wiki page — it's the order the build step follows. No customer data in logs isn't a code review comment — it's a constraint injected into every single build.

---

## 3 — Where Kiro stops, and where the factory starts

*[Slide 4 (3:25–5:50): the coverage map. Visual: a single horizontal production line with six phases as stations: Foundations, Analyse, Design, Agentic Build, Verify, Operate. Left of the line, small icons for where the business lives: a policy document, a product requirement, a Jira epic. Right of the line, a single "verified, deployable increment" marker. Build in three steps: the bare line first; then a band labelled "Kiro" over Design and Agentic Build when I say "maps onto the middle of our production line"; then a wider band labelled "the harness" spanning all six when I say "but look at the two ends of the line". The two uncovered ends should be visibly the largest part of the picture before the harness band arrives.]*

We've built a harness around Kiro. When I say the harness, I mean the layer we've built around the agent: the skills, the hooks, steering and the gates that turn a coding tool into a production line. Six stations: foundations, analyse, design, build, verify, operate. Engineers drive it from the Kiro CLI or the Kiro IDE. The choice is theirs, and the harness is the same either way. I want to separate what Kiro gives you out of the box from what we've added.

Kiro's core idea is spec-driven development: requirements, design, tasks, in that order, before any code. It's the right idea, and it maps onto the middle of our production line. Specs cover design. The agent covers build. Steering files carry your standing context. Hooks let you automate behaviour at specific moments. It's a good substrate, and it's why we chose it.

But look at the two ends of the line.

On the left, before the spec, is where the business lives. Somebody has a policy document or a product requirement, maybe even just a conversation with a stakeholder. Getting from there to a specification precise enough to delegate a build from is real work: decomposing into epics and features, generating acceptance criteria at every level, checking the spec for coverage and coherence before anyone designs anything. Kiro generally works on one feature, one spec, one service at a time. It doesn't take a user journey and carry it across a system of services. The harness does. A skill that elaborates business requirements into acceptance criteria. A scorecard that checks whether a spec is ready to build from. 

Testing moves left with it too. The functional and non-functional test scenarios are derived from those acceptance criteria before a line of code exists. Not written after the build to see what it does. Written before, to say what it must do.

*[Slide 5 (5:50–7:05): "One quality specification, running in both directions." Visual: a single artefact in the centre labelled "acceptance criteria", drawn as one document, not two. An arrow running right into "the build" captioned "governs what gets built". An arrow running from the same document down and round into "the test suites" captioned "verifies what was produced". The point is that both arrows leave the same box. Optional small inset: the same acceptance criterion shown twice, once as a build instruction and once as a test scenario, word for word.]*

The acceptance criteria written in Analyse are the same artefact that drives the build, and the same artefact the test suites verify against. One quality specification, running in both directions: governing what gets built, and verifying what was produced. Precision at that stage is what makes confident delegation possible later. Vagueness there propagates forward as defects.

On the right, after the build, Kiro hands you code. The harness runs the full test suites against it, functional and non-functional. It remediates defects inside a governed loop. Then it runs a formal verification pass across correctness, alignment, trust and risk before anything is cleared to deploy.

So the short version for this room: Kiro gets you from a spec to working code. The factory gets you from a business requirement to a verified, deployable increment. And there's one more piece that makes that hold across a whole system rather than one service at a time. 

---

## 4 — The meta-repo: the system is the unit

### The inversion

*[Slide 6 (7:05–8:25): "The usual model" / "The meta-repo model." Visual: two columns. Left: five service boxes, each with its own repo icon and pipeline icon underneath, spaced apart. The lines between them are dashed and faint, annotated with where the coordination actually lives: "Confluence", "someone's head", "design doc, six months stale". Right: one large outer box labelled "meta-repo" containing the same five services as smaller, uniform boxes with solid contract lines between them. Along the top edge of the outer box, its contents as a strip: harness, organisation context, ADRs, NFRs, service templates, cross-cutting concerns, factory plan. Build: left column first, right column when I say "we inverted it".]*

Most engineering organisations treat the microservice as the primary unit. Each service is independent: owned by a team, with its own repository and its own pipeline. The macro tends to be informal — how those services compose into a system, what the contracts between them are, what the whole thing is supposed to do. It lives in Confluence, in people's heads, in the design document that was accurate six months ago. Services are independent. Their coordination is emergent.

That was always a weakness. With autonomous build agents, it becomes the weakness. Because an agent building one service has no idea what the other four are doing unless somebody tells it, every time.

We inverted it. The meta-repo is the primary unit. Services are composable components of it. The meta-repo holds the harness itself. It holds the organisation's context: the ADRs, the non-functional requirements, the service templates, the cross-cutting concerns. And for each increment it holds the factory plan — the macro-level implementation plan for the whole system.

I want to give you three concrete benefits of that inversion.

### Benefit one: context management

*[Slide 7 (8:25–9:55): "The agent's scarce resource is context." Visual: the factory plan as a single source document at the top, with its contents listed: system acceptance criteria, service contracts, event schemas, dependency graph, deployment order. From it, arrows fan out to five service branches, each receiving a per-service plan drawn as a slice of the same document, same colour, same shape. Contrast panel at the bottom left, small: a developer with a clipboard captioned "whatever they remembered to paste in". Build: the source document and its contents first; the fan-out on "a per-service plan is derived".]*

The scarce resource for an AI agent is not intelligence. It's context. What does it know about your world at the moment it starts work? 

In the meta-repo model, the whole picture lives in one place. The system-level acceptance criteria. The contracts between services. The dependency graph. The deployment order. From that we build one system-wide plan. A per-service plan is derived and pushed to each service's branch. When an agent builds a service, it receives a complete brief derived from the same source of truth as every other service in the increment. It knows what to build, what contracts to honour, and what its place in the system is.

That's the difference between an agent that is fast and an agent that is fast and right. The context problem isn't solved by a bigger model. It's solved by having a place where the whole system is described, and a mechanism that delivers the right fragment of it to every build.

### Benefit two: token efficiency

*[Slide 8 (9:55–10:55): "Drift is paid for in tokens." Visual: two halves, each with a token meter. Left, a single long agent session drawn as a context window filling up: the spec and a design that disagree, a pile of files read to work out which one was meant, a wrong build, a rework loop. Its meter runs high. Right, the design-gate marker from slide 11, then an orchestrator holding the per-service plan, fanning out to four sub-agents. Each sub-agent has its own short context window holding only three things: the feature's acceptance criteria, the contracts it touches, the standards that apply. Four small meters. Build: left half first; right half on "by the time we pull the trigger"; the four sub-agents fan out on "a fresh context".]*

The second benefit is cost. Specifically, tokens.

With agents, drift upstream gets paid for downstream, and you pay in tokens. If the spec and the design disagree, the agent burns its budget reading around the codebase to work out which one you meant. Then it builds the wrong one, and burns more fixing it.

That's why shifting left matters. By the time we pull the trigger on a build, the acceptance criteria, the design and the plans have already been checked against each other at the design gate. There's nothing left to reconcile. The agent spends its tokens building, not guessing.

The build itself isn't one long session either. Each task in the per-service plan goes to a sub-agent with a fresh context. It gets the acceptance criteria for that feature, the contracts it touches and the standards that apply. Nothing else.

A small context is cheaper. It's also more accurate. The less an agent is carrying, the fewer gaps it fills with something plausible and wrong.

Drift is paid for in tokens.

### Benefit three: governance and traceability

*[Slide 9 (10:55–11:55): "Every merged change is a breadcrumb." Visual: a real-looking pull request description, with the reference line to its factory plan highlighted. From that line, a chain of linked breadcrumbs runs left across the slide: PR → factory plan → stage gate → acceptance criteria → business requirement. Each link is a clickable-looking reference rather than a box in a diagram. Below, small: a standard (an ADR) changed once in the meta-repo, with a single arrow to "next build on every service". Build: the PR first, then the chain link by link as I say "to the plan… to the stage gate… to the acceptance criteria… to the business requirement".]*

The third benefit is the one your risk and audit functions will care about.

Every pull request the harness raises carries a reference back to the plan that drove it. Which means every change in production can be walked back: to the plan that coordinated it across services, to the stage gate that passed it, to the acceptance criteria that specified it, to the business requirement it came from. That isn't a report you compile after the fact. It's a property of how the work was produced.

And the standards themselves are governed the same way. The ADRs and the non-functional requirements live in the meta-repo: versioned, reviewed and applied uniformly. Change one, and the next build on every service follows it. Enforced, rather than published.

*[Slide 10 (11:55–12:35): "The system is the unit. Services are instances of a pattern." Visual: the meta-repo as one outer frame. Inside it, a single service template at the top and five services beneath it, each visibly stamped from the same template, with the factory plan drawn as the thing composing them. This is a summary slide: reuse the shapes from slides 6 to 9 so it reads as the same picture completed, not a new one.]*

When you add a service, it starts from a template in the meta-repo. Not from scratch, not from whichever existing service someone decided to copy. It inherits the patterns, the cross-cutting concerns, the hook configuration, the testing setup. It can't diverge on day one, which is when most divergence starts.

That's what makes this a factory rather than a collection of services that happen to talk to each other. The operational unit is the meta-repo. The services are instances of a pattern, composed according to a plan.

---

## 5 — Bounded autonomy

*[Slide 11 (12:35–15:15): bounded autonomy. Visual: the production line from slide 4 again, now with two things marked on it. First, the three stage gates drawn as inspection points, each with a human tick and the machine's checklist beside it: scope, between Analyse and Design; design, between Design and Agentic Build (requirements against acceptance criteria, acceptance criteria against design, design against plans); verified build, after Verify (end-to-end tests green). Caption across all three: "human-led, machine-assisted". Before Operate, a fourth marker drawn dashed and unlit, with no human tick: "path to production", captioned "your outer loop" (evidence assembled; CAB, architecture, security review). It sets up slide 14. Second, the remediation envelope drawn as a small loop inside the Agentic Build station, where it mostly runs (it works within a phase, not across the whole cycle), with a counter reading 1, 2, 3 and an exit arrow to a human icon captioned "stop, report, escalate; do not push". Either side of that loop, two small failure-mode panels: "always ask" as an engineer buried under approval prompts, captioned "yes ops"; "run until it works" as a spinning meter with a rising token count. Build: the gates appear as I say "stage gates" and the loop as I say "a defined envelope"; the two failure-mode panels appear when I say "that number matters". The three human ticks are lit from the start; no separate sign-off build.]*

Everything so far rests on delegating work to a machine. 

Two things.

Stage gates. There are three, and a person signs off each one: the scope, the design, the verified build. Human-led, machine-assisted. Before the design is signed off, the machine checks the package for consistency: requirements against acceptance criteria, acceptance criteria against design, design against the implementation plans. Drift gets corrected upstream, so you've verified the inputs are coherent before you hand over. Before production, it assembles the evidence, and a person reads the full summary of what was built. The gates aren't overhead. They're what lets you delegate in between them.

A defined envelope. Between the gates, no agent reviews its own work; independent reviewer agents check it against the spec and against the engineering standards. When something fails inside a phase, mostly during the build, the machine gets three attempts to remediate. If the third fails, it stops. It reports exactly what failed. It does not push. It escalates to a human rather than trying harder.

That number matters because of what it rules out at either end. "Always ask" sounds safe, and it isn't. An engineer approving every step of an autonomous build stops reading by the twentieth prompt. Approval becomes a reflex — yes ops — and the quality of the decision degrades precisely because a human is nominally making it. "Run until it works" fails the other way: an agent that never gives up will spin for hours, burning time and tokens on a problem it has already shown it can't solve. Three attempts, then escalate. The engineer isn't babysitting the build, and the build isn't running unsupervised into the ground.

So a person signs off three times. Not before every task, which would make autonomy meaningless. At the three points where accountability actually sits.

That's the machine. Autonomous where autonomy is safe. Gated where judgement is required. And the standard holds even when nobody is watching.

---

## 6 — Where it stands, and what it means for you

*[Slide 12 (15:15–16:35): "Operational today." Visual: two large figures side by side, "3 months" struck through and "4 weeks" beside it, captioned "financial services proof of value, one slice of the system; client's own estimate against actual". Beneath, one line: "programme extended to scope the whole system". Under that, the generic left-to-right flow small: policy document → product requirements → acceptance criteria → factory plan → per-service builds → verified system, with one unbroken traceability line beneath it. No client names, logos or system descriptions. Build: the two figures first as I say "three months" and "four weeks"; the extension line on "has since been extended".]*

This is operational on live engagements today. The one I can say most about is a financial services client. They scoped the proof of value at around three months of work. We delivered it in four weeks. It was a slice of the system, chosen to prove that it could be done, that the proposed architecture was sound, and that the quality met the standard a heavily regulated environment demands. Policy document and product requirements in; a working, verified slice out, with full traceability from the business requirement to the running service. That programme has since been extended to scope out what it would take to build the whole system. 

The core loop is solid. The shift-left testing, the verification layer, the multi-service coordination through the meta-repo: working. What we're building now is everything around it. Making it easier to use. Making it easier to start, with package management for the harness itself. And reporting: where the build is up to, what's missing, who needs to act, and what it's costing in tokens.

*[Slide 13 (16:35–17:30): "Do your standards exist in a form an agent can act on?" Visual: two columns under the question. Left: "documents a developer might read": a wiki page, a Confluence space, a PDF of architecture principles, a slide deck of security policy. Right: "behaviour an agent exhibits": the same four standards as a steering file, an injected constraint, a hook, a test scenario. The left column should look like every organisation's intranet. Build: question first, columns when I ask "or do they exist in documents".]*

So here's the question I'd ask of your own organisation.

You've bought the tools. Your developers are using them. The speed is real. The question is whether you can govern it. And that comes down to one thing: do your engineering standards, your architecture decisions, your security constraints, exist in a form an agent can act on? Or do they exist in documents that a developer might read and a tool will never see?

If it's the second, you have what most organisations have today. Moving towards that factory means putting your standards into the machinery. It means making the system the unit of work rather than the service. It means delegating between gates you've already verified.

*[Slide 14 (17:30–18:55): "Write rules that say yes." Visual: two concentric loops. Inner loop, small and fast: build → test → verify → repeat, with everything from this talk inside it. Outer loop, large and slow: the path to production, with three gates marked as calendar icons: change advisory board, architecture review, threat modelling, each captioned with a wait ("next slot: three weeks"). Build: as I say "what you need are rules that let you say yes", the three calendar icons transform into three rule cards written as conditions: "IF threat model attached AND ADRs honoured AND non-functional tests pass THEN deploy". The outer loop shrinks to match the inner one. Final state: both loops the same size, with the stage-gate marker from slide 11 visible on the outer loop so the callback lands.]*

Which brings us to the part that gets missed. Everything I've described speeds up the inner loop: build, test, verify, repeat. It does little for the outer loop, which is what it takes to get that increment approved for production. The harness can sequence a deployment. It can't approve one. If a verified increment then sits waiting for the next change advisory board, or an architecture review, or a threat modelling session before it can deploy, you've burnt a lot of the gain you just made. Those gates exist for good reasons. The problem is how they're written. Most of them today are meetings that tell you what you haven't done. What you need are rules that let you say yes: if the threat model is attached and the ADRs are honoured and the non-functional tests pass, this can deploy. Written down and checked by the machine, the same as everything else. The stage gates I described earlier already work this way: the machine checks the conditions, and a person signs off. It's the standard travelling with the tooling one more time — applied to governance rather than code.

*[Slide 15 (18:55–19:30): "Two things to do when you get back." Visual: text only, two numbered lines. 1. Pick your three most important engineering standards and ask where they live. 2. Pick your slowest gate to production and ask what it would take to write it as a rule that says yes. Underneath, small, the opening line one last time: "Individually impressive. Collectively ungoverned." This stays up through the sign-off and into questions.]*

So, two things to do when you get back. Pick your three most important engineering standards and ask where they live. Then pick your slowest gate to production and ask what it would take to write it as a rule that says yes.

I opened on a line, and I'll close on it: individually impressive, collectively ungoverned. That's the gap we built the factory to close.

I'm happy to talk about any of it.
