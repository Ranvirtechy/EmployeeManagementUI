export class ZipCode {
  Id: number;
  Code: number;
  CreatedDate: Date;
  LastModifiedDate: Date;
  CreatedUsername: string;
  LastModifiedUsername: string;
  TaxPercent: any;
  Description: string;
  ServingAreaIds: any[]=[];
  ServingAreaName: string;
  ServingAreaIdsWithCommaSeperated: string;
  IsActive: boolean;
}
