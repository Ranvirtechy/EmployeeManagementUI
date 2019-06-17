import { Restaurant } from './restaurant.model';

export class RestaurantListResponse {
    recordsTotal: number;
    recordsFiltered: number;
    draw: number;
    Data: Restaurant[];
}
