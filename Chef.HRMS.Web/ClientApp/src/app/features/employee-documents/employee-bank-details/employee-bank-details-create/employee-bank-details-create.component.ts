import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { EmployeeBankDetailsService } from '../employee-bank-details.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { getCurrentUserId } from '@shared/utils/utils.functions';
import { ToasterDisplayService } from 'src/app/core/services/toaster-service.service';

@Component({
  templateUrl: './employee-bank-details-create.component.html'
})
export class EmployeeBankDetailsCreateComponent implements OnInit {

  addForm: FormGroup;
  currentUserId: number;

  constructor(
    private formBuilder: FormBuilder,
    private toastr: ToasterDisplayService,
    private bankService: EmployeeBankDetailsService,
    public activeModal: NgbActiveModal) {
  }

  ngOnInit(): void {
    this.currentUserId = getCurrentUserId();
    this.addForm = this.createFormGroup();
  }

  onSubmit() {
    this.bankService.insert(this.addForm.value).subscribe(res => {
      if (res) {
        this.toastr.showSuccessMessage('Bank details added successfully');
        this.activeModal.close('submit');
      }
    });
  }

  createFormGroup(): FormGroup {
    return this.formBuilder.group({
      employeeId: [this.currentUserId],
      bankName: ['', [
        Validators.required,
        Validators.maxLength(64)
      ]],
      accountName: ['', [
        Validators.required,
        Validators.maxLength(128)
      ]],
      accountNumber: ['', [
        Validators.required,
        Validators.maxLength(36)
      ]],
      branchName: ['', [
        Validators.required,
        Validators.maxLength(64)
      ]],
      ifscCode: ['', [
        Validators.required,
        Validators.maxLength(16)
      ]],
      createdBy: [this.currentUserId],
      modifiedBy: [this.currentUserId]
    });
  }
}
