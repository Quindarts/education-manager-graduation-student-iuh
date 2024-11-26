export const createProductCode = (productName: string) => {
  const characters: string[] = productName.split(' ').map((letter: string) =>
    letter
      .charAt(0)
      .toUpperCase()
      .replace(/[^\w ]/g, '')
      .trim(),
  );
  const randomNumber = Math.floor(Math.random() * 10000);
  return characters.join('') + randomNumber;
};
