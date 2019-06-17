import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '@app/modules/app/material';
import { DataTablesModule } from 'angular-datatables';

// Directives
import { NumericOnlyDirective } from '../shared/directives/numeric-only.directive';
 
import { PhoneComponent } from './controls/phone/phone/phone.component';
import { EmailComponent } from './controls/email/email/email.component';
import { DateComponent } from './controls/date/date/date.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DecimalOnlyDirective } from './directives/decimal-only.directive';
import { PhoneWithValidatorComponent } from './controls/phone/phone-with-validator/phone-with-validator.component';
import { DynamicContent } from './directives/action.link.generator';
import { appMoneyField } from './directives/money-field.directive';
import { AlphabetOnlyDirective } from './directives/alphabet-only.directive';
import { AddressPropertiesRequiredComponent } from './components/address-properties-required/address-properties-required.component';
//import { AddressPropertiesRequiredComponent } from './component/address-properties-required/address-properties-required.component';

@NgModule({
  imports: [CommonModule, MaterialModule, FormsModule, ReactiveFormsModule, DataTablesModule],
  providers: [],
  declarations: [NumericOnlyDirective, appMoneyField, PhoneComponent, EmailComponent, DateComponent, DynamicContent, DecimalOnlyDirective, PhoneWithValidatorComponent, AlphabetOnlyDirective, AddressPropertiesRequiredComponent],
  exports: [MaterialModule, NumericOnlyDirective, appMoneyField, PhoneComponent, EmailComponent, DateComponent, DynamicContent, DecimalOnlyDirective, PhoneWithValidatorComponent, AlphabetOnlyDirective, AddressPropertiesRequiredComponent],
  entryComponents: []
})
export class SharedModule { }
