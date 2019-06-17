import { Category } from './restaurant-category.model';

export class CategoryListResponse {
    recordsTotal: number;
    recordsFiltered: number;
    draw: number;
    Data: Category[];
}
