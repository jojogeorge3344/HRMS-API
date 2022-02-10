import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { NgbActiveModal, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EmployeeLeaveService } from '../employee-leave.service';
import { NgbDateAdapter, NgbDateNativeAdapter, NgbDate, NgbCalendar } from '@ng-bootstrap/ng-bootstrap';
import { LeaveBalanceValidator, calculateDaysInBetween } from '@shared/utils/utils.functions';
import { Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged, map, filter } from 'rxjs/operators';
import { LeaveComponent } from '@settings/leave/leave-component/leave-component.model';
import { Employee } from '@features/employee/employee.model';
import { EmployeeService } from '@features/employee/employee.service';
import { SignalrService } from '@shared/services/signalr.service';
import { ToasterDisplayService } from 'src/app/core/services/toaster-service.service';
import { HolidayService } from '@settings/holiday/holiday.service';
import { formatDate ,DatePipe} from '@angular/common';

@Component({
  templateUrl: './employee-leave-request-create.component.html',
  providers: [{ provide: NgbDateAdapter, useClass: NgbDateNativeAdapter }]
})
export class EmployeeLeaveRequestCreateComponent implements OnInit {

  addForm: FormGroup;
  leaveComponents: LeaveComponent[];

  @Input() requestId: any;
  @Input() leaveBalance: any = [];
  @Input() leaveSettings: any;

  fromDate: Date;
  toDate: Date;
  numberOfDays = 0;
  isSingleDay: boolean;
  selectedButton: any;
  selectedLeaveComponent: any;
  minDateFrom;
  maxDateFrom;
  minDateTo;
  maxDateTo;
  currentDate;
  isValid = true;

  employeeList: Employee[];
  selectedItems = [];
  @ViewChild('notifyPersonnel')
  notifyPersonnel: ElementRef;
  employeeDetails: Employee;
  taken = ['', ''];
  @Input() leaves;
  @Input() wfh;
  @Input() onDuty;
  holidaydate: any;

  constructor(
    private employeeLeaveService: EmployeeLeaveService,
    private employeeService: EmployeeService,
    private signalrService: SignalrService,
    private calendar: NgbCalendar,
    public activeModal: NgbActiveModal,
    private formBuilder: FormBuilder,
    private toastr: ToasterDisplayService,
    private holidayService :HolidayService,
    private datepipe: DatePipe,
  ) {
    const current = new Date();
    this.minDateFrom = {
      year: current.getFullYear(),
      month: current.getMonth() + 1,
      day: current.getDate()
    };
    this.maxDateFrom = {
      year: current.getFullYear() + 1,
      month: 3,
      day: 31
    };
    this.minDateTo = {
      year: current.getFullYear(),
      month: 4,
      day: 1
    };
    this.maxDateTo = {
      year: current.getFullYear() + 1,
      month: 3,
      day: 31
    };
    this.currentDate = {
      year: current.getFullYear(),
      month: current.getMonth() + 1,
      day: current.getDate()
    };
  }

  ngOnInit(): void {
    this.addForm = this.createFormGroup();
    this.getLeaveBalance();
    this.getEmployeeDetails();
    this.getEmployeeList();
    this.subscribeTochanges();
    this.getEmployeeHoliday();
  }
  subscribeTochanges() {
    this.addForm.valueChanges.subscribe(res => {
      this.fromDate = this.addForm.get('fromDate').value;
      this.toDate = this.addForm.get('toDate').value;
      if (this.fromDate && this.toDate && typeof this.fromDate !== 'string' && typeof this.toDate !== 'string') {
        this.numberOfDays = calculateDaysInBetween(this.fromDate, this.toDate);
        this.isSingleDay = this.numberOfDays === 1;
        if (this.isSingleDay) {
          if (res.singleDay === 1) {
            this.numberOfDays = 1;
            this.addForm.patchValue({
              isFullDay: true,
              isFirstDayFirstHalf: false,
              isFirstDaySecondHalf: false,
            }, { emitEvent: false });
          } else if (res.singleDay === 2) {
            this.numberOfDays = 0.5;
            this.addForm.patchValue({
              isFullDay: false,
              isFirstDayFirstHalf: true,
              isFirstDaySecondHalf: false,
            }, { emitEvent: false });
          } else if (res.singleDay === 3) {
            this.numberOfDays = 0.5;
            this.addForm.patchValue({
              isFullDay: false,
              isFirstDayFirstHalf: true,
              isFirstDaySecondHalf: false,
            }, { emitEvent: false });
          }
        } else {
          if (res.firstDay === 1) {
            this.addForm.patchValue({
              isFirstDayFirstHalf: true,
              isFirstDaySecondHalf: false,
            }, { emitEvent: false });
          } else if (res.firstDay === 2) {
            this.addForm.patchValue({
              isFirstDayFirstHalf: false,
              isFirstDaySecondHalf: true,
            }, { emitEvent: false });
          }
          if (res.lastDay === 1) {
            this.addForm.patchValue({
              isSecondDayFirstHalf: true,
              isSecondDaySecondHalf: false,
            }, { emitEvent: false });
          } else if (res.lastDay === 2) {
            this.addForm.patchValue({
              isSecondDayFirstHalf: false,
              isSecondDaySecondHalf: true,
            }, { emitEvent: false });
          }
          if (res.firstDay === 2 && res.lastDay === 1) {
            this.numberOfDays -= 1;
          } else if (res.firstDay === 2 || res.lastDay === 1) {
            this.numberOfDays -= 0.5;
          }
        }
      }
      this.validateRequest();
    });
  }

