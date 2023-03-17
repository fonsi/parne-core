import { ParneRepository } from "../../parne/domain/parneRepository";
import { Category, CategoryId, EditableCategoryProps } from "../domain/category";

type CategorySeviceBuilder = (repository: ParneRepository) => CategoryService;
type AddCategory = (name: string) => Promise<Category>;
type RemoveCategory = (id: CategoryId) => Promise<Category | null>
type GetAllCategories = () => Promise<Category[]>;
type GetById = (id: CategoryId) => Promise<Category | null>;
type UpdateCategory = (category: Category, props: EditableCategoryProps) => Promise<Category>;

export interface CategoryService {
    add: AddCategory;
    remove: RemoveCategory;
    getAll: GetAllCategories;
    getById: GetById;
    update: UpdateCategory;
}

const guardInvalidName = (name: string): void => {
    if (!name || name === '') {
        throw new Error('Category name could not be empty');
    }
};

const guardInvalidCategory = async (repository: ParneRepository, categoryId: CategoryId): Promise<void> => {
    const category = await repository.category.getById(categoryId);

    if (!category) {
        throw new Error(`Category with id ${categoryId} does not exists`);
    }
};

export const buildCategoryService: CategorySeviceBuilder = (repository) => {
    const add: AddCategory = (name) => {
        guardInvalidName(name);

        return repository.category.add(name);
    };

    const remove: RemoveCategory = (id: CategoryId) => repository.category.remove(id);

    const getAll: GetAllCategories = () => repository.category.getAll();

    const getById: GetById = (id) => repository.category.getById(id);

    const update: UpdateCategory = async (category, props) => {
        await guardInvalidCategory(repository, category?.id);

        if (props.name) {
            guardInvalidName(props.name);
        }

        return repository.category.update(category, props);
    };

    return {
        add,
        remove,
        getAll,
        getById,
        update,
    };
};
