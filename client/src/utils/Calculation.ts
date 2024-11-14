import { GraphType } from '../types';

interface Parameters {
  a: number;
  b: number;
  c: number;
  d: number;
}

export const calculateGraph = (type: GraphType, x: number, params: Parameters): number => {
  const { a, b, c, d } = params;

  switch (type) {
    case GraphType.CUBIC:
      return a * Math.pow(x, 3) + b * Math.pow(x, 2) + c * x + d;
    case GraphType.SINUS:
      return a * Math.sin(x) ** 3 + b * Math.sin(x) ** 2 + c * Math.sin(x) + d;
    case GraphType.COSINUS:
      return a * Math.cos(x) ** 3 + b * Math.cos(x) ** 2 + c * Math.cos(x) + d;
    case GraphType.TANGEN:
      const value = a * Math.tan(x) ** 3 + b * Math.tan(x) ** 2 + c * Math.tan(x) + d;
      return Math.abs(value) > 10 ? NaN : value;
    default:
      return 0;
  }
};