import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';

import { PayrollComponentService } from '../../payroll-component/payroll-component.service';
import { PayrollComponent } from '../../payroll-component/payroll-component.model';
import { PayrollLopFormulaEditComponent } from '../payroll-lop-formula-edit/payroll-lop-formula-edit.component';
import { PayrollLopSettingsService } from '../payroll-lop-settings.service';
import { Observable } from 'rxjs';
import { ToasterDisplayService } from 'src/app/core/services/toaster-service.service';
import { getCurrentUserId } from '@shared/utils/utils.functions';

@Component({
  selector: 'hrms-payroll-lop-settings-edit',
  templateUrl: './payroll-lop-settings-edit.component.html'
})
export class PayrollLOPSettingsEditComponent implements OnInit, OnDestroy {

  LopCalculationForm: FormGroup;
  currentUserId: number;
  components: PayrollComponent[];

  obj = {
    1: 'canFullMonth',
    2: 'isWorkingDaysOnly',
    3: 'fixedValue',
    4: 'isFormulaBased',
  };

  fixedSelectOptions = Array.from({ length: 4 }, (x, i) => i + 28);

  constructor(
    private payrollLopSettingsService: PayrollLopSettingsService,
    private payrollComponentService: PayrollComponentService,
    private formBuilder: FormBuilder,
    public modalService: NgbModal,
    private toastr: ToasterDisplayService
  ) {
    this.LopCalculationForm = this.createFormGroup();
    this.LopCalculationForm.controls[this.obj[3]].markAsDirty();
    this.LopCalculationForm.controls[this.obj[3]].markAsTouched();
    this.onChanges();
  }

  ngOnDestroy(): void {
    this.modalService.dismissAll()
  }


  ngOnInit(): void {
    this.currentUserId = getCurrentUserId();
    this.payrollComponentService.getAll().subscribe(res => {
      this.components = res;
    });
    this.getLOPSettings();
  }
  onChanges(): void {
    this.LopCalculationForm.valueChanges.subscribe(value => {
      for (let index = 0; index < 4; index++) {
        if (index !== 2) {
          this.LopCalculationForm.controls[this.obj[index + 1]].patchValue(false, { emitEvent: false });
        }

      }
      if (value.lopCalculation !== 4) {
        this.LopCalculationForm.controls.formula.reset('', { emitEvent: false });
      }
      if (value.lopCalculation !== 3) {
        this.LopCalculationForm.controls.fixedValue.reset(0, { emitEvent: false });
      }
      if (!(value.lopCalculation === 3 && value.fixedValue === 0)) {
        this.LopCalculationForm.controls[this.obj[3]].setErrors({ required: false });
      }
      if (value.lopCalculation === 3) {
        this.LopCalculationForm.controls[this.obj[value.lopCalculation]].enable({ emitEvent: false });
        if (!value.fixedValue || value.fixedValue === 0) {
          this.LopCalculationForm.controls[this.obj[value.lopCalculation]].setErrors({ required: true });
        }
      } else {
        this.LopCalculationForm.controls[this.obj[3]].disable({ emitEvent: false });
        this.LopCalculationForm.controls[this.obj[value.lopCalculation]].patchValue(true, { emitEvent: false });
      }
    });
  }

  getLOPSettings() {
    this.payrollLopSettingsService.get(1).subscribe(res => {
      this.LopCalculationForm.patchValue(res, { emitEvent: false });
      if (res.canFullMonth) {
        this.LopCalculationForm.controls.lopCalculation.patchValue(1, { emitEvent: false });
      }
      if (res.isWorkingDaysOnly) {
        this.LopCalculationForm.controls.lopCalculation.patchValue(2, { emitEvent: false });
      }
      if (res.fixedValue !== 0) {
        this.LopCalculationForm.controls.lopCalculation.patchValue(3, { emitEvent: false });
        this.LopCalculationForm.patchValue({fixedValue: res.fixedValue}, { emitEvent: false });
        this.LopCalculationForm.controls.fixedValue.enable({ emitEvent: false });
      }
      if (res.isFormulaBased) {
        this.LopCalculationForm.controls.lopCalculation.patchValue(4, { emitEvent: false });
      }
    });
  }

  createFormGroup(): FormGroup {
    return this.formBuilder.group({
      id: [0],
      lopCalculation: [1],
      canFullMonth: [false, { emitEvent: false }],
      isWorkingDaysOnly: [false, { emitEvent: false }],
      fixedValue: [{ value: 0, disabled: true }, { validators: [Validators.required], emitEvent: false }],
      isFormulaBased: [false, { emitEvent: false }],
      formula: [{ value: '', disabled: true }],
      createdDate: [],
    });

  }
  openEdit() {
    const modalRef = this.modalService.open(PayrollLopFormulaEditComponent,
      { size: 'lg', centered: true, backdrop: 'static' });

    modalRef.componentInstance.components = this.components;
    modalRef.componentInstance.formula = this.LopCalculationForm.getRawValue().formula;
    modalRef.result.then((result) => {
      if (result !== 'Close click') {
        this.LopCalculationForm.controls.formula.patchValue(result);
      }
    }, error => {
      console.log(error);
    });
  }
  onSubmit() {
    let api: Observable<any>;
    const LopSettings = this.LopCalculationForm.getRawValue();
    if (LopSettings.lopCalculation !== 3) {
      LopSettings.fixedValue = 0;
    }
    if (this.LopCalculationForm.value.id === 0) {
      api = this.payrollLopSettingsService.add(LopSettings);
      LopSettings.createdDate = new Date();
      delete LopSettings.id;
    } else {
      api = this.payrollLopSettingsService.update(LopSettings);
    }
    api.subscribe(res => {
      if (res) {
        this.toastr.showSuccessMessage('Lop Settings updated successfully');
      }
    });
  }
}
