# DBUI color primitives — validation report

**Source:** Figma: DBUI Design System, node 4274-5096 ('Product UI Colors')  
**Values fetched:** 2026-07-30 (exact from Figma swatch fills)  
**Generated:** 2026-07-30 by `scripts/color-audit.mjs` (dependency-free, reproducible)

## Findings (auto-generated)

Each item is machine-checked from the values below. This section is the linter output; the tables are the evidence.

- On **white**, the 500 step of teal, lime is below 3:1 — not safe as text/icon/border on white; use a darker step (600–700) in light mode.
- Categorical **first-5 (light)** pair gold↔lime is only ΔE00 13.7 in *normal* vision (target ≥15) — collapses further under CVD.
- **Status** red/green and the 11-hue **viz qualitative** sets are not CVD-separable (expected with this many hues) — never encode meaning by color alone; pair with icon, label, or direct annotation.

## Methodology

| Test | Standard / method | Pass criteria |
|---|---|---|
| Contrast (normative) | WCAG 2.2 luminance ratio | Body text ≥ 4.5:1; large text (≥24px, or ≥19px bold) & non-text/UI (SC 1.4.11) ≥ 3:1 |
| Contrast (perceptual) | APCA Lc (WCAG 3 candidate, advisory) | Body ~Lc 60; large/bold ~Lc 45; non-text ~Lc 30. Signed; abs value shown. Not a conformance claim |
| Ramp smoothness | OKLCH (Ottosson) lightness-locked ramps + CIEDE2000 step deltas | Even ΔL per step (low CV), monotonic lightness, minimal hue drift, chroma arc tapering at ends |
| Color difference | CIEDE2000 (ΔE00) | JND ≈ 2.3; categorical separation target ≥ 15 |
| CVD | Machado, Oliveira & Fernandes (2009), severity 1.0 — the model Chrome DevTools uses | Ramps stay monotonic & steps distinct; categorical sets keep min ΔE00 ≥ ~10 |

*Refs: WCAG 2.2 (W3C Rec); APCA-W3 0.1.9 (Myndex/WCAG 3 draft); Machado et al. 2009; Oklab (Ottosson 2020). CVD severity 1.0 = full dichromacy (worst case); real anomalous trichromats are less severe.*

## 1. Color matrix (exact hex)

### Surface

| Ramp | 050 | 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900 |
|---|---|---|---|---|---|---|---|---|---|---|
| neutral | #F7F7F7 | #EBEBEB | #D8D8D8 | #CBCBCB | #A2A2A2 | #939393 | #6F6F6F | #525252 | #262626 | #161616 |
| cool | #F6F7F9 | #E8ECF0 | #D1D9E1 | #C0CDD8 | #92A4B3 | #8396A5 | #5F7281 | #445461 | #1F272D | #11171C |
| warm | #F9F7F4 | #F1ECE6 | #E2DAD0 | #D1C6BA | #AFA193 | #9E8F80 | #786A5C | #5A4D41 | #2E2620 | #1B1612 |

### Status

| Ramp | 050 | 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900 |
|---|---|---|---|---|---|---|---|---|---|---|
| red | #FFFAFB | #FFF5F7 | #FDE2E8 | #FBD0D8 | #F792A6 | #E65B77 | #C82D4C | #9E102C | #630316 | #3A010B |
| yellow | #FFFCF4 | #FFF9EB | #FCEACA | #F8D4A5 | #F2BE88 | #DE7921 | #BE501E | #93320B | #5F1B02 | #381001 |
| green | #F8FEF9 | #F3FCF6 | #D4F7DF | #B1ECC5 | #8DDDA8 | #3BA65E | #277C43 | #115026 | #093919 | #04220E |
| blue | #F5FBFF | #F0F8FF | #D7EDFE | #BAE1FC | #8ACAFF | #4299E0 | #2272B4 | #0E538B | #04355D | #021E38 |

### Viz

