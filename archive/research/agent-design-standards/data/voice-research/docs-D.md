# Voice & Tone Research — docs.databricks.com (Area D)

**Area D scope:** Unity Catalog & data governance, security & compliance, account/workspace administration, compute/clusters & runtime, and Delta Sharing / Marketplace.

**Method:** Fetched real pages under `https://docs.databricks.com/aws/en/<path>` (aws/en), navigating from section landings into concept, how-to, reference, admin, and best-practice pages. Every quote below is verbatim from a page actually fetched. **Unique pages read: 30** (full list at the end).

> Note on OpenSharing: Databricks recently rebranded "Delta Sharing" to **OpenSharing** in the docs. The `/delta-sharing/` URL path is retained, but page prose now says "OpenSharing." Both facts are shown below with evidence.

---

## Dimension-by-dimension findings

### 1. Point of view / person, tense, mood, voice, sentence density

- **Second person "you" is the default across all page types**, including admin docs that address the reader as the admin performing the task.
  - Concept: "You work with the objects Unity Catalog governs through Catalog Explorer, SQL, the Databricks CLI, and REST APIs." — https://docs.databricks.com/aws/en/data-governance/unity-catalog/
  - Admin how-to: "As an account admin, you can also manage your Databricks account using the Account API." — https://docs.databricks.com/aws/en/admin/account-settings/
  - Recipient guide: "This page explains how to access data that has been shared with you using OpenSharing." — https://docs.databricks.com/aws/en/delta-sharing/recipient
- **Imperative mood for all procedures** (verb-first steps): "Log in to the Databricks account console." / "Click Catalog." / "Click Create metastore." — https://docs.databricks.com/aws/en/data-governance/unity-catalog/create-metastore
- **Present tense, active voice** dominates: "Unity Catalog is the unified governance layer for data and AI built into Databricks." — https://docs.databricks.com/aws/en/data-governance/unity-catalog/
- **The product is often the grammatical subject** in concept prose: "Unity Catalog provides built-in tools for governing every dimension of your data and AI environment." — https://docs.databricks.com/aws/en/data-governance/unity-catalog/
- **"Databricks" as subject** for behaviors/recommendations: "Databricks recommends using standard access mode for most workloads." — https://docs.databricks.com/aws/en/compute/cluster-config-best-practices
- **Sentence density:** Medium. Concept pages use moderately long, information-dense sentences with subordinate clauses; how-to steps are short and clipped. Example dense sentence: "When enabled for a workspace, Unity Catalog operates beneath every data and AI interaction in your workspaces automatically: enforcing access control when you query a table or call a model, tracking lineage as data and AI assets are used, logging activity for auditing, and more." — https://docs.databricks.com/aws/en/data-governance/unity-catalog/

### 2. Heading / title capitalization

- **Sentence case is the near-universal standard** for both page titles and section headings (only the first word + proper nouns capitalized).
  - Title: "Create a Unity Catalog metastore" — https://docs.databricks.com/aws/en/data-governance/unity-catalog/create-metastore
  - Title: "Classic compute configuration best practices" — https://docs.databricks.com/aws/en/compute/cluster-config-best-practices
  - Title: "Manage users, service principals, and groups" — https://docs.databricks.com/aws/en/admin/users-groups/
  - Section headings (sentence case): "Who can manage privileges?", "Show, grant, and revoke privileges", "Manage object ownership" — https://docs.databricks.com/aws/en/data-governance/unity-catalog/manage-privileges/
  - Section headings: "Access mode", "Databricks Runtime version", "Configuration hygiene", "Cost optimization" — https://docs.databricks.com/aws/en/compute/cluster-config-best-practices
- **Question-style headings are common** (esp. concept pages): "What is Unity Catalog?", "How should I organize my data into catalogs?", "How does Unity Catalog use cloud storage?"
  - https://docs.databricks.com/aws/en/data-governance/unity-catalog/create-catalogs
  - https://docs.databricks.com/aws/en/data-governance/unity-catalog/manage-external-locations-and-credentials
- **Proper nouns/product names retain their casing inside sentence-case headings**, e.g. "Serverless compute and customer-managed keys", "Databricks Marketplace Universal Commit Drawdown program". — https://docs.databricks.com/aws/en/security/keys/customer-managed-keys , https://docs.databricks.com/aws/en/marketplace/

