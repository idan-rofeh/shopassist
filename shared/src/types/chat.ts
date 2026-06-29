export interface ChatMessage {
    role: 'user' | 'assistant';
    content: string;
    createdAt: Date;
    id: string;
};

export interface ChatRequest {
    message: ChatMessage;
    history: ChatMessage[];
};