| Ramp | 050 | 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900 |
|---|---|---|---|---|---|---|---|---|---|---|
| pink | #F7F3F4 | #EDDEE3 | #E6BCCA | #E68AA9 | #F06292 | #D4005B | #A11E4E | #79173C | #5A102D | #3F0A21 |
| plum | #F6F4F6 | #E8E3E8 | #D8CAD8 | #C7A8C7 | #AD6DAD | #97409A | #882F80 | #781B65 | #57194A | #3B1634 |
| purple | #F4F4F6 | #E4E1EA | #CEC5DD | #B09ED2 | #9575CD | #8555C9 | #6B3CAE | #563389 | #422A64 | #302245 |
| indigo | #F3F4F7 | #DFE1EC | #BFC6E3 | #90A0E0 | #6B7ED6 | #4E62BA | #435A98 | #375276 | #2D3E56 | #232D3C |
| cyan | #E9F8FD | #D2F1FC | #A5E5F9 | #65D3F4 | #22BFE5 | #169DBD | #0F7B95 | #085B6E | #084150 | #0A2C36 |
| teal | #EAFBFA | #C6F4F1 | #9BE8E3 | #6CD7D2 | #3FC3BD | #35A7A2 | #2C8985 | #226A67 | #1A4E4C | #143735 |
| sage | #F4F6F6 | #E1EAE9 | #C2D4CF | #96BEB5 | #72B3A6 | #3D8F7E | #217766 | #065F4D | #084438 | #0A2D26 |
| lime | #F6F9E3 | #E6F283 | #D4E157 | #C1C94B | #ADB045 | #9E9D00 | #807E39 | #656330 | #4A4824 | #312F17 |
| gold | #F9F7EF | #F9E9BA | #FFD54F | #FFA400 | #DD9232 | #BD7C30 | #9D662C | #7D5125 | #5E3C1C | #3F2711 |
| orange | #F7F3F2 | #EFE0DC | #EAC4B8 | #EF9B80 | #FF8A65 | #E96030 | #CC471F | #B12E0B | #7F2710 | #552012 |
| brown | #F5F5F4 | #E7E5E4 | #D5CFCD | #C0B4AF | #A1887F | #A8796D | #8C6156 | #6F4F46 | #533D37 | #3A2D2A |

### Categorical (fixed sets — light / dark variants)

**first-5**

| Slot | Light | Dark |
|---|---|---|
| purple | #9575CD | #8555C9 |
| gold | #FFD54F | #BD7C30 |
| teal | #6CD7D2 | #2C8985 |
| pink | #F06292 | #A11E4E |
| lime | #D4E157 | #9E9D00 |

**next-5**

| Slot | Light | Dark |
|---|---|---|
| brown | #A1887F | #A8796D |
| indigo | #90A0E0 | #517CB6 |
| orange | #EF9B80 | #CC471F |
| sage | #96BEB5 | #217766 |
| plum | #AD6DAD | #C020A0 |

## 2. WCAG 2.2 contrast — vs white / vs black

### Surface — ratio (W / B)

| Ramp | 050 | 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900 |
|---|---|---|---|---|---|---|---|---|---|---|
| neutral | 1.07 / 19.60 | 1.19 / 17.62 | 1.43 / 14.73 | 1.62 / 12.94 | 2.55 / 8.23 | 3.07 / 6.84 | 5.02 / 4.18 | 7.81 / 2.69 | 15.13 / 1.39 | 18.10 / 1.16 |
| cool | 1.07 / 19.59 | 1.19 / 17.69 | 1.43 / 14.72 | 1.62 / 12.97 | 2.57 / 8.18 | 3.06 / 6.87 | 4.99 / 4.21 | 7.82 / 2.69 | 15.15 / 1.39 | 18.05 / 1.16 |
| warm | 1.07 / 19.64 | 1.17 / 17.88 | 1.38 / 15.17 | 1.68 / 12.50 | 2.52 / 8.34 | 3.14 / 6.69 | 5.23 / 4.01 | 8.16 / 2.57 | 14.85 / 1.41 | 17.95 / 1.17 |

### Status — ratio (W / B)

| Ramp | 050 | 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900 |
|---|---|---|---|---|---|---|---|---|---|---|
| red | 1.03 / 20.32 | 1.07 / 19.66 | 1.22 / 17.22 | 1.39 / 15.12 | 2.18 / 9.62 | 3.43 / 6.13 | 5.34 / 3.94 | 8.19 / 2.56 | 13.50 / 1.56 | 17.66 / 1.19 |
| yellow | 1.03 / 20.48 | 1.05 / 20.00 | 1.18 / 17.76 | 1.40 / 14.95 | 1.68 / 12.50 | 3.06 / 6.86 | 4.82 / 4.36 | 7.77 / 2.70 | 12.77 / 1.64 | 16.90 / 1.24 |
| green | 1.02 / 20.54 | 1.05 / 20.07 | 1.16 / 18.17 | 1.34 / 15.67 | 1.61 / 13.04 | 3.09 / 6.80 | 5.18 / 4.05 | 9.55 / 2.20 | 13.04 / 1.61 | 16.93 / 1.24 |
| blue | 1.04 / 20.13 | 1.07 / 19.58 | 1.20 / 17.43 | 1.38 / 15.26 | 1.75 / 11.97 | 3.06 / 6.86 | 5.08 / 4.13 | 7.99 / 2.63 | 12.56 / 1.67 | 16.86 / 1.25 |

