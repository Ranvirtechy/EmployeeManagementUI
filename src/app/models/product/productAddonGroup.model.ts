export class ProductAddonGroup {
    Id: number;
    Name: string;
    Description: string;

    ProductId: number;
    ProductDescription: string;

    IsActive = true;
    IsRequired: boolean;

    LastModifiedDate: Date;
    LastModifyFirstname: string;
    LastModifyLastname: string;
}
