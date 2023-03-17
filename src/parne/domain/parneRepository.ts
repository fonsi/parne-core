import { Category, CategoryId } from '../../category/domain/category';
import { Item } from '../../item/domain/item';

export type Init = () => Promise<void>;
export type AddCategory = (name: string, items?: Item[]) => Promise<Category>;
export type RemoveCategory = (id: CategoryId) => Promise<Category | null>;
export type GetAllCategories = () => Promise<Category[]>;
export type GetCategoryById = (id: CategoryId) => Promise<Category | null>;

export interface ParneRepository {
  init: Init;
  category: {
    add: AddCategory;
    remove: RemoveCategory;
    getAll: GetAllCategories;
    getById: GetCategoryById;
  }
}
