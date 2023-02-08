import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { PayrollProcessSalaryService } from '../payroll-process-salary/payroll-process-salary.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormArray, FormBuilder, Validators, FormGroup } from '@angular/forms';
import { PayrollProcessService } from '../payroll-process.service';
import { Employee } from '@features/employee/employee.model';
import { ToasterDisplayService } from 'src/app/core/services/toaster-service.service';

@Component({
  selector: 'hrms-payroll-employee-salary',
  templateUrl: './payroll-employee-salary.component.html',
  styles: [
  ]
})
export class PayrollEmployeeSalaryComponent implements OnInit {
  @Output() selectTab = new EventEmitter<number>();
  @Input() employee: Employee;

  selectedYear: any;
  selectedMonth: any;
  months: any;
  noOfCalendarDays: number;
  employeeId: number;
  id: number;
  rowOnEdit = -1;
  salaryComponents = [];
  editForm: any;

  constructor(
    private payrollProcessSalaryService: PayrollProcessSalaryService,
    private payrollProcessService: PayrollProcessService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private toastr: ToasterDisplayService) {
    this.route.queryParams.subscribe(params => {
      this.selectedYear = params.date.split('-')[1];
      this.employeeId = parseInt(params.employee, 10);
      this.id = parseInt(params.id, 10);
    });
  }
  ngOnInit(): void {
    this.editForm = this.createFormGroup();
    this.payrollProcessService.getEmployeeDetails(this.employeeId,this.id).subscribe(payrollProcess => {
      this.payrollProcessService.setEmployeeDetails(payrollProcess)
      let apiToCall;
      if (payrollProcess.processedStep >= 2) {
        apiToCall = this.payrollProcessSalaryService.getEmployeeSalaryByProcessId(this.id);

      } else {
        apiToCall = this.payrollProcessSalaryService.getByEmployee(this.employeeId);
      }

      apiToCall
        .subscribe(res => {
          this.salaryComponents = res;
          this.salaryComponents.map(comp => {
            (this.editForm.controls.components as FormArray)
              .push(this.formBuilder.group(
                {
                  monthly: [{ value: comp.monthlyAmount, disabled: false },
                  {
                    validators: [Validators.required, Validators.min(1), Validators.max(comp.maximumLimit)],
                    updateOn: 'blur',
                  }],

                }));
          });
        });
    });
  }
  createFormGroup(): FormGroup {
    return this.formBuilder.group({

      components: new FormArray([]),

    });

  }
  editRow(index) {

    if (this.rowOnEdit >= 0) {
      const value = this.editForm.value.components[this.rowOnEdit].monthly;
      ((this.editForm.get('components') as FormArray).at(this.rowOnEdit) as FormGroup)
        .get('monthly').patchValue(value, { emitEvent: false });
      this.salaryComponents.map((component, i) => {
        if (i === this.rowOnEdit) {
          component.monthlyAmount = parseInt(value, 10);
        }

      });
    }

    this.rowOnEdit = index;
  }
  onSubmit(routeTo) {
    this.editRow(-1);
    const comp = this.salaryComponents.map((component) => {
      return {
        employeeCode: component.employeeCode,
        employeeId: component.employeeId,
        employeeName: component.employeeName,
        payrollComponentId: component.payrollComponentId,
        payrollComponentName: component.payrollComponentName,
        payrollStructureId: component.payrollStructureId,
        monthlyAmount: component.monthlyAmount,
        shortCode: component.shortCode,
        payrollProcessingMethodId: this.id,
        status: 1
      };
    });
    this.payrollProcessSalaryService.update(comp).subscribe(result => {
      if (result) {
        this.payrollProcessService.updateProcessedStep(this.id, 2, { id: this.id, stepNumber: 2 })
          .subscribe(res => {
              this.toastr.showSuccessMessage('Payroll Salary Component Processing Completed');
              if (routeTo === 'continue') {
                this.selectTab.emit(3);
              } else {
                this.router.navigate(['../'], { relativeTo: this.route });
              }
          });
      }
    });

  }

}
