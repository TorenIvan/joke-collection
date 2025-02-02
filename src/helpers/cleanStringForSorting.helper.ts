export function cleanStringBeforeSorting(str: string) {
  const cleanStr = str.replace(/[^a-zA-Z ]/g, '').toLocaleLowerCase();
  return cleanStr;
}
