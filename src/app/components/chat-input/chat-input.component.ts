import { Component, OnInit } from '@angular/core';
import { MessagesService } from 'src/app/services/messages/messages.service';
import { SessionService } from 'src/app/services/session/session.service';

@Component({
  selector: 'app-chat-input',
  templateUrl: './chat-input.component.html',
  styleUrls: ['./chat-input.component.scss'],
})
export class ChatInputComponent implements OnInit {
  constructor(public messagesService: MessagesService) {}

  ngOnInit(): void {}
}
