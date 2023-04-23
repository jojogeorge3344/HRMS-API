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
  selector: 'hrms-employee-numbers-view',
  templateUrl: './employee-numbers-view.component.html',
  styleUrls: ['./employee-numbers-view.component.scss']
})
export class EmployeeNumbersViewComponent implements OnInit {

  ViewForm: FormGroup;
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
    this.ViewForm = this.createFormGroup();
    this.onChanges();

    this.ViewForm.patchValue(this.employeeSeries);

    this.ViewForm.patchValue({
      preview: `${this.employeeSeries.prefix}${padAtStrt(this.employeeSeries.nextNumber, this.employeeSeries.digitInNumber, 0)}${this.employeeSeries.suffix}`
    }, {emitEvent: false});
  }

  onChanges(): void {
    this.ViewForm.valueChanges.subscribe(form => {
      if (form.prefix && form.suffix && form.digitInNumber <= 12 && form.digitInNumber >= 1 && form.nextNumber) {

        this.setNextNumberValidation(form.digitInNumber);

        this.ViewForm.patchValue({
          preview: `${form.prefix}${padAtStrt(form.nextNumber, form.digitInNumber, 0)}${form.suffix}`
        }, {emitEvent: false});
      } else {
        this.ViewForm.patchValue({ preview: '' }, {emitEvent: false});
      }
    });
  }

  setNextNumberValidation(val) {
    const maxLength = parseInt('9'.repeat(val - 1) + 8, 10);
    this.ViewForm.get('nextNumber').setValidators([
      Validators.required,
      Validators.min(1),
      Validators.max(maxLength)
    ]);
  }

  setPreview() {
    const prefix = this.ViewForm.get('prefix');
    const suffix = this.ViewForm.get('suffix');
    const digitInNumber = this.ViewForm.get('digitInNumber');
    const nextNumber = this.ViewForm.get('nextNumber');

    if (prefix.valid && suffix.valid && digitInNumber.valid && nextNumber.valid) {
      this.setNextNumberValidation(digitInNumber.value);

      this.ViewForm.patchValue({
        preview: `${prefix.value}${this.addPadding(digitInNumber.value, nextNumber.value)}${suffix.value}`
      });
    } else {
      this.ViewForm.patchValue({ preview: '' });
    }
  }

  addPadding(length: number, value: number) {
    length = length - value.toString().length;

    if (length > 0) {
      return '0'.repeat(length) + value;
    }

    return value;
  }

  get name() { return this.ViewForm.get('name'); }

  createFormGroup(): FormGroup {
    return this.formBuilder.group({
      id: [],
      name: [null],
      description: [null],
      prefix: [{ value: null, disabled: this.isDisabled },],
      suffix: [{ value: null, disabled: this.isDisabled }],
      digitInNumber: [{ value: null, disabled: this.isDisabled }],
      nextNumber: [{ value: null, disabled: this.isDisabled }],
      preview: [{ value: null, disabled: true }],
      isActive: [false],
      createdDate: []
    });
  }

}