### 3. Procedure / step style; concept vs. admin-how-to tone

- **Numbered steps, imperative, one action per step**, often with UI element names in bold/inline: "1. In the workspace sidebar, click Compute. / 2. Click the Create compute button. / 3. Configure the compute resource. / 4. Click Create." — https://docs.databricks.com/aws/en/compute/configure
- **Nested substeps and "Enter the following:" scaffolding** for multi-field forms. — https://docs.databricks.com/aws/en/data-governance/unity-catalog/create-metastore
- **Tabbed alternative paths** ("Catalog Explorer / SQL", "Databricks CLI / Databricks workspace UI") are standard for tasks with multiple interfaces. — https://docs.databricks.com/aws/en/data-governance/unity-catalog/manage-privileges/ , https://docs.databricks.com/aws/en/security/secrets/
- **Tone difference:** Conceptual/governance pages are explanatory and advisory ("you should give careful thought to the catalogs that you create"); admin how-tos are terse and mechanical. Compare:
  - Concept/advisory: "When you design your data governance model, you should give careful thought to the catalogs that you create." — https://docs.databricks.com/aws/en/data-governance/unity-catalog/create-catalogs
  - Admin mechanical: "1. Log in to the account console and click the Settings icon in the sidebar. 2. Click the Account settings tab." — https://docs.databricks.com/aws/en/admin/account-settings/
- **Security/governance concept pages layer in caution and rationale** rather than just steps (see Dimension 9).

### 4. Admonition labels + tone; permission / requirement phrasing

- **Admonition labels are lowercase** in rendered output: `note`, `important`, `tip`, `warning`. (Also seen: `Preview`, `Beta` status callouts.)
  - `important` — "For workspaces that were enabled for Unity Catalog automatically, the instructions in this page are unnecessary." — https://docs.databricks.com/aws/en/data-governance/unity-catalog/create-metastore
  - `note` — "In addition to the approaches described in this article, you can also create a metastore by using the Databricks Terraform provider…" — https://docs.databricks.com/aws/en/data-governance/unity-catalog/create-metastore
  - `tip` — "To run a Spark job, you need at least one worker node." — https://docs.databricks.com/aws/en/compute/configure
  - `warning` — "Workspace admins, secret creators, and users who have been granted permission can access and read Databricks secrets." — https://docs.databricks.com/aws/en/security/secrets/
  - `Preview` / `Beta` — "This feature is in Public Preview." / "This feature is in Beta." — https://docs.databricks.com/aws/en/admin/users-groups/ , https://docs.databricks.com/aws/en/admin/usage/
- **No "Caution" label observed;** the strongest label is `warning`, reserved for security/data-loss risk.
- **Requirement/permission phrasing patterns** (highly consistent):
  - "You must have one metastore for each region in which your organization operates." — https://docs.databricks.com/aws/en/data-governance/unity-catalog/create-metastore
  - "You must be a Databricks account admin." / "Your Databricks account must be on the Premium plan or above." (bulleted requirements list) — https://docs.databricks.com/aws/en/data-governance/unity-catalog/create-metastore
  - **"Permissions required:"** is a standard inline label preceding a task: "Permissions required: Metastore admin, the `MANAGE` privilege on the object, the owner of the object, or the owner of the catalog or schema that contains the object." — https://docs.databricks.com/aws/en/data-governance/unity-catalog/manage-privileges/
  - **Requirements tables** using "Have the `CREATE SHARE` privilege…" / "Be the share owner." phrasing. — https://docs.databricks.com/aws/en/delta-sharing/create-share
  - "To access system tables, your workspace must be enabled for Unity Catalog." — https://docs.databricks.com/aws/en/admin/system-tables/
  - "To create a pool, you must have the Allow pool creation entitlement." — https://docs.databricks.com/aws/en/compute/pool-index

### 5. Contractions, Oxford comma, numerals

- **Contractions are used, moderately** (mostly negatives and "it's"): "If you don't see a particular setting in your UI, it's because the policy you've selected does not allow you to configure that setting." — https://docs.databricks.com/aws/en/compute/configure
  - "the share recipient doesn't need a token to access the share" — https://docs.databricks.com/aws/en/delta-sharing/
  - Note: formal negatives are frequently spelled out ("does not," "cannot," "can not") alongside contractions — usage is mixed, not strict.
