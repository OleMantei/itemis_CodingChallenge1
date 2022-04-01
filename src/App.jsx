const taxRate = 10;
const taxRateImported = 5;
const taxFreeGoods = ["book", "chocolate", "pill"];

export function calcTax(price, exempt, imported) {
  const tax = exempt
    ? imported
      ? taxRateImported
      : 0
    : imported
    ? taxRate + taxRateImported
    : taxRate;
  return (price * tax) / 100;
}

export function roundTax(tax) {
  const rounded = Math.ceil(tax * 10) / 10;
  const lastDigit = Math.trunc(tax * 100) % 10;

  return lastDigit < 5 && lastDigit != 0 ? rounded - 0.05 : rounded;
}

export function checkTaxExempt(item) {
  return taxFreeGoods.some((i) => item.includes(i));
}

export function convertInput(input) {
  const amount = Number(input.charAt(0));
  const imported = input.includes("import");
  const item = input
    .replace(RegExp(/[0-9.]|at\s|imported/g), "")
    .trim()
    .replace(/\s+/g, " ");
  const price = Number(input.substring(input.indexOf("at ") + 2).trim());

  return {
    amount: amount,
    import: imported,
    item: item,
    price: price,
  };
}

function App() {
  return (
    <div className="App">
      <h1>Hello Challenge</h1>
    </div>
  );
}

export default App;
