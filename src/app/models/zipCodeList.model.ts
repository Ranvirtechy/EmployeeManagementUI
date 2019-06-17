import { ZipCode } from "./zipCode.model";
import { DropDownItem } from "./base/dropdownitem";





export class ZipCodeListResponse {
    recordsTotal: number;
    recordsFiltered: number;
    draw: number;
    Data: ZipCode[];
}

export class ZipcodeModel extends DropDownItem {
    TaxPercent: number;
}
