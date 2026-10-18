// Quote form: sends the request to the owner's inbox through FormSubmit (formsubmit.co).
// The first submission from the live site triggers a one-time activation email;
// click the link in it and later requests arrive normally.
// If sending fails, the visitor's email app opens with the request filled in instead.
const QUOTE_EMAIL = "skbogaardt@gmail.com";
const ENDPOINT = `https://formsubmit.co/ajax/${QUOTE_EMAIL}`;

const form = document.getElementById("quote-form");
const status = document.getElementById("quote-status");
const button = form ? form.querySelector("button[type=submit]") : null;

function show(message, isError) {
  status.textContent = message;
  status.className = isError ? "status error" : "status ok";
}

function mailtoFallback(data) {
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
}

if (form) {
  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    const data = new FormData(form);
    button.disabled = true;
    show("Sending...", false);

    try {
      const response = await fetch(ENDPOINT, {
        method: "POST",
        headers: { Accept: "application/json" },
        body: data,
      });
      const result = await response.json();
      if (!response.ok || result.success === "false") throw new Error("send failed");
      form.reset();
      show("Thanks! Your request was sent. We'll get back to you soon.", false);
    } catch (error) {
      show("Couldn't send automatically. Opening your email app instead.", true);
      mailtoFallback(data);
    } finally {
      button.disabled = false;
    }
  });
}
