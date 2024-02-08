export const capitalizeFirstLetter = (str: string) => {
  const firstChar = str.charAt(0);
  const rest = str.slice(1);

  return firstChar.toUpperCase().concat(rest);
};
