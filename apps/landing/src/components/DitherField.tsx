import { useEffect, useRef } from 'react';

/**
 * A WebGL field rendered through an 8x8 Bayer matrix, so every frame comes out
 * as two-tone ordered dither. Each mode draws a different scalar field:
 *   flow    drifting domain-warped noise
 *   orb     a lit coin-like sphere with orbit rings
 *   terrain a stacked price-chart landscape
 *   tunnel  concentric rings pulled toward the cursor
 */
export type DitherMode = 'flow' | 'orb' | 'terrain' | 'tunnel';

const MODES: Record<DitherMode, number> = { flow: 0, orb: 1, terrain: 2, tunnel: 3 };

type Props = {
  mode?: DitherMode;
  /** Foreground colour as a hex string */
  color?: string;
  /** Background colour as a hex string */
  background?: string;
  /** Size of one dither cell in CSS pixels */
  pixel?: number;
  /** Animation speed multiplier */
  speed?: number;
  /** Brightness bias added to the field before thresholding */
  bias?: number;
  className?: string;
  interactive?: boolean;
};

const VERT = `
attribute vec2 p;
void main() { gl_Position = vec4(p, 0.0, 1.0); }
`;

const FRAG = `
precision highp float;
uniform vec2 u_res;
uniform float u_time;
uniform vec2 u_mouse;
uniform float u_pixel;
uniform vec3 u_fg;
uniform vec3 u_bg;
uniform int u_mode;
uniform float u_bias;

float bayer2(vec2 a) { a = floor(a); return fract(dot(a, vec2(0.5, a.y * 0.75))); }
float bayer4(vec2 a) { return bayer2(0.5 * a) * 0.25 + bayer2(a); }
float bayer8(vec2 a) { return bayer4(0.5 * a) * 0.25 + bayer2(a); }

float hash(vec2 p) { return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
float noise(vec2 p) {
  vec2 i = floor(p); vec2 f = fract(p);
  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(mix(hash(i), hash(i + vec2(1.0, 0.0)), u.x),
             mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x), u.y);
}
float fbm(vec2 p) {
  float v = 0.0; float a = 0.5;
  for (int i = 0; i < 5; i++) { v += a * noise(p); p *= 2.03; a *= 0.5; }
  return v;
}

void main() {
  vec2 cell = floor(gl_FragCoord.xy / u_pixel);
  vec2 frag = (cell + 0.5) * u_pixel;
  vec2 uv = frag / u_res;
  float aspect = u_res.x / u_res.y;
  vec2 st = vec2((uv.x - 0.5) * aspect, uv.y - 0.5);
  vec2 m = vec2((u_mouse.x - 0.5) * aspect, u_mouse.y - 0.5);
  float t = u_time;
  float v = 0.0;

  if (u_mode == 0) {
    vec2 q = vec2(fbm(st * 1.6 + vec2(0.0, t * 0.04)), fbm(st * 1.6 + vec2(5.2, -t * 0.03)));
    v = fbm(st * 2.2 + 2.4 * q + vec2(t * 0.02, 0.0));
    v = smoothstep(0.25, 0.85, v);
    v *= smoothstep(-0.65, 0.35, st.y + 0.15);
  } else if (u_mode == 1) {
    vec2 c = st - vec2(0.0, 0.0);
    float r = 0.34;
    float d = length(c);
    if (d < r) {
      float z = sqrt(r * r - d * d);
      vec3 n = normalize(vec3(c, z));
      vec3 l = normalize(vec3(cos(t * 0.35) * 0.8, 0.55, 0.65 + sin(t * 0.35) * 0.3));
      float diff = max(dot(n, l), 0.0);
      float bands = 0.12 * sin(n.y * 38.0 + t * 0.6);
      v = pow(diff, 1.2) * 0.95 + bands * diff + 0.04;
    } else {
      float ring = 0.0;
      for (int i = 0; i < 3; i++) {
        float fi = float(i);
        float rr = r + 0.07 + fi * 0.055;
        float a = atan(c.y, c.x) + t * (0.15 + fi * 0.07);
        float dash = step(0.55, fract(a * (6.0 + fi * 4.0) / 6.2831));
        ring += smoothstep(0.006, 0.0, abs(d - rr)) * (0.35 + 0.4 * dash);
      }
      v = ring + 0.22 * exp(-(d - r) * 9.0);
    }
  } else if (u_mode == 2) {
    float acc = 0.0;
    for (int i = 0; i < 4; i++) {
      float fi = float(i);
      float x = st.x * (1.4 + fi * 0.5) + t * (0.05 + fi * 0.025) + fi * 3.1;
      float h = -0.32 + fi * 0.13 + 0.16 * (fbm(vec2(x, fi * 7.0)) - 0.5) * 2.0;
      float layer = smoothstep(h + 0.004, h - 0.004, st.y);
      float shade = 0.95 - fi * 0.2;
      float edge = smoothstep(0.012, 0.0, abs(st.y - h));
      acc = max(acc, layer * shade * (0.35 + 0.65 * smoothstep(h - 0.45, h, st.y)) + edge * 0.6);
    }
    v = acc;
  } else {
    vec2 c = st - m * 0.35;
    float d = length(c);
    float a = atan(c.y, c.x);
    float rings = 0.5 + 0.5 * sin(1.0 / max(d, 0.02) * 1.6 - t * 1.6 + sin(a * 3.0 + t * 0.3) * 0.4);
    v = rings * smoothstep(0.02, 0.6, d) * (1.1 - d);
  }

  float md = length(st - m);
  v += 0.38 * exp(-md * md * 26.0) * step(-0.5, u_mouse.x);
  v += u_bias;

  float threshold = bayer8(cell);
  float on = step(threshold, clamp(v, 0.0, 1.0) * 0.98);
  gl_FragColor = vec4(mix(u_bg, u_fg, on), 1.0);
}
`;

