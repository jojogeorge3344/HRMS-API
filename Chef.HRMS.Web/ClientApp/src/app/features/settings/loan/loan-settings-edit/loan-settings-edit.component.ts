import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ValidatorFn, ValidationErrors } from '@angular/forms';
import { LoanSettingsService } from '../loan-settings.service';
import { ToasterDisplayService } from '../../../../core/services/toaster-service.service'
import { LoanSettings } from '../loan-settings.model';
import { InterestMethod } from "../../../../models/common/types/interestmethod";
import { Router, ActivatedRoute } from '@angular/router';
import { getCurrentUserId } from '@shared/utils/utils.functions';
import { forkJoin } from 'rxjs';


@Component({
  templateUrl: './loan-settings-edit.component.html'
})
export class LoanSettingsEditComponent implements OnInit {

  editForm: FormGroup;
  currentUserId: number;
  interestMethod = InterestMethod;
  deductionBfCodeTypes;
  loanAdvanceDetails: any;
  loanRepaymentDetails: any;
  loanAdvObj;
  isLoading = false;
  loanDetails;
  loanRepayObj;
  
  constructor(private loanSettingsService: LoanSettingsService,
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private toastr: ToasterDisplayService) { }

  ngOnInit(): void {
    this.currentUserId = getCurrentUserId();
    this.editForm = this.createFormGroup();
    this.GetDeductionBFCode()
    this.onChanges();
    this.fillDropDowns()
  }

  onChanges(): void {
    this.editForm.get('eligiblePeriod').valueChanges.subscribe(value => {
      if (value === 1) {
        this.editForm.get('eligibleDaysFromJoining').enable();
        this.editForm.patchValue({ isEligibleinAfterProbationPeriod: false });
      }
      else {
        this.editForm.get('eligibleDaysFromJoining').disable();
        this.editForm.patchValue({ isEligibleinAfterProbationPeriod: true });
      }

    });

    this.editForm.get('isEligibleBasedonAnnualGrossSalary').valueChanges.subscribe(value => {
      if (value) {
        this.editForm.get('salaryFromRange').enable();
        this.editForm.get('salaryToRange').enable();
      }
      else {
        this.editForm.get('salaryFromRange').disable();
        this.editForm.get('salaryToRange').disable();
      }
    });
  }

  GetDeductionBFCode() {
    debugger
    this.loanSettingsService.getDeductionBFCode()
      .subscribe((result) => {
        this.deductionBfCodeTypes = result;
      })
  }
  getLoanAdvanceDetails() {
    this.isLoading = true;
    this.loanSettingsService.getLoanAdvance()
      .subscribe((result: any) => {
        let temp = { id: undefined, payrollComponentName: 'test', isLastRow: true }
        // lastrow
        this.loanAdvanceDetails = [...result, temp];
        this.isLoading = false;
        this.loanAdvObj = this.loanAdvanceDetails.find((item) => item.payrollComponentId == this.loanDetails.loanAdvanceType)

      })

  }
  getLoanRepaymentDetails() {
    this.isLoading = true;
    this.loanSettingsService.getLoanRepayment()
      .subscribe((result:any) => {
        let temp = { id: undefined, payrollComponentName: 'test', isLastRow: true }
        // lastrow
        this.loanRepaymentDetails = [...result, temp];
        this.isLoading = false;
        this.loanRepayObj = this.loanRepaymentDetails.find((item) => item.payrollComponentId == this.loanDetails.loanRepaymentType)
      })
  }

  getLoanSettings() {
    this.loanSettingsService.get().subscribe((result: LoanSettings) => {
      this.editForm.patchValue(result);
      this.loanDetails = result
      this.loanAdvObj = this.loanAdvanceDetails.find((item) => item.payrollComponentId == this.loanDetails.loanAdvanceType)
      this.loanRepayObj = this.loanRepaymentDetails.find((item) => item.payrollComponentId == this.loanDetails.loanRepaymentType)
      if (result.isEligibleinAfterProbationPeriod) {
        this.editForm.patchValue({ eligiblePeriod: 2 });
        this.editForm.get('eligibleDaysFromJoining').disable();
      }
    });
    console.log('loanAdvObj', this.loanAdvObj)
    console.log('loanAdvanceDetails', this.loanAdvanceDetails)

  }

  validateNumber(ev) {
    const keyCode = ev.keyCode;
    const excludedKeys = [8, 110, 190];
    if (
      !(
        (keyCode >= 48 && keyCode <= 57) ||
        (keyCode >= 96 && keyCode <= 105) ||
        excludedKeys.includes(keyCode)
      )
    ) {
      ev.preventDefault();
    }
  }

  onSubmit() {
    debugger
    this.editForm.removeControl('eligiblePeriod');
    this.loanSettingsService.update(this.editForm.value).subscribe((result: number) => {
      if (result === 1) {
        this.toastr.showSuccessMessage('Settings for loan updated');
        this.router.navigate(['./'], { relativeTo: this.route.parent });
      }
    },
      error => {
        console.error(error);
        this.toastr.showErrorMessage('Settings for loan updation failed');
      });
  }

  selectLoanAdvance(args) {
    debugger
    if (args.value && args.value.payrollComponentId) {
      this.editForm.patchValue({
        loanAdvanceType: args.value.payrollComponentId,
      })
    } else {
      this.editForm.patchValue({
        loanAdvanceType: 0,
      })
    }
  }
  refreshLoanAdvance(event) {
    event.stopPropagation();
    event.preventDefault();
    this.getLoanAdvanceDetails();
  }
  selectLoanRepayment(args) {
    debugger
    if (args.value && args.value.payrollComponentId) {
      this.editForm.patchValue({
        loanRepaymentType: args.value.payrollComponentId,
      })
    } else {
      this.editForm.patchValue({
        loanRepaymentType: 0,
      })
    }
  }
  refreshLoanRepayment(event) {
    event.stopPropagation();
    event.preventDefault();
    this.getLoanRepaymentDetails();
  }
  fillDropDowns() {
    forkJoin([
      this.loanSettingsService.getLoanAdvance(),
      this.loanSettingsService.getLoanRepayment()
    ]).subscribe((res: any) => {
      let temp = { id: undefined, payrollComponentName: 'test', isLastRow: true };
      this.loanAdvanceDetails = [...res[0], temp];
      this.loanRepaymentDetails = [...res[1], temp];
      this.getLoanSettings()
    })
  }

  createFormGroup(): FormGroup {
    return this.formBuilder.group({
      id: [null],
      eligiblePeriod: [1],
      isEligibleinAfterProbationPeriod: [true],
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
      deductionBFCode: [0, []],
      loanAdvanceType: [0],
      loanRepaymentType: [0],
      interestCalcutationMethod: [this.interestMethod['ReductionRate']],
      createdDate: []
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