import type { FunctionDeclaration } from '@google/generative-ai';

import type { ToolDefinition } from '@chatbot/shared';

import { searchCategories } from './category.tool';
import { searchProducts } from './product.tool';

const tools: ToolDefinition[] = [
    searchCategories,
    searchProducts,
];

const toolHandlers = new Map<string, ToolDefinition['handler']>();
const toolDeclarations: FunctionDeclaration[] = [];

tools.forEach((tool) => {
    const name = tool.declaration.name;
    if (!name) throw new Error('Tool declaration missing name');
    toolHandlers.set(name, tool.handler);
    toolDeclarations.push(tool.declaration);
});

export { toolHandlers, toolDeclarations };