### Viz — ratio (W / B)

| Ramp | 050 | 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900 |
|---|---|---|---|---|---|---|---|---|---|---|
| pink | 1.10 / 19.08 | 1.30 / 16.16 | 1.69 / 12.41 | 2.45 / 8.57 | 3.06 / 6.87 | 5.32 / 3.95 | 7.47 / 2.81 | 10.50 / 2.00 | 13.58 / 1.55 | 16.45 / 1.28 |
| plum | 1.09 / 19.19 | 1.27 / 16.58 | 1.57 / 13.36 | 2.13 / 9.85 | 3.77 / 5.57 | 5.97 / 3.52 | 7.59 / 2.77 | 9.80 / 2.14 | 12.78 / 1.64 | 15.55 / 1.35 |
| purple | 1.10 / 19.12 | 1.29 / 16.26 | 1.66 / 12.65 | 2.42 / 8.67 | 3.68 / 5.70 | 5.07 / 4.14 | 7.28 / 2.88 | 9.42 / 2.23 | 12.02 / 1.75 | 14.58 / 1.44 |
| indigo | 1.10 / 19.09 | 1.30 / 16.12 | 1.69 / 12.40 | 2.53 / 8.29 | 3.76 / 5.58 | 5.56 / 3.78 | 6.66 / 3.15 | 7.98 / 2.63 | 10.85 / 1.94 | 13.89 / 1.51 |
| cyan | 1.09 / 19.31 | 1.18 / 17.73 | 1.38 / 15.18 | 1.72 / 12.18 | 2.18 / 9.65 | 3.19 / 6.59 | 4.90 / 4.29 | 7.69 / 2.73 | 11.16 / 1.88 | 14.72 / 1.43 |
| teal | 1.07 / 19.68 | 1.19 / 17.61 | 1.40 / 15.05 | 1.71 / 12.29 | 2.15 / 9.75 | 2.92 / 7.20 | 4.18 / 5.02 | 6.31 / 3.33 | 9.38 / 2.24 | 12.90 / 1.63 |
| sage | 1.08 / 19.36 | 1.22 / 17.15 | 1.54 / 13.61 | 2.03 / 10.33 | 2.41 / 8.71 | 3.87 / 5.43 | 5.39 / 3.90 | 7.63 / 2.75 | 11.09 / 1.89 | 14.83 / 1.42 |
| lime | 1.07 / 19.58 | 1.21 / 17.39 | 1.43 / 14.71 | 1.79 / 11.72 | 2.31 / 9.07 | 2.89 / 7.28 | 4.23 / 4.96 | 6.21 / 3.38 | 9.36 / 2.24 | 13.55 / 1.55 |
| gold | 1.07 / 19.58 | 1.21 / 17.39 | 1.41 / 14.88 | 1.99 / 10.56 | 2.55 / 8.23 | 3.45 / 6.09 | 4.80 / 4.37 | 6.83 / 3.08 | 9.82 / 2.14 | 13.91 / 1.51 |
| orange | 1.10 / 19.06 | 1.28 / 16.37 | 1.60 / 13.09 | 2.17 / 9.67 | 2.31 / 9.08 | 3.40 / 6.18 | 4.68 / 4.49 | 6.43 / 3.27 | 9.55 / 2.20 | 13.11 / 1.60 |
| brown | 1.09 / 19.25 | 1.26 / 16.73 | 1.54 / 13.64 | 2.02 / 10.39 | 3.31 / 6.34 | 3.74 / 5.62 | 5.30 / 3.96 | 7.28 / 2.88 | 10.05 / 2.09 | 13.22 / 1.59 |

> Read each cell as `contrast-vs-white / contrast-vs-black`. A step is usable as **body text** on that background at ≥ 4.5, as **large text / icon / border** at ≥ 3.

