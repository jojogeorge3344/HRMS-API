import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged, filter, map } from 'rxjs/operators';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

import { PayrollProcess } from '../payroll-process.model';
import { Employee } from '@features/employee/employee.model';
import { Months } from 'src/app/models/common/types/months';
import { ModeOfPayrollProcessType } from 'src/app/models/common/types/modeofpayrollprocesstype';
import { PayGroupService } from '@settings/payroll/pay-group/pay-group.service';
import { PayrollProcessService } from '../payroll-process.service';
import { EmployeeService } from '@features/employee/employee.service';
import { getCurrentUserId } from '@shared/utils/utils.functions';
import { ToasterDisplayService } from 'src/app/core/services/toaster-service.service';

@Component({
  selector: 'hrms-payroll-process-view',
  templateUrl: './payroll-process-view.component.html'
})
export class PayrollProcessViewComponent implements OnInit, OnDestroy {

  months = Months;
  previousMonths = [];
  selectedMonth: any;
  selectedYear: any;
  noOfCalendarDays: any;
  paygroup: any;
  modeOfPayrollProcessType = ModeOfPayrollProcessType;
  modeOfPayrollProcessTypeKeys: number[];
  currentUser: any;
  addForm: any;
  employeedetails: Employee[] = [];
  toUnsubscribe: Subscription[] = [];
  previousDetails: PayrollProcess[];
  payrollProcessMonthDetails:any=[]
  isDisabled:boolean=true
  payrollSelectedMonth:any
  payrollleaveCutOff:any
  payrollYear:any
  overtimeCutoff:any


  constructor(
    private router: Router,
    private toastr: ToasterDisplayService,
    public modalService: NgbModal,
    private formBuilder: FormBuilder,
    private payGroupService: PayGroupService,
    private employeedetailsService: EmployeeService,
    private payrollProcessService: PayrollProcessService
  ) { }
  ngOnDestroy(): void {
    for (const observable of this.toUnsubscribe) {
      observable.unsubscribe();
    }
  }

  ngOnInit(): void {
   
    this.getEmployeeDetails();
    this.getPayGroup();
    this.getPreviousDetails();
    this.currentUser = getCurrentUserId();
    this.addForm = this.createFormGroup();
    this.getMonthForPayRollProcess()
    this.subscribeToChanges();
   // this.getPayrollMonths();
    this.modeOfPayrollProcessTypeKeys = Object.keys(this.modeOfPayrollProcessType).filter(Number).map(Number);
    
  }
  getPreviousDetails() {
    debugger
    this.payrollProcessService.getPreviousDetails().subscribe(res => {
      this.previousDetails = res;
    });
  }
  subscribeToChanges() {
    this.toUnsubscribe.push(
      this.addForm.valueChanges.subscribe(res => {
        if (res.modeOfProcessing === 2) {
          this.addForm.patchValue({ payGroupId: 0 }, { emitEvent: false });
          const previousDetails = this.previousDetails.filter(details =>
            res.employeeId && details.employeeId === res.employeeId.id
          );
          this.previousMonths = this.previousMonths.map(month => {
            const isprocessed = previousDetails.find(process =>
              process.month === month.month && process.year === month.year
            );
            return {
              ...month,
              processed: isprocessed === undefined ? false : true
            };
          });
        }
        if (res.modeOfProcessing === 1) {
          this.addForm.patchValue({ employeeId: '' }, { emitEvent: false });
          const previousDetails = this.previousDetails.filter(details =>
            details.payGroupId === parseInt(res.payGroupId, 10)
          );
          this.previousMonths = this.previousMonths.map(month => {
            const isprocessed = previousDetails.find(process =>
              process.month === month.month && process.year === month.year
            );
            return {
              ...month,
              processed: isprocessed === undefined ? false : true
            };
          });
        }
      })
    );
    console.log('months',this.previousMonths)
  }

  getPayGroup() {
    this.payGroupService.getAll().subscribe(result => {
      this.paygroup = result;
    });
  }
  nameFormatter = (employee) => employee.fullName;

  search = (text$: Observable<string>) => text$.pipe(
    debounceTime(200),
    distinctUntilChanged(),
    filter(term => term.length >= 1),
    map(term => this.employeedetails.filter(employee => new RegExp(term, 'mi').test(employee.fullName)).slice(0, 10))
  )

  getPayGroupName(payGroupId) {
    return this.paygroup.filter((paygroup) => paygroup.id == payGroupId)[0].name;
  }
  getEmployeeDetails() {
    this.employeedetailsService.getAll().subscribe(result => {
      this.employeedetails = result;
    });
  }

  getPayrollMonths() {
    const today = new Date();
    let month = today.getMonth() + 1;
    let year = today.getUTCFullYear();
    // this.selectedMonth = month;
    // this.selectedYear = year;

    this.selectedMonth = this.payrollSelectedMonth;
    this.selectedYear = this.payrollleaveCutOff;
    this.noOfCalendarDays = new Date(year, month, 0).getDate();

    for (let index = 0; index < 12; index++) {
      this.previousMonths.push({ month, year, processed: false });
      if (month <= 1) {
        month = 12;
        year--;
      } else {
        month--;
      }
    }
  }
  getBorders(month) {
    if (this.selectedMonth === month.month) {
      return ` 4px solid #4679cc`;
    }
    return ` 1px solid rgba(0, 0, 0, 0.08)`;

  }
  getPadding(month) {
    if (this.selectedMonth === month.month) {
      return ` calc(0.75rem - 3px)`;
    }
    return ` 0.75rem `;
  }
  payrollMonths(payrollMonth) {
    // this.selectedMonth = payrollMonth.month;
    // this.selectedYear = payrollMonth.year;
    this.selectedMonth = this.payrollSelectedMonth
    this.selectedYear = this.payrollYear
    this.noOfCalendarDays = new Date(this.selectedYear, payrollMonth.month, 0).getDate();
  }

