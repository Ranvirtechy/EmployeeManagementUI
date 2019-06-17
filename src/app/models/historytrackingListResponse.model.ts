import { Historytracking } from "./historytracking.model";

export class HistorytrackingListResponse {
    recordsTotal: number;
    recordsFiltered: number;
    draw: number;
    Data: Historytracking[];
}
