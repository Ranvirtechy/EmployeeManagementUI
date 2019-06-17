export class RestaurantMenu {
  Id: number;
  Name: string;
  Description: string;
  Icon: string;
  ParentId?: number;
  ParentMenuDescription: string;
  LastModifiedDate: Date;
  LastModifyFirstname: string;
  LastModifyLastname: string;
  RestaurantNameWithCommaSeperated: string;
  RestaurantIdsWithCommaSeperated: string;
  RestaurantIds: any = [];
  ParentRestaurantMenuName: string;
  ProductIds: any = [];
  ProductNameWithCommaSeperated: string;
}
