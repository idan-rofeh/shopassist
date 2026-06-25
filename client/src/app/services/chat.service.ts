import { HttpClient } from '@angular/common/http';
import { Injectable , inject} from '@angular/core';
import { Observable, map } from 'rxjs';

import type { ChatMessage, ChatRequest } from '@chatbot/shared';
import { API_URL } from '../../../environment';

@Injectable({
    providedIn: 'root'
})

export class ChatService {
    private readonly http = inject(HttpClient);

    sendMessage (payload: ChatRequest): Observable<ChatMessage> {
        return this.http
            .post<ChatMessage>(`${API_URL}/chat`, payload);
    };
};
