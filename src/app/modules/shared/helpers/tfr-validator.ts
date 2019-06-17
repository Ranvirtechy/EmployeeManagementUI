
import { FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';


const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
export class TfrValidator implements ErrorStateMatcher {

  public tfrFormGroup: FormGroup;
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }

  getEmailValidator() {
    return new FormControl('', [
      Validators.required,
      Validators.email, Validators.pattern(EMAIL_REGEX)
    ]);
  }
  getEmailValidatorWithLength(max) {
    return new FormControl('', [
      Validators.required,
      Validators.maxLength(max),
      Validators.email, Validators.pattern(EMAIL_REGEX)
    ]);
  }
  getEmailValidatorWithDisableProperty() {
    return new FormControl('', [
      Validators.required,
      Validators.email, Validators.pattern(EMAIL_REGEX)
    ]);
  }
  getEmailValidatorWithoutRequired() {
    return new FormControl('', [
      Validators.email, Validators.pattern(EMAIL_REGEX)
    ]);
  }

  getNumberValidator(min: number = 0, required: boolean = true) {
    const validators = [Validators.min(min)];
    if (required) {
      validators.push(Validators.required);
    }
    return new FormControl('', validators);
  }

  getRequiredValidator() {
    return new FormControl('', [
      Validators.required
    ]);
  }

  getPercentValidator() {
    return new FormControl('', [
      Validators.required,
      Validators.min(0),
      Validators.max(100),
    ]);
  }

  getTextValidator(maxLength) {
    maxLength = maxLength ? maxLength : 50; // default min character
    return new FormControl('', [
      Validators.required,
      Validators.maxLength(maxLength)
    ]);
  }
  getTextValidatorWithMaxlengthOnly(maxLength) {
    maxLength = maxLength ? maxLength : 50; // default min character
    return new FormControl('', [
      Validators.maxLength(maxLength)
    ]);
  }

  getRegexValidator(regex) {
    return new FormControl('', [
      Validators.pattern(regex),
    ]);
  }
  getDateValidator() {
    return new FormControl('', [
      Validators.required,
    ]);
  }
  getSelectRequiredValidator() {
    return new FormControl('', [
      Validators.required,
    ]);
  }
  getImageRequiredValidator() {
    return new FormControl(null, [
      Validators.required,
    ]);
  }
  // isValidForm = (formValidatorList) => {
  //     _.forEach(formValidatorList, validator => {
  //         if (validator.errors) {
  //             return false;
  //         }
  //     });
  //     return true;
  // }

  // getFormValidators() {
  //     return this.tfrFormGroup = new FormGroup({
  //         name: new FormControl('', [
  //             Validators.required,
  //             Validators.maxLength(60)
  //         ]),
  //         dateOfBirth: new FormControl(new Date()),
  //         address: new FormControl('', [
  //             Validators.required,
  //             Validators.maxLength(100)
  //         ]),
  //         email: new FormControl('', [
  //             Validators.required,
  //             Validators.email
  //         ])
  //     });
  // }
}
