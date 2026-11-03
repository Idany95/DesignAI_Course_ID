/**
 * עידן ירחי — תעודת זהות / קו ההיגיון: מסדר לשבירה
 * Core Interactive Engine: Entropy Modulation, Draggables, Audio Synthesizer, Dynamic Logic Line
 */

(function () {
  "use strict";

  // ---- DOM Elements ----
  const root = document.documentElement;
  const canvas = document.getElementById("canvas");
  const entropySlider = document.getElementById("entropySlider");
  const dialVal = document.getElementById("dialVal");
  const stateTag = document.getElementById("stateTag");
  const gridBtn = document.getElementById("gridBtn");
  const soundBtn = document.getElementById("soundBtn");
  const resetBtn = document.getElementById("resetBtn");
  const liveTime = document.getElementById("liveTime");
  const diagViewport = document.getElementById("diagViewport");
  const diagEntropy = document.getElementById("diagEntropy");
  const stampRefuseBtn = document.getElementById("stampRefuseBtn");
  const fakeAiPod = document.getElementById("fakeAiPod");
  const ballArtifact = document.querySelector(".ball-artifact");
  const breakElements = document.querySelectorAll("[data-break]");
  const logicPath = document.getElementById("logicPath");

  let isSoundEnabled = true;
  let userManuallyScrubbing = false;

  // ---- Pad Helper ----
  const pad = (n) => String(n).padStart(2, "0");

  // ---- 1. Live Swiss Clock ----
  function updateClock() {
    if (!liveTime) return;
    const d = new Date();
    liveTime.textContent =
      `${pad(d.getDate())}.${pad(d.getMonth() + 1)}.${d.getFullYear()}  ` +
      `${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`;
  }

  // ---- 2. Live Telemetry & Viewport Diagnostics ----
  function updateDiagnostics() {
    if (diagViewport) {
      diagViewport.textContent = `${window.innerWidth}×${window.innerHeight}px`;
    }
  }

  // ---- 3. Entropy Modulation (The Logic Line Flow) ----
  function setEntropy(val, triggerSource = "auto") {
    const clamped = Math.max(0, Math.min(100, val));
    const normalized = clamped / 100;

    root.style.setProperty("--entropy", normalized.toFixed(2));
    if (dialVal) dialVal.textContent = `מתח: ${Math.round(clamped)}%`;
    if (diagEntropy) diagEntropy.textContent = normalized.toFixed(2);
    if (entropySlider && triggerSource !== "slider") {
      entropySlider.value = clamped;
    }

    // Dynamic State Tag in HUD
    if (stateTag) {
      if (clamped < 20) {
        stateTag.textContent = "ACT I: סדר טהור (0°)";
      } else if (clamped < 45) {
        stateTag.textContent = "ACT II: טופסולוגיה בהסגר";
      } else if (clamped < 70) {
        stateTag.textContent = "ACT IV: מתח פעיל (50°)";
      } else {
        stateTag.textContent = "ACT III: שבירה ואנטרופיה (100°)";
      }
    }

    // Dynamically warp the Logic Line path
    if (logicPath) {
      const wobble = normalized * 35;
      logicPath.setAttribute(
        "d",
        `M 50,0 ` +
        `L ${50 + wobble * 0.2},220 ` +
        `C ${50 - wobble},260 ${85 + wobble},290 85,350 ` +
        `C ${85 - wobble * 1.5},420 ${20 + wobble},460 20,540 ` +
        `L ${80 + wobble},620 ` +
        `L ${30 - wobble},700 ` +
        `L ${70 + wobble * 0.8},780 ` +
        `C 70,850 50,890 50,1000`
      );
    }
  }

  if (entropySlider) {
    entropySlider.addEventListener("input", function (e) {
      userManuallyScrubbing = true;
      setEntropy(Number(e.target.value), "slider");
    });
  }

  // ---- 4. Natural Scroll Narrative Flow ----
  const acts = [
    { el: document.getElementById("act-order"), entropy: 0 },
    { el: document.getElementById("act-topsology"), entropy: 35 },
    { el: document.getElementById("act-break"), entropy: 85 },
    { el: document.getElementById("act-manifesto"), entropy: 50 },
    { el: document.getElementById("act-colophon"), entropy: 15 }
  ];

  function onScroll() {
    if (userManuallyScrubbing) return; // Respect manual user dial
    const scrollY = window.scrollY;
    const windowH = window.innerHeight;
    const scrollMid = scrollY + windowH * 0.45;

    for (let i = acts.length - 1; i >= 0; i--) {
      const act = acts[i];
      if (act.el && scrollMid >= act.el.offsetTop) {
        // Compute progress between this act and the next
        const currentTop = act.el.offsetTop;
        const nextAct = acts[i + 1];
        if (nextAct && nextAct.el) {
          const nextTop = nextAct.el.offsetTop;
          const range = nextTop - currentTop;
          const progress = Math.min(1, Math.max(0, (scrollMid - currentTop) / range));
          const targetEntropy = act.entropy + (nextAct.entropy - act.entropy) * progress;
          setEntropy(targetEntropy, "scroll");
        } else {
          setEntropy(act.entropy, "scroll");
        }
        break;
      }
    }
  }

  window.addEventListener("scroll", onScroll, { passive: true });

  // ---- 5. Web Audio API Synthesizer (Tennis Hit & Acoustic Stamping) ----
  function playAcousticHit(type = "tennis") {
    if (!isSoundEnabled) return;
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();

      if (type === "tennis") {
        // Pressurized rubber core + taut racket strings
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = "sine";
        osc.frequency.setValueAtTime(320, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(65, ctx.currentTime + 0.11);
        gain.gain.setValueAtTime(0.85, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.11);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + 0.11);

        // Felt impact noise burst
        const bufferSize = Math.floor(ctx.sampleRate * 0.045);
        const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
        const data = buffer.getChannelData(0);
        for (let i = 0; i < bufferSize; i++) data[i] = Math.random() * 2 - 1;
        const noise = ctx.createBufferSource();
        noise.buffer = buffer;
        const filter = ctx.createBiquadFilter();
        filter.type = "bandpass";
        filter.frequency.value = 900;
        const noiseGain = ctx.createGain();
        noiseGain.gain.setValueAtTime(0.4, ctx.currentTime);
        noiseGain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.045);
        noise.connect(filter);
        filter.connect(noiseGain);
        noiseGain.connect(ctx.destination);
        noise.start();
      } else if (type === "stamp") {
        // Heavy mechanical rubber stamp thud
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = "triangle";
        osc.frequency.setValueAtTime(140, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(30, ctx.currentTime + 0.16);
        gain.gain.setValueAtTime(0.9, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.16);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + 0.16);
      }
    } catch (e) {
      // AudioContext blocked
    }
  }

  // ---- 6. Draggable Personal Living Artifacts ----
  breakElements.forEach((el) => {
    let isDragging = false;
    let startX = 0;
    let startY = 0;
    let currentX = 0;
    let currentY = 0;
    let hasMoved = false;

    // Cache initial computed transform matrix
    const computed = window.getComputedStyle(el).transform;
    el.dataset.baseMatrix = computed === "none" ? "" : computed;

    el.addEventListener("pointerdown", function (e) {
      if (e.target.tagName === "BUTTON" || e.target.tagName === "A") return;
      isDragging = true;
      hasMoved = false;
      startX = e.clientX;
      startY = e.clientY;
      currentX = parseFloat(el.dataset.dragX || 0);
      currentY = parseFloat(el.dataset.dragY || 0);
      el.classList.add("is-dragging");
      el.setPointerCapture(e.pointerId);
    });

    el.addEventListener("pointermove", function (e) {
      if (!isDragging) return;
      const dx = e.clientX - startX;
      const dy = e.clientY - startY;
      if (Math.abs(dx) > 4 || Math.abs(dy) > 4) hasMoved = true;
      const nx = currentX + dx;
      const ny = currentY + dy;
      el.dataset.dragX = nx;
      el.dataset.dragY = ny;
      el.style.transform = `translate3d(${nx}px, ${ny}px, 0) ${el.dataset.baseMatrix}`;
    });

    const finishDrag = function (e) {
      if (!isDragging) return;
      isDragging = false;
      el.classList.remove("is-dragging");
      try {
        el.releasePointerCapture(e.pointerId);
      } catch (err) {}

      // Click action if not dragged
      if (!hasMoved) {
        if (el.classList.contains("ball-artifact")) {
          playAcousticHit("tennis");
        }
      }
    };

    el.addEventListener("pointerup", finishDrag);
    el.addEventListener("pointercancel", finishDrag);
  });

  // ---- 7. Reset Artifacts Button ----
  function resetAllArtifacts() {
    breakElements.forEach((el) => {
      delete el.dataset.dragX;
      delete el.dataset.dragY;
      el.style.transform = "";
    });
    userManuallyScrubbing = false;
    onScroll();
  }

  if (resetBtn) resetBtn.addEventListener("click", resetAllArtifacts);

  // ---- 8. Dynamic Stamping on AI Autopsy Pod ----
  const refusePhrases = [
    "UNSYSTEMATIC",
    "צאצא מנוון של מודרניזם",
    "סדר ללא אידאולוגיה",
    "REFUSED BY DESIGNER",
    "INTER = לא פה",
    "קלישאה ללא עמדה",
    "נפסל במודע",
    "פשרה עצלה"
  ];

  if (stampRefuseBtn && fakeAiPod) {
    stampRefuseBtn.addEventListener("click", function () {
      const stamp = document.createElement("div");
      stamp.className = "dynamic-stamp";
      const phrase = refusePhrases[Math.floor(Math.random() * refusePhrases.length)];
      stamp.textContent = phrase;

      const rot = Math.floor(Math.random() * 46) - 23; // -23deg to +23deg
      const top = Math.floor(Math.random() * 60) + 20; // 20% to 80%
      const left = Math.floor(Math.random() * 60) + 20; // 20% to 80%

      stamp.style.setProperty("--rot", `${rot}deg`);
      stamp.style.top = `${top}%`;
      stamp.style.left = `${left}%`;

      fakeAiPod.appendChild(stamp);
      playAcousticHit("stamp");
    });
  }

  // ---- 9. Grid Toggle ----
  function toggleGrid() {
    if (!canvas) return;
    const isOff = canvas.classList.toggle("is-grid-off");
    gridBtn.setAttribute("aria-pressed", String(!isOff));
    gridBtn.textContent = isOff ? "גריד: כבוי [G]" : "גריד: דולק [G]";
  }

  if (gridBtn) gridBtn.addEventListener("click", toggleGrid);

  // ---- 10. Sound Toggle ----
  function toggleSound() {
    isSoundEnabled = !isSoundEnabled;
    soundBtn.setAttribute("aria-pressed", String(isSoundEnabled));
    soundBtn.textContent = isSoundEnabled ? "סאונד: דולק [S]" : "סאונד: מושתק [S]";
  }

  if (soundBtn) soundBtn.addEventListener("click", toggleSound);

  // ---- 11. Keyboard Shortcuts ----
  window.addEventListener("keydown", function (e) {
    if (e.target.tagName === "INPUT" || e.target.tagName === "TEXTAREA") return;
    const key = e.key.toLowerCase();
    if (key === "g") toggleGrid();
    if (key === "s") toggleSound();
    if (key === "r") resetAllArtifacts();
  });

  // ---- Initialize ----
  updateClock();
  setInterval(updateClock, 1000);
  updateDiagnostics();
  window.addEventListener("resize", updateDiagnostics);
  setEntropy(0);
  onScroll();
})();
