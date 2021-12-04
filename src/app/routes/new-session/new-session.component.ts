import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FirebaseService } from 'src/app/services/firebase/firebase.service';
import { SessionService } from 'src/app/services/session/session.service';
import { uuid4 } from '../../../functions/uuid';

@Component({
  selector: 'app-new-session',
  templateUrl: './new-session.component.html',
  styleUrls: ['./new-session.component.scss'],
})
export class NewSessionComponent implements OnInit {
  visitor: any = { uuid: uuid4() };
  site: string = '';
  creatingSession: boolean = false;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private sessionService: SessionService,
    private activatedRoute: ActivatedRoute,
    private firebaseService: FirebaseService
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      this.site = params.site;
      if (this.sessionService.initialized) {
        this.router.navigate(
          [`../${this.sessionService.uuid}/${this.firebaseService.dbId}`],
          {
            relativeTo: this.route,
          }
        );
      }
    });
  }

  async startChat() {
    this.creatingSession = true;
    await this.sessionService.create(this.visitor, this.site);
    this.creatingSession = false;
    this.router.navigate(
      [`../${this.sessionService.uuid}/${this.firebaseService.dbId}`],
      {
        relativeTo: this.route,
      }
    );
  }
}
