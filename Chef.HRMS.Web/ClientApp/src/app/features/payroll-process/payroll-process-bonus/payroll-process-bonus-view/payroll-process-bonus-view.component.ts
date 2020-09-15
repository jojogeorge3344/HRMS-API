import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { NgbActiveModal, NgbDateAdapter, NgbDateNativeAdapter } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged, filter, map } from 'rxjs/operators';

@Component({
  selector: 'hrms-payroll-process-bonus-view',
  templateUrl: './payroll-process-bonus-view.component.html',
  providers: [{ provide: NgbDateAdapter, useClass: NgbDateNativeAdapter }]

})
export class PayrollProcessBonusViewComponent implements OnInit {
  @Input() employeeList;
  @Input() bonusTypes;
  @Input() bonus;
  editBonusForm: FormGroup;
  selectedItems = [];
  minDate: { year: number; month: number; day: number; };
  maxDate: { year: number; month: number; day: number; };
  constructor(
    public activeModal: NgbActiveModal,
    private formBuilder: FormBuilder,
  ) { }

  ngOnInit(): void {
    const date = new Date();
    this.minDate = {
      year: date.getFullYear(),
      month: 1,
      day: 1
    };
    this.maxDate = {
      year: date.getFullYear() + 10,
      month: 12,
      day: 31
    };
    this.editBonusForm = this.createFormGroup();
    this.editBonusForm.patchValue(this.bonus);
  }
  formatter = (employee) => employee.firstName;

  search = (text$: Observable<string>) => text$.pipe(
    debounceTime(200),
    distinctUntilChanged(),
    filter(term => term.length >= 1),
    map(term => this.employeeList.filter(employee => new RegExp(term, 'mi').test(employee.firstName)).slice(0, 10))
  )

  selected($event) {
    $event.preventDefault();
    if (this.selectedItems.indexOf($event.item) === -1) {
      this.selectedItems.push($event.item);
    }
  }

  remove(item) {
    this.selectedItems.splice(this.selectedItems.indexOf(item), 1);
  }
  createFormGroup(): FormGroup {
    return this.formBuilder.group({
      employeeId: [{ value: '', disabled: true }],
      id: [],
      bonusTypeId: [{ value: null, disabled: true }],
      amount: [{ value: null, disabled: true }],
      disburseOn: [{ value: Date.now(), disabled: true }],
      remarks: [{ value: '', disabled: true }],

    });
  }

}
