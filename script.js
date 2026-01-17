document.getElementById("calculatorForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const binSizeLitres = Number(document.getElementById("binSize").value);
  const quantity = Number(document.getElementById("quantity").value);
  const actualWeight = Number(document.getElementById("actualWeight").value);
  const allowancePerM3 = Number(document.getElementById("allowance").value);
  const rule = document.getElementById("rule").value;

  const contractorRate = Number(document.getElementById("contractorRate").value);
  const tier = document.getElementById("tier").value;

  // Tier margins
  const margin =
    tier === "TIER1" ? 0.25 :
    tier === "TIER2" ? 0.30 : 0;

  // Convert litres to cubic metres
  const binVolumeM3 = binSizeLitres / 1000;

  let allowanceWeight = 0;
  let excessWeight = 0;
  let baseCost = 0;
  let finalCharge = 0;
  let message = "";

  if (rule === "NO_CHARGE") {
    message = "Customer is exempt from excess charges.";
  }

  if (rule === "ALLOWANCE_BASED") {
    allowanceWeight = binVolumeM3 * quantity * allowancePerM3;
    excessWeight = actualWeight - allowanceWeight;
    excessWeight = excessWeight > 0 ? excessWeight : 0;

    baseCost = excessWeight * contractorRate;
    finalCharge = baseCost * (1 + margin);

    message = `
      Allowance: ${allowanceWeight.toFixed(2)} kg<br>
      Excess Weight: ${excessWeight.toFixed(2)} kg<br>
      Contractor Cost: $${baseCost.toFixed(2)}<br>
      Margin Applied: ${(margin * 100)}%<br>
      <strong>Final Charge: $${finalCharge.toFixed(2)}</strong>
    `;
  }

  if (rule === "CONTRACTOR") {
    excessWeight = actualWeight;
    baseCost = excessWeight * contractorRate;
    finalCharge = baseCost * (1 + margin);

    message = `
      Excess Weight: ${excessWeight.toFixed(2)} kg<br>
      Contractor Cost: $${baseCost.toFixed(2)}<br>
      Margin Applied: ${(margin * 100)}%<br>
      <strong>Final Charge: $${finalCharge.toFixed(2)}</strong>
    `;
  }

  document.getElementById("result").innerHTML = message;
});
