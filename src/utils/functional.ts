export const mapRange = <U>(num: number, mapFn: (i: number) => U): U[] => {
  return num > 0
    ? Array(num)
        .fill(0)
        .map((_, i) => mapFn(i))
    : [];
};
