import { Router, type Request, type Response } from 'express';
import type { ChatMessage, ChatRequest } from '@chatbot/shared';
import { ChatService } from '../services/chat.service';

const router = Router();

router.post('/', async (req: Request, res: Response) => {
    const body = req.body as ChatRequest;

    //TODO: Validate the message
    const response = await ChatService.generateReply(body);

    // const response: ChatMessage = {
    //     content:`Echo: ${body.message.content}`,
    //     role: 'assistant',
    //     id: crypto.randomUUID(),
    //     createdAt: new Date(),
    // };

    res.status(200).json(response);
});

export default router;