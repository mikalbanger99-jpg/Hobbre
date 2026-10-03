/* Hobbre landing page */

(() => {
  "use strict";

  /* ------------------------------------------------------------------
     Waitlist config
     Point WAITLIST_ENDPOINT at your form backend (Formspree, Mailchimp,
     Supabase function, etc.). It receives a JSON POST:
       { email, name, city, roles: [..], source, createdAt }
     While it's empty, signups are kept in this browser's localStorage so
     the page works end to end during development.
     ------------------------------------------------------------------ */
  const WAITLIST_ENDPOINT = "";

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

  /* ---------- Storage helpers ---------- */

  const store = {
    read() {
      try { return JSON.parse(localStorage.getItem("hobbre-waitlist") || "[]"); }
      catch { return []; }
    },
    add(entry) {
      try {
        const list = store.read().filter((e) => e.email !== entry.email);
        list.push(entry);
        localStorage.setItem("hobbre-waitlist", JSON.stringify(list));
      } catch { /* storage unavailable: nothing to do */ }
    },
  };

  async function post(entry) {
    if (!WAITLIST_ENDPOINT) return;
    const res = await fetch(WAITLIST_ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify(entry),
    });
    if (!res.ok) throw new Error(`Request failed with status ${res.status}`);
  }

  async function submitSignup(entry) {
    await post(entry);
    store.add(entry);
  }

  // Hobby suggestions go to the same endpoint with kind "suggestion" and are
  // kept in their own list locally (they have no email to dedupe on).
  async function submitSuggestion(entry) {
    await post(entry);
    try {
      const list = JSON.parse(localStorage.getItem("hobbre-suggestions") || "[]");
      list.push(entry);
      localStorage.setItem("hobbre-suggestions", JSON.stringify(list));
    } catch { /* storage unavailable: nothing to do */ }
  }

  /* ---------- Quick signup (hero + finale) ---------- */

  document.querySelectorAll('form[data-signup="quick"]').forEach((form) => {
    const input = form.querySelector('input[type="email"]');
    const button = form.querySelector('button[type="submit"]');
    const msg = form.querySelector(".quick-signup__msg");

    input.addEventListener("input", () => {
      input.removeAttribute("aria-invalid");
      if (!form.classList.contains("is-done")) msg.textContent = "";
    });

    form.addEventListener("submit", async (event) => {
      event.preventDefault();
      const email = input.value.trim();

      if (!emailPattern.test(email)) {
        input.setAttribute("aria-invalid", "true");
        msg.textContent = "Dat e-mailadres klopt niet helemaal. Check het even en probeer het opnieuw.";
        input.focus();
        return;
      }

      button.disabled = true;
      button.textContent = "Even geduld…";
      try {
        await submitSignup({ email, roles: [], source: form.closest("section")?.id || "quick", createdAt: new Date().toISOString() });
        form.classList.add("is-done");
        msg.innerHTML = "";
        const strong = document.createElement("strong");
        strong.textContent = "Je staat op de lijst! ";
        const link = document.createElement("a");
        link.href = "#aanmelden";
        link.textContent = "Vertel ons waar je van houdt →";
        link.addEventListener("click", () => prefillFull(email));
        msg.append(strong, link);
      } catch {
        msg.textContent = "Er ging iets mis aan onze kant. Probeer het zo nog eens.";
        button.disabled = false;
        button.textContent = "Meld je aan";
      }
    });
  });

  /* ---------- Full signup card ---------- */

  const full = document.querySelector('form[data-signup="full"]');

  function prefillFull(email) {
    if (!full) return;
    const field = full.querySelector("#signup-email");
    if (field && !field.value) field.value = email;
  }

  if (full) {
    const email = full.querySelector("#signup-email");
    const error = full.querySelector("#signup-email-error");
    const body = full.querySelector(".signup-card__body");
    const success = full.querySelector(".signup-card__success");
    const submit = full.querySelector('button[type="submit"]');

    email.addEventListener("input", () => {
      email.removeAttribute("aria-invalid");
      email.removeAttribute("aria-describedby");
      error.textContent = "";
    });

    full.addEventListener("submit", async (event) => {
      event.preventDefault();
      const value = email.value.trim();

      if (!emailPattern.test(value)) {
        email.setAttribute("aria-invalid", "true");
        email.setAttribute("aria-describedby", "signup-email-error");
        error.textContent = value ? "Dat e-mailadres klopt niet helemaal. Check even op typfouten." : "Vul je e-mailadres in, dan laten we je weten wanneer we opengaan.";
        email.focus();
        return;
      }

      const data = new FormData(full);
      const entry = {
        email: value,
        name: (data.get("name") || "").toString().trim(),
        city: (data.get("city") || "").toString().trim(),
        hobby: (data.get("hobby") || "").toString().trim(),
        roles: data.getAll("roles"),
        source: "join",
        createdAt: new Date().toISOString(),
      };

      submit.disabled = true;
      submit.textContent = "Je plek wordt gereserveerd…";
      try {
        await submitSignup(entry);
        success.querySelector("[data-success-email]").textContent = value;
        body.hidden = true;
        success.hidden = false;
        success.querySelector("h3")?.focus?.();
      } catch {
        error.textContent = "Er ging iets mis aan onze kant. Probeer het zo nog eens.";
        submit.disabled = false;
        submit.textContent = "Meld je aan";
      }
    });

    // Share button in the success state
    const share = full.querySelector("[data-share]");
    const shareMsg = full.querySelector(".share-msg");
    share?.addEventListener("click", async () => {
      const url = location.href.split("#")[0];
      const text = "Ik sta op de wachtlijst van Hobbre. Spullen lenen, kennis delen en hobbymaatjes vinden in je eigen buurt.";
      try {
        if (navigator.share) {
          await navigator.share({ title: "Hobbre", text, url });
          return;
        }
        await navigator.clipboard.writeText(`${text} ${url}`);
        shareMsg.textContent = "Link gekopieerd. Stuur hem naar iemand die wel een hobby kan gebruiken.";
      } catch {
        shareMsg.textContent = url;
      }
    });
  }

  /* ---------- Suggest a hobby (last card of the category rail) ---------- */

  document.querySelectorAll("form[data-suggest]").forEach((form) => {
    const input = form.querySelector('input[name="hobby"]');
    const submit = form.querySelector('button[type="submit"]');
    const msg = form.querySelector(".suggest__msg");
    const again = form.querySelector("[data-suggest-again]");

    input.addEventListener("input", () => {
      input.removeAttribute("aria-invalid");
      if (!form.classList.contains("is-done")) msg.textContent = "";
    });

    form.addEventListener("submit", async (event) => {
      event.preventDefault();
      const hobby = input.value.trim().replace(/\s+/g, " ");
      if (hobby.length < 2) {
        input.setAttribute("aria-invalid", "true");
        msg.textContent = "Typ eerst een hobby, bijvoorbeeld imkeren.";
        input.focus();
        return;
      }
      submit.disabled = true;
      try {
        await submitSuggestion({ kind: "suggestion", hobby, source: "hobbys", createdAt: new Date().toISOString() });
        form.classList.add("is-done");
        msg.textContent = `Bedankt! "${hobby}" staat op onze lijst met voorstellen.`;
        again.hidden = false;
        again.focus();
      } catch {
        msg.textContent = "Er ging iets mis aan onze kant. Probeer het zo nog eens.";
      } finally {
        submit.disabled = false;
      }
    });

    again.addEventListener("click", () => {
      form.classList.remove("is-done");
      form.reset();
      msg.textContent = "";
      again.hidden = true;
      input.focus();
    });
  });

  /* ---------- Business signup (bedrijven.html) ---------- */

  const biz = document.querySelector('form[data-signup="business"]');
  if (biz) {
    const nameField = biz.querySelector("#biz-name");
    const nameError = biz.querySelector("#biz-name-error");
    const emailField = biz.querySelector("#biz-email");
    const emailError = biz.querySelector("#biz-email-error");
    const body = biz.querySelector(".signup-card__body");
    const success = biz.querySelector(".signup-card__success");
    const submit = biz.querySelector('button[type="submit"]');

    [[nameField, nameError], [emailField, emailError]].forEach(([field, error]) => {
      field.addEventListener("input", () => {
        field.removeAttribute("aria-invalid");
        field.removeAttribute("aria-describedby");
        error.textContent = "";
      });
    });

    biz.addEventListener("submit", async (event) => {
      event.preventDefault();
      const business = nameField.value.trim();
      const email = emailField.value.trim();
      let firstInvalid = null;

      if (!business) {
        nameField.setAttribute("aria-invalid", "true");
        nameField.setAttribute("aria-describedby", "biz-name-error");
        nameError.textContent = "Vul de naam van je zaak in.";
        firstInvalid = nameField;
      }
      if (!emailPattern.test(email)) {
        emailField.setAttribute("aria-invalid", "true");
        emailField.setAttribute("aria-describedby", "biz-email-error");
        emailError.textContent = email ? "Dat e-mailadres klopt niet helemaal. Check even op typfouten." : "Vul een e-mailadres in, dan kunnen we contact met je opnemen.";
        firstInvalid = firstInvalid || emailField;
      }
      if (firstInvalid) { firstInvalid.focus(); return; }

      const data = new FormData(biz);
      const text = (key) => (data.get(key) || "").toString().trim();
      const entry = {
        kind: "business",
        email,
        business,
        type: text("type"),
        city: text("city"),
        name: text("name"),
        phone: text("phone"),
        offers: data.getAll("offers"),
        plan: text("plan"),
        roles: ["business"],
        source: "bedrijven",
        createdAt: new Date().toISOString(),
      };

      submit.disabled = true;
      submit.textContent = "Even geduld…";
      try {
        await submitSignup(entry);
        success.querySelector("[data-success-email]").textContent = email;
        success.querySelector("[data-success-business]").textContent = business;
        body.hidden = true;
        success.hidden = false;
        success.querySelector("h3")?.focus();
      } catch {
        emailError.textContent = "Er ging iets mis aan onze kant. Probeer het zo nog eens.";
        submit.disabled = false;
        submit.textContent = "Meld mijn zaak aan";
      }
    });

    // "Kies Honk / Honk Plus" buttons preselect the plan in the form.
    document.querySelectorAll("[data-plan]").forEach((link) => {
      link.addEventListener("click", () => {
        const select = biz.querySelector("#biz-plan");
        if (select) select.value = link.dataset.plan;
      });
    });
  }

  /* ---------- Business shortcut ---------- */

  document.querySelectorAll("[data-business]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const box = document.getElementById("role-business");
      if (box) box.checked = true;
      const card = document.getElementById("signup");
      card?.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "center" });
      setTimeout(() => document.getElementById("signup-email")?.focus({ preventScroll: true }), reduceMotion ? 0 : 600);
    });
  });

  /* ---------- Mobile nav ---------- */

  const toggle = document.querySelector(".nav__toggle");
  const drawer = document.getElementById("mobile-menu");
  if (toggle && drawer) {
    const setOpen = (open) => {
      toggle.setAttribute("aria-expanded", String(open));
      toggle.setAttribute("aria-label", open ? "Menu sluiten" : "Menu openen");
      drawer.hidden = !open;
    };
    toggle.addEventListener("click", () => setOpen(drawer.hidden));
    drawer.addEventListener("click", (e) => { if (e.target.closest("a")) setOpen(false); });
    document.addEventListener("keydown", (e) => { if (e.key === "Escape") setOpen(false); });
    window.matchMedia("(min-width: 1181px)").addEventListener("change", (e) => { if (e.matches) setOpen(false); });
  }

  /* ---------- Parallax: scroll depth + pointer drift ---------- */

  if (!reduceMotion) {
    const layers = [...document.querySelectorAll("[data-depth]")];
    const stage = document.querySelector("[data-pointer-stage]");
    const pointerLayers = stage ? [...stage.querySelectorAll("[data-pointer]")] : [];
    let pointer = { x: 0, y: 0 };
    let ticking = false;

    const update = () => {
      ticking = false;
      const vh = window.innerHeight;
      for (const el of layers) {
        const rect = el.getBoundingClientRect();
        if (rect.bottom < -200 || rect.top > vh + 200) continue;
        const offset = (rect.top + rect.height / 2 - vh / 2) * parseFloat(el.dataset.depth);
        el.style.setProperty("--py", `${offset.toFixed(1)}px`);
      }
      for (const el of pointerLayers) {
        const amt = parseFloat(el.dataset.pointer);
        el.style.setProperty("--px", `${(pointer.x * amt).toFixed(1)}px`);
      }
    };
    const request = () => {
      if (!ticking) { ticking = true; requestAnimationFrame(update); }
    };

    window.addEventListener("scroll", request, { passive: true });
    window.addEventListener("resize", request);
    if (stage && window.matchMedia("(pointer: fine)").matches) {
      stage.addEventListener("pointermove", (e) => {
        const r = stage.getBoundingClientRect();
        pointer = { x: (e.clientX - r.left) / r.width - 0.5, y: (e.clientY - r.top) / r.height - 0.5 };
        request();
      });
      stage.addEventListener("pointerleave", () => { pointer = { x: 0, y: 0 }; request(); });
    }
    update();
  }

  /* ---------- Street scenes ----------
     inflate: the street pins, the sky turns blue and the houses inflate
              one by one, each with a label.
     home:    on large screens the whole hero pins; the feed cards fly to
              their own house while the street rises. Smaller screens get
              the houses inflating as the street scrolls into view.
     On narrow screens the street is wider than the viewport and pans. */

  const scenes = [...document.querySelectorAll("[data-scene]")].map((el) => ({
    el,
    type: el.dataset.scene,
    sticky: el.querySelector(".scene__sticky"),
    ground: el.querySelector(".scene__ground"),
    street: el.querySelector(".street"),
    houses: [...el.querySelectorAll(".house")],
    imgs: [...el.querySelectorAll(".house img")],
    tags: [...el.querySelectorAll(".house__tag")],
    cards: [...el.querySelectorAll(".lcard")],
    copy: el.querySelector(".hv7__copy"),
    caption: el.querySelector(".scene__caption"),
    deco: [...el.querySelectorAll(".hv4__ribbon, .hv4__head")],
    pinned: false,
    flights: [],
  }));

  if (scenes.length && !reduceMotion) {
    const clamp01 = (v) => Math.min(1, Math.max(0, v));
    const seg = (p, a, b) => clamp01((p - a) / (b - a));
    const easeOutBack = (t) => 1 + 2.4 * (t - 1) ** 3 + 1.4 * (t - 1) ** 2;
    const easeInOut = (t) => (t < 0.5 ? 2 * t * t : 1 - (-2 * t + 2) ** 2 / 2);

    // Inflate from a flat puddle on the pavement to full size, with a wobble.
    const inflate = (img, t) => {
      if (t <= 0) {
        img.style.opacity = "0";
        img.style.transform = "scale(0.55, 0.04)";
      } else if (t >= 1) {
        img.style.opacity = "1";
        img.style.transform = "none";
      } else {
        const sx = 0.55 + 0.45 * easeOutBack(Math.min(1, t * 1.2));
        const sy = 0.04 + 0.96 * easeOutBack(t);
        img.style.opacity = String(Math.min(1, t * 5));
        img.style.transform = `scale(${sx.toFixed(3)}, ${sy.toFixed(3)})`;
      }
    };

    const pan = (s, e) => {
      const extra = s.street.offsetWidth - s.sticky.clientWidth;
      const x = extra > 0 ? 16 * (1 - e) - (extra + 16) * e : 0;
      s.street.style.setProperty("--pan", `${x.toFixed(1)}px`);
    };

    // Position relative to `root`, ignoring transforms.
    const offsetIn = (el, root) => {
      let x = 0;
      let y = 0;
      for (let node = el; node && node !== root; node = node.offsetParent) {
        x += node.offsetLeft;
        y += node.offsetTop;
      }
      return { x, y };
    };

    const measureFlights = (s) => {
      s.cards.forEach((c) => (c.style.transform = ""));
      s.flights = s.cards.map((card, i) => {
        const house = s.houses[i];
        if (!house) return null;
        const start = offsetIn(card, s.sticky);
        const home = offsetIn(house, s.sticky);
        const cs = getComputedStyle(card);
        const w = card.offsetWidth;
        const h = card.offsetHeight;
        const scale = Math.min(0.7, (house.offsetWidth * 0.86) / w);
        return {
          card,
          dx: home.x + house.offsetWidth / 2 - (w * scale) / 2 - start.x,
          dy: home.y - h * scale - 12 - start.y,
          scale,
          r0: parseFloat(cs.getPropertyValue("--r")) || 0,
          ty0: parseFloat(cs.getPropertyValue("--ty")) || 0,
          r1: i % 2 ? 4 : -4,
          top: home.y - h * scale - 12,
        };
      });

      // Put the closing caption just above where the cards land, so the
      // sky between the caption and the street stays tight on tall screens.
      if (s.caption) {
        const landed = s.flights.filter(Boolean).map((f) => f.top);
        const nav = document.querySelector(".nav");
        const floor = (nav ? nav.offsetHeight : 0) + 16;
        const gap = Math.max(24, innerHeight * 0.035);
        const top = Math.min(...landed) - s.caption.offsetHeight - gap;
        s.caption.style.top = `${Math.max(floor, Math.round(top))}px`;
      }
    };

    const layout = () => {
      for (const s of scenes) {
        if (s.type !== "home") continue;
        s.pinned = innerWidth >= 1000 && innerHeight >= 700;
        s.el.classList.toggle("is-pinned", s.pinned);
        if (s.pinned) {
          // How far below the top of the page the hero starts on load
          // (ticker + nav). Only matters when the hero is the first thing.
          const docTop = s.el.getBoundingClientRect().top + scrollY;
          s.el.style.setProperty("--lead", `${docTop < innerHeight / 2 ? Math.round(docTop) : 0}px`);
          // Drop the scroll hint on short screens where it would touch the copy.
          const grid = s.el.querySelector(".hv4__grid");
          const cue = s.el.querySelector(".scene__cue");
          if (grid && cue) {
            s.el.classList.remove("no-cue");
            const gridBottom = offsetIn(grid, s.sticky).y + grid.offsetHeight;
            s.el.classList.toggle("no-cue", gridBottom + 12 > cue.offsetTop);
          }
          measureFlights(s);
        } else {
          s.cards.forEach((c) => (c.style.transform = ""));
          s.deco.forEach((d) => (d.style.opacity = ""));
          s.copy?.classList.remove("is-gone");
          ["--copy-o", "--copy-y", "--rise", "--sky-mix", "--cap", "--cue", "--lead"].forEach((v) => s.el.style.removeProperty(v));
          if (s.caption) s.caption.style.top = "";
        }
      }
    };

    const update = () => {
      const vh = innerHeight;
      for (const s of scenes) {
        const rect = s.el.getBoundingClientRect();
        if (rect.bottom < -80 || rect.top > vh + 80) continue;
        const st = s.el.style;

        if (s.type === "inflate") {
          const p = clamp01((vh - rect.top) / rect.height);
          st.setProperty("--sky-mix", seg(p, 0.2, 0.48).toFixed(3));
          st.setProperty("--cap", easeInOut(seg(p, 0.4, 0.55)).toFixed(3));
          st.setProperty("--drift", p.toFixed(3));
          s.imgs.forEach((img, i) => inflate(img, seg(p, 0.5 + i * 0.06, 0.64 + i * 0.06)));
          s.tags.forEach((tag, i) => tag.style.setProperty("--tag", easeOutBack(seg(p, 0.6 + i * 0.06, 0.67 + i * 0.06)).toFixed(3)));
          pan(s, easeInOut(seg(p, 0.5, 0.95)));
        } else if (s.pinned) {
          const p = clamp01(-rect.top / (rect.height - vh));
          const c = easeInOut(seg(p, 0.02, 0.2));
          st.setProperty("--sky-mix", seg(p, 0.05, 0.35).toFixed(3));
          st.setProperty("--drift", p.toFixed(3));
          st.setProperty("--cap", easeInOut(seg(p, 0.8, 0.94)).toFixed(3));
          st.setProperty("--cue", (1 - seg(p, 0, 0.05)).toFixed(3));
          st.setProperty("--copy-o", (1 - c).toFixed(3));
          st.setProperty("--copy-y", `${(-70 * c).toFixed(1)}px`);
          st.setProperty("--rise", `${((1 - easeInOut(seg(p, 0.04, 0.36))) * 110).toFixed(2)}%`);
          s.copy?.classList.toggle("is-gone", c >= 0.99);
          s.deco.forEach((d) => (d.style.opacity = String(1 - seg(p, 0.02, 0.16))));
          s.imgs.forEach((img, i) => inflate(img, seg(p, 0.28 + i * 0.07, 0.42 + i * 0.07)));
          s.flights.forEach((f, i) => {
            if (!f) return;
            const e = easeInOut(seg(p, 0.22 + i * 0.07, 0.48 + i * 0.07));
            if (e <= 0) { f.card.style.transform = ""; return; }
            const hop = Math.sin(e * Math.PI) * -60;
            const sc = 1 + (f.scale - 1) * e;
            const rot = f.r0 * (1 - e) + f.r1 * e;
            f.card.style.transform = `translate(${(f.dx * e).toFixed(1)}px, ${(f.dy * e + f.ty0 * (1 - e) + hop).toFixed(1)}px) scale(${sc.toFixed(3)}) rotate(${rot.toFixed(2)}deg)`;
          });
        } else {
          const g = s.ground.getBoundingClientRect();
          const q = clamp01((vh - g.top) / (g.height + vh * 0.5));
          s.imgs.forEach((img, i) => inflate(img, seg(q, 0.08 + i * 0.07, 0.3 + i * 0.07)));
          pan(s, easeInOut(seg(q, 0.15, 0.95)));
        }
      }
    };

    let queued = false;
    const request = () => {
      if (!queued) { queued = true; requestAnimationFrame(() => { queued = false; update(); }); }
    };
    const relayout = () => { layout(); update(); };

    relayout();
    window.addEventListener("scroll", request, { passive: true });
    window.addEventListener("resize", relayout);
    window.addEventListener("load", relayout);
    document.fonts?.ready.then(relayout);
  }

  /* ---------- Category menu: tabs that follow the pointer (no [data-catmenu] on the current pages) ---------- */

  document.querySelectorAll("[data-catmenu]").forEach((menu) => {
    const tabs = [...menu.querySelectorAll('[role="tab"]')];
    const select = (tab, focus) => {
      tabs.forEach((t) => {
        const on = t === tab;
        t.setAttribute("aria-selected", String(on));
        t.tabIndex = on ? 0 : -1;
        const panel = document.getElementById(t.getAttribute("aria-controls"));
        if (panel) panel.hidden = !on;
      });
      if (focus) tab.focus();
    };
    tabs.forEach((tab, i) => {
      tab.addEventListener("click", () => select(tab));
      tab.addEventListener("pointerenter", (e) => { if (e.pointerType === "mouse") select(tab); });
      tab.addEventListener("keydown", (e) => {
        const step = { ArrowDown: 1, ArrowRight: 1, ArrowUp: -1, ArrowLeft: -1 }[e.key];
        if (step) { e.preventDefault(); select(tabs[(i + step + tabs.length) % tabs.length], true); }
        if (e.key === "Home") { e.preventDefault(); select(tabs[0], true); }
        if (e.key === "End") { e.preventDefault(); select(tabs[tabs.length - 1], true); }
      });
    });
  });

  /* ---------- Category rail: vertical scroll slides it sideways ---------- */

  const rails = [...document.querySelectorAll("[data-rail]")].map((el) => ({
    el,
    viewport: el.querySelector(".rail__viewport"),
    track: el.querySelector(".rail__track"),
    dist: 0,
  }));
  if (rails.length) {
    const updateRails = () => {
      for (const r of rails) {
        if (r.el.classList.contains("is-pinned")) {
          const rect = r.el.getBoundingClientRect();
          const p = Math.min(1, Math.max(0, -rect.top / Math.max(1, rect.height - innerHeight)));
          r.el.style.setProperty("--rail-x", `${(-r.dist * p).toFixed(1)}px`);
          r.el.style.setProperty("--rail-p", p.toFixed(3));
        } else {
          const max = r.viewport.scrollWidth - r.viewport.clientWidth;
          r.el.style.setProperty("--rail-p", max > 0 ? (r.viewport.scrollLeft / max).toFixed(3) : "0");
        }
      }
    };
    const layoutRails = () => {
      for (const r of rails) {
        const pin = !reduceMotion && innerWidth >= 1000 && innerHeight >= 700;
        r.el.classList.toggle("is-pinned", pin);
        if (pin) {
          const pad = parseFloat(getComputedStyle(r.viewport).paddingLeft) || 0;
          r.dist = Math.max(0, r.track.offsetWidth - (r.viewport.clientWidth - 2 * pad));
          r.el.style.setProperty("--rail-h", `${Math.round(r.dist + innerHeight)}px`);
        } else {
          r.el.style.removeProperty("--rail-h");
          r.el.style.removeProperty("--rail-x");
        }
      }
      updateRails();
    };
    let railQueued = false;
    const requestRails = () => {
      if (!railQueued) { railQueued = true; requestAnimationFrame(() => { railQueued = false; updateRails(); }); }
    };
    layoutRails();
    window.addEventListener("scroll", requestRails, { passive: true });
    window.addEventListener("resize", layoutRails);
    window.addEventListener("load", layoutRails);
    document.fonts?.ready.then(layoutRails);
    rails.forEach((r) => r.viewport.addEventListener("scroll", requestRails, { passive: true }));

    // Keyboard users: when focus lands on a card that's slid out of view in
    // the pinned rail, scroll the page to the point where that card shows.
    rails.forEach((r) => r.track.addEventListener("focusin", (event) => {
      if (!r.el.classList.contains("is-pinned") || r.dist <= 0) return;
      const card = event.target.closest(".railcard");
      if (!card) return;
      const pad = parseFloat(getComputedStyle(r.viewport).paddingLeft) || 0;
      const visible = r.viewport.clientWidth - 2 * pad;
      const needed = card.offsetLeft - r.track.offsetLeft + card.offsetWidth - visible;
      const p = Math.min(1, Math.max(0, needed / r.dist));
      const top = r.el.getBoundingClientRect().top + scrollY;
      window.scrollTo({ top: top + p * (r.el.offsetHeight - innerHeight), behavior: reduceMotion ? "auto" : "smooth" });
    }));
  }

  /* ---------- Footer houses inflate when the footer comes into view ---------- */

  const inflaters = document.querySelectorAll("[data-inflate-on-view]");
  if (inflaters.length && !reduceMotion && "IntersectionObserver" in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.remove("is-waiting");
        entry.target.classList.add("is-in");
        io.unobserve(entry.target);
      });
    }, { threshold: 0.25 });
    inflaters.forEach((el) => {
      if (el.getBoundingClientRect().top < innerHeight) return;
      el.classList.add("is-waiting");
      io.observe(el);
    });
  }

  /* ---------- Pause offscreen video ---------- */

  const video = document.querySelector(".clip-card__video");
  if (video) {
    if (reduceMotion) {
      video.removeAttribute("autoplay");
      video.pause();
    } else if ("IntersectionObserver" in window) {
      let inView = false;
      const sync = () => (inView && !document.hidden ? video.play().catch(() => {}) : video.pause());
      new IntersectionObserver(([entry]) => { inView = entry.isIntersecting; sync(); }, { threshold: 0.15 }).observe(video);
      document.addEventListener("visibilitychange", sync);
    }
  }

  /* ---------- Footer year ---------- */

  const year = document.querySelector("[data-year]");
  if (year) year.textContent = new Date().getFullYear();
})();
