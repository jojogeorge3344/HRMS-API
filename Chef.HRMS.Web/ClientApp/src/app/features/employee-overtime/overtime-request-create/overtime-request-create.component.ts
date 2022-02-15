import { Component, OnInit, ViewChild, ElementRef, Input } from '@angular/core';
import { NgbActiveModal, NgbCalendar, NgbDate, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged, filter, map } from 'rxjs/operators';
import { PayrollProcessService } from 'src/app/features/payroll-process/payroll-process.service';
import { calculateDaysInBetween } from '@shared/utils/utils.functions';
import { NgbDateAdapter, NgbDateNativeAdapter } from '@ng-bootstrap/ng-bootstrap';
import { OvertimeRequestService } from '../overtime-request.service';
import { Employee } from '@features/employee/employee.model';
import { EmployeeService } from '@features/employee/employee.service';
import { OvertimePolicyConfiguration } from '@settings/overtime/overtime-policy-configuration/overtime-policy-configuration.model';
import { OvertimePolicyConfigurationService } from '@settings/overtime/overtime-policy-configuration/overtime-policy-configuration.service';
import { ToasterDisplayService } from 'src/app/core/services/toaster-service.service';
import { HolidayService } from '@settings/holiday/holiday.service';

@Component({
  templateUrl: './overtime-request-create.component.html',
  providers: [{ provide: NgbDateAdapter, useClass: NgbDateNativeAdapter }]
})
export class OvertimeRequestCreateComponent implements OnInit {

  addForm: FormGroup;
  current: Date;
  payrollProcessed: any;
  currentMonth: Number;
  currentYear: Number;
  minDateFrom;
  maxDateFrom;
  minDateTo;
  maxDateTo;
  fromDate;
  toDate;
  numberOfDays;
 // markDisabled;
  employeeList: Employee[];
  selectedItems = [];
  overtimeConfiguration: OvertimePolicyConfiguration;
  holidaydate: any;

  @Input() currentUserId;
  @Input() policyId;

  @ViewChild('notifyPersonnel') notifyPersonnel: ElementRef;

  constructor(
    private overtimeRequestService: OvertimeRequestService,
    private overtimePolicyConfigurationService: OvertimePolicyConfigurationService,
    private employeeService: EmployeeService,
    private payrollProcessService: PayrollProcessService,
    private calendar: NgbCalendar,
    private holidayService: HolidayService,
    public activeModal: NgbActiveModal,
    private formBuilder: FormBuilder,
    private toastr: ToasterDisplayService) {
  }

  ngOnInit(): void {
    this.addForm = this.createFormGroup();
    this.getEmployeeList();
    this.getOvertimeConfiguration();
    this.subscribeTochanges();
    // },
    //   error => {
    //     console.error(error);
    //   });
    // this.markDisabled = (date: NgbDate) => this.calendar.getWeekday(date) >= 6;
  }

  getOvertimeConfiguration() {
    this.overtimePolicyConfigurationService.getOvertimeConfiguration(this.currentUserId).subscribe(result => {
      this.overtimeConfiguration = result;
      console.log(this.overtimeConfiguration);
      this.setCalendar();
      this.addForm.patchValue({ overTimePolicyId: this.overtimeConfiguration.overTimePolicyId });
      if (this.overtimeConfiguration.isCommentRequired) {
        this.addForm.get('reason').setValidators([Validators.required, Validators.maxLength(250)]);
      }
    },
      error => {
        console.error(error);
      });
  }

  setCalendar() {
    const current = new Date();
    const currentMonth = current.getMonth() + 1;
    const currentYear = current.getFullYear();
    const currentDay = current.getDay();
    console.log(currentMonth, currentYear);
    this.payrollProcessService.getPayrollStatusByEmpId(this.currentUserId, currentMonth, currentYear).subscribe(result => {
      console.log(result);

      this.payrollProcessed = result;
      console.log(this.overtimeConfiguration.maximumPastDayLimit);
      const minDate = new Date();
          console.log(minDate);
      if (this.payrollProcessed === 0) {
        if (this.overtimeConfiguration.maximumPastDayLimit > 0 && !this.overtimeConfiguration.isApprovalRequired) {
          

          minDate.setDate(minDate.getDate() - this.overtimeConfiguration.maximumPastDayLimit);
          console.log(minDate);

          this.minDateFrom = {
            year: minDate.getFullYear(),
            month: minDate.getMonth() + 1,
            day: minDate.getDay() + 6
          };
          // console.log(this.minDateFrom);

        }
        else {
          minDate.setDate(minDate.getDate() + this.overtimeConfiguration.noticeDays);
          console.log(minDate);

          this.minDateFrom = {
            year: minDate.getFullYear(),
            month: minDate.getMonth() + 1,
            day: minDate.getDay()
          };
          // console.log(this.minDateFrom);

        }
      }
      // else {
      //   this.minDateFrom = {
      //     year: currentYear,
      //     month: currentMonth,
      //     day: currentDay
      //   };
      // }


    },
      error => {
        console.error(error);
      });
  }

