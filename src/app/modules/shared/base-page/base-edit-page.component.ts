import { BasePageComponent } from './base-page.component';
import { TfrHelper } from '@app/modules/shared/helpers/tfr-helper';
import { TfrConstants } from '@app/modules/shared/constants/tfr-constants';
import { OnInit } from '@angular/core';
import { BaseHttpService } from '../services/http/baseHttpService';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

export class BaseEditPageComponent<T> extends BasePageComponent implements OnInit {

    public options: FormGroup;
    public viewModel = <T>{};
    public isCreateMode = false;
    public validators: FormControl[] = [];
    public cEntityName: string;

    constructor(public tfrHelper: TfrHelper, public tfrConstants: TfrConstants,
        public fb: FormBuilder, public service: BaseHttpService<T>,
        public route: ActivatedRoute, public router: Router,
        public entityName: string) {
        super(tfrHelper, tfrConstants);
        (this.viewModel as any).IsActive = true;
        this.cEntityName = this.tfrHelper.capitalizeFirstLetter(this.entityName);
        this.options = fb.group({
            hideRequired: tfrConstants.tfrFormOptions.hideRequired,
            floatLabel: tfrConstants.tfrFormOptions.floatLabel
        });
    }

    ngOnInit() {
        const id = this.route.snapshot.paramMap.get('id');
        this.isCreateMode = !Boolean(id);
        if (this.isCreateMode) { return; }

        this.tfrHelper.showSpinner();
        this.service.getById(id).subscribe(
            response => this.viewModel = response.Data,
            err => this.showErrorMessage(err, `Failed to retrieve ${this.entityName} information!`),
            () => this.tfrHelper.hideSpinner()
        );
    }

    saveChanges() {
        this.service.save(this.viewModel, this.isCreateMode).subscribe(
            res => this.sSave(res),
            err => this.fSave(err),
            () => this.aSave()
        );
    }

    sSave(res: any) {
        console.log(res);
        this.tfrHelper.tfrToaster('Successfully Saved!', '', this.tfrConstants.tfrSweetAlertType.Success);
        this.navigateTo();
    }
    fSave = (err: any) => this.showErrorMessage(err, `${this.cEntityName} save operation failed!`);
    aSave() {
        console.log(`${this.entityName} saved successfully!`);
    }

    isInvalidForm() {
        let isInvalid;
        this.validators.forEach(function (value) {
            if (!isInvalid) {
                isInvalid = Boolean(value.errors);
            }
        });
        if (isInvalid) {
            return true;
        } else {
            return false;
        }
    }

    // override this in real page
    navigateTo() { }

}
