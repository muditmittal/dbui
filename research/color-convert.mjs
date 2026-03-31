// Color conversion script - no dependencies needed
// Implements oklch→srgb, hex↔rgb, rgb→hsl, rgb→p3 manually

// ---- Math helpers ----
function clamp(v, min = 0, max = 1) { return Math.min(max, Math.max(min, v)); }

// oklch → oklab
function oklchToOklab(L, C, H) {
  const hRad = (H * Math.PI) / 180;
  return [L, C * Math.cos(hRad), C * Math.sin(hRad)];
}

// oklab → linear sRGB
function oklabToLinearSrgb(L, a, b) {
  const l_ = L + 0.3963377774 * a + 0.2158037573 * b;
  const m_ = L - 0.1055613458 * a - 0.0638541728 * b;
  const s_ = L - 0.0894841775 * a - 1.2914855480 * b;
  const l = l_ * l_ * l_;
  const m = m_ * m_ * m_;
  const s = s_ * s_ * s_;
  return [
    +4.0767416621 * l - 3.3077115913 * m + 0.2309699292 * s,
    -1.2684380046 * l + 2.6097574011 * m - 0.3413193965 * s,
    -0.0041960863 * l - 0.7034186147 * m + 1.7076147010 * s,
  ];
}

function linearToSrgb(c) {
  return c <= 0.0031308 ? 12.92 * c : 1.055 * Math.pow(c, 1 / 2.4) - 0.055;
}

function srgbToLinear(c) {
  return c <= 0.04045 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
}

function oklchToRgb(L, C, H) {
  const [ol, oa, ob] = oklchToOklab(L, C, H);
  const [lr, lg, lb] = oklabToLinearSrgb(ol, oa, ob);
  return [
    Math.round(clamp(linearToSrgb(lr)) * 255),
    Math.round(clamp(linearToSrgb(lg)) * 255),
    Math.round(clamp(linearToSrgb(lb)) * 255),
  ];
}

function hexToRgb(hex) {
  hex = hex.replace('#', '');
  return [parseInt(hex.slice(0, 2), 16), parseInt(hex.slice(2, 4), 16), parseInt(hex.slice(4, 6), 16)];
}

function rgbToHex(r, g, b) {
  return '#' + [r, g, b].map(v => v.toString(16).padStart(2, '0').toUpperCase()).join('');
}

function rgbToHsl(r, g, b) {
  r /= 255; g /= 255; b /= 255;
  const max = Math.max(r, g, b), min = Math.min(r, g, b);
  let h, s, l = (max + min) / 2;
  if (max === min) { h = s = 0; }
  else {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    if (max === r) h = ((g - b) / d + (g < b ? 6 : 0)) / 6;
    else if (max === g) h = ((b - r) / d + 2) / 6;
    else h = ((r - g) / d + 4) / 6;
  }
  return [Math.round(h * 360), Math.round(s * 100), Math.round(l * 100)];
}

// sRGB → oklab → oklch
function rgbToOklch(r, g, b) {
  const lr = srgbToLinear(r / 255);
  const lg = srgbToLinear(g / 255);
  const lb = srgbToLinear(b / 255);
  const l_ = Math.cbrt(0.4122214708 * lr + 0.5363325363 * lg + 0.0514459929 * lb);
  const m_ = Math.cbrt(0.2119034982 * lr + 0.6806995451 * lg + 0.1073969566 * lb);
  const s_ = Math.cbrt(0.0883024619 * lr + 0.2817188376 * lg + 0.6299787005 * lb);
  const L = 0.2104542553 * l_ + 0.7936177850 * m_ - 0.0040720468 * s_;
  const a = 1.9779984951 * l_ - 2.4285922050 * m_ + 0.4505937099 * s_;
  const bk = 0.0259040371 * l_ + 0.7827717662 * m_ - 0.8086757660 * s_;
  const C = Math.sqrt(a * a + bk * bk);
  let H = (Math.atan2(bk, a) * 180) / Math.PI;
  if (H < 0) H += 360;
  return [+L.toFixed(4), +C.toFixed(4), +H.toFixed(3)];
}

