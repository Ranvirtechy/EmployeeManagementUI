import { ProductAddon } from "../product/productAddon.model";
import { ProductAddonGroup } from "../product/productAddonGroup.model";

export class OrderProductAddon {
    Guid: string;
    Id: number;
    OrderId: number;
    OrderProductId: number;
    ProductAddonGroupId: number;
    ProductAddonId: number;
    ProductAddonName: string;
    ProductAddonDescription: string;
    Quantity: number;
    ProductAddOnUnitPrice: number;
    ProductTaxPercent: number;
    SubTotalAmount: number;
    TaxAmount: number;
    TotalAmount: number;
    Instructions: string;
    IsDeleted: boolean;
    IsEdit: boolean;
    ProductAddon: ProductAddon;
    ProductAddonGroup: ProductAddonGroup;
    // TODO: need to add all the vm properties.
}