import { Component, OnInit, Input } from '@angular/core';
import { PayGroupService } from '../pay-group.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Months } from './../../../../../models/common/types/months';
import { PayrollCalendar } from '../../payroll-calendar/payroll-calendar.model';
import { duplicateNameValidator } from '@shared/utils/validators.functions';
import { getCurrentUserId } from '@shared/utils/utils.functions';
import { ToasterDisplayService } from 'src/app/core/services/toaster-service.service';

@Component({
  selector: 'hrms-pay-group-create',
  templateUrl: './pay-group-create.component.html'
})
export class PayGroupCreateComponent implements OnInit {

  addForm: FormGroup;

  @Input() calenders: PayrollCalendar[];
  @Input() payGroupNames: string[];
  @Input() payGroupCodes: string[];

  currentUserId: number;
  weeks = [...Array(52).keys()].map(n => n + 1);
  years: number[];
  months = Months;
  monthKeys: number[];
  isStartingMonth = false;
  currency:any[];

  constructor(
    private payGroupService: PayGroupService,
    public activeModal: NgbActiveModal,
    private formBuilder: FormBuilder,
    private toastr: ToasterDisplayService) {
    const d = new Date();
    this.years = [...Array(11).keys()].map(n => n + d.getFullYear());
    this.monthKeys = Object.keys(this.months).filter(Number).map(Number);

  }

  ngOnInit(): void {
    this.currentUserId = getCurrentUserId();
    this.addForm = this.createFormGroup();
    this.onChanges();
    this.calenders=this.calenders.sort((a, b) => a.name.toLowerCase().localeCompare(b.name.toLowerCase()))
    this.payGroupService.getCurrencies()
    .subscribe((result)=>{
      this.currency=result;
    })
  }

  onChanges(): void {
    this.addForm.get('payrollCalendarId').valueChanges.subscribe(calenderId => {
      if (this.calenders.find(calender => calenderId == calender.id).periodType == 2) {
        this.isStartingMonth = true;
      } else {
        this.isStartingMonth = false;
      }
    });
  }

  createFormGroup(): FormGroup {
    return this.formBuilder.group({
      name: ['', [
        Validators.required,
        Validators.maxLength(50),
        //Validators.pattern('^([a-zA-Z0-9 ])+$'),
        duplicateNameValidator(this.payGroupNames)
      ]],
      payrollCalendarId: [null, [
        Validators.required
      ]],
      code: ['', [
        Validators.required,
        Validators.maxLength(30),
        //Validators.pattern('^([a-zA-Z0-9])+$'),
        duplicateNameValidator(this.payGroupCodes)
      ]],
      startingYear: [null, [
        Validators.required,
      ]],
      startingMonth: [0, []],
      currencyId: [null, []],
      TimeSheetCutOff: [null, [Validators.max(31),Validators.min(1)]],
      LeaveCutOff: [null, [Validators.max(31),Validators.min(1)]],

      startingWeek: [0, []],
    });
  }

  get name() { return this.addForm.get('name'); }

  get code() { return this.addForm.get('code'); }

  onSubmit() {
    const payGroup = this.addForm.value;
    if (this.isStartingMonth) {
      delete payGroup['startingWeek'];
    } else {
      delete payGroup['startingMonth'];
    }

    this.payGroupService.add(this.addForm.value).subscribe((result: any) => {
        if (result.id === -1) {
          this.toastr.showErrorMessage('Pay Group already exists!');
        } else {
          this.activeModal.close('submit');
          this.toastr.showSuccessMessage('Pay Group is created successfully!');
        }
      },
      error => {
        console.error(error);
        this.toastr.showErrorMessage('Unable to add the Pay Group');
      });
  }

}
