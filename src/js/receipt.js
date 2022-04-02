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

export function createReceipt(inputs) {
  let items = [];
  let salesTaxes = 0;
  let total = 0;

  inputs.forEach((i) => {
    const conInput = convertInput(i);
    let item = {
      amount: conInput.amount,
      import: conInput.import,
      item: conInput.item,
    };

    item.shelfPrice =
      Math.round(
        (conInput.price +
          roundTax(
            calcTax(
              conInput.price,
              checkTaxExempt(conInput.item),
              conInput.import
            )
          )) *
          100
      ) / 100;

    total += item.shelfPrice;
    salesTaxes += item.shelfPrice - conInput.price;

    items.push(item);
  });

  return {
    items: items,
    salesTaxes: Math.round(salesTaxes * 100) / 100,
    total: Math.round(total * 100) / 100,
  };
}
