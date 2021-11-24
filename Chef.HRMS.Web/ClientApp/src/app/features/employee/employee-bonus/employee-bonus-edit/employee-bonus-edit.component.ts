import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgbActiveModal, NgbDateAdapter, NgbDateNativeAdapter } from '@ng-bootstrap/ng-bootstrap';
import { EmployeeBonusService } from '../employee-bonus.service';
import { getCurrentUserId } from '@shared/utils/utils.functions';
import { ToasterDisplayService } from 'src/app/core/services/toaster-service.service';

@Component({
  selector: 'hrms-employee-bonus-edit',
  templateUrl: './employee-bonus-edit.component.html',
  providers: [{ provide: NgbDateAdapter, useClass: NgbDateNativeAdapter }]
})
export class EmployeeBonusEditComponent implements OnInit {

  editForm: FormGroup;
  currentUserId: number;
  minDate: { year: number; month: number; day: number; };
  maxDate: { year: number; month: number; day: number; };
  @Input() bonusTypes;
  @Input() employeeId;
  @Input() bonus;
  constructor(
    private employeeBonusService: EmployeeBonusService,
    public activeModal: NgbActiveModal,
    private formBuilder: FormBuilder,
    private toastr: ToasterDisplayService
  ) {
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
   }

  ngOnInit(): void {
    this.currentUserId = getCurrentUserId();  
    this.editForm = this.createFormGroup();
    const bonusValue = this.bonus;
    bonusValue.disburseOn = new Date(bonusValue.disburseOn);
    this.editForm.patchValue(bonusValue);
  }

  createFormGroup(): FormGroup {
       return this.formBuilder.group({
      id: [0],
      employeeId: [parseInt(this.employeeId, 10)],
      bonusTypeId: [null, [
        Validators.required,
      ]],
      amount: [null, [
        Validators.required,
        Validators.min(1),
        Validators.max(999999999)
      ]],
      disburseOn: [new Date(),[
        Validators.required,
      ]],
      remarks: ['', [ Validators.maxLength(256)]],
      createdDate: [],

    });
  }  

  onSubmit() {
    this.employeeBonusService.update(this.editForm.value)
      .subscribe(res => {
        if (res) {
          this.toastr.showSuccessMessage('Bonus edited successfully!');
          this.activeModal.close('submit');
        }
      });
  }

}
