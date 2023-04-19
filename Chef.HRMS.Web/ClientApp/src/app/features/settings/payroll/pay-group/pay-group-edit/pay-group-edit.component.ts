import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { PayGroupService } from '../pay-group.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { Months } from './../../../../../models/common/types/months';
import { PayGroup } from '../pay-group.model';
import { PayrollCalendar } from '../../payroll-calendar/payroll-calendar.model';
import { duplicateNameValidator } from '@shared/utils/validators.functions';
import { getCurrentUserId } from '@shared/utils/utils.functions';
import { ToasterDisplayService } from 'src/app/core/services/toaster-service.service';

@Component({
  selector: 'hrms-pay-group-edit',
  templateUrl: './pay-group-edit.component.html'
})
export class PayGroupEditComponent implements OnInit {

  editForm: FormGroup;
  currentUserId: number;
  @Input() calenders: PayrollCalendar[];
  @Input() payGroup: PayGroup;
  @Input() isReadOnly: boolean;
  @Input() isDisabled: boolean;
  @Input() payGroupNames: string[];
  @Input() payGroupCodes: string[];


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
    this.editForm = this.createFormGroup();
    this.calenders=this.calenders.sort((a, b) => a.name.toLowerCase().localeCompare(b.name.toLowerCase()))
    if (this.calenders.find(calender => this.payGroup.payrollCalendarId == calender.id) && this.calenders.find(calender => this.payGroup.payrollCalendarId == calender.id).periodType == 1) {
      this.isStartingMonth = false;
    } else {
      this.isStartingMonth = true;
    }
    this.payGroupService.getCurrencies()
    .subscribe((result)=>{
      this.currency=result;
    })

    this.editForm.patchValue(this.payGroup);
   
    this.onChanges();
  }

  onChanges(): void {
    this.editForm.get('payrollCalendarId').valueChanges.subscribe(calenderId => {
      if (this.calenders.find(calender => calenderId == calender.id).periodType == 2) {
        this.isStartingMonth = false;
      } else {
        this.isStartingMonth = true;
      }
    });
  }

  get name() { return this.editForm.get('name'); }

  get code() { return this.editForm.get('code'); }

  createFormGroup(): FormGroup {
    return this.formBuilder.group({
      id: [],
      name: ['', [
        Validators.required,
        Validators.maxLength(50),
        //Validators.pattern('^([a-zA-Z0-9 ])+$'),
        duplicateNameValidator(this.payGroupNames)
      ]],
      payrollCalendarId: [{ value: null, disabled: this.isDisabled }, [
        Validators.required
      ]],
      code: ['', [
        Validators.required,
        Validators.maxLength(30),
        //Validators.pattern('^([a-zA-Z0-9])+$'),
        duplicateNameValidator(this.payGroupCodes)
      ]],
      startingYear: [{ value: null, disabled: this.isDisabled }, [
        Validators.required,
      ]],
      startingMonth: [{ value: 0, disabled: this.isDisabled }, []],
      startingWeek: [{ value: 0, disabled: this.isDisabled }, []],
      currencyId: [null, []],
      timeSheetCutOff: [null, [Validators.max(31),Validators.min(1)]],
      leaveCutOff: [null, [Validators.max(31),Validators.min(1)]],
      createdDate: [],
    });
  }
  onSubmit() {

    const payGroup = this.editForm.value;
    payGroup.id = this.payGroup.id;
    if (this.isStartingMonth) {
      delete payGroup['startingWeek'];
    } else {
      delete payGroup['startingMonth'];
    }
    this.payGroupService.update(this.editForm.getRawValue()).subscribe((result: any) => {
      if (result === -1) {
        this.toastr.showErrorMessage('Pay Group already exists!');
      } else {
        this.activeModal.close('submit');
        this.toastr.showSuccessMessage('Pay Group is updated successfully!');
      }
    },
      error => {
        console.error(error);
        this.toastr.showErrorMessage('Unable to update the Pay Group');
      });
  }

}
