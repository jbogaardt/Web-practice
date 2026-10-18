// Quote form: sends the request to a hosted form endpoint that forwards it to the
// owner's inbox, so no email address appears anywhere on the site.
// Paste the endpoint URL here once it exists (e.g. "https://formspree.io/f/xxxxxxxx").
const FORM_ENDPOINT = "https://formspree.io/f/mppqnygv";

const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/* ---------- Smooth parallax ----------
   Scroll position is eased toward the real value every frame, so layers glide
   instead of snapping to each wheel tick. */
const header = document.getElementById("site-header");
const heroLayers = [...document.querySelectorAll(".hero [data-speed]")];
const heroContent = document.getElementById("hero-content");
const drifters = [...document.querySelectorAll("[data-drift]")];

let current = window.scrollY;
let running = false;
const EASE = 0.085;

function frame() {
  const target = window.scrollY;
  const vh = window.innerHeight;
  current += (target - current) * EASE;
  if (Math.abs(target - current) < 0.05) current = target;

  header.classList.toggle("scrolled", target > 40);

  if (current < vh * 1.3) {
    for (const layer of heroLayers) {
      layer.style.transform = `translate3d(0, ${(current * Number(layer.dataset.speed)).toFixed(2)}px, 0)`;
    }
    heroContent.style.transform = `translate3d(0, ${(current * 0.32).toFixed(2)}px, 0)`;
    heroContent.style.opacity = String(Math.max(0, 1 - current / (vh * 0.62)));
  }

  // Elements inside overflow-hidden frames drift against the scroll direction.
  const lag = target - current;
  for (const el of drifters) {
    const frameBox = el.parentElement.getBoundingClientRect();
    if (frameBox.bottom < -300 || frameBox.top > vh + 300) continue;
    const offset = frameBox.top + lag + frameBox.height / 2 - vh / 2;
    const limit = frameBox.height * 0.085;
    const shift = Math.max(-limit, Math.min(limit, -offset * Number(el.dataset.drift)));
    el.style.transform = `translate3d(0, ${shift.toFixed(2)}px, 0)`;
  }

  if (target !== current) {
    requestAnimationFrame(frame);
  } else {
    running = false;
  }
}

function kick() {
  if (!running) {
    running = true;
    requestAnimationFrame(frame);
  }
}

if (reduceMotion) {
  const onScroll = () => header.classList.toggle("scrolled", window.scrollY > 40);
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();
} else {
  window.addEventListener("scroll", kick, { passive: true });
  window.addEventListener("resize", kick);
  kick();
}

/* ---------- Scroll reveal ---------- */
const revealEls = document.querySelectorAll(".reveal");
if ("IntersectionObserver" in window && !reduceMotion) {
  const io = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          entry.target.classList.add("in");
          io.unobserve(entry.target);
        }
      }
    },
    { threshold: 0.12, rootMargin: "0px 0px -6% 0px" }
  );
  revealEls.forEach((el) => io.observe(el));
} else {
  revealEls.forEach((el) => el.classList.add("in"));
}

/* ---------- Before and after slider ----------
   Pointer events set the position from the finger or mouse, which works on iPhone. The range
   input is driven by the keyboard and screen readers and stays in sync with the same value. */
const compare = document.getElementById("compare");

if (compare) {
  const range = compare.querySelector(".compare-range");
  let dragging = false;

  const setPosition = (value) => {
    const clamped = Math.max(0, Math.min(100, Math.round(value)));
    range.value = clamped;
    compare.style.setProperty("--pos", `${clamped}%`);
    range.setAttribute("aria-valuetext", `${clamped}% of the way from before to after`);
  };

  const positionFromPointer = (event) => {
    const box = compare.getBoundingClientRect();
    setPosition(((event.clientX - box.left) / box.width) * 100);
  };

  range.addEventListener("input", () => { compare.classList.add("touched"); setPosition(Number(range.value)); });

  compare.addEventListener("pointerdown", (event) => {
    compare.classList.add("touched");
    dragging = true;
    compare.setPointerCapture(event.pointerId);
    positionFromPointer(event);
  });
  compare.addEventListener("pointermove", (event) => {
    if (dragging) positionFromPointer(event);
  });
  const endDrag = () => { dragging = false; };
  compare.addEventListener("pointerup", endDrag);
  compare.addEventListener("pointercancel", endDrag);

  setPosition(Number(range.value));
}

