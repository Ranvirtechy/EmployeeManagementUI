import { Cuisine } from './cuisine.model';

export class CuisineListResponse {
    recordsTotal: number;
    recordsFiltered: number;
    draw: number;
    Data: Cuisine[];
}
