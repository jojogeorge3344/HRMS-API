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
import { ActivatedRoute, Router } from '@angular/router';
import { RequestStatus } from 'src/app/models/common/types/requeststatustype';


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
  otHours: number;
  minDateFrom;
  maxDateFrom;
  minDateTo;
  maxDateTo;
  fromDate;
  toDate;
  numberOfDays;
  overtimeours;
  noticeDayVal = false;
  overtimeDetails: OvertimeRequest[];
  overtimeApplied = '';
  overtimeAvailable;
  alreadyApplied = false;
  flag = 0;
  employeeList: Employee[];
  selectedItems = [];
  overtimeConfiguration: OvertimePolicyConfiguration;
  holidaydate: any;
  taken = ['', ''];
  @Input() currentUserId;
  @Input() policyId;
  employeeDetails: any;
  employeeDetailsCheck: boolean;
  selectEnable: boolean;
  employeeLogin: any;
  config;
  requestTypes = RequestStatus;
  isLoading=false;
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
    private toastr: ToasterDisplayService,
    private route: ActivatedRoute,
    private router: Router) {
  }

  ngOnInit(): void {
    debugger
    this.current = new Date();
    this.addForm = this.createFormGroup();
    this.getEmployeeList();
    this.getOvertimeConfiguration();
    this.getMarkedDates(this.currentUserId);
    // this.markDisabled = (date: NgbDate) => this.calendar.getWeekday(date) >= 6;
    let b=this.router.routerState.snapshot.url;
    if(b=="/my-overtime"){
      this.employeeDetailsCheck=true
    }else{
      this.employeeDetailsCheck=false  
    }
    this.getLoginEmployeeDetail()
  }
  getEmployeeList() {
    this.isLoading=true;
    this.employeeService.getAll().subscribe(result => {
      this.employeeList = result.filter(employee => employee.id !== this.currentUserId);
      if(this.employeeDetailsCheck==false){
        let temp = { id: undefined, firstName: 'test', isLastRow: true }
      // lastrow
        this.employeeDetails = [...result, temp];
        this.isLoading=false
        this.selectEnable=true
      }
    },
      error => {
        console.error(error);
      });
  }
  // getEmployeeId(event){
  //   debugger
  //   let a=this.employeeDetails.filter(x=>x.firstName==event)
  //   this.addForm.patchValue({
  //     employeeId:a[0].id,
  //     employeeName:a[0].firstName

  //   })
  // }
  getOvertimeConfiguration() {
    debugger
    this.overtimePolicyConfigurationService.getOvertimeConfiguration(this.currentUserId).subscribe(result => {
      this.overtimeConfiguration = result;
      if(result.isOvertimeSlab==true){
        this.addForm.get("normalOverTime").enable();
        this.addForm.get("holidayOverTime").enable();
        this.addForm.get("specialOverTime").disable();
      }else{
        this.addForm.get("normalOverTime").enable();
        this.addForm.get("holidayOverTime").enable();
        this.addForm.get("specialOverTime").enable();
      }
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
    this.currentMonth = this.current.getMonth() + 1;
    this.currentYear = this.current.getFullYear();
    this.currentDay = this.current.getDate();
    console.log(this.currentMonth, this.currentYear);
    this.payrollProcessService.getPayrollStatusByEmpId(this.currentUserId, this.currentMonth, this.currentYear).subscribe(result => {
      this.payrollProcessed = result;
      console.log(this.overtimeConfiguration.maximumPastDayLimit);
      const minDate = new Date();
      console.log(minDate);
      if (this.payrollProcessed === 0) {
        if (this.overtimeConfiguration.maximumPastDayLimit > 0 && !this.overtimeConfiguration.isApprovalRequired) {
          minDate.setDate(minDate.getDate() - this.overtimeConfiguration.maximumPastDayLimit);
          this.minDateFrom = this.minDateTo = {
            year: minDate.getFullYear(),
            month: minDate.getMonth() + 1,
            day: minDate.getDate()
          };
        }
        else {
          minDate.setDate(minDate.getDate() + this.overtimeConfiguration.noticeDays);
          this.minDateFrom = this.minDateTo = {
            year: minDate.getFullYear(),
            month: minDate.getMonth() + 1,
            day: minDate.getDate() + this.overtimeConfiguration.noticeDays
          };
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

  getMarkedDates(userId) {
    this.overtimeRequestService.getMarkedDates(userId)
      .subscribe(res => {
        this.overtimeApplied = res;
        console.log(this.overtimeApplied);
        this.overtimeAvailable = this.overtimeConfiguration.maximumLimit - this.getOvertimeAppliedHour();
      });
  }

  isAlreadyApplied(date) {
    const currentDate = `${date.year}-${date.month.toString().padStart(2, '0')}-${date.day.toString().padStart(2, '0')}T00:00:00`;
    if (this.overtimeApplied.includes(currentDate)) {
      return { color: 'green' };
    }
    return;
  }

  alreadyAppliedValidation(date) {
    this.alreadyApplied = false;
    const currentDate = `${date.year}-${date.month.toString().padStart(2, '0')}-${date.day.toString().padStart(2, '0')}T00:00:00`;
    if (this.overtimeApplied.includes(currentDate)) {
      this.alreadyApplied = true;
    }
  }

  getOverTimeDetails() {
    this.overtimeRequestService.getAllOvertimeDetailsById(this.currentUserId).subscribe(result => {
      this.overtimeDetails = result;
    },
      error => {
        console.error(error);
      });
  }

  // getWeekNumber(thisDate) {
  //   var dt = new Date(thisDate);
  //   var thisDay = dt.getDate();

  //   var newDate = dt;
  //   newDate.setDate(1); // first day of month
  //   var digit = newDate.getDay();

  //   var Q = (thisDay + digit) / 7;

  //   var R = (thisDay + digit) % 7;

  //   if (R !== 0) return Math.ceil(Q);
  //   else return Q;
  // }
  
  onFromDateSelection(date: NgbDate) {
    this.minDateTo = date;
    this.fromDate = date;
    //if (this.toDate) { this.validateRequest(); }
  }

  onToDateSelection(date: NgbDate) {
    this.maxDateFrom = date;
    this.toDate = date;
    // if (this.fromDate) { this.validateRequest(); }
  }

  subscribeTochanges() {
    this.addForm.valueChanges.subscribe(res => {
      this.fromDate = this.addForm.get('fromDate').value;
      this.toDate = this.addForm.get('toDate').value;
      this.otHours = this.addForm.get('numberOfHours').value;
      if (this.fromDate && this.toDate && typeof this.fromDate !== 'string' && typeof this.toDate !== 'string') {
        this.numberOfDays = this.calculateDaysInBetween(this.fromDate, this.toDate);
      }
      if (this.overtimeConfiguration.isApprovalRequired) {
        var prDays = toInteger(this.calculateDaysInBetween(this.fromDate, this.current));
        if (prDays < this.overtimeConfiguration.noticeDays) {
          this.noticeDayVal = true;
        }
      }
      if (this.otHours < (this.numberOfDays * this.overtimeConfiguration.minimumOverTimeHour)) {
        this.addForm.controls.numberOfHours.setErrors({ minHours: true });
      } else {
        this.addForm.controls.numberOfHours.setErrors(null);
      }
      this.validateRequest();
    });
  }

  calculateDaysInBetween(fromDate, toDate) {
    let fromdateSec: any = fromDate;
    let todateSec: any = toDate;
    const millisecondsPerDay = 86400 * 1000; // Day in milliseconds
    fromdateSec.setHours(0, 0, 0, 1); // Start just after midnight
    todateSec.setHours(23, 59, 59, 999); // End just before midnight
    const diff = todateSec - fromdateSec; // Milliseconds between datetime objects
    let days = Math.ceil(diff / millisecondsPerDay);
    return days;
  }

  validateRequest() {
    if (this.overtimeAvailable >= this.overtimeConfiguration.maximumLimit && (this.overtimeConfiguration.minimumOverTimeHour > this.overtimeAvailable)) {
      this.addForm.controls.numberOfHours.setErrors({ numberOfHours: true });
    } else {
      this.addForm.controls.numberOfHours.setErrors(null);
    }
    if (!this.addForm.controls.numberOfHours.hasError('numberOfHours')) {
      if (!this.checkDates()) {
        this.addForm.controls.numberOfHours.setErrors({ daysTaken: true });
      } else {
        this.addForm.controls.numberOfHours.setErrors(null);
      }
    }
  }

  // getDates(fromDate, toDate) {
  //   var dateArray = new Array();
  //   var currentDate = fromDate;
  //   while (currentDate <= toDate) {
  //     dateArray.push(new Date(currentDate));
  //   }
  //   return dateArray;
  // }

  checkDates() {
    const d = new Date(this.fromDate);
    for (d; d <= this.toDate; d.setDate(d.getDate() + 1)) {
      const currentDate = `${d.getFullYear()}-${(d.getMonth() + 1).toString().padStart(2, '0')}-${d.getDate().toString().padStart(2, '0')}T00:00:00`;
      if (this.overtimeApplied.includes(currentDate)) {
        this.taken[0] = currentDate;
        this.taken[1] = 'leave';
        this.numberOfDays -= 1;
        //this.flag = 0;
        break;
      }
    }
    if (this.toDate <= d) {
      return true;
    } else {
      return false;
    }
  }

  getOvertimeAppliedHour() {
    const d = new Date();
    if (this.overtimeConfiguration.periodType === 1) {
      let startingDate = new Date(d.setDate(d.getDate() - d.getDay() + 1));
      let count = 0;
      for (let index = 0; index < 7; index++) {
        const DateString = `${startingDate.getUTCFullYear()}-${startingDate.getMonth() + 1}-${startingDate.getDate()}`;
        if (this.overtimeApplied.indexOf(DateString) !== -1) {
          count++;
        }
        startingDate = new Date(startingDate.setDate(startingDate.getDate() + 1));
      }
      return (count * this.overtimeConfiguration.timeBeyondShiftHour);
    } else if (this.overtimeConfiguration.periodType === 2) {
      const month = (d.getMonth() + 1).toString().padStart(2, '0');
      const year = (d.getFullYear()).toString();
      const re = new RegExp(`${year}-${month}-`, 'g');
      return ((this.overtimeApplied.match(re) || []).length * this.overtimeConfiguration.minimumOverTimeHour);
    } else if (this.overtimeConfiguration.periodType === 3) {
      const year = (d.getFullYear()).toString();
      const re = new RegExp(`${year}-`, 'g');
      return ((this.overtimeApplied.match(re) || []).length * this.overtimeConfiguration.minimumOverTimeHour);
    }
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
    debugger
    if(this.addForm.invalid){

      return
         
       }
    let addForm = this.addForm.value;
    addForm.numberOfDays = this.numberOfDays;
    addForm = {
      ...addForm,
      toDate: new Date(addForm.toDate.setHours(12)),
      fromDate: new Date(addForm.fromDate.setHours(12))
    };
    addForm.requestStatus=this.requestTypes.Approved
    //this.addForm.value.specialOverTime=this.addForm.value.specialOverTime?this.addForm.value.specialOverTime:0
  //  this.addForm.patchValue({fromDate : new Date(this.addForm.value.fromDate.setHours(12)),toDate  : new Date(this.addForm.value.toDate.setHours(12))})
    this.overtimeRequestService.add(addForm).subscribe((result: any) => {
      if (result.id !== -1) {
        const notifyPersonnelForm = this.selectedItems.map(notifyPerson => ({
          overtimeId: result,
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
  draftSave() {
    debugger
    if(this.addForm.invalid){

      return
         
       }
    debugger
    let addForm = this.addForm.value;
    addForm.numberOfDays = this.numberOfDays;
    addForm = {
      ...addForm,
      toDate: new Date(addForm.toDate.setHours(12)),
      fromDate: new Date(addForm.fromDate.setHours(12))
    };
    addForm.requestStatus=this.requestTypes.Draft
    //this.addForm.value.specialOverTime=this.addForm.value.specialOverTime?this.addForm.value.specialOverTime:0
  //  this.addForm.patchValue({fromDate : new Date(this.addForm.value.fromDate.setHours(12)),toDate  : new Date(this.addForm.value.toDate.setHours(12))})
    this.overtimeRequestService.add(addForm).subscribe((result: any) => {
      if (result.id !== -1) {
        const notifyPersonnelForm = this.selectedItems.map(notifyPerson => ({
          overtimeId: result,
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
      numberOfHours: [0, [
        //Validators.required,
        Validators.max(524),
        Validators.pattern('^[0-9]+$')
      ]],
      reason: ['', [
        Validators.maxLength(250),
      ]],
      employeeId: [0],
      requestStatus: [0],
      normalOverTime:[null],
      holidayOverTime:[null],
      specialOverTime:[null],
      employeeName:[null]
    });
  }
getLoginEmployeeDetail(){
  debugger
  this.employeeService.getLoginEmployee(this.currentUserId).subscribe(res=>{
    this.employeeLogin=res
    if(this.employeeDetailsCheck==true){
      this.addForm.patchValue({
        employeeName:this.employeeLogin.firstName,
        employeeId:this.currentUserId
      })
    }
  })
}
selectEmployee(args){
  debugger
  if(args.value && args.value.id){
    this.addForm.patchValue({
      employeeName:args.value.firstName,
      employeeId:args.value.id
      })
  }else{
    this.addForm.patchValue({
      employeeName: null,
      employeeId:0
    })  
  }
}
refreshEmployee(event){
  debugger
  event.stopPropagation();
  event.preventDefault();
  this.getEmployeeList();
}
}
