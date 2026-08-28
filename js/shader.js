/**
 * Interactive WebGL Ambient Shader for Hero Section
 * Muhammad Firly - Portfolio
 * Royal Navy & Pure White Aesthetic
 */

(function initHeroShader() {
  const canvas = document.getElementById('shader-canvas-hero');
  if (!canvas) return;

  function syncSize() {
    const w = canvas.clientWidth || window.innerWidth;
    const h = canvas.clientHeight || window.innerHeight;
    if (canvas.width !== w || canvas.height !== h) {
      canvas.width = w;
      canvas.height = h;
    }
  }

  if (typeof ResizeObserver !== 'undefined') {
    new ResizeObserver(syncSize).observe(canvas);
  }
  syncSize();

  const gl = canvas.getContext('webgl', { antialias: false, powerPreference: 'high-performance' }) ||
             canvas.getContext('experimental-webgl');
             
  if (!gl) {
    console.warn('WebGL not supported, falling back to CSS background.');
    return;
  }

  const vsSource = `
    attribute vec2 a_position;
    varying vec2 v_texCoord;
    void main() {
      v_texCoord = a_position * 0.5 + 0.5;
      gl_Position = vec4(a_position, 0.0, 1.0);
    }
  `;

  const fsSource = `
    precision mediump float;
    varying vec2 v_texCoord;
    uniform float u_time;
    uniform vec2 u_resolution;
    uniform vec2 u_mouse;

    void main() {
      vec2 uv = v_texCoord;
      vec2 mouseNorm = u_mouse / u_resolution;
      
      // Deep Royal Navy background base
      vec3 deepNavy = vec3(0.031, 0.055, 0.129);   // #080E21
      vec3 navySurface = vec3(0.051, 0.106, 0.200); // #0D1B33
      
      // Dynamic fluid wave
      float wave1 = sin(uv.x * 5.0 + u_time * 0.35) * 0.045;
      float wave2 = cos(uv.y * 5.0 - u_time * 0.28) * 0.045;
      float gridNoise = sin((uv.x + wave1) * 30.0) * cos((uv.y + wave2) * 30.0) * 0.012;
      
      vec3 base = mix(deepNavy, navySurface, uv.y + wave1 + gridNoise);
      
      // Mouse interactive radial pure white glow
      float distToMouse = length(uv - vec2(mouseNorm.x, 1.0 - mouseNorm.y));
      float mouseGlow = 0.016 / (distToMouse * distToMouse + 0.07);
      
      // Constellation / glowing white particle nodes
      float particleGlow = 0.0;
      for (float i = 0.0; i < 6.0; i++) {
        vec2 p = vec2(
          sin(u_time * 0.16 + i * 1.35) * 0.42 + 0.5,
          cos(u_time * 0.20 + i * 1.82) * 0.42 + 0.5
        );
        float d = length(uv - p);
        particleGlow += 0.0018 / (d * d + 0.012);
      }
      
      // Luminous white and silver highlights
      vec3 whiteAccent = vec3(0.95, 0.97, 1.0);
      vec3 silverAccent = vec3(0.80, 0.86, 0.94);
      
      vec3 glowColor = mix(whiteAccent, silverAccent, sin(u_time * 0.4) * 0.5 + 0.5);
      vec3 finalColor = base + (particleGlow * whiteAccent * 0.8) + (mouseGlow * 0.4 * glowColor);
      
      gl_FragColor = vec4(finalColor, 1.0);
    }
  `;

  function createShader(type, source) {
    const shader = gl.createShader(type);
    gl.shaderSource(shader, source);
    gl.compileShader(shader);
    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
      gl.deleteShader(shader);
      return null;
    }
    return shader;
  }

  const vertexShader = createShader(gl.VERTEX_SHADER, vsSource);
  const fragmentShader = createShader(gl.FRAGMENT_SHADER, fsSource);
  if (!vertexShader || !fragmentShader) return;

  const program = gl.createProgram();
  gl.attachShader(program, vertexShader);
  gl.attachShader(program, fragmentShader);
  gl.linkProgram(program);

  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    return;
  }

  gl.useProgram(program);

  const buffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
  gl.bufferData(
    gl.ARRAY_BUFFER,
    new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]),
    gl.STATIC_DRAW
  );

  const posAttr = gl.getAttribLocation(program, 'a_position');
  gl.enableVertexAttribArray(posAttr);
  gl.vertexAttribPointer(posAttr, 2, gl.FLOAT, false, 0, 0);

  const uTime = gl.getUniformLocation(program, 'u_time');
  const uRes = gl.getUniformLocation(program, 'u_resolution');
  const uMouse = gl.getUniformLocation(program, 'u_mouse');

  let mouseX = canvas.width / 2;
  let mouseY = canvas.height / 2;
  let targetMouseX = mouseX;
  let targetMouseY = mouseY;

  window.addEventListener('mousemove', (e) => {
    const rect = canvas.getBoundingClientRect();
    if (rect.width && rect.height) {
      targetMouseX = e.clientX - rect.left;
      targetMouseY = e.clientY - rect.top;
    }
  }, { passive: true });

  let animationFrameId;
  function render(time) {
    if (typeof ResizeObserver === 'undefined') syncSize();
    gl.viewport(0, 0, canvas.width, canvas.height);

    // Smooth mouse interpolation
    mouseX += (targetMouseX - mouseX) * 0.08;
    mouseY += (targetMouseY - mouseY) * 0.08;

    if (uTime) gl.uniform1f(uTime, time * 0.001);
    if (uRes) gl.uniform2f(uRes, canvas.width, canvas.height);
    if (uMouse) gl.uniform2f(uMouse, mouseX, mouseY);

    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
    animationFrameId = requestAnimationFrame(render);
  }

  // Check if user is in view before animating to save CPU/battery
  let isVisible = true;
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      isVisible = entry.isIntersecting;
      if (isVisible) {
        cancelAnimationFrame(animationFrameId);
        animationFrameId = requestAnimationFrame(render);
      }
    });
  }, { threshold: 0.1 });

  observer.observe(canvas);
  animationFrameId = requestAnimationFrame(render);
})();
