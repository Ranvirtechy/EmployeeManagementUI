import { AccountType } from './accountType.model';

export class AccountTypeListResponse {
    recordsTotal: number;
    recordsFiltered: number;
    draw: number;
    Data: AccountType[];
}
