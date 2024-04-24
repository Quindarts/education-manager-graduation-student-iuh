export const createProductCode = (productName: string) => {
  const characters: string[] = productName.split(' ').map((letter: string) =>
    letter
      .charAt(0)
      .toUpperCase()
      // remove all special unicode characters in string
      .replace(/[^\w ]/g, '')
      .trim(),
  );
  const randomNumber = Math.floor(Math.random() * 10000);
  return characters.join('') + randomNumber;
};
