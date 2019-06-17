import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DataTablesModule } from 'angular-datatables';


import { EmployeeroleRoutingModule } from './employeerole-routing.module';
import { EmployeeroleEditComponent } from './components/employeerole-edit/employeerole-edit.component';
import { EmployeeroleListComponent } from './components/employeerole-list/employeerole-list.component';

@NgModule({
  declarations: [EmployeeroleEditComponent, EmployeeroleListComponent],
  imports: [
    CommonModule,
    EmployeeroleRoutingModule,
    SharedModule,
    FormsModule, ReactiveFormsModule, DataTablesModule
  ]
})
export class EmployeeroleModule { }



