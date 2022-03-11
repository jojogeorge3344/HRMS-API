import { Component, OnInit, ViewChild, ElementRef, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal, NgbDateAdapter, NgbDateNativeAdapter, NgbDate, NgbCalendar } from '@ng-bootstrap/ng-bootstrap';
import { EmployeeWFHService } from '../employee-wfh.service';
import { Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged, map, filter } from 'rxjs/operators';
import { getCurrentUserId } from '@shared/utils/utils.functions';
import { EmployeeWFHRequest } from '../employee-wfh-request.model';
import { Employee } from '@features/employee/employee.model';
import { calculateDaysInBetween } from '@shared/utils/utils.functions';
import { EmployeeService } from '@features/employee/employee.service';
import { WorkFromHomeSettings } from '@settings/attendance/work-from-home-settings/work-from-home-settings.model';
import { ToasterDisplayService } from 'src/app/core/services/toaster-service.service';

@Component({
  templateUrl: './employee-wfh-create.component.html',
  providers: [{ provide: NgbDateAdapter, useClass: NgbDateNativeAdapter }]
})
export class EmployeeWFHCreateComponent implements OnInit {

  addForm: FormGroup;
  fromDate: Date;
  toDate: Date;
  numberOfDays = 0;
  isSingleDay: boolean;
  currentUserId: number;
  minDateFrom;
  maxDateFrom;
  minDateTo;
  maxDateTo;
  markDisabled;
  current = new Date();
  taken = ['', ''];
  flag = 0;
  @Input() WFHSettings: WorkFromHomeSettings;
  @Input() leaves;
  @Input() wfh;
  @Input() onDuty;
  @Input() wfhAvailable;

  employeeList: Employee[];
  selectedItems = [];
  @ViewChild('notifyPersonnel')
  notifyPersonnel: ElementRef;

  constructor(
    private employeeWFHService: EmployeeWFHService,
    private employeeService: EmployeeService,
    private calendar: NgbCalendar,
    public activeModal: NgbActiveModal,
    private formBuilder: FormBuilder,
    private toastr: ToasterDisplayService) {
  }

  ngOnInit(): void {

    var mindate = new Date();
    let priordays = this.WFHSettings.priorDays;
    for (let i = 0; i < priordays; i++) {
      var dayOfWeek = mindate.getDay();
      if ((dayOfWeek == 0 || dayOfWeek == 6)) {
        i--;
        mindate.setDate(mindate.getDate() - 1);
      }
      else {
        mindate.setDate(mindate.getDate() - 1);
      }
    }

    this.minDateFrom = this.minDateTo = {
      year: mindate.getFullYear(),
      month: mindate.getMonth() + 1,
      day: mindate.getDate()
    };
    let maxdate = new Date();
    let subsequentDays = this.WFHSettings.subsequentDays;
    for (let i = 0; i < subsequentDays; i++) {
      var dayOfWeek = maxdate.getDay();
      if ((dayOfWeek == 0 || dayOfWeek == 6)) {
        i--;
        maxdate.setDate(maxdate.getDate() + 1);
      }
      else {
        maxdate.setDate(maxdate.getDate() + 1);
      }
    }

    this.maxDateTo = this.maxDateFrom = {
      year: maxdate.getFullYear(),
      month: maxdate.getMonth() + 1,
      day: maxdate.getDate()
    };
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

  isWeekend(date) {
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

  getEmployeeList() {
    this.employeeService.getAll().subscribe(result => {
      this.employeeList = result.filter(employee => employee.id !== this.currentUserId);
    },
      error => {
        console.error(error);
      });
  }

  formatter = (employee) => employee.fullName;

  search = (text$: Observable<string>) => text$.pipe(
    debounceTime(200),
    distinctUntilChanged(),
    filter(term => term.length >= 2),
    map(term => this.employeeList.filter(employee => new RegExp(term, 'mi').test(employee.fullName)).slice(0, 10))
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
    if (this.addForm.get('toDate').value != null) {
      this.addForm.controls.toDate.setValue(null);
    }
  }

  onToDateSelection(date: NgbDate) {
    this.maxDateFrom = date;
  }

  checkDates() {
    const d = new Date(this.fromDate);
    for (d; d <= this.toDate; d.setDate(d.getDate() + 1)) {
      const currentDate = `${d.getFullYear()}-${(d.getMonth() + 1).toString().padStart(2, '0')}-${d.getDate().toString().padStart(2, '0')}T00:00:00`;
      if (this.wfh.includes(currentDate)) {
        this.taken[0] = currentDate;
        this.taken[1] = 'WFH';
        this.numberOfDays -= 1;
        this.flag = 0;
        break;
      }
      if (this.leaves.includes(currentDate)) {
        this.taken[0] = currentDate;
        this.taken[1] = 'leave';
        this.numberOfDays -= 1;         //////
        this.flag = 0;
        break;
      }
      if (this.onDuty.includes(currentDate)) {
        this.taken[0] = currentDate;
        this.taken[1] = 'on duty';
        this.numberOfDays -= 1;
        this.flag = 0;
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
    if (this.wfhAvailable !== null && (this.numberOfDays > this.wfhAvailable)) {
      this.addForm.controls.numberOfDays.setErrors({ numberOfDays: true });
    } else {
      this.addForm.controls.numberOfDays.setErrors(null);
    }
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
    addForm.toDate = new Date(addForm.toDate.setHours(12));
    addForm.fromDate = new Date(addForm.fromDate.setHours(12));
    if (this.wfhAvailable !== null && this.numberOfDays > this.wfhAvailable) {
      console.log('No of work from home requests exceeded your limit.');
      return;
    }
    if (this.flag === 0) {
      this.employeeWFHService.add(addForm).subscribe((result: EmployeeWFHRequest) => {

        const notifyPersonnelForm = this.selectedItems.map(notifyPerson => ({
          workFromHomeId: result.id,
          notifyPersonnel: notifyPerson.id
        }));

        this.employeeWFHService.addNotifyPersonnel(notifyPersonnelForm).subscribe(() => {
          this.toastr.showSuccessMessage('Work from home request submitted successfully');
          this.activeModal.close('submit');
        },
          error => {
            console.error(error);
            this.toastr.showErrorMessage('Unable to submit work from home request');
          });
      });
    }
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
      singleDay: [1],
      firstDay: [1],
      lastDay: [2],
      isApproved: [true],
      isFullDay: [false],
      isFirstDayFirstHalf: [false],
      isFirstDaySecondHalf: [false],
      isSecondDayFirstHalf: [false],
      isSecondDaySecondHalf: [false],
      numberOfDays: [null],
    });
  }

}