function hexToRgb(hex: string): [number, number, number] {
  const n = parseInt(hex.replace('#', ''), 16);
  return [((n >> 16) & 255) / 255, ((n >> 8) & 255) / 255, (n & 255) / 255];
}

export function DitherField({
  mode = 'flow',
  color = '#ece8df',
  background = '#0b0b0a',
  pixel = 3,
  speed = 1,
  bias = 0,
  className = '',
  interactive = true,
}: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const gl = canvas.getContext('webgl', { antialias: false, premultipliedAlpha: false });
    if (!gl) return;

    const compile = (type: number, src: string) => {
      const s = gl.createShader(type)!;
      gl.shaderSource(s, src);
      gl.compileShader(s);
      return s;
    };
    const prog = gl.createProgram()!;
    gl.attachShader(prog, compile(gl.VERTEX_SHADER, VERT));
    gl.attachShader(prog, compile(gl.FRAGMENT_SHADER, FRAG));
    gl.linkProgram(prog);
    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) return;
    gl.useProgram(prog);

    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW);
    const loc = gl.getAttribLocation(prog, 'p');
    gl.enableVertexAttribArray(loc);
    gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);

    const u = (name: string) => gl.getUniformLocation(prog, name);
    const uRes = u('u_res');
    const uTime = u('u_time');
    const uMouse = u('u_mouse');
    const uPixel = u('u_pixel');
    gl.uniform3fv(u('u_fg'), hexToRgb(color));
    gl.uniform3fv(u('u_bg'), hexToRgb(background));
    gl.uniform1i(u('u_mode'), MODES[mode]);
    gl.uniform1f(u('u_bias'), bias);

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const mouse = { x: -1, y: -1, tx: -1, ty: -1 };
    let raf = 0;
    let visible = true;
    const start = performance.now() - Math.random() * 20000;

    const resize = () => {
      const { width, height } = canvas.getBoundingClientRect();
      canvas.width = Math.max(1, Math.floor(width * dpr));
      canvas.height = Math.max(1, Math.floor(height * dpr));
      gl.viewport(0, 0, canvas.width, canvas.height);
      gl.uniform2f(uRes, canvas.width, canvas.height);
      gl.uniform1f(uPixel, pixel * dpr);
      if (reduced) draw(0);
    };

    const draw = (now: number) => {
      if (mouse.tx >= 0) {
        mouse.x = mouse.x < 0 ? mouse.tx : mouse.x + (mouse.tx - mouse.x) * 0.08;
        mouse.y = mouse.y < 0 ? mouse.ty : mouse.y + (mouse.ty - mouse.y) * 0.08;
      }
      gl.uniform1f(uTime, reduced ? 12 : ((now - start) / 1000) * speed);
      gl.uniform2f(uMouse, mouse.x, mouse.y);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
    };

    const loop = (now: number) => {
      if (visible) draw(now);
      raf = requestAnimationFrame(loop);
    };

    const onMove = (e: PointerEvent) => {
      const r = canvas.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width;
      const y = 1 - (e.clientY - r.top) / r.height;
      if (x < -0.2 || x > 1.2 || y < -0.2 || y > 1.2) {
        mouse.tx = mouse.ty = mouse.x = mouse.y = -1;
        return;
      }
      mouse.tx = x;
      mouse.ty = y;
    };

    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    const io = new IntersectionObserver(([entry]) => (visible = entry.isIntersecting));
    io.observe(canvas);
    resize();
    if (!reduced) {
      raf = requestAnimationFrame(loop);
      if (interactive) window.addEventListener('pointermove', onMove, { passive: true });
    }

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      window.removeEventListener('pointermove', onMove);
      gl.getExtension('WEBGL_lose_context')?.loseContext();
    };
  }, [mode, color, background, pixel, speed, bias, interactive]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className={`block h-full w-full [image-rendering:pixelated] ${className}`}
      style={{ background }}
    />
  );
}
