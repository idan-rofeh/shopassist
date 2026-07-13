import type { Category, CategorySearchFilter } from "@chatbot/shared";
import { CATEGORIES } from "../../data/categories";

export class CategoriesService {
    public static async searchCategories(filter: CategorySearchFilter = {}): Promise<Category[]> {
        return CATEGORIES.filter((c: Category) => {
            const filterName = filter.name?.trim().toLocaleLowerCase();
            const categoryName = c.name?.trim().toLocaleLowerCase();

            if (filterName && !categoryName.includes(filterName)) return false;
            if (filter?.id  && filter.id !== c.id) return false;

            return true;
        });
    };
};