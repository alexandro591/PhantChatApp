import { Component, OnInit } from '@angular/core';
import { MessagesService } from 'src/app/services/messages/messages.service';

@Component({
  selector: 'app-chat-messages',
  templateUrl: './chat-messages.component.html',
  styleUrls: ['./chat-messages.component.scss'],
})
export class ChatMessagesComponent implements OnInit {
  messages: any = this.messagesService.messages;

  constructor(private messagesService: MessagesService) {}

  ngOnInit(): void {}
}
