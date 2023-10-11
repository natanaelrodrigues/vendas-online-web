import { CategoryType } from './CategoryTypes';

export interface ProductType {
  id: number;
  name: string;
  image: string;
  price: number;
  weight: number;
  length: number;
  height: number;
  width: number;
  diameter: number;
  category?: CategoryType;
}
