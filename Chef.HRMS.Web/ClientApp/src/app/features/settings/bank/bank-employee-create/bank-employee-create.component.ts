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
  bankCodeCheck:boolean=false
  bankNameCheck:boolean=false
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
      // if(this.addForm.value.status=="Active"){
      // this.addForm.value.status=true
      // }else{
      //   this.addForm.value.status=false
      // }
      const BankForm = this.addForm.value;
      if(!this.bankCodeCheck && !this.bankNameCheck)
      this.bankService.add(BankForm).subscribe(result => {
        this.toastr.showSuccessMessage('The Bank added successfully!');
        this.activeModal.close('submit');
      },
        error => {
          this.toastr.showErrorMessage('Unable to add the Bank');
        });
  }
  getBankCode(event){
    this.bankService.get(event).subscribe((result)=>{
      if(result){
        this.bankCodeCheck=true
     this.toastr.showWarningMessage("Already Code Exist")
      }else{
  
        this.bankCodeCheck=false
      }
      
    }) 
  }
  getBankName(event){
    this.bankService.getBankName(event).subscribe((result)=>{
      if(result){
        this.bankNameCheck=true
     this.toastr.showWarningMessage("Already Bank Name Exist")
      }else{
  
        this.bankNameCheck=false
      }
      
    }) 
  }

  createFormGroup(): FormGroup {
    return this.formBuilder.group({
      code: ['', [
        Validators.maxLength(30),
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




