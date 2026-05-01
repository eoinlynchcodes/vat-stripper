const amountEl = document.getElementById("amount");
const rateEl = document.getElementById("rate");
const netEl = document.getElementById("net");
const vatEl = document.getElementById("vat");
const grossEl = document.getElementById("gross");

const fmt = new Intl.NumberFormat("en-IE", {
  style: "currency",
  currency: "EUR",
});

function recalc() {
  const gross = parseFloat(amountEl.value);
  const ratePct = parseFloat(rateEl.value);

  if (!Number.isFinite(gross) || gross < 0) {
    netEl.textContent = fmt.format(0);
    vatEl.textContent = fmt.format(0);
    grossEl.textContent = fmt.format(0);
    return;
  }

  const net = gross / (1 + ratePct / 100);
  const vat = gross - net;

  netEl.textContent = fmt.format(net);
  vatEl.textContent = fmt.format(vat);
  grossEl.textContent = fmt.format(gross);
}

amountEl.addEventListener("input", recalc);
rateEl.addEventListener("change", recalc);
recalc();
