import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SessionService } from 'src/app/services/session/session.service';

@Component({
  selector: 'app-session',
  templateUrl: './session.component.html',
  styleUrls: ['./session.component.scss'],
})
export class SessionComponent implements OnInit {
  constructor(
    private activatedRoute: ActivatedRoute,
    public sessionService: SessionService
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params: any) => {
      if (!this.sessionService.initialized)
        this.sessionService.init(
          params.site,
          params.session,
          parseInt(params.dbId)
        );
    });
  }
}