- **Oxford comma is used consistently:** "such as scripts, apps, and CI/CD platforms" / "users, service principals, and groups" — https://docs.databricks.com/aws/en/admin/users-groups/
  - "enforcing access control…, tracking lineage…, logging activity for auditing, and more." — https://docs.databricks.com/aws/en/data-governance/unity-catalog/
- **Numerals:** Digits used for all technical/measurable values (versions, sizes, dates, counts): "Databricks Runtime 11.3 LTS or above", "row sizes cannot exceed 128MB", "a maximum of 10,000 combined users", "48px", "November 8, 2023". Small counts in prose sometimes spelled out ("two options", "one driver node and zero or more worker nodes"). — https://docs.databricks.com/aws/en/admin/users-groups/ , https://docs.databricks.com/aws/en/compute/configure , https://docs.databricks.com/aws/en/data-governance/unity-catalog/create-catalogs
- **Dates written in full month-day-year:** "after November 8, 2023" / "Last updated on Jul 7, 2026". — https://docs.databricks.com/aws/en/data-governance/unity-catalog/

### 6. UI / menu path formatting; code & identifier formatting; privileges/roles

- **UI elements referenced in bold, by their exact label**, verb + label: "click Catalog", "Click Create metastore", "Select Permissions", "click the Create Pool button". — https://docs.databricks.com/aws/en/data-governance/unity-catalog/create-metastore , https://docs.databricks.com/aws/en/compute/pool-index
- **Menu paths use `>` as separator:** "click Settings > Language Settings > My Preferences tab." — https://docs.databricks.com/aws/en/admin/account-settings/
  - "Workspace admins can change this default in Settings > Compute" — https://docs.databricks.com/aws/en/admin/usage/
- **Code, identifiers, config keys, paths, and namespaces are in inline code font (backticks):** `catalog.schema.object`, `s3://`, `spark.databricks.passthrough.enabled`, `hive_metastore`, `__databricks_internal`, `system.access.audit`, `CURRENT_METASTORE`. — https://docs.databricks.com/aws/en/data-governance/unity-catalog/ , https://docs.databricks.com/aws/en/compute/cluster-config-best-practices , https://docs.databricks.com/aws/en/data-governance/unity-catalog/create-catalogs
- **Privileges are written in ALL-CAPS code font:** `SELECT`, `USE CATALOG`, `USE SCHEMA`, `CREATE TABLE`, `MANAGE`, `ALL PRIVILEGES`, `CREATE SHARE`, `READ VOLUME`, `EXECUTE`, `BROWSE`. — https://docs.databricks.com/aws/en/data-governance/unity-catalog/manage-privileges/ , https://docs.databricks.com/aws/en/delta-sharing/create-share
- **Permission (ACL) levels are ALL-CAPS but NOT code font:** "CAN MANAGE", "CAN ATTACH TO", "CAN RESTART", "NO PERMISSIONS", "CAN RUN", "CAN VIEW". — https://docs.databricks.com/aws/en/security/auth/access-control/
- **Admin roles are lowercase in prose:** "account admins", "workspace admins", "metastore admins", "group managers", "service principal managers". — https://docs.databricks.com/aws/en/admin/users-groups/ , https://docs.databricks.com/aws/en/data-governance/unity-catalog/manage-privileges/
- **Redaction placeholder shown in code font brackets:** "the secret values are replaced with `[REDACTED]`." — https://docs.databricks.com/aws/en/security/secrets/

### 7. Link phrasing

- **Descriptive "See <destination>." pattern is the dominant cross-reference style**, using the destination page's exact title as link text:
  - "See What is Unity Catalog?." — https://docs.databricks.com/aws/en/data-governance/unity-catalog/create-metastore
  - "See Access modes." / "See Enable autoscaling." — https://docs.databricks.com/aws/en/compute/cluster-config-best-practices
  - "For details, see Enable a workspace for Unity Catalog." — https://docs.databricks.com/aws/en/data-governance/unity-catalog/create-metastore
- **"For more information, see …" and "To learn more, see …" / "For <topic>, see …"** are common variants: "For more information, see Databricks identities." — https://docs.databricks.com/aws/en/admin/users-groups/best-practices
- Links point to the exact feature name; **bare-URL or "click here" phrasing was not observed.**