// sRGB linear → Display P3 (approximate: sRGB gamut is subset of P3)
function rgbToP3(r, g, b) {
  // sRGB → linear
  const lr = srgbToLinear(r / 255);
  const lg = srgbToLinear(g / 255);
  const lb = srgbToLinear(b / 255);
  // sRGB linear → XYZ D65
  const x = 0.4124564 * lr + 0.3575761 * lg + 0.1804375 * lb;
  const y = 0.2126729 * lr + 0.7151522 * lg + 0.0721750 * lb;
  const z = 0.0193339 * lr + 0.1191920 * lg + 0.9503041 * lb;
  // XYZ → Display P3 linear
  const p3r = 2.4934969119 * x - 0.9313836179 * y - 0.4027107845 * z;
  const p3g = -0.8294889696 * x + 1.7626640603 * y + 0.0236246858 * z;
  const p3b = 0.0358458302 * x - 0.0761723893 * y + 0.9568845240 * z;
  // linear → gamma (same transfer as sRGB)
  const tf = c => c <= 0.0031308 ? 12.92 * c : 1.055 * Math.pow(Math.max(0, c), 1/2.4) - 0.055;
  return `color(display-p3 ${tf(p3r).toFixed(4)} ${tf(p3g).toFixed(4)} ${tf(p3b).toFixed(4)})`;
}

// ---- Color definitions ----
const duboisPrimitives = {
  'blue100': '#F0F8FF', 'blue200': '#D7EDFE', 'blue300': '#BAE1FC', 'blue400': '#8ACAFF',
  'blue500': '#4299E0', 'blue600': '#2272B4', 'blue700': '#0E538B', 'blue800': '#04355D',
  'green100': '#F3FCF6', 'green200': '#D4F7DF', 'green300': '#B1ECC5', 'green400': '#8DDDA8',
  'green500': '#3BA65E', 'green600': '#277C43', 'green700': '#115026', 'green800': '#093919',
  'red100': '#FFF5F7', 'red200': '#FDE2E8', 'red300': '#FBD0D8', 'red400': '#F792A6',
  'red500': '#E65B77', 'red600': '#C82D4C', 'red700': '#9E102C', 'red800': '#630316',
  'yellow100': '#FFF9EB', 'yellow200': '#FCEACA', 'yellow300': '#F8D4A5', 'yellow400': '#F2BE88',
  'yellow500': '#DE7921', 'yellow600': '#BE501E', 'yellow700': '#93320B', 'yellow800': '#5F1B02',
  'grey050': '#F6F7F9', 'grey100': '#E8ECF0', 'grey200': '#D1D9E1', 'grey300': '#C0CDD8',
  'grey350': '#92A4B3', 'grey400': '#8396A5', 'grey500': '#5F7281', 'grey600': '#445461',
  'grey650': '#37444F', 'grey700': '#1F272D', 'grey800': '#11171C',
  'neutral050': '#F7F7F7', 'neutral100': '#EBEBEB', 'neutral200': '#D8D8D8', 'neutral300': '#CBCBCB',
  'neutral350': '#A2A2A2', 'neutral400': '#939393', 'neutral500': '#6F6F6F', 'neutral600': '#525252',
  'neutral650': '#424242', 'neutral700': '#262626', 'neutral800': '#161616',
  'white': '#FFFFFF',
  'brown': '#A6630C', 'coral': '#C83243', 'indigo': '#434A93', 'lemon': '#FACB66',
  'lime': '#308613', 'pink': '#B45091', 'purple': '#8A63BF', 'teal': '#04867D', 'turquoise': '#137DAE',
};

const duboisGradient = {
  'gradientStart': '#4299E0', 'gradientMid': '#CA42E0', 'gradientEnd': '#FF5F46',
};

