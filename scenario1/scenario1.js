// Before and after comparison: the range input drives --pos on the card,
// which sets how far the "before" layer is clipped and where the handle sits.
const compare = document.getElementById("compare");
const range = compare ? compare.querySelector(".compare-range") : null;

function updateCompare() {
  const value = range.value;
  compare.style.setProperty("--pos", `${value}%`);
  range.setAttribute("aria-valuetext", `${value}% of the way from before to after`);
}

if (range) {
  range.addEventListener("input", updateCompare);
  updateCompare();
}

// Scroll reveal, skipped when the visitor prefers reduced motion.
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
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
