import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [

    {
    path: '',
    loadChildren: '../dashboard/dashboard.module#DashboardModule' 
    } ,
   

    {
      path: 'employeerole',
      loadChildren: '../employeerole/employeerole.module#EmployeeroleModule'
     },

  {
    path: 'registration',
    loadChildren: '../registration/registration.module#RegistrationModule'
  },

  {
    path: 'login',
    loadChildren: '../login/login.module#LoginModule'
  },

  //RegistrationModule

];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class CoreRoutingModule { }

