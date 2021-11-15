import { Component, OnInit, ViewChild, ElementRef, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal, NgbDateAdapter, NgbDateNativeAdapter, NgbDate, NgbCalendar } from '@ng-bootstrap/ng-bootstrap';
import { EmployeeOnDutyService } from '../employee-on-duty.service';
import { Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged, map, filter } from 'rxjs/operators';
import { getCurrentUserId, calculateDaysInBetween } from '@shared/utils/utils.functions';
import { EmployeeOnDutyRequest } from '../employee-on-duty-request.model';
import { Employee } from '@features/employee/employee.model';
import { EmployeeService } from '@features/employee/employee.service';
import { ToasterDisplayService } from 'src/app/core/services/toaster-service.service';

@Component({
  templateUrl: './employee-on-duty-create.component.html',
  providers: [{ provide: NgbDateAdapter, useClass: NgbDateNativeAdapter }]
})
export class EmployeeOnDutyCreateComponent implements OnInit {

  addForm: FormGroup;
  fromDate: Date;
  toDate: Date;
  numberOfDays = 0;
  isSingleDay: boolean;
  selectedButton: any;
  currentUserId: number;
  minDateFrom;
  maxDateFrom;
  minDateTo;
  maxDateTo;
  markDisabled;
  requestDetails;
  current = new Date();
  taken = ['', ''];

  employeeList: Employee[];
  selectedItems = [];
  @ViewChild('notifyPersonnel')
  notifyPersonnel: ElementRef;
  @Input() leaves;
  @Input() wfh;
  @Input() onDuty;

  constructor(
    private employeeOnDutyService: EmployeeOnDutyService,
    private employeeService: EmployeeService,
    private calendar: NgbCalendar,
    public activeModal: NgbActiveModal,
    private formBuilder: FormBuilder,
    private toastr: ToasterDisplayService) {

    this.maxDateFrom = this.maxDateTo = {
      year: this.current.getFullYear(),
      month: this.current.getMonth() + 1,
      day: this.current.getDate() - 1
    };
  }


  ngOnInit(): void {
    this.currentUserId = getCurrentUserId();
    this.addForm = this.createFormGroup();
    this.markDisabled = (date: NgbDate) => this.calendar.getWeekday(date) >= 6;
    this.getEmployeeList();
    this.subscribeTochanges();
  }
  subscribeTochanges() {
    this.addForm.valueChanges.subscribe(res => {
      this.fromDate = this.addForm.get('fromDate').value;
      this.toDate = this.addForm.get('toDate').value;
      if (this.fromDate && this.toDate) {
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

  onFromDateSelection(date: NgbDate) {
    this.minDateTo = date;

  }

  onToDateSelection(date: NgbDate) {
    this.maxDateFrom = date;
  }
  isAlreadyTaken(date) {
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
  checkDates() {
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
    if (this.toDate <= d) {
      return true;
    } else {
      return false;
    }
  }
  validateRequest() {
    if (!this.addForm.controls.numberOfDays.hasError('numberOfDays')) {
      if (!this.checkDates()) {
        this.addForm.controls.numberOfDays.setErrors({ daysTaken: true });
      } else {
        this.addForm.controls.numberOfDays.setErrors(null);
      }
    }
  }


  onSubmit() {
    const addForm = this.addForm.value;
    addForm.numberOfDays = this.numberOfDays;
    addForm.toDate = new Date (addForm.toDate.setHours(12));
    addForm.fromDate = new Date (addForm.fromDate.setHours(12));

    this.employeeOnDutyService.add(addForm).subscribe((result: EmployeeOnDutyRequest) => {

      const notifyPersonnelForm = this.selectedItems.map(notifyPerson => ({
        onDutyId: result.id,
        notifyPersonnel: notifyPerson.id
      }));

      this.employeeOnDutyService.addNotifyPersonnel(notifyPersonnelForm).subscribe(() => {
        this.toastr.showSuccessMessage('On Duty request submitted successfully');
        this.activeModal.close('submit');
      },
        error => {
          console.error(error);
          this.toastr.showErrorMessage('Unable to submit On Duty request');
        });
    });
  }

  createFormGroup(): FormGroup {
    return this.formBuilder.group({
      fromDate: [null, Validators.required],
      toDate: [null, Validators.required],
      reason: ['', [
        Validators.required,
        Validators.maxLength(128),
      ]],
      employeeId: this.currentUserId,
      isApproved: [true],
      singleDay: [1],
      firstDay: [1],
      lastDay: [2],
      isFullDay: [false],
      isFirstDayFirstHalf: [false],
      isFirstDaySecondHalf: [false],
      isSecondDayFirstHalf: [false],
      isSecondDaySecondHalf: [false],
      numberOfDays: [''],
      notifyPersonnel: [''],
      // createdBy: [this.currentUserId],
      // modifiedBy: [this.currentUserId]
    });
  }
}
