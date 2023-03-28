import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToasterDisplayService } from 'src/app/core/services/toaster-service.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { BankService } from '../bank-employee.service';

@Component({
  selector: 'hrms-bank-employee-create',
  templateUrl: './bank-employee-create.component.html',
  styleUrls: ['./bank-employee-create.component.scss']
})
export class BankEmployeeCreateComponent implements OnInit {

  addForm: FormGroup;

  constructor(
    private bankService:BankService,
    public activeModal: NgbActiveModal,
    private formBuilder: FormBuilder,
    private toastr: ToasterDisplayService) {
  }

  ngOnInit(): void {
    this.addForm = this.createFormGroup();
  }

  onSubmit() {
      if(this.addForm.value.status=="Active"){
      this.addForm.value.status=true
      }else{
        this.addForm.value.status=false
      }
    const BankForm = this.addForm.value;
    this.bankService.add(BankForm).subscribe(result => {
          this.toastr.showSuccessMessage('The Bank added successfully!');
          this.activeModal.close('submit');
        },
          error => {
            this.toastr.showErrorMessage('Unable to add the Bank');
          });
  }

  createFormGroup(): FormGroup {
    return this.formBuilder.group({
      code: ['', [
        Validators.maxLength(14),
        Validators.required,
      ]],
      name: ['', [
        Validators.maxLength(64),
        Validators.required,
      ]],
      address: ['', [
        Validators.maxLength(100),
        Validators.required,
      ]],
      status: ['', [
        Validators.required,
      ]],
    });
  }

}




