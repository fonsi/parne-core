import { Amount } from '../../amount/domain/amount';
import { CategoryId } from '../../category/domain/category';
import { generateUUID } from '../../shared/domain/uuid';

export type ItemId = string;

export interface Item {
  id: ItemId;
  name: string;
  categoryId: CategoryId | null;
  amounts: Amount[];
}

export type EditableItemProps = Omit<Partial<Item>, 'id'>;

export const createItem = (name: string, categoryId?: CategoryId, amounts: Amount[] = []): Item => {
  return {
    id: generateUUID(),
    name,
    categoryId: categoryId || null,
    amounts
  };
};
