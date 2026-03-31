# Primitives Section — Ready to Push to Token Mapping Sheet

Insert as Section 0 (before Section 1: Color Tokens)

## Structure

- Collection: **Primitives**
- Modes: **1** (no light/dark — raw values are mode-independent)
- Published: **Hidden** (never used directly by designers)
- Purpose: Aliased by Semantic tokens

## 0A. Blue (8 tokens)

| Token | Hex | Figma Path | Used by |
|-------|-----|-----------|---------|
| blue100 | #F0F8FF | primitives/blue | bg-info wash (8% opacity) |
| blue200 | #D7EDFE | primitives/blue | — |
| blue300 | #BAE1FC | primitives/blue | --primary-active (dark) |
| blue400 | #8ACAFF | primitives/blue | --primary-hover (dark), --ring (dark) |
| blue500 | #4299E0 | primitives/blue | --primary (dark), --chart-1, --ai-gradient-start |
| blue600 | #2272B4 | primitives/blue | --primary (light), --ring (light) |
| blue700 | #0E538B | primitives/blue | --primary-hover (light) |
| blue800 | #04355D | primitives/blue | --primary-active (light) |

## 0B. Green (8 tokens)

| Token | Hex | Figma Path | Used by |
|-------|-----|-----------|---------|
| green100 | #F3FCF6 | primitives/green | bg-success wash |
| green200 | #D4F7DF | primitives/green | — |
| green300 | #B1ECC5 | primitives/green | — |
| green400 | #8DDDA8 | primitives/green | — |
| green500 | #3BA65E | primitives/green | --success (dark), --chart-2 |
| green600 | #277C43 | primitives/green | --success (light) |
| green700 | #115026 | primitives/green | — |
| green800 | #093919 | primitives/green | — |

## 0C. Red (8 tokens)

| Token | Hex | Figma Path | Used by |
|-------|-----|-----------|---------|
| red100 | #FFF5F7 | primitives/red | bg-danger wash |
| red200 | #FDE2E8 | primitives/red | — |
| red300 | #FBD0D8 | primitives/red | --destructive-active (dark) |
| red400 | #F792A6 | primitives/red | --destructive-hover (dark) |
| red500 | #E65B77 | primitives/red | --destructive (dark) |
| red600 | #C82D4C | primitives/red | --destructive (light) |
| red700 | #9E102C | primitives/red | --destructive-hover (light) |
| red800 | #630316 | primitives/red | --destructive-active (light) |

## 0D. Yellow (8 tokens)

| Token | Hex | Figma Path | Used by |
|-------|-----|-----------|---------|
| yellow100 | #FFF9EB | primitives/yellow | bg-warning wash |
| yellow200 | #FCEACA | primitives/yellow | — |
| yellow300 | #F8D4A5 | primitives/yellow | — |
| yellow400 | #F2BE88 | primitives/yellow | — |
| yellow500 | #DE7921 | primitives/yellow | --warning (dark), --chart-3 |
| yellow600 | #BE501E | primitives/yellow | --warning (light) |
| yellow700 | #93320B | primitives/yellow | — |
| yellow800 | #5F1B02 | primitives/yellow | — |

## 0E. Grey — cool tones, dark mode (11 tokens)

| Token | Hex | Figma Path | Used by |
|-------|-----|-----------|---------|
| grey050 | #F6F7F9 | primitives/grey | — |
| grey100 | #E8ECF0 | primitives/grey | --foreground (dark) |
| grey200 | #D1D9E1 | primitives/grey | — |
| grey300 | #C0CDD8 | primitives/grey | --border-accessible (dark) |
| grey350 | #92A4B3 | primitives/grey | --muted-foreground (dark) |
| grey400 | #8396A5 | primitives/grey | — |
| grey500 | #5F7281 | primitives/grey | — |
| grey600 | #445461 | primitives/grey | — |
| grey650 | #37444F | primitives/grey | --input (dark), --code-background (dark) |
| grey700 | #1F272D | primitives/grey | --secondary (dark), --border (dark) |
| grey800 | #11171C | primitives/grey | --background (dark), --primary-fg (dark) |

## 0F. Neutral — warm tones, light mode (11 tokens)

| Token | Hex | Figma Path | Used by |
|-------|-----|-----------|---------|
| neutral050 | #F7F7F7 | primitives/neutral | --secondary (light) |
| neutral100 | #EBEBEB | primitives/neutral | --border (light) |
| neutral200 | #D8D8D8 | primitives/neutral | — |
| neutral300 | #CBCBCB | primitives/neutral | --input (light) |
| neutral350 | #A2A2A2 | primitives/neutral | — |
| neutral400 | #939393 | primitives/neutral | — |
| neutral500 | #6F6F6F | primitives/neutral | --muted-fg (light), --border-accessible (light) |
| neutral600 | #525252 | primitives/neutral | — |
| neutral650 | #424242 | primitives/neutral | — |
| neutral700 | #262626 | primitives/neutral | — |
| neutral800 | #161616 | primitives/neutral | --foreground (light) |

## 0G. Categorical — Tags, avatars, charts (10 tokens)

| Token | Hex | Figma Path | Used by | Note |
|-------|-----|-----------|---------|------|
| brown | #A6630C | primitives/categorical | Tag, avatar, chart | |
| coral | #C83243 | primitives/categorical | Tag, --chart-5 | |
| indigo | #434A93 | primitives/categorical | Tag, avatar | |
| lemon | #FACB66 | primitives/categorical | Tag | ⚠️ Test contrast on white |
| lime | #308613 | primitives/categorical | Tag | ⚠️ Test contrast on white |
| pink | #B45091 | primitives/categorical | Tag, avatar | |
| purple | #8A63BF | primitives/categorical | Tag, --chart-4 | |
| teal | #04867D | primitives/categorical | Tag, avatar | |
| turquoise | #137DAE | primitives/categorical | Tag | |
| charcoal | #424242 | primitives/categorical | Tag (inverse) | |

## 0H. Base (1 token)

| Token | Hex | Figma Path | Used by |
|-------|-----|-----------|---------|
| white | #FFFFFF | primitives/base | --background (light), --primary-fg (light) |

## AI Gradient (3 tokens)

| Token | Hex | Figma Path | Used by |
|-------|-----|-----------|---------|
| ai-gradient-start | #4299E0 | primitives/brand/ai | AI avatar, AI badges |
| ai-gradient-mid | #CA42E0 | primitives/brand/ai | AI gradient treatment |
| ai-gradient-end | #FF5F46 | primitives/brand/ai | AI gradient treatment |

---

## Total: 68 primitive tokens + 3 AI brand = 71 hidden variables
