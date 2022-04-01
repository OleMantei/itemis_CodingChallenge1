import { expect } from "vitest";
import { calcTax, checkTaxExempt, roundTax } from "./App";

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
