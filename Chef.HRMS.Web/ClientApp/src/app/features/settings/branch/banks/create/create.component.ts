import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BranchBankService } from '../../bank.service';
import { ToastrService } from 'ngx-toastr';
import { ToasterDisplayService } from 'src/app/core/services/toaster-service.service';

@Component({
  selector: 'bank-create',
  templateUrl: './create.component.html'
})
export class CreateBankComponent implements OnInit {

  bankForm: FormGroup;

  @Input() branchId: any;

  constructor(
    private bankService: BranchBankService,
    public activeModal: NgbActiveModal,
    private formBuilder: FormBuilder,
    private toastr: ToasterDisplayService) {
  }

  ngOnInit(): void {
    this.bankForm = this.createFormGroup();
    this.bankForm.patchValue({ branchId: parseInt(this.branchId, 10) });
  }

  onSubmit() {
    this.bankService.add(this.bankForm.value).subscribe(result => {
      this.toastr.showSuccessMessage('The bank added successfully!');
      this.activeModal.close('submit');
    },
      error => {
        console.error(error);
        this.toastr.showErrorMessage('Unable to add the bank');
      });
  }

  createFormGroup(): FormGroup {
    return this.formBuilder.group({
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
