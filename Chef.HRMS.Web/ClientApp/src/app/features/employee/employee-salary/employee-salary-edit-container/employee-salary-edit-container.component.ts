import { forkJoin } from 'rxjs';
import { Component, OnInit, ViewChild, Output, EventEmitter } from '@angular/core';
import { NgbDateAdapter, NgbDateNativeAdapter, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EmployeeSalaryFormComponent } from '../employee-salary-form/employee-salary-form.component';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { EmployeeSalaryConfigurationView } from '../employee-salary-configuration-view.model';
import { EmployeeSalaryConfigurationService } from '../employee-salary-configuration.service';
import { EmployeeSalaryConfigurationDetailsService } from '../employee-salary-configuration-details.service';
import { Router, ActivatedRoute } from '@angular/router';
import { EmployeeSalaryConfiguration } from '../employee-salary-configuration.model';
import { EmployeeSalaryConfigurationDetails } from '../employee-salary-configuration-details.model';
import { getCurrentUserId } from '@shared/utils/utils.functions';
import { ToasterDisplayService } from 'src/app/core/services/toaster-service.service';
import { EmployeeService } from '@features/employee/employee.service';

@Component({
  selector: 'hrms-employee-salary-edit',
  templateUrl: './employee-salary-edit-container.component.html',
  providers: [{ provide: NgbDateAdapter, useClass: NgbDateNativeAdapter }]
})
export class EmployeeSalaryEditContainerComponent implements OnInit {

  currentUserId: number;
  minDate: { year: number; month: number; day: number; };
  maxDate: { year: number; month: number; day: number; };

  @ViewChild(EmployeeSalaryFormComponent) salaryFormComponent;

  @Output() submitted = new EventEmitter<any>();

  employeeId: number;
  editForm: FormGroup;

  returned = false;

  salaryStructure: EmployeeSalaryConfigurationView[];

  salaryStructureName = '';
  salaryTotalYearly = 0;
  salaryTotalMonthly = 0;

  isDisabled = true;
  activeId = 1;
  employeename:any;
  employeecode:any;
  currency:any;
  constructor(
    private formBuilder: FormBuilder,
    private employeeSalaryConfigurationService: EmployeeSalaryConfigurationService,
    private employeeSalaryConfigurationDetailsService: EmployeeSalaryConfigurationDetailsService,
    public modalService: NgbModal,
    private toastr: ToasterDisplayService,
    private router: Router,
    private route: ActivatedRoute,
    private employeeService: EmployeeService,) {
    const date = new Date();

    this.minDate = {
      year: date.getFullYear(),
      month: 1,
      day: 1
    };
    this.maxDate = {
      year: date.getFullYear() + 10,
      month: 12,
      day: 31
    };
  }

  ngOnInit(): void {
    this.route.params.subscribe((params: any) => {
      this.employeeId = parseInt(params.id, 10);
    });

    this.currentUserId = getCurrentUserId();
    this.editForm = this.createFormGroup();
    this.getEmployeeSalaryConfiguration();
    this.getEmployeedetails();
  }

  createFormGroup(): FormGroup {
    return this.formBuilder.group({
      effectiveDate: [null, [
        Validators.required,
      ]],
      salaryArray: new FormArray([]),
    });
  }
  getEmployeedetails(){
    this.employeeService.getDetails(this.employeeId).subscribe(
      (result) => {
        debugger
        this.employeename = result.firstName
        this.employeecode = result.employeeNumber
        
      },
      (error) => {
        console.error(error);
      }
    );
  }
  getEmployeeSalaryConfiguration() {
    this.employeeSalaryConfigurationService.getSalaryConfigurationByEmployee(this.employeeId)
      .subscribe((employeeSalaryConfiguration: EmployeeSalaryConfigurationView[]) => {
        this.salaryStructure = employeeSalaryConfiguration;
//  this.currency = this.salaryStructure[0].currencycode;
        if (this.salaryStructure.length) {
          this.salaryStructureName = this.salaryStructure[0].payrollStructureName;
          
          this.editForm.patchValue({ effectiveDate: new Date(this.salaryStructure[0].effectiveDate) });
        }
      },
        error => {
          console.error(error);
        });
  }

  get effectiveDate() { return this.editForm.get('effectiveDate').value; }

  clear() {
    this.editForm.reset();
    for (let index = 0; index < this.salaryStructure.length; index++) {
      ((this.editForm.get('salaryArray') as FormArray).at(index) as FormGroup)
        .get('monthly').patchValue(0, { emitEvent: false });
      ((this.editForm.get('salaryArray') as FormArray).at(index) as FormGroup)
        .get('monthly').markAsUntouched();
      ((this.editForm.get('salaryArray') as FormArray).at(index) as FormGroup)
        .get('yearly').patchValue(0, { emitEvent: false });
      ((this.editForm.get('salaryArray') as FormArray).at(index) as FormGroup)
        .get('yearly').markAsUntouched();
      this.salaryFormComponent.salaryTotalMonthly = 0;
      this.salaryFormComponent.salaryTotalYearly = 0;

    }
  }

  goBack() {
    this.activeId = 1;
    this.isDisabled = true;
    this.returned = true;
    this.editForm.get('effectiveDate').enable();
  }

  onSubmit() {
    this.salaryStructure = this.salaryFormComponent.salaryStructure;
    this.salaryTotalMonthly = this.salaryFormComponent.salaryTotalMonthly;
    this.salaryTotalYearly = this.salaryFormComponent.salaryTotalYearly;

    this.isDisabled = false;
    this.editForm.get('effectiveDate').disable();
    this.activeId = 2;
  }

  save() {
    const employeeSalaryConfiguration: EmployeeSalaryConfiguration = {
      id: this.salaryStructure[0].employeeSalaryConfigurationId,
      employeeId: this.employeeId,
      effectiveDate: this.effectiveDate,
      version: 'Version 001'
    };

    const employeeSalaryConfigurationDetails: EmployeeSalaryConfigurationDetails[] = this.salaryStructure.map(x => {
      return {
        id: x.employeeSalaryConfigurationDetailsId,
        employeeId: this.employeeId,
        employeeSalaryConfigurationId: x.employeeSalaryConfigurationId,
        payrollCalculationId: x.payrollCalculationId,
        payrollComponentId: x.payrollComponentId,
        payrollStructureId: x.payrollStructureId,
        monthlyAmount: x.monthlyAmount,
        yearlyAmount: x.yearlyAmount
      };
    });

    forkJoin([this.employeeSalaryConfigurationService.update(employeeSalaryConfiguration),
      this.employeeSalaryConfigurationDetailsService.update(employeeSalaryConfigurationDetails)]).subscribe(([r1, r2]) => {
        this.toastr.showSuccessMessage('The salary details updated successfully!');
        this.router.navigate(['../../', { activeTabId: '4' }], { relativeTo: this.route });
      },
        error => {
          this.toastr.showErrorMessage('Unable to update salary details!');
          console.error(error);
        });
  }
}

