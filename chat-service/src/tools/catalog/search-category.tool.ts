import { FunctionDeclaration, SchemaType } from "@google/generative-ai";
import { ToolDefinition, CategorySearchFilter, Category } from "@chatbot/shared"

import { createTool } from "../create-tool";
import { catalogApi } from '../../clients/clients';
import { logger } from "../../services/log.service";

const DOC = `Search store categories by id or name. Returns id, name, and description.
    Call with no filters to list all categories.
    Response lists results under the data property`;

const USAGE = `Use when the user asks what you sell, product types, or departments.
    Also use as the first step before searchProducts when the request is about a product type (not a specific model name).`;

const PRODUCT_USAGE = `Required before searchProducts for type-based queries (e.g. "laptops under $800", "any wireless mice?").
    Fetch all the categories first, and resolve the best matches. For example - wireless mice, cameras, laptop riser - match the category with name 'Accesories'.
    MacBooks match logically under the 'laptops' category.
    You may use the category's description for further analysis.
    Resolve the category here first, then pass the returned id as categoryId to searchProducts.
    If the user's wording maps to a product type (laptop, accessory, mouse, keyboard, headset, etc.), search categories — do not pass that word as a product name filter.
    If exactly one category fits, proceed to searchProducts with its id.
    If multiple fit, ask the user to choose; suggest candidates from the results.
    If none fit, say so and ask for clarification or offer to list all categories.
    Never claim specific products are in stock based on this tool alone.`;

const BROAD_QUERIES = `For broad requests ("list all products", "show me everything", "what do you sell"):
    This tool alone is enough — present categories and ask the user to pick a direction.
    Do not follow up with searchProducts for every category.`;

const description = [
    DOC,
    USAGE,
    PRODUCT_USAGE,
    BROAD_QUERIES,
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
        },
    },
};

export const searchCategories: ToolDefinition = createTool(
    searchCategoriesDeclaration,
    async (filter: CategorySearchFilter) => {
        try {
            const res: Category[] = await catalogApi.categories.search(filter);
            return res;
        } catch (e) {
            logger.error(e);
            throw e;
        };
    },
);
