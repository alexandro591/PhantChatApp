import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NewSessionComponent } from './routes/new-session/new-session.component';
import { SessionComponent } from './routes/session/session.component';

import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { ChatMessagesComponent } from './components/chat-messages/chat-messages.component';
import { ChatControlsComponent } from './components/chat-controls/chat-controls.component';
import { ChatInputComponent } from './components/chat-input/chat-input.component';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@NgModule({
  declarations: [
    AppComponent,
    NewSessionComponent,
    SessionComponent,
    ChatMessagesComponent,
    ChatControlsComponent,
    ChatInputComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatButtonModule,
    FormsModule,
    MatCardModule,
    MatIconModule,
    MatProgressSpinnerModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
