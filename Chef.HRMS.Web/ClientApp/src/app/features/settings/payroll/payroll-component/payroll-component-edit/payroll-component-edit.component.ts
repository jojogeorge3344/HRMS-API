import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { PayrollComponentService } from '../payroll-component.service';
import { PayrollComponentType } from 'src/app/models/common/types/payrollcomponenttype';
import { PayrollComponent } from '../payroll-component.model';
import { duplicateNameValidator } from '@shared/utils/validators.functions';
import { getCurrentUserId } from '@shared/utils/utils.functions';
import { ToasterDisplayService } from 'src/app/core/services/toaster-service.service';


@Component({
  selector: 'hrms-payroll-component-edit',
  templateUrl: './payroll-component-edit.component.html'
})
export class PayrollComponentEditComponent implements OnInit {


  editForm: FormGroup;
  currentUserId: number;
  payrollComponentTypeKeys: number[];

  @Input() payrollComponentTypes: PayrollComponentType;
  @Input() payrollComponent: PayrollComponent;
  @Input() isDisabled: boolean;
  @Input() payrollComponentNames: string[];
  @Input() payrollComponentCodes: string[];


  constructor(
    private payrollComponentService: PayrollComponentService,
    public activeModal: NgbActiveModal,
    private formBuilder: FormBuilder,
    private toastr: ToasterDisplayService) {
  }

  ngOnInit(): void {
    this.currentUserId = getCurrentUserId();
    this.editForm = this.createFormGroup();
    this.payrollComponentTypeKeys = Object.keys(this.payrollComponentTypes).filter(Number).map(Number);
    this.payrollComponentTypeKeys.splice(this.payrollComponentTypeKeys.indexOf(this.payrollComponentTypes['Fixed']), 1);
    this.editForm.patchValue(this.payrollComponent);
  }

  get name() { return this.editForm.get('name'); }

  get code() { return this.editForm.get('shortCode'); }

  onSubmit() {
    this.payrollComponentService.update(this.editForm.getRawValue()).subscribe((result: any) => {
      if (result === -1) {
        this.toastr.showErrorMessage('Payroll component already exists!');
      } else {
        this.toastr.showSuccessMessage('Payroll component updated successfully!');
        this.activeModal.close('submit');
      }
    },
      error => {
        console.error(error);
        this.toastr.showErrorMessage('There is an error in updating payroll component');
      });
  }

  createFormGroup(): FormGroup {
    return this.formBuilder.group({
      id: [''],
      name: ['', [
        Validators.required,
        Validators.maxLength(24),
        Validators.pattern('^([a-zA-Z0-9 ])+$'),
        duplicateNameValidator(this.payrollComponentNames)
      ]],
      payrollComponentType: [{ value: null, disabled: this.isDisabled }, [
        Validators.required
      ]],
      shortCode: ['', [
        Validators.required,
        Validators.maxLength(3),
        Validators.pattern('^([a-zA-Z0-9])+$'),
        duplicateNameValidator(this.payrollComponentCodes)
      ]],
      description: ['', [
        Validators.required,
        Validators.maxLength(128),
      ]],

      createdDate: [],

    });
  }

}
