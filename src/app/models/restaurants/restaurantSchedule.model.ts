
export class RestaurantWorkingSchedule {
  Id: number= 0;
  RestaurantId: number=0;
  Day: any=0;
  fromHour: any=0;
  fromMinute: any=0;
  toHour: any=0;
  toMinute: any = 0;
  StartTime: string = '';
  EndTime: string = '';
  Mode: string='';
}
export class RestaurantClosedSchedule {
  Id: number= 0;
  RestaurantId: number=0;
  CloseDate:  Date;
  CloseHour: any=0;
  CloseMinute: any=0;
  ReOpenDate: Date;
  ReOpenHours: any=0;
  ReOpenMinutes: any=0;
  Description: any ='';
  StartTime: any='';
  EndTime: any = '';
  StartDate: any;
  EndDate: any;
  Mode: string='';
}
