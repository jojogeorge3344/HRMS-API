import { getCurrentUserId } from '@shared/utils/utils.functions';
import { EmployeeSalaryFormComponent } from './../employee-salary-form/employee-salary-form.component';
import { Component, OnInit, Output, EventEmitter, ViewChild } from '@angular/core';
import { NgbModal, NgbDateAdapter, NgbDateNativeAdapter, NgbDatepickerConfig } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { PayrollCalculationService } from '@settings/payroll/payroll-calculation/payroll-calculation.service';
import { EmployeeSalaryConfigurationView } from '../employee-salary-configuration-view.model';
import { EmployeeSalaryConfiguration } from '../employee-salary-configuration.model';
import { EmployeeSalaryConfigurationService } from '../employee-salary-configuration.service';
import { EmployeeSalaryConfigurationDetails } from '../employee-salary-configuration-details.model';
import { EmployeeSalaryConfigurationDetailsService } from '../employee-salary-configuration-details.service';
import { ToastrService } from 'ngx-toastr';
import { ToasterDisplayService } from 'src/app/core/services/toaster-service.service';
import { EmployeeService } from '@features/employee/employee.service';

@Component({
  selector: 'hrms-employee-salary-create',
  templateUrl: './employee-salary-create-container.component.html',
  providers: [{ provide: NgbDateAdapter, useClass: NgbDateNativeAdapter }]
})
export class EmployeeSalaryCreateContainerComponent implements OnInit {

  minDate: { year: number; month: number; day: number; };
  maxDate: { year: number; month: number; day: number; };

  @ViewChild(EmployeeSalaryFormComponent) salaryFormComponent;

  @Output() submitted = new EventEmitter<any>();

  employeeId: number;
  currentUserId: number;
  salaryForm: FormGroup;

  returned = false;

  salaryStructure: EmployeeSalaryConfigurationView[];

  salaryStructureName = '';
  salaryTotalYearly = 0;
  salaryTotalMonthly = 0;

  isDisabled = true;
  activeId = 1;
  employeename: any;
  employeecode: any;
  constructor(
    private formBuilder: FormBuilder,
    private payrollCalculationService: PayrollCalculationService,
    private employeeSalaryConfigurationService: EmployeeSalaryConfigurationService,
    private employeeSalaryConfigurationDetailsService: EmployeeSalaryConfigurationDetailsService,
    public modalService: NgbModal,
    private toastr: ToasterDisplayService,
    private router: Router,
    private route: ActivatedRoute,
    private config: NgbDatepickerConfig,
    private employeeService: EmployeeService,) {
    const date = new Date();

    // this.minDate = {
    //   year: date.getFullYear(),
    //   month: 1,
    //   day: 1
    // };
    this.maxDate = {
      year: date.getFullYear() + 10,
      month: 12,
      day: 31
    };
  }

  ngOnInit(): void {
    this.route.params.subscribe((params: any) => {
      if(params.empId){
        this.employeeId = parseInt(params.empId, 10);
      }else{

        this.employeeId = parseInt(params.id, 10);
      }
    });

    this.currentUserId = getCurrentUserId();
    this.salaryForm = this.createFormGroup();
    this.getEmployeeSalaryConfiguration();
    this.getEmployeedetails();
  }

  createFormGroup(): FormGroup {
    return this.formBuilder.group({
      effectiveDate: [null, [
        Validators.required,
      ]],
      salaryArray: new FormArray([])
    });
  }
  getEmployeedetails() {
    this.employeeService.getDetails(this.employeeId).subscribe(
      (result) => {
        debugger
        this.employeename = result.firstName
        this.employeecode = result.employeeNumber
        let doj = new Date(result.dateOfJoin)
        this.minDate = {
          year: doj.getFullYear(),
          month: doj.getMonth() +1,
          day: doj.getDate()
        };
        // let doj = new Date(result.dateOfJoin)
        this.salaryForm.patchValue({
          effectiveDate: doj
        })
      },
      (error) => {
        console.error(error);
      }
    );
  }
  getEmployeeSalaryConfiguration() {

    this.payrollCalculationService.getByEmployeeId(this.employeeId).subscribe((payrollcalculation: EmployeeSalaryConfigurationView[]) => {

      this.salaryStructure = payrollcalculation;

      if (this.salaryStructure.length && this.salaryStructure[0].payrollStructureName) {
        this.salaryStructureName = this.salaryStructure[0].payrollStructureName;
      }
    },
      error => {
        console.error(error);
      });
  }

  get effectiveDate() { return this.salaryForm.get('effectiveDate').value; }

  clear() {
    this.salaryForm.reset();
    // (this.salaryForm.get('salaryArray') as FormArray).reset();
  }

  goBack() {
    this.activeId = 1;
    this.isDisabled = true;
    this.returned = true;
    this.salaryForm.get('effectiveDate').enable();
  }

  onSubmit() {
    this.salaryStructure = this.salaryFormComponent.salaryStructure;
    this.salaryTotalMonthly = this.salaryFormComponent.salaryTotalMonthly;
    this.salaryTotalYearly = this.salaryFormComponent.salaryTotalYearly;

    this.isDisabled = false;
    this.salaryForm.get('effectiveDate').disable();
    this.activeId = 2;
  }

  save() {
    const employeeSalaryConfiguration: EmployeeSalaryConfiguration = {
      employeeId: this.employeeId,
      effectiveDate: this.effectiveDate,
      version: 'Version 001'
      // createdBy: this.currentUserId,
      // modifiedBy: this.currentUserId
    };

    let employeeSalaryConfigurationDetails: EmployeeSalaryConfigurationDetails[] = this.salaryStructure.map(x => {
      return {
        employeeId: this.employeeId,
        employeeSalaryConfigurationId: null,
        payrollCalculationId: x.id,
        payrollComponentId: x.payrollComponentId,
        payrollStructureId: x.payrollStructureId,
        monthlyAmount: x.monthlyAmount,
        yearlyAmount: x.yearlyAmount
        // createdBy: this.currentUserId,
        // modifiedBy: this.currentUserId
      };
    });

    this.employeeSalaryConfigurationService.insert(employeeSalaryConfiguration).subscribe((result: any) => {
      console.log(result, employeeSalaryConfigurationDetails);
      employeeSalaryConfigurationDetails = employeeSalaryConfigurationDetails.map(x => {
        return {
          ...x,
          employeeSalaryConfigurationId: result,
        };
      });

      this.employeeSalaryConfigurationDetailsService.insert(employeeSalaryConfigurationDetails).subscribe(res => {
        if (res) {
          this.toastr.showSuccessMessage('The salary details saved successfully!');
          this.router.navigate(['../../', { activeTabId: '4' }], { relativeTo: this.route });

        }
      });
    });
  }
}
