import { User } from "../user.model";

export class SavedPaymentCard {
    Id: number;
    UserId: number;
    CreditCardEndingWith: string;
    Token: string;
    NickName: string;
    CreatedDate: Date;
    LastModifiedDate: Date;
    CreatedUserId: number;
    LastModifiedUserId: number;
    IsActive: boolean;
    CreatedUser: User;
    LastModifiedUser: User;
    User: User;

}