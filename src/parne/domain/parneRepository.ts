import { Amount } from '../../amount/domain/amount';
import { Category, CategoryId, EditableCategoryProps } from '../../category/domain/category';
import { EditableItemProps, Item, ItemId } from '../../item/domain/item';

export type Init = () => Promise<void>;
// category
export type AddCategory = (name: string) => Promise<Category>;
export type RemoveCategory = (id: CategoryId) => Promise<Category | null>;
export type GetAllCategories = () => Promise<Category[]>;
export type GetCategoryById = (id: CategoryId) => Promise<Category | null>;
export type UpdateCategory = (category: Category, props: EditableCategoryProps) => Promise<Category>;
// item
export type AddItem = (name: string, categoryId?: CategoryId, amounts?: Amount[]) => Promise<Item>;
export type RemoveItem = (id: ItemId) => Promise<Item | null>;
export type GetAllItems = () => Promise<Item[]>;
export type GetItemById = (id: ItemId) => Promise<Item | null>;
export type GetByCategoryId = (categoryId: CategoryId) => Promise<Item[]>;
export type GetUncategorizedItems = () => Promise<Item[]>;
export type UpdateItem = (item: Item, props: EditableItemProps) => Promise<Item>;

export interface ParneRepository {
  init: Init;
  category: {
    add: AddCategory;
    remove: RemoveCategory;
    getAll: GetAllCategories;
    getById: GetCategoryById;
    update: UpdateCategory;
  },
  item: {
    add: AddItem;
    remove: RemoveItem;
    getAll: GetAllItems;
    getById: GetItemById;
    getByCategoryId: GetByCategoryId;
    getUncategorized: GetUncategorizedItems;
    update: UpdateItem;
  }
}
