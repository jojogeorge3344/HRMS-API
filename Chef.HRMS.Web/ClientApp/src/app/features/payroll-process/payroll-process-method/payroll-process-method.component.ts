import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ModeOfPayrollProcessType } from '../../../models/common/types/modeofpayrollprocesstype';
import { Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged, map, filter } from 'rxjs/operators';
import { EmployeeService } from '@features/employee/employee.service';
import { PayGroupService } from '@settings/payroll/pay-group/pay-group.service';
import { PayGroup } from '@settings/payroll/pay-group/pay-group.model';
import { PayrollProcessService } from '../payroll-process.service';
import { NgbDateAdapter, NgbDateNativeAdapter } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { Months } from 'src/app/models/common/types/months';
import { Employee } from '@features/employee/employee.model';
import { getCurrentUserId } from '@shared/utils/utils.functions';
import { ToasterDisplayService } from 'src/app/core/services/toaster-service.service';

@Component({
  selector: 'hrms-payroll-process-method',
  templateUrl: './payroll-process-method.component.html',
  providers: [{ provide: NgbDateAdapter, useClass: NgbDateNativeAdapter }]
})
export class PayrollProcessMethodComponent implements OnInit {

  addForm: FormGroup;

  currentUser: number;
  modeOfPayrollProcessType = ModeOfPayrollProcessType;
  modeOfPayrollProcessTypeKeys: number[];

  employeeList: { id: number, name: string }[];
  selectedItems = [];
  @ViewChild('notifyPersonnel')
  notifyPersonnel: ElementRef;
  employeedetails: Employee[] = [];
  paygroup: PayGroup[];
  months = Months;
  previousMonths = [];
  currentDate = new Date();
  month: string;
  year: number;
  todaysDate: Date;

  constructor(
    public activeModal: NgbActiveModal,
    private formBuilder: FormBuilder,
    private toastr: ToasterDisplayService,
    private router: Router,
    private employeedetailsService: EmployeeService,
    private payGroupService: PayGroupService,
    private payrollProcessService: PayrollProcessService

  ) {
    this.todaysDate = new Date();
  }

  ngOnInit(): void {
    this.month = this.todaysDate.toLocaleString('default', { month: 'long' });
    this.year = this.todaysDate.getFullYear();
    this.getEmployeeDetails();
    this.getPayGroup();
    this.currentUser = getCurrentUserId();
    this.addForm = this.createFormGroup();
    this.modeOfPayrollProcessTypeKeys = Object.keys(this.modeOfPayrollProcessType).filter(Number).map(Number);

  }

  getPayGroup() {
    this.payGroupService.getAll().subscribe(result => {
      this.paygroup = result;
    },
      error => {
        console.error(error);
        this.toastr.showErrorMessage('Unable to fetch the Pay Group Details');
      });
  }

  getEmployeeDetails() {
    this.employeedetailsService.getAll().subscribe(result => {
      this.employeedetails = result;
    },
      error => {
        console.error(error);
        this.toastr.showErrorMessage('Unable to fetch the Employee Details');
      });
  }


  nameFormatter = (employee) => employee.firstName;

  search = (text$: Observable<string>) => text$.pipe(
    debounceTime(200),
    distinctUntilChanged(),
    filter(term => term.length >= 1),
    map(term => this.employeedetails.filter(employee => new RegExp(term, 'mi').test(employee.firstName)).slice(0, 10))
  )

  getPayGroupName(payGroupId) {
    return this.paygroup.filter((paygroup) => paygroup.id == payGroupId)[0].name;
  }

  onSubmit() {
    const assignPayrollProcess = this.addForm.value;
    assignPayrollProcess.payGroupId = parseInt(assignPayrollProcess.payGroupId, 10);
    if (assignPayrollProcess.modeOfProcessing === 1) {
      assignPayrollProcess.payGroupOrEmployeeName = this.getPayGroupName(parseInt(assignPayrollProcess.payGroupId, 10));
    }
    if (assignPayrollProcess.modeOfProcessing === 2) {
      assignPayrollProcess.payGroupOrEmployeeName = assignPayrollProcess.employeeId.firstName;
      assignPayrollProcess.payGroupId = 0;
    }
    assignPayrollProcess.employeeId = assignPayrollProcess.employeeId.id;
    this.payrollProcessService.updateProcess(assignPayrollProcess).subscribe((result: any) => {

      if (result) {
        this.toastr.showSuccessMessage('Payroll Process added successfully!');
        if (assignPayrollProcess.payGroupId) {
          this.router.navigate(['/payroll-processing/payroll-process-view'],
            { queryParams: { date: `${this.month}-${this.year}`, payGroup: assignPayrollProcess.payGroupId, id: result } });
        } else {
          this.router.navigate(['/payroll-processing/payroll-process-view'],
            {
              queryParams:
              {
                date: `${this.month}-${this.year}`,
                employee: assignPayrollProcess.employeeId,
                payGroup: assignPayrollProcess.payGroupId,
                id: result
              }
            });
        }
        this.activeModal.close('submit');
      }
    },
      error => {
        console.error(error);
        if (error.error && error.error.text === 'Already Exist') {
          this.toastr.showErrorMessage('This payroll process already exists');
        } else {
          this.toastr.showErrorMessage('Unable to add the Payroll Process');
        }
      });
  }

  createFormGroup(): FormGroup {
    return this.formBuilder.group({
      name: [`${this.month} - ${this.year} Payroll`],
      month: [this.months[this.month]],
      year: [this.year],
      modeOfProcessing: [],
      payGroupId: [0],
      employeeId: [''],
      payGroupOrEmployeeName: [],
      status: [false],
    });
  }
}
