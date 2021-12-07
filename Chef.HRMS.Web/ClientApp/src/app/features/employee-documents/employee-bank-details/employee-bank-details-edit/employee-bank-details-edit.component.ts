import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { EmployeeBankDetailsService } from '../employee-bank-details.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { getCurrentUserId } from '@shared/utils/utils.functions';
import { ToasterDisplayService } from 'src/app/core/services/toaster-service.service';

@Component({
  templateUrl: './employee-bank-details-edit.component.html'
})
export class EmployeeBankDetailsEditComponent implements OnInit {

  editForm: FormGroup;
  currentUserId: number;

  @Input() bankDetails;

  constructor(
    private formBuilder: FormBuilder,
    private toastr: ToasterDisplayService,
    private bankService: EmployeeBankDetailsService,
    public activeModal: NgbActiveModal) { }

  ngOnInit(): void {
    this.currentUserId = getCurrentUserId();
    this.editForm = this.createFormGroup();

    if (this.bankDetails) {
      this.editForm.patchValue(this.bankDetails);
      // this.editForm.patchValue({ modifiedBy: this.currentUserId });
    }
  }

  onSubmit() {
    this.bankService.update(this.editForm.value).subscribe(res => {
      if (res) {
        this.toastr.showSuccessMessage('Bank details updated successfully');
        this.activeModal.close('submit');
      }
    });
  }

  createFormGroup(): FormGroup {
    return this.formBuilder.group({
      id: [],
      employeeId: [this.currentUserId],
      bankName: ['', [Validators.required, Validators.maxLength(64)]],
      accountName: ['', [Validators.required, Validators.maxLength(128)]],
      accountNumber: ['', [Validators.required, Validators.maxLength(36)]],
      branchName: ['', [Validators.required, Validators.maxLength(64)]],
      ifscCode: ['', [Validators.required, Validators.maxLength(16)]],
      createdDate: [],
    });
  }
}
