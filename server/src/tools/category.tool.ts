import { FunctionDeclaration, FunctionResponse, SchemaType } from "@google/generative-ai";
import { CategorySearchFilter, CategoryService } from "../services/category.service";
import { ToolDefinition } from "@chatbot/shared"

const DOC = `Search store categories by id or name. Returns id, name, and description.
    Call with no filters to list all categories.
    response lists categories under categories property`;
const USAGE = `Use when the user asks what you sell, product types, or departments.`;
const PRODUCT_USAGE = `You can also use this to answer questions like - do you sell a specific product.
    In such a case, you may infer the most likely category from the product name and search if we have that category, if it exists - 
    you can fetch use the products tool and search for it. If it is less obvious, you can ask the user help to identify the category
    by suggesting some existing plausible candidates returned by this query.
    Never claim specific products are in stock based on this tool alone.`;

const description = [
    DOC,
    USAGE,
    PRODUCT_USAGE,
].join('\n\n');

const searchCategoriesDeclaration: FunctionDeclaration = {
    name: 'searchCategories',
    description,
    parameters: {
        type: SchemaType.OBJECT,
        properties: {
            id: {
                type: SchemaType.STRING,
                description: 'Exact category id, e.g. "001" or "002"',
            },
            name: {
                type: SchemaType.STRING,
                description: 'Partial name match, e.g. "laptop" or "accessories"',
            },
        }
    }
};

function handleSearchCategories(filter: CategorySearchFilter): FunctionResponse {
    return {
        name: searchCategoriesDeclaration.name,
        response: {
            categories: CategoryService.searchCategories(filter)
        },
    };
};

export const searchCategories: ToolDefinition = {
    declaration: searchCategoriesDeclaration,
    handler: handleSearchCategories,
};