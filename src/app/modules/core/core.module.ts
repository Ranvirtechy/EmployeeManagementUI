import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { DatePipe } from '@angular/common';

import { CoreRoutingModule } from './core.routing.module';
import { SharedModule } from '../shared/shared.module';

//Components
import { HeaderComponent } from './components/header/header.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';

import { HttpClientModule } from '@angular/common/http';
import { TfrHttpService } from '../shared/services/http/http.service';
import { TfrGridService } from '../shared/services/tfr-datatables/tfr.grid.service';
import { TfrHelper } from '../shared/helpers/tfr-helper';
import { TfrConstants } from '../shared/constants/tfr-constants';
import { TfrValidator } from '../shared/helpers/tfr-validator';
import { AuthenticationService } from './authentication/authentication.service';
import { HttpModule } from '@angular/http';

@NgModule({
    imports: [
        CommonModule,
        CoreRoutingModule,
        SharedModule,HttpModule
    ],
    declarations: [
        HeaderComponent,
        SidebarComponent
    ],
    exports: [
        RouterModule,
        HeaderComponent,
        SidebarComponent,
        HttpClientModule
  ],
  providers: [TfrHttpService, TfrGridService, DatePipe, TfrHelper, TfrConstants, TfrValidator, AuthenticationService],
    entryComponents: []
})
export class CoreModule { }
