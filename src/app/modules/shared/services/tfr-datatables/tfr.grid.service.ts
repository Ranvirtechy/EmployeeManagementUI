import { Injectable } from '@angular/core';
import * as $ from 'jquery';
import 'datatables.net';
import { ROOT_URL } from '../../../../models/config/config';


@Injectable({
  providedIn: 'root'
})

export class TfrGridService {

  constructor() { }

  // tfrRoot = this.tfrConstants.internalApiRoot;
  selectedRowID: number = null;

  fetchGridData = (isReset,
    requestType,
    uri,
    tableID,
    columns,
    pageLength,
    columnDefs,
    sortingColumnIndex,
    sortingDirection,
    rowCreatedCallBackAction,
    drawCallBackAction,
    initCompleteCallBack,
    isAllowedAnonymous,
    postedData,
    isServerSideProcessing) => {

    if (isReset) {
      const datatable = $('#' + tableID).DataTable();
      datatable.destroy();
    }

    // const endPoint = uri;
    const endPoint = ROOT_URL + uri;
    this.serverSideDataTable(
      requestType,
      endPoint,
      tableID,
      columns,
      pageLength,
      columnDefs,
      sortingColumnIndex,
      sortingDirection,
      rowCreatedCallBackAction,
      drawCallBackAction,
      initCompleteCallBack,
      isAllowedAnonymous,
      postedData,
      isServerSideProcessing
    );
  };

  serverSideDataTable = (type,
    url,
    tableID,
    columns,
    pageLength,
    columnDefs,
    sortingColumnIndex,
    sortingDirection,
    rowCreatedCallBack,
    drawCallBack,
    initCompleteCallBack,
    isAllowedAnonymous,
    postedData,
    isServerSideProcessing) => {

    if (!sortingColumnIndex) {
      sortingColumnIndex = 0;
    }

    if (!sortingDirection) {
      sortingDirection = 'desc';
    }

    try {
      const table = $('#' + tableID).DataTable({
        destroy: true, // to redraw the table but first make sure this option works well with serverside filtering.
        responsive: true,
        // scrollX: false,
        pageLength: (pageLength ? pageLength : 50),
        columns: columns,
        serverSide: isServerSideProcessing ? isServerSideProcessing : false,
        processing: isServerSideProcessing ? isServerSideProcessing : false,
        language: {
          processing: this.getLoadingHtml()
        },
        ajax: {
          url: url,
          type: type,
          data: postedData, dataSrc: "",
          // datatype: "json",
          beforeSend: (xhr) => {
            this.hideTableFiltering(tableID);
            if (!isAllowedAnonymous) {
              // todo: change this later
              xhr.setRequestHeader('Authorization',
                'Basic ' + btoa('usernamexxx' + ':' + 'passwordxxx'));
            }
          },
          error: (jqXhr, textStatus, errorThrown) => {
            if (jqXhr.status === 401) {
              const text =
                // tslint:disable-next-line:max-line-length
                'You do not have an access to this page or your session has been expired! <br/><br/>Or it might be just a timeout on server. You can try again.<br/><br/>If you still get this error, please login again! <br/><br/>err code:#401';
              const title = 'OPS!!';
              const saType = 'error';

            } else {
              const errorCode = jqXhr.status ? jqXhr.status : '999';
              const text = 'There was an error while fetching the data! Error Code: #' + errorCode;
              const title = 'OPS!!';
              const saType = 'error';

            }
          },
          complete: () => {
            //debugger;
            this.showTableFiltering(tableID);
          }
        },
        // deferLoading: totalRecords, // when you don't want to load grid right away.S
        columnDefs: columnDefs,
        'createdRow': (row, data, index) => {
          //debugger;
          // if ( data[5].replace(/[\$,]/g, '') * 1 > 150000 ) {
          //    $('td', row).eq(5).addClass('highlight');
          // }

          // if any call back action given, it needs to be defined in whatever the controller is calling
          if (rowCreatedCallBack) {
            rowCreatedCallBack($(row), data);
          }
        },
        'drawCallback': (settings) => {

          // if any call back action given, it needs to be defined in whatever the controller is calling
          if (drawCallBack) {
            drawCallBack(settings);
          }
        },
        initComplete:
          () => { // this callback is provided to let you know when the data is fully loaded.

            if (initCompleteCallBack) {
              initCompleteCallBack();
            } else {

              //  SHOWING SEARCH BOXES AT THE TOP
              const r = $('#' + tableID + ' tfoot tr');
              r.find('th').each(function () {
                $(this).css('padding', 8);
              });
              $('#' + tableID + ' thead').append(r);
              $('#search_0').css('text-align', 'center');
            }
          },
        order: [[sortingColumnIndex, sortingDirection]]
      });

      $('#' + tableID + ' tbody').on('click', 'tr', function () {
        if ($(this).hasClass('selected')) {
          $(this).removeClass('selected');
        } else {
          $('#' + tableID).DataTable().$('tr.selected').removeClass('selected');
          $('#' + tableID).DataTable().$('tr.selected').removeClass('selected');
          $(this).addClass('selected');
        }
        const cell = $('#' + tableID).DataTable().cell(this, 0);
        // self.setSelectedRowID(cell.data());
      });
      if (isServerSideProcessing) {
        const searchTextBox = $('div.dataTables_filter input');
        // add custom filtering button next to search box.
        searchTextBox.after(`&nbsp;<a href="#"
                class=""
                id ="filterButton"><i class="fa fa-search">&nbsp;Search</i></a>`);

        // unbind the default keyup event from the search input:
        searchTextBox.unbind();
        // bind event for search box to trigger with enter button
        searchTextBox[0].addEventListener('keyup', function (event) {
          // Cancel the default action
          event.preventDefault();
          // Number 13 is the "Enter" key on the keyboard
          if (event.keyCode === 13) {
            // Trigger the button element with a click
            $('#filterButton').click();
          }
        });

        // Cancel the enter button reload the page
        searchTextBox[0].addEventListener('keypress', function (event) {
          if (event.keyCode === 13) {
            event.preventDefault();
          }
        });

        // bind the custom filter button event
        $('#filterButton').on('click', function () {
          const myDataTable = $('#' + tableID).DataTable();
          const searchValue = $('.dataTables_filter input').text();
          myDataTable.search(searchValue).draw();
        });
      }


    } catch (e) {
      console.log('error in gridService:', e);
    }
  };