### 8. Terminology exact casing

Consistently observed spellings/casings (verbatim):

- **Unity Catalog** (both words capitalized, always) — https://docs.databricks.com/aws/en/data-governance/unity-catalog/
- **metastore** (lowercase, one word) — "A metastore is the top-level container for data in Unity Catalog." — https://docs.databricks.com/aws/en/data-governance/unity-catalog/create-metastore
- **catalog**, **schema**, **table**, **view**, **volume** (lowercase common nouns) — https://docs.databricks.com/aws/en/data-governance/unity-catalog/create-catalogs
- **workspace** (lowercase) — https://docs.databricks.com/aws/en/admin/users-groups/
- **account console** (lowercase) — "Log in to the Databricks account console." — https://docs.databricks.com/aws/en/data-governance/unity-catalog/create-metastore
- **compute** (lowercase, used as a mass noun: "a compute resource", "all-purpose compute", "job compute") — https://docs.databricks.com/aws/en/compute/configure
- **cluster** (lowercase); **Databricks Runtime** (capitalized, product name); **Photon** (capitalized) — https://docs.databricks.com/aws/en/compute/configure
- **serverless compute** (lowercase) — https://docs.databricks.com/aws/en/compute/serverless/
- **securable object** (lowercase) — https://docs.databricks.com/aws/en/data-governance/unity-catalog/
- **service principal**, **service principals** (lowercase) — https://docs.databricks.com/aws/en/admin/users-groups/
- **external location**, **storage credential** (lowercase securable-object names) — https://docs.databricks.com/aws/en/data-governance/unity-catalog/manage-external-locations-and-credentials
- **OpenSharing** (one word, camel-case capital S) — "OpenSharing is the secure data sharing platform in Databricks…" — https://docs.databricks.com/aws/en/delta-sharing/
- **Databricks Marketplace**, **Partner Connect**, **Clean Rooms** (product names, capitalized) — https://docs.databricks.com/aws/en/marketplace/
- **Catalog Explorer** (capitalized UI product) — https://docs.databricks.com/aws/en/data-governance/unity-catalog/
- **share**, **provider**, **recipient** (lowercase Delta Sharing/OpenSharing roles) — https://docs.databricks.com/aws/en/delta-sharing/
- **identity federation**, **compliance security profile**, **customer-managed keys** (lowercase feature names) — https://docs.databricks.com/aws/en/admin/users-groups/ , https://docs.databricks.com/aws/en/security/privacy/security-profile

### 9. Overall tone (esp. security/governance)

- **Neutral, precise, matter-of-fact, and instructional.** No emoji, no exclamation points observed in body prose.
- **Distinctly cautionary and responsibility-shifting on security/compliance topics**, using bolded/repeated "solely responsible":
  - "You are solely responsible for ensuring your own compliance with all applicable laws and regulations." — https://docs.databricks.com/aws/en/security/privacy/security-profile
  - "You are solely responsible for ensuring that the compliance security profile and the appropriate compliance standards are configured before processing regulated data." — https://docs.databricks.com/aws/en/security/privacy/security-profile
- **Warnings emphasize data-security consequences directly:**
  - "Do not give non-Unity Catalog identities storage-level access to Unity Catalog managed tables or volumes. This compromises data security and governance." — https://docs.databricks.com/aws/en/data-governance/unity-catalog/manage-external-locations-and-credentials
  - "Always assign secret access permissions carefully to protect sensitive information." — https://docs.databricks.com/aws/en/security/secrets/
  - "Databricks highly discourages you from moving this data outside the platform because it can expose sensitive data and put your deployment at risk." — https://docs.databricks.com/aws/en/admin/system-tables/
- **Prescriptive, opinionated best-practice voice** ("Databricks recommends…") appears heavily in governance/admin/compute guidance:
  - "Databricks recommends that you reassign the metastore admin role to a group." — https://docs.databricks.com/aws/en/data-governance/unity-catalog/create-metastore
  - "It is best practice to assign access to workspaces and access-control policies in Unity Catalog to groups, instead of to users individually." — https://docs.databricks.com/aws/en/admin/users-groups/best-practices
  - "To enforce the principle of least privilege, where users have the minimum access they need to perform their required tasks, typically you grant access only to the specific objects or level in the hierarchy that the user requires." — https://docs.databricks.com/aws/en/data-governance/unity-catalog/create-catalogs
