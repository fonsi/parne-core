import { buildCategoryService } from '../../category/application/categoryService';
import { Parne } from '../domain/parne';
import { ParneRepository } from '../domain/parneRepository';
import { buildInMemoryRepository } from '../infrastructure/persistance/inMemory/inMemoryRepository';

interface BuildParneOptions {
  repository?: ParneRepository;
}

export const buildParne = async (options?: BuildParneOptions): Promise<Parne> => {
  const repository = options?.repository || buildInMemoryRepository();
  await repository.init();

  return {
    category: buildCategoryService(repository),
    report: () => {
      return 'This is a report';
    }
  };
};
