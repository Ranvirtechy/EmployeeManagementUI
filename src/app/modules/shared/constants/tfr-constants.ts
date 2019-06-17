import { Injectable } from '@angular/core';
// import { Env } from 'environments/environment';
import { environment } from './../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})


export class TfrConstants {

  constructor() { }
  // URLs
  siteRootURL = environment.siteRootURL;
  internalApiRoot = environment.internalApiRoot;

  // RoutePrefixes:
  productRoutePrefix = 'product/';
  productCategoryRoutePrefix = 'productcategory/';
  cuisineRoutePrefix = 'cuisine/';
  restaurantCategoryRoutePrefix = 'restauranttype/';
  restaurantRoutePrefix = 'restaurant/';
  restaurantMenuRoutePrefix = 'restaurantmenu/';
  productAddonRoutePrefix = 'productaddon/';
  productAddonGroupRoutePrefix = 'productaddongroup/';
  productVariationRoutePrefix = 'productvariation/';
  productAdditionalFeeRoutePrefix = 'productadditionalfee/';
  additionalItemCategoryRoutePrefix = 'additionalitemcategory/';
  policyRoutePrefix = 'policy/';
  roleRoutePrefix = 'role/';
  userRoutePrefix = 'user/';
  additionalItemRoutePrefix = 'additionalitem/';
  gratuityPercentageRoutePrefix = 'gratuitypercentage/';
  emailTemplateRoutePrefix = 'emailtemplate/';
  couponRoutePrefix = 'coupon/';
  requestLogRoutePrefix = 'apirequest/';

  // Complete Routes:
  productEndPoint = this.internalApiRoot + this.productRoutePrefix;
  productCategoryEndPoint = this.internalApiRoot + this.productCategoryRoutePrefix;
  cuisineEndPoint = this.internalApiRoot + this.cuisineRoutePrefix;
  restaurantCategoryEndPoint = this.restaurantCategoryRoutePrefix;
  CategoryEndPoint = this.internalApiRoot + this.restaurantCategoryRoutePrefix;
  restaurantEndPoint = this.internalApiRoot + this.restaurantRoutePrefix;
  emailTemplateEndPoint = this.internalApiRoot + this.emailTemplateRoutePrefix;
  restaurantMenuEndPoint = this.internalApiRoot + this.restaurantMenuRoutePrefix;
  productAddonEndPoint = this.internalApiRoot + this.productAddonRoutePrefix;
  productAddonGroupEndPoint = this.internalApiRoot + this.productAddonGroupRoutePrefix;
  productVariationEndPoint = this.internalApiRoot + this.productVariationRoutePrefix;
  productAdditionalFeeEndPoint = this.internalApiRoot + this.productAdditionalFeeRoutePrefix;
  policyEndPoint = this.internalApiRoot + this.policyRoutePrefix;
  roleEndPoint = this.internalApiRoot + this.roleRoutePrefix;
  additionalItemCategoryEndPoint = this.internalApiRoot + this.additionalItemCategoryRoutePrefix;
  additionalItemEndPoint = this.internalApiRoot + this.additionalItemRoutePrefix;
  userEndPoint = this.internalApiRoot + this.userRoutePrefix;
  gratuityPercentageEndPoint = this.internalApiRoot + this.gratuityPercentageRoutePrefix;
  couponEndPoint = this.internalApiRoot + this.couponRoutePrefix;

  // TFR COMPANY INFORMATION
  companyName = 'The Food Runners, LLC';
  poBoxNumber = 'PO BOX 15532';
  city = 'Newport Beach';
  state = 'CA';
  zipCode = '92659';
  phone = '714-545-3663 - (ext) 105';
  accountingEmail = 'accounting@thefoodrunners.com';
  tfrWebSite = 'www.thefoodrunners.com';

  // TFR Default Date Format
  // defaultDateFormat = 'yyyy-MM-dd'; // to match with db date field for server side filtering
  // defaultDateTimeFormat = 'yyyy-MM-dd h:mm a'; // to match with db date field for server side filtering
  // dateFormatWithDay = 'MM-dd-yyyy EEEE'; // to match with db date field for server side filtering
  // dateFormatWithDayInParanthesis = 'MM-dd (EEE)'; // to match with db date field for server side filtering
  // dateFormatWithShortDay = 'MM-dd-yyyy EEE'; // to match with db date field for server side filtering
  defaultDateFormat = 'MM/dd/yyyy';
  defaultDateFormatFlatpicker = 'm/d/Y';
  defaultDateFormatFlatTimepicker = 'm/d/Y H:i';
  defaultDateTimeFormat = 'MM/dd/yyyy h:mm a';
  dateFormatWithDay = 'MM/dd/yyyy EEEE';
  dateFormatWithDayInParanthesis = 'MM/dd (EEE)';
  dateFormatWithShortDay = 'MM/dd/yyyy EEE';

