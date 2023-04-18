import { Component, OnInit, Input } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute } from '@angular/router';

import { PayrollProcessAdhocService } from '@features/payroll-process/payroll-process-adhoc/payroll-process-adhoc.service';
import { getCurrentUserId } from '@shared/utils/utils.functions';
import { AdhocDeductionView } from '@features/payroll-process/payroll-process-adhoc/payroll-process-adhoc-deduction-view.model';
import { duplicateNameValidator } from '@shared/utils/validators.functions';
import { ToasterDisplayService } from 'src/app/core/services/toaster-service.service';

@Component({
  selector: 'hrms-payroll-create-adhoc',
  templateUrl: './payroll-create-adhoc.component.html'
})
export class PayrollCreateAdhocComponent implements OnInit {
  @Input() employee;
  @Input() processId;
  @Input() payGroupProcessAdhocDeduction: AdhocDeductionView[] = [];
  addForm: FormGroup;
  currentUser: number;
  deductionName: string[];
  id: any;
  constructor(
    public activeModal: NgbActiveModal,
    private toastr: ToasterDisplayService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private payrollProcessAdhocService: PayrollProcessAdhocService,
  ) { }

  ngOnInit(): void {
    this.currentUser = getCurrentUserId();
    this.route.queryParams.subscribe(params => {
      this.id = parseInt(params.id, 10);
    });
    this.addForm = this.createFormGroup();
    if (this.payGroupProcessAdhocDeduction.length != 0) {
      this.deductionName = this.payGroupProcessAdhocDeduction.map(e => e.deductionName);
      this.addForm.get('deductionName').setValidators(duplicateNameValidator(this.deductionName));
      this.addForm.get('deductionName').updateValueAndValidity();
    }
  }
  createFormGroup(): FormGroup {
    return this.formBuilder.group({
      payrollProcessingMethodId: this.processId,
      employeeId: [this.employee.id, [
        Validators.required
      ]],
      employeeName: [{ value: `${this.employee.firstName} ${this.employee.middleName} ${this.employee.lastName}`, disabled: true }, [
        Validators.required, Validators.maxLength(50)
      ]],
      employeeCode: [{ value: this.employee.employeeNumber, disabled: true }, [
        Validators.required, Validators.maxLength(30)
      ]],
      deductionName: ['', [
        Validators.required,
        Validators.maxLength(32)
      ]],
      description: ['', [
        Validators.required,
        Validators.maxLength(128)
      ]],
      currency: ['INR', [
        Validators.required
      ]],
      amount: [null, [
        Validators.required,
        Validators.max(999999999),

      ]]
    });

  }
  onSubmit() {
    this.payrollProcessAdhocService.add(this.addForm.getRawValue()).subscribe(result => {
      this.toastr.showSuccessMessage('Adhoc Deduction Added successfully');
      this.activeModal.close('submit');
    },
      error => {
        console.error(error);
        this.toastr.showErrorMessage('Unable to add Adhoc Deduction ');
      });
  }
}
