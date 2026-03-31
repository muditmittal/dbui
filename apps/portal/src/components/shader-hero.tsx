"use client"

import { useEffect, useRef } from "react"

const VERTEX_SHADER = `
attribute vec2 a_position;
void main() {
  gl_Position = vec4(a_position, 0.0, 1.0);
}
`

// Shared helpers injected into every fragment shader
const COMMON = `
#ifdef GL_ES
precision mediump float;
#endif
uniform vec2 u_resolution;
uniform float u_time;

float random(in vec2 st) {
  return fract(sin(dot(st.xy, vec2(12.9898, 78.233))) * 43758.5453123);
}
float noise(vec2 st) {
  vec2 i = floor(st);
  vec2 f = fract(st);
  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(
    mix(random(i), random(i + vec2(1.0, 0.0)), u.x),
    mix(random(i + vec2(0.0, 1.0)), random(i + vec2(1.0, 1.0)), u.x),
    u.y
  );
}
mat2 rotate2d(float angle) {
  return mat2(cos(angle), -sin(angle), sin(angle), cos(angle));
}
`

const SHADERS = [
  // 0 — Wood grain (original)
  COMMON + `
float lines(in vec2 pos, float b) {
  pos *= 10.0;
  return smoothstep(0.0, 0.5 + b * 0.5, abs((sin(pos.x * 3.1415) + b * 2.0)) * 0.5);
}
void main() {
  vec2 st = gl_FragCoord.xy / u_resolution.xy;
  st.y *= u_resolution.y / u_resolution.x;
  vec2 pos = st.yx * vec2(10.0, 3.0) + vec2(u_time * 0.06, 0.0);
  pos = rotate2d(noise(pos) * 2.0) * pos;
  float p = lines(pos, 0.5);
  gl_FragColor = vec4(mix(vec3(0.04, 0.045, 0.07), vec3(0.08, 0.10, 0.16), p), 1.0);
}`,

  // 1 — Fractal brownian motion (fbm clouds)
  COMMON + `
float fbm(vec2 st) {
  float v = 0.0; float a = 0.5;
  for (int i = 0; i < 5; i++) {
    v += a * noise(st);
    st *= 2.0; a *= 0.5;
  }
  return v;
}
void main() {
  vec2 st = gl_FragCoord.xy / u_resolution.xy * 3.0;
  st += u_time * 0.04;
  float f = fbm(st);
  gl_FragColor = vec4(vec3(0.03, 0.04, 0.06) + vec3(0.04, 0.06, 0.10) * f, 1.0);
}`,

  // 2 — Warped domain noise
  COMMON + `
float fbm(vec2 st) {
  float v = 0.0; float a = 0.5;
  for (int i = 0; i < 5; i++) { v += a * noise(st); st *= 2.0; a *= 0.5; }
  return v;
}
void main() {
  vec2 st = gl_FragCoord.xy / u_resolution.xy * 2.0;
  vec2 q = vec2(fbm(st + u_time * 0.03), fbm(st + vec2(1.0)));
  vec2 r = vec2(fbm(st + 4.0 * q + vec2(1.7, 9.2) + 0.15 * u_time * 0.05), fbm(st + 4.0 * q + vec2(8.3, 2.8)));
  float f = fbm(st + 4.0 * r);
  vec3 c = mix(vec3(0.03, 0.04, 0.06), vec3(0.07, 0.09, 0.14), f);
  c = mix(c, vec3(0.05, 0.07, 0.12), dot(q, q));
  gl_FragColor = vec4(c, 1.0);
}`,

  // 3 — Concentric ripples
  COMMON + `
void main() {
  vec2 st = gl_FragCoord.xy / u_resolution.xy;
  st.x *= u_resolution.x / u_resolution.y;
  float d = length(st - vec2(0.5 * u_resolution.x / u_resolution.y, 0.5));
  float wave = sin(d * 30.0 - u_time * 0.8) * 0.5 + 0.5;
  wave *= smoothstep(0.6, 0.0, d);
  gl_FragColor = vec4(mix(vec3(0.03, 0.035, 0.06), vec3(0.07, 0.09, 0.15), wave * 0.6), 1.0);
}`,

  // 4 — Diagonal flow field
  COMMON + `
void main() {
  vec2 st = gl_FragCoord.xy / u_resolution.xy;
  st.y *= u_resolution.y / u_resolution.x;
  float n = noise(st * 5.0 + u_time * 0.05);
  vec2 pos = rotate2d(n * 3.14) * st * 8.0;
  float stripe = sin(pos.x + pos.y + u_time * 0.3) * 0.5 + 0.5;
  stripe = smoothstep(0.3, 0.7, stripe);
  gl_FragColor = vec4(mix(vec3(0.035, 0.04, 0.065), vec3(0.08, 0.10, 0.15), stripe * 0.7), 1.0);
}`,

  // 5 — Cellular / voronoi-ish
  COMMON + `
void main() {
  vec2 st = gl_FragCoord.xy / u_resolution.xy * 5.0;
  vec2 i_st = floor(st);
  vec2 f_st = fract(st);
  float m_dist = 1.0;
  for (int y = -1; y <= 1; y++) {
    for (int x = -1; x <= 1; x++) {
      vec2 neighbor = vec2(float(x), float(y));
      vec2 point = vec2(random(i_st + neighbor), random(i_st + neighbor + 99.0));
      point = 0.5 + 0.5 * sin(u_time * 0.15 + 6.2831 * point);
      float dist = length(neighbor + point - f_st);
      m_dist = min(m_dist, dist);
    }
  }
  float v = m_dist * m_dist;
  gl_FragColor = vec4(mix(vec3(0.03, 0.04, 0.065), vec3(0.08, 0.11, 0.16), v), 1.0);
}`,

  // 6 — Horizontal aurora bands
  COMMON + `
float fbm(vec2 st) {
  float v = 0.0; float a = 0.5;
  for (int i = 0; i < 4; i++) { v += a * noise(st); st *= 2.0; a *= 0.5; }
  return v;
}
void main() {
  vec2 st = gl_FragCoord.xy / u_resolution.xy;
  float n = fbm(vec2(st.x * 2.0 + u_time * 0.03, st.y * 0.5));
  float band = sin(st.y * 12.0 + n * 4.0) * 0.5 + 0.5;
  band = smoothstep(0.2, 0.8, band) * 0.6;
  vec3 c = mix(vec3(0.03, 0.04, 0.06), vec3(0.05, 0.09, 0.14), band);
  c += vec3(0.01, 0.02, 0.04) * n;
  gl_FragColor = vec4(c, 1.0);
}`,

  // 7 — Slow smoke plumes
  COMMON + `
float fbm(vec2 st) {
  float v = 0.0; float a = 0.5;
  for (int i = 0; i < 6; i++) { v += a * noise(st); st *= 2.01; a *= 0.5; }
  return v;
}
void main() {
  vec2 st = gl_FragCoord.xy / u_resolution.xy;
  st.y *= u_resolution.y / u_resolution.x;
  st.y += u_time * 0.02;
  float f = fbm(st * 3.0);
  float f2 = fbm(st * 3.0 + f * 2.0 + u_time * 0.01);
  vec3 c = mix(vec3(0.035, 0.04, 0.06), vec3(0.07, 0.10, 0.15), f2);
  gl_FragColor = vec4(c, 1.0);
}`,

  // 8 — Woven mesh
  COMMON + `
void main() {
  vec2 st = gl_FragCoord.xy / u_resolution.xy;
  st.y *= u_resolution.y / u_resolution.x;
  float n = noise(st * 3.0 + u_time * 0.04);
  vec2 grid = fract(st * 12.0 + n * 0.8);
  float warp = min(
    smoothstep(0.0, 0.08, grid.x) * smoothstep(0.0, 0.08, 1.0 - grid.x),
    smoothstep(0.0, 0.08, grid.y) * smoothstep(0.0, 0.08, 1.0 - grid.y)
  );
  float v = 1.0 - warp;
  gl_FragColor = vec4(mix(vec3(0.04, 0.045, 0.07), vec3(0.07, 0.09, 0.14), v * 0.5), 1.0);
}`,

  // 9 — Topographic contours
  COMMON + `
float fbm(vec2 st) {
  float v = 0.0; float a = 0.5;
  for (int i = 0; i < 5; i++) { v += a * noise(st); st *= 2.0; a *= 0.5; }
  return v;
}
void main() {
  vec2 st = gl_FragCoord.xy / u_resolution.xy * 4.0;
  float f = fbm(st + u_time * 0.02);
  float contour = abs(fract(f * 8.0) - 0.5) * 2.0;
  contour = smoothstep(0.0, 0.15, contour);
  gl_FragColor = vec4(mix(vec3(0.05, 0.06, 0.09), vec3(0.03, 0.035, 0.055), contour), 1.0);
}`,
]

