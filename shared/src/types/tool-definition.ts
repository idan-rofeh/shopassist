import { FunctionDeclaration, FunctionResponse } from "@google/generative-ai";

export interface ToolDefinition {
    declaration: FunctionDeclaration,
    handler: (args?: any) => FunctionResponse | Promise<FunctionResponse>,
};