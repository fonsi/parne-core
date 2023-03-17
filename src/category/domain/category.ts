import { generateUUID } from '../../shared/domain/uuid';

export type CategoryId = string

export interface Category {
  id: CategoryId;
  name: string;
}

export type EditableCategoryProps = Omit<Partial<Category>, 'id'>;

export const createCategory = (name: string): Category => {
  return {
    id: generateUUID(),
    name,
  };
};
