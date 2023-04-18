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
  selector: 'hrms-employee-numbers-create',
  templateUrl: './employee-numbers-create.component.html'
})
export class EmployeeNumbersCreateComponent implements OnInit {


  currentUserId: number;
  addForm: FormGroup;

  @Input() numberSeriesNames: string[];

  constructor(
    private employeeNumbersService: EmployeeNumbersService,
    public activeModal: NgbActiveModal,
    private formBuilder: FormBuilder,
    private toastr: ToasterDisplayService) {
  }

  ngOnInit(): void {
    this.currentUserId = getCurrentUserId();
    this.addForm = this.createFormGroup();
    this.onChanges();
  }

  onChanges(): void {
    this.addForm.valueChanges.subscribe(form => {
      if (form.prefix && form.suffix && form.digitInNumber <= 12 && form.digitInNumber >= 1 && form.nextNumber) {

        this.setNextNumberValidation(form.digitInNumber);

        this.addForm.patchValue({
          preview: `${form.prefix}${padAtStrt(form.nextNumber, form.digitInNumber, 0)}${form.suffix}`
        }, {emitEvent: false});
      } else {
        this.addForm.patchValue({ preview: '' }, {emitEvent: false});
      }
    });
  }

  setNextNumberValidation(val) {
    const maxLength = parseInt('9'.repeat(val - 1) + 8, 10);
    this.addForm.get('nextNumber').setValidators([
      Validators.required,
      Validators.min(1),
      Validators.max(maxLength)
    ]);
  }

  addPadding(length: number, value: number) {
    length = length - value.toString().length;

    if (length > 0) {
      return '0'.repeat(length) + value;
    }

    return value;
  }

  get name() { return this.addForm.get('name'); }

  onSubmit() {

    // if(this.addForm.value.suffix == null){
    //   this.addForm.patchValue({
    //     suffix:0
    //   })
    // }
    this.employeeNumbersService.add(this.addForm.value).subscribe((result: EmployeeNumbers) => {
      if (result.id === -1) {
        this.toastr.showErrorMessage('Employee Series already exists!');
      } else {
        this.toastr.showSuccessMessage('Employee Series added successfully!');
        this.activeModal.close('submit');
      }
    },
      error => {
        console.error(error);
        this.toastr.showErrorMessage('Unable to add the Employee Series');
      });

  }

  createFormGroup(): FormGroup {
    return this.formBuilder.group({
      name: [null, [
        Validators.required,
        Validators.maxLength(32),
        duplicateNameValidator(this.numberSeriesNames)
      ]],
      description: [null, [
        Validators.required,
        Validators.maxLength(256)
      ]],
      prefix: [null, [
        Validators.required,
        Validators.maxLength(8)
      ]],
      suffix: [null, [
        Validators.maxLength(8)
      ]],
      digitInNumber: [null, [
        Validators.required,
        Validators.min(1),
        Validators.max(12)
      ]],
      nextNumber: [null, [
        Validators.required,
        Validators.min(1),
        Validators.max(999999999998)
      ]],
      preview: [{ value: null, disabled: true }],
      isActive: [false]
    });
  }

}
