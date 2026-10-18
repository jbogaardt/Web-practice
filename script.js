// Quote form: opens the visitor's email app with the request filled in.
// Replace QUOTE_EMAIL with the real address when it's ready.
const QUOTE_EMAIL = "quotes@example.com";

const form = document.getElementById("quote-form");

if (form) {
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const data = new FormData(form);
    const lines = [
      `Name: ${data.get("name")}`,
      `Phone: ${data.get("phone")}`,
      `Email: ${data.get("email")}`,
      `City: ${data.get("city")}`,
      `Project type: ${data.get("type")}`,
      "",
      `${data.get("details")}`,
    ];
    const subject = `Quote request: ${data.get("type")} (${data.get("city")})`;
    window.location.href =
      `mailto:${QUOTE_EMAIL}?subject=${encodeURIComponent(subject)}` +
      `&body=${encodeURIComponent(lines.join("\n"))}`;
  });
}
