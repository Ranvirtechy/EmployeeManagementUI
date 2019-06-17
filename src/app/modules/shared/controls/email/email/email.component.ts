import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material';

@Component({
  selector: 'app-email-control',
  templateUrl: './email.component.html',
  styleUrls: ['./email.component.css']
})

export class EmailComponent implements OnInit {
  @Input() placeHolderEmail: string;
  @Input() lblEmail: string;
  @Input() Email: string;
  @Input() emailValidator: FormControl;
  @Input() tfrValidator: ErrorStateMatcher;
  @Input() floatLabel: any;
  @Output() valueChange = new EventEmitter();
  @Input() requiredClass:boolean=false;
  constructor() { }

  ngOnInit() {
  }

  valueChanged() { // You can give any function name
     
    this.valueChange.emit(this.Email);
  }
}
