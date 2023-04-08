import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { PayrollProcessAdhocService } from '../payroll-process-adhoc.service';
import { getCurrentUserId } from '@shared/utils/utils.functions';
import { AdhocDeductionView } from '../payroll-process-adhoc-deduction-view.model';
import { ToasterDisplayService } from 'src/app/core/services/toaster-service.service';

@Component({
  selector: 'hrms-payroll-edit-adhoc-payment',
  templateUrl: './payroll-edit-adhoc-payment.component.html'
})
export class PayrollEditAdhocPaymentComponent implements OnInit {

  editForm: FormGroup;
  @Input() processId: any;
  adhocDeductionById: any;
  @Input() adhocDeduction: AdhocDeductionView;
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
    const addAdhocDeduction = this.editForm.value;
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
      employeeCode: this.adhocDeduction.employeeCode,
      employeeName: [{ value: this.adhocDeduction.name, disabled: true },Validators.maxLength(10)],
      employeeCod: [{ value: this.adhocDeduction.employeeCode, disabled: true },Validators.maxLength(50)], // this for employee code display
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
