import { GenerativeModel, GoogleGenerativeAI } from "@google/generative-ai";
import type { ChatMessage, ChatRequest} from "@chatbot/shared";

export class ChatService {
    private static MODEL_NAME = 'gemini-3.1-flash-lite';
    private static SYSTEM_PROMPT = `You are a helpful assistant for an online store.
        Answer general questions about products, pricing, shipping, and store policies.
        Be concise and friendly. If you don't know something, say so — do not invent order or account details.`;

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
            systemInstruction: this.SYSTEM_PROMPT
        };
    
        return genAI.getGenerativeModel(body);
    };
    
    private static toGeminiHistory(history: ChatMessage[]) {
        return history.map((msg: ChatMessage) => ({
            role: msg.role === 'assistant' ? 'model' : 'user',
            parts: [{ text: msg.content }]
        }));
    };
    
    public static async generateReply(req: ChatRequest): Promise<ChatMessage> {
        const model = this.getModel();
        const chat = model.startChat({ history: this.toGeminiHistory(req.history) });
        const res = await chat.sendMessage(req.message.content);
        const content = res.response.text();
    
        return {
            role: 'assistant',
            id: crypto.randomUUID(),
            content,
            createdAt: new Date(),
        };
    };
};