import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { TfrConstants } from '../../../constants/tfr-constants';
import { ErrorStateMatcher } from '@angular/material';

@Component({
  selector: 'app-phone-control-with-validator',
  templateUrl: './phone-with-validator.component.html',
  styleUrls: ['./phone-with-validator.component.css']
})
export class PhoneWithValidatorComponent implements OnInit {
  @Input() placeHolderPhone: string;
  @Input() lblPhone: string ;
  @Input() PhoneNumber: string;
  @Output() valueChange = new EventEmitter();
  @Input() validator;
  @Input() tfrValidator: ErrorStateMatcher;
  @Input() phonevalidator: any;
  @Input() isRequired: any;
  options: FormGroup;
  constructor(private fb: FormBuilder,
    public tfrConstants: TfrConstants) {
    this.options = fb.group({
      hideRequired: tfrConstants.tfrFormOptions.hideRequired,
      floatLabel: tfrConstants.tfrFormOptions.floatLabel,
    });

  }

  ngOnInit() {
  }
  valueChanged() { // You can give any function name
    
    this.valueChange.emit(this.PhoneNumber);
  }
}