**First step reaching text thresholds (as foreground):**

| Ramp | ≥3:1 on white | ≥4.5:1 on white | ≥3:1 on black | ≥4.5:1 on black |
|---|--:|--:|--:|--:|
| surface/neutral | 500 | 600 | 050 | 050 |
| surface/cool | 500 | 600 | 050 | 050 |
| surface/warm | 500 | 600 | 050 | 050 |
| status/red | 500 | 600 | 050 | 050 |
| status/yellow | 500 | 600 | 050 | 050 |
| status/green | 500 | 600 | 050 | 050 |
| status/blue | 500 | 600 | 050 | 050 |
| viz/pink | 400 | 500 | 050 | 050 |
| viz/plum | 400 | 500 | 050 | 050 |
| viz/purple | 400 | 500 | 050 | 050 |
| viz/indigo | 400 | 500 | 050 | 050 |
| viz/cyan | 500 | 600 | 050 | 050 |
| viz/teal | 600 | 700 | 050 | 050 |
| viz/sage | 500 | 600 | 050 | 050 |
| viz/lime | 600 | 700 | 050 | 050 |
| viz/gold | 500 | 600 | 050 | 050 |
| viz/orange | 500 | 600 | 050 | 050 |
| viz/brown | 400 | 600 | 050 | 050 |

## 3. APCA Lc (advisory) — as text on white / on black

### Surface — |Lc| (on W / on B)

| Ramp | 050 | 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900 |
|---|---|---|---|---|---|---|---|---|---|---|
| neutral | 0 / 103 | 9 / 95 | 20 / 83 | 28 / 75 | 50 / 52 | 58 / 44 | 75 / 27 | 87 / 15 | 102 / 0 | 105 / 0 |
| cool | 0 / 103 | 9 / 95 | 20 / 83 | 28 / 75 | 50 / 52 | 57 / 44 | 75 / 27 | 87 / 15 | 102 / 0 | 105 / 0 |
| warm | 0 / 103 | 8 / 96 | 19 / 85 | 30 / 73 | 49 / 53 | 58 / 43 | 76 / 26 | 88 / 14 | 102 / 0 | 105 / 0 |

### Status — |Lc| (on W / on B)

| Ramp | 050 | 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900 |
|---|---|---|---|---|---|---|---|---|---|---|
| red | 0 / 105 | 0 / 103 | 11 / 93 | 19 / 85 | 43 / 60 | 61 / 41 | 75 / 27 | 86 / 16 | 98 / 0 | 104 / 0 |
| yellow | 0 / 106 | 0 / 104 | 9 / 95 | 20 / 84 | 30 / 73 | 57 / 45 | 73 / 29 | 86 / 16 | 98 / 0 | 103 / 0 |
| green | 0 / 106 | 0 / 104 | 0 / 97 | 17 / 87 | 27 / 76 | 57 / 44 | 75 / 26 | 92 / 11 | 99 / 0 | 104 / 0 |
| blue | 0 / 105 | 0 / 103 | 10 / 94 | 18 / 85 | 32 / 71 | 57 / 45 | 75 / 27 | 87 / 15 | 98 / 0 | 104 / 0 |

### Viz — |Lc| (on W / on B)

