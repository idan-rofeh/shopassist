import { FunctionDeclaration, SchemaType } from "@google/generative-ai";
import { ProductSearchFilter, ProductService } from "../services/product.service";
import { ToolDefinition } from "@chatbot/shared";
import { createTool } from "./create-tool";

const DOC: string = `Search store products by params. Returns id, name, description, categoryId, and price.
    Never call with no filters and not by calling once per category to list all products - overkill, and function will throw error.
    Response lists results under the data property`;

const USAGE = `Use only after the user's intent is narrowed (category, price, specific model, or use case).
    Do NOT use this tool to list the entire catalog — not with empty filters, and not by calling once per category.
    For "list all products" / "show everything", use searchCategories and ask for guidance instead.
    Prefer one focused query. Multiple calls are only for explicit comparisons the user requested (e.g. "laptops vs accessories under $50") — still show at most 4 products total in your reply.`;

const description: string = [
    DOC,
    USAGE,
].join('\n\n');

const searchProductsDeclaration: FunctionDeclaration = {
    name: 'searchProducts',
    description,
    parameters: {
        type: SchemaType.OBJECT,
        properties: {
            categoryId: {
                type: SchemaType.STRING,
                description: 'Exact category id, e.g. "001" or "002"',
            },
            name: {
                type: SchemaType.STRING,
                description: 'Partial name match, e.g. "macbook air" or "airpods"',
            },
            minPrice: {
                type: SchemaType.NUMBER,
                description: 'Minimal product price',
            },
            maxPrice: {
                type: SchemaType.NUMBER,
                description: 'Maximal product price',
            },
        },
    }
};

export const searchProducts: ToolDefinition = createTool(
    searchProductsDeclaration,
    async (filter: ProductSearchFilter) => ProductService.searchProducts(filter),
);