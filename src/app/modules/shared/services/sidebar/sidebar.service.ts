import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';

//Models
import { Sidebar } from './models/sidebar';

@Injectable({ providedIn: 'root' })
export class SidebarService {

    private sidebar = new Subject<any>();

    init(context: Sidebar) {
        this.sidebar.next(context);;
    }

    items(): Observable<any> {
        return this.sidebar.asObservable();
    }

}