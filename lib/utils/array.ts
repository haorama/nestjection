export function arrayDiff(array1: any[], array2: any) {
  return array1.filter((a) => !array2.includes(a));
}

export const uniqueFilter = <T>(item: T, index: number, arr: T[]): boolean =>
  arr.indexOf(item) === index;
