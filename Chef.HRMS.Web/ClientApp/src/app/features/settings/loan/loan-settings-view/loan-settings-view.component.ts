import { Component, OnInit } from '@angular/core';
import { LoanSettingsService } from '../loan-settings.service';
import { LoanSettings } from '../loan-settings.model';
import { Router, ActivatedRoute } from '@angular/router';
import { InterestMethod } from "../../../../models/common/types/interestmethod";
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  templateUrl: './loan-settings-view.component.html'
})
export class LoanSettingsViewComponent implements OnInit {

  interestMethod = InterestMethod;
  viewForm: FormGroup;

  constructor(private loanSettingsService: LoanSettingsService,
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.viewForm = this.createFormGroup();
    this.getLoanSettings();
  }

  getLoanSettings() {
    this.loanSettingsService.get().subscribe((result: LoanSettings) => {
      
      if(!result) {
        this.router.navigate(['./create'], { relativeTo: this.route.parent });
      }  

      this.viewForm.patchValue(result);
      
      if(result.isEligibleinAfterProbationPeriod) {
        this.viewForm.patchValue( { eligiblePeriod: 2} );
      }
      
      this.viewForm.disable();
    });
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
        Validators.min(1) ,
        Validators.max(99999999)         
      ]],
      salaryToRange: [null, [
        Validators.required,
        Validators.min(1) ,
        Validators.max(99999999)         
      ]],
      isEligibleinNoticePeriod: [false],
      standardInterestRate: [null, [
        Validators.min(0) ,
        Validators.max(150)         
      ]],
      maxNumberofInstallments: [null, [
        Validators.min(1) ,
        Validators.max(36)         
      ]],   
      interestCalcutationMethod: [this.interestMethod['ReductionRate']]
    });  
  }
}
