export function isNullish(arg: unknown) {
  if (arg === undefined) return true;
  if (arg === null) return true;
  return false;
}
