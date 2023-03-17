import { Item } from '../../item/domain/item';
import { generateUUID } from '../../shared/domain/uuid';

export type CategoryId = string

export interface Category {
  id: CategoryId;
  name: string;
  items: Item[];
}

export const createCategory = (name: string, items: Item[] = []): Category => {
  return {
    id: generateUUID(),
    name,
    items,
  };
};
