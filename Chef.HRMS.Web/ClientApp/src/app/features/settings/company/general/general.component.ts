import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbDateAdapter, NgbDateNativeAdapter } from '@ng-bootstrap/ng-bootstrap';
import { CompanyService } from '@settings/company/company.service';
import { BusinessType } from '../../../../models/common/types/businesstype';
import { ToasterDisplayService } from 'src/app/core/services/toaster-service.service';

@Component({
  selector: 'app-general',
  templateUrl: './general.component.html',
  providers: [{ provide: NgbDateAdapter, useClass: NgbDateNativeAdapter }]
})

export class GeneralComponent implements OnInit {

  companyForm: FormGroup;
  businessTypes = BusinessType;
  businessTypeKeys: number[];

  constructor(
    private companyService: CompanyService,
    private formBuilder: FormBuilder,
    private toastr: ToasterDisplayService) {
    this.businessTypeKeys = Object.keys(this.businessTypes).filter(Number).map(Number);
  }

  ngOnInit(): void {
    this.companyForm = this.createFormGroup();
    this.getCompany();
  }

  getCompany() {
    this.companyService.get().subscribe(result => {
      result.dateOfIncorporation = new Date(result.dateOfIncorporation);
      this.companyForm.patchValue(result);
    },
      error => {
        console.error(error);
        this.toastr.showErrorMessage('Unable to fetch the company');
      });
  }

  onSubmit() {
    this.companyService.update(this.companyForm.value)
      .subscribe(() => {
        this.toastr.showSuccessMessage('The company is updated successfully!');
      },
        error => {
          console.log(error);
          this.toastr.showErrorMessage('There is an error in updating company');
        });
  }

  createFormGroup(): FormGroup {
    return this.formBuilder.group({
      id: [''],
      dateOfIncorporation: [new Date(Date.now()), [
        Validators.required
      ]],
      legalName: ['', [
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(50),
      ]],
      shortName: ['', [
        Validators.required,
        Validators.maxLength(50),
      ]],
      businessType: [null, [
        Validators.required
      ]],
      identificationNumber: ['', [
        Validators.required
      ]]
    });
  }
}
