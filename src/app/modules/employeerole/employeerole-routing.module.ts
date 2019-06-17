import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EmployeeroleListComponent } from './components/employeerole-list/employeerole-list.component';
import {EmployeeroleEditComponent } from './components/employeerole-edit/employeerole-edit.component';

const routes: Routes = [
  { path: 'EmployeeroleList/list', component: EmployeeroleListComponent },
  { path: 'EmployeeroleEdit', component: EmployeeroleEditComponent },
  { path: 'EmployeeroleEdit/edit/:id', component: EmployeeroleEditComponent }
];


@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmployeeroleRoutingModule { }

