import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal, NgbDateAdapter, NgbDateNativeAdapter } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';

import { EmployeeBonusService } from '@features/employee/employee-bonus/employee-bonus.service';
import { ActivatedRoute } from '@angular/router';
import { getCurrentUserId } from '@shared/utils/utils.functions';
import { Months } from 'src/app/models/common/types/months';
import { ToasterDisplayService } from 'src/app/core/services/toaster-service.service';

@Component({
  selector: 'hrms-payroll-process-bonus-create',
  templateUrl: './payroll-process-bonus-create.component.html',
  providers: [{ provide: NgbDateAdapter, useClass: NgbDateNativeAdapter }]

})
export class PayrollProcessBonusCreateComponent implements OnInit {
  @Input() employeeList;
  @Input() bonusTypes;
  addForm: FormGroup;
  selectedItems: any;
  minDate: { year: number; month: number; day: number; };
  maxDate: { year: number; month: number; day: number; };
  paygroupId: number;
  date: any;
  months = Months;
  currentUserId: number;
  id: any;
  selectedEmployee: string;
  selectedEmployeeCode: string;
  searchFailed: boolean;
  constructor(
    private bonusService: EmployeeBonusService,
    public activeModal: NgbActiveModal,
    private formBuilder: FormBuilder,
    private toastr: ToasterDisplayService,
    private route: ActivatedRoute,
  ) {
    this.route.queryParams.subscribe(params => {
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
  }

  ngOnInit(): void {
    this.currentUserId = getCurrentUserId();
    this.addForm = this.createFormGroup();
    this.route.queryParams.subscribe(params => {
      this.date = params.date;
      this.paygroupId = parseInt(params.payGroup, 10);
      this.id = parseInt(params.id, 10);
    });
  }
  // formatter = (employee) => employee.firstName;
  nameFormatter = (employee) => employee.firstName;
  codeFormatter = (employee) => employee.employeeNumber;

  search = (text: Observable<string>) => {
    return text.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      map(term => {
        const searchitem = (this.employeeList.filter((v) => v.firstName.toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 10));
        if (searchitem.length == 0) {
          this.searchFailed = true;
          return;
        } else {
          this.searchFailed = false;
          return term.length <= 1 ? [].slice() : this.employeeList.filter((v) => v.firstName.toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 10);
        }

      })
    );
  }

  selected($event) {
    $event.preventDefault();
    this.selectedEmployee = $event.item.firstName;
    this.selectedEmployeeCode = $event.item.employeeNumber;
    this.addForm.patchValue({
      employeeId: $event.item.id,
      employeeCode: this.selectedEmployeeCode

    });
  }
  createFormGroup(): FormGroup {
    return this.formBuilder.group({
      employeeId: ['', [
        Validators.required,
        Validators.max(60)
      ]],
      employeeCode: ['',Validators.max(30)],
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
      Validators.maxLength(256)]]
    });
  }
  onSubmit() {
    const bonus = this.addForm.value;
    // bonus.employeeId = bonus.employeeId.id;
    bonus.employeeId = bonus.employeeId;
    bonus.payrollProcessingMethodId = this.id,
    this.bonusService.add(bonus).subscribe(res => {
      if (res) {
        this.toastr.showSuccessMessage('Bonus added successfully!');
        this.activeModal.close('submit');
      }
    });

  }

}
