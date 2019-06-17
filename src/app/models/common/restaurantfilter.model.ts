import { DropDownItem } from "../base/dropdownitem";

export class RestaurantFilterModel {
    deliveryDate: string;
    zipcode: number;    
}

export class DropDownRestaurantItemDto extends DropDownItem {
    AdditionalFeeAmount: number;
}