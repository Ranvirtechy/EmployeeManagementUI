import { OrderProduct } from "@app/models/order/orderProduct.model";
import { OrderProductAddon } from "@app/models/order/orderProductAddon.model";
import { OrderProductVariation } from "@app/models/order/orderProductVariation.model";
import { ProductAddon } from "@app/models/product/productAddon.model";
import { ProductVariation } from "@app/models/product/productVariation.model";
import { Product } from "@app/models/product/product.model";

export class OrderProductTabDto {
    CategoryId: number;
    CategoryName: string;
    IsProductExists: boolean;
    OrderProductDetailList: OrderProductModel[];
}

export class OrderProductModel extends OrderProduct {
    ProductAddonList: OrderProductAddon[];
    ProductVariationList: OrderProductVariation[];
}

export class EditProductPopupModel {
    OrderId: number;
    product: any;
    ProductCategoryModel: any;
    ProductAddonList: any;
    ProductVariationList: any;
    DrpProductList: Product[];
}