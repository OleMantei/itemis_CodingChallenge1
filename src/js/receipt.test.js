import {
  calcTax,
  checkTaxExempt,
  convertInput,
  createReceipt,
  roundTax,
} from "./receipt";

// --- calculating tax ---

test("calc basic tax rate (10%)", () => {
  // 1 music CD at 14.99 -> 1 music CD: 16.49
  expect(calcTax(14.99)).toEqual(1.499);
});

test("calc import tax rate (5%)", () => {
  // 1 imported box of chocolates at 10.00 -> 1 imported box of chocolates: 10.50
  expect(calcTax(10, true, true)).toEqual(0.5);
});

test("calc basic tax rate (10%) + import tax rate (5%)", () => {
  // 1 imported bottle of perfume at 47.50 -> 1 imported bottle of perfume: 54.65
  expect(calcTax(47.5, false, true)).toEqual(7.125);
});

// --- rounding tax ---

test("round tax according to the rounding rules", () => {
  // 1 music CD at 14.99 -> 1 music CD: 16.49
  expect(roundTax(1.499)).toEqual(1.5);
  // 1 imported bottle of perfume at 47.50 -> 1 imported bottle of perfume: 54.65
  expect(roundTax(7.125)).toEqual(7.15);
  // 1 imported bottle of perfume at 27.99 -> 1 imported bottle of perfume: 32.19
  expect(roundTax(4.198499999999999)).toEqual(4.2);
  // 1 bottle of perfume at 18.99 -> 1 bottle of perfume: 20.89
  expect(roundTax(1.8989999999999998)).toEqual(1.9);
  // 1 box of imported chocolates at 11.25 -> 1 imported box of chocolates: 11.85
  expect(roundTax(0.5625)).toEqual(0.6);
});

// --- check tax exempt ---

test("check if the item is exempt from tax (books, food, medical)", () => {
  // book
  expect(checkTaxExempt("book")).toBe(true);
  // music CD
  expect(checkTaxExempt("music CD")).toBe(false);
  // chocolate bar
  expect(checkTaxExempt("chocolate bar")).toBe(true);
  // box of chocolates
  expect(checkTaxExempt("box of chocolates")).toBe(true);
  // bottle of perfume
  expect(checkTaxExempt("bottle of perfume")).toBe(false);
  // packet of headache pills
  expect(checkTaxExempt("packet of headache pills")).toBe(true);
});

// --- convert input ---

test("recognize input and convert accordingly", () => {
  // 1 book at 12.49
  expect(convertInput("1 book at 12.49")).toEqual({
    amount: 1,
    import: false,
    item: "book",
    price: 12.49,
  });
  // 1 music CD at 14.99
  expect(convertInput("1 music CD at 14.99")).toEqual({
    amount: 1,
    import: false,
    item: "music CD",
    price: 14.99,
  });
  // 1 chocolate bar at 0.85
  expect(convertInput("1 chocolate bar at 0.85")).toEqual({
    amount: 1,
    import: false,
    item: "chocolate bar",
    price: 0.85,
  });
  // 1 imported box of chocolates at 10.00
  expect(convertInput("1 imported box of chocolates at 10.00")).toEqual({
    amount: 1,
    import: true,
    item: "box of chocolates",
    price: 10.0,
  });
  // 1 imported bottle of perfume at 47.50
  expect(convertInput("1 imported bottle of perfume at 47.50")).toEqual({
    amount: 1,
    import: true,
    item: "bottle of perfume",
    price: 47.5,
  });
  // 1 imported bottle of perfume at 27.99
  expect(convertInput("1 imported bottle of perfume at 27.99")).toEqual({
    amount: 1,
    import: true,
    item: "bottle of perfume",
    price: 27.99,
  });
  // 1 bottle of perfume at 18.99
  expect(convertInput("1 bottle of perfume at 18.99")).toEqual({
    amount: 1,
    import: false,
    item: "bottle of perfume",
    price: 18.99,
  });
  // 1 packet of headache pills at 9.75
  expect(convertInput("1 packet of headache pills at 9.75")).toEqual({
    amount: 1,
    import: false,
    item: "packet of headache pills",
    price: 9.75,
  });
  // 1 box of imported chocolates at 11.25
  expect(convertInput("1 box of imported chocolates at 11.25")).toEqual({
    amount: 1,
    import: true,
    item: "box of chocolates",
    price: 11.25,
  });
});

// --- create receipt ---

test("process input(s) and create receipt", () => {
  // Input 1
  expect(
    createReceipt([
      "1 book at 12.49",
      "1 music CD at 14.99",
      "1 chocolate bar at 0.85",
    ])
  ).toEqual({
    items: [
      {
        amount: 1,
        import: false,
        item: "book",
        shelfPrice: 12.49,
      },
      {
        amount: 1,
        import: false,
        item: "music CD",
        shelfPrice: 16.49,
      },
      {
        amount: 1,
        import: false,
        item: "chocolate bar",
        shelfPrice: 0.85,
      },
    ],
    salesTaxes: 1.5,
    total: 29.83,
  });
  // Input 2
  expect(
    createReceipt([
      "1 imported box of chocolates at 10.00",
      "1 imported bottle of perfume at 47.50",
    ])
  ).toEqual({
    items: [
      {
        amount: 1,
        import: true,
        item: "box of chocolates",
        shelfPrice: 10.5,
      },
      {
        amount: 1,
        import: true,
        item: "bottle of perfume",
        shelfPrice: 54.65,
      },
    ],
    salesTaxes: 7.65,
    total: 65.15,
  });
  // Input 3
  expect(
    createReceipt([
      "1 imported bottle of perfume at 27.99",
      "1 bottle of perfume at 18.99",
      "1 packet of headache pills at 9.75",
      "1 box of imported chocolates at 11.25",
    ])
  ).toEqual({
    items: [
      {
        amount: 1,
        import: true,
        item: "bottle of perfume",
        shelfPrice: 32.19,
      },
      {
        amount: 1,
        import: false,
        item: "bottle of perfume",
        shelfPrice: 20.89,
      },
      {
        amount: 1,
        import: false,
        item: "packet of headache pills",
        shelfPrice: 9.75,
      },
      {
        amount: 1,
        import: true,
        item: "box of chocolates",
        shelfPrice: 11.85,
      },
    ],
    salesTaxes: 6.7,
    total: 74.68,
  });
});
