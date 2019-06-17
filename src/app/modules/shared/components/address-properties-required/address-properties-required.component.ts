import { Component, OnInit, Input } from '@angular/core';
import { DropDownList } from '@app/models/dropdown-list.model';
import { TfrHelper } from '../../helpers/tfr-helper';
import { TfrConstants } from '../../constants/tfr-constants';
//import { SettingService } from '@app/modules/settings/settings.service';
import { TfrValidator } from '../../helpers/tfr-validator';

@Component({
  selector: 'app-address-properties-required',
  templateUrl: './address-properties-required.component.html',
  styleUrls: ['./address-properties-required.component.css']
})
export class AddressPropertiesRequiredComponent implements OnInit {
  @Input() item: any;
  @Input() addressLine1Validator: any;
  @Input() cityValidator: any;
  @Input() stateValidator: any;
  @Input() zipcodeValidator: any;
 
  constructor(private tfrHelper: TfrHelper
    , public tfrConstants: TfrConstants, public tfrValidator: TfrValidator) { }

   
  //getAlways(): any {
  //  this.tfrHelper.hideSpinner();
  //}
  //getFailure(err: any): any {
  //  this.tfrHelper.tfrToaster('Failed to retrieve ZipCodes!', '', this.tfrConstants.tfrSweetAlertType.Error);
  //}
  
  ngOnInit() {
  }

}
