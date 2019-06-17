import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeeroleService } from '../../employeerole.service';
import { Role } from '../../../../models/role/role.model ';
import { TfrGridService } from '../../../shared/services/tfr-datatables/tfr.grid.service';

@Component({
  selector: 'app-employeerole-edit',
  templateUrl: './employeerole-edit.component.html',
  styleUrls: ['./employeerole-edit.component.css']
})
export class EmployeeroleEditComponent implements OnInit {

  


  Role = new Role();
  isCreateMode = false;

  constructor(private tfrGridService: TfrGridService, private route: ActivatedRoute, private router: Router, private roleService: EmployeeroleService) { }


  ngOnInit() {
    //debugger;
    const RoleId = this.route.snapshot.paramMap.get('id');
    if (!RoleId) {
      this.isCreateMode = true;
    } else {
      this.roleService.RoleDetailById(RoleId).subscribe(
        returnedRoleDetail => this.roleSuccess(returnedRoleDetail),
      );
    }
  }


  roleSuccess(Role) {
    debugger;
    this.Role = Role;
  }


  saveChanges() {
    debugger;
    this.roleService.saveRoleData(this.Role, this.isCreateMode).subscribe(
      savedRoleData => this.sRoleData(savedRoleData),
      err => this.fSaveRoleData(err),
      () => this.aSaveRoleData()
    );
  }


  sRoleData(savedRoleCode) {
    //console.log(savedRoleCode);
    this.router.navigateByUrl(`employeerole/EmployeeroleList/list`)
  }
  fSaveRoleData(err) {
    const errMessage = err && err.Message ? '</br>Error Message:</br>' + err.Message : '';
  }

  aSaveRoleData() {
    console.log('Role data saved successfully!');
  }


}

