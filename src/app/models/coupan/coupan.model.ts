import { CouponType } from './couponType.model';
import { CouponUsageDetail } from './couponUsageDetail.model';
export class Coupan {
    Id: number;
    CouponTypeId: number;
    Name: string;
    Description: string;
    Code: string;
    StartDate: Date;
    ExpirationDate: Date;
    MinSpend: number;
    UsageLimitPerCoupon: number;
    UsageLimitPerUser: number;
    DiscountValue: number;
    FreezePoints: boolean;
    CreatedDate: Date;
    LastModifiedDate: Date;
    CreatedUserId: number;
    LastModifiedUserId: number;
    IsActive: boolean;
    CouponType: CouponType;
    CouponUsageDetails: CouponUsageDetail;
    // TODO: need to add all the vm properties.
}