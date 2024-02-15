export const currencyStringToNumber = (currency: string | number) => {
  if (typeof currency === "number") {
    return currency;
  }

  const sanitizedCurrency = currency.replace(/\./g, "").replace(",", ".");

  return Number(sanitizedCurrency);
};
