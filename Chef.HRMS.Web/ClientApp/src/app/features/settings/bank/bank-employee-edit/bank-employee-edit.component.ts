import { Component, OnInit,Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToasterDisplayService } from 'src/app/core/services/toaster-service.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { BankService } from '../bank-employee.service';
import { BankGroup } from '../bank-employee.model';

@Component({
  selector: 'hrms-bank-employee-edit',
  templateUrl: './bank-employee-edit.component.html',
  styleUrls: ['./bank-employee-edit.component.scss']
})
export class BankEmployeeEditComponent implements OnInit {

  addForm: FormGroup;
  @Input() relDetails: BankGroup;
  @Input() Code: string[];
  @Input() Name: string[];
  codeExistCheck:boolean=false
  bankExistCheck:boolean=false

  constructor(
    private bankService:BankService,
    public activeModal: NgbActiveModal,
    private formBuilder: FormBuilder,
    private toastr: ToasterDisplayService) {
  }

  ngOnInit(): void {
    this.addForm = this.createFormGroup();
    this.addForm.patchValue(this.relDetails);
    // if(this.addForm.value.status==true){
    //   this.addForm.patchValue({
    //     status:"Active"
    //   })
    //   }else{
    //     this.addForm.patchValue({
    //       status:"InActive"
    //     })
    //   }
  }

  onSubmit() {
    this.addForm.value.id=this.relDetails.id
    // if(this.addForm.value.status=="Active"){
    //   this.addForm.value.status=true
    //   }else{
    //     this.addForm.value.status=false
    //   }
    const bankForm = this.addForm.value;
    if(!this.codeExistCheck && !this.bankExistCheck){ 
      this.bankService.update(bankForm).subscribe(result => {
      this.toastr.showSuccessMessage('The Bank updated successfully!');
      this.activeModal.close('submit');
    },
      error => {
        console.error(error);
        this.toastr.showErrorMessage('Unable to add the Bank');
      });
    }
  }
  checkCodeEXist(event){
    this.bankService.get(event).subscribe((result)=>{
      if(result){
        this.codeExistCheck=true
     this.toastr.showWarningMessage("Already Code Exist")
      }else{
        this.codeExistCheck=false
      }
    })
  }
  checkBankEXist(event){
    this.bankService.getBankName(event).subscribe((result)=>{
      if(result){
        this.bankExistCheck=true
     this.toastr.showWarningMessage("Already Bank Name Exist")
      }else{
        this.bankExistCheck=false
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




