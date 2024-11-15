// src/types/index.ts
export enum GraphType {
  CUBIC = 'cubic',
  SINUS = 'sinus',
  COSINUS = 'cosinus',
  TANGEN = 'tangen'
}

export interface Question {
  parameters: { 
    a: number; 
    b: number; 
    c: number; 
    d: number 
  };
  graphType: GraphType;
}