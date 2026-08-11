# Tokens page — text cut from the panel headers

Cut so `/docs/tokens` reads as a list of tokens and their names rather than an
essay with a list inside it. Kept here because each line is a real claim about
what the family is *for*, and none of it is recoverable from the token data —
the generated modules carry names and values, not intent.

Not published, not documentation. If any of it earns a home, the likely one is
the component or token JSDoc, where a reader meets it while making the decision
it informs.

## Type registers

Three registers, each answering "how is this text read", which is the question
that decides the step. The blurbs were the only place that distinction was
stated in the UI.

| Register | Cut text |
|---|---|
| Interface | Glanced at, a piece at a time |
| Reading | Read straight through, line after line |
| Display | Headings, 4 down to 1 |

The useful part is the pairing: Interface is glanced at so it stays flush and
tight, Reading is read in sequence so it takes the measure and a looser leading,
Display is neither and exists to be scanned past. `docs/token-rules.md` states
the ramp rule; it does not state this.

## Dimension families

| Family | Cut text |
|---|---|
| Scalars | The grid unit, and the two dials that multiply it. |
| Space | Padding, margin and gap. Each stop is its multiple of the grid unit. |
| Size | Width and height. Same grid as space, so a stop is its multiple of the unit. |
| Radius | Corners, on the same grid. Controls take 1, containers and popovers 2, cards 4, pills full. |
| Border | Hairline weights, and the one family whose number counts px rather than grid units. |

Two of these carry something the values alone do not:

- **Radius** named which role takes which stop. That mapping now lives in the
  `shape/*` roles, which is a better home — a role is the mapping, where a
  sentence about it is a copy that can fall out of step.
- **Border** flagged the one family measured in px rather than grid units. That
  is a real exception and worth stating somewhere; nothing else says it.

## Colour families and groups

Left alone. Those blurbs come from the generated token data rather than being
authored on the page, so removing them from the header does not lose them.
