/**
 * עידן ירחי — מכולת ירחי / ÉPICERIE YARHI (INSPIRATION: DINETTE.MARKET)
 * HORIZONTAL BOUTIQUE AISLE CONTROLLER: Smooth Horizontal Snapping, Crossfader, Web Audio, Stamping
 */

(function () {
  "use strict";

  // ---- DOM Elements ----
  const marketViewport = document.getElementById("marketViewport");
  const aisleStrip = document.getElementById("aisleStrip");
  const aisleBtns = document.querySelectorAll(".aisle-btn");
  const storeClock = document.getElementById("storeClock");
  const gridToggleBtn = document.getElementById("gridToggleBtn");
  const soundToggleBtn = document.getElementById("soundToggleBtn");
  const manifestoOpenBtn = document.getElementById("manifestoOpenBtn");

  // Boutique Slider & Cocktails
  const boutiqueSlider = document.getElementById("boutiqueSlider");
  const mixBadge = document.getElementById("mixBadge");
  const cocktailDesc = document.getElementById("cocktailDesc");
  const btnSurgeMix = document.getElementById("btnSurgeMix");

  // Interactive Objects
  const tennisObject = document.getElementById("tennisObject");
  const btnPlayTennisSound = document.getElementById("btnPlayTennisSound");
  const nonoObject = document.getElementById("nonoObject");
  const ticketObject = document.getElementById("ticketObject");
  const rhinoObject = document.getElementById("rhinoObject");
  const yogaObject = document.getElementById("yogaObject");
  const moonObject = document.getElementById("moonObject");

  // Buttons in Stalls
  const btnFilterCode = document.getElementById("btnFilterCode");
  const btnFilterDesign = document.getElementById("btnFilterDesign");
  const btnStampAgain = document.getElementById("btnStampAgain");
  const quarantineCard = document.getElementById("quarantineCard");

  let isSoundActive = true;

  // ---- 1. Live Boutique Clock ----
  const pad = (n) => String(n).padStart(2, "0");
  function tickClock() {
    if (!storeClock) return;
    const d = new Date();
    storeClock.textContent = `${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`;
  }
  setInterval(tickClock, 1000);
  tickClock();

  // ---- 2. Web Audio Synthesizer (Tennis Hit, Stamp, Chime) ----
  function playAudio(type = "tennis") {
    if (!isSoundActive) return;
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();

      if (type === "tennis") {
        // High tension racket strings + pressurized felt ball hit
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = "sine";
        osc.frequency.setValueAtTime(320, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(58, ctx.currentTime + 0.1);
        gain.gain.setValueAtTime(0.9, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.1);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + 0.1);

        // Impact noise burst
        const bufferSize = Math.floor(ctx.sampleRate * 0.04);
        const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
        const data = buffer.getChannelData(0);
        for (let i = 0; i < bufferSize; i++) data[i] = Math.random() * 2 - 1;
        const noise = ctx.createBufferSource();
        noise.buffer = buffer;
        const filter = ctx.createBiquadFilter();
        filter.type = "bandpass";
        filter.frequency.value = 880;
        const noiseGain = ctx.createGain();
        noiseGain.gain.setValueAtTime(0.35, ctx.currentTime);
        noiseGain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.04);
        noise.connect(filter);
        filter.connect(noiseGain);
        noiseGain.connect(ctx.destination);
        noise.start();
      } else if (type === "stamp") {
        // Heavy red ink rubber stamp thud
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = "triangle";
        osc.frequency.setValueAtTime(130, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(30, ctx.currentTime + 0.15);
        gain.gain.setValueAtTime(0.9, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.15);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + 0.15);
      } else if (type === "chime") {
        // Playful boutique bell
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = "sine";
        osc.frequency.setValueAtTime(660, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(990, ctx.currentTime + 0.12);
        gain.gain.setValueAtTime(0.4, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.12);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + 0.12);
      }
    } catch (e) {}
  }

  // ---- 3. Smooth Horizontal Scroll to Specific Stall ----
  function scrollToStall(elementId) {
    const target = document.getElementById(elementId);
    if (target && aisleStrip) {
      target.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "start" });
    }
  }

  // Department Filter Clicks
  aisleBtns.forEach((btn) => {
    btn.addEventListener("click", function () {
      aisleBtns.forEach((b) => b.classList.remove("is-active"));
      btn.classList.add("is-active");

      const filter = btn.dataset.filter;
      if (filter === "all") scrollToStall("item-hero");
      else if (filter === "code") scrollToStall("item-code");
      else if (filter === "design") scrollToStall("item-design");
      else if (filter === "mix") scrollToStall("item-mix");
      else if (filter === "somatic") scrollToStall("item-somatic");
      else if (filter === "recall") scrollToStall("item-recall");
    });
  });

  // Action Buttons in Stalls
  if (btnFilterCode) btnFilterCode.addEventListener("click", () => scrollToStall("item-code"));
  if (btnFilterDesign) btnFilterDesign.addEventListener("click", () => scrollToStall("item-design"));
  if (manifestoOpenBtn) manifestoOpenBtn.addEventListener("click", () => scrollToStall("item-manifesto"));

  // Wheel horizontal scrolling (convert vertical mousewheel to horizontal aisle scroll)
  if (aisleStrip) {
    aisleStrip.addEventListener("wheel", function (e) {
      if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
        e.preventDefault();
        aisleStrip.scrollLeft += e.deltaY;
      }
    }, { passive: false });
  }

  // ---- 4. Boutique Crossfader Slider ----
  function updateCrossfader(val) {
    if (!mixBadge || !cocktailDesc) return;
    mixBadge.textContent = `★ THE MIX: ${val}% ★`;

    if (val < 35) {
      cocktailDesc.innerHTML =
        "<strong>דומיננטיות קוד:</strong> אלגוריתמיקה, ארכיטקטורה נקייה, שחור-לבן מתמטי. החשיבה העיצובית מושקעת בלוגיקה ובמבנה.";
    } else if (val > 65) {
      cocktailDesc.innerHTML =
        "<strong>דומיננטיות עיצוב שוויצרי:</strong> טיפוגרפיה שיטתית, גריד 12 עמודות, היררכיה חזותית וקריאות מקסימלית.";
    } else {
      cocktailDesc.innerHTML =
        "<strong>סופרפוזיציה מושלמת (גם וגם ואף אחד):</strong> המתח החי שבין שחור-לבן לצבע, בין גריד מודרניסטי לכדור טניס שפוגע ברשת.";
    }
  }

  if (boutiqueSlider) {
    boutiqueSlider.addEventListener("input", (e) => updateCrossfader(Number(e.target.value)));
  }

  if (btnSurgeMix) {
    btnSurgeMix.addEventListener("click", function () {
      if (boutiqueSlider) {
        boutiqueSlider.value = 50;
        updateCrossfader(50);
      }
      playAudio("chime");
      document.body.style.boxShadow = "inset 0 0 50px var(--tennis-lime)";
      setTimeout(() => { document.body.style.boxShadow = ""; }, 300);
    });
  }

  // ---- 5. Somatic Hobby Object Clicks ----
  if (tennisObject) {
    tennisObject.addEventListener("click", () => {
      playAudio("tennis");
      tennisObject.style.transform = "scale(1.08) rotate(-4deg)";
      setTimeout(() => { tennisObject.style.transform = ""; }, 200);
    });
  }

  if (btnPlayTennisSound) {
    btnPlayTennisSound.addEventListener("click", () => {
      playAudio("tennis");
      if (tennisObject) {
        tennisObject.style.transform = "scale(1.08) rotate(-4deg)";
        setTimeout(() => { tennisObject.style.transform = ""; }, 200);
      }
    });
  }

  if (nonoObject) {
    nonoObject.addEventListener("click", () => {
      playAudio("chime");
      document.body.style.boxShadow = "inset 0 0 40px #ff3388";
      setTimeout(() => { document.body.style.boxShadow = ""; }, 250);
    });
  }

  if (ticketObject) {
    ticketObject.addEventListener("click", () => {
      playAudio("chime");
      document.body.style.boxShadow = "inset 0 0 40px #f5a623";
      setTimeout(() => { document.body.style.boxShadow = ""; }, 250);
    });
  }

  if (rhinoObject) {
    rhinoObject.addEventListener("click", () => {
      playAudio("stamp");
      document.body.style.boxShadow = "inset 0 0 40px #5b2b82";
      setTimeout(() => { document.body.style.boxShadow = ""; }, 250);
    });
  }

  if (yogaObject) {
    yogaObject.addEventListener("click", () => {
      playAudio("chime");
      document.body.style.boxShadow = "inset 0 0 40px #d05a2b";
      setTimeout(() => { document.body.style.boxShadow = ""; }, 250);
    });
  }

  if (moonObject) {
    moonObject.addEventListener("click", () => {
      playAudio("stamp");
      document.body.style.filter = "invert(1)";
      setTimeout(() => { document.body.style.filter = ""; }, 200);
    });
  }

  // ---- 6. Dynamic Topsology Stamping ----
  const rejectStamps = [
    "UNSYSTEMATIC",
    "לא מוצר מדף",
    "0% CONVICTION",
    "קלישאה ללא עמדה",
    "נפסל במודע",
    "INTER = לא פה",
    "סדר מנוון"
  ];

  if (btnStampAgain && quarantineCard) {
    btnStampAgain.addEventListener("click", function () {
      const stamp = document.createElement("div");
      stamp.className = "dynamic-stamp-refuse";
      const phrase = rejectStamps[Math.floor(Math.random() * rejectStamps.length)];
      stamp.textContent = phrase;

      const rot = Math.floor(Math.random() * 30) - 15;
      const top = Math.floor(Math.random() * 40) + 30;
      const left = Math.floor(Math.random() * 40) + 30;

      stamp.style.transform = `translate(-50%, -50%) rotate(${rot}deg)`;
      stamp.style.top = `${top}%`;
      stamp.style.left = `${left}%`;

      quarantineCard.appendChild(stamp);
      playAudio("stamp");
    });
  }

  // ---- 7. Grid & Sound Toggles ----
  function toggleGrid() {
    if (!marketViewport) return;
    const isOff = marketViewport.classList.toggle("is-grid-off");
    gridToggleBtn.setAttribute("aria-pressed", String(!isOff));
    gridToggleBtn.textContent = isOff ? "גריד: כבוי [G]" : "גריד [G]";
  }

  if (gridToggleBtn) gridToggleBtn.addEventListener("click", toggleGrid);

  function toggleSound() {
    isSoundActive = !isSoundActive;
    soundToggleBtn.setAttribute("aria-pressed", String(isSoundActive));
    soundToggleBtn.textContent = isSoundActive ? "סאונד [S]" : "מושתק [S]";
  }

  if (soundToggleBtn) soundToggleBtn.addEventListener("click", toggleSound);

  // ---- 8. Keyboard Shortcuts & Arrow Key Navigation ----
  window.addEventListener("keydown", function (e) {
    if (e.target.tagName === "INPUT" || e.target.tagName === "TEXTAREA") return;
    const key = e.key.toLowerCase();

    if (e.key === "ArrowLeft") {
      if (aisleStrip) aisleStrip.scrollBy({ left: -380, behavior: "smooth" });
    } else if (e.key === "ArrowRight") {
      if (aisleStrip) aisleStrip.scrollBy({ left: 380, behavior: "smooth" });
    } else if (key === "1") {
      scrollToStall("item-code");
    } else if (key === "2") {
      scrollToStall("item-design");
    } else if (key === "3" || key === " ") {
      scrollToStall("item-mix");
    } else if (key === "m") {
      scrollToStall("item-manifesto");
    } else if (key === "g") {
      toggleGrid();
    } else if (key === "s") {
      toggleSound();
    }
  });

})();
