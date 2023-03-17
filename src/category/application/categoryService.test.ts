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

    test('should add and remove a category', async () => {
        let allCategories = await categoryService.getAll();

        expect(allCategories.length).toEqual(0);
        
        const categoryName = 'category 1';
        const category = await categoryService.add(categoryName);

        allCategories = await categoryService.getAll();

        expect(allCategories.length).toEqual(1);
        expect(allCategories[0].name).toEqual(categoryName);
        expect(allCategories[0].name).toEqual(category.name);
        expect(allCategories[0].id).toEqual(expect.stringMatching(/\S/));

        await categoryService.remove(category.id);

        allCategories = await categoryService.getAll();
        expect(allCategories.length).toEqual(0);
    });

    test('should add and remove multiple categories', async () => {        
        const firstCategoryName = 'category 1';
        const secondCategoryName = 'category 2';
        const firstCategory = await categoryService.add(firstCategoryName);
        const secondCategory = await categoryService.add(secondCategoryName);

        let allCategories = await categoryService.getAll();

        expect(allCategories.length).toEqual(2);
        expect(allCategories[0].name).toEqual(firstCategoryName);
        expect(allCategories[1].name).toEqual(secondCategoryName);

        await categoryService.remove(firstCategory.id);
        allCategories = await categoryService.getAll();
        
        expect(allCategories.length).toEqual(1);
        expect(allCategories[0]).toEqual(secondCategory);
    });

    test('should get a category by id', async () => {        
        const firstCategory = await categoryService.add('category 1');
        const secondCategory = await categoryService.add('category 2');

        expect(await categoryService.getById(firstCategory.id)).toEqual(firstCategory);
        expect(await categoryService.getById(secondCategory.id)).toEqual(secondCategory);
    });

    test('should return null if trying to get a category that does not exists', async () => {        
        const firstCategory = await categoryService.add('category 1');

        expect(await categoryService.getById(firstCategory.id)).toEqual(firstCategory);
        expect(await categoryService.getById('randomId')).toBeNull();
    });

    test('should return null if trying to remove a category that does not exists', async () => {        
        await categoryService.add('category 1');

        expect(await categoryService.remove('randomId')).toBeNull();
    });

    test('should update category props', async () => {        
        const categoryName = 'category';
        const category = await categoryService.add(categoryName);

        expect(await categoryService.getById(category.id)).toEqual(category);
        
        const newCategoryName = 'new category';
        const updatedCategory = await categoryService.update(category, { name: newCategoryName });

        expect(await categoryService.getById(category.id)).toEqual(updatedCategory);
        expect(updatedCategory.id).toEqual(category.id);
        expect(updatedCategory.name).toEqual(newCategoryName);
    });
});