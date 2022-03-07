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
//import { TeamAttendanceService } from '@features/team-attendance/team-attendance.service';
import { HolidayService } from '@settings/holiday/holiday.service';
import { apply } from '@angular-devkit/schematics';
import { toInteger, toNumber } from 'lodash';
import { OvertimeRequest } from '../overtime-request.model';
import { timeStamp } from 'console';


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
  currentDay: Number;
  otHours: Number;
  minDateFrom;
  maxDateFrom;
  minDateTo;
  maxDateTo;
  fromDate;
  toDate;
  numberOfDays;
  noticeDayVal = false;
  overtimeDetails: OvertimeRequest[];
  overtimeApplied = '';
  alreadyApplied=false;
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
   // private teamAttendanceService: TeamAttendanceService,
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
    this.getMarkedDates(this.currentUserId);
    //  this.getOverTimeDetails();
    // this.subscribeTochanges();
    // },
    //   error => {
    //     console.error(error);
    //   });
    // this.markDisabled = (date: NgbDate) => this.calendar.getWeekday(date) >= 6;
  }

  getMarkedDates(userId) {
    var tablename = 'overtime'
    this.overtimeRequestService.getMarkedDates(userId)
      .subscribe(res => {
        this.overtimeApplied = res;
        console.log(this.overtimeApplied); 
      });
  }

  isAlreadyApplied(date) {
    const currentDate = `${date.year}-${date.month.toString().padStart(2, '0')}-${date.day.toString().padStart(2, '0')}T00:00:00`;
    if (this.overtimeApplied.includes(currentDate)) {
      return { color: 'green' };
    }
    return;
  }
  alreadyAppliedValidation(date){
    this.alreadyApplied=false;
    const currentDate = `${date.year}-${date.month.toString().padStart(2, '0')}-${date.day.toString().padStart(2, '0')}T00:00:00`;
    if (this.overtimeApplied.includes(currentDate)) {
      this.alreadyApplied=true;
    }
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

  getOverTimeDetails() {
    this.overtimeRequestService.getAllOvertimeDetailsById(this.currentUserId).subscribe(result => {
      this.overtimeDetails = result;
      //  this.overtime=this.overtimeDetails
      console.log(this.overtimeDetails);
    },
      error => {
        console.error(error);
      });
  }

  getWeekNumber(thisDate) {
    var dt = new Date(thisDate);
    var thisDay = dt.getDate();

    var newDate = dt;
    newDate.setDate(1); // first day of month
    var digit = newDate.getDay();

    var Q = (thisDay + digit) / 7;

    var R = (thisDay + digit) % 7;

    if (R !== 0) return Math.ceil(Q);
    else return Q;
  }

  setCalendar() {
    this.current = new Date();

    var weekno = this.getWeekNumber(this.current);
    console.log('hohoho', weekno);

    this.currentMonth = this.current.getMonth() + 1;
    this.currentYear = this.current.getFullYear();
    this.currentDay = this.current.getDate();
    console.log(this.currentMonth, this.currentYear);
    this.payrollProcessService.getPayrollStatusByEmpId(this.currentUserId, this.currentMonth, this.currentYear).subscribe(result => {
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
            day: minDate.getDate()
          };
          console.log(this.minDateFrom);

        }
        else {
          minDate.setDate(minDate.getDate() + this.overtimeConfiguration.noticeDays);
          console.log(minDate);
          this.minDateFrom = {
            year: minDate.getFullYear(),
            month: minDate.getMonth() + 1,
            day: minDate.getDate() + this.overtimeConfiguration.noticeDays
          };
          // console.log(this.minDateFrom);
        }
      }
      else {
        this.minDateFrom = {
          year: this.currentYear,
          month: this.currentMonth,
          day: this.currentDay
        };
      }
    },
      error => {
        console.error(error);
      });
  }

  onFromDateSelection(date: NgbDate) {
    this.minDateTo = date;
    this.fromDate = date;
    if (this.toDate) { this.validateRequest(); }
  }

  onToDateSelection(date: NgbDate) {
    this.maxDateFrom = date;
    this.toDate = date;
    if (this.fromDate) { this.validateRequest(); }
  }

  // subscribeTochanges() {
  //   this.addForm.valueChanges.subscribe(res => {
  //     console.log("gwettyyyu");
  //     this.fromDate = this.addForm.get('fromDate').value;
  //     this.toDate = this.addForm.get('toDate').value;
  //     this.otHours = this.addForm.get('numberOfHours').value;
  //     if (this.fromDate && this.toDate && typeof this.fromDate !== 'string' && typeof this.toDate !== 'string') {
  //       this.numberOfDays = calculateDaysInBetween(this.fromDate, this.toDate)+2;
  //       console.log(this.fromDate, this.toDate);
  //       console.log(this.numberOfDays);
  //     }
  //     this.validateRequest();
  //   });
  // }

  calculateDaysInBetween(fromDate, toDate) {

    let fromdateSec: any = fromDate;
    let todateSec: any = toDate;

    // this.isSingleDay = (todateSec - fromdateSec) === 0;

    // Calculate days between dates
    const millisecondsPerDay = 86400 * 1000; // Day in milliseconds
    fromdateSec.setHours(0, 0, 0, 1); // Start just after midnight
    todateSec.setHours(23, 59, 59, 999); // End just before midnight

    const diff = todateSec - fromdateSec; // Milliseconds between datetime objects
    let days = Math.ceil(diff / millisecondsPerDay);

    // // Subtract two weekend days for every week in between
    // const weeks = Math.floor(days / 7);
    // days = days - (weeks * 2);

    // // Handle special cases
    // fromdateSec = fromdateSec.getDay();
    // todateSec = todateSec.getDay();

    // // Remove weekend not previously removed.
    // if (fromdateSec - todateSec > 1) {
    //   days = days - 2;
    // }

    // // Remove start day if span starts on Sunday but ends before Saturday
    // if (fromdateSec == 0 && todateSec != 6) {
    //   days = days - 1;
    // }

    // // Remove end day if span ends on Saturday but starts after Sunday
    // if (todateSec === 6 && fromdateSec !== 0) {
    //   days = days - 1;
    // }
    return days;
  }

  validateRequest() {
    this.fromDate = this.addForm.get('fromDate').value;
    this.toDate = this.addForm.get('toDate').value;
    this.otHours = this.addForm.get('numberOfHours').value;
    if (this.fromDate && this.toDate && typeof this.fromDate !== 'string' && typeof this.toDate !== 'string') {
      this.numberOfDays = this.calculateDaysInBetween(this.fromDate, this.toDate);
      // console.log(this.fromDate);
      // console.log(this.toDate);

      // console.log(this.numberOfDays);
      // console.log(this.fromDate);
      // console.log(this.current);

    }
    if (this.overtimeConfiguration.isApprovalRequired) {
      var prDays = toInteger(this.calculateDaysInBetween(this.fromDate, this.current));
      console.log(prDays);
      if (prDays < this.overtimeConfiguration.noticeDays) {
        this.noticeDayVal = true;
      }
    }
    var dateArray=this.getDates(this.fromDate,this.toDate);
    console.log(dateArray);

    
    //this.checkAlreadyAppliedOrNot(this.fromDate,this.toDate,this.currentUserId);

    // let overTimeHourse=this.overtimeConfiguration.
  }

getDates(fromDate, toDate) {
    var dateArray = new Array();
    var currentDate = fromDate;
    while (currentDate <= toDate) {
        dateArray.push(new Date (currentDate));
        //currentDate = currentDate.addDays(1);
    }
    return dateArray;
}

  // checkAlreadyAppliedOrNot(fromDate,toDate,userId){
  //   this.overtimeRequestService.getMarkedDates(userId)
  //     .subscribe(res => {
  //       this.overtimeApplied = res;
  //       console.log(this.overtimeApplied); 
  //     });
  // }

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
    let addForm = this.addForm.value;
    addForm.numberOfDays = this.numberOfDays;
    addForm = {
      ...addForm,
      toDate: new Date(addForm.toDate.setHours(12)),
      fromDate: new Date(addForm.fromDate.setHours(12))
    };
    console.log("form values",addForm);
    
    this.overtimeRequestService.add(addForm).subscribe((result: any) => {
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
        Validators.maxLength(250),
      ]],
      employeeId: [this.currentUserId],
      requestStatus: [1]
    });
  }
}
