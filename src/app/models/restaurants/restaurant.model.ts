
import { RestaurantWorkingSchedule, RestaurantClosedSchedule } from './restaurantSchedule.model';
import { UserNote } from '../userNote.model';
export class Restaurant {
  Id: number = 0;
  Name: string = '';
  StoreCode: string = '';
  Description: string = '';
  Image: string = '';
  PointsMultiplier: number;
  IsInHouse: boolean = false;
  ContactPersonName: string = '';
  MinOrderFullfilment: number;
  MaxNumberOfDaysAhead: number;
  IsActive: boolean = false;
  PhoneNumber: string = '';
  PhoneNumber2: string = '';
  FaxNumber: string = '';
  FaxNumber2: string = '';
  AddressDescription1: string = '';
  AddressDescription2: string = '';
  City: string = '';
  State: string = '';
  ZipCode: number;
  CreatedDate: any = new Date();
  LastModifiedDate: any = new Date();
  CreatedUserId: number = 0;
  LastModifiedUserId: number = 0;
  CreatedUserUsername: string = '';
  LastModifiedUsername: string = '';
  RestaurantMenuId: number;
  RestaurantTypeId: number;
  RestaurantType: string = '';
  RestaurantNotificationTime: number;
  MinDeliveryTime: number;
  OrderNotificationTypeId: number;
  Rating: number;
  AdditionalFeeAmount: number;
  TaxPaidByTypeId: number;
  TaxPaidByType: string = '';
  ServingAreaId: number = 0;
  ServingAreaIds: any = [];
  ServingArea: string = '';
  EmailAddress: string = '';
  EmailAddress2: string = '';
  RestaurantCuisineIds: any = [];
  HasRestaurantAnyNote: boolean = false;
  RestaurantNotes: UserNote[] = [];
  ServingAreaNameWithCommaSeperated: string = '';
  ServingAreaIdWithCommaSeperated: string = '';
  RestaurantCuisineIdsWithCommaSeperated: string = '';
  RestaurantCuisineNameWithCommaSeperated: string = '';
  RestaurantWorkingSchedule: RestaurantWorkingSchedule[] = [];
  RestaurantClosedSchedule: RestaurantClosedSchedule[] = [];
  IsAsapEnabled: boolean;
  MinDeliveryIncDecTypeId: number = 0;
  IsSuccess: boolean;
  EligibilityFoodSubtotalAmount: number = 0;
  IsGiftCardInsteadOfPoint: boolean = false;
  GiftAmount: number = 0;
}
