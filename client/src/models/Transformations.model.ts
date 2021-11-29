import { TransformationName } from 'config/transformations/transformations';

export type Transformations = Transformation[];

export interface Transformation {
  id: string;
  name: TransformationName;
  price: string;
  supply: string;
  nTokens: string;
}
