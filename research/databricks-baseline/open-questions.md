# Questions for the internal agent

Written to be pasted straight into DBRA or a similar tool without editing. Each one carries its own
context, because the agent answering it will not have ours.

**Rev 2, 2026-08-11.** Rev 1 asked mostly for facts. This asks mostly for structure, after the first
baseline came back with too much that was ephemeral to be worth keeping.

---

## What we are building toward

Four things, and each block below serves one of them.

| We need | So that review prep can | Blocks |
|---|---|---|
| **Internals** — how the platform is actually built and shaped | Reason about what a surface can and cannot do, and what it costs | 1–4 |
| **External positioning** — how each area is sold and against whom | Argue what matters from the customer's side | 5 |
| **Customer voice** — what people actually say about each area | Say "your users already complain about this" with evidence | 6 |
| **Legal and regulatory** — what binds each area | Flag the compliance bottleneck before it blocks the build | 7 |

Blocks 8 to 10 are supporting: internal business context, the review process, and terminology.

## What a useful answer looks like

The first pass came back long and thin, so it is worth being blunt about the shape we want.

**Useful:** a complete list. A hierarchy. A state machine. A named constraint with what it forbids.
"These four surfaces all render lineage." A verbatim customer quote. A rule with an owner.

**Not useful:** adoption percentages, Jira ticket numbers, preview statuses, analyst rankings,
anything phrased as a benefit. Those age within a quarter, cannot be verified from outside, and two
sources usually disagree — at which point we drop both and the effort is wasted.

Prefer **completeness over depth**. A full list of thirty surfaces with one line each beats three
surfaces described richly, because the gaps are what make review prep say something wrong.

Where the agent is unsure, **say so rather than filling in**. An explicit gap is usable; a confident
guess is worse than nothing because we cannot tell it from the rest.

---

## 1 · Complete the surface map

**Priority: highest.** The current map has six areas taken from one file's chapter headings, and it
is not the product. This is also what makes the overlap check possible.

1. List every navigable area in the Databricks workspace left navigation and in the account console,
   top to bottom, as a user with full admin privileges sees it. For each: the name as it appears in
   the UI, one line on what it does, and the primary object it operates on.

2. Which of those areas are account-scoped and which are workspace-scoped? Which appear in both with
   different capabilities?

3. Which personas or entitlements see a different console? Describe what Databricks One shows versus
   the full workspace, and any other reduced or role-specific entry point.

4. Which areas were added, renamed, merged or removed in the last twelve months?

5. **Which product areas own UI that appears inside another area's surface?** For example, lineage
   renders inside Catalog Explorer and possibly elsewhere. List every case where one team's component
   or view is embedded in another team's page.

6. Which capabilities exist in more than one place in the product today — for example table
   filtering, object pickers, permission editors, run status views, search? Name the surfaces where
   each appears.

---

## 2 · Control plane and data plane

**Priority: highest.** Named as missing from the object model, and it changes what a UI can promise.

7. Explain the control plane and data plane split. What runs in the Databricks-managed account versus
   the customer's cloud account? Include where serverless sits, since it does not fit the classic
   two-way split cleanly.

8. For each major UI surface, does it read from the control plane, the data plane, or both? Which
   operations require a running data plane resource before they can return anything?

9. What are the user-visible consequences of the split? Specifically: which operations are slow,
   which can fail while the rest of the product is healthy, and which return stale or partial results
   because of where the data lives.

10. What customer data can and cannot leave the customer's account, and how does that differ between
    serverless and classic compute, and between regions?

11. What network architecture does a customer configure — PrivateLink, VPC or VNet injection, network
    connectivity configurations, IP access lists — and which UI surfaces expose or depend on it?

---

## 3 · Compute

**Priority: high.** Named as missing.

12. Give the complete compute taxonomy: every compute type a user can create or select, and the
    objects and settings each one carries.

13. What is the lifecycle state machine of a classic cluster, and of a SQL warehouse? Every state,
    every transition, including failure and terminating states. Include typical durations for each
    transition, since that decides whether a UI needs a progress treatment.

14. What does a user configure versus what is automatic, for serverless compute compared with classic?

15. How do cluster policies work — what can they constrain, who authors them, and what is the
    serverless equivalent if one exists?

16. How is compute billed, and what does a user see about cost before, during and after a run?

17. What are the common compute failure modes a user encounters, and what does the product show them
    when each happens?

---

## 4 · AI and ML objects

**Priority: high.** Named as missing, and it is the fastest-moving part of the product.

18. Give the complete MLflow object model as it exists in Databricks today — experiment, run,
    logged model, registered model, model version, alias, trace, evaluation, and anything else.
    The hierarchy, the relationships, and which of them are Unity Catalog objects.

19. Give the Mosaic AI object model: serving endpoint, served entity, route, vector search index and
    endpoint, feature table, online table, and anything else a user creates.

20. What is Agent Bricks in object terms? What does a user create, in what order, and what does the
    finished thing consist of?

21. How do AI Gateway guardrails, rate limits and inference logging work from the user's side — what
    do they configure, and where do the logs land?

22. What is the relationship between AI and ML objects and Unity Catalog? Which are governed by UC,
    which are not, and where are the seams.

23. What does the end-to-end path look like from raw data to a deployed agent answering a question,
    naming every object created along the way?

---

## 5 · External positioning

