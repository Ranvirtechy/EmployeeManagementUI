import { Injectable, Sanitizer } from '@angular/core';
import Swal from 'sweetalert2';
import { TfrConstants } from '../constants/tfr-constants';
import { DatePipe, Location } from '@angular/common';
import flatpickr from 'flatpickr'; // https://flatpickr.js.org/examples/
import * as _ from 'lodash';
import { ToastrService } from 'ngx-toastr';// https://www.npmjs.com/package/ngx-toastr
import { Router } from '@angular/router';

// import { CurrencyPipe } from '@angular/common';
// import { Env } from '@app//src/environments/environment';


@Injectable({
  providedIn: 'root'
})

export class TfrHelper {
  constructor(private tfrConstants: TfrConstants
    , private $dateFilter: DatePipe
    , private toastr: ToastrService
    , private location: Location,

    // , private $currencyFilter: CurrencyPipe
    // , private env: Env
  ) { }

  goBack = () => this.location.back();
  showSpinner = () => {
    $('.container-fluid').append(`<div class="tfr-spinner"> 
                                        <img class="tfr-spinner-head" src="./../../../../assets/img/spinners/spinner-up.png"> 
                                        <img class="tfr-spinner-mustache" src="./../../../../assets/img/spinners/spinner-down.png">
                                        <span data-text="Loading..." class="tfr-loading-text">Loading...</span>
                                    </div>
        `);
  }
  hideSpinner = () => {
    $('.tfr-spinner').remove();
  }

  generateDateInput = (elementId, optionsJson) => {
    if (optionsJson) {
      flatpickr('#' + elementId, optionsJson);
    }
    else {
      flatpickr('#' + elementId,
        {
          dateFormat: this.tfrConstants.defaultDateFormatFlatpicker,
          weekNumbers: true
        });
    }

  }

  generateDateTimeInput = (elementId, optionsJson) => {
    if (optionsJson) {
      flatpickr('#' + elementId, optionsJson);
    }
    else {
      flatpickr('#' + elementId,
        {
          dateFormat: this.tfrConstants.defaultDateFormatFlatTimepicker,
          weekNumbers: true,
          enableTime: true
        });
    }

  }

  getErrorMessageFromResponse = (err) => {
    let resolvedErrorMessage = `<br/>Error Message:<br/><ul>`;
    if (err && err.error && err.error.Messages) {
      _.forEach(err.error.Messages, (message) => {
        resolvedErrorMessage += `<li>${message.Details}</li>`;
      });
      resolvedErrorMessage += '</ul>';
      return resolvedErrorMessage;
    }
    resolvedErrorMessage = 'unresolved error response!</ul>';
    return resolvedErrorMessage;
  }

  getLogoFromPath =

    (path) => {
      let logo = `<img src="${path}" class="tfr-grid-logo"/>`;
      return logo;
    }
  getImageFromPath = (path) => {
    let imageUrl = this.tfrConstants.siteRootURL + path;
    let image = `<img src="${imageUrl}" width=80 height=80/>`;
    return image;

  }
  getStreetAdress =
    (data) => {
      return `${data.AddressDescription1} ${data.AddressDescription2}`;
    }

  getRestaurantCuisines =
    (restaurantCuisines) => {
      let cuisines = '';
      _.forEach(restaurantCuisines, function (restaurantCuisine) {
        cuisines = cuisines + restaurantCuisine.Name + ',';
      });

      if (cuisines.length > 0) {
        cuisines = cuisines.substring(0, cuisines.length - 1);
      }
      return cuisines;
    }

  getRating =
    (value) => {
      let ratingDiv = `<div class="" style="display: -webkit-inline-box;">`;
      for (let i = 0; i < value; i++) {
        ratingDiv = ratingDiv + `<img src="assets/img/icoMBlackSmall.png">`;
      }

      for (let i = 0; i < (5 - value); i++) {
        ratingDiv = ratingDiv + `<img src="assets/img/icoMGraySmall.png">`;
      }
      ratingDiv = ratingDiv + `</div>`;
      return ratingDiv;
    }

