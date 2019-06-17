import { Component, OnInit, Input, AfterViewInit, Output, EventEmitter } from '@angular/core';
import { TfrConstants } from '@app/modules/shared/constants/tfr-constants';
import { TfrHelper } from '@app/modules/shared/helpers/tfr-helper';

@Component({
  selector: 'app-date-control',
  templateUrl: './date.component.html',
  styleUrls: ['./date.component.css']
})
export class DateComponent implements OnInit, AfterViewInit {
  @Input() floatLabel: any;
  @Input() lblDate: any;
  @Input() id: any;
  @Input() datePlaceHolder: any;
  @Input() _Date: any;
  @Input() tfrValidator: any;
  @Input() dateValidator: any;
  @Output() valueChange = new EventEmitter();
  @Input() requiredClass:boolean=false;
  constructor(public tfrConstants: TfrConstants, private tfrHelper: TfrHelper) { }
  ngAfterViewInit() {
    // this.cdr.detectChanges();
    // $(".tfr-clickable").on('click', "#buttonID", ()=>{
    //     console.log(this.bar);
    // })  
    this.tfrHelper.generateDateInput(this.id, null);
    
     

  }
  ngOnInit() {
  }
  valueChanged() { // You can give any function name

    this.valueChange.emit(this._Date);
  }
}
