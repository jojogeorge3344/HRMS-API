import { Component, OnInit, ViewChild, ElementRef, Input } from '@angular/core';
import { NgbActiveModal, NgbCalendar, NgbDate } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged, filter, map } from 'rxjs/operators';

import { NgbDateAdapter, NgbDateNativeAdapter } from '@ng-bootstrap/ng-bootstrap';
import { OvertimeRequestService } from '../overtime-request.service';
import { Employee } from '@features/employee/employee.model';
import { EmployeeService } from '@features/employee/employee.service';
import { OvertimePolicyConfiguration } from '@settings/overtime/overtime-policy-configuration/overtime-policy-configuration.model';
import { OvertimePolicyConfigurationService } from '@settings/overtime/overtime-policy-configuration/overtime-policy-configuration.service';
import { ToasterDisplayService } from 'src/app/core/services/toaster-service.service';



@Component({
  templateUrl: './overtime-request-create.component.html',
  providers: [{ provide: NgbDateAdapter, useClass: NgbDateNativeAdapter }]
})
export class OvertimeRequestCreateComponent implements OnInit {

  addForm: FormGroup;
  minDateFrom: NgbDate;
  maxDateFrom: NgbDate;
  minDateTo: NgbDate;
  maxDateTo: NgbDate;
  markDisabled;
  employeeList: Employee[];
  selectedItems = [];
  overtimeConfiguration: OvertimePolicyConfiguration;

  @Input() currentUserId;
  @Input() policyId;

  @ViewChild('notifyPersonnel') notifyPersonnel: ElementRef;

  constructor(
    private overtimeRequestService: OvertimeRequestService,
    private overtimePolicyConfigurationService: OvertimePolicyConfigurationService,
    private employeeService: EmployeeService,
    private calendar: NgbCalendar,
    public activeModal: NgbActiveModal,
    private formBuilder: FormBuilder,
    private toastr: ToasterDisplayService) { }

  ngOnInit(): void {
    this.markDisabled = (date: NgbDate) => this.calendar.getWeekday(date) >= 6;
    this.addForm = this.createFormGroup();
    this.getEmployeeList();
    this.getOvertimeConfiguration();
  }

  getOvertimeConfiguration() {
    this.overtimePolicyConfigurationService.getOvertimeConfiguration(this.currentUserId).subscribe(result => {
      this.overtimeConfiguration = result;
      this.addForm.patchValue({ overTimePolicyId: this.overtimeConfiguration.overTimePolicyId });
      if (this.overtimeConfiguration.isCommentRequired) {
        this.addForm.get('reason').setValidators([Validators.required, Validators.maxLength(128)]);
      }
    },
      error => {
        console.error(error);
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

  onFromDateSelection(date) {

  }

  onToDateSelection(date) {

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
        Validators.required
      ]],
      reason: ['', [
        Validators.maxLength(128),
      ]],
      employeeId: [this.currentUserId],
      requestStatus: [1]
    });
  }

}
