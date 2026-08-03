# What is Reyden? Competitors & Pinot Comparison

**Research Date:** 2026-04-27 | **Method:** Bricksearch multi-agent dispatch (5 agents) | **Coverage:** 2/5 substantive (expected — Reyden is an unreleased internal product)

---

## Executive Summary

**Reyden is Databricks' unreleased real-time analytics engine** — a Rust-based OLAP sidecar to the SQL Gateway designed to eliminate the "Extract Tax" (customers exporting lakehouse data into ClickHouse/Pinot for low-latency queries). It is currently in Preview with active customer nominations. Comparing Reyden to Apache Pinot is architecturally fair — they target the same workload — but the key differentiator is that Reyden queries data in-place on the lakehouse rather than requiring a separate data copy.

---

## What is Reyden?

Reyden is Databricks' internal real-time analytics engine, positioned to deliver low-latency OLAP queries directly on lakehouse data without a separate side stack.

- **Architecture:** Rust-based analysis sidecar to the SQL Gateway, capable of bypassing traditional DBR analysis for tasks like cache key generation [2]
- **One-liner:** "Reyden delivers real-time analytics on open lakehouse data, without a side stack" [1]
- **Use cases:** User-facing analytics — live delivery ETAs for logistics fleets, real-time dashboards, operational analytics [3]
- **Distinction from Lakebase:** Lakebase handles OLTP/transactional workloads; Reyden handles analytical queries over fresh data [3]

### Current Status

- **Preview program active** — customer nominations tracked via go/reyden/nominate [5]
- **Value interviews** conducted with customers (e.g., NBA) as recently as April 2026 [9]
- **Exit criteria + dependency review** deck exists, suggesting tracking toward a formal launch gate [7]
- **Internal channels:** #eng-reyden (engineering), #reyden-preview (customer program) [8][10]
- **Go-links:** go/reyden/wiki, go/reyden101, go/reyden/notes, go/reyden/nominate

---

## Direct Competitors

Reyden is explicitly framed as the **ClickHouse compete answer**. The FY27 Industry Messaging Framework calls out the "Extract Tax" problem and positions "Databricks Lakehouse (Reyden)" as the solution [4].

| Competitor | Category | Relationship to Reyden |
|---|---|---|
| **ClickHouse** | Real-time OLAP | Primary target — Reyden exists to eliminate ClickHouse as a side stack |
| **Apache Pinot** | Real-time OLAP | Direct competitor — same user-facing analytics use cases |
| **Apache Druid** | Real-time OLAP | Direct competitor — similar low-latency analytical queries |
| **StarRocks / Apache Doris** | Real-time OLAP | Direct competitor — open-source real-time OLAP alternatives |
| **Rockset** (acquired by OpenAI) | Real-time indexing | Was a competitor; now acquired and no longer independent |
| **Tinybird** | Real-time analytics API | Adjacent — ClickHouse-based, API-first model |
| **Materialize / RisingWave** | Streaming databases | Adjacent — streaming SQL, different architecture |

---

## Is the Pinot Comparison Fair?

**Yes — it is a fair and architecturally meaningful comparison.** Both Reyden and Pinot target the same core use case: low-latency analytical queries at high concurrency for user-facing applications.

### Where they align

- Both serve sub-second analytical queries over large datasets
- Both target user-facing workloads (dashboards, embedded analytics, operational UIs)
- Both handle high-concurrency query patterns (thousands of concurrent users)
- Both ingest streaming data (Kafka, Kinesis, etc.)

### Where they differ

| Dimension | Reyden | Apache Pinot |
|---|---|---|
| **Data location** | Queries lakehouse data in-place (no extraction) | Requires separate data copy/ingestion pipeline |
| **Operational overhead** | Managed within Databricks platform | Separate cluster to deploy, manage, and scale |
| **Data freshness** | Tied to lakehouse ingestion (Structured Streaming) | Native real-time ingestion with pluggable indexing |
| **Ecosystem** | Integrated with Unity Catalog, Delta Lake, MLflow | Standalone; integrates via connectors |
| **Maturity** | Preview (2026) | Production-proven at LinkedIn, Uber, Stripe scale |

### The "Extract Tax" framing

Databricks positions Reyden as solving the "Extract Tax" — the cost and complexity of maintaining a separate analytics engine alongside the lakehouse. For customers already on Databricks, Reyden removes an entire infrastructure layer. For greenfield deployments, the comparison with Pinot becomes a build-vs-buy, integrated-vs-best-of-breed decision.

---

## Databricks' Current Real-Time Stack (Context)

Reyden sits within a broader set of Databricks real-time capabilities:

| Product | What it does | Latency |
|---|---|---|
| **Structured Streaming (Real-Time Mode)** | Sub-second streaming ingestion and processing | ~300ms p50, sub-1s p99 |
| **Delta Live Tables** | Declarative ETL with streaming tables + materialized views | Minutes (incremental refresh) |
| **Lakebase** | Postgres-compatible OLTP + synced tables for data serving | Sub-10ms (point lookups) |
| **Databricks SQL** | Interactive SQL warehouses for dashboards and BI | Seconds (analyst-scale concurrency) |
| **Reyden** | Real-time OLAP over lakehouse data (user-facing scale) | Target: sub-100ms at high concurrency |

---

## Gaps & Open Questions

- **No public benchmarks** — performance claims cannot be independently verified
- **No GA timeline** — only internal exit criteria decks exist
- **Unclear concurrency ceiling** — how many concurrent queries can Reyden handle vs. Pinot's proven 100K+ QPS?
- **Zeustra overlap** — a Slack thread references "Zeustra Realtime Analytics and Reyden" suggesting potential overlap with another internal effort [12]
- **Pricing model** — unknown whether Reyden will be a separate SKU or included in existing DBSQL

---

## References

- [1] Reyden Positioning & Messaging Framework — internal Google Doc
- [2] Lightning Fast (100ms) Query Result Cache — Confluence UN space
- [3] Reyden FAQ — Confluence UN space
- [4] FY27 Databricks Industry Messaging Framework — internal Google Doc
- [5] Reyden Preview nominations — Confluence UN space
- [7] Reyden exit criteria + dependency review — internal Google Slides
- [8] #reyden-preview Slack channel
- [9] NBA Reyden Value Interviews (2026-04-08) — internal Google Doc
- [10] #eng-reyden Slack channel
- [12] Zeustra Realtime Analytics and Reyden — Slack thread

---

*Research conducted by Bricksearch — multi-agent research dispatch for Databricks product design. 5 agents dispatched, 2 substantive (Internal Intel, Official Docs), 3 correctly empty (Reyden has no public footprint). All internal citations verified via Glean.*
