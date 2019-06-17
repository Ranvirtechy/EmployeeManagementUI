import { SavedPaymentCardModel } from "./SavedPaymentCards.model";
export class SavedCardListResponse {
    recordsTotal: number;
    recordsFiltered: number;
    draw: number;
  Data: SavedPaymentCardModel[];
}
