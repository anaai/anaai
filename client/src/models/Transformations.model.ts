import { TransformationName } from 'config/transformations/transformations';

export type Transformations = Transformation[];

export interface Transformation {
  id: string;
  name: TransformationName;
  description: string;
  price: string;
  supply: string;
  nTokens: string;
}