  getEmployeeDetails() {
    this.employeeService.getDetails(this.requestId).subscribe(result => {
      this.employeeDetails = result;
      this.addForm.patchValue({
        leaveStructureId: this.employeeDetails.leaveStructureId
      }, {
        emitEvent: false
      });
    },
      error => {
        console.error(error);
      });
  }

  getLeaveBalance() {
    this.employeeLeaveService.getAllLeaveBalance(this.requestId).subscribe(result => {
      this.leaveBalance = result;
    },
      error => {
        console.error(error);
        this.toastr.showErrorMessage('Unable to fetch the Leave Balance');
      });
  }

  getEmployeeList() {
    this.employeeService.getAll().subscribe(result => {
      this.employeeList = result.filter(employee => employee.id !== this.requestId);
    },
      error => {
        console.error(error);
      });
  }
  isAlreadyApplied(date) {
    const currentDate = `${date.year}-${date.month.toString().padStart(2, '0')}-${date.day.toString().padStart(2, '0')}T00:00:00`;
    if (this.leaves.includes(currentDate)) {
      return { color: 'blueviolet' };
    }
    if (this.wfh.includes(currentDate)) {
      return { color: 'darkcyan' };
    }
    if (this.onDuty.includes(currentDate)) {
      return { color: 'chocolate' };
    }
    return;
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

  onFromDateSelection(date: NgbDate) {
    this.minDateTo = date;
  }

  onToDateSelection(date: NgbDate) {
    this.maxDateFrom = date;
  }
  checkDates() {
    if (this.fromDate && this.toDate && typeof this.fromDate !== 'string' && typeof this.toDate !== 'string') {
      const d = new Date(this.fromDate);
      for (d; d <= this.toDate; d.setDate(d.getDate() + 1)) {
        const currentDate = `${d.getFullYear()}-${(d.getMonth() + 1).toString().padStart(2, '0')}-${d.getDate().toString().padStart(2, '0')}T00:00:00`;
        if (this.wfh.includes(currentDate)) {
          this.taken[0] = currentDate;
          this.taken[1] = 'WFH';
          break;
        }
        if (this.leaves.includes(currentDate)) {
          this.taken[0] = currentDate;
          this.taken[1] = 'leave';
          break;
        }
        if (this.onDuty.includes(currentDate)) {
          this.taken[0] = currentDate;
          this.taken[1] = 'on duty';
          break;
        }
      }
      if (this.toDate < d) {
        return true;
      } else {
        return false;
      }
    } else {
      return true;
    }
  }
  getNumberOfDaysInMonth() {
    const daysInMonths = [];
    if (this.fromDate && this.toDate &&
      typeof this.fromDate !== 'string' && typeof this.toDate !== 'string' &&
      this.fromDate.getMonth() == this.toDate.getMonth()) {
      daysInMonths.push(this.toDate.getDate() - this.fromDate.getDate());
    } else {
      for (const d = new Date(this.fromDate); d <= this.toDate; d.setMonth(d.getMonth() + 1)
      ) {
        d.getMonth();
        this.toDate.getMonth();
        if (d.getMonth() == this.toDate.getMonth()) {
          daysInMonths.push(this.toDate.getDate());
        } else if (this.fromDate.getMonth() == d.getMonth()) {
          const numberOfDays = new Date(d.getFullYear(), d.getMonth() + 1, 0).getDate() - this.fromDate.getDate();
          daysInMonths.push(numberOfDays);
        } else {
          daysInMonths.push(new Date(d.getFullYear(), d.getMonth() + 1, 0).getDate());
        }
      }
    }
    return daysInMonths;
  }

  validateRequest() {
    const selectedLeaveComponentId = this.addForm.value.leaveComponentId;
    const selectedLeaveComponent = this.leaveBalance.find((leaveComponent) => leaveComponent.leaveComponentId == selectedLeaveComponentId);
    if (selectedLeaveComponent && selectedLeaveComponent.shortCode != 'LOP') {
      if (this.numberOfDays > selectedLeaveComponent.leaveBalance) {
        this.addForm.controls.numberOfDays.setErrors({ numberOfDays: true });
      } else {
        this.addForm.controls.numberOfDays.setErrors(null);
      }
    } else {
      this.addForm.controls.numberOfDays.setErrors(null);
    }
    if (!this.addForm.controls.numberOfDays.errors) {
      const isDaysTaken = this.checkDates();
      if (!isDaysTaken) {
        this.addForm.controls.numberOfDays.setErrors({ daysTaken: true });
      } else {
        this.addForm.controls.numberOfDays.setErrors(null);
      }
    }
    const daysInMonths = this.getNumberOfDaysInMonth();
    if (!this.addForm.controls.numberOfDays.errors) {
      if (daysInMonths.some(res => (res > this.leaveSettings.maxNumberOfDaysPerMonth)) || !this.leaveSettings.maxNumberOfDaysPerMonth) {
        this.addForm.controls.numberOfDays.setErrors({ daysPerMonth: true });
        return;
      } else {
        this.addForm.controls.numberOfDays.setErrors(null);
        this.isValid = true;
      }
    }
    if (!this.addForm.controls.numberOfDays.errors) {
      if (this.leaveSettings.maxConsecutiveDays < this.numberOfDays || !this.leaveSettings.maxConsecutiveDays) {
        this.addForm.controls.numberOfDays.setErrors({ consecutiveDays: true });
      } else {
        this.addForm.controls.numberOfDays.setErrors(null);
      }
    }
  }


  onSubmit() {
    let addForm = this.addForm.value;
    addForm.numberOfDays = this.numberOfDays;
    addForm = {
      ...addForm,
      currentDate:this.datepipe.transform(Date.now(),'yyyy-MM-dd hh:mm:ss'),
      toDate: new Date(addForm.toDate.setHours(12)),
      fromDate: new Date(addForm.fromDate.setHours(12)),
      leaveComponentId: parseInt(addForm.leaveComponentId, 10)
    };
    this.currentDate=new Date();
   // formatDate(new Date(), 'yyyy/MM/dd', 'en');
    console.log("datenow",this.currentDate);
   
    this.employeeLeaveService.add(addForm).subscribe((result) => {
      const notifyPersonnelForm = this.selectedItems.map(notifyPerson => ({
        leaveId: result.id,
        notifyPersonnel: notifyPerson.id
      }));
      this.signalrService.invokeConnection(result.id)
        .then(() => console.log('invoked'))
        .catch(err => console.log('Error while invoking connection: ' + err));
      this.employeeLeaveService.addNotifyPersonnel(notifyPersonnelForm).subscribe(() => {
        this.getLeaveBalance();
        this.toastr.showSuccessMessage('Leave Request submitted successfully');
        this.activeModal.close('submit');
      },
        error => {
          console.error(error);
          this.toastr.showErrorMessage('Unable to submit Leave Request');
        });
    });
  }

 
markDisabled =(date:NgbDateStruct)=>{
  const d = new Date(date.year,date.month - 1, date.day);
 let holidays=[];
 if(this.holidaydate?.length){
  this.holidaydate.map((item) => {
    var myDate = item.split('-');
    var newDate = new Date(myDate[0], myDate[1] - 1, myDate[2].split('T')[0]);
    holidays.push(newDate.getTime());
  })
 }

  return holidays.indexOf(d.getTime()) != -1;// return date.month !== current.month;  };
}


  createFormGroup(): FormGroup {
    return this.formBuilder.group({
      leaveComponentId: [null, [
        LeaveBalanceValidator(this.leaveBalance, this.numberOfDays),
        Validators.required
      ]],
      leaveStructureId: [],
      employeeId: [this.requestId, [
        Validators.required
      ]],
      // approvedBy: [1],
      // approvedDate: [new Date(Date.now())],
      description: ['', [
        Validators.required,
        Validators.maxLength(128),
      ]],
      fromDate: ['', [
        Validators.required
      ]],
      toDate: ['', [
        Validators.required
      ]],
      numberOfDays: [''],
      leaveStatus: [2, [
        Validators.required
      ]],
      singleDay: [1],
      firstDay: [1],
      lastDay: [2],
      isFullDay: [false],
      isFirstDayFirstHalf: [false],
      isFirstDaySecondHalf: [false],
      isSecondDayFirstHalf: [false],
      isSecondDaySecondHalf: [false]
    });
  }
  getEmployeeHoliday() {
    this.holidayService.getAll().subscribe(res => {
      let holidaydata = res;
      this.holidaydate=[];
      holidaydata.filter(y=>{
        this.holidaydate.push(
          y.date
        )
       
       
      })
      console.log("leavessting",this.leaveSettings);
    })
   }

}