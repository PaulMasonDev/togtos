/**
 * https://www.freecodecamp.org/news/how-to-capitalize-words-in-javascript/
 */
export const titleCaseString = (string) => {
  const words = string.split(" ");
  for (let i = 0; i < words.length; i++) {
    words[i] = words[i][0].toUpperCase() + words[i].substr(1);
  }
  return words.join(" ");
};