  getPaymentTypeText =
    (paymentTypeVal): string => {
      let paymentTypeText = '';
      if (this.tfrConstants.tfrPaymentType.Check.value === paymentTypeVal) {
        paymentTypeText = this.tfrConstants.tfrPaymentType.Check.text;
      } else if (this.tfrConstants.tfrPaymentType.CreditCard.value === paymentTypeVal) {
        paymentTypeText = this.tfrConstants.tfrPaymentType.CreditCard.text;
      } else if (this.tfrConstants.tfrPaymentType.Cash.value === paymentTypeVal) {
        paymentTypeText = this.tfrConstants.tfrPaymentType.Cash.text;
      } else if (this.tfrConstants.tfrPaymentType.ACH.value === paymentTypeVal) {
        paymentTypeText = this.tfrConstants.tfrPaymentType.ACH.text;
      }

      return paymentTypeText;
    }

  getTaxTypeText =
    (taxTypeVal) => {
      let taxTypeText = '';
      if (this.tfrConstants.tfrTaxType.PaidByResturant.value === taxTypeVal) {
        taxTypeText = this.tfrConstants.tfrTaxType.PaidByResturant.text;
      } else if (this.tfrConstants.tfrTaxType.PaidByTFR.value === taxTypeVal) {
        taxTypeText = this.tfrConstants.tfrTaxType.PaidByTFR.text;
      }

      return taxTypeText;
    }

  getPaymentTypeList =
    () => [
      {
        Text: this.tfrConstants.tfrPaymentType.Check.text,
        Value: this.tfrConstants.tfrPaymentType.Check.value
      },
      {
        Text: this.tfrConstants.tfrPaymentType.CreditCard.text,
        Value: this.tfrConstants.tfrPaymentType.CreditCard.value
      },
      {
        Text: this.tfrConstants.tfrPaymentType.Cash.text,
        Value: this.tfrConstants.tfrPaymentType.Cash.value
      },
      {
        Text: this.tfrConstants.tfrPaymentType.ACH.text,
        Value: this.tfrConstants.tfrPaymentType.ACH.value
      },
    ]

  getOrderStatusList =
    () => [
      {
        Text: this.tfrConstants.tfrOrderStatus.Created.text,
        Value: this.tfrConstants.tfrOrderStatus.Created.value
      },
      {
        Text: this.tfrConstants.tfrOrderStatus.Pending.text,
        Value: this.tfrConstants.tfrOrderStatus.Pending.value
      },
      {
        Text: this.tfrConstants.tfrOrderStatus.Completed.text,
        Value: this.tfrConstants.tfrOrderStatus.Completed.value
      }
    ]

  getOrderStatusName =
    (statusVal) => {
      let orderStatusText = '';
      if (this.tfrConstants.tfrOrderStatus.Created.value === statusVal) {
        orderStatusText = this.tfrConstants.tfrOrderStatus.Created.text;
      } else if (this.tfrConstants.tfrOrderStatus.Pending.value === statusVal) {
        orderStatusText = this.tfrConstants.tfrOrderStatus.Pending.text;
      } else if (this.tfrConstants.tfrOrderStatus.Completed.value === statusVal) {
        orderStatusText = this.tfrConstants.tfrOrderStatus.Completed.text;
      }
      else if (this.tfrConstants.tfrOrderStatus.Cancelled.value === statusVal) {
        orderStatusText = this.tfrConstants.tfrOrderStatus.Cancelled.text;
      }

      return orderStatusText;
    }

  getOrderChannelList =
    () => [
      {
        Text: this.tfrConstants.tfrOrderChannel.Online.text,
        Value: this.tfrConstants.tfrOrderChannel.Online.value
      },
      {
        Text: this.tfrConstants.tfrOrderChannel.Phone.text,
        Value: this.tfrConstants.tfrOrderChannel.Phone.value
      }
    ]