| Ramp | 050 | 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900 |
|---|---|---|---|---|---|---|---|---|---|---|
| pink | 0 / 101 | 15 / 89 | 30 / 73 | 48 / 54 | 57 / 45 | 74 / 28 | 84 / 18 | 93 / 9 | 99 / 0 | 103 / 0 |
| plum | 0 / 101 | 13 / 91 | 26 / 77 | 42 / 60 | 65 / 37 | 79 / 23 | 86 / 16 | 92 / 11 | 98 / 0 | 102 / 0 |
| purple | 0 / 101 | 14 / 89 | 29 / 74 | 48 / 54 | 64 / 37 | 75 / 27 | 85 / 17 | 91 / 11 | 97 / 0 | 101 / 0 |
| indigo | 0 / 101 | 15 / 89 | 30 / 73 | 50 / 52 | 65 / 37 | 78 / 24 | 83 / 19 | 88 / 15 | 95 / 8 | 100 / 0 |
| cyan | 0 / 101 | 9 / 95 | 19 / 85 | 31 / 72 | 42 / 60 | 59 / 43 | 73 / 28 | 86 / 16 | 95 / 0 | 101 / 0 |
| teal | 0 / 103 | 9 / 95 | 19 / 84 | 30 / 72 | 42 / 60 | 55 / 47 | 69 / 33 | 81 / 21 | 91 / 11 | 99 / 0 |
| sage | 0 / 102 | 11 / 93 | 25 / 78 | 40 / 63 | 47 / 55 | 66 / 36 | 77 / 25 | 86 / 16 | 95 / 7 | 102 / 0 |
| lime | 0 / 103 | 10 / 94 | 20 / 83 | 33 / 70 | 46 / 57 | 55 / 47 | 69 / 32 | 81 / 21 | 92 / 11 | 100 / 0 |
| gold | 0 / 103 | 10 / 94 | 20 / 84 | 38 / 64 | 50 / 52 | 62 / 40 | 73 / 29 | 83 / 19 | 93 / 10 | 100 / 0 |
| orange | 0 / 101 | 14 / 90 | 27 / 76 | 42 / 60 | 45 / 57 | 61 / 41 | 71 / 30 | 81 / 21 | 91 / 11 | 99 / 0 |
| brown | 0 / 101 | 13 / 91 | 25 / 78 | 39 / 63 | 60 / 41 | 65 / 37 | 76 / 25 | 85 / 17 | 93 / 9 | 100 / 0 |

> Absolute Lc shown. Guidance: `~60` body, `~45` large/bold, `~30` non-text. APCA is advisory (WCAG 3 draft), not a conformance verdict.

## 4. OKLCH ramp smoothness

### 4a. Lightness scale (OKLCH L×100) — should be ~constant down each column across hues

| Ramp | 050 | 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900 |
|---|---|---|---|---|---|---|---|---|---|---|
| surface/neutral | 98 | 94 | 88 | 84 | 71 | 66 | 54 | 44 | 27 | 20 |
| surface/cool | 98 | 94 | 88 | 84 | 71 | 66 | 54 | 44 | 27 | 20 |
| surface/warm | 98 | 95 | 89 | 83 | 72 | 66 | 53 | 43 | 28 | 20 |
| status/red | 99 | 98 | 94 | 90 | 77 | 66 | 55 | 45 | 32 | 22 |
| status/yellow | 99 | 98 | 94 | 89 | 84 | 68 | 57 | 45 | 33 | 24 |
| status/green | 99 | 98 | 94 | 89 | 83 | 65 | 52 | 38 | 30 | 22 |
| status/blue | 98 | 98 | 94 | 89 | 82 | 66 | 54 | 43 | 32 | 23 |
| viz/pink | 97 | 91 | 84 | 74 | 69 | 56 | 47 | 39 | 32 | 25 |
| viz/plum | 97 | 92 | 85 | 77 | 63 | 52 | 47 | 41 | 33 | 27 |
| viz/purple | 97 | 91 | 84 | 73 | 63 | 56 | 47 | 41 | 34 | 29 |
| viz/indigo | 97 | 91 | 83 | 72 | 62 | 53 | 48 | 43 | 36 | 29 |
| viz/cyan | 97 | 94 | 89 | 81 | 75 | 64 | 54 | 44 | 35 | 27 |
| viz/teal | 98 | 93 | 88 | 81 | 75 | 66 | 58 | 48 | 39 | 31 |
| viz/sage | 97 | 93 | 85 | 77 | 72 | 59 | 51 | 43 | 35 | 27 |
| viz/lime | 97 | 93 | 87 | 81 | 73 | 67 | 58 | 49 | 39 | 30 |
| viz/gold | 98 | 94 | 89 | 79 | 72 | 64 | 56 | 48 | 39 | 30 |
| viz/orange | 97 | 92 | 85 | 77 | 75 | 66 | 58 | 50 | 41 | 32 |
| viz/brown | 97 | 92 | 86 | 78 | 65 | 62 | 53 | 46 | 38 | 31 |

**Cross-hue lightness alignment per step** (low spread = lightness locked across families):

| Step | 050 | 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900 |
| L× mean | 98 | 94 | 88 | 81 | 72 | 63 | 53 | 44 | 34 | 26 |
| L× stdev | 0.8 | 2.4 | 3.6 | 5.6 | 6.4 | 5.0 | 3.6 | 3.2 | 4.2 | 4.0 |

### 4b. Per-ramp evenness & drift

