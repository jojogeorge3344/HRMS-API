import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EmployeeNumbersService } from '../employee-numbers.service';
import { padAtStrt } from '@shared/utils/utils.functions';
import { EmployeeNumbers } from '../employee-numbers.model';
import { duplicateNameValidator } from '@shared/utils/validators.functions';
import { getCurrentUserId } from '@shared/utils/utils.functions';
import { ToasterDisplayService } from 'src/app/core/services/toaster-service.service';

@Component({
  selector: 'hrms-employee-numbers-edit',
  templateUrl: './employee-numbers-edit.component.html'
})
export class EmployeeNumbersEditComponent implements OnInit {


  editForm: FormGroup;
  currentUserId: number;

  @Input() employeeSeries: EmployeeNumbers;
  @Input() isDisabled: boolean;
  @Input() numberSeriesNames: string[];



  constructor(
    private employeeNumbersService: EmployeeNumbersService,
    public activeModal: NgbActiveModal,
    private formBuilder: FormBuilder,
    private toastr: ToasterDisplayService) {
  }

  ngOnInit(): void {
    this.currentUserId = getCurrentUserId();
    this.editForm = this.createFormGroup();
    this.onChanges();

    this.editForm.patchValue(this.employeeSeries);

    this.editForm.patchValue({
      preview: `${this.employeeSeries.prefix}${padAtStrt(this.employeeSeries.nextNumber, this.employeeSeries.digitInNumber, 0)}${this.employeeSeries.suffix}`
    }, {emitEvent: false});
  }

  onChanges(): void {
    this.editForm.valueChanges.subscribe(form => {
      if (form.prefix && form.suffix && form.digitInNumber <= 12 && form.digitInNumber >= 1 && form.nextNumber) {

        this.setNextNumberValidation(form.digitInNumber);

        this.editForm.patchValue({
          preview: `${form.prefix}${padAtStrt(form.nextNumber, form.digitInNumber, 0)}${form.suffix}`
        }, {emitEvent: false});
      } else {
        this.editForm.patchValue({ preview: '' }, {emitEvent: false});
      }
    });
  }

  setNextNumberValidation(val) {
    const maxLength = parseInt('9'.repeat(val - 1) + 8, 10);
    this.editForm.get('nextNumber').setValidators([
      Validators.required,
      Validators.min(1),
      Validators.max(maxLength)
    ]);
  }

  setPreview() {
    const prefix = this.editForm.get('prefix');
    const suffix = this.editForm.get('suffix');
    const digitInNumber = this.editForm.get('digitInNumber');
    const nextNumber = this.editForm.get('nextNumber');

    if (prefix.valid && suffix.valid && digitInNumber.valid && nextNumber.valid) {
      this.setNextNumberValidation(digitInNumber.value);

      this.editForm.patchValue({
        preview: `${prefix.value}${this.addPadding(digitInNumber.value, nextNumber.value)}${suffix.value}`
      });
    } else {
      this.editForm.patchValue({ preview: '' });
    }
  }

  addPadding(length: number, value: number) {
    length = length - value.toString().length;

    if (length > 0) {
      return '0'.repeat(length) + value;
    }

    return value;
  }

  get name() { return this.editForm.get('name'); }

  onSubmit() {
    this.employeeNumbersService.update(this.editForm.getRawValue()).subscribe((result: any) => {
      if (result === -1) {
        this.toastr.showErrorMessage('Employee Series already exists!');
      } else {
        this.toastr.showSuccessMessage('Employee Series updated successfully!');
        this.activeModal.close('submit');
      }
    },
    error => {
      console.error(error);
      this.toastr.showErrorMessage('Unable to update the Employee Series');
    });
  }

  createFormGroup(): FormGroup {
    return this.formBuilder.group({
      id: [],
      name: [null, [
        Validators.required,
        Validators.maxLength(32),
        duplicateNameValidator(this.numberSeriesNames)
      ]],
      description: [null, [
        Validators.required,
        Validators.maxLength(256)
      ]],
      prefix: [{ value: null, disabled: this.isDisabled }, [
        Validators.required,
        Validators.maxLength(8)
      ]],
      suffix: [{ value: null, disabled: this.isDisabled }, [
        Validators.required,
        Validators.maxLength(8)
      ]],
      digitInNumber: [{ value: null, disabled: this.isDisabled }, [
        Validators.required,
        Validators.min(1),
        Validators.max(12)
      ]],
      nextNumber: [{ value: null, disabled: this.isDisabled }, [
        Validators.required,
        Validators.min(1),
        Validators.max(999999999998)
      ]],
      preview: [{ value: null, disabled: true }],
      isActive: [false],
      createdDate: []
    });
  }
}
