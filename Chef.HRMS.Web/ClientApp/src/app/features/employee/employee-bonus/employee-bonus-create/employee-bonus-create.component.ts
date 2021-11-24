import { getCurrentUserId } from '@shared/utils/utils.functions';
import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgbActiveModal, NgbDateAdapter, NgbDateNativeAdapter } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { EmployeeBonusService } from '../employee-bonus.service';
import { ToasterDisplayService } from 'src/app/core/services/toaster-service.service';

@Component({
  selector: 'hrms-employee-bonus-create',
  templateUrl: './employee-bonus-create.component.html',
  providers: [{ provide: NgbDateAdapter, useClass: NgbDateNativeAdapter }]
})
export class EmployeeBonusCreateComponent implements OnInit {

  addForm: FormGroup;
  currentUserId: number;
  minDate: { year: number; month: number; day: number; };
  maxDate: { year: number; month: number; day: number; };
  @Input() bonusTypes;
  @Input() employeeId;
  constructor(
    private employeeBonusService: EmployeeBonusService,
    public activeModal: NgbActiveModal,
    private formBuilder: FormBuilder,
    private toastr: ToasterDisplayService) {
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
    this.addForm = this.createFormGroup();
  }

  createFormGroup(): FormGroup {
    return this.formBuilder.group({
      employeeId: [parseInt(this.employeeId, 10)],
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
      remarks: ['', [Validators.maxLength(256),]]
    });
  }

  onSubmit() {
    this.employeeBonusService.add(this.addForm.value)
      .subscribe(res => {
        if (res) {
          this.toastr.showSuccessMessage('Bonus added successfully!');
          this.activeModal.close('submit');
        }
      });
  }
}
