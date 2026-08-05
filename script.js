(() => {
  "use strict";

  /* ---------- 1. 進場動畫：IntersectionObserver ---------- */
  const revealEls = document.querySelectorAll(".reveal");
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add("in-view");
          io.unobserve(e.target);
        }
      });
    },
    { threshold: 0.15 }
  );
  revealEls.forEach((el) => io.observe(el));

  /* ---------- 2. 游標光暈 ---------- */
  const glow = document.getElementById("cursorGlow");
  if (window.matchMedia("(hover: hover)").matches && glow) {
    let raf = null;
    window.addEventListener("mousemove", (e) => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        glow.style.transform = `translate(-50%, -50%) translate(${e.clientX}px, ${e.clientY}px)`;
        raf = null;
      });
    });
  }

  /* ---------- 3. 數據計數器 ---------- */
  const counterIO = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (!e.isIntersecting) return;
        const el = e.target;
        counterIO.unobserve(el);
        const target = parseInt(el.dataset.count, 10);
        const dur = 1400;
        const t0 = performance.now();
        const tick = (now) => {
          const p = Math.min((now - t0) / dur, 1);
          const eased = 1 - Math.pow(1 - p, 3);
          el.textContent = Math.round(target * eased);
          if (p < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      });
    },
    { threshold: 0.5 }
  );
  document.querySelectorAll(".stat-num").forEach((el) => counterIO.observe(el));

  /* ---------- 4. 優點卡片 SVG 圖示 ---------- */
  const VIZ = {
    autonomy: () => `
      <svg viewBox="0 0 200 110">
        <circle cx="100" cy="55" r="16" fill="#e2341d" opacity="0.9"/>
        <g stroke="#17130d" stroke-width="2" opacity="0.55">
          <line x1="100" y1="55" x2="40" y2="20"/>
          <line x1="100" y1="55" x2="165" y2="25"/>
          <line x1="100" y1="55" x2="45" y2="92"/>
          <line x1="100" y1="55" x2="160" y2="90"/>
        </g>
        <g fill="#17130d">
          <circle cx="40" cy="20" r="6" class="pulse-dot" style="animation-delay:0s"/>
          <circle cx="165" cy="25" r="6" class="pulse-dot" style="animation-delay:.4s"/>
          <circle cx="45" cy="92" r="6" class="pulse-dot" style="animation-delay:.8s"/>
          <circle cx="160" cy="90" r="6" class="pulse-dot" style="animation-delay:1.2s"/>
        </g>
      </svg>`,
    tools: () => `
      <svg viewBox="0 0 200 110">
        <rect x="12" y="30" width="44" height="50" fill="none" stroke="#17130d" stroke-width="2"/>
        <text x="34" y="62" font-family="JetBrains Mono, monospace" font-size="10" text-anchor="middle" fill="#e2341d">API</text>
        <rect x="144" y="30" width="44" height="50" fill="none" stroke="#17130d" stroke-width="2"/>
        <text x="166" y="62" font-family="JetBrains Mono, monospace" font-size="10" text-anchor="middle" fill="#17130d">DB</text>
        <rect x="78" y="38" width="44" height="34" fill="#e2341d"/>
        <text x="100" y="60" font-family="JetBrains Mono, monospace" font-size="10" text-anchor="middle" fill="#f3eee3">AGENT</text>
        <g stroke="#e2341d" stroke-width="2">
          <line x1="56" y1="55" x2="78" y2="55"><animate attributeName="stroke-opacity" values="0.3;1;0.3" dur="1.6s" repeatCount="indefinite"/></line>
          <line x1="122" y1="55" x2="144" y2="55"><animate attributeName="stroke-opacity" values="0.3;1;0.3" dur="1.6s" begin=".8s" repeatCount="indefinite"/></line>
        </g>
      </svg>`,
    plan: () => `
      <svg viewBox="0 0 200 110">
        <g fill="#17130d">
          <rect x="10" y="40" width="34" height="30" rx="2"/>
          <rect x="60" y="40" width="34" height="30" rx="2" fill-opacity="0.75"/>
          <rect x="110" y="40" width="34" height="30" rx="2" fill-opacity="0.5"/>
          <rect x="160" y="40" width="34" height="30" rx="2" fill="#e2341d"/>
        </g>
        <g stroke="#e2341d" stroke-width="2.5">
          <line x1="44" y1="55" x2="60" y2="55"><animate attributeName="stroke-opacity" values="0.2;1;0.2" dur="1.4s" repeatCount="indefinite"/></line>
          <line x1="94" y1="55" x2="110" y2="55"><animate attributeName="stroke-opacity" values="0.2;1;0.2" dur="1.4s" begin=".35s" repeatCount="indefinite"/></line>
          <line x1="144" y1="55" x2="160" y2="55"><animate attributeName="stroke-opacity" values="0.2;1;0.2" dur="1.4s" begin=".7s" repeatCount="indefinite"/></line>
        </g>
        <path d="M170 40 q8 -14 0 -26" fill="none" stroke="#e2341d" stroke-width="1.5" stroke-dasharray="3 3"/>
      </svg>`,
    clock: () => `
      <svg viewBox="0 0 200 110">
        <circle cx="100" cy="55" r="34" fill="none" stroke="#17130d" stroke-width="2.5"/>
        <g stroke="#17130d" stroke-width="2" stroke-linecap="round">
          <line x1="100" y1="21" x2="100" y2="28"/>
          <line x1="100" y1="82" x2="100" y2="89"/>
          <line x1="66" y1="55" x2="73" y2="55"/>
          <line x1="127" y1="55" x2="134" y2="55"/>
        </g>
        <g stroke="#e2341d" stroke-linecap="round">
          <line x1="100" y1="55" x2="100" y2="32" stroke-width="3"><animateTransform attributeName="transform" type="rotate" from="0 100 55" to="360 100 55" dur="6s" repeatCount="indefinite"/></line>
          <line x1="100" y1="55" x2="122" y2="55" stroke-width="2.5"><animateTransform attributeName="transform" type="rotate" from="0 100 55" to="360 100 55" dur="72s" repeatCount="indefinite"/></line>
        </g>
        <circle cx="100" cy="55" r="4" fill="#e2341d"/>
        <text x="100" y="106" font-family="JetBrains Mono, monospace" font-size="10" text-anchor="middle" fill="#17130d" opacity="0.55">24/7</text>
      </svg>`,
    lever: () => `
      <svg viewBox="0 0 200 110">
        <text x="40" y="18" font-family="JetBrains Mono, monospace" font-size="9" fill="#17130d" opacity="0.6">人工</text>
        <rect x="30" y="26" width="22" height="44" fill="#17130d"/>
        <text x="165" y="18" font-family="JetBrains Mono, monospace" font-size="9" fill="#e2341d" text-anchor="end">Agent</text>
        <rect x="150" y="62" width="22" height="8" fill="#e2341d"><animate attributeName="height" values="8;26;8" dur="2.4s" repeatCount="indefinite"/><animate attributeName="y" values="62;44;62" dur="2.4s" repeatCount="indefinite"/></rect>
        <line x1="24" y1="74" x2="178" y2="74" stroke="#17130d" stroke-width="1.5" stroke-dasharray="4 4"/>
        <text x="100" y="100" font-family="JetBrains Mono, monospace" font-size="10" text-anchor="middle" fill="#17130d" opacity="0.55">工時</text>
      </svg>`,
    learn: () => `
      <svg viewBox="0 0 200 110">
        <path d="M30 90 q20 -40 50 -20 q30 20 50 -10 q20 -30 45 5" fill="none" stroke="#17130d" stroke-width="2.5" stroke-linecap="round">
          <animate attributeName="stroke-dasharray" values="0 400;300 100;300 100" dur="3s" repeatCount="indefinite"/>
        </path>
        <path d="M30 90 q20 -40 50 -20 q30 20 50 -10 q20 -30 45 5" fill="none" stroke="#e2341d" stroke-width="1.5" stroke-dasharray="6 5" opacity="0.7"/>
        <circle cx="175" cy="55" r="7" fill="#e2341d"/>
        <circle cx="30" cy="90" r="5" fill="#17130d"/>
        <text x="100" y="22" font-family="JetBrains Mono, monospace" font-size="9" text-anchor="middle" fill="#17130d" opacity="0.55">經驗曲線</text>
      </svg>`,
    swarm: () => `
      <svg viewBox="0 0 200 110">
        <g fill="#e2341d">
          <circle cx="100" cy="55" r="9"/>
        </g>
        <g fill="#17130d" opacity="0.75">
          <circle cx="35" cy="25" r="5.5" class="pulse-dot"/>
          <circle cx="165" cy="30" r="5.5" class="pulse-dot" style="animation-delay:.5s"/>
          <circle cx="45" cy="88" r="5.5" class="pulse-dot" style="animation-delay:1s"/>
          <circle cx="160" cy="85" r="5.5" class="pulse-dot" style="animation-delay:1.5s"/>
        </g>
        <g stroke="#17130d" stroke-width="1.2" opacity="0.4">
          <line x1="100" y1="55" x2="35" y2="25"/><line x1="100" y1="55" x2="165" y2="30"/>
          <line x1="100" y1="55" x2="45" y2="88"/><line x1="100" y1="55" x2="160" y2="85"/>
          <line x1="35" y1="25" x2="45" y2="88"/><line x1="165" y1="30" x2="160" y2="85"/>
        </g>
      </svg>`,
    shield: () => `
      <svg viewBox="0 0 200 110">
        <path d="M100 14 L162 32 V64 C162 88 136 100 100 108 C64 100 38 88 38 64 V32 Z"
              fill="none" stroke="#17130d" stroke-width="2.5"/>
        <path d="M100 14 L162 32 V64 C162 88 136 100 100 108 C64 100 38 88 38 64 V32 Z"
              fill="#e2341d" opacity="0.12"/>
        <path d="M72 58 l20 20 l38 -42" fill="none" stroke="#e2341d" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>`,
  };

  document.querySelectorAll(".b-viz").forEach((box) => {
    const key = box.dataset.viz;
    if (VIZ[key]) {
      box.insertAdjacentHTML("afterbegin", VIZ[key]());
      const svg = box.querySelector("svg");
      box.querySelectorAll(".pulse-dot").forEach((d, i) => {
        const el = d;
        const anim = document.createElementNS("http://www.w3.org/2000/svg", "animate");
        anim.setAttribute("attributeName", "r");
        anim.setAttribute("values", "5.5;7.5;5.5");
        anim.setAttribute("dur", "1.8s");
        anim.setAttribute("begin", `${i * 0.45}s`);
        anim.setAttribute("repeatCount", "indefinite");
        el.appendChild(anim);
      });
    }
  });

  /* ---------- 5. 任務生命週期示範 ---------- */
  const consoleBody = document.getElementById("consoleBody");
  const pipelineStages = document.querySelectorAll(".stage");
  let demoTimer = [];

  const DEMO = [
    { cls: "cmd", text: "$ 目標：整理本季客戶報價並寄出" },
    { cls: "info", text: "▸ 拆解任務… [擷取資料] [試算] [產生 PDF] [寄信]" },
    { stage: 0 },
    { cls: "info", text: "▸ 規劃 4 個子任務，依賴序：A → B → C → D" },
    { stage: 1 },
    { cls: "info", text: "▸ 呼叫工具：GET /api/orders?quarter=Q2" },
    { stage: 2, cls: "info" },
    { cls: "ok", text: "✓ 200 OK — 取得 128 筆訂單（耗時 0.4s）" },
    { cls: "info", text: "▸ 呼叫工具：calculator.price(volume=128)" },
    { cls: "ok", text: "✓ 試算完成，誤差率 0.00%" },
    { cls: "info", text: "▸ 呼叫工具：render.pdf(template='quote')" },
    { cls: "ok", text: "✓ PDF 產生完成（12 頁）" },
    { stage: 3 },
    { cls: "info", text: "▸ 驗證：抽核金額 × 3 筆，全部一致" },
    { cls: "ok", text: "✓ 郵件已寄出至 26 位客戶" },
    { cls: "ok", text: "✓ 任務完成 — 總耗時 42s，零人工介入" },
    { cls: "dim", text: "[日志已寫入 audit.log · 可完全稽核]" },
  ];

  function renderDemoLine(item) {
    const ln = document.createElement("span");
    ln.className = `ln ${item.cls || ""}`;
    ln.textContent = item.text;
    return ln;
  }

  function runDemo() {
    clearDemo();
    let delay = 400;
    DEMO.forEach((item) => {
      if (item.stage !== undefined) {
        const t = delay;
        demoTimer.push(
          setTimeout(() => {
            pipelineStages.forEach((s, si) => {
              s.classList.toggle("active", si === item.stage);
              s.classList.toggle("done", si < item.stage);
            });
          }, t)
        );
      }
      if (item.text) {
        demoTimer.push(
          setTimeout(() => consoleBody.appendChild(renderDemoLine(item)), delay)
        );
        delay += 520 + Math.random() * 320;
      }
    });
  }

  function clearDemo() {
    demoTimer.forEach(clearTimeout);
    demoTimer = [];
    consoleBody.innerHTML = "";
    pipelineStages.forEach((s) => s.classList.remove("active", "done"));
  }

  const demoIO = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          runDemo();
          demoIO.unobserve(e.target);
        }
      });
    },
    { threshold: 0.35 }
  );
  const demoSection = document.getElementById("pipeline");
  if (demoSection) demoIO.observe(demoSection);

  const replayBtn = document.getElementById("replayBtn");
  if (replayBtn) replayBtn.addEventListener("click", runDemo);

  /* ---------- 6. 行動版選單 ---------- */
  const navToggle = document.getElementById("navToggle");
  const mainNav = document.getElementById("mainNav");
  if (navToggle && mainNav) {
    navToggle.addEventListener("click", () => {
      const open = mainNav.classList.toggle("open");
      navToggle.setAttribute("aria-expanded", String(open));
    });
    mainNav.addEventListener("click", (e) => {
      if (e.target.closest("a")) {
        mainNav.classList.remove("open");
        navToggle.setAttribute("aria-expanded", "false");
      }
    });
  }

  /* ---------- 7. 年份 ---------- */
  const yearEl = document.querySelector(".site-footer p:first-child");
  if (yearEl) yearEl.innerHTML = yearEl.innerHTML.replace("2026", new Date().getFullYear());
})();
