import { User } from "./user.model";
import { ZipCode } from "./zipCode.model";

export class UserAddress {

  constructor() {
    this.AddressDescription1 = "";
    this.AddressDescription2 = "";
    this.AddressName = null;
  }
  Id: any=0;
  UserId: number=0;
  AddressTypeId: number=0;
  AddressType: string='';
  AddressName: string='';
  FirstName: string='';
  LastName: string='';
  CompanyName: string='';
  AddressDescription1: string='';
  AddressDescription2: string='';
  City: string='';
  State: string='';
  ZipCodeId: number=0;
  PhoneNumber: string='';
  EmailAddress: string='';
  IsDefault: boolean=false;
  IsActive: boolean=false;
  CreatedDate: Date;
  UserModel: User = new User();
  ZipCodeModel: ZipCode = new ZipCode();
  LastModifiedDate: Date;
  CreatedUserId: any=0;
  LastModifiedUserId: any=0;
  CreatedUserName: any='';
  LastModifiedUserName: any='';
  IsDeleted: boolean=false;
}
