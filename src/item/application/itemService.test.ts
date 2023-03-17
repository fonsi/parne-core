import { buildCategoryService, CategoryService } from "../../category/application/categoryService";
import { Category } from "../../category/domain/category";
import { ParneRepository } from "../../parne/domain/parneRepository";
import { buildInMemoryRepository } from "../../parne/infrastructure/persistance/inMemory/inMemoryRepository";
import { buildItemService, ItemService } from "./itemService";

describe('itemService', () => {
    let repository: ParneRepository;
    let categoryService: CategoryService;
    let itemService: ItemService;

    let category: Category;

    beforeEach(async () => {
        repository = buildInMemoryRepository();
        categoryService = buildCategoryService(repository);
        itemService = buildItemService(repository);

        category = await categoryService.add('category');
    });

    test('should add an item', async () => {
        let allItems = await repository.item.getAll();

        expect(allItems.length).toEqual(0);
        
        const itemName = 'item 1';
        const item = await itemService.add(itemName, category.id);

        allItems = await repository.item.getAll();

        expect(allItems.length).toEqual(1);
        expect(allItems[0]).toEqual(item);
        expect(allItems[0].name).toEqual(item.name);
        expect(allItems[0].categoryId).toEqual(category.id);
        expect(allItems[0].id).toEqual(expect.stringMatching(/\S/));
    });

    test('should add multiple items to the same category', async () => {        
        const firstItem = 'item 1';
        const secondItem = 'item 2';
        await itemService.add(firstItem, category.id);
        await itemService.add(secondItem, category.id);

        const allItems = await repository.item.getAll();

        expect(allItems.length).toEqual(2);
        expect(allItems[0].name).toEqual(firstItem);
        expect(allItems[1].name).toEqual(secondItem);
    });

    test('should add an item without category', async () => {        
        const itemName = 'item 1';
        const item = await itemService.add(itemName);

        const allItems = await repository.item.getAll();

        expect(allItems.length).toEqual(1);
        expect(allItems[0]).toEqual(item);
        expect(allItems[0].categoryId).toBeNull();
    });

    test('should add multiple items to multiple categories', async () => {
        const anotherCategory = await categoryService.add('another category');
        const firstItem = 'item 1';
        const secondItem = 'item 2';
        await itemService.add(firstItem, category.id);
        await itemService.add(secondItem, anotherCategory.id);

        const allItems = await repository.item.getAll();

        expect(allItems.length).toEqual(2);
        expect(allItems[0].categoryId).toEqual(category.id);
        expect(allItems[1].categoryId).toEqual(anotherCategory.id);
    });

    test('should get an item by id', async () => {        
        const firstItem = await itemService.add('item 1', category.id);
        const secondItem = await itemService.add('item 2', category.id);
        
        expect(await itemService.getById(firstItem.id)).toEqual(firstItem);
        expect(await itemService.getById(secondItem.id)).toEqual(secondItem);
    });

    test('should return null if an item does not exists', async () => {        
        const item = await itemService.add('item 1', category.id);

        expect(await itemService.getById(item.id)).toEqual(item);
        expect(await itemService.getById('randomId')).toBeNull();
    });

    test('should get items by category', async () => {
        const anotherCategory = await categoryService.add('another category');
        const firstItemName = 'item 1';
        const secondItemName = 'item 2';
        const thirdItemName = 'item 3';
        const uncategorizedItemName = 'uncategorized item';
        const firstItem = await itemService.add(firstItemName, category.id);
        const secondItem = await itemService.add(secondItemName, anotherCategory.id);
        const thirdItem = await itemService.add(thirdItemName, anotherCategory.id);
        const uncategorizedItem = await itemService.add(uncategorizedItemName);

        const allItems = await repository.item.getAll();
        const categoryItems = await repository.item.getByCategoryId(category.id);
        const anotherCategoryItems = await repository.item.getByCategoryId(anotherCategory.id);
        const uncategorizedItems = await repository.item.getUncategorized();

        expect(allItems.length).toEqual(4);
        expect(categoryItems.length).toEqual(1);
        expect(categoryItems[0]).toEqual(firstItem);
        expect(anotherCategoryItems.length).toEqual(2);
        expect(anotherCategoryItems[0]).toEqual(secondItem);
        expect(anotherCategoryItems[1]).toEqual(thirdItem);
        expect(uncategorizedItems.length).toEqual(1);
        expect(uncategorizedItems[0]).toEqual(uncategorizedItem);
    });

    test('should update item props', async () => {
        const itemName = 'item';
        const item = await itemService.add(itemName, category.id);
        const anotherCategory = await categoryService.add('another category');
        
        expect(await itemService.getById(item.id)).toEqual(item);

        const newName = 'new item';
        const updatedItem = await itemService.update(item, { name: newName, categoryId: anotherCategory.id });

        expect(await itemService.getById(item.id)).toEqual(updatedItem);
        expect(updatedItem.id).toEqual(item.id);
        expect(updatedItem.name).toEqual(newName);
        expect(updatedItem.categoryId).toEqual(anotherCategory.id);
    });
});