import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NewSessionComponent } from './routes/new-session/new-session.component';
import { SessionComponent } from './routes/session/session.component';

const routes: Routes = [
  {
    path: 'site/:site/session/new',
    component: NewSessionComponent,
  },
  {
    path: 'site/:site/session/:session/:dbId',
    component: SessionComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
