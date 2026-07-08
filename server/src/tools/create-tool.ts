import { ToolDefinition } from "@chatbot/shared";
import { FunctionDeclaration, FunctionResponse } from "@google/generative-ai";

export function createTool<TArgs, TData>(
    declaration: FunctionDeclaration,
    fn: (args: TArgs) => Promise<TData>,
): ToolDefinition {
    return {
        declaration,
        handler: async (args?: TArgs): Promise<FunctionResponse> => ({
            name: declaration.name!,
            response: {
                data: await fn(args as TArgs),
            },
        }),
    };
};