// shadcn oklch values: [L, C, H]
const shadcnLight = {
  '--background': [1, 0, 0],
  '--foreground': [0.145, 0, 0],
  '--primary': [0.205, 0, 0],
  '--primary-foreground': [0.985, 0, 0],
  '--secondary': [0.97, 0, 0],
  '--secondary-foreground': [0.205, 0, 0],
  '--muted': [0.97, 0, 0],
  '--muted-foreground': [0.556, 0, 0],
  '--accent': [0.97, 0, 0],
  '--accent-foreground': [0.205, 0, 0],
  '--destructive': [0.577, 0.245, 27.325],
  '--border': [0.922, 0, 0],
  '--input': [0.922, 0, 0],
  '--ring': [0.708, 0, 0],
  '--chart-1': [0.809, 0.105, 251.813],
  '--chart-2': [0.623, 0.214, 259.815],
  '--chart-3': [0.546, 0.245, 262.881],
  '--chart-4': [0.488, 0.243, 264.376],
  '--chart-5': [0.424, 0.199, 265.638],
};

const shadcnDark = {
  '--background': [0.145, 0, 0],
  '--foreground': [0.985, 0, 0],
  '--card': [0.205, 0, 0],
  '--primary': [0.922, 0, 0],
  '--primary-foreground': [0.205, 0, 0],
  '--secondary': [0.269, 0, 0],
  '--muted': [0.269, 0, 0],
  '--muted-foreground': [0.708, 0, 0],
  '--accent': [0.269, 0, 0],
  '--destructive': [0.704, 0.191, 22.216],
  '--ring': [0.556, 0, 0],
  '--sidebar-primary': [0.488, 0.243, 264.376],
};

// ---- Build rows ----
const rows = [];

// DuBois primitives
for (const [name, hex] of Object.entries(duboisPrimitives)) {
  const [r, g, b] = hexToRgb(hex);
  const [h, s, l] = rgbToHsl(r, g, b);
  const [oL, oC, oH] = rgbToOklch(r, g, b);
  const p3 = rgbToP3(r, g, b);
  rows.push({ name: `db-${name}`, source: 'DuBois', hex: hex.toUpperCase(), r, g, b, h, s, l, oL, oC, oH, p3 });
}

// DuBois gradient
for (const [name, hex] of Object.entries(duboisGradient)) {
  const [r, g, b] = hexToRgb(hex);
  const [h, s, l] = rgbToHsl(r, g, b);
  const [oL, oC, oH] = rgbToOklch(r, g, b);
  const p3 = rgbToP3(r, g, b);
  rows.push({ name: `db-ai-${name}`, source: 'DuBois-AI', hex: hex.toUpperCase(), r, g, b, h, s, l, oL, oC, oH, p3 });
}

// shadcn light
for (const [name, [L, C, H]] of Object.entries(shadcnLight)) {
  const [r, g, b] = oklchToRgb(L, C, H);
  const hex = rgbToHex(r, g, b);
  const [h, s, l] = rgbToHsl(r, g, b);
  const [oL, oC, oH] = rgbToOklch(r, g, b);
  const p3 = rgbToP3(r, g, b);
  rows.push({ name: `shadcn-light${name}`, source: 'shadcn-light', hex, r, g, b, h, s, l, oL, oC, oH, p3 });
}

// shadcn dark
for (const [name, [L, C, H]] of Object.entries(shadcnDark)) {
  const [r, g, b] = oklchToRgb(L, C, H);
  const hex = rgbToHex(r, g, b);
  const [h, s, l] = rgbToHsl(r, g, b);
  const [oL, oC, oH] = rgbToOklch(r, g, b);
  const p3 = rgbToP3(r, g, b);
  rows.push({ name: `shadcn-dark${name}`, source: 'shadcn-dark', hex, r, g, b, h, s, l, oL, oC, oH, p3 });
}

// ---- Output CSV ----
const header = 'Name,Source,Hex,R,G,B,H,S%,L%,OKLCH-L,OKLCH-C,OKLCH-H,Display P3';
const lines = rows.map(r =>
  `${r.name},${r.source},${r.hex},${r.r},${r.g},${r.b},${r.h},${r.s},${r.l},${r.oL},${r.oC},${r.oH},${r.p3}`
);

const csv = [header, ...lines].join('\n');
process.stdout.write(csv);