  regexUrl = "/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g";

  // TFR App Settings
  defaultPageLength = 25;
  defaultSortingColumnIndex = 1;
  defaultSortingDirection = 'asc';
  requestIdHeaderKey = 'Api-Request-Id';

  deliveryFee = 7.98;

  // TFR ENUMS
  tfrPaymentType = {
    Check: { value: 0, text: 'Check' },
    CreditCard: { value: 1, text: 'Credit Card' },
    Cash: { value: 2, text: 'Cash' },
    ACH: { value: 3, text: 'ACH' }
  };

  tfrSpicyLevel = {
    NotSpicy: { value: 0, text: 'Not Spicy' },
    Mild: { value: 1, text: 'Mild' },
    Spicy: { value: 2, text: 'Spicy' },
    VerySpicy: { value: 3, text: 'Very Spicy' },
    ExtremelySpicy: { value: 4, text: 'Extremely Spicy' }
  };

  tfrTaxType = {
    PaidByResturant: { value: 1, text: 'Paid By Resturant' },
    PaidByTFR: { value: 2, text: 'Paid By TFR' }
  };

  tfrPaidStatus = {
    Paid: { value: 0, text: 'Paid' },
    Unpaid: { value: 1, text: 'Unpaid' }
  };

  tfrOrderStatus = {
    Created: { value: 1, text: 'Created' },
    Pending: { value: 2, text: 'Pending' },
    Completed: { value: 9, text: 'Completed' },
    Cancelled: { value: 10, text: 'Cancelled' }
  };

  tfrOrderChannel = {
    Online: { value: 1, text: 'Online' },
    Phone: { value: 2, text: 'Phone' }
  };

  resultCodes = {
    Successful: { value: 0, text: 'Operation completed successfully.' },
    UsernameAlreadyExist: { value: 1, text: 'Username already exist!' },
    OrderNumberAlreadyExist: { value: 2, text: 'Order number already exist!' },
    UnknownException: { value: 3, text: 'Operation failed! Err:#3' },
    ObjectDoesNotImplementCommonInterface: { value: 4, text: 'Operation failed! Err:#4' },
    NotFound: { value: 5, text: 'The record could not be found!' },
    RestaurantTypeAlreadyExist: { value: 6, text: 'Restaurant type already exist!' },
    RecordAlreadyExist: { value: 7, text: 'The record already exist!' },
    PaymentTypeDoesNotExist: { value: 8, text: 'Payment type does not exist!' },
    SmsNotSent: { value: 9, text: 'Sms could not be sent!' }
  };

  tfrSweetAlertType = {
    Success: 'success',
    Error: 'error',
    Warning: 'warning'
  };

  tfrFormOptionsEnum = {
    hideRequiredEnum: {
      yes: true,
      no: false
    },
    floatLabelEnum: {
      auto: 'auto',
      always: 'always',
      never: 'never'
    }
  };

  tfrFormOptions = {
    hideRequired: this.tfrFormOptionsEnum.hideRequiredEnum.no,
    floatLabel: this.tfrFormOptionsEnum.floatLabelEnum.auto
  };

  tfrDefaultAutoCompleteOnForms = true;

  tfrValidationMessages = {
    maximum: 'must be smaller!',
    minimum: 'must be bigger!',
    maxLengthExceeded: 'exceeded max length!',
    requiredField: 'this field is required!',
    notValidEmail: 'email entry is not a valid email!',
    notValidDate: 'date entry is not a valid date!',
    percentError: 'Value Can not be greater than 100',
    ratingError: 'Value Can not be greater than 5'
  };

  trfUserAddressType = {
    DiliveryAddress: 2,
    BillingAddress: 1
  };

  trfFeedbackCommentTypeIds = {
    DriverFeedback: 1,
    Representativefeedback: 2, RestaurentFeedback: 3
  };

  trfUserTypeIds = {
    SystemUser: 1,
    Employee: 2,
    Customer: 3,
    Restaurant: 4
  };

  CouponType = {
    FixedAmount: 1,
    Percentage: 2
  };

}

