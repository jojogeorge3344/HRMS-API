import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BranchBankService } from '../../bank.service';
import { ToasterDisplayService } from 'src/app/core/services/toaster-service.service';

@Component({
  selector: 'bank-edit',
  templateUrl: './edit.component.html'
})
export class EditBankComponent implements OnInit {

  bankForm: FormGroup;

  @Input() bankId: any;

  constructor(
    private bankService: BranchBankService,
    public activeModal: NgbActiveModal,
    private formBuilder: FormBuilder,
    private toastr: ToasterDisplayService) {
  }

  ngOnInit(): void {
    this.bankForm = this.createFormGroup();
    this.bankService.get(this.bankId).subscribe(result => {
      this.bankForm.patchValue(result);
    },
      error => {
        console.error(error);
        this.toastr.showErrorMessage('Unable to fetch the bank');
      });

  }

  onSubmit() {
    this.bankService.update(this.bankForm.value).subscribe(result => {
      this.toastr.showSuccessMessage('The bank is updated successfully!');
      this.activeModal.close('submit');
    },
      error => {
        console.error(error);
        this.toastr.showErrorMessage('There is an error in updating bank');
      });
  }

  createFormGroup(): FormGroup {
    return this.formBuilder.group({
      id: [''],
      branchId: [''],
      corporateId: ['', [
        Validators.required, Validators.maxLength(16)
      ]],
      accountNumber: ['', [
        Validators.required, Validators.maxLength(32)
      ]],
      accountName: ['', [
        Validators.required, Validators.maxLength(128)
      ]],
      branchName: ['', [
        Validators.required, Validators.maxLength(128)
      ]],
      ifscCode: ['', [
        Validators.required, Validators.maxLength(11)
      ]],
      bankName: ['', [
        Validators.required, Validators.maxLength(64)
      ]]
    });
  }
}

