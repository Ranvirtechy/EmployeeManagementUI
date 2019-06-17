import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { LoginRoutingModule } from './login.routing.module';
import { LoginComponent } from './login.component';
import { MatSlideToggleModule } from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    LoginRoutingModule,
    MatSlideToggleModule
  ],
  declarations: [LoginComponent]
})
export class LoginModule { }
