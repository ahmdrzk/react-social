export const convertToCamelCase = (string) => {
  const lowerCase = string.toLowerCase();
  const array = lowerCase.split(" ");
  const arrayCamelCase = array.map((word, i) => (i > 0 ? `${word[0].toUpperCase()}${word.slice(1)}` : word));
  const id = arrayCamelCase.join("");

  return id;
};
