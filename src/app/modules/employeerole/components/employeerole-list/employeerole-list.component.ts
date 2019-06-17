import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { TfrGridService } from '@app/modules/shared/services/tfr-datatables/tfr.grid.service';

import { Role } from '../../../../models/role/role.model ';
import { EmployeeroleService } from '../../employeerole.service';

@Component({
  selector: 'app-employeerole-list',
  templateUrl: './employeerole-list.component.html',
  styleUrls: ['./employeerole-list.component.css']
})
export class EmployeeroleListComponent implements OnInit {


  columns: any = [];
  columnDefs: any = [];
  self;
  Role = new Role();

  deleteRoleId: boolean;
  constructor(private router: Router,
    private tfrGridService: TfrGridService,
    private roleService: EmployeeroleService,
  ) { this.self = this; }

  ngOnInit() {
  }


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

      { data: 'id', name: 'id', title: 'Role id', class: 'width-5' },


      { data: 'name', name: 'name', title: 'Name', class: 'width-5' },

    ];

    this.columnDefs = null;
    this.columnDefs = [
      {
        className: 'dt-centered-column',
        targets: [2]
      },
      {
        targets: [0],//disable sorting on logo column 
        orderable: false
      }
      // {
      //     targets: [this.actionsColumnIndex],//disable sorting on Actions column 
      //     orderable: false
      // },
      // {
      //     targets: [this.idColumnIndex],//hide ID column
      //     visible: false
      // },
      // {
      //     targets: [this.logoColumnIndex],//disable sorting on logo column 
      //     orderable: false 
      // }
    ];

    this.tfrGridService.fetchGridData(
      false,
      'get',
      'Role/get',
      'tblRole',
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

      const RoleId = $(e.target).data('entityid');
      debugger;
      that.navigateTo(RoleId);
      //this.toastrService.success('Thank you', 'You successfully redirected to Edit the Record having Id' + DepartmentId);


    });

    $('.delete-icon').on('click', null, (e) => {
      debugger;

      const Role_DeleteId = $(e.target).data('dri-id');
      that.deleteConfirmation(Role_DeleteId);
    });

  }


  navigateTo = (RoleId) => {
    //debugger;
    this.router.navigateByUrl(`employeerole/EmployeeroleEdit/edit/${RoleId}`);
  }


  gridLoadedCompletely() {

  }

  navigateToCreateNew = () => {
    //debugger;
    this.router.navigateByUrl(`employeerole/EmployeeroleEdit`);
    // this.toastrService.success('Thank you', 'You successfully redirected to Department');
  }



  deleteConfirmation = (Role_DeleteId) => {
    debugger;
    this.deleteRoleId = Role_DeleteId;
    this.confirmationCallBack();
  }

  confirmationCallBack = () => {
    debugger;

    this.roleService.deleteRoleRecord(this.deleteRoleId).subscribe(
      savedRoleRecordById => this.sDeleteRoleRecord(savedRoleRecordById),
      err => this.fSaveServingArea(err)
    );
  }




  sDeleteRoleRecord(savedRoleRecordById) {
    console.log(savedRoleRecordById);
    this.generateTableStructure();
    //this.toastrService.warning('Record is deleted Successfully');
  }

  fSaveServingArea(err) {
    const errMessage = err && err.Message ? '</br>Error Message:</br>' + err.Message : '';
    // this.toastrService.warning('Error While  deleting the Record');
  }

}  

