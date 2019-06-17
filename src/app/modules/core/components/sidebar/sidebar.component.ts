import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

//Services
import { SidebarService } from '../../../shared/services/sidebar/sidebar.service'

//Models
import { Sidebar } from '../../../shared/services/sidebar/models/sidebar';
import { SidebarItem } from '../../../shared/services/sidebar/models/sidebar.item';

@Component({
    selector: 'app-sidebar',
    templateUrl: 'sidebar.component.html'
})

export class SidebarComponent implements OnInit {

    sidebar: Sidebar = { name: undefined, items: new Array<SidebarItem>() };

    constructor(private sidebarService: SidebarService, private sanitizer: DomSanitizer) {
        this.subscribeSidebar();
    }

    ngOnInit() {

    }

    subscribeSidebar() {
        this.sidebarService.items().subscribe(result => {
            this.sidebar = result;
        })
    }

    

    sanitize(url: string) {
        return this.sanitizer.bypassSecurityTrustUrl(url);
    }

}