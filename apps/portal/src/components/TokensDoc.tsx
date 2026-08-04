"use client"

import {
  ColorSwatches, SpaceScale, RadiusScale, SizeScale, BorderScale,
  ElevationScale, MotionScale, ScalarList,
} from "@/stories/tokens/TokenKit"
import {
  colorGroups, space, radius, sizeElement, sizeIcon,
  borderWidth, elevation, duration, scalars, tokenCounts,
} from "@/stories/tokens/token-data"

const TYPE = [
  ["type-hint", "12 / 16", "400", "Captions, helper text, timestamps"],
  ["type-eyebrow", "12 / 16", "600", "Overlines. Carries its own caps"],
  ["type-label", "13 / 16", "400", "Single-line UI — buttons, menu items, cells"],
  ["type-label-bold", "13 / 16", "600", "Column headers, form labels"],
  ["type-body", "13 / 20", "400", "Wrapping 13px — descriptions"],
  ["type-body-bold", "13 / 20", "600", "Emphasis in a description"],
  ["type-code", "13 / 20", "400", "Inline code, identifiers, paths"],
  ["type-block", "14 / 22", "400", "Code blocks"],
  ["type-paragraph", "15 / 22", "400", "Read as language — chat, docs"],
  ["type-paragraph-bold", "15 / 22", "600", "Bold inside prose"],
  ["type-title-4", "16 / 24", "600", "Small heading"],
  ["type-title-3", "20 / 28", "600", "Subsection heading"],
  ["type-title-2", "24 / 32", "600", "Section heading"],
  ["type-title-1", "32 / 40", "600", "Page heading"],
]

function Section({ title, lede, children }: { title: string; lede: string; children: React.ReactNode }) {
  return (
    <section className="mt-16 flex flex-col gap-5">
      <div className="flex flex-col gap-2">
        <h2 className="type-title-3 text-text-strong">{title}</h2>
        <p className="type-body max-w-[68ch] text-text-subtle">{lede}</p>
      </div>
      {children}
    </section>
  )
}

export function TokensDoc() {
  return (
    <>
      <h1 className="type-title-1 text-text-strong">Tokens</h1>
      <p className="type-paragraph mt-4 max-w-[68ch] text-text-subtle">
        Every visual decision resolves to a token. One file — <code className="type-code">theme.config.mjs</code> —
        generates the CSS custom properties, the Tailwind utilities and the linter&rsquo;s allowlist,
        so a value cannot exist in code without existing in the system.
      </p>
      <p className="type-body mt-4 max-w-[68ch] text-text-subtle">
        Spatial values ship in <strong>rem</strong>, authored in px against a 16px root, so they
        follow a reader&rsquo;s browser font-size preference. Border width stays in px, because a
        hairline is a rendering fact rather than a proportion.
      </p>

      <Section
        title="How color works"
        lede="Read this once and the reference below becomes obvious. Every color token answers three questions in its name, in order."
      >
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
          {[
            ["Family", "What kind of thing is this?", "surface · text · border · action · status"],
            ["Role", "What job does it do?", "base · subtle · strong · accent · inverse"],
            ["State", "What is happening to it?", "hover · press · disabled"],
          ].map(([title, question, examples]) => (
            <div key={title} className="rounded-md border border-border-base p-4">
              <div className="type-eyebrow text-text-subtle">{title}</div>
              <div className="type-label-bold mt-1 text-text-strong">{question}</div>
              <div className="type-hint mt-2 text-text-subtle">{examples}</div>
            </div>
          ))}
        </div>

        <p className="type-body max-w-[68ch] text-text-subtle">
          So <code className="type-code">action-primary-hover</code> is the hover stop of the primary
          action fill, and <code className="type-code">text-subtle</code> is foreground that steps
          back. You never pick a color — you describe the job and the name follows.
        </p>

        <div className="rounded-md border border-border-base bg-surface-subtle p-4">
          <div className="type-label-bold text-text-strong">Surfaces and their text come in pairs</div>
          <p className="type-body mt-1 max-w-[68ch] text-text-subtle">
            Every surface has foreground colors that belong on it. Put{" "}
            <code className="type-code">text-base</code> on{" "}
            <code className="type-code">surface-base</code>, and{" "}
            <code className="type-code">text-inverse</code> on{" "}
            <code className="type-code">surface-inverse</code>. The contrast chips below show the
            ratio each foreground achieves on the default surface, so the pairing is checkable rather
            than a convention you have to remember.
          </p>
        </div>
      </Section>

      <Section
        title="Color reference"
        lede={`${tokenCounts.colorGroups} semantic tokens, each shipping a light and a dark value. Both are shown side by side, because a token that only works in one mode is a defect.`}
      >
        {colorGroups.map((group) => (
          <div key={group.key} className="flex flex-col gap-2">
            <div className="type-label-bold text-text-strong">{group.label}</div>
            <div className="type-hint text-text-subtle">{group.blurb}</div>
            <ColorSwatches group={group} limit={5} surface="#FFFFFF" />
          </div>
        ))}
      </Section>

      <Section
        title="Type"
        lede="Named by what the text is, not how big it is. The split that matters is label versus body: both 13px, but a label is single-line so its line box matches the 16px icon box, and body wraps so it takes more leading."
      >
        <div className="overflow-hidden rounded-md border border-border-base">
          {TYPE.map(([name, size, weight, use], i) => (
            <div
              key={name}
              className={`flex items-start gap-4 px-4 py-3 ${i === TYPE.length - 1 ? "" : "border-b border-border-subtle"}`}
            >
              <div className="w-52 shrink-0">
                <code className="type-code text-text-base">{name}</code>
                <div className="type-hint text-text-subtle">
                  {size} · {weight}
                </div>
              </div>
              <div className="min-w-0 flex-1">
                <span className={`${name} text-text-base`}>The quick brown fox</span>
              </div>
              <div className="type-hint w-48 shrink-0 text-text-subtle">{use}</div>
            </div>
          ))}
        </div>
      </Section>

      <Section
        title="Space"
        lede="A 4px grid, deliberately coarse above 8px. Fewer steps is what makes spacing consistent — a scale with every increment lets any value look defensible."
      >
        <SpaceScale tokens={space} />
      </Section>

      <Section title="Radius" lede="Six steps. Form controls take sm, containers and popovers md, cards xl, pills full.">
        <RadiusScale tokens={radius} />
      </Section>

      <Section
        title="Size"
        lede="Control heights and icon sizes, both driven by the sizing scalar. Icon md is 16px on purpose: it matches the label line box, so text and icon share a rhythm in a row."
      >
        <SizeScale tokens={sizeElement} kind="element" />
        <SizeScale tokens={sizeIcon} kind="icon" />
      </Section>

      <Section
        title="Border and elevation"
        lede="Elevation counts down: 1 is the highest surface, 3 the softest, 0 flat. If two surfaces overlap, the one on top takes the lower number."
      >
        <BorderScale tokens={borderWidth} />
        <ElevationScale tokens={elevation} />
      </Section>

      <Section
        title="Motion"
        lede="Two bands and exactly one easing curve. A single curve is deliberate: systems that ship five easings mostly ship five things nobody can choose between. There is no slow band — anything near a second reads as the product being slow."
      >
        <MotionScale tokens={duration} easing="cubic-bezier(0.24, 1, 0.4, 1)" />
      </Section>

      <Section
        title="Scalars"
        lede="Five dials that re-tune whole families from one number. The type scalar scales the entire ramp proportionally, which is the right mechanism for a roomier reading mode."
      >
        <ScalarList tokens={scalars} />
      </Section>
    </>
  )
}
