import { ChatSession, FunctionCall, GenerateContentResult, GenerativeModel, GoogleGenerativeAI } from "@google/generative-ai";

import type { ChatMessage, ChatRequest} from "@chatbot/shared";

import { toolHandlers, toolDeclarations } from '../tools/index';
import { SYSTEM_PROMPT } from "../prompts";

export class ChatService {
    private static readonly MODEL_NAME = 'gemini-3.1-flash-lite';

    private static getAPIKey(): string {
        const key = process.env.GEMINI_API_KEY?.trim();
        if (!key) {
            throw new Error('GEMINI_API_KEY not configured');
        };

        return key;
    };
    
    private static getModel(): GenerativeModel {
        const genAI = new GoogleGenerativeAI(this.getAPIKey());
        const body = {
            model: this.MODEL_NAME,
            systemInstruction: SYSTEM_PROMPT,
            tools: [{ functionDeclarations: toolDeclarations }],
        };
    
        return genAI.getGenerativeModel(body);
    };
    
    private static toGeminiHistory(history: ChatMessage[]) {
        return history.filter((msg) => msg.content.trim()).map((msg: ChatMessage) => ({
            role: msg.role === 'assistant' ? 'model' : 'user',
            parts: [{ text: msg.content }]
        }));
    };
    
    public static async generateReply(req: ChatRequest): Promise<ChatMessage> {
        const model = this.getModel();
        const chat = model.startChat({ history: this.toGeminiHistory(req.history) });

        let result = await chat.sendMessage(req.message.content);
        result = await this.handleFunctionCalls(result, chat);

        const content = result.response.text();
    
        return {
            role: 'assistant',
            id: crypto.randomUUID(),
            content,
            createdAt: new Date(),
        };
    };

    private static async handleFunctionCalls(result: GenerateContentResult, chat: ChatSession): Promise<GenerateContentResult> {
        while (result.response.functionCalls()?.length) {
            const functionResponses = await Promise.all(
                result.response.functionCalls()!.map(async (call: FunctionCall) => {
                    const handler = toolHandlers.get(call.name);
                    if (!handler) throw new Error(`Unknown tool: ${call.name}`);
                    return {
                        functionResponse: await handler(call.args),
                    };
                }),
            );

            result = await chat.sendMessage(functionResponses);
        };


        return result;
    };
};