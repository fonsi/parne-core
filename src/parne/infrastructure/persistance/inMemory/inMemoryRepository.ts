import { Category, CategoryId, createCategory } from '../../../../category/domain/category';
import { AddCategory, GetAllCategories, GetCategoryById, Init, ParneRepository, RemoveCategory } from '../../../domain/parneRepository';

export const buildInMemoryRepository = (): ParneRepository => {
  const categories: Record<CategoryId, Category> = {};

  const init: Init = async () => await Promise.resolve();

  const add: AddCategory = async (name) =>
    await new Promise((resolve, reject) => {
      try {
        const category = createCategory(name);
        categories[category.id] = category;
        
        resolve(category);
      } catch (e) {
        reject(e);
      }
    });

  const remove: RemoveCategory = async (id) =>
    await new Promise((resolve, reject) => {
      try {
        const category = categories[id];

        if (!category) {
          resolve(null); return;
        }

        delete categories[id];

        resolve(category);
      } catch (e) {
        reject(e);
      }
    });

  const getAll: GetAllCategories = async () =>
    await new Promise((resolve, reject) => {
      try {
        resolve(Object.values(categories));
      } catch (e) {
        reject(e);
      }
    });

  const getById: GetCategoryById = async (id) =>
    await new Promise((resolve, reject) => {
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

  return {
    init,
    category: {
      add,
      remove,
      getAll,
      getById
    }
  };
};
