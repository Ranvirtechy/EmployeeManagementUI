import { Component, OnInit } from '@angular/core';

// Services
import { SidebarService } from '../../../shared/services/sidebar/sidebar.service';

// Enums
import { SidebarItemIconType } from '../../../shared/services/sidebar/enums/sidebar.item.icon.type';
import { TfrHttpService } from '@app/modules/shared/services/http/http.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  constructor(private sidebarService: SidebarService, private tfrHttpService: TfrHttpService) { }

  ngOnInit() {
    this.sidebarService.init({
      name: 'default',
      items: [
        {
          name: 'dashboard',
          displayName: 'Dashboard',
          description: 'TFR Dashboard',
          icon: 'fa fa-home',
          iconType: SidebarItemIconType.class,
          route: ''
        },
      //  new role 
       
      {
        name: 'Role',
        displayName: 'Role',
        description: undefined,
        icon: 'fa fa-key',
        iconType: SidebarItemIconType.class,
        route: undefined,
        subItems: [
          {
            name: 'Employeerole-list',
            displayName: 'Roles List',
            description: undefined,
            icon: 'fa fa-user-secret',
            iconType: SidebarItemIconType.class,
            route: 'employeerole/EmployeeroleList/list'
          },
          {
            name: 'Employeerole-edit',
            displayName: 'Roles Edit',
            description: undefined,
            icon: 'fa fa-unlock',
            iconType: SidebarItemIconType.class,
            route: 'employeerole/EmployeeroleEdit'
          },
          
        ]
        },
      //for registration components
        {
          name: 'Registration',
          displayName: 'Registration',
          description: undefined,
          icon: 'fa fa-key',
          iconType: SidebarItemIconType.class,
          route: undefined,
          subItems: [
            {
              name: 'Registration-list',
              displayName: 'Registration List',
              description: undefined,
              icon: 'fa fa-user-secret',
              iconType: SidebarItemIconType.class,
              route: 'registration/RegistrationList/list'
            },
            {
              name: 'Registration-edit',
              displayName: 'Registration Edit',
              description: undefined,
              icon: 'fa fa-unlock',
              iconType: SidebarItemIconType.class,
              route: 'registration/RegistrationEdit'
            },

          ]
        },
//registration components ends here.
        //{
        //  name: 'Login',
        //  displayName: 'Login',
        //  description: undefined,
        //  icon: 'fa fa-key',
        //  iconType: SidebarItemIconType.class,
        //  route: undefined,
        //  subItems: [
        //    {
        //      name: 'Login',
        //      displayName: 'Login',
        //      description: undefined,
        //      icon: 'fa fa-user-secret',
        //      iconType: SidebarItemIconType.class,
        //      route: 'login/login'
        //    }]
        //    },
       //login components ends here.
       
      
      ]
    });

  }
}
