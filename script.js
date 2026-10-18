// Quote form: sends the request to a hosted form endpoint that forwards it to the
// owner's inbox, so no email address appears anywhere on the site.
// Paste the endpoint URL here once it exists (e.g. "https://formspree.io/f/xxxxxxxx").
const FORM_ENDPOINT = "";

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