- **"Do not …" / "Avoid …" imperatives** are the standard anti-pattern phrasing: "Do not use dot notation … in S3 bucket names." / "Avoid using init scripts". — https://docs.databricks.com/aws/en/data-governance/unity-catalog/create-metastore , https://docs.databricks.com/aws/en/compute/cluster-config-best-practices

---

## Snippet bank (representative verbatim quotes)

1. **Concept intro (product-as-subject, present tense):**
   "Unity Catalog is the unified governance layer for data and AI built into Databricks. When enabled for a workspace, Unity Catalog operates beneath every data and AI interaction in your workspaces automatically…"
   — https://docs.databricks.com/aws/en/data-governance/unity-catalog/

2. **Page title + one-line purpose statement (sentence-case title):**
   Title "Create a Unity Catalog metastore"; body "This page shows how to create a Unity Catalog metastore and link it to workspaces."
   — https://docs.databricks.com/aws/en/data-governance/unity-catalog/create-metastore

3. **`important` admonition (cautionary, second person):**
   "For workspaces that were enabled for Unity Catalog automatically, the instructions in this page are unnecessary. … You must follow the instructions in this page only if you have a workspace and don't already have a metastore in your workspace region."
   — https://docs.databricks.com/aws/en/data-governance/unity-catalog/create-metastore

4. **Procedure steps (imperative, bold UI labels):**
   "1. In the workspace sidebar, click Compute. 2. Click the Create compute button. 3. Configure the compute resource. 4. Click Create."
   — https://docs.databricks.com/aws/en/compute/configure

5. **Requirement / permissions phrasing (inline label + privilege in caps):**
   "Permissions required: Metastore admin, the `MANAGE` privilege on the object, the owner of the object, or the owner of the catalog or schema that contains the object."
   — https://docs.databricks.com/aws/en/data-governance/unity-catalog/manage-privileges/

6. **"You must have …" requirements bullets:**
   "You must be a Databricks account admin. Your Databricks account must be on the Premium plan or above."
   — https://docs.databricks.com/aws/en/data-governance/unity-catalog/create-metastore

7. **`warning` admonition (security tone):**
   "Workspace admins, secret creators, and users who have been granted permission can access and read Databricks secrets. Although Databricks attempts to redact secret values in notebook outputs, it is not possible to fully prevent these users from viewing secret contents."
   — https://docs.databricks.com/aws/en/security/secrets/

8. **Compliance responsibility statement (repeated "solely responsible"):**
   "You are solely responsible for ensuring your own compliance with all applicable laws and regulations."
   — https://docs.databricks.com/aws/en/security/privacy/security-profile

9. **Best-practice recommendation voice:**
   "It is best practice to assign access to workspaces and access-control policies in Unity Catalog to groups, instead of to users individually."
   — https://docs.databricks.com/aws/en/admin/users-groups/best-practices

10. **Anti-pattern imperative + rationale:**
    "Do not give non-Unity Catalog identities storage-level access to Unity Catalog managed tables or volumes. This compromises data security and governance."
    — https://docs.databricks.com/aws/en/data-governance/unity-catalog/manage-external-locations-and-credentials

11. **Question-style heading + advisory concept prose:**
    Heading "How should I organize my data into catalogs?"; body "When you design your data governance model, you should give careful thought to the catalogs that you create."
    — https://docs.databricks.com/aws/en/data-governance/unity-catalog/create-catalogs

---

## Full URL list (30 unique pages fetched)

