import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ValidatorFn, ValidationErrors } from '@angular/forms';
import { LoanSettingsService } from '../loan-settings.service';
import { ToasterDisplayService } from '../../../../core/services/toaster-service.service';
import { LoanSettings } from '../loan-settings.model';
import { InterestMethod } from '../../../../models/common/types/interestmethod';
import { Router, ActivatedRoute } from '@angular/router';
import { getCurrentUserId } from '@shared/utils/utils.functions';

@Component({
  templateUrl: './loan-settings-create.component.html'
})
export class LoanSettingsCreateComponent implements OnInit {

  addForm: FormGroup;
  currentUserId: number;
  interestMethod = InterestMethod;

  constructor(
    private loanSettingsService: LoanSettingsService,
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private toastr: ToasterDisplayService) { }

  ngOnInit(): void {
    this.currentUserId = getCurrentUserId();
    this.addForm = this.createFormGroup();
    this.onChanges();
  }

  onChanges(): void {
    this.addForm.get('eligiblePeriod').valueChanges.subscribe(value => {
      if (value === 1) {
        this.addForm.get('eligibleDaysFromJoining').enable();
        this.addForm.patchValue({ isEligibleinAfterProbationPeriod: false });
      } else {
        this.addForm.get('eligibleDaysFromJoining').disable();
        this.addForm.patchValue({ isEligibleinAfterProbationPeriod: true });
      }
    });

    this.addForm.get('isEligibleBasedonAnnualGrossSalary').valueChanges.subscribe(value => {
      if (value) {
        this.addForm.get('salaryFromRange').enable();
        this.addForm.get('salaryToRange').enable();
      } else {
        this.addForm.get('salaryFromRange').disable();
        this.addForm.get('salaryToRange').disable();
      }
    });
  }

  onSubmit() {
    this.addForm.removeControl('eligiblePeriod');
    this.loanSettingsService.insert(this.addForm.value).subscribe((result: LoanSettings) => {
      if (result.id) {
        this.toastr.showSuccessMessage('Settings for loan added');
        this.router.navigate(['./'], { relativeTo: this.route.parent });
      }
    },
      error => {
        console.error(error);
        this.toastr.showSuccessMessage('Settings for loan creation failed');
      });
  }

  createFormGroup(): FormGroup {
    return this.formBuilder.group({
      eligiblePeriod: [1],
      isEligibleinAfterProbationPeriod: [false],
      eligibleDaysFromJoining: [null, [
        Validators.required,
        Validators.max(365)
      ]],
      isEligibleBasedonAnnualGrossSalary: [true],
      salaryFromRange: [null, [
        Validators.required,
        Validators.min(1),
        Validators.max(99999999)
      ]],
      salaryToRange: [null, [
        Validators.required,
        Validators.min(1),
        Validators.max(99999999)
      ]],
      isEligibleinNoticePeriod: [false],
      standardInterestRate: [null, [
        Validators.required,
        Validators.min(0),
        Validators.max(150)
      ]],
      maxNumberofInstallments: [null, [
        Validators.required,
        Validators.min(1),
        Validators.max(36)
      ]],
      interestCalcutationMethod: [this.interestMethod.ReductionRate],
      createdBy: [this.currentUserId],
      modifiedBy: [this.currentUserId]
    }, { validators: rangeValidator });
  }
}

const rangeValidator: ValidatorFn = (control: FormGroup): ValidationErrors | null => {
  const from = control.get('salaryFromRange').value;
  const to = control.get('salaryToRange').value;
  return from !== null && to !== null && from < to
    ? null
    : { range: true };
};
