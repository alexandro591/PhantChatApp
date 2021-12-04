import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class MessagesService {
  currentMessage: string = '';
  messages: any[] = [];
  constructor() {}

  goToLatestMessage() {
    setTimeout(() => {
      (window as any).document.querySelector('app-chat-messages').scrollTop = (
        window as any
      ).document.querySelector('app-chat-messages').scrollHeight;
    }, 10);
  }

  addMessage(message: any) {
    this.messages.push({
      ...message,
      formattedDate: new Date(message.date).toLocaleString(),
    });
    this.messages.sort(
      (a: any, b: any) =>
        new Date(a.date).getTime() - new Date(b.date).getTime()
    );
    this.goToLatestMessage();
  }

  cleanMessages() {
    this.messages.length = 0;
  }
}
