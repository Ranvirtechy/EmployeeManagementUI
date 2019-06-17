export class EmailTemplateVm {
  Id: number;
  Name: string;
  From : string;
  Subject : string;
  Body : string;
  UserType : number;
  UserIds : number[];
  UpdateTemplate: boolean;
}
