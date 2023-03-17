import { CategoryService } from "../../category/application/categoryService";

export interface Parne {
  category: CategoryService;
  report: () => string;
}
