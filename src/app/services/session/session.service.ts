import { Injectable } from '@angular/core';
import { FirebaseService } from '../firebase/firebase.service';
import { ref, set, get, onChildAdded, update } from 'firebase/database';
import { uuid4 } from '../../../functions/uuid';
import { MessagesService } from '../messages/messages.service';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class SessionService {
  uuid: string = '';
  visitor: any = {};
  operator: any = {};
  initialized: boolean = false;
  site: string = '';
  messagesRef: any;
  sessionVisitorRef: any;

  constructor(
    private firebaseService: FirebaseService,
    private messagesService: MessagesService
  ) {}

  async create(visitor: any, site: string) {
    this.visitor = visitor;
    this.site = site;
    this.uuid = uuid4();
    this.firebaseService.dbInit({});

    const sessionRef = ref(
      this.firebaseService.db,
      `/sessions/${this.site}/${this.uuid}`
    );

    let creatingSession = true;

    do {
      try {
        await set(sessionRef, { visitor: this.visitor });
        creatingSession = false;
      } catch (error) {
        creatingSession = true;
      }
    } while (creatingSession);
    return;
  }

  async init(site: string, uuid: string, dbId: number) {
    this.site = site;
    this.uuid = uuid;
    this.firebaseService.dbInit({ dbId });

    this.sessionVisitorRef = ref(
      this.firebaseService.db,
      `/sessions/${this.site}/${this.uuid}/visitor`
    );

    this.messagesRef = ref(
      this.firebaseService.db,
      `/sessions/${this.site}/${this.uuid}/messages`
    );

    onChildAdded(this.messagesRef, (messageSnapshot: any) => {
      this.newMessageHandler(messageSnapshot);
    });

    do {
      try {
        this.visitor = await (await get(this.sessionVisitorRef)).val();
        this.initialized = true;
        if (!this.visitor) {
          (window as any).sendPhantSession('new');
          return ((
            window as any
          ).document.location.href = `/site/${this.site}/session/new`);
        }
      } catch (error) {
        this.initialized = false;
      }
    } while (!this.initialized);
    (window as any).sendPhantSession(
      `${this.uuid}/${this.firebaseService.dbId}`
    );
    return;
  }

  async newMessageHandler(message: any) {
    this.messagesService.addMessage(message.val());
    this.messagesService.currentMessage = '';
  }

  async sendMessage() {
    const messageText = this.messagesService.currentMessage.trim();
    const participantType = environment.debug
      ? ['visitor', 'operator'][Math.floor(Math.random() * 2)]
      : 'visitor';
    if (messageText)
      update(this.messagesRef, {
        [uuid4()]: {
          text: messageText,
          date: new Date().toISOString(),
          participant: {
            type: participantType,
            uuid: this.visitor.uuid,
          },
        },
      });
  }
}
