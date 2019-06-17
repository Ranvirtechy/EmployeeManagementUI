import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DataTablesModule } from 'angular-datatables';


import { RegistrationRoutingModule } from './registration-routing.module';
import { RegistrationEditComponent } from './components/registration-edit/registration-edit.component';
import { RegistrationListComponent } from './components/registration-list/registration-list.component';

@NgModule({
  declarations: [RegistrationEditComponent, RegistrationListComponent],
  imports: [
    CommonModule,
    RegistrationRoutingModule,
    SharedModule,
    FormsModule, ReactiveFormsModule,
    DataTablesModule
  ]
})
export class RegistrationModule { }
