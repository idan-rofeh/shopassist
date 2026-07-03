import { ToolDefinition } from '@chatbot/shared';
import { searchCategories } from './category.tool';
import { FunctionDeclaration } from '@google/generative-ai';

export const tools: Map<string, ToolDefinition> = new Map([
    ['searchCategories', searchCategories], 
]);

export const functionDeclarations: FunctionDeclaration[] = [
    ...tools.values(),
  ].map((t) => t.declaration);