  getOrderChannelName =
    (channelVal) => {
      let channelText = '';
      if (this.tfrConstants.tfrOrderChannel.Online.value === channelVal) {
        channelText = this.tfrConstants.tfrOrderChannel.Online.text;
      } else if (this.tfrConstants.tfrOrderChannel.Phone.value === channelVal) {
        channelText = this.tfrConstants.tfrOrderChannel.Phone.text;
      }

      return channelText;
    }

  getPaidStatus =
    (paidStatusVal) => {
      let paidStatusText = '';
      if (this.tfrConstants.tfrPaidStatus.Paid.value === paidStatusVal) {
        paidStatusText = this.tfrConstants.tfrPaidStatus.Paid.text;
      } else if (this.tfrConstants.tfrPaidStatus.Unpaid.value === paidStatusVal) {
        paidStatusText = this.tfrConstants.tfrPaidStatus.Unpaid.text;
      }

      return paidStatusText;
    }

  tfrBoolValue =
    (text) => {
      return (text && text.toString().toLowerCase() === 'true');
    }

  tfrClickToCall =
    (text) => {
      text = text ? text : '';
      return `<a href="tel:${text}" class='phone'>${text}</a>`;
    }

  tfrBoolToText =
    (text) => {
      return ((text && text.toString().toLowerCase() === 'true') ?
        `<label class="label label-success">Yes</label>` :
        `<label class="label label-danger">No</label>`);
    }
  getProductDescription = (row) => {
    if (row.IsRedDescription && row.IsBoldDescription) {
      var value = `<div class="color-red-and-bold" >
      ${row.Description}
      </div>`;
      return value;
    } else if (row.IsRedDescription && !row.IsBoldDescription) {
      var value = `<div class="only-red" >
      ${row.Description}
      </div>`;
      return value;
    } else if (!row.IsRedDescription && row.IsBoldDescription) {
      var value = `<div class="only-bold" >
      ${row.Description}
      </div>`;
      return value;
    } else {
      var value = `<div>
      ${row.Description}
      </div>`;
      return value;
    }
  }

  tfrShowMoreIcon = (row, name, test) => {
    console.log(row);

    var value = `<div class="container1"  [ngClass]="[show: show]" >
      ${row}
      </div>`
    if (row != '' && row.length > 30) {
      row = ',' + row;
      value = value + '<a href="javascript:void(0)"  style="cursor: pointer !important;" data-dr-value="' + row + '" data-dr-name="' + name + '" class="show-more tfr-clickable">Show More...</a>';
    }
    return value;
  }

  nullSafeString =
    (str) => {

      return (str == null ? '' : str);
    }

  nullSafeNumber =
    function (nmb) {
      return (nmb == null ? 0 : nmb);
    };
  tfrClickOpen =
    (text, value) => {
      text = text ? text : '';
      return `<a id="
      ${value}" style="cursor: pointer !important;" class='show-link' >${text}</a>`;
    }

  tfrMoneyDisplay =
    (mny) => {
      return (mny != undefined && mny != null) ? `$${mny.toLocaleString('en-EN')}` : "";
      // return mny.toLocaleString('en');
      // return this.$dateFilter('currency')(mny, '$', 2);
      // return true; // this.$currencyFilter(mny, '$', 2);
      // return this.$dateFilter('currency')(mny, '$', 2);
    }

  tfrPercentDisplay =
    (value) => {
      return (value != undefined && value != null) ? `${value.toLocaleString('en-EN')}%` : "";
    }

  tfrDateDisplayFromString =
    (dte) => {
      if (dte === '') {
        return dte;
      }

      return this.$dateFilter.transform(new Date(dte), this.tfrConstants.defaultDateFormat);
    }

