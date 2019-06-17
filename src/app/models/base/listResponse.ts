interface ListResponse<T> {
    recordsTotal: number;
    recordsFiltered: number;
    draw: number;
    data: T[];
}
