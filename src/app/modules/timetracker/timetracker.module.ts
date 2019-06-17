import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DataTablesModule } from 'angular-datatables';



import { TimetrackerRoutingModule } from './timetracker-routing.module';
import { TimetrackerEditComponent } from './components/timetracker-edit/timetracker-edit.component';
import { TimetrackerListComponent } from './components/timetracker-list/timetracker-list.component';

@NgModule({
  declarations: [TimetrackerEditComponent, TimetrackerListComponent],
  imports: [
    CommonModule,
    TimetrackerRoutingModule,
    SharedModule,
    FormsModule, ReactiveFormsModule,
    DataTablesModule
  ]
})
export class TimetrackerModule { }
