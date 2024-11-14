export enum GraphType {
  CUBIC = 'cubic',
  SINUS = 'sinus',
  COSINUS = 'cosinus',
  TANGEN = 'tangen'
}

export interface GraphParameters {
  a: number;
  b: number;
  c: number;
  d: number;
}