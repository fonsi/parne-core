import { Amount } from "../../amount/domain/amount";
import { CategoryId } from "../../category/domain/category";
import { ParneRepository } from "../../parne/domain/parneRepository";
import { EditableItemProps, Item, ItemId } from "../domain/item";

type ItemSeviceBuilder = (repository: ParneRepository) => ItemService;
type AddItem = (name: string, categoryId?: CategoryId, amounts?: Amount[]) => Promise<Item>;
type RemoveItem = (id: ItemId) => Promise<Item | null>;
type GetAllItems = () => Promise<Item[]>;
type GetById = (id: ItemId) => Promise<Item | null>;
type GetByCategoryId = (categoryId: CategoryId) => Promise<Item[]>;
type GetUncategorizedItems = () => Promise<Item[]>;
type UpdateItem = (item: Item, props: EditableItemProps) => Promise<Item>;

export interface ItemService {
    add: AddItem;
    remove: RemoveItem;
    getAll: GetAllItems;
    getById: GetById;
    getByCategoryId: GetByCategoryId;
    getUncategorized: GetUncategorizedItems;
    update: UpdateItem;
}

const guardInvalidName = (name: string): void => {
    if (!name || name === '') {
        throw new Error('Item name could not be empty');
    }
};

const guardInvalidCategory = async (repository: ParneRepository, categoryId: CategoryId): Promise<void> => {
    const category = await repository.category.getById(categoryId);

    if (!category) {
        throw new Error(`Category with id ${categoryId} does not exists`);
    }
};

export const buildItemService: ItemSeviceBuilder = (repository) => {
    const add: AddItem = async (name, categoryId, amounts) => {
        guardInvalidName(name);

        if (categoryId) {
            await guardInvalidCategory(repository, categoryId);
        }

        return repository.item.add(name, categoryId, amounts);
    };

    const remove: GetById = (id) => repository.item.remove(id);

    const getAll: GetAllItems = () => repository.item.getAll();

    const getById: GetById = (id) => repository.item.getById(id);

    const getByCategoryId: GetByCategoryId = (categoryId) => {
        guardInvalidCategory(repository, categoryId);

        return repository.item.getByCategoryId(categoryId);
    };

    const getUncategorized: GetUncategorizedItems = () => repository.item.getUncategorized();

    const update: UpdateItem = async (item, props) => {
        if (props.name) {
            guardInvalidName(props.name);
        }

        if (props.categoryId) {
            await guardInvalidCategory(repository, props.categoryId);
        }

        const newItem = await repository.item.update(item, props);

        return newItem;
    };

    return {
        add,
        remove,
        getAll,
        getById,
        getByCategoryId,
        getUncategorized,
        update,
    };
};
