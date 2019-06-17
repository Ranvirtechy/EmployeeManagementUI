import { NgModule } from '@angular/core';


import {TimetrackerListComponent} from './components/timetracker-list/timetracker-list.component';
import {TimetrackerEditComponent} from './components/timetracker-edit/timetracker-edit.component';
import { Routes, RouterModule } from '@angular/router';
import { AuthenticationGuard } from '../core/authentication/authentication.guard';

const routes: Routes = [
  { path: 'list', component: TimetrackerListComponent, canActivate: [AuthenticationGuard] },
  { path: 'create', component: TimetrackerEditComponent, canActivate: [AuthenticationGuard] },
  { path: 'edit/:id', component: TimetrackerEditComponent, canActivate: [AuthenticationGuard] }
];


@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule], providers: [AuthenticationGuard]
})
export class TimetrackerRoutingModule { }




