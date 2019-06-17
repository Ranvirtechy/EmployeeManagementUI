import { Component, OnInit } from '@angular/core';
import { DashBoardDataModel } from '../../../../models/dashBoardData.model';
import { DashboardService } from '../../dashboard.service';
import { TfrHelper } from '../../../shared/helpers/tfr-helper';
import * as _ from 'lodash';
import { TfrGridService } from '../../../shared/services/tfr-datatables/tfr.grid.service';
import { TfrConstants } from '../../../shared/constants/tfr-constants';
import { Router } from '@angular/router';

import { Registration } from '../../../../models/registration/Registration.model';
import { RegistrationService } from '../../../registration/registration.service';



@Component({
  selector: 'main',
  templateUrl: 'main.component.html'
})

export class MainComponent implements OnInit {

  Registration = new Registration();
  deleteRegistrationId: boolean;


  dashboardData: DashBoardDataModel = new DashBoardDataModel();
  showClosedRestaurants: boolean = false;
  showTotalOrders: boolean = false;
  tableIdCards = { tblRestaurants: 'tblRestaurants', tblOrders: 'tblOrders' };
  selectedPostedDataForCards: any;
  selectedTableIdForCards: any;
  isRefresh = false;
  columns = [];
  tableId = 'tblRestaurants';
  columnDefs = [];
  actionsColumnIndex = 0;
  dataTableMethodType = 'post';
  showActive: boolean = false;
  logoColumnIndex: 0;
  self: any;

  constructor(private _dashboardDataService: DashboardService, private tfrHelper: TfrHelper, private tfrGridService: TfrGridService, private tfrConstants: TfrConstants, private router: Router, private registrationService: RegistrationService) {
    this.self = this;
  }

  ngOnInit()
  {
    //this.getDashboardCardsInfo();
    //this.generateTableStructure();
  }

  // from here registration page started.
  ngAfterViewInit() {
    this.generateTableStructure();
  }

  generateTableStructure() {
    //debugger;
    this.columns = [
      // instead of title you can also define the headers in html as well. This just gives a dynamic naming for headers.


      {
        data: 'Actions', name: 'Actions', title: 'Actions',
        render: (data, type, row) => this.tfrGridService.getActionsColumn(data, row, type, row.id, true, true), class: 'width-5'
      },

      { data: 'id', name: 'id', title: 'Employee Id', class: 'width-5' },


      { data: 'name', name: 'name', title: 'Name', class: 'width-5' },

      { data: 'password', name: 'password', title: 'Password', class: 'width-5' },
      { data: 'roleid', name: 'roleid', title: 'Role Id', class: 'width-5' },
      { data: 'dateOfJoining', name: 'DateOfJoining', title: 'Date of Joining', class: 'width-5' },
      { data: 'designation', name: 'designation', title: 'Designation', class: 'width-5' },
      { data: 'phone', name: 'phone', title: 'Phone', class: 'width-5' },
      { data: 'dateOfBirth', name: 'dateOfBirth', title: 'Date of Birth', class: 'width-5' },


      { data: 'addressDescription1', name: 'AddressDescription1', title: 'Address Description1', class: 'width-5' },
      { data: 'addressDescription2', name: 'AddressDescription2', title: 'Address Description2', class: 'width-5' },
      { data: 'city', name: 'city', title: 'City', class: 'width-5' },


      { data: 'state', name: 'state', title: 'State', class: 'width-5' },
      { data: 'zipCode', name: 'zipCode', title: 'Zip Code', class: 'width-5' },


    ];


    this.columnDefs = null;
    this.columnDefs = [
      {
        className: 'dt-centered-column',
        targets: [13]
      },
      {
        targets: [0],//disable sorting on logo column 
        orderable: false
      }
       ];

    this.tfrGridService.fetchGridData(
      false,
      'get',
      'Registration/get',
      'tblRegistration',
      this.columns,
      10,
      this.columnDefs,
      0,
      'asc',
      null,
      this.gridDrawCompletedCallBack,
      this.gridLoadedCompletely,
      true,
      null,
      false);

  }

  gridDrawCompletedCallBack = () => {
    const that = this.self; // get the class instance
    // bind the action column event when dynamic content is generated 
    $('.edit-icon').on('click', null, (e) => {

      const RegistrationId = $(e.target).data('entityid');
      that.navigateTo(RegistrationId);


    });

    $('.delete-icon').on('click', null, (e) => {
      // debugger;

      const Registration_DeleteId = $(e.target).data('dri-id');
      that.deleteConfirmation(Registration_DeleteId);
    });

  }
  navigateTo = (RegistrationId) => {
    //debugger;
    this.router.navigateByUrl(`registration/RegistrationEdit/edit/${RegistrationId}`);
  }


