(function () {
  const page = document.getElementById("page");
  const toggle = document.getElementById("gridToggle");
  const resetBtn = document.getElementById("resetBreakBtn");
  const stampBtn = document.getElementById("stampAgainBtn");
  const clock = document.getElementById("clock");
  const measures = document.getElementById("measures");
  const year = document.getElementById("year");
  const fakeAi = document.querySelector(".fake-ai");
  const breakElements = document.querySelectorAll("[data-break]");

  const pad = (n) => String(n).padStart(2, "0");

  function tick() {
    const d = new Date();
    clock.textContent =
      pad(d.getDate()) +
      "." +
      pad(d.getMonth() + 1) +
      "." +
      d.getFullYear() +
      "  " +
      pad(d.getHours()) +
      ":" +
      pad(d.getMinutes()) +
      ":" +
      pad(d.getSeconds());
  }

  function measure() {
    const styles = getComputedStyle(document.documentElement);
    const unit = styles.getPropertyValue("--u").trim();
    measures.textContent =
      "viewport " +
      window.innerWidth +
      "×" +
      window.innerHeight +
      " · unit " +
      unit +
      " · columns 12 · dir rtl · grid " +
      (page.classList.contains("is-grid-off") ? "off" : "on");
  }

  function toggleGrid() {
    const off = page.classList.toggle("is-grid-off");
    toggle.setAttribute("aria-pressed", String(!off));
    toggle.textContent = off ? "הצגת גריד [G]" : "כיבוי גריד [G]";
    measure();
  }

  toggle.addEventListener("click", toggleGrid);

  // ---- Audio Synthesizer: Tennis Hit on Net (zero external files) ----
  function playTennisHit() {
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();

      // Pitch drop (taut strings / compressed rubber)
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(280, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(55, ctx.currentTime + 0.1);
      gain.gain.setValueAtTime(0.8, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.1);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.1);

      // Felt burst noise
      const bufferSize = Math.floor(ctx.sampleRate * 0.05);
      const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = Math.random() * 2 - 1;
      }
      const noise = ctx.createBufferSource();
      noise.buffer = buffer;
      const noiseFilter = ctx.createBiquadFilter();
      noiseFilter.type = "bandpass";
      noiseFilter.frequency.value = 850;
      const noiseGain = ctx.createGain();
      noiseGain.gain.setValueAtTime(0.4, ctx.currentTime);
      noiseGain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.05);
      noise.connect(noiseFilter);
      noiseFilter.connect(noiseGain);
      noiseGain.connect(ctx.destination);
      noise.start();
    } catch (e) {
      // AudioContext not allowed or unsupported
    }
  }

  // ---- Draggable Break Elements ----
  breakElements.forEach((el) => {
    // Record initial transform once rendered
    const initialTransform = window.getComputedStyle(el).transform;
    el.dataset.baseTransform = initialTransform === "none" ? "" : initialTransform;

    let isDown = false;
    let startX = 0;
    let startY = 0;
    let currentX = 0;
    let currentY = 0;
    let moved = false;

    el.addEventListener("pointerdown", function (e) {
      // Allow button clicks or nested links
      if (e.target.tagName === "A" || e.target.tagName === "BUTTON") return;
      isDown = true;
      moved = false;
      startX = e.clientX;
      startY = e.clientY;
      currentX = parseFloat(el.dataset.dragX || 0);
      currentY = parseFloat(el.dataset.dragY || 0);
      el.classList.add("is-dragging");
      el.setPointerCapture(e.pointerId);
    });

    el.addEventListener("pointermove", function (e) {
      if (!isDown) return;
      const dx = e.clientX - startX;
      const dy = e.clientY - startY;
      if (Math.abs(dx) > 3 || Math.abs(dy) > 3) {
        moved = true;
      }
      const nextX = currentX + dx;
      const nextY = currentY + dy;
      el.dataset.dragX = nextX;
      el.dataset.dragY = nextY;
      const base = el.dataset.baseTransform;
      el.style.transform = `translate3d(${nextX}px, ${nextY}px, 0) ${base}`;
    });

    const endDrag = function (e) {
      if (!isDown) return;
      isDown = false;
      el.classList.remove("is-dragging");
      try {
        el.releasePointerCapture(e.pointerId);
      } catch (err) {}

      // If clicked without significant movement, trigger action
      if (!moved) {
        if (el.classList.contains("ball")) {
          playTennisHit();
        }
      }
    };

    el.addEventListener("pointerup", endDrag);
    el.addEventListener("pointercancel", endDrag);
  });

  // ---- Reset Break Elements ----
  function resetBreakElements() {
    breakElements.forEach((el) => {
      delete el.dataset.dragX;
      delete el.dataset.dragY;
      el.style.transform = "";
    });
  }

  if (resetBtn) {
    resetBtn.addEventListener("click", resetBreakElements);
  }

  // ---- Stamp More Refusals on the AI Card ----
  const stampPhrases = [
    "UNSYSTEMATIC",
    "סדר בלי עמדה",
    "REFUSED BY DESIGNER",
    "צאצא מנוון",
    "לא שוויץ",
    "קלישאה ללא החלטה",
    "נפסל במודע",
    "INTER = לא פה"
  ];

  if (stampBtn && fakeAi) {
    stampBtn.addEventListener("click", function () {
      const stamp = document.createElement("div");
      stamp.className = "dynamic-stamp";
      const phrase = stampPhrases[Math.floor(Math.random() * stampPhrases.length)];
      stamp.textContent = phrase;

      const rot = Math.floor(Math.random() * 50) - 25; // -25deg to 25deg
      const top = Math.floor(Math.random() * 65) + 15; // 15% to 80%
      const left = Math.floor(Math.random() * 65) + 15; // 15% to 80%

      stamp.style.setProperty("--rot", `${rot}deg`);
      stamp.style.top = `${top}%`;
      stamp.style.left = `${left}%`;

      fakeAi.appendChild(stamp);
      playTennisHit(); // acoustic punch
    });
  }

  // ---- Keyboard Shortcuts ----
  window.addEventListener("keydown", function (e) {
    if (e.target.tagName === "INPUT" || e.target.tagName === "TEXTAREA") return;
    if (e.key === "g" || e.key === "G") {
      toggleGrid();
    } else if (e.key === "r" || e.key === "R") {
      resetBreakElements();
    }
  });

  year.textContent = String(new Date().getFullYear());
  tick();
  measure();
  setInterval(tick, 1000);
  window.addEventListener("resize", measure);
})();