**Ask once per product area.** Use the area list from question 1; until that lands, use: Unity
Catalog and governance · SQL warehouses and editor · Lakeflow (Connect, Pipelines, Jobs) · notebooks
and workspace · AI/BI dashboards and Genie · Mosaic AI and Agent Bricks · MLflow and model serving ·
compute · admin and account console · Lakebase · Databricks Apps · Marketplace and Delta Sharing ·
security products · Databricks One.

> **For [AREA]:** What is the official external positioning — the one-line pitch and the top three
> claimed differentiators? Who is the primary competitor, and what does the competitive material say
> distinguishes us? Where is this area genuinely behind the competition? How is it packaged and
> priced from a buyer's point of view, and what tier or SKU is it in?

24. Across all areas, which two or three are the current growth bets, and which are considered mature
    or in maintenance?

25. What does a competitive displacement look like — when a customer moves to Databricks from
    Snowflake, Fabric or a specialist tool, which areas do they evaluate hardest?

---

## 6 · Customer voice

**Ask once per product area**, same list as block 5. This is what lets a critique say "your users
already tell you this" instead of "users might find this confusing."

> **For [AREA]:** What do customers most consistently complain about? Draw on support tickets, the
> community forum, the Ideas Portal, customer notes and win/loss records. Give the recurring themes,
> and include two or three verbatim quotes. What are the highest-voted feature requests? What has
> been named in a lost deal or a churn risk? What do customers specifically praise, and would miss?

26. Across all areas, what are the twenty highest-voted Ideas Portal items right now?

27. What are the largest support ticket categories by volume, and which of them are usability
    problems rather than defects or questions?

28. What comes up most in onboarding and time-to-first-value research — where do new users stall?

29. Which complaints are about a workflow spanning several areas rather than about one area? Those
    are the ones no single team owns.

---

## 7 · Legal, regulatory and compliance

**Priority: high, and currently at zero.** Named as a common bottleneck.

30. What certifications and attestations does Databricks hold — SOC 2, ISO 27001 and 27701, HIPAA,
    PCI DSS, FedRAMP and at which level, IRAP, C5, and others? Which are per-region or per-cloud, and
    which product surfaces are in scope versus explicitly out of scope?

31. **When a new feature is built, what compliance review must it pass before GA?** Who owns that
    review, what is on the checklist, and at what stage does it happen relative to design?

32. Which specific compliance requirements have changed or blocked a UI decision? Real examples —
    audit logging, data residency, retention limits, right to erasure, consent capture, customer
    managed keys.

33. What are the audit logging requirements? What must be logged, retained for how long, exposed to
    whom, and what does a new surface owe the audit log?

34. What data residency and sovereignty constraints apply, and how do they change what a UI may show
    or where it may process? Which surfaces have region-specific behavior?

35. **For the governance and security products specifically:** which compliance frameworks do they
    have to map to, and what does each mandate in the product itself rather than in documentation?

36. What does the EU AI Act require of Databricks and of customers building on Databricks? Which
    product areas are affected, what is the current position, and who owns it?

37. What accessibility conformance is required, what is the current VPAT status, and which deals have
    been gated on it?

38. What are the rules on what may be sent to a model — customer data, prompts, telemetry — and how
    does that constrain AI features in the product?

---

## 8 · Internal business context

Anticipates the stakeholder question rather than the user question.

39. What are the current company-level priorities or big rocks, and which product area owns each?

40. How is each product area measured? What are the metrics or OKRs each one owns, and which of them
    a new feature would be expected to move.

41. Who are the PM and design leads per product area, and what does the org look like at that level?

42. Which areas have a dependency on another area's roadmap right now?

---

## 9 · The review process

Unchanged from Rev 1, and still unanswered. This is what lets me code the transcripts when they
arrive.

43. What design review forums exist? Names, cadence, who attends by role, and what a designer is
    expected to bring to each.

44. Is there a written rubric, checklist or template that reviewers use, even an informal one?

45. What are the named outcomes of a review — approved, approved with changes, sent back, blocked —
    and is the outcome recorded anywhere?

46. Where do review notes, recordings and decisions live? Is there a decision log for escalations?

47. Which reviewers recur, and what does each reliably ask about? Not personality — the legitimate,
    repeated concern each one owns.

---

## 10 · Terminology

Short, because `packages/dbui/docs/brandvoice.md` owns this and corrections land there.

48. **Is the product "Lakeflow Pipelines" or "Lakeflow Declarative Pipelines"?** Our own voice guide
    says the first; another internal source says the second and cites a `/ldp/where-is-dlt` doc path.
    One is wrong.

49. Is `go/docterms` current? What product renames landed in the last six months, and what is the
    full current-name-versus-legacy-name list?

50. Which product names are branded and title-cased versus generic and lowercase? We need the rule,
    not only the list.

---

## Sending answers back

Per block is ideal — the blocks are independent, and a rewrite is cheaper than a merge.

Two things to include with each answer, because they decide what we do with it:

**Where it came from.** A doc, a dashboard, a person, or the agent's own synthesis. Synthesis is
still useful; it just ranks below a source.

**Whether it contradicts the current baseline.** Knowing that a source was wrong is worth more than
the correction alone, because it tells us how far to trust the rest of that source.

If two sources disagree and neither is clearly better, say so and send both. We will drop the claim
rather than pick — but only if we know there was a conflict.
