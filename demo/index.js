import { Pin } from "@callmehuyv/pin-button";

await Pin.Template.load("pin.template.html");

customElements.define(Pin.Tag, Pin);

// ─── 2) Imperative API ────────────────────────────────────────────────
const target = document.getElementById("imperative-target");
const readout = document.getElementById("status-readout");

const sync = () => {
  readout.textContent = target.status;
};

document.querySelectorAll(".controls button[data-op]").forEach((btn) => {
  btn.addEventListener("click", () => {
    const op = btn.dataset.op;
    target[op]();
    sync();
  });
});

// reflect external (gesture-driven) toggles too
target.onpin = sync;
target.onunpin = sync;
sync();

// ─── 3) Event subscription ────────────────────────────────────────────
const eventsTarget = document.getElementById("events-target");
const log = document.getElementById("event-log");

const append = (name, status) => {
  log.querySelector(".placeholder")?.remove();
  const li = document.createElement("li");
  li.className = `evt-${name === "onpin" ? "pin" : "unpin"}`;
  const ts = new Date().toLocaleTimeString();
  li.textContent = `[${ts}] ${name}  detail.status = "${status}"`;
  log.prepend(li);
  while (log.children.length > 50) log.lastElementChild.remove();
};

eventsTarget.onpin = (e) => append("onpin", e.detail.status);
eventsTarget.onunpin = (e) => append("onunpin", e.detail.status);
