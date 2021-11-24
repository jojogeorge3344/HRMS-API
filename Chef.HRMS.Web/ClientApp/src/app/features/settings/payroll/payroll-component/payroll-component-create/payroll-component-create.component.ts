import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { PayrollComponentService } from '../payroll-component.service';
import { PayrollComponentType } from 'src/app/models/common/types/payrollcomponenttype';
import { duplicateNameValidator } from '@shared/utils/validators.functions';
import { getCurrentUserId } from '@shared/utils/utils.functions';
import { ToasterDisplayService } from 'src/app/core/services/toaster-service.service';

@Component({
  selector: 'hrms-payroll-component-create',
  templateUrl: './payroll-component-create.component.html'
})
export class PayrollComponentCreateComponent implements OnInit {


  addForm: FormGroup;
  currentUserId: number;
  payrollComponentTypeKeys: number[];

  @Input() payrollComponentTypes: PayrollComponentType;
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
    this.addForm = this.createFormGroup();
    this.payrollComponentTypeKeys = Object.keys(this.payrollComponentTypes).filter(Number).map(Number);
    this.payrollComponentTypeKeys.splice(this.payrollComponentTypeKeys.indexOf(this.payrollComponentTypes['Fixed']), 1);
  }

  get name() { return this.addForm.get('name'); }

  get code() { return this.addForm.get('shortCode'); }

  onSubmit() {
    const payrollComponentForm = this.addForm.value;
    payrollComponentForm.payrollComponentType = parseInt(payrollComponentForm.payrollComponentType, 10);

    this.payrollComponentService.add(payrollComponentForm).subscribe((result: any) => {
      if (result.id === -1) {
        this.toastr.showErrorMessage('Payroll component already exists!');
      } else {
        this.toastr.showSuccessMessage('Payroll component added successfully!');
        this.activeModal.close('submit');
      }
    },
      error => {
        console.error(error);
        this.toastr.showErrorMessage('Unable to add the payroll component ');
      });
  }

  createFormGroup(): FormGroup {
    return this.formBuilder.group({
      name: ['', [
        Validators.required,
        Validators.maxLength(24),
        Validators.pattern('^([a-zA-Z0-9 ])+$'),
        duplicateNameValidator(this.payrollComponentNames)
      ]],
      payrollComponentType: [null, [
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
    });
  }
}
