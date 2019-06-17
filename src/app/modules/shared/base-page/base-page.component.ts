import { TfrHelper } from '@app/modules/shared/helpers/tfr-helper';
import { TfrConstants } from '@app/modules/shared/constants/tfr-constants';
import { AfterViewInit, OnInit } from '@angular/core';
import { TfrGridService } from '@app/modules/shared/services/tfr-datatables/tfr.grid.service';
import { BaseHttpService } from '../services/http/baseHttpService';

// We can put all the duplicated codes we used on other pages in here.
export class BasePageComponent {

  constructor(public tfrHelper: TfrHelper,
    public tfrConstants: TfrConstants
  ) {

  }

  showErrorMessage(err: any, infoMessage: string) {
    this.tfrHelper.hideSpinner();
    console.log(err);
    const errMessage = this.tfrHelper.getErrorMessageFromResponse(err);
    this.tfrHelper.tfrSweetAlert('Ops!',
      `${infoMessage}<br>${errMessage}`,
      this.tfrConstants.tfrSweetAlertType.Error);
  }

  goBack = () => this.goBack();
}

export class BaseListPageComponent extends BasePageComponent implements AfterViewInit {

  public deleteId: number;
  public showActive = true;
  public isRefresh = false;
  public self: any;
  public columns = [];
  public columnDefs = [];
  private isInitialized = false;
  constructor(public tfrHelper: TfrHelper, public tfrConstants: TfrConstants,
    public tfrGridService: TfrGridService, public service: BaseHttpService<any> = null,
    public tableId: string, public entityName: string,
    public actionsColumnIndex = 0, public isAllowedAnonymous = true, public dataTableMethodType = 'post') {
    super(tfrHelper, tfrConstants);
    this.self = this;
  }

  ngAfterViewInit() {
    this.tfrHelper.showSpinner();
    this.generateTableStructure();
  }

  refresh(event: any) {
    this.tfrHelper.showSpinner();

    if (!this.isInitialized) {
      this.generateTableStructure();
      return;
    }

    this.isRefresh = true;
    this.generateTableStructure();
  }

  gridCallCompletedCallBack = () => {
    const that = this.self;
    $('.edit-icon').on('click', null, (e) => {
      const id = $(e.target).data('entityid');
      that.navigateTo(id);
    });
    $('.clone-icon').on('click', null, (e) => {
      const id = $(e.target).data('entityid');
      that.navigateToClone(id);
    });
    $('.delete-icon').on('click', null, (e) => {
      const id = $(e.target).data('dri-id');
      that.deleteConfirmation(id);
    });
  }
   
  gridLoadedCompletely = () => {
    this.isInitialized = true;
    this.tfrHelper.hideSpinner();
  }

  deleteConfirmation = (id: number) => {
    this.deleteId = id;
    this.tfrHelper.tfrSweetAlertConfirmationBox('Are you sure?', `You are about to delete a ${this.entityName}!`,
      this.tfrConstants.tfrSweetAlertType.Warning, this.confirmationCallBack,
      `${this.tfrHelper.capitalizeFirstLetter(this.entityName)} has been deleted successfully!`);
  }

  fetchGridData(dataTableRoute: string = null) {
    if (!dataTableRoute) {
      dataTableRoute = this.service.dataTableRoute;
    }

    this.tfrGridService.fetchGridData(
      this.isRefresh,
      this.dataTableMethodType,
      dataTableRoute,
      this.tableId,
      this.columns,
      this.tfrConstants.defaultPageLength,
      this.columnDefs,
      this.tfrConstants.defaultSortingColumnIndex,
      this.tfrConstants.defaultSortingDirection,
      null,
      this.gridCallCompletedCallBack,
      this.gridLoadedCompletely,
      this.isAllowedAnonymous,
      { 'IsActive': this.showActive },
      false);
  }

  confirmationCallBack = () => {
    this.tfrHelper.showSpinner();
    this.service.delete(this.deleteId).subscribe(
      response => this.refresh(null),
      err => this.showErrorMessage(err, `Failed to delete ${this.entityName} information!`),
      () => this.tfrHelper.hideSpinner()
    );
  }

  // override this in real page
  generateTableStructure() { }
}
