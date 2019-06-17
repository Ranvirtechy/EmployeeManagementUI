import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { TfrGridService } from '../../../shared/services/tfr-datatables/tfr.grid.service';
import { Registration } from '../../../../models/registration/Registration.model';
import { RegistrationService } from '../../registration.service';
import { TfrConstants } from '../../../shared/constants/tfr-constants';
import { TfrValidator } from '../../../shared/helpers/tfr-validator';

@Component({
  selector: 'app-registration-edit',
  templateUrl: './registration-edit.component.html',
  styleUrls: ['./registration-edit.component.css']
})
export class RegistrationEditComponent implements OnInit {

  dataSource = [];
  idDOB: string = 'abc';
  idDOJ = 'and';
  options: FormGroup;
  lblDate = "Date of Birth";
  lblDateJoining = "Date of Joining";


  addressLine1Validator;
  cityValidator;
  stateValidator;
  zipcodeValidator;


  Registration = new Registration();
  isCreateMode = false;

  constructor(private tfrGridService: TfrGridService
     , fb: FormBuilder
    , public tfrConstants: TfrConstants,
    public tfrValidator: TfrValidator,
    private route: ActivatedRoute, private router: Router, private registrationService: RegistrationService) {

    this.options = fb.group({
      hideRequired: tfrConstants.tfrFormOptions.hideRequired,
      floatLabel: tfrConstants.tfrFormOptions.floatLabel,
    });

    this.addressLine1Validator = tfrValidator.getRequiredValidator();
    this.cityValidator = tfrValidator.getRequiredValidator();
    this.stateValidator = tfrValidator.getRequiredValidator();
    this.zipcodeValidator = tfrValidator.getRequiredValidator();

    


  }


  ngOnInit() {
    //debugger;
    const RegistrationId = this.route.snapshot.paramMap.get('id');
    if (!RegistrationId) {
      this.isCreateMode = true;
    } else {
      this.registrationService.RegistrationDetailById(RegistrationId).subscribe(
        returnedRegistrationDetail => this.registrationSuccess(returnedRegistrationDetail),
      );
    }
    this.getRoleDataDropDown();
  }


  registrationSuccess(Registration) {
    debugger;
    this.Registration = Registration;
  }


  //From Sample File. 
  getRoleDataDropDown() {
    this.registrationService.getAllRoleDataForDropDown().subscribe(
      returnedRegistrationDetail => this.getRegistrationToBindDDLSuccess(returnedRegistrationDetail),
    );
  }
  getRegistrationToBindDDLSuccess(RegistrationToBindDDL) {
    this.dataSource = RegistrationToBindDDL;
  }

//dropdown activity end.




  saveChanges() {
    debugger;
    this.registrationService.saveRegistrationData(this.Registration, this.isCreateMode).subscribe(
      savedRegistrationData => this.sRegistrationData(savedRegistrationData),
      err => this.fSaveRegistrationData(err),
      () => this.aSaveRegistrationData()
    );
  }


  sRegistrationData(savedRegistrationCode) {
    //console.log(savedRegistrationCode);
    this.router.navigateByUrl(`registration/RegistrationList/list`)
  }
  fSaveRegistrationData(err) {
    const errMessage = err && err.Message ? '</br>Error Message:</br>' + err.Message : '';
  }

  aSaveRegistrationData() {
    console.log('Registration data saved successfully!');
  }

  DobChanged(event) {

    this.Registration.DateOfBirth = event;
  }

  DojChanged(event) {

    this.Registration.DateOfJoining = event;
  }


}

