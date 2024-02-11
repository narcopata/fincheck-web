export const currencyStringToNumber = (currency: string) => {
  const sanitizedCurrency = currency.replace(/\./g, "").replace(",", ".");

  return Number(sanitizedCurrency);
};