`ΔL CV%` = evenness of lightness steps (lower better). `ΔE00 CV%` = perceptual step evenness. `Hue drift` = max−min OKLCH hue across steps with C>0.02. `Chroma peak` = step of max chroma.

| Ramp | L range | ΔL CV% | ΔE00 mean | ΔE00 CV% | Mono L | Hue drift° | Chroma peak | Verdict |
|---|---|--:|--:|--:|:--:|--:|:--:|---|
| surface/neutral | 20–98 | 51.3 | 7.7 | 57.5 | yes | 0 | 050 | uneven ΔL, uneven ΔE |
| surface/cool | 20–98 | 52.1 | 8.0 | 55.3 | yes | 2 | 600 | uneven ΔL, uneven ΔE |
| surface/warm | 20–98 | 44.5 | 7.9 | 49.5 | yes | 5 | 500 | uneven ΔL, uneven ΔE |
| status/red | 22–99 | 47.6 | 9.8 | 39.1 | yes | 17 | 600 | uneven ΔL |
| status/yellow | 24–99 | 54.0 | 10.1 | 45.3 | yes | 44 | 500 | uneven ΔL, uneven ΔE, hue drift |
| status/green | 22–99 | 61.2 | 9.7 | 48.3 | yes | 6 | 500 | uneven ΔL, uneven ΔE |
| status/blue | 23–98 | 51.5 | 8.9 | 44.1 | yes | 11 | 500 | uneven ΔL |
| viz/pink | 25–97 | 29.0 | 9.6 | 34.3 | yes | 11 | 500 | ok |
| viz/plum | 27–97 | 35.9 | 8.9 | 45.1 | yes | 12 | 500 | uneven ΔE |
| viz/purple | 29–97 | 23.2 | 9.0 | 27.9 | yes | 4 | 500 | ok |
| viz/indigo | 29–97 | 30.1 | 8.3 | 32.1 | yes | 19 | 500 | ok |
| viz/cyan | 27–97 | 30.6 | 8.3 | 26.2 | yes | 2 | 400 | ok |
| viz/teal | 31–98 | 23.1 | 8.1 | 21.3 | yes | 1 | 400 | ok |
| viz/sage | 27–97 | 28.3 | 8.3 | 25.9 | yes | 7 | 600 | ok |
| viz/lime | 30–97 | 24.4 | 9.4 | 41.3 | yes | 10 | 200 | ok |
| viz/gold | 30–98 | 23.5 | 10.6 | 26.8 | yes | 30 | 300 | ok |
| viz/orange | 32–97 | 35.0 | 9.1 | 23.5 | yes | 4 | 500 | ok |
| viz/brown | 31–97 | 36.7 | 7.8 | 34.6 | yes | 6 | 500 | ok |

## 5. Color vision deficiency (CVD)

### 5a. Ramps stay ordered & distinct under CVD

Min consecutive ΔE00 between steps once simulated (⚠︎ <2.3 = steps merge). `Mono` = lightness order preserved (deuteranopia).

| Ramp | normal minΔ | deutan minΔ | protan minΔ | tritan minΔ | achroma minΔ | deutan mono |
|---|--:|--:|--:|--:|--:|:--:|
| surface/neutral | 2.5 | 2.5 | 2.5 | 2.5 | 2.5 | yes |
| surface/cool | 2.8 | 2.8 | 2.6 | 3.2 | 2.4 | yes |
| surface/warm | 2.8 | 2.8 | 2.8 | 3.1 | 2.2 ⚠︎ | yes |
| status/red | 2.5 | 0.8 ⚠︎ | 0.9 ⚠︎ | 2.5 | 0.8 ⚠︎ | yes |
| status/yellow | 2.6 | 2.7 | 2.6 | 1.9 ⚠︎ | 0.6 ⚠︎ | yes |
| status/green | 1.5 | 0.6 ⚠︎ | 0.6 ⚠︎ | 1.7 ⚠︎ | 0.5 ⚠︎ | yes |
| status/blue | 1.6 | 1.7 ⚠︎ | 1.5 ⚠︎ | 1.6 ⚠︎ | 0.6 ⚠︎ | yes |
| viz/pink | 5.9 | 3.8 | 3.8 | 6.2 | 3.9 | yes |
| viz/plum | 4.1 | 3.5 | 3.7 | 3.8 | 3.4 | yes |
| viz/purple | 5.5 | 4.7 | 4.9 | 4.0 | 3.8 | yes |
| viz/indigo | 5.5 | 5.4 | 5.3 | 4.4 | 4.0 | yes |
| viz/cyan | 5.3 | 4.5 | 3.6 | 4.5 | 2.0 ⚠︎ | yes |
| viz/teal | 5.9 | 3.9 | 2.1 ⚠︎ | 4.9 | 2.6 | yes |
| viz/sage | 4.4 | 3.0 | 2.7 | 5.0 | 2.8 | yes |
| viz/lime | 5.2 | 5.1 | 5.5 | 4.1 | 2.8 | yes |
| viz/gold | 7.9 | 7.5 | 6.9 | 3.8 | 2.8 | yes |
| viz/orange | 5.8 | 4.5 | 4.4 | 5.2 | 1.6 ⚠︎ | yes |
| viz/brown | 3.4 | 3.3 | 3.3 | 3.6 | 3.2 | yes |

