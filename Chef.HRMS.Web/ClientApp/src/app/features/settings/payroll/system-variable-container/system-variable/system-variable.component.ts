import { Component, OnInit,Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToasterDisplayService } from 'src/app/core/services/toaster-service.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { SystemVariableService } from './system-service';
import { UserVariableGroup } from '@settings/payroll/user-variable/user-variable-list/user-variable.model';


@Component({
  selector: 'hrms-system-variable',
  templateUrl: './system-variable.component.html',
  styleUrls: ['./system-variable.component.scss']
})
export class SystemVariableComponent implements OnInit {

  addForm: FormGroup;
  @Input() systemDetails: UserVariableGroup;
  // @Input() Code: string[];
  // @Input() Name: string[];
  codeExistCheck:boolean=false

  constructor(
    private systemVariableService:SystemVariableService,
    public activeModal: NgbActiveModal,
    private formBuilder: FormBuilder,
    private toastr: ToasterDisplayService) {
  }

  ngOnInit(): void {
    debugger
    this.addForm = this.createFormGroup();
    this.addForm.patchValue(this.systemDetails);
    if(this.addForm.value.status==true){
      this.addForm.patchValue({
        status:"Active"
      })
      }else{
        this.addForm.patchValue({
          status:"InActive"
        })
      }
  }

  onSubmit() {
    this.addForm.value.id=this.systemDetails.id
    if(this.addForm.value.status=="Active"){
      this.addForm.value.status=true
      }else{
        this.addForm.value.status=false
      }
    const userForm = this.addForm.value;
  
    this.systemVariableService.update(userForm).subscribe(result => {
      this.toastr.showSuccessMessage('The System Variable updated successfully!');
      this.activeModal.close('submit');
    },
      error => {
        console.error(error);
        this.toastr.showErrorMessage('Unable to add the System Variable');
      });
    
  }
  // checkCodeEXist(event){
  //   this.systemVariableService.get(event).subscribe((result)=>{
  //     if(result){
  //       this.codeExistCheck=true
  //    this.toastr.showWarningMessage("Already Code Exist")
  //     }else{
  //       this.codeExistCheck=false
  //     }
  //   })
  // }

  createFormGroup(): FormGroup {
    return this.formBuilder.group({
      code: ['', [
        Validators.maxLength(20),
        //Validators.required,
      ]],
      name: ['', [
        Validators.maxLength(64),
        //Validators.required,
      ]],
      status: ['', [
        Validators.required,
      ]],
    });
  }
}








