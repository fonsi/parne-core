import { Category, CategoryId, createCategory } from '../../../../category/domain/category';
import { createItem, Item, ItemId } from '../../../../item/domain/item';
import { AddCategory, AddItem, GetAllCategories, GetAllItems, GetByCategoryId, GetCategoryById, GetItemById, GetUncategorizedItems, Init, ParneRepository, RemoveCategory, RemoveItem, UpdateCategory, UpdateItem } from '../../../domain/parneRepository';

export const buildInMemoryRepository = (): ParneRepository => {
  let categories: Record<CategoryId, Category> = {};
  let items: Record<ItemId, Item> = {};

  const init: Init = async () => await Promise.resolve();

  const addCategory: AddCategory = (name) =>
    new Promise((resolve, reject) => {
      try {
        const category = createCategory(name);
        categories = {
          ...categories,
          [category.id]: category
        };
        
        resolve(category);
      } catch (e) {
        reject(e);
      }
    });

  const removeCategory: RemoveCategory = (id) =>
    new Promise(async (resolve, reject) => {
      try {
        const category = categories[id];

        if (!category) {
          resolve(null); return;
        }

        const categoriesArray = await getAllCategories();
        categories = categoriesArray.reduce((acc, category) => {
          if (category.id === id) {
            return acc;
          }

          return {
            ...acc,
            [category.id]: category,
          };
        }, {});

        resolve(category);
      } catch (e) {
        reject(e);
      }
    });

  const getAllCategories: GetAllCategories = () =>
    new Promise((resolve, reject) => {
      try {
        resolve(Object.values(categories));
      } catch (e) {
        reject(e);
      }
    });

  const getCategoryById: GetCategoryById = (id) =>
    new Promise((resolve, reject) => {
      try {
        const category = categories[id];

        if (!category) {
          resolve(null); return;
        }

        resolve(category);
      } catch (e) {
        reject(e);
      }
    });
  
  const updateCategory: UpdateCategory = (category, props) =>
    new Promise((resolve, reject) => {
      try {
        const newCategory: Category = {
          ...category,
          ...props,
        };

        categories = {
          ...categories,
          [category.id]: newCategory,
        };
        
        resolve(newCategory);
      } catch (e) {
        reject(e);
      }
    });

  const addItem: AddItem = (name, categoryId, amounts) =>
    new Promise((resolve, reject) => {
      try {
        const item = createItem(name, categoryId, amounts);
        items = {
          ...items,
          [item.id]: item,
        };
        
        resolve(item);
      } catch (e) {
        reject(e);
      }
    });

  const removeItem: RemoveItem = (id) =>
    new Promise(async (resolve, reject) => {
      try {
        const item = items[id];

        if (!item) {
          resolve(null); return;
        }

        const itemsArray = await getAllItems();
        items = itemsArray.reduce((acc, item) => {
          if (item.id === id) {
            return acc;
          }
          
          return {
            ...acc,
            [item.id]: item,
          };
        }, {});

        resolve(item);
      } catch (e) {
        reject(e);
      }
    });

  const getAllItems: GetAllItems = () =>
    new Promise((resolve, reject) => {
      try {
        resolve(Object.values(items));
      } catch (e) {
        reject(e);
      }
    });

  const getItemById: GetItemById = (id) =>
    new Promise((resolve, reject) => {
      try {
        const item = items[id];

        if (!item) {
          resolve(null);
          
          return;
        }

        resolve(item);
      } catch (e) {
        reject(e);
      }
    });

  const getItemsByCategoryId: GetByCategoryId = (categoryId) =>
    new Promise(async (resolve, reject) => {
      try {
        const items = await getAllItems();

        resolve(items.filter((item) => item.categoryId === categoryId));
      } catch (e) {
        reject(e);
      }
    });

  const getUncategorizedItems: GetUncategorizedItems = () =>
    new Promise(async (resolve, reject) => {
      try {
        const items = await getAllItems();

        resolve(items.filter((item) => !item.categoryId));
      } catch (e) {
        reject(e);
      }
    });

  const updateItem: UpdateItem = (item, props) =>
    new Promise((resolve, reject) => {
      try {
        const newItem: Item = {
          ...item,
          ...props,
        };
        items = {
          ...items,
          [item.id]: newItem,
        };
        
        resolve(newItem);
      } catch (e) {
        reject(e);
      }
    });

  return {
    init,
    category: {
      add: addCategory,
      remove: removeCategory,
      getAll: getAllCategories,
      getById: getCategoryById,
      update: updateCategory,
    },
    item: {
      add: addItem,
      remove: removeItem,
      getAll: getAllItems,
      getById: getItemById,
      getByCategoryId: getItemsByCategoryId,
      getUncategorized: getUncategorizedItems,
      update: updateItem,
    }
  };
};