/* ---------- Quote form ---------- */
const form = document.getElementById("quote-form");
const status = document.getElementById("quote-status");
const button = form ? form.querySelector("button[type=submit]") : null;

function show(message, isError) {
  status.textContent = message;
  status.className = isError ? "status error" : "status ok";
}

const thanks = document.getElementById("quote-thanks");
const devNote = document.querySelector(".dev-note");

/* Branded confirmation: swaps the form for a thank-you panel instead of a browser pop-up. */
function showThanks(firstName) {
  document.getElementById("thanks-name").textContent = firstName ? `, ${firstName}` : "";
  form.hidden = true;
  if (devNote) devNote.hidden = true;
  status.textContent = "";
  thanks.hidden = false;
  thanks.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "center" });
  thanks.focus({ preventScroll: true });
}

if (form) {
  document.getElementById("thanks-reset").addEventListener("click", () => {
    thanks.hidden = true;
    form.hidden = false;
    if (devNote) devNote.hidden = false;
    form.querySelector("input[name=name]").focus();
  });

  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    if (!FORM_ENDPOINT) {
      show("The quote form is not yet active (development mode). Please check back soon.", true);
      return;
    }

    button.disabled = true;
    show("Sending...", false);

    try {
      const response = await fetch(FORM_ENDPOINT, {
        method: "POST",
        headers: { Accept: "application/json" },
        body: new FormData(form),
      });
      if (!response.ok) {
        // Pass along Formspree's own explanation (e.g. form not confirmed, domain not allowed).
        let detail = "";
        try {
          const data = await response.json();
          detail = data.error || (data.errors || []).map((e) => e.message).join(", ");
        } catch (parseError) { /* response had no JSON body */ }
        const failure = new Error(`Formspree responded ${response.status}`);
        failure.detail = detail || `error ${response.status}`;
        throw failure;
      }
      const firstName = (new FormData(form).get("name") || "").toString().trim().split(/\s+/)[0];
      form.reset();
      showThanks(firstName);
    } catch (error) {
      console.error("Quote form error:", error);
      const detail = error.detail || (error instanceof TypeError ? "the request was blocked or the connection failed" : "");
      show("We were unable to send your request" + (detail ? ` (${detail})` : "") + ". Please try again in a moment.", true);
    } finally {
      button.disabled = false;
    }
  });
}

/* "Add photos (optional)" link: jump to the quote form and put the cursor in the details box. */
document.querySelectorAll("[data-focus]").forEach((link) => {
  link.addEventListener("click", () => {
    const target = document.getElementById(link.dataset.focus);
    if (target) setTimeout(() => target.focus({ preventScroll: true }), 700);
  });
});

/* ---------- Lazy-loaded photos ----------
   Photos below the hero carry their path in data-img and are only requested as they approach the
   viewport, so the hero loads first. (CSS background images cannot use loading="lazy".) */
const lazyImages = document.querySelectorAll("[data-img]");
const loadImage = (el) => el.style.setProperty("--img", `url('${el.dataset.img}')`);
if ("IntersectionObserver" in window) {
  const imageObserver = new IntersectionObserver((entries) => {
    for (const entry of entries) {
      if (entry.isIntersecting) {
        loadImage(entry.target);
        imageObserver.unobserve(entry.target);
      }
    }
  }, { rootMargin: "500px 0px" });
  lazyImages.forEach((el) => imageObserver.observe(el));
} else {
  lazyImages.forEach(loadImage);
}
