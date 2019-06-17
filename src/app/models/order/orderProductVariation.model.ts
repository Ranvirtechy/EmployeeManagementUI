export class OrderProductVariation {
    Guid: string;
    Id: number;
    OrderId: number;
    OrderProductId: number;
    ProductVariationId: number;
    ProductVariationName: string;
    ProductVariationDescription: string;
    Quantity: number;
    ProductVariationUnitPrice: number;
    ProductTaxPercent: number;
    SubTotalAmount: number;
    TaxAmount: number;
    TotalAmount: number;
    Instructions: string;
    // TODO: need to add all the vm properties.
    IsDeleted: boolean;
    IsEdit: boolean;
}