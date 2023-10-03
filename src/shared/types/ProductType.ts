import { CategoryType } from './CategoryTypes';

export interface ProductType {
  id: number;
  name: string;
  image: string;
  price: number;
  weigth: number;
  length: number;
  height: number;
  width: number;
  diameter: number;
  category?: CategoryType;
}
