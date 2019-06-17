export class OrderProduct {
    Guid: string;
    Id: number;
    OrderId: number;
    ProductId: number;
    ProductName: string;
    ProductDescription: string;
    Quantity: number;
    ProductUnitPrice: number;
    ProductTaxPercent: number;
    ProductAdditionalFee: number;
    SubTotalAmount: number;
    TaxAmount: number;
    TotalAmount: number;
    Instructions: string;
    IsActive: boolean;
    IsDeleted: boolean;
    IsEdit: boolean;
    // TODO: need to add all the vm properties.
}