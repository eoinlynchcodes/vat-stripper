const amountEl = document.getElementById("amount");
const amountLabelEl = document.getElementById("amount-label");
const rateEl = document.getElementById("rate");
const netEl = document.getElementById("net");
const vatEl = document.getElementById("vat");
const grossEl = document.getElementById("gross");
const modeEls = document.querySelectorAll('input[name="mode"]');

const fmt = new Intl.NumberFormat("en-IE", {
  style: "currency",
  currency: "EUR",
});

function currentMode() {
  return document.querySelector('input[name="mode"]:checked').value;
}

function recalc() {
  const mode = currentMode();
  amountLabelEl.textContent =
    mode === "add" ? "Amount (excl. VAT)" : "Amount (incl. VAT)";

  const input = parseFloat(amountEl.value);
  const ratePct = parseFloat(rateEl.value);

  if (!Number.isFinite(input) || input < 0) {
    netEl.textContent = fmt.format(0);
    vatEl.textContent = fmt.format(0);
    grossEl.textContent = fmt.format(0);
    return;
  }

  let net, gross;
  if (mode === "add") {
    net = input;
    gross = net * (1 + ratePct / 100);
  } else {
    gross = input;
    net = gross / (1 + ratePct / 100);
  }
  const vat = gross - net;

  netEl.textContent = fmt.format(net);
  vatEl.textContent = fmt.format(vat);
  grossEl.textContent = fmt.format(gross);
}

amountEl.addEventListener("input", recalc);
rateEl.addEventListener("change", recalc);
modeEls.forEach((el) => el.addEventListener("change", recalc));
recalc();
