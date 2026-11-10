/**
 * עידן ירחי — תעודת זהות / מפרט מוצר: מהנדס × מעצב × המיקס
 * ZERO-SCROLL CORE ENGINE: Channel Matrix, Quantum Crossfader, Synthesizer, Drawer
 */

(function () {
  "use strict";

  // ---- DOM Elements ----
  const body = document.body;
  const appFrame = document.getElementById("appFrame");
  const channelBtns = document.querySelectorAll(".channel-btn");
  const mixSlider = document.getElementById("mixSlider");
  const crossfaderLabel = document.getElementById("crossfaderLabel");
  const quantumBadge = document.getElementById("quantumBadge");
  const clockReadout = document.getElementById("clockReadout");
  const gridToggleBtn = document.getElementById("gridToggleBtn");
  const soundToggleBtn = document.getElementById("soundToggleBtn");
  const openManifestoBtn = document.getElementById("openManifestoBtn");
  const closeManifestoBtn = document.getElementById("closeManifestoBtn");
  const doneDrawerBtn = document.getElementById("doneDrawerBtn");
  const manifestoDrawer = document.getElementById("manifestoDrawer");
  const tennisBall = document.getElementById("tennisBall");
  const quarantineBox = document.getElementById("quarantineBox");
  const stampMoreBtn = document.getElementById("stampMoreBtn");

  // Hobby Buttons
  const tennisMixBtn = document.getElementById("tennisMixBtn");
  const yogaMixBtn = document.getElementById("yogaMixBtn");
  const deanMixBtn = document.getElementById("deanMixBtn");
  const nunuMixBtn = document.getElementById("nunuMixBtn");
  const rhinoMixBtn = document.getElementById("rhinoMixBtn");
  const moonMixBtn = document.getElementById("moonMixBtn");

  let isSoundOn = true;

  // ---- 1. Live Clock ----
  const pad = (n) => String(n).padStart(2, "0");
  function updateClock() {
    if (!clockReadout) return;
    const d = new Date();
    clockReadout.textContent = `${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`;
  }
  setInterval(updateClock, 1000);
  updateClock();

  // ---- 2. Web Audio Synthesizer (Tennis Hit, Stamp, Synth Pop) ----
  function playSound(type = "tennis") {
    if (!isSoundOn) return;
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();

      if (type === "tennis") {
        // Pressurized rubber core + taut racket strings
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = "sine";
        osc.frequency.setValueAtTime(310, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(60, ctx.currentTime + 0.1);
        gain.gain.setValueAtTime(0.85, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.1);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + 0.1);

        // Felt impact noise burst
        const bufferSize = Math.floor(ctx.sampleRate * 0.04);
        const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
        const data = buffer.getChannelData(0);
        for (let i = 0; i < bufferSize; i++) data[i] = Math.random() * 2 - 1;
        const noise = ctx.createBufferSource();
        noise.buffer = buffer;
        const filter = ctx.createBiquadFilter();
        filter.type = "bandpass";
        filter.frequency.value = 850;
        const noiseGain = ctx.createGain();
        noiseGain.gain.setValueAtTime(0.35, ctx.currentTime);
        noiseGain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.04);
        noise.connect(filter);
        filter.connect(noiseGain);
        noiseGain.connect(ctx.destination);
        noise.start();
      } else if (type === "stamp") {
        // Heavy mechanical rubber stamp thud
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = "triangle";
        osc.frequency.setValueAtTime(130, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(35, ctx.currentTime + 0.14);
        gain.gain.setValueAtTime(0.9, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.14);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + 0.14);
      } else if (type === "pop") {
        // High playful Nono pop
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = "sine";
        osc.frequency.setValueAtTime(580, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 0.08);
        gain.gain.setValueAtTime(0.5, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.08);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + 0.08);
      }
    } catch (e) {}
  }

  // ---- 3. Channel Matrix Controller ----
  function setChannel(channel) {
    body.classList.remove("mode-code", "mode-mix", "mode-design");
    body.classList.add(`mode-${channel}`);

    channelBtns.forEach((btn) => {
      btn.classList.toggle("is-active", btn.dataset.channel === channel);
    });

    if (channel === "code") {
      if (mixSlider) mixSlider.value = 0;
      if (crossfaderLabel) crossfaderLabel.textContent = "01 / מהנדס תוכנה: דטרמיניזם וקוד";
      if (quantumBadge) quantumBadge.textContent = "MODE: CODE / ARCHITECTURE (0% COMPROMISE)";
    } else if (channel === "design") {
      if (mixSlider) mixSlider.value = 100;
      if (crossfaderLabel) crossfaderLabel.textContent = "02 / מעצב UI/UX: משמעת שוויצרית וצורה";
      if (quantumBadge) quantumBadge.textContent = "MODE: DESIGN / SWISS FORM (12 COLUMNS)";
    } else {
      if (mixSlider) mixSlider.value = 50;
      if (crossfaderLabel) crossfaderLabel.textContent = "★ THE MIX: גם וגם ואף אחד בו-זמנית ★";
      if (quantumBadge) quantumBadge.textContent = "QUANTUM SUPERPOSITION: BOTH & NEITHER";
    }
  }

  channelBtns.forEach((btn) => {
    btn.addEventListener("click", () => setChannel(btn.dataset.channel));
  });

  if (mixSlider) {
    mixSlider.addEventListener("input", function (e) {
      const val = Number(e.target.value);
      if (val < 33) {
        setChannel("code");
        mixSlider.value = val;
      } else if (val > 66) {
        setChannel("design");
        mixSlider.value = val;
      } else {
        setChannel("mix");
        mixSlider.value = val;
      }
    });
  }

  // ---- 4. Draggable Tennis Ball ----
  if (tennisBall) {
    let isDragging = false;
    let startX = 0;
    let startY = 0;
    let currentX = 0;
    let currentY = 0;
    let moved = false;

    tennisBall.addEventListener("pointerdown", function (e) {
      isDragging = true;
      moved = false;
      startX = e.clientX;
      startY = e.clientY;
      currentX = parseFloat(tennisBall.dataset.dragX || 0);
      currentY = parseFloat(tennisBall.dataset.dragY || 0);
      tennisBall.setPointerCapture(e.pointerId);
    });

    tennisBall.addEventListener("pointermove", function (e) {
      if (!isDragging) return;
      const dx = e.clientX - startX;
      const dy = e.clientY - startY;
      if (Math.abs(dx) > 3 || Math.abs(dy) > 3) moved = true;
      const nx = currentX + dx;
      const ny = currentY + dy;
      tennisBall.dataset.dragX = nx;
      tennisBall.dataset.dragY = ny;
      tennisBall.style.transform = `translate3d(${nx}px, ${ny}px, 0) rotate(-14deg)`;
    });

    const endBallDrag = function (e) {
      if (!isDragging) return;
      isDragging = false;
      try { tennisBall.releasePointerCapture(e.pointerId); } catch (err) {}
      if (!moved) {
        playSound("tennis");
      }
    };

    tennisBall.addEventListener("pointerup", endBallDrag);
    tennisBall.addEventListener("pointercancel", endBallDrag);
  }

  // ---- 5. Hobby Blend Buttons Feedback ----
  if (tennisMixBtn) {
    tennisMixBtn.addEventListener("click", () => {
      playSound("tennis");
      if (tennisBall) {
        tennisBall.style.transform = "scale(1.2) rotate(15deg)";
        setTimeout(() => {
          tennisBall.style.transform = "rotate(-14deg)";
        }, 200);
      }
    });
  }

  if (nunuMixBtn) {
    nunuMixBtn.addEventListener("click", () => {
      playSound("pop");
      document.body.style.boxShadow = "inset 0 0 40px #ff2a85";
      setTimeout(() => { document.body.style.boxShadow = ""; }, 300);
    });
  }

  if (deanMixBtn) {
    deanMixBtn.addEventListener("click", () => {
      playSound("pop");
      document.body.style.boxShadow = "inset 0 0 40px #f5a623";
      setTimeout(() => { document.body.style.boxShadow = ""; }, 300);
    });
  }

  if (yogaMixBtn) {
    yogaMixBtn.addEventListener("click", () => {
      playSound("pop");
      document.body.style.boxShadow = "inset 0 0 40px #d05a2b";
      setTimeout(() => { document.body.style.boxShadow = ""; }, 300);
    });
  }

  if (rhinoMixBtn) {
    rhinoMixBtn.addEventListener("click", () => {
      playSound("stamp");
      document.body.style.boxShadow = "inset 0 0 40px #5b2b82";
      setTimeout(() => { document.body.style.boxShadow = ""; }, 300);
    });
  }

  if (moonMixBtn) {
    moonMixBtn.addEventListener("click", () => {
      playSound("stamp");
      document.body.style.filter = "invert(1)";
      setTimeout(() => { document.body.style.filter = ""; }, 250);
    });
  }

  // ---- 6. Topsology Stamping Action ----
  const refusePhrases = [
    "UNSYSTEMATIC",
    "לא מוצר מדף",
    "0% CONVICTION",
    "קלישאה ללא עמדה",
    "נפסל במודע",
    "INTER = לא פה",
    "סדר מנוון"
  ];

  if (stampMoreBtn && quarantineBox) {
    stampMoreBtn.addEventListener("click", function () {
      const stamp = document.createElement("div");
      stamp.className = "stamp-denied";
      const phrase = refusePhrases[Math.floor(Math.random() * refusePhrases.length)];
      stamp.textContent = phrase;

      const rot = Math.floor(Math.random() * 30) - 15;
      const top = Math.floor(Math.random() * 40) + 30;
      const left = Math.floor(Math.random() * 40) + 30;

      stamp.style.transform = `translate(-50%, -50%) rotate(${rot}deg)`;
      stamp.style.top = `${top}%`;
      stamp.style.left = `${left}%`;

      quarantineBox.appendChild(stamp);
      playSound("stamp");
    });
  }

  // ---- 7. Manifesto Drawer Controls ----
  function openManifesto() {
    if (manifestoDrawer) {
      manifestoDrawer.classList.add("is-open");
      manifestoDrawer.setAttribute("aria-hidden", "false");
    }
  }

  function closeManifesto() {
    if (manifestoDrawer) {
      manifestoDrawer.classList.remove("is-open");
      manifestoDrawer.setAttribute("aria-hidden", "true");
    }
  }

  if (openManifestoBtn) openManifestoBtn.addEventListener("click", openManifesto);
  if (closeManifestoBtn) closeManifestoBtn.addEventListener("click", closeManifesto);
  if (doneDrawerBtn) doneDrawerBtn.addEventListener("click", closeManifesto);

  // ---- 8. Grid & Sound Toggles ----
  function toggleGrid() {
    if (!appFrame) return;
    const isOff = appFrame.classList.toggle("is-grid-off");
    gridToggleBtn.setAttribute("aria-pressed", String(!isOff));
    gridToggleBtn.textContent = isOff ? "גריד: כבוי [G]" : "גריד: דולק [G]";
  }

  if (gridToggleBtn) gridToggleBtn.addEventListener("click", toggleGrid);

  function toggleSound() {
    isSoundOn = !isSoundOn;
    soundToggleBtn.setAttribute("aria-pressed", String(isSoundOn));
    soundToggleBtn.textContent = isSoundOn ? "סאונד [S]" : "מושתק [S]";
  }

  if (soundToggleBtn) soundToggleBtn.addEventListener("click", toggleSound);

  // ---- 9. Keyboard Shortcuts ----
  window.addEventListener("keydown", function (e) {
    if (e.target.tagName === "INPUT" || e.target.tagName === "TEXTAREA") return;
    const key = e.key.toLowerCase();
    if (key === "m") {
      if (manifestoDrawer && manifestoDrawer.classList.contains("is-open")) {
        closeManifesto();
      } else {
        openManifesto();
      }
    } else if (key === "escape") {
      closeManifesto();
    } else if (key === "g") {
      toggleGrid();
    } else if (key === "s") {
      toggleSound();
    } else if (key === "1") {
      setChannel("code");
    } else if (key === "2") {
      setChannel("design");
    } else if (key === "3" || key === " ") {
      setChannel("mix");
    }
  });

  // Default mode
  setChannel("mix");
})();