  tfrDateDisplay =
    (dte) => {
      return this.$dateFilter.transform(dte, this.tfrConstants.defaultDateFormat);
    }

  tfrDateDisplayWithDay =
    (dte) => {
      return this.$dateFilter.transform(dte, this.tfrConstants.dateFormatWithDay);
    }

  tfrDateDisplayWithShortDay =
    (dte) => {
      return this.$dateFilter.transform(dte, this.tfrConstants.dateFormatWithShortDay);
    }

  tfrDateDisplayWithDayInParanthesis =
    (dte) => {
      return this.$dateFilter.transform(dte, this.tfrConstants.dateFormatWithDayInParanthesis);
    }

  tfrDateTimeDisplay =
    (dte) => {
      return this.$dateFilter.transform(dte, this.tfrConstants.defaultDateTimeFormat);
    }

  tfrDateTimeDisplayFromString =
    (dte) => {
      if (dte === '') {
        return dte;
      }

      return this.$dateFilter.transform(new Date(dte), this.tfrConstants.defaultDateTimeFormat);
    }

  tfrConvertStringToDate =
    (dteString) => {
      return new Date(dteString);
    }

  // showSpinner =
  //     function () {
  //         $('<div id="load"></div>').insertBefore($('#page-content-wrapper'));
  //         const target = document.getElementById('load');
  //         const spinner = new Spinner(opts).spin(target);
  //     };

  // hideSpinner =
  //     function () {
  //         $('#load').remove();
  //         return;
  //     };

  textToBool =
    (text) => {
      return text && text.toLowerCase() === 'true';
    }

  clearTimezone =
    (d) => {
      return d.toString().replace(/^(?:\d\d\d\d-\d\d-\d\dT)?\d\d:\d\d(?::\d\d(?:\.\d+)?)?$/,
        function ($0) {
          const offset = (new Date).getTimezoneOffset(),
            hours = Math.floor(Math.abs(offset) / 60),
            minutes = Math.abs(offset) % 60,
            sign = offset <= 0 ? '+' : '-',
            tz = (sign + (hours * 100 + minutes))
              .replace(/^([-+])(\d\d\d)$/, '$10$2');

          return $0 + tz;
        });
    }

  tfrSweetAlert = (title, text, type) => {
    if (type === this.tfrConstants.tfrSweetAlertType.Error) {
      text = `<strong style="color:#ff565b">${text}</strong>`;
    }
    else if (type === this.tfrConstants.tfrSweetAlertType.Success) {
      text = `<strong style="color:#1cca1c">${text}</strong>`;
    }

    Swal(title, text, type);
  }
  tfrToaster = (title, text, type) => {
    if (type === this.tfrConstants.tfrSweetAlertType.Success) {
      this.toastr.success(text, title);
    }
    else if (type === this.tfrConstants.tfrSweetAlertType.Warning) {
      this.toastr.warning(text, title);
    }
    else if (type === this.tfrConstants.tfrSweetAlertType.Error) {
      this.toastr.error(text, title);
    }
  }
  tfrSweetAlertWithTimer = (title, type, timer) => {
    Swal(
      {
        position: 'top-end',
        type: type,
        width: 400,
        title: title,
        showConfirmButton: false,
        timer: timer
      });
  }

