import { Order } from "./order.model";

export class OrderListResponse {
    recordsTotal: number;
    recordsFiltered: number;
    draw: number;
    Data: Order[];
}