### 5b. Categorical / qualitative sets — pairwise distinguishability

Closest pair (min ΔE00) after simulation. ⚠︎ <10 confusable, `(tight)` <15. Target ≥15 for categorical.

**first-5 — light**

| CVD | min ΔE00 | worst pair |
|---|--:|---|
| normal | 13.7 (tight) | gold ↔ lime |
| deutan | 2.0 ⚠︎ | gold ↔ lime |
| protan | 1.1 ⚠︎ | gold ↔ lime |
| tritan | 16.6 | gold ↔ lime |
| achroma | 0.3 ⚠︎ | gold ↔ lime |

**first-5 — dark**

| CVD | min ΔE00 | worst pair |
|---|--:|---|
| normal | 23.0 | gold ↔ lime |
| deutan | 4.6 ⚠︎ | gold ↔ lime |
| protan | 8.7 ⚠︎ | gold ↔ lime |
| tritan | 17.7 | gold ↔ lime |
| achroma | 4.7 ⚠︎ | gold ↔ lime |

**next-5 — light**

| CVD | min ΔE00 | worst pair |
|---|--:|---|
| normal | 17.2 | brown ↔ orange |
| deutan | 10.4 (tight) | indigo ↔ plum |
| protan | 12.6 (tight) | brown ↔ orange |
| tritan | 8.0 ⚠︎ | indigo ↔ sage |
| achroma | 1.6 ⚠︎ | orange ↔ sage |

**next-5 — dark**

| CVD | min ΔE00 | worst pair |
|---|--:|---|
| normal | 17.4 | brown ↔ orange |
| deutan | 5.2 ⚠︎ | indigo ↔ plum |
| protan | 6.9 ⚠︎ | brown ↔ sage |
| tritan | 8.8 ⚠︎ | indigo ↔ sage |
| achroma | 0.4 ⚠︎ | sage ↔ plum |

**Viz qualitative @ 400 (11 hues)**

| CVD | min ΔE00 | worst pair |
|---|--:|---|
| normal | 7.6 ⚠︎ | teal ↔ sage |
| deutan | 2.6 ⚠︎ | lime ↔ gold |
| protan | 1.5 ⚠︎ | purple ↔ indigo |
| tritan | 2.7 ⚠︎ | cyan ↔ teal |
| achroma | 0.0 ⚠︎ | lime ↔ orange |

**Viz qualitative @ 600 (11 hues)**

| CVD | min ΔE00 | worst pair |
|---|--:|---|
| normal | 9.0 ⚠︎ | teal ↔ sage |
| deutan | 2.8 ⚠︎ | lime ↔ gold |
| protan | 3.5 ⚠︎ | gold ↔ orange |
| tritan | 3.9 ⚠︎ | cyan ↔ teal |
| achroma | 0.4 ⚠︎ | teal ↔ lime |

**Status @ 600 (red/yellow/green/blue)**

| CVD | min ΔE00 | worst pair |
|---|--:|---|
| normal | 19.8 | red ↔ yellow |
| deutan | 5.8 ⚠︎ | red ↔ green |
| protan | 7.5 ⚠︎ | yellow ↔ green |
| tritan | 3.4 ⚠︎ | red ↔ yellow |
| achroma | 0.5 ⚠︎ | green ↔ blue |

> Red↔green merging under deuteranopia/protanopia is expected physics — status must never rely on color alone; pair with icon + text label.