  gridLoadedCompletely() {

  }

  navigateToCreateNew = () => {
    //debugger;
    this.router.navigateByUrl(`registration/RegistrationEdit`);
    // this.toastrService.success('Thank you', 'You successfully redirected to Department');
  }



  deleteConfirmation = (Registration_DeleteId) => {
    debugger;
    this.deleteRegistrationId = Registration_DeleteId;
    this.confirmationCallBack();
  }

  confirmationCallBack = () => {
    debugger;

    this.registrationService.deleteRegistrationRecord(this.deleteRegistrationId).subscribe(
      savedRegistrationRecordById => this.sDeleteRegistrationRecord(savedRegistrationRecordById),
      err => this.fSaveServingArea(err)
    );
  }




  sDeleteRegistrationRecord(savedRegistrationRecordById) {
    //console.log(savedRegistrationRecordById);
    this.generateTableStructure();
    //this.toastrService.warning('Record is deleted Successfully');
  }

  fSaveServingArea(err) {
    const errMessage = err && err.Message ? '</br>Error Message:</br>' + err.Message : '';
    // this.toastrService.warning('Error While  deleting the Record');
  }


  //registration list end here




  //getDashboardCardsInfo() {
  //  //this.tfrHelper.showSpinner();
  //  this._dashboardDataService.getDashboardCardsInfo().subscribe(
  //    response => this.getDashboardCardsInfoSuccess(response),
  //    err => this.getDashboardCardsInfoFailiur(err),
  //    () => this.getAlways()
  //  );
  //}
  getAlways() {
    this.tfrHelper.hideSpinner();
  }
  getDashboardCardsInfoSuccess(response) {
    this.dashboardData = response.Data;
  }
  getDashboardCardsInfoFailiur(err) {

  }
  generateTableStructureForOrders(type) {
    //this.selectedPostedDataForCards = _.cloneDeep(postData);
    this.selectedTableIdForCards = "tblOrders";
    this.columns = [

      { data: 'OrderNumber', name: 'OrderNumber', title: 'Order Number', render: (data, type, row) => this.tfrHelper.tfrClickOpen(row.OrderNumber, row.Id), class:'width-8' },
      { data: 'OrderStatusId', name: 'OrderStatusId', title: 'Status Name', render: (value) => this.tfrHelper.getOrderStatusName(value), class: 'width-8' },
      { data: 'RestaurantName', name: 'RestaurantName', title: 'Restaurant Name', render: (value) => this.tfrHelper.nullSafeString(value), class: 'width-20' },
      { data: 'CustomerName', name: 'CustomerName', title: 'Customer Name', render: (value) => this.tfrHelper.nullSafeString(value), class: 'width-15'},
      { data: 'TaxAmount', name: 'TaxAmount', title: 'Tax Amount', render: (value) => this.tfrHelper.tfrMoneyDisplay(value), class: 'width-10'},
      { data: 'TotalAmount', name: 'TotalAmount', title: 'Total Amount', render: (value) => this.tfrHelper.tfrMoneyDisplay(value), class: 'width-9'},
      { data: 'DeliveryDate', name: 'DeliveryDate', title: 'Delivery Date', render: (value) => this.tfrHelper.nullSafeString(value), class: 'width-12' },
      { data: 'DeliveryTime', name: 'DeliveryTime', title: 'Delivery Time', render: (value) => this.tfrHelper.nullSafeString(value), class: 'width-12'}
    ];

    this.columnDefs = null;
    this.columnDefs = [
      {
        className: 'dt-centered-column',
        targets: [7]
      },
      {
        targets: [this.actionsColumnIndex],
        orderable: false
      }
    ];

    this.tfrGridService.fetchGridData(
      this.isRefresh,
      this.dataTableMethodType,
      this._dashboardDataService.dataTableGetDashBoardOrdersCardsDetailsRoute,
      "tblOrders",
      this.columns,
      this.tfrConstants.defaultPageLength,
      this.columnDefs,
      this.tfrConstants.defaultSortingColumnIndex,
      this.tfrConstants.defaultSortingDirection,
      null,
      this.gridDrawCompletedCallBackForOrders,
      this.gridLoadedCompletely,
      false,
      { "OrderType": type},
      false);
  }

