// Quote form: sends the request to a hosted form endpoint that forwards it to the
// owner's inbox, so no email address appears anywhere on the site.
// Paste the endpoint URL here once it exists (e.g. "https://formspree.io/f/xxxxxxxx").
const FORM_ENDPOINT = "";

const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/* ---------- Parallax ---------- */
const header = document.getElementById("site-header");
const heroLayers = [...document.querySelectorAll(".hero [data-speed]")];
const heroContent = document.getElementById("hero-content");
const drifters = [...document.querySelectorAll("[data-drift]")];
let ticking = false;

function update() {
  ticking = false;
  const y = window.scrollY;
  const vh = window.innerHeight;
  header.classList.toggle("scrolled", y > 40);
  if (reduceMotion) return;

  if (y < vh * 1.3) {
    for (const layer of heroLayers) {
      layer.style.transform = `translate3d(0, ${(y * Number(layer.dataset.speed)).toFixed(1)}px, 0)`;
    }
    heroContent.style.transform = `translate3d(0, ${(y * 0.35).toFixed(1)}px, 0)`;
    heroContent.style.opacity = String(Math.max(0, 1 - y / (vh * 0.65)));
  }

  for (const el of drifters) {
    const box = el.parentElement.getBoundingClientRect();
    if (box.bottom < -200 || box.top > vh + 200) continue;
    const offset = box.top + box.height / 2 - vh / 2;
    el.style.transform = `translate3d(0, ${(-offset * Number(el.dataset.drift)).toFixed(1)}px, 0)`;
  }
}

function requestUpdate() {
  if (!ticking) {
    ticking = true;
    requestAnimationFrame(update);
  }
}

window.addEventListener("scroll", requestUpdate, { passive: true });
window.addEventListener("resize", requestUpdate);
update();

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
    { threshold: 0.15, rootMargin: "0px 0px -6% 0px" }
  );
  revealEls.forEach((el) => io.observe(el));
} else {
  revealEls.forEach((el) => el.classList.add("in"));
}

/* ---------- Fireflies ---------- */
function fireflies(id, count) {
  const box = document.getElementById(id);
  if (!box || reduceMotion) return;
  for (let i = 0; i < count; i++) {
    const fly = document.createElement("span");
    fly.className = "fly";
    fly.style.left = `${Math.random() * 100}%`;
    fly.style.top = `${20 + Math.random() * 70}%`;
    fly.style.setProperty("--s", `${3 + Math.random() * 4}px`);
    fly.style.setProperty("--t", `${8 + Math.random() * 8}s`);
    fly.style.setProperty("--d", `${-Math.random() * 12}s`);
    fly.style.setProperty("--x", `${(Math.random() - 0.5) * 120}px`);
    fly.style.setProperty("--y", `${-20 - Math.random() * 70}px`);
    box.appendChild(fly);
  }
}
fireflies("hero-flies", 34);
fireflies("grotto-flies", 22);

/* ---------- Hanging vines ---------- */
(function buildVines() {
  const svg = document.getElementById("vines");
  if (!svg) return;
  const NS = "http://www.w3.org/2000/svg";
  const xs = [40, 150, 280, 430, 610, 790, 960, 1110, 1240, 1350, 1410];
  xs.forEach((x, i) => {
    const length = 120 + ((i * 53) % 170);
    const g = document.createElementNS(NS, "g");
    g.setAttribute("class", "sway");
    g.style.setProperty("--t", `${6 + (i % 4)}s`);
    g.style.setProperty("--d", `${-i * 0.9}s`);
    g.style.transformOrigin = `${x}px 0px`;

    const vine = document.createElementNS(NS, "path");
    vine.setAttribute("d", `M${x} -10 C${x + 18} ${length * 0.35} ${x - 18} ${length * 0.7} ${x + 6} ${length}`);
    vine.setAttribute("stroke", "#2d5a3a");
    vine.setAttribute("stroke-width", i % 3 === 0 ? "6" : "4");
    vine.setAttribute("fill", "none");
    vine.setAttribute("stroke-linecap", "round");
    g.appendChild(vine);

    const leaves = 3 + (i % 3);
    for (let n = 1; n <= leaves; n++) {
      const t = n / (leaves + 0.5);
      const leaf = document.createElementNS(NS, "ellipse");
      const side = n % 2 ? 1 : -1;
      leaf.setAttribute("cx", String(x + side * 9 + Math.sin(t * 4) * 8));
      leaf.setAttribute("cy", String(length * t));
      leaf.setAttribute("rx", "11");
      leaf.setAttribute("ry", "5");
      leaf.setAttribute("fill", n % 2 ? "#3f7a45" : "#2f6b3f");
      leaf.setAttribute("transform", `rotate(${side * 35} ${x + side * 9} ${length * t})`);
      g.appendChild(leaf);
    }
    svg.appendChild(g);
  });
})();

/* ---------- Quote form ---------- */
const form = document.getElementById("quote-form");
const status = document.getElementById("quote-status");
const button = form ? form.querySelector("button[type=submit]") : null;

function show(message, isError) {
  status.textContent = message;
  status.className = isError ? "status error" : "status ok";
}

if (form) {
  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    if (!FORM_ENDPOINT) {
      show("The quote form isn't connected yet (development mode). Please check back soon.", true);
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
      if (!response.ok) throw new Error("send failed");
      form.reset();
      show("Thanks! Your request was sent. We'll get back to you soon.", false);
    } catch (error) {
      show("Sorry, that didn't send. Please try again in a moment.", true);
    } finally {
      button.disabled = false;
    }
  });
}
