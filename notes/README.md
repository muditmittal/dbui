# Notes

**This directory is not documentation.** Nothing in it is published, served by `dbui docs`,
listed in `llms.txt` or rendered by the portal. Do not cite a file here as the contract, and do
not link to one from a doc that is.

It holds working material that was written for a published surface and then cut from it, because
the surface may only carry claims that are true of DBUI today and demonstrable against the repo.
Material lands here when it is one of:

- **Aspirational** — good practice the system does not enforce or guarantee.
- **General education** — true of design systems or accessibility everywhere, not a fact about DBUI.
- **Rationale** — why a page was built the way it was, which the reader of the page does not act on.
- **False** — the page said it and the code did not do it.

A file here says which of those each block was. Anything marked false is a defect that shipped:
read it as a record of how the claim got there, never as a description of the system.

It also holds **findings recorded against an open decision** — evidence gathered while
answering a question, kept because the decision outlived the session that produced it. Those
files state what was measured and stop there. A file that reads as a recommendation is
mis-filed: the call belongs to whoever makes it, and until they do, the register in
`TRACKER.md` is where it is tracked.

If something here becomes true and checkable, it does not move back by itself. It has to be
verified against the repo and re-landed under the protocol in `CONTRIBUTING.md`.

| File | Source |
|---|---|
| `accessibility-page-cuts.md` | cut from `/docs/accessibility` |
| `constraints-page-cuts.md` | cut from `/docs/constraints` |
| `navbar-new-button-accent.md` | findings against an open decision — `NavbarNewButton` |
