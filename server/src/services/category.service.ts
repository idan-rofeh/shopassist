import { Category } from "@chatbot/shared";
import { CATEGORIES } from "../data/categories";

export interface CategorySearchFilter {
    id?: string;
    name?: string;
};

export class CategoryService {
    public static searchCategories(filter: CategorySearchFilter = {}): Category[] {
        return CATEGORIES.filter((c: Category) => {
            const filterName = filter.name?.trim().toLocaleLowerCase();
            const categoryName = c.name?.trim().toLocaleLowerCase();

            if (filterName && !categoryName.includes(filterName)) return false;
            if (filter?.id  && filter.id !== c.id) return false;

            return true;
        });
    };
};