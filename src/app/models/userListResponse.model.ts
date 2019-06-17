import { User } from './user.model';

export class UserListResponse {
    recordsTotal: number;
    recordsFiltered: number;
    draw: number;
    Data: User[];
}
