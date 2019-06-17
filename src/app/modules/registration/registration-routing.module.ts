import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import {RegistrationListComponent} from './components/registration-list/registration-list.component';
import {RegistrationEditComponent} from './components/registration-edit/registration-edit.component';

const routes: Routes = [
  { path: 'RegistrationList/list', component: RegistrationListComponent},
  { path: 'RegistrationEdit', component: RegistrationEditComponent},
  { path: 'RegistrationEdit/edit/:id', component: RegistrationEditComponent}
];



@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]

})
export class RegistrationRoutingModule { }


