document.getElementById("calculatorForm").addEventListener("submit", function (e) {
  e.preventDefault();

  // Inputs
  const binSizeInput = Number(document.getElementById("binSize").value);
  const quantity = Number(document.getElementById("quantity").value);
  const actualWeight = Number(document.getElementById("actualWeight").value);
  const allowancePerM3 = Number(document.getElementById("allowance").value);
  const contractorRate = Number(document.getElementById("contractorRate").value);
  const tier = document.getElementById("tier").value;

  // Tier margins
  const margin = tier === "TIER1" ? 0.25 : 0.30;

  // Detect litres vs cubic metres
  let binVolumeM3 = binSizeInput >= 1 ? binSizeInput : binSizeInput / 1000;

  // Allowance-based excess calculation
  const allowanceWeight = binVolumeM3 * quantity * allowancePerM3;
  let excessWeight = actualWeight - allowanceWeight;
  excessWeight = excessWeight > 0 ? excessWeight : 0;

  // Contractor cost and final charge
  const baseCost = excessWeight * contractorRate;
  const finalCharge = baseCost * (1 + margin);

  // Output
  const message = `
    Bin Size Entered: ${binSizeInput} ${binSizeInput >= 1 ? 'm³' : 'L'}<br>
    Bin Volume Used in Calculation: ${binVolumeM3.toFixed(3)} m³<br>
    Number of Bins: ${quantity}<br>
    Allowance Weight: ${allowanceWeight.toFixed(2)} kg<br>
    Actual Weight: ${actualWeight.toFixed(2)} kg<br>
    Excess Weight: ${excessWeight.toFixed(2)} kg<br>
    Contractor Cost: $${baseCost.toFixed(2)}<br>
    Margin Applied: ${(margin*100).toFixed(0)}%<br>
    <strong>Final Charge: $${finalCharge.toFixed(2)}</strong>
  `;

  document.getElementById("result").innerHTML = message;
});