  tfrSweetAlertConfirmationBox = (title, text, type, confirmCallBack, deleteConfirmationText) => {
    Swal({
      title: title ? title : 'Are you sure?',
      text: text,
      type: type ? type : 'warning',
      showCancelButton: true,
      confirmButtonColor: '#ff565b',
      cancelButtonColor: '#636360',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.value) {
        confirmCallBack();
        Swal(
          'Deleted!',
          deleteConfirmationText,
          'success'
        );
      }
    });
  }
  tfrSweetAlertConfirmationBoxwithHtml = (title, html, type, confirmCallBack, deleteConfirmationText) => {
    Swal({
      title: title ? title : 'Are you sure?',
      html: html,
      type: type ? type : 'warning',
      showCancelButton: true,
      confirmButtonColor: '#ff565b',
      cancelButtonColor: '#636360',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.value) {
        confirmCallBack();
        Swal(
          'Deleted!',
          deleteConfirmationText,
          'success'
        );
      }
    });
  }
  tfrSweetAlertConfirmationYesNoBox = (title, text, type, callBack) => {
    Swal({
      title: title ? title : 'Are you sure?',
      text: text,
      type: type ? type : 'warning',
      showCancelButton: true,
      confirmButtonColor: '#ff565b',
      cancelButtonColor: '#636360',
      confirmButtonText: 'Yes'
    }).then((result) => {
      callBack(result);
    });
  }
  tfrSweetAlertConfirmationOkCancel = (title, text, callBack, html) => {
    Swal({
      title: title ? title : 'Are you sure?',
      text: text,
      html: html,
      showCancelButton: true,
      confirmButtonColor: '#ff565b',
      cancelButtonColor: '#636360',
      confirmButtonText: 'Ok'
    }).then((result) => {
      callBack(result);
    });
  }

  getUserTypes = () => {
    return [
      { text: 'Super  Admin', value: 1 },
      { text: 'Customer', value: 2 },
      { text: 'Admin', value: 3 },
      { text: 'VIP Customer', value: 4 },
      { text: 'Phone User', value: 5 },
      { text: 'House Account', value: 6 },
      { text: 'VIP & House', value: 7 },
      { text: 'Employee', value: 8 },
    ];
  }

  getAddonTypes = () => {
    return [
      { text: 'Singular Choice', value: 1 },
      { text: 'Multiple Choice', value: 2 },
    ];
  }

  getSpicyLevels = () => {
    return [
      { value: null, text: '-' },
      { value: 0, text: 'Not Spicy' },
      { value: 1, text: 'Mild' },
      { value: 2, text: 'Spicy' },
      { value: 3, text: 'Very Spicy' },
      { value: 4, text: 'Extremely Spicy' }
    ];
  }

  getSpicyLevelByValue = (value?: number) => {
    if (value === undefined || value === null) {
      return { value: null, text: ' - ' };
    }
    const types = this.getSpicyLevels();
    const type = _.find(types, { value });
    return type;
  }

  getAddonTypeByValue = (value: number) => {
    const types = this.getAddonTypes();
    const type = _.find(types, { value });
    return type;
  }

  getUserTypeByValue = (value) => {
    const userTypes = this.getUserTypes();
    const userType = _.find(userTypes, { value });
    return userType;
  }

  getUserTypeByText = (text) => {
    const userTypes = this.getUserTypes();
    const userType = _.find(userTypes, { text });
    return userType;
  }
  getFilenameFromUrl(url) {
    if (url) {
      return url.split('/').pop();
    }
    return "";
  }
  generateGUID = () => {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
      var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }
  showErrorMessage(err: any, infoMessage: string) {
    this.hideSpinner();
    console.log(err);
    const errMessage = this.getErrorMessageFromResponse(err);
    this.tfrSweetAlert('Ops!',
      `${infoMessage}<br>${errMessage}`,
      this.tfrConstants.tfrSweetAlertType.Error);
  }


  getDecimalNumber = (number) => {
    if (number)
      return Number(parseFloat(number).toFixed(2));
    else
      return 0;
  }
  capitalizeFirstLetter = (string: string) => string.charAt(0).toUpperCase() + string.slice(1);

  getCopyObject = (obj: any) => {
    return _.cloneDeep(obj);
  }

  toHidden = (obj: any, id: string) => {
    const data = encodeURIComponent(JSON.stringify(obj));
    return `<input id="${id}" type="hidden" value="${data}">`;
  }

  toObj<T>(inputId: string) {
    const dataStr = $('#' + inputId).val() as string;
    return JSON.parse(decodeURIComponent(dataStr)) as T;
  }

}
