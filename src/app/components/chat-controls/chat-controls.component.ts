import { Component, OnInit } from '@angular/core';
import { SessionService } from 'src/app/services/session/session.service';

@Component({
  selector: 'app-chat-controls',
  templateUrl: './chat-controls.component.html',
  styleUrls: ['./chat-controls.component.scss'],
})
export class ChatControlsComponent implements OnInit {
  constructor(private sessionService: SessionService) {}

  ngOnInit(): void {}

  sendMessage() {
    this.sessionService.sendMessage();
  }
}
