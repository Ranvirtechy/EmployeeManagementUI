import { ProductAddonGroup } from "./productAddonGroup.model";

export class ProductAddon {
    Id: number;
    Name: string;
    Title: string;
    Description: string;

    ProductId: number;
    ProductAddonGroup: ProductAddonGroup;
    ProductAddonGroupId: number;
    ProductAddonGroupDescription: string;

    ProductAddonTypeId: number;
    Price: number;
    IsActive = true;
    IsRequired: boolean;

    LastModifiedDate: Date;
    LastModifyFirstname: string;
    LastModifyLastname: string;
}