  generateTableStructureForRestaurents(CurrentlyClosedRestaurants) {

    this.selectedTableIdForCards = "tblRestaurants";
    this.columns = [
      // instead of title you can also define the headers in html as well. This just gives a dynamic naming for headers.
      //{
      //  data: 'Actions', name: 'Actions', title: 'Actions',
      //  render: (data, type, row) => this.tfrGridService.getActionsColumn(row.Id, false, false)
      //},
      {
        data: 'IsActive', name: 'IsActive', title: 'Status',
        render: (value) => this.tfrGridService.getStatusColumn(value)
      },
      { data: 'Name', name: 'Name', title: 'Name', render: (data, type, row) => this.tfrHelper.tfrClickOpen(row.Name,row.Id) },
      { data: 'StoreCode', name: 'StoreCode', title: 'Store Code', render: (value) => this.tfrHelper.nullSafeString(value) },
      { data: 'Description', name: 'Description', title: 'Description', render: (value) => this.tfrHelper.nullSafeString(value) },
      { data: 'Image', name: 'Image', title: 'Logo', render: (value) => this.tfrHelper.getLogoFromPath(value) },
      { data: 'PointsMultiplier', name: 'PointsMultiplier', title: 'Points Multiplier', render: (value) => this.tfrHelper.nullSafeString(value) },
      { data: 'ContactPersonName', name: 'ContactPersonName', title: 'Contact Person', render: (value) => this.tfrHelper.nullSafeString(value) },

      { data: 'IsInHouse', name: 'IsInHouse', title: 'In House', render: (value) => this.tfrHelper.tfrBoolToText(value) },
      { data: 'MinOrderFullfilment', name: 'MinOrderFullfilment', title: 'Min. Order', render: (value) => this.tfrHelper.tfrMoneyDisplay(value) },
      { data: 'MinDeliveryTime', name: 'MinDeliveryTime', title: 'Min. Delivery', render: (value) => this.tfrHelper.tfrMoneyDisplay(value) },
      { data: 'MaxNumberOfDaysAhead', name: 'MaxNumberOfDaysAhead', title: '# Days Ahead', render: (value) => this.tfrHelper.nullSafeString(value) },
      { data: 'PhoneNumber', name: 'PhoneNumber', title: 'Phone Number', render: (value) => this.tfrHelper.tfrClickToCall(value) },
      { data: 'FaxNumber', name: 'FaxNumber', title: 'Fax Number', render: (value) => this.tfrHelper.tfrClickToCall(value) },
      { data: 'FaxNumber2', name: 'FaxNumber2', title: 'Fax Number 2', render: (value) => this.tfrHelper.tfrClickToCall(value) },
      { data: 'AddressDescription1', name: 'AddressDescription1', title: 'Address Description 1', render: (value) => this.tfrHelper.nullSafeString(value) },
      { data: 'AddressDescription2', name: 'AddressDescription2', title: 'Address Description 2', render: (value) => this.tfrHelper.nullSafeString(value) },
      { data: 'Street', name: 'Street', title: 'Street', render: (data, type, row) => this.tfrHelper.getStreetAdress(row) },
      { data: 'City', name: 'City', title: 'City', render: (value) => this.tfrHelper.nullSafeString(value) },
      { data: 'State', name: 'State', title: 'State', render: (value) => this.tfrHelper.nullSafeString(value) },
      { data: 'ZipCodeId', name: 'ZipCodeId', title: 'ZipCode', render: (value) => this.tfrHelper.nullSafeString(value) },
      { data: 'RestaurantMenuName', name: 'RestaurantMenuName', title: 'Restaurant Menu', render: (value) => this.tfrHelper.nullSafeString(value) },
      { data: 'RestaurantTypeName', name: 'RestaurantTypeName', title: 'Restaurant Type', render: (value) => this.tfrHelper.nullSafeString(value) },
      { data: 'RestaurantNotificationTime', name: 'RestaurantNotificationTime', title: 'Notification Time', render: (value) => this.tfrHelper.nullSafeString(value) },
      { data: 'Rating', name: 'Rating', title: 'Rating', render: (value) => this.tfrHelper.getRating(value) },
      { data: 'AdditionalFeeAmount', name: 'AdditionalFeeAmount', title: 'Additional Fee', render: (value) => '$' + this.tfrHelper.tfrMoneyDisplay(value) },
      { data: 'TaxPaidByTypeName', name: 'TaxPaidByTypeName', title: 'Tax Paid By', render: (value) => this.tfrHelper.nullSafeString(value) },
      { data: 'ServingAreaNameWithCommaSeperated', name: 'ServingAreaNameWithCommaSeperated', title: 'Serving Areas', render: (value) => this.tfrHelper.nullSafeString(value) },
      { data: 'EmailAddress', name: 'EmailAddress', title: 'EmailAddress', render: (value) => this.tfrHelper.nullSafeString(value) },
      { data: 'EmailAddress2', name: 'EmailAddress2', title: 'EmailAddress2', render: (value) => this.tfrHelper.nullSafeString(value) },
      { data: 'RestaurantCuisineName', name: 'RestaurantCuisineName', title: 'Cuisines', render: (value) => this.tfrHelper.nullSafeString(value) },
      { data: 'PointsMultiplier', name: 'PointsMultiplier', title: 'Points Multiplier', render: (value) => this.tfrHelper.nullSafeString(value) },
      {
        data: 'PhoneNumber2', name: 'PhoneNumber2', title: 'PhoneNumber 2',
        render: (value) => this.tfrHelper.tfrClickToCall(value)
      },
      {
        data: 'CreatedDate', name: 'CreatedDate', title: 'Created On',
        render: (value) => this.tfrHelper.tfrDateTimeDisplay(value)
      },
      {
        data: 'CreatedUserName', name: 'CreatedUserName', title: 'Created By',
        render: (value) => this.tfrHelper.nullSafeString(value)
      },

      {
        data: 'LastModifiedDate', name: 'LastModifiedDate', title: 'Last Modified On',
        render: (value) => this.tfrHelper.tfrDateTimeDisplay(value)
      }, {
        data: 'LastModifiedUserName', name: 'LastModifiedUserName', title: 'Last Modified By',
        render: (value) => this.tfrHelper.nullSafeString(value)
      }
      , {
        data: 'OrderNotificationTypeName', name: 'OrderNotificationTypeName', title: 'Order Notification Type',
        render: (value) => this.tfrHelper.nullSafeString(value)
      },
      { data: 'IsAsapEnabled', name: 'IsAsapEnabled', title: 'Asap Enabled', render: (value) => this.tfrHelper.tfrBoolToText(value) },
      { data: 'IsFeatured', name: 'IsFeatured', title: 'Featured', render: (value) => this.tfrHelper.tfrBoolToText(value) },
    ];

    this.columnDefs = null;
    this.columnDefs = [
      {
        className: 'dt-centered-column',
        targets: [10]
      },
      {
        targets: [this.actionsColumnIndex],//disable sorting on actions column 
        orderable: false
      },
      {
        targets: [this.logoColumnIndex],//disable sorting on logo column 
        orderable: false
      }
    ];
    this.tfrGridService.fetchGridData(
      this.isRefresh,
      this.dataTableMethodType,
      this._dashboardDataService.dataTableGetDashBoardRestaurantCardsDetailsRoute,
      "tblRestaurants",
      this.columns,
      this.tfrConstants.defaultPageLength,
      this.columnDefs,
      this.tfrConstants.defaultSortingColumnIndex,
      this.tfrConstants.defaultSortingDirection,
      null,
      this.gridDrawCompletedCallBackForRestaurents,
      this.gridLoadedCompletely,
      false,
      null,
      false);
     

  }
  gridDrawCompletedCallBackForOrders = () => {
    const that = this.self;
    $('.show-link').on('click', null, (e) => {
       
      const restaurantId = e.currentTarget.id.trimLeft().trimRight();
      that.navigateToOrders(restaurantId);
    });
  }
  gridDrawCompletedCallBackForRestaurents = () => {
    const that = this.self;
    $('.show-link').on('click', null, (e) => {
       
      const restaurantId = e.currentTarget.id.trimLeft().trimRight();
      that.navigateToRestaurant(restaurantId);
    });
  }
  navigateToRestaurant = (restaurantId) => {
    this.router.navigateByUrl(`/restaurants/edit/${restaurantId}`);
  }
  navigateToOrders = (restaurantId) => {
    this.router.navigateByUrl(`/orders/edit/${restaurantId}`);
  }
  //gridLoadedCompletely = () => {

  //}
  showOrders(type) {
    this.showTotalOrders = true;
    this.showClosedRestaurants = false;
    //this.tfrHelper.showSpinner();
    setTimeout(function (val) { this.generateTableStructureForOrders(type); }.bind(this), 1);
  }
  showRestaurents() {
    this.showClosedRestaurants = true;
    this.showTotalOrders = false;
    //this.tfrHelper.showSpinner();
    setTimeout(function (val) { this.generateTableStructureForRestaurents(); }.bind(this), 1);
  }
}