  onFromDateSelection(date: NgbDate) {
    console.log(date);
    this.minDateTo = date;
  }

  onToDateSelection(date: NgbDate) {
    this.maxDateFrom = date;
  }

  subscribeTochanges() {
    this.addForm.valueChanges.subscribe(res => {
      this.fromDate = this.addForm.get('fromDate').value;
      this.toDate = this.addForm.get('toDate').value;
      if (this.fromDate && this.toDate && typeof this.fromDate !== 'string' && typeof this.toDate !== 'string') {
        this.numberOfDays = calculateDaysInBetween(this.fromDate, this.toDate);
        console.log(this.numberOfDays);
        
      }
      this.validateRequest();
    });
  }

  validateRequest(){
   // let overTimeHourse=this.overtimeConfiguration.
  }

  getEmployeeHoliday() {
    this.holidayService.getAll().subscribe(res => {
      let holidaydata = res;
      this.holidaydate = [];
      holidaydata.filter(y => {
        this.holidaydate.push(
          y.date
        )
      })
    })
  }

  markDisabled = (date: NgbDateStruct) => {
    const d = new Date(date.year, date.month - 1, date.day);
    let holidays = [];
    if (this.holidaydate?.length) {
      this.holidaydate.map((item) => {
        var myDate = item.split('-');
        var newDate = new Date(myDate[0], myDate[1] - 1, myDate[2].split('T')[0]);
        holidays.push(newDate.getTime());
      })
    }

    return holidays.indexOf(d.getTime()) != -1;// return date.month !== current.month;  };
  }

  getEmployeeList() {
    this.employeeService.getAll().subscribe(result => {
      this.employeeList = result.filter(employee => employee.id !== this.currentUserId);
    },
      error => {
        console.error(error);
      });
  }

  formatter = (employee) => employee.firstName;

  search = (text$: Observable<string>) => text$.pipe(
    debounceTime(200),
    distinctUntilChanged(),
    filter(term => term.length >= 2),
    map(term => this.employeeList.filter(employee => new RegExp(term, 'mi').test(employee.firstName)).slice(0, 10))
  )

  selected($event) {
    $event.preventDefault();
    if (this.selectedItems.indexOf($event.item) === -1) {
      this.selectedItems.push($event.item);
    }
    this.notifyPersonnel.nativeElement.value = '';
  }

  remove(item) {
    this.selectedItems.splice(this.selectedItems.indexOf(item), 1);
  }

  onSubmit() {
    this.overtimeRequestService.add(this.addForm.value).subscribe((result: any) => {
      if (result.id !== -1) {
        const notifyPersonnelForm = this.selectedItems.map(notifyPerson => ({
          overtimeId: result.id,
          notifyPersonnel: notifyPerson.id
        }));

        this.overtimeRequestService.addNotifyPersonnel(notifyPersonnelForm).subscribe(() => {
          this.toastr.showSuccessMessage('Overtime request submitted successfully!');
          this.activeModal.close('submit');
        });
      }
    },
      error => {
        console.error(error);
        this.toastr.showErrorMessage('Unable to submit the overtime request ');
      });
  }

  createFormGroup(): FormGroup {
    return this.formBuilder.group({
      overTimePolicyId: this.policyId,
      fromDate: ['', [
        Validators.required
      ]],
      toDate: ['', [
        Validators.required
      ]],
      numberOfHours: [null, [
        Validators.required,
        Validators.max(524)
      ]],
      reason: ['', [
        Validators.maxLength(128),
      ]],
      employeeId: [this.currentUserId],
      requestStatus: [1]
    });
  }

}