export function ShaderHero({ className }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const rafRef = useRef<number>(0)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const gl = canvas.getContext("webgl", { antialias: false, alpha: false })
    if (!gl) return

    // Pick a random shader on mount
    const fragmentSource = SHADERS[Math.floor(Math.random() * SHADERS.length)]

    function createShader(gl: WebGLRenderingContext, type: number, source: string) {
      const shader = gl.createShader(type)!
      gl.shaderSource(shader, source)
      gl.compileShader(shader)
      return shader
    }

    const vs = createShader(gl, gl.VERTEX_SHADER, VERTEX_SHADER)
    const fs = createShader(gl, gl.FRAGMENT_SHADER, fragmentSource)

    const program = gl.createProgram()!
    gl.attachShader(program, vs)
    gl.attachShader(program, fs)
    gl.linkProgram(program)
    gl.useProgram(program)

    const buffer = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer)
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]),
      gl.STATIC_DRAW
    )

    const posAttr = gl.getAttribLocation(program, "a_position")
    gl.enableVertexAttribArray(posAttr)
    gl.vertexAttribPointer(posAttr, 2, gl.FLOAT, false, 0, 0)

    const uResolution = gl.getUniformLocation(program, "u_resolution")
    const uTime = gl.getUniformLocation(program, "u_time")

    function resize() {
      const dpr = Math.min(window.devicePixelRatio, 2)
      const w = canvas!.clientWidth
      const h = canvas!.clientHeight
      canvas!.width = w * dpr
      canvas!.height = h * dpr
      gl!.viewport(0, 0, canvas!.width, canvas!.height)
    }

    resize()
    window.addEventListener("resize", resize)

    const startTime = performance.now()

    function render() {
      const t = (performance.now() - startTime) / 1000
      gl!.uniform2f(uResolution, canvas!.width, canvas!.height)
      gl!.uniform1f(uTime, t)
      gl!.drawArrays(gl!.TRIANGLES, 0, 6)
      rafRef.current = requestAnimationFrame(render)
    }

    render()

    return () => {
      window.removeEventListener("resize", resize)
      cancelAnimationFrame(rafRef.current)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className={className}
      style={{ width: "100%", height: "100%", display: "block" }}
    />
  )
}
