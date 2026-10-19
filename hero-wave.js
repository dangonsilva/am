/* ==========================================================================
   Artificial Music: Hero: superfície de pontos interativa
   --------------------------------------------------------------------------
   Interpretação do vídeo de referência (malha de pontos ondulando em
   perspectiva, brilho nas cristas, profundidade que se dissolve em névoa),
   traduzida para a identidade do site: tinta preta sobre cinza-claro.

   Um único sistema de movimento:
     • as ondas fluem lentamente (campo de altura = soma de senoides);
     • o mouse orbita a câmera (yaw/pitch/deslocamento), sempre amortecido;
     • uma luz segue o cursor e revela as cristas;
     • mexer o mouse "agita" a superfície (amplitude e velocidade sobem
       um pouco e voltam sozinhas).
   Ao sair da Hero tudo retorna a um estado neutro com respiração leve.
   Toque: movimento autônomo. prefers-reduced-motion: quadro estático.
   ========================================================================== */
(function () {
  "use strict";

  var hero = document.querySelector(".hero");
  var canvas = document.getElementById("heroCanvas");
  if (!hero || !canvas) return;
  var ctx = canvas.getContext("2d");
  if (!ctx) return;

  /* ---------- Ajustes (intensidade, velocidade, amplitude, profundidade) ---------- */
  var CFG = {
    ink: "16,16,18",        // cor dos pontos (RGB), igual ao --ink do site
    speed: 0.5,             // velocidade do fluxo das ondas
    amplitude: 0.62,        // altura das ondas (unidades de mundo)
    density: 15,            // espaçamento horizontal aproximado entre pontos (px)
    maxPoints: 12000,       // teto de pontos (desempenho)
    camBasePitch: 0.4,      // inclinação base da câmera (rad)
    yawRange: 0.32,         // órbita horizontal máxima com o mouse (rad)
    pitchRange: 0.08,       // variação vertical máxima com o mouse (rad)
    shiftRange: 0.2,        // parallax lateral (unidades de mundo)
    cameraStiffness: 5.5,   // rigidez da mola da câmera (menor = mais inércia)
    lensStiffness: 9,       // rigidez da luz que segue o cursor
    lensRadius: 0.17,       // raio da luz (fração da largura da Hero)
    energyGain: 0.35,       // quanto o mouse agita a superfície
    fogMin: 0.2,            // opacidade mínima do fundo distante
    buckets: 12,            // níveis de opacidade (sprites)
    maxDpr: 2
  };

  /* Ondas: [amplitude, kx, kz, velocidade, fase] */
  var WAVES = [
    [1.00, 0.55, 0.38,  0.55, 0.0],
    [0.55, 0.95, -0.30, 0.80, 1.7],
    [0.35, 0.30, 0.95, -0.65, 3.1],
    [0.16, 1.70, 0.70,  1.10, 5.2]
  ];

  var Y0 = -1.0;            // altura do plano abaixo da câmera
  var Z_NEAR = 0.62, Z_FAR = 32;
  var PIVOT_Z = 2.6;        // eixo da órbita
  var K = 0.62;             // abertura do campo de visão
  var U_RANGE = 1.75;       // largura do grid além da tela (evita bordas na órbita)
  var LIGHT_AZ = -2.14;     // azimute base da luz (rad)

  var reduceMq = window.matchMedia("(prefers-reduced-motion: reduce)");
  var coarseMq = window.matchMedia("(pointer: coarse)");

  /* ---------- Estado ---------- */
  var W = 0, H = 0, dpr = 1, F = 1, cx = 0, cy = 0;
  var cols = 0, rows = 0, count = 0;
  var px, pz, ptz;                       // grid estático
  var sprites = [];
  var calm = [];                         // zonas de texto onde os pontos recuam
  var S = {
    yaw: { x: 0, v: 0 }, pitch: { x: 0, v: 0 }, shift: { x: 0, v: 0 },
    lensX: { x: 0, v: 0 }, lensY: { x: 0, v: 0 }, lens: { x: 0, v: 0 },
    energy: { x: 0, v: 0 },
    phase: 0
  };
  var ptr = { inside: false, nx: 0, ny: 0, x: 0, y: 0, lastX: 0, lastY: 0, lastT: 0, speed: 0 };
  var running = false, visible = true, rafId = 0, lastT = 0, clock = 0;

  /* ---------- Utilidades ---------- */
  function clamp(v, a, b) { return v < a ? a : v > b ? b : v; }
  function smooth(e0, e1, x) { var t = clamp((x - e0) / (e1 - e0), 0, 1); return t * t * (3 - 2 * t); }

  /* Mola criticamente amortecida: segue o alvo sem oscilar e sem "grudar" */
  function spring(s, target, dt, k) {
    var a = (target - s.x) * k * k - 2 * k * s.v;
    s.v += a * dt;
    s.x += s.v * dt;
  }

  /* ---------- Sprites de ponto (um por nível de opacidade) ---------- */
  function buildSprites() {
    sprites.length = 0;
    var size = 32;
    for (var b = 0; b < CFG.buckets; b++) {
      var c = document.createElement("canvas");
      c.width = c.height = size;
      var g = c.getContext("2d");
      var a = (b + 1) / CFG.buckets;
      var grad = g.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
      grad.addColorStop(0, "rgba(" + CFG.ink + "," + a + ")");
      grad.addColorStop(0.6, "rgba(" + CFG.ink + "," + a + ")");
      grad.addColorStop(1, "rgba(" + CFG.ink + ",0)");
      g.fillStyle = grad;
      g.fillRect(0, 0, size, size);
      sprites.push(c);
    }
  }

  /* ---------- Dimensionamento ---------- */
  function resize() {
    var r = hero.getBoundingClientRect();
    W = Math.max(1, Math.round(r.width));
    H = Math.max(1, Math.round(r.height));
    dpr = Math.min(window.devicePixelRatio || 1, CFG.maxDpr);
    canvas.width = Math.round(W * dpr);
    canvas.height = Math.round(H * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    F = W / (2 * K);
    cx = W / 2; cy = H / 2;

    var d = CFG.density;
    cols = Math.max(40, Math.round(W / d * U_RANGE));
    rows = Math.max(30, Math.round(H * 1.25 / (d * 0.85)));
    while (cols * rows > CFG.maxPoints) { cols = Math.round(cols * 0.95); rows = Math.round(rows * 0.95); }
    count = cols * rows;
    px = new Float32Array(count); pz = new Float32Array(count); ptz = new Float32Array(count);

    var invNear = 1 / Z_NEAR, invFar = 1 / Z_FAR, i = 0;
    for (var r2 = 0; r2 < rows; r2++) {
      var tz = r2 / (rows - 1);
      var z = 1 / (invNear + (invFar - invNear) * tz);   // linhas uniformes na tela
      for (var c2 = 0; c2 < cols; c2++) {
        var u = (c2 / (cols - 1) * 2 - 1) * U_RANGE;
        px[i] = u * K * z; pz[i] = z; ptz[i] = tz; i++;
      }
    }
    updateCalm();
    if (!running) draw(); // quadro estático (movimento reduzido ou fora da tela)
  }

  /* Zonas de texto: os pontos recuam suavemente para não competir com a leitura */
  function updateCalm() {
    calm.length = 0;
    var hr = hero.getBoundingClientRect();
    [[".hero__copy", 0.88, 70], [".hero__title", 0.5, 50]].forEach(function (z) {
      var el = hero.querySelector(z[0]);
      if (!el) return;
      var r = el.getBoundingClientRect();
      calm.push({ x0: r.left - hr.left, y0: r.top - hr.top, x1: r.right - hr.left, y1: r.bottom - hr.top, s: z[1], m: z[2] });
    });
  }
  function calmAt(sx, sy) {
    var f = 1;
    for (var i = 0; i < calm.length; i++) {
      var z = calm[i];
      var dx = sx < z.x0 ? z.x0 - sx : sx > z.x1 ? sx - z.x1 : 0;
      var dy = sy < z.y0 ? z.y0 - sy : sy > z.y1 ? sy - z.y1 : 0;
      var d = Math.sqrt(dx * dx + dy * dy);
      f *= 1 - z.s * (1 - smooth(0, z.m, d));
    }
    return f;
  }

  /* ---------- Quadro ---------- */
  function draw() {
    ctx.clearRect(0, 0, W, H);

    var yaw = S.yaw.x, pitch = CFG.camBasePitch + S.pitch.x, shiftX = S.shift.x;
    var cyaw = Math.cos(yaw), syaw = Math.sin(yaw), cp = Math.cos(pitch), sp = Math.sin(pitch);
    var amp = CFG.amplitude * (1 + CFG.energyGain * S.energy.x);
    var phase = S.phase;
    var lens = S.lens.x, lx = S.lensX.x, ly = S.lensY.x;
    var sigma = CFG.lensRadius * W, inv2s = 1 / (2 * sigma * sigma);
    var B = CFG.buckets;
    /* a luz deriva lentamente: as cristas acendem em regiões diferentes ao longo do tempo */
    var az = LIGHT_AZ + 1.1 * Math.sin(phase * 0.4);
    var L0 = Math.cos(az), L2 = Math.sin(az), invHL = 1;
    var nw = WAVES.length;

    for (var i = 0; i < count; i++) {
      var x = px[i], z = pz[i], tz = ptz[i];

      var h = 0, hx = 0, hz = 0;
      for (var k = 0; k < nw; k++) {
        var w = WAVES[k];
        var arg = w[1] * x + w[2] * z + w[3] * phase + w[4];
        h += w[0] * Math.sin(arg);
        var cc = w[0] * Math.cos(arg);
        hx += cc * w[1]; hz += cc * w[2];
      }
      /* ondas grandes perto, achatando suavemente com a distância */
      var att = amp * clamp((z - 0.3) / 2.6, 0.3, 1) / (1 + z * 0.07);
      h *= att; hx *= att; hz *= att;

      /* órbita da câmera: yaw em torno do eixo da cena, depois pitch */
      var y = Y0 + h;
      var dz = z - PIVOT_Z;
      var X = x * cyaw - dz * syaw + shiftX;
      var Z = x * syaw + dz * cyaw + PIVOT_Z;
      var Yc = y * cp + Z * sp;
      var Zc = Z * cp - y * sp;
      if (Zc < 0.3) continue;

      var scale = F / Zc;
      var sx = cx + X * scale, sy = cy - Yc * scale;
      if (sx < -8 || sx > W + 8 || sy < -8 || sy > H + 8) continue;

      /* luz: faces inclinadas na direção da luz acendem (cristas); o resto recua */
      var dir = -(hx * L0 + hz * L2) * invHL;
      var lit = smooth(-0.32, 0.3, dir);
      var slope = clamp(Math.sqrt(hx * hx + hz * hz) * 1.4, 0, 1);
      var intensity = clamp(0.24 + 0.76 * Math.pow(lit, 1.6) + 0.1 * slope, 0, 1);

      var lensK = 0;
      if (lens > 0.002) {
        var ddx = sx - lx, ddy = sy - ly;
        lensK = lens * Math.exp(-(ddx * ddx + ddy * ddy) * inv2s);
      }

      var fog = CFG.fogMin + (1 - CFG.fogMin) * Math.pow(1 - tz, 0.75);
      var a = fog * calmAt(sx, sy) * (0.17 + 0.83 * intensity) + lensK * 0.75 * fog;
      if (a < 0.035) continue;
      if (a > 1) a = 1;

      var r = (0.62 + 0.85 * intensity + 0.7 * lensK) * (0.32 + 1.5 / Zc) * 0.95;
      var b = (a * B) | 0; if (b >= B) b = B - 1;
      ctx.drawImage(sprites[b], sx - r * 1.25, sy - r * 1.25, r * 2.5, r * 2.5);
    }
  }

  /* ---------- Simulação (um passo por quadro) ---------- */
  function step(dt) {
    clock += dt;
    var coarse = coarseMq.matches;
    var tx, ty, lensTarget, lensPX, lensPY;

    if (ptr.inside) {
      tx = ptr.nx; ty = ptr.ny;
      lensTarget = 1; lensPX = ptr.x; lensPY = ptr.y;
    } else if (coarse) {
      /* sem cursor: movimento autônomo e coerente */
      tx = Math.sin(clock * 0.23) * 0.75; ty = Math.sin(clock * 0.17 + 1.2) * 0.6;
      lensTarget = 0.6;
      lensPX = W * (0.5 + 0.32 * Math.sin(clock * 0.21 + 0.6));
      lensPY = H * (0.55 + 0.25 * Math.sin(clock * 0.16 + 2.1));
    } else {
      /* cursor fora da Hero: estado neutro com respiração leve */
      tx = Math.sin(clock * 0.19) * 0.18; ty = Math.sin(clock * 0.14 + 1) * 0.12;
      lensTarget = 0; lensPX = S.lensX.x; lensPY = S.lensY.x;
    }

    /* a velocidade do cursor decai quando ele para */
    ptr.speed *= Math.exp(-dt * 4);
    var energyTarget = ptr.inside ? clamp(ptr.speed / 1400, 0, 1) : 0;

    spring(S.yaw, tx * CFG.yawRange, dt, CFG.cameraStiffness);
    spring(S.pitch, ty * CFG.pitchRange, dt, CFG.cameraStiffness);
    spring(S.shift, -tx * CFG.shiftRange, dt, CFG.cameraStiffness);
    spring(S.lensX, lensPX, dt, CFG.lensStiffness);
    spring(S.lensY, lensPY, dt, CFG.lensStiffness);
    spring(S.lens, lensTarget, dt, 3.2);
    spring(S.energy, energyTarget, dt, 3);
    if (S.lens.x < 0) S.lens.x = 0;
    if (S.energy.x < 0) S.energy.x = 0;

    S.phase += dt * CFG.speed * (1 + 0.6 * S.energy.x);
  }

  function frame(now) {
    rafId = 0;
    if (!running) return;
    var dt = lastT ? Math.min((now - lastT) / 1000, 0.05) : 0.016;
    lastT = now;
    var t0 = performance.now();
    step(dt);
    draw();
    adapt(performance.now() - t0);
    rafId = requestAnimationFrame(frame);
  }

  /* Qualidade adaptativa: se o desenho do quadro ficar caro, reduz a densidade */
  var perf = { avg: 0, n: 0, cooldown: 0 };
  function adapt(ms) {
    perf.avg = perf.n ? perf.avg * 0.92 + ms * 0.08 : ms;
    perf.n++;
    if (perf.cooldown > 0) { perf.cooldown--; return; }
    if (perf.n > 45 && perf.avg > 12 && CFG.density < 26) {
      CFG.density = Math.round(CFG.density * 1.25);
      perf.n = 0; perf.cooldown = 60;
      resize();
    }
  }

  function start() {
    if (running || reduceMq.matches || !visible) return;
    running = true; lastT = 0;
    rafId = requestAnimationFrame(frame);
  }
  function stop() {
    running = false;
    if (rafId) cancelAnimationFrame(rafId);
    rafId = 0;
  }

  /* ---------- Ponteiro ---------- */
  function onMove(e) {
    var r = hero.getBoundingClientRect();
    var x = e.clientX - r.left, y = e.clientY - r.top;
    var now = performance.now();
    if (ptr.lastT) {
      var dtm = Math.max(now - ptr.lastT, 8) / 1000;
      var inst = Math.sqrt(Math.pow(x - ptr.lastX, 2) + Math.pow(y - ptr.lastY, 2)) / dtm;
      ptr.speed = Math.max(ptr.speed * 0.6, inst);
    }
    ptr.lastX = x; ptr.lastY = y; ptr.lastT = now;
    ptr.x = x; ptr.y = y;
    ptr.nx = clamp(x / r.width * 2 - 1, -1, 1);
    ptr.ny = clamp(y / r.height * 2 - 1, -1, 1);
    if (!ptr.inside) {
      ptr.inside = true;
      /* a luz nasce onde o cursor entrou, sem "voar" desde a posição anterior */
      if (S.lens.x < 0.05) { S.lensX.x = x; S.lensY.x = y; S.lensX.v = S.lensY.v = 0; }
    }
  }
  function onLeave() { ptr.inside = false; ptr.lastT = 0; }

  /* ---------- Inicialização ---------- */
  function applyMotionPreference() {
    stop();
    if (reduceMq.matches) {
      /* versão estática: um quadro composto, sem interação nem loop */
      S.phase = 2.6; S.yaw.x = 0; S.pitch.x = 0; S.shift.x = 0; S.lens.x = 0; S.energy.x = 0;
      draw();
    } else {
      start();
    }
  }

  buildSprites();
  resize();

  if (window.ResizeObserver) {
    var ro = new ResizeObserver(function () { resize(); });
    ro.observe(hero);
    var ro2 = new ResizeObserver(function () { updateCalm(); if (!running) draw(); });
    var t1 = hero.querySelector(".hero__title"), t2 = hero.querySelector(".hero__copy");
    if (t1) ro2.observe(t1);
    if (t2) ro2.observe(t2);
  } else {
    window.addEventListener("resize", resize);
  }
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(function () { updateCalm(); if (!running) draw(); });

  hero.addEventListener("pointermove", onMove, { passive: true });
  hero.addEventListener("pointerleave", onLeave, { passive: true });
  hero.addEventListener("pointercancel", onLeave, { passive: true });

  if ("IntersectionObserver" in window) {
    new IntersectionObserver(function (entries) {
      visible = entries[0].isIntersecting;
      if (visible) start(); else stop();
    }, { threshold: 0 }).observe(hero);
  }

  var onMq = function () { applyMotionPreference(); };
  if (reduceMq.addEventListener) reduceMq.addEventListener("change", onMq); else if (reduceMq.addListener) reduceMq.addListener(onMq);

  applyMotionPreference();

  /* Alça de ajuste/depuração: window.__heroWave.cfg altera os parâmetros ao vivo
     (os que afetam a malha, como density e maxPoints, exigem redimensionar a janela). */
  window.__heroWave = { cfg: CFG, state: S, pointer: ptr };
})();