  openPayrollProcessMonth() {
    let currentUser = JSON.parse(localStorage.getItem('currentUser'));
    debugger
    const assignPayrollProcess = {
      ...this.addForm.value,
      name: `${this.months[this.selectedMonth]} - ${this.selectedYear} Payroll`,
      month: this.selectedMonth,
      year: this.selectedYear,
    };
    if (assignPayrollProcess.modeOfProcessing === 1) {
      assignPayrollProcess.payGroupId = parseInt(assignPayrollProcess.payGroupId, 10);
      assignPayrollProcess.payGroupOrEmployeeName = this.getPayGroupName(parseInt(assignPayrollProcess.payGroupId, 10));
    }
    if (assignPayrollProcess.modeOfProcessing === 2) {
      assignPayrollProcess.payGroupOrEmployeeName = assignPayrollProcess.employeeId.firstName;
      assignPayrollProcess.payGroupId = 0;

    }
    assignPayrollProcess.employeeId = assignPayrollProcess.employeeId.id?assignPayrollProcess.employeeId.id:currentUser[0].employeeId;
    const completedProcess = this.previousDetails.find(process => {
      return ((process.modeOfProcessing === 2 && process.employeeId === assignPayrollProcess.employeeId) ||
        (process.modeOfProcessing === 1 && process.payGroupId === assignPayrollProcess.payGroupId)) &&
        process.month === assignPayrollProcess.month &&
        process.year === assignPayrollProcess.year;
    });
    if (completedProcess) {
      this.toastr.showInfoMessage('This process has been created already');

    } else {
      this.payrollProcessService.updateProcess(assignPayrollProcess).subscribe(res => {
        
        if (assignPayrollProcess.payGroupId) {
          this.router.navigate(['/payroll-processing/payroll-process-setup'],
            {
              queryParams:
              {
                date: `${this.months[this.selectedMonth]}-${this.selectedYear}`,
                payGroup: assignPayrollProcess.payGroupId, 
                id: currentUser[0].employeeId,
                month: this.payrollSelectedMonth,
                year:this.payrollYear,
                cutOffDay:this.payrollleaveCutOff,
                // processId:res
                processId:res,
                overTimeCutOff:this.overtimeCutoff
              }
             
            });
        } else {
          this.router.navigate(['/payroll-processing/payroll-process-employee'],
            {
              queryParams:
              {
                date: `${this.months[this.selectedMonth]}-${this.selectedYear}`,
                employee: assignPayrollProcess.employeeId,
                id: res
              }
            });
        }
      }, error => {
        if (error.error && error.error.text === 'Already Exist') {
          this.toastr.showErrorMessage('This Payroll Process Already Exist');
        } else {
          this.toastr.showErrorMessage('Unable to add the Payroll Process');
        }
      });
    }

  }



  getMonthForPayRollProcess(){
    this.previousMonths=[]
    const date = new Date();

    const previousMonth = new Date(date.getTime());
    previousMonth.setDate(0);
    let year = previousMonth.getFullYear()
    let month =  previousMonth.getMonth() + 1
    var firstDay = new Date(2023,
                           4, 25)
    var previousdaye = new Date(2023,
    4-1, 25)

    this.payrollProcessService.getPayrollProcessingMonthDetails(this.addForm.value.payGroupId).subscribe(res => {
      this.payrollProcessMonthDetails = res

      // this.payrollSelectedMonth = this.payrollProcessMonthDetails[0].month
      // this.payrollleaveCutOff = this.payrollProcessMonthDetails[0].leaveCutOff
      // this.payrollYear = this.payrollProcessMonthDetails[0].year
      // this.overtimeCutoff = this.payrollProcessMonthDetails[0].timeSheetCutOff


      this.payrollSelectedMonth = 5
      this.payrollleaveCutOff = 25
      this.payrollYear = 2023
      this.overtimeCutoff = 25 
     // this.getPayrollMonths();

     const today = new Date();
    let month = today.getMonth() + 1;
    let year = today.getUTCFullYear();
    // this.selectedMonth = month;
    // this.selectedYear = year;

    this.selectedMonth = this.payrollSelectedMonth;
    this.selectedYear = this.payrollYear;
    this.noOfCalendarDays = new Date(year, month, 0).getDate();

    for (let index = 0; index < 12; index++) {
      this.previousMonths.push({ month, year, processed: false });
      if (month <= 1) {
        month = 12;
        year--;
      } else {
        month--;
      }
    }
    });
  }

  createFormGroup(): FormGroup {
    return this.formBuilder.group({
      name: [`${this.months[this.selectedMonth]} - ${this.selectedYear} Payroll`],
      month: [this.selectedMonth],
      year: [this.selectedYear],
      modeOfProcessing: [],
      payGroupId: [0],
      employeeId: [''],
      payGroupOrEmployeeName: [],
      status: [false]
    });
  }
}
