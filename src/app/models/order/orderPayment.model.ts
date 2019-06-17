import { ECheckAccountType } from '../payment/eCheckAccountType.model';
import { ECheckType } from '../payment/eCheckType.model';
import { PaymentType } from '../payment/paymentType.model';
export class OrderPayment {
    Id: number;
    OrderId: number;
    PaymentTypeId: number;
    SaveCardId: number;
    CreditCardEndingWith: string;
    ECheckBankName: string;
    ECheckAccountNumber: string;
    ECheckRoutingNumber: string;
    ECheckNameOnAccount: string;
    ECheckAccountTypeId: number;
    ECheckTypeId: number;
    PayPalSuccessUrl: string;
    PayPalCancelUrl: string;
    PayPalPayerId: number;
    PayPalHeaderImg: string;
    PayPalLc: string;
    PayPalPayflowColor: string;
    ErrorCode: string;
    ErrorText: string;
    ResponseCode: string;
    TransactionId: string;
    AuthCode: string;
    ECheckAccountType: ECheckAccountType;
    ECheckType: ECheckType;
    PaymentType: PaymentType;
    IsDeleted:boolean;
    IsEdit:boolean;
    // TODO: need to add all the vm properties.
}