1. https://docs.databricks.com/aws/en/data-governance/unity-catalog/ — What is Unity Catalog?
2. https://docs.databricks.com/aws/en/data-governance/unity-catalog/create-metastore — Create a Unity Catalog metastore
3. https://docs.databricks.com/aws/en/data-governance/unity-catalog/create-catalogs — What are catalogs in Databricks?
4. https://docs.databricks.com/aws/en/data-governance/unity-catalog/manage-privileges/ — Manage privileges in Unity Catalog
5. https://docs.databricks.com/aws/en/data-governance/unity-catalog/best-practices — Unity Catalog best practices
6. https://docs.databricks.com/aws/en/data-governance/unity-catalog/manage-external-locations-and-credentials — Connect to cloud object storage using Unity Catalog
7. https://docs.databricks.com/aws/en/data-governance/unity-catalog/row-and-column-filters — Row filters and column masks
8. https://docs.databricks.com/aws/en/delta-sharing/ — What is OpenSharing?
9. https://docs.databricks.com/aws/en/delta-sharing/create-share — Create shares for OpenSharing
10. https://docs.databricks.com/aws/en/delta-sharing/recipient — Access data shared with you using OpenSharing (for recipients)
11. https://docs.databricks.com/aws/en/marketplace/ — What is Databricks Marketplace?
12. https://docs.databricks.com/aws/en/compute/configure — Compute configuration reference
13. https://docs.databricks.com/aws/en/compute/cluster-config-best-practices — Classic compute configuration best practices
14. https://docs.databricks.com/aws/en/compute/access-mode-limitations — Standard compute requirements and limitations
15. https://docs.databricks.com/aws/en/compute/pool-index — Connect to pools
16. https://docs.databricks.com/aws/en/compute/serverless/ — Connect to serverless compute
17. https://docs.databricks.com/aws/en/security/ — Security and compliance
18. https://docs.databricks.com/aws/en/security/network/ — Networking
19. https://docs.databricks.com/aws/en/security/auth/access-control/ — Access control lists
20. https://docs.databricks.com/aws/en/security/keys/customer-managed-keys — Customer-managed keys for encryption
21. https://docs.databricks.com/aws/en/security/secrets/ — Secret management
22. https://docs.databricks.com/aws/en/security/privacy/security-profile — Compliance security profile
23. https://docs.databricks.com/aws/en/admin/ — Administration
24. https://docs.databricks.com/aws/en/admin/account-settings/ — Manage your Databricks account
25. https://docs.databricks.com/aws/en/admin/account-settings/audit-logs — Audit log reference
26. https://docs.databricks.com/aws/en/admin/users-groups/ — Manage users, service principals, and groups
27. https://docs.databricks.com/aws/en/admin/users-groups/best-practices — Identity best practices
28. https://docs.databricks.com/aws/en/admin/system-tables/ — System tables reference
29. https://docs.databricks.com/aws/en/admin/workspace-settings/ — Manage your workspace
30. https://docs.databricks.com/aws/en/admin/usage/ — Cost management tools on Databricks

**Also attempted (not counted):** `https://docs.databricks.com/aws/en/data-governance/unity-catalog/manage-external-locations` (404 Not Found); `https://docs.databricks.com/aws/en/admin/account-settings/index` and `https://docs.databricks.com/aws/en/data-governance/unity-catalog/audit` (returned duplicate content of #24 and #25 respectively).

---

## Synthesis (5 sentences)

Databricks governance, security, compute, and admin docs speak in a neutral, precise, present-tense, second-person voice that addresses the reader directly as the admin or user performing the task, with the product ("Unity Catalog," "Databricks") frequently taking the grammatical subject in concept prose. Titles and section headings use sentence case (with question-style headings common on concept pages), procedures are imperative and verb-first with UI labels in bold and `>`-separated menu paths, and code/identifiers/privileges appear in inline code font with SQL privileges in ALL CAPS (e.g., `USE CATALOG`, `MANAGE`) while ACL levels (CAN MANAGE) are caps-but-not-code and admin roles stay lowercase. Requirements and permissions are stated with a consistent "You must have…", "Requires…", and inline "Permissions required:" pattern, admonitions use lowercase labels (`note`, `important`, `tip`, `warning` — no "Caution"), and mechanics favor the Oxford comma, digits for technical values, and moderate contractions alongside spelled-out formal negatives. The security and compliance content is markedly more cautionary and responsibility-shifting ("You are solely responsible…," "This compromises data security and governance"), while governance/compute pages lean prescriptive and opinionated through the pervasive "Databricks recommends…" and "It is best practice…" framing. Overall the tone is enterprise-serious and instructional with zero emoji or exclamation points, terminology casing is strictly consistent (Unity Catalog capitalized; metastore, catalog, schema, volume, workspace, account console, compute, cluster lowercase; OpenSharing one word; Databricks Runtime and Databricks Marketplace as capitalized product names).
