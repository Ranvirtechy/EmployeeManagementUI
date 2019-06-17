export class Product {
  Id: number;
  Name: string;
  Description: string;
  Title: string;
  // RestaurantMenuId: number;
  // RestaurantMenuDescription: string;
  CuisinesId: number;
  CuisinesDescript: string;
  ProductCategoryId: number;
  ProductCategoryDescript: string;
  ShortDescript: string;
  Price: number;
  MinOrderQuantity: number;
  TaxPercent: number;
  Calorie: number;
  IsActive = true;
  ServingSize: string;
  LastModifiedDate: Date;
  LastModifyFirstname: string;
  LastModifyLastname: string;
  SpicyLevel?: number;
  IsGlutenFree: boolean;
  IsVegetarian: boolean;
  IsVegan: boolean;
  IsRedDescription: boolean;
  IsBoldDescription: boolean;
}
