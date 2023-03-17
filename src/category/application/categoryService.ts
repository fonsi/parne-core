import { Item } from "../../item/domain/item";
import { ParneRepository } from "../../parne/domain/parneRepository";
import { Category, CategoryId } from "../domain/category";

type CategorySeviceBuilder = (repository: ParneRepository) => CategoryService;
type AddCategory = (name: string, items?: Item[]) => Promise<Category>;
type GetAllCategories = () => Promise<Category[]>;
type GetById = (id: CategoryId) => Promise<Category | null>;

export interface CategoryService {
    add: AddCategory;
    getAll: GetAllCategories;
    getById: GetById;
}

const guardInvalidName = (name: string): void => {
    if (!name || name === '') {
        throw new Error('Category name could not be empty');
    }
};

export const buildCategoryService: CategorySeviceBuilder = (repository) => {
    const add: AddCategory = (name, items = []) => {
        guardInvalidName(name);

        return repository.category.add(name, items);
    };

    const getAll: GetAllCategories = () => repository.category.getAll();

    const getById: GetById = (id) => repository.category.getById(id);

    return {
        add,
        getAll,
        getById,
    };
};