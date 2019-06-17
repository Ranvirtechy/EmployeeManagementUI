import { RestaurantMenu } from "./restaurantMenu.model";



export class RestaurantMenuListResponse {
  recordsTotal: number;
  recordsFiltered: number;
  draw: number;
  Data: RestaurantMenu[];
}
