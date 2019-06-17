import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-phone-control',
  templateUrl: './phone.component.html',
  styleUrls: ['./phone.component.css']
})
export class PhoneComponent implements OnInit {
  @Input() placeHolderPhone: string;
  @Input() lblPhone: string ;
  @Input() PhoneNumber: string;
  @Output() valueChange = new EventEmitter();
  @Input() disable: boolean = false;
  @Input() maxLen:number=20;
  constructor() { }

  ngOnInit() {
  }
  valueChanged() { // You can give any function name
    
    this.valueChange.emit(this.PhoneNumber);
  }
}
