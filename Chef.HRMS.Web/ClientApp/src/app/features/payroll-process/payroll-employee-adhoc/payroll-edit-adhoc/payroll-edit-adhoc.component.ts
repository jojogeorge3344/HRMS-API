import { Component, OnInit, Input } from '@angular/core';
import { AdhocDeductionView } from '@features/payroll-process/payroll-process-adhoc/payroll-process-adhoc-deduction-view.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { PayrollProcessAdhocService } from '@features/payroll-process/payroll-process-adhoc/payroll-process-adhoc.service';
import { getCurrentUserId } from '@shared/utils/utils.functions';
import { ToasterDisplayService } from 'src/app/core/services/toaster-service.service';

@Component({
  selector: 'hrms-payroll-edit-adhoc',
  templateUrl: './payroll-edit-adhoc.component.html',
  styles: [
  ]
})
export class PayrollEditAdhocComponent implements OnInit {
  editForm: FormGroup;
  adhocDeductionById: any;
  @Input() adhocDeduction: AdhocDeductionView;
  @Input() processId;
  currentUserId: number;
  constructor(
    public activeModal: NgbActiveModal,
    private toastr: ToasterDisplayService,
    private formBuilder: FormBuilder,
    private payrollProcessAdhocService: PayrollProcessAdhocService,
  ) { }

  ngOnInit(): void {
    this.currentUserId = getCurrentUserId();
    this.editForm = this.createFormGroup();
    this.editForm.patchValue(this.adhocDeduction);
  }
  onSubmit() {
    const addAdhocDeduction = this.editForm.getRawValue();
    addAdhocDeduction.id = this.adhocDeduction.deductionId;

    this.payrollProcessAdhocService.update(addAdhocDeduction).subscribe(result => {
      if (result.id === -1) {
        this.toastr.showErrorMessage('Adhoc Deduction for user already exists!');
      } else {
        this.toastr.showSuccessMessage('Adhoc deduction updated successfully');
        this.activeModal.close('submit');
      }
    },
      error => {
        console.error(error);
        this.toastr.showErrorMessage('Unable to add Adhoc Deduction ');
      });
  }

  private createFormGroup(): FormGroup {
    return this.formBuilder.group({
      id: [],
      payrollProcessingMethodId: this.processId,
      employeeId: this.adhocDeduction.employeeId,
      employeeName: [{ value: this.adhocDeduction.name, disabled: true }, Validators.maxLength(50)],
      employeeCode: [{ value: this.adhocDeduction.employeeCode, disabled: true }, Validators.maxLength(12)],
      deductionName: ['', [
        Validators.required
      ]],
      description: ['', [
        Validators.maxLength(128),
        Validators.required
      ]],
      currency: ['', [
        Validators.required
      ]],
      amount: ['', [
        Validators.maxLength(18),
        Validators.required
      ]],
     createdDate: []
    });
  }

}
