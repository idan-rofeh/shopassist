import { Component, ElementRef, ViewChild, WritableSignal, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

import type { ChatMessage, ChatRequest } from '@chatbot/shared';

import { ChatService } from '../../services/chat.service';

@Component({
  selector: 'app-chat',
  imports: [FormsModule],
  templateUrl: './chat.html',
  styleUrl: './chat.scss',
})
export class ChatComponent {
  @ViewChild('messageList') private readonly messageListRef?: ElementRef<HTMLElement>;

  private readonly chatService: ChatService = inject(ChatService);

  protected readonly messages: WritableSignal<ChatMessage[]> = signal<ChatMessage[]>([]);
  protected readonly draft: WritableSignal<string> = signal('');

  protected sendMessage(): void {
    const content: string = this.draft().trim();
    if (!content) {
      return;
    };

    const newMsg: ChatMessage = {
      id: crypto.randomUUID(),
      role: 'user',
      content,
      createdAt: new Date(),
    };

    const payload: ChatRequest = {
      history: this.messages(),
      message:newMsg,
    };

    this.addMsg(newMsg);

    this.chatService.sendMessage(payload).subscribe({
      next: (response: ChatMessage) => {
        this.addMsg(response);
      },
      error: (err: Error) => {
        console.error(err);
      },
    });

    this.draft.set('');
    this.scrollToBottom();
  };

  protected onKeydown(event: KeyboardEvent): void {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      this.sendMessage();
    }
  };

  private scrollToBottom(): void {
    queueMicrotask(() => {
      const element: HTMLElement | undefined = this.messageListRef?.nativeElement;
      if (element) {
        element.scrollTop = element.scrollHeight;
      }
    });
  };

  private addMsg(newMsg: ChatMessage): void {
    this.messages.update((current: ChatMessage[]) => [
      ...current,
      newMsg,
    ]);
  };
}
