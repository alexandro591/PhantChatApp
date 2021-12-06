import { Injectable } from '@angular/core';
import { FirebaseService } from '../firebase/firebase.service';
import { ref, set, get, onChildAdded, update } from 'firebase/database';
import { uuid4 } from '../../../functions/uuid';
import { MessagesService } from '../messages/messages.service';

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
  sessionRef: any;
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

    this.sessionRef = ref(this.firebaseService.db, `/sessions/${this.uuid}`);

    let creatingSession = true;

    do {
      try {
        await set(this.sessionRef, {
          visitor: this.visitor,
          site: this.site,
          completed: false,
          createdAt: new Date().toISOString(),
          lastUpdated: new Date().toISOString(),
        });
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

    this.sessionRef = ref(this.firebaseService.db, `/sessions/${this.uuid}`);

    this.sessionVisitorRef = ref(
      this.firebaseService.db,
      `/sessions/${this.uuid}/visitor`
    );

    this.messagesRef = ref(
      this.firebaseService.db,
      `/sessions/${this.uuid}/messages`
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

  newMessageHandler(message: any) {
    this.messagesService.addMessage(message.val());
    this.messagesService.currentMessage = '';
  }

  sendMessage() {
    const messageText = this.messagesService.currentMessage.trim();
    const participantType = 'visitor';
    if (messageText) {
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
      update(this.sessionRef, {
        lastUpdated: new Date().toISOString(),
      });
    }
  }
}
