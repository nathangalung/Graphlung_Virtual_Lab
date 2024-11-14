import { GraphType, GraphParameters } from './index';

export interface Graph {
  id: number;
  type: GraphType;
  parameters: GraphParameters;
  createdAt: Date;
}

export interface GraphResponse {
  data: Graph[];
}