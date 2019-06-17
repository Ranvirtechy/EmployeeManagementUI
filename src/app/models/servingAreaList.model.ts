import { ServingArea } from "./servingArea.model";

 

export class ServingAreaListResponse {
    recordsTotal: number;
    recordsFiltered: number;
    draw: number;
    Data: ServingArea[];
}
