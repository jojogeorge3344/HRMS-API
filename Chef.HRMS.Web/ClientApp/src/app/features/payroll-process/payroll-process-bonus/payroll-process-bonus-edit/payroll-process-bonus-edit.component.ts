import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged, filter, map } from 'rxjs/operators';
import { NgbActiveModal, NgbDateAdapter, NgbDateNativeAdapter } from '@ng-bootstrap/ng-bootstrap';
import { EmployeeBonusService } from '@features/employee/employee-bonus/employee-bonus.service';
import { ActivatedRoute, Router } from '@angular/router';
import { getCurrentUserId } from '@shared/utils/utils.functions';
import { Months } from 'src/app/models/common/types/months';
import { ToasterDisplayService } from 'src/app/core/services/toaster-service.service';

@Component({
  selector: 'hrms-payroll-process-bonus-edit',
  templateUrl: './payroll-process-bonus-edit.component.html',
  providers: [{ provide: NgbDateAdapter, useClass: NgbDateNativeAdapter }]
})
export class PayrollProcessBonusEditComponent implements OnInit {
  @Input() employeeList;
  @Input() bonusTypes;
  @Input() bonus;
  editForm: FormGroup;
  currentUserId: number;
  selectedItems = [];
  paygroupId: number;
  months = Months;
  id: any;

  minDate: { year: number; month: number; day: number; };
  maxDate: { year: number; month: number; day: number; };
  constructor(
    private bonusService: EmployeeBonusService,
    public activeModal: NgbActiveModal,
    private formBuilder: FormBuilder,
    private toastr: ToasterDisplayService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.paygroupId = parseInt(params.payGroup, 10);
      this.id = parseInt(params.id, 10);
      const date = params.date.split('-');
      this.minDate = {
        year: parseInt(date[1], 10),
        month: parseInt(this.months[date[0]], 10),
        day: 1
      };
      this.maxDate = {
        year: parseInt(date[1], 10),
        month: parseInt(this.months[date[0]], 10),
        day: 31
      };

    });
    this.currentUserId = getCurrentUserId();
    this.editForm = this.createFormGroup();
    this.editForm.patchValue(this.bonus);
    this.editForm.patchValue({ modifiedBy: this.currentUserId });
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
      employeeId: ['', [
        Validators.required,
        // Validators.maxLength(64),
        // Validators.pattern('^([a-zA-Z0-9 ])+$')
        Validators.max(60)
      ]],
      id: [],
      bonusTypeId: [null, [
        Validators.required,
      ]],
      amount: [null, [
        Validators.required,
        Validators.min(0),
        Validators.max(999999999)
      ]],
      disburseOn: [new Date(), [
        Validators.required,
      ]],
      remarks: ['', [Validators.required,
      Validators.maxLength(256)]],
      createdDate: []
    });
  }
  onSubmit() {
    const bonus = this.editForm.value;
    bonus.id = this.bonus.employeeBonusId,
      bonus.employeeId = bonus.employeeId.id;
    bonus.payrollProcessingMethodId = this.id,
      this.bonusService.update(bonus).subscribe(res => {
        if (res) {
          this.toastr.showSuccessMessage('Bonus updated successfully!');
          this.activeModal.close('submit');
        }
      });

  }

}