  getLoadingHtml = () => {
    const html = `<h3 style="background-color: white !important; color: #ad1f23 !important; top: -40%; position: absolute; left: 50%;">
                        <img data-src="assets/img//loading1.gif" />
                        Retrieving the data... Please wait...
                    </h3>`;

    return html;
  };

  hideTableFiltering = (tableID) => {
    $('#' + tableID + '_filter').css('opacity', '0');
    $('#' + tableID + '_paginate').css('opacity', '0');
    $('#' + tableID + '_length').css('opacity', '0');
    $('#' + tableID + ' thead').css('opacity', '0');
    return;

  };

  showTableFiltering = (tableID) => {
    $('#' + tableID + '_filter').css('opacity', '1');
    $('#' + tableID + '_paginate').css('opacity', '1');
    $('#' + tableID + '_length').css('opacity', '1');
    $('#' + tableID + ' thead').css('opacity', '1');
    return;
  };

  getStatusColumn = (value) => {
    const html = value === true
      ? `<label class="label label-success">Active</label>`
      : `<label class="label label-danger">Inactive</label>`;
    return html;
  };

  getActionsColumn = (v1, v2, v3, idValue: number | string, canEdit: boolean, canDelete: boolean, canDuplicate = false) => {
    //debugger;
    const iconRowStart = '<div class="icons-in-grid">';
    const iconUpdate = '<i style="padding-right:13px;" data-entityid="' +
      idValue +
      '" class="action-icon edit-icon fa fa-edit tfr-clickable"></i>';
    const iconDelete = '<a href="#" data-toggle="modal" data-target="#deleteModal"><i data-dri-id="' +
      idValue + '" data-entityid="' +
      idValue +
      '" class="action-icon delete-icon fa fa-trash-o tfr-clickable"></i></a>';


    const iconDuplicate = '<i style="padding-right:13px;" data-entityid="' +
      idValue +
      '" class="action-icon clone-icon fa fa-clone tfr-clickable"></i>';

    const iconRowClose = '</div>';
    let iconRow = iconRowStart;

    if (canDuplicate) {
      iconRow += iconDuplicate;
    }
    if (canEdit) {
      iconRow += iconUpdate;
    }

    if (canDelete) {
      iconRow += iconDelete;
    }

    iconRow += iconRowClose;

    return iconRow;
  };

  getActionsColumnForDisabled = (idValue: number | string, canEdit: boolean, canDelete: boolean, canReOrder = false, isCount: number = 0) => {


    const iconRowStart = '<div class="icons-in-grid">';
    const iconUpdate = '<i style="padding-right:13px;" data-entityid="' +
      idValue +
      '" class="action-icon edit-icon fa fa-edit tfr-clickable"></i>';
    let iconDelete = '<a href="#" data-toggle="modal" data-target="#deleteModal"><i data-dri-id="' +
      idValue + '" data-entityid="' +
      idValue +
      '" class="action-icon delete-icon fa fa-trash-o tfr-clickable"></i></a>';

    if (isCount > 0) {
      iconDelete = '<a href="#" data-toggle="modal" data-target="#deleteModal" title="This category has linked additional items. Please update the items to not to use this category, then try to delete it!"><i data-dri-id="' +
        idValue + '" data-entityid="' +
        idValue +
        '" class="action-icon  fa fa-trash-o tfr-clickable"></i></a>';

    }
    const iconReOrder = '<i style="padding-right:13px;" data-entityid="' +
      idValue +
      '" class="action-icon clone-icon fa fa-clone tfr-clickable"></i>';

    const iconRowClose = '</div>';
    let iconRow = iconRowStart;

    if (canReOrder) {
      iconRow += iconReOrder;
    }
    if (canEdit) {
      iconRow += iconUpdate;
    }

    if (canDelete) {
      iconRow += iconDelete;
    }

    iconRow += iconRowClose;

    return iconRow;
  };

  getActionsColumnForActive = (idValue, canEdit, canDelete, isActive: boolean) => {
    const iconRowStart = '<div class="icons-in-grid">';
    const iconUpdate = '<i style="padding-right:13px;" data-entityid="' +
      idValue +
      '" class="action-icon edit-icon fa fa-edit tfr-clickable"></i>';
    const iconDelete = '<a href="#" data-toggle="modal" data-target="#deleteModal"><i data-dri-id="' +
      idValue + '" data-entityid="' +
      idValue +
      '" class="action-icon delete-icon fa fa-trash-o tfr-clickable"></i></a>';
    const iconRowClose = '</div>';
    let iconRow = iconRowStart;

    if (canEdit) {
      iconRow += iconUpdate;
    }

    if (canDelete && isActive) {
      iconRow += iconDelete;
    }

    iconRow += iconRowClose;

    return iconRow;
  };

  getLastModifyUserName = (row) => {
    return `${row.LastModifyFirstname} ${row.LastModifyLastname}`;
  }

}
