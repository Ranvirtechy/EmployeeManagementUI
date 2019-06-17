import { UserNote } from './userNote.model';
import { UserAddress } from './userAddress.model';
export class User {
  Id: number;
  Firstname: string;
  Lastname: string;
  CreatedDate: Date;
  LastModifiedDate: Date;
  PhoneNumber: string;
  CellPhone: string;
  BusinessPhone: string;
  IsActive: boolean;
  EmailAddress: string;
  CompanyName: string;
  DateOfBirth: string;
  IsNewsletterActive: boolean;
  TotalEarnedPoints: number;
  TotalRedeemedPoints: number;
  AvailablePoints: number;
  PointsMultiplier: number;
  AccountTypeName: string;
  AccountSpecialistUserId: number;
  CreatedUserId: number;
  AccountSpecialistUsername: string;
  CreatedUserUsername: string;
  LastModifiedUsername: string;
  ReferenceUserUsername: string;
  Username: string;
  UserPassword: string;
  IsPointEnabled: boolean;
  AccountTypeId: number;
  UserTypeId: number;
  UserNotes: UserNote[];
  UserAddresses: UserAddress[];
  HasUserAnyNote: boolean;
  UserSelectedDiliveryAddress: any  ;
  UserSelectedBillingAddress: any  ;
  // TODO: need to add all the vm properties.
}
