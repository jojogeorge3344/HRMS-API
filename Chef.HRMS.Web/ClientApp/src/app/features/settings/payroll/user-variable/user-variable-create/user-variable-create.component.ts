import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToasterDisplayService } from 'src/app/core/services/toaster-service.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { UserVariableService } from '../user-variable-list/user-variable.service';
import {UserVariableType} from '../user-variable.model'

@Component({
  selector: 'hrms-user-variable-create',
  templateUrl: './user-variable-create.component.html',
  styleUrls: ['./user-variable-create.component.scss']
})
export class UserVariableCreateComponent implements OnInit {

  addForm: FormGroup;
  userVariableType: object;
  userVariableTypeKeys: number[];
  userVariableTypeOf = UserVariableType;

  constructor(
    private userVariableService:UserVariableService,
    public activeModal: NgbActiveModal,
    private formBuilder: FormBuilder,
    private toastr: ToasterDisplayService) {
  }

  ngOnInit(): void {
    this.addForm = this.createFormGroup();
    this.userVariableTypeKeys = Object.keys(this.userVariableTypeOf).filter(Number).map(Number);
  }

  onSubmit() {
      if(this.addForm.value.status=="Active"){
      this.addForm.value.status=true
      }else{
        this.addForm.value.status=false
      }
    const userForm = this.addForm.value;
    this.userVariableService.get(userForm.code).subscribe((result)=>{
      if(result){
     this.toastr.showWarningMessage("Already Code Exist")
      }
      else{
        this.userVariableService.add(userForm).subscribe(result => {
          this.toastr.showSuccessMessage('The UserVariable added successfully!');
          this.activeModal.close('submit');
        },
          error => {
            this.toastr.showErrorMessage('Unable to add the UserVariable');
          });
      }
    })
    // this.userVariableService.add(userForm).subscribe(result => {
    //   this.toastr.showSuccessMessage('The UserVariable added successfully!');
    //   this.activeModal.close('submit');
    // },
    //   error => {
    //     this.toastr.showErrorMessage('Unable to add the UserVariable');
    //   });
  
  }

  createFormGroup(): FormGroup {
    return this.formBuilder.group({
      code: ['', [
        Validators.maxLength(20),
        Validators.required,
      ]],
      name: ['', [
        Validators.maxLength(64),
        Validators.required,
      ]],
      type: [0, [
        Validators.maxLength(64),
        Validators.required,
      ]],
      status: ['', [
        Validators.required,
      ]],
    });
  }

}






