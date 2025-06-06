export const compoundInterest = (
  P: number,
  r: number = 0.07,
  years: number,
  n: number = 1
): number => {
  return P * Math.pow(1 + r / n, n * years);
};