export class AccountType {
    Id: number;
    Name: string;
    Description: string;
    PointsMultiplier: number;
    IsPointEnabled: boolean;    // TODO: need to add all the vm properties.
    IsActive: boolean;
    CustomerIds: any[] = [];
    AccountTypeToUpdate: number;
}