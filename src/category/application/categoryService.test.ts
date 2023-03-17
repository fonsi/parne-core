import { ParneRepository } from "../../parne/domain/parneRepository";
import { buildInMemoryRepository } from "../../parne/infrastructure/persistance/inMemory/inMemoryRepository";
import { buildCategoryService, CategoryService } from "./categoryService";

describe('categoryService', () => {
    let repository: ParneRepository;
    let categoryService: CategoryService;

    beforeEach(() => {
        repository = buildInMemoryRepository();
        categoryService = buildCategoryService(repository);
    });

    test('should add a category', async () => {
        let allCategories = await repository.category.getAll();

        expect(allCategories.length).toEqual(0);
        
        const categoryName = 'category 1';
        const category = await categoryService.add(categoryName);

        allCategories = await repository.category.getAll();

        expect(allCategories.length).toEqual(1);
        expect(allCategories[0].name).toEqual(categoryName);
        expect(allCategories[0].name).toEqual(category.name);
        expect(allCategories[0].id).toEqual(expect.stringMatching(/\S/));
    });

    test('should add multiple categories', async () => {        
        const firstCategory = 'category 1';
        const secondCategory = 'category 2';
        await categoryService.add(firstCategory);
        await categoryService.add(secondCategory);

        const allCategories = await repository.category.getAll();

        expect(allCategories.length).toEqual(2);
        expect(allCategories[0].name).toEqual(firstCategory);
        expect(allCategories[1].name).toEqual(secondCategory);
    });

    test('should get a category by id', async () => {        
        const firstCategory = await categoryService.add('category 1');
        const secondCategory = await categoryService.add('category 2');

        expect(await repository.category.getById(firstCategory.id)).toEqual(firstCategory);
        expect(await repository.category.getById(secondCategory.id)).toEqual(secondCategory);
    });

    test('should return null if a category does not exists', async () => {        
        const firstCategory = await categoryService.add('category 1');

        expect(await repository.category.getById(firstCategory.id)).toEqual(firstCategory);
        expect(await repository.category.getById('randomId')).toBeNull();
    });
});