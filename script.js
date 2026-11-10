/**
 * עידן ירחי — מכולת ירחי / ÉPICERIE YARCHI
 * HORIZONTAL BOUTIQUE AISLE & TRANSFORMATION ENGINE
 * Controls: Block Transformations, Smooth Horizontal Snapping, Crossfader, Web Audio, Stamping, Keyboard Shortcuts
 */

(function () {
  "use strict";

  // ---- 1. DOM Elements ----
  const marketViewport = document.getElementById("marketViewport");
  const aisleStrip = document.getElementById("aisleStrip");
  const aisleBtns = document.querySelectorAll(".aisle-btn");
  const storeClock = document.getElementById("storeClock");
  const gridToggleBtn = document.getElementById("gridToggleBtn");
  const soundToggleBtn = document.getElementById("soundToggleBtn");
  const manifestoOpenBtn = document.getElementById("manifestoOpenBtn");

  // Transformation Engine Elements
  const transformButtons = document.querySelectorAll("[data-transform]");
  const transformToast = document.getElementById("transformToast");
  const toastMsg = document.getElementById("toastMsg");
  const quantumStatusText = document.getElementById("quantumStatusText");
  let toastTimer = null;

  // Boutique Slider & Cocktails
  const boutiqueSlider = document.getElementById("boutiqueSlider");
  const mixBadge = document.getElementById("mixBadge");
  const cocktailDesc = document.getElementById("cocktailDesc");

  // Interactive Objects
  const tennisObject = document.getElementById("tennisObject");
  const nonoObject = document.getElementById("nonoObject");
  const ticketObject = document.getElementById("ticketObject");
  const rhinoObject = document.getElementById("rhinoObject");
  const yogaObject = document.getElementById("yogaObject");
  const moonObject = document.getElementById("moonObject");

  // Rejection & Topsology Elements
  const quarantineCard = document.getElementById("quarantineCard");

  let isSoundActive = true;

  // ---- 2. Live Boutique Clock ----
  const pad = (n) => String(n).padStart(2, "0");
  function tickClock() {
    if (!storeClock) return;
    const d = new Date();
    storeClock.textContent = `${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`;
  }
  setInterval(tickClock, 1000);
  tickClock();

  // ---- 3. Web Audio Synthesizer ----
  function playAudio(type = "tennis") {
    if (!isSoundActive) return;
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();

      if (type === "code") {
        // 8-bit digital synth chirp / terminal execution
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = "square";
        osc.frequency.setValueAtTime(440, ctx.currentTime);
        osc.frequency.setValueAtTime(880, ctx.currentTime + 0.04);
        osc.frequency.setValueAtTime(1760, ctx.currentTime + 0.08);
        gain.gain.setValueAtTime(0.18, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.14);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + 0.14);
      } else if (type === "design") {
        // Precision mechanical shutter click (Müller-Brockmann strictness)
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = "triangle";
        osc.frequency.setValueAtTime(1400, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(80, ctx.currentTime + 0.06);
        gain.gain.setValueAtTime(0.4, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.06);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + 0.06);
      } else if (type === "mix") {
        // Dual oscillator harmonic superposition chord (A4 + E5)
        const osc1 = ctx.createOscillator();
        const osc2 = ctx.createOscillator();
        const gain = ctx.createGain();
        osc1.type = "sine";
        osc2.type = "triangle";
        osc1.frequency.setValueAtTime(440, ctx.currentTime);
        osc2.frequency.setValueAtTime(659.25, ctx.currentTime);
        gain.gain.setValueAtTime(0.3, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.28);
        osc1.connect(gain);
        osc2.connect(gain);
        gain.connect(ctx.destination);
        osc1.start();
        osc2.start();
        osc1.stop(ctx.currentTime + 0.28);
        osc2.stop(ctx.currentTime + 0.28);
      } else if (type === "tennis") {
        // High tension racket strings + pressurized felt ball hit
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = "sine";
        osc.frequency.setValueAtTime(340, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(55, ctx.currentTime + 0.1);
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
    } catch (e) {
      // AudioContext not allowed or not supported; gracefully ignore
    }
  }

  // ---- 4. Smooth Horizontal Scroll to Stall ----
  function scrollToStall(elementId, inlinePos = "center") {
    const target = document.getElementById(elementId);
    if (target && aisleStrip) {
      target.scrollIntoView({ behavior: "smooth", block: "nearest", inline: inlinePos });
    }
  }

  // Department Filter Clicks (Also Triggers Full Mode Transformation)
  aisleBtns.forEach((btn) => {
    btn.addEventListener("click", function () {
      const filter = btn.dataset.filter;
      if (filter === "all") applyTransformation("initial");
      else applyTransformation(filter);
    });
  });

  if (manifestoOpenBtn) {
    manifestoOpenBtn.addEventListener("click", () => applyTransformation("manifesto"));
  }

  // Wheel horizontal scrolling (convert vertical mousewheel to horizontal aisle scroll)
  if (aisleStrip) {
    aisleStrip.addEventListener("wheel", function (e) {
      if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
        e.preventDefault();
        aisleStrip.scrollLeft += e.deltaY;
      }
    }, { passive: false });
  }

  // ---- 5. Transformation Engine (Showing Adaptability on Demand) ----
  const screenBurst = document.getElementById("screenBurst");

  const STATE_DESCRIPTIONS = {
    initial: {
      toast: "↺ איפוס: האתר חזר למצב בסיס — מכולת בוטיק ארטיזנלית",
      status: "מצב: שניהם ואף אחד מהם (BOTH & NEITHER)",
      audio: "chime",
      targetId: "item-hero"
    },
    code: {
      toast: "⚡ שבירה למצב קוד: מסוף האקרים דטרמיניסטי מלא (IDE & CRT)",
      status: "מצב: מהנדס תוכנה — 100% דטרמיניזם וקוד נקי",
      audio: "code",
      targetId: "item-code"
    },
    design: {
      toast: "📐 שבירה למצב שוויצרי: 0px רדיוס, טיפוגרפיה רדיקלית וגריד ציריך 1957",
      status: "מצב: מעצב שוויצרי — גריד קפדני, 0px רדיוס, טיפוגרפיה שיטתית",
      audio: "design",
      targetId: "item-design"
    },
    mix: {
      toast: "✦ שבירה לסופרפוזיציה: זוהר קוונטי והולוגרפי — גם וגם בו-זמנית",
      status: "מצב: סופרפוזיציה — גם וגם ואף אחד מהם בו-זמנית",
      audio: "mix",
      targetId: "item-mix"
    },
    somatic: {
      toast: "🎾 שבירה סומטית: אנרכיית פאנק, כרטיסים עקומים וחבטת טניס 150 קמ״ש",
      status: "מצב: שבירה סומטית — צבע, טניס 150 קמ״ש, חומר חי וסאונד",
      audio: "tennis",
      targetId: "item-somatic"
    },
    recall: {
      toast: "🚫 שבירה להסגר: כוננות חירום DEFCON 1 נגד שבלונות ה-AI",
      status: "מצב: הסגר טופסולוגי — סירוב מוחלט לשבלונות AI",
      audio: "stamp",
      targetId: "item-recall"
    },
    manifesto: {
      toast: "📖 שבירה למניפסט: זרקור מוזיאלי ממוקד על מסת העמדה והאידיאולוגיה",
      status: "מצב: מניפסט עיוני — קריאה מעמיקה בעמדת המעצב",
      audio: "chime",
      targetId: "item-manifesto"
    }
  };

  const ALL_STATES = ["state-code", "state-design", "state-mix", "state-somatic", "state-recall", "state-manifesto"];

  function applyTransformation(mode) {
    // 0. Screen Shockwave Flash
    if (screenBurst) {
      screenBurst.classList.add("is-firing");
      setTimeout(() => {
        screenBurst.classList.remove("is-firing");
      }, 70);
    }

    // 1. Remove previous state classes
    document.body.classList.remove(...ALL_STATES);

    // 2. Add new state class if not initial
    if (mode && mode !== "initial") {
      document.body.classList.add(`state-${mode}`);
    }

    const stateConfig = STATE_DESCRIPTIONS[mode] || STATE_DESCRIPTIONS.initial;

    // 3. Update Status HUD in header
    if (quantumStatusText) {
      quantumStatusText.textContent = stateConfig.status;
    }

    // 4. Update Toast notification
    if (toastMsg && transformToast) {
      toastMsg.textContent = stateConfig.toast;
      transformToast.classList.add("is-visible");
      if (toastTimer) clearTimeout(toastTimer);
      toastTimer = setTimeout(() => {
        transformToast.classList.remove("is-visible");
      }, 3400);
    }

    // 5. Play corresponding audio
    playAudio(stateConfig.audio);

    // 6. Smoothly center the expanded focus stall in viewport
    if (stateConfig.targetId) {
      setTimeout(() => {
        scrollToStall(stateConfig.targetId, "center");
      }, 80);
    }

    // 7. Sync navigation bar active pill
    if (aisleBtns) {
      aisleBtns.forEach((b) => {
        const filter = b.dataset.filter;
        if ((filter === "all" && (mode === "initial" || !mode)) || filter === mode) {
          b.classList.add("is-active");
        } else {
          b.classList.remove("is-active");
        }
      });
    }
  }

  // Hook all block transform buttons
  transformButtons.forEach((btn) => {
    btn.addEventListener("click", function (e) {
      const mode = btn.dataset.transform;
      applyTransformation(mode);

      // Specific block extras
      if (mode === "recall") {
        createDynamicStamp();
      } else if (mode === "mix" && boutiqueSlider) {
        boutiqueSlider.value = 50;
        updateCrossfader(50);
      } else if (mode === "somatic" && tennisObject) {
        tennisObject.style.transform = "scale(1.15) rotate(-6deg)";
        setTimeout(() => { tennisObject.style.transform = ""; }, 250);
      }
    });
  });

  // ---- 6. Boutique Crossfader Slider ----
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

  // ---- 7. Somatic Hobby Object Clicks ----
  if (tennisObject) {
    tennisObject.addEventListener("click", () => {
      playAudio("tennis");
      tennisObject.style.transform = "scale(1.12) rotate(-6deg)";
      setTimeout(() => { tennisObject.style.transform = ""; }, 200);
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

  // ---- 8. Dynamic Topsology Stamping ----
  const rejectStamps = [
    "UNSYSTEMATIC",
    "לא מוצר מדף",
    "0% CONVICTION",
    "קלישאה ללא עמדה",
    "נפסל במודע",
    "INTER = לא פה",
    "סדר מנוון",
    "REJECTED BY DESIGNER"
  ];

  function createDynamicStamp() {
    if (!quarantineCard) return;
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
  }

  // ---- 9. Grid & Sound Toggles ----
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

  // ---- 10. Keyboard Shortcuts & Arrow Key Navigation ----
  window.addEventListener("keydown", function (e) {
    if (e.target.tagName === "INPUT" || e.target.tagName === "TEXTAREA") return;
    const key = e.key.toLowerCase();

    if (e.key === "ArrowLeft") {
      if (aisleStrip) aisleStrip.scrollBy({ left: -380, behavior: "smooth" });
    } else if (e.key === "ArrowRight") {
      if (aisleStrip) aisleStrip.scrollBy({ left: 380, behavior: "smooth" });
    } else if (key === "0") {
      applyTransformation("initial");
      scrollToStall("item-hero");
    } else if (key === "1") {
      applyTransformation("code");
      scrollToStall("item-code");
    } else if (key === "2") {
      applyTransformation("design");
      scrollToStall("item-design");
    } else if (key === "3" || key === " ") {
      applyTransformation("mix");
      scrollToStall("item-mix");
    } else if (key === "4") {
      applyTransformation("somatic");
      scrollToStall("item-somatic");
    } else if (key === "5") {
      applyTransformation("recall");
      scrollToStall("item-recall");
    } else if (key === "m") {
      applyTransformation("manifesto");
      scrollToStall("item-manifesto");
    } else if (key === "g") {
      toggleGrid();
    } else if (key === "s") {
      toggleSound();
    }
  